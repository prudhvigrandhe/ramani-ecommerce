"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "access_key",
      "b4a1ebe3-ed90-459d-949b-02258ecf7420"
    );

    formData.append(
      "subject",
      `Ramani Contact Form - ${formData.get("subject") || "New Message"}`
    );

    formData.append(
      "from_name",
      "Ramani Website"
    );

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuccess(
          "Thank you! Your message has been sent successfully. We'll get back to you soon."
        );

        form.reset();
      } else {
        setError(
          result.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch {
      setError(
        "Unable to send your message right now. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-3xl font-bold">
        Send Us a Message
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full rounded-xl border p-4 outline-none transition focus:border-[#5B214B] focus:ring-2 focus:ring-[#5B214B]/10"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full rounded-xl border p-4 outline-none transition focus:border-[#5B214B] focus:ring-2 focus:ring-[#5B214B]/10"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="w-full rounded-xl border p-4 outline-none transition focus:border-[#5B214B] focus:ring-2 focus:ring-[#5B214B]/10"
        />

        <textarea
          name="message"
          rows={6}
          placeholder="Write your message..."
          required
          className="w-full resize-none rounded-xl border p-4 outline-none transition focus:border-[#5B214B] focus:ring-2 focus:ring-[#5B214B]/10"
        />

        {/* Honeypot spam protection */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#5B214B] py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}