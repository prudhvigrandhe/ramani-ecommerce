const TOKEN_MAX_AGE = 1000 * 60 * 60 * 24;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return secret;
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string) {
  if (hex.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < bytes.length; i++) {
    const value = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);

    if (Number.isNaN(value)) {
      return null;
    }

    bytes[i] = value;
  }

  return bytes;
}

async function getSigningKey() {
  const secret = new TextEncoder().encode(getSessionSecret());

  return crypto.subtle.importKey(
    "raw",
    secret,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign", "verify"]
  );
}

export async function createAdminSessionToken() {
  const timestamp = Date.now().toString();

  const key = await getSigningKey();

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(timestamp)
  );

  return `${timestamp}.${bytesToHex(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(token: string) {
  const [timestamp, signatureHex] = token.split(".");

  if (!timestamp || !signatureHex) {
    return false;
  }

  const timestampNumber = Number(timestamp);

  if (!Number.isFinite(timestampNumber)) {
    return false;
  }

  const sessionAge = Date.now() - timestampNumber;

  if (sessionAge < 0 || sessionAge > TOKEN_MAX_AGE) {
    return false;
  }

  const signature = hexToBytes(signatureHex);

  if (!signature) {
    return false;
  }

  try {
    const key = await getSigningKey();

    return await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      new TextEncoder().encode(timestamp)
    );
  } catch {
    return false;
  }
}