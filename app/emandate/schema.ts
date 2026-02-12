import { z } from "zod";

// ---------------------------------------------------------------------------
// SA ID Luhn validation helper
// ---------------------------------------------------------------------------

/**
 * Validates a 13-digit South African ID number using the Luhn algorithm.
 * Returns true if the check digit (last digit) passes the modulus-10 check.
 */
export function isValidSaId(id: string): boolean {
	if (!/^\d{13}$/.test(id)) return false;

	// Validate date portion (YYMMDD)
	const month = Number.parseInt(id.substring(2, 4), 10);
	const day = Number.parseInt(id.substring(4, 6), 10);
	if (month < 1 || month > 12 || day < 1 || day > 31) return false;

	// Luhn algorithm
	let sum = 0;
	for (let i = 0; i < 12; i++) {
		const digit = Number.parseInt(id[i], 10);
		if (i % 2 === 0) {
			// Odd positions (1-indexed) – add as-is
			sum += digit;
		} else {
			// Even positions (1-indexed) – double, then sum digits
			const doubled = digit * 2;
			sum += doubled > 9 ? doubled - 9 : doubled;
		}
	}

	const checkDigit = (10 - (sum % 10)) % 10;
	return checkDigit === Number.parseInt(id[12], 10);
}

/**
 * Extracts date of birth from a SA ID number (first 6 digits: YYMMDD).
 * Returns a formatted string like "15 Jan 1985" or null if invalid.
 */
export function extractDobFromSaId(id: string): string | null {
  if (!/^\d{13}$/.test(id)) return null;

  const yy = Number.parseInt(id.substring(0, 2), 10);
  const mm = Number.parseInt(id.substring(2, 4), 10);
  const dd = Number.parseInt(id.substring(4, 6), 10);

  // Century pivot: 00-current two-digit year = 2000s, else 1900s
  const currentTwoDigitYear = new Date().getFullYear() % 100;
  const century = yy <= currentTwoDigitYear ? 2000 : 1900;
  const year = century + yy;

  const date = new Date(year, mm - 1, dd);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== mm - 1 ||
    date.getDate() !== dd
  ) {
    return null;
  }

  return date.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Phase 1 – Choose Your Plan
// ---------------------------------------------------------------------------
export const phasePlanSchema = z.object({
  mandateType: z.string().min(1, "Please select a mandate type"),
  productType: z.string().min(1, "Please select a product type"),
});

// ---------------------------------------------------------------------------
// Phase 2 – Your Details
// ---------------------------------------------------------------------------
export const phaseDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+27\d{9}$/, "Enter a valid SA phone number (e.g. +27821234567)"),
  idNumber: z.string().min(6, "Enter a valid ID or passport number"),
  idType: z.string().min(1, "ID type is required"),
});

/**
 * Refinement: if idType is "sa-id", apply the Luhn check.
 * This is separated so we can compose it with the base schema.
 */
export const phaseDetailsRefined = phaseDetailsSchema.refine(
  (data) => {
    if (data.idType === "sa-id") {
      return isValidSaId(data.idNumber);
    }
    return true;
  },
  {
    message:
      "This ID number doesn\u2019t appear to be valid. Please check for typos.",
    path: ["idNumber"],
  },
);

// ---------------------------------------------------------------------------
// Phase 3 – Set Up Payment
// ---------------------------------------------------------------------------
export const phasePaymentSchema = z.object({
  bankName: z.string().min(1, "Please select a bank"),
  accountType: z.string().min(1, "Please select an account type"),
  accountNumber: z
    .string()
    .min(6, "Account number is too short (min 6 digits)")
    .max(16, "Account number is too long (max 16 digits)")
    .regex(/^\d+$/, "Account number must contain only digits"),
  branchCode: z
    .string()
    .length(6, "Branch code must be exactly 6 digits")
    .regex(/^\d+$/, "Branch code must contain only digits"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to continue" }),
  }),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the privacy policy to continue",
    }),
  }),
});

// ---------------------------------------------------------------------------
// Full form schema (union of all phases)
// ---------------------------------------------------------------------------
export const fullFormSchema = phasePlanSchema
  .merge(phaseDetailsSchema)
  .merge(phasePaymentSchema);
