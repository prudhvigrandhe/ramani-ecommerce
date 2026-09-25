const TOKEN_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours
const IDLE_TIMEOUT = 1000 * 60 * 20; // 20 minutes

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
    const value = Number.parseInt(
      hex.slice(i * 2, i * 2 + 2),
      16
    );

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

async function signToken(payload: string) {
  const key = await getSigningKey();

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return bytesToHex(new Uint8Array(signature));
}

export async function createAdminSessionToken() {
  const now = Date.now().toString();

  const payload = `${now}.${now}`;
  const signature = await signToken(payload);

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [createdAt, lastActivity, signatureHex] = parts;

  if (!createdAt || !lastActivity || !signatureHex) {
    return false;
  }

  const createdAtNumber = Number(createdAt);
  const lastActivityNumber = Number(lastActivity);

  if (
    !Number.isFinite(createdAtNumber) ||
    !Number.isFinite(lastActivityNumber)
  ) {
    return false;
  }

  const now = Date.now();

  const sessionAge = now - createdAtNumber;
  const idleAge = now - lastActivityNumber;

  // Maximum session lifetime: 24 hours
  if (sessionAge < 0 || sessionAge > TOKEN_MAX_AGE) {
    return false;
  }

  // Maximum inactivity: 20 minutes
  if (idleAge < 0 || idleAge > IDLE_TIMEOUT) {
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
      new TextEncoder().encode(`${createdAt}.${lastActivity}`)
    );
  } catch {
    return false;
  }
}

/**
 * Creates a new token with the original session creation time
 * and a refreshed last-activity timestamp.
 *
 * This keeps the 24-hour maximum lifetime while extending
 * the idle timeout when the admin is active.
 */
export async function refreshAdminSessionToken(token: string) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [createdAt, lastActivity, signatureHex] = parts;

  if (!createdAt || !lastActivity || !signatureHex) {
    return null;
  }

  const createdAtNumber = Number(createdAt);
  const lastActivityNumber = Number(lastActivity);

  if (
    !Number.isFinite(createdAtNumber) ||
    !Number.isFinite(lastActivityNumber)
  ) {
    return null;
  }

  const now = Date.now();

  const sessionAge = now - createdAtNumber;
  const idleAge = now - lastActivityNumber;

  if (sessionAge < 0 || sessionAge > TOKEN_MAX_AGE) {
    return null;
  }

  if (idleAge < 0 || idleAge > IDLE_TIMEOUT) {
    return null;
  }

  const currentPayload = `${createdAt}.${lastActivity}`;
  const signature = hexToBytes(signatureHex);

  if (!signature) {
    return null;
  }

  try {
    const key = await getSigningKey();

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      new TextEncoder().encode(currentPayload)
    );

    if (!valid) {
      return null;
    }

    const newLastActivity = now.toString();
    const newPayload = `${createdAt}.${newLastActivity}`;
    const newSignature = await signToken(newPayload);

    return `${newPayload}.${newSignature}`;
  } catch {
    return null;
  }
}