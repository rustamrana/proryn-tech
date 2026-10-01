import { z } from "zod";

/**
 * Server-side validation schema for contact submissions.
 *
 * This is the authoritative validation — the browser must never be trusted.
 * Field names here match the API contract (name/email/mobile/company/subject/
 * message), which the frontend maps its form fields onto.
 */

export const MESSAGE_MAX_LENGTH = 5000;

/** Accepts international phone formats: optional +, digits, spaces, (), - . */
const MOBILE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required.")
    .max(150, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(255, "Email is too long.")
    .email("Please enter a valid email address."),
  mobile: z
    .string()
    .trim()
    .max(30, "Mobile number is too long.")
    .regex(MOBILE_REGEX, "Please enter a valid mobile number.")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(150, "Company name is too long.")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(200, "Subject is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your enquiry in at least 20 characters.")
    .max(MESSAGE_MAX_LENGTH, "Message is too long."),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

/**
 * Normalize an optional string: empty / whitespace-only becomes null so it is
 * stored as NULL in MySQL rather than an empty string.
 */
export function emptyToNull(value: string | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
