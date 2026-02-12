import type {
  PhaseConfig,
  BankEntry,
  ProductOption,
  MandateTypeOption,
  AccountTypeOption,
  IdTypeOption,
  EMandateFormData,
} from "./types";

// ---------------------------------------------------------------------------
// Phase configuration — emotionally intelligent descriptions
// ---------------------------------------------------------------------------
export const phases: PhaseConfig[] = [
  {
    id: 1,
    label: "Mandate Selection",
    description: "Let\u2019s tailor the perfect mandate for you",
  },
  {
    id: 2,
    label: "Details",
    description: "Just a few details so we know who you are",
  },
  {
    id: 3,
    label: "Payment",
    description: "Almost there \u2014 set up your easy debit order",
  },
];

// ---------------------------------------------------------------------------
// Emotionally intelligent per-phase copy
// ---------------------------------------------------------------------------
export const phaseEmotions = {
  /** Shown as a subtle hint below the phase title */
  hints: [
    "Two quick taps and you\u2019re on your way.",
    "We keep your data safe \u2014 always.",
    "You\u2019re one step from done!",
  ] as const,

  /** Celebration messages when completing a phase */
  celebrations: [
    "Great choice! Let\u2019s get to know you.",
    "Looking good! Just one more step.",
    "",
  ] as const,

  /** Button labels that feel encouraging */
  continueLabels: ["Next: Your Details", "Next: Set Up Payment", ""] as const,
};

// ---------------------------------------------------------------------------
// Phase 1 – Mandate Selection
// ---------------------------------------------------------------------------
export const mandateTypeOptions: MandateTypeOption[] = [
  { value: "debit-order", label: "Debit Order" },
  { value: "eft-collection", label: "EFT Collection" },
  { value: "realtime-clearing", label: "Realtime Clearing" },
  { value: "managed-collection", label: "Managed Collection" },
];

export const productOptions: ProductOption[] = [
  { value: "standard", label: "Standard" },
  { value: "premium-collections", label: "Premium Collections" },
  { value: "call-centre", label: "Call Centre" },
];

// ---------------------------------------------------------------------------
// Phase 2 – Your Details
// ---------------------------------------------------------------------------
export const idTypeOptions: IdTypeOption[] = [
  { value: "sa-id", label: "South African ID" },
  { value: "passport", label: "Passport" },
  { value: "drivers-license", label: "Driver\u2019s License" },
];

// ---------------------------------------------------------------------------
// Phase 3 – Set Up Payment
// ---------------------------------------------------------------------------

/** SA bank data with universal branch codes for auto-fill */
export const bankOptions: BankEntry[] = [
  { value: "absa", label: "ABSA Bank", branchCode: "632005" },
  { value: "fnb", label: "First National Bank", branchCode: "250655" },
  { value: "standard", label: "Standard Bank", branchCode: "051001" },
  { value: "nedbank", label: "Nedbank", branchCode: "198765" },
  { value: "capitec", label: "Capitec Bank", branchCode: "470010" },
];

/** Lookup map keyed by bank value for O(1) branch-code resolution */
export const bankBranchCodeMap: Record<string, string> = Object.fromEntries(
  bankOptions.map((b) => [b.value, b.branchCode]),
);

/** Lookup map for human-readable bank labels */
export const bankLabelMap: Record<string, string> = Object.fromEntries(
  bankOptions.map((b) => [b.value, b.label]),
);

/** Lookup map for human-readable mandate type labels */
export const mandateTypeLabelMap: Record<string, string> = Object.fromEntries(
  mandateTypeOptions.map((m) => [m.value, m.label]),
);

/** Lookup map for human-readable product labels */
export const productLabelMap: Record<string, string> = Object.fromEntries(
  productOptions.map((p) => [p.value, p.label]),
);

export const accountTypeOptions: AccountTypeOption[] = [
  { value: "current", label: "Current" },
  { value: "savings", label: "Savings" },
  { value: "cheque", label: "Cheque" },
];

// ---------------------------------------------------------------------------
// Default form values
// ---------------------------------------------------------------------------
export const defaultFormValues: EMandateFormData = {
  mandateType: "",
  productType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "+27",
  idNumber: "",
  idType: "sa-id",
  bankName: "",
  accountType: "",
  accountNumber: "",
  branchCode: "",
  termsAccepted: false,
  privacyAccepted: false,
};

// ---------------------------------------------------------------------------
// Static copy — emotionally intelligent
// ---------------------------------------------------------------------------
export const pageCopy = {
  brandName: "StratCol",
  pageTitle: "e Mandate Registration",
  pageSubtitle: "Set up your debit order in under 2 minutes",
  confirmationTitle: "Your Registration at a Glance",
  termsLabel:
    "I agree to the Terms and Conditions and authorize StratCol to process debit orders from my account",
  privacyLabel:
    "I acknowledge that I have read and understood the Privacy Policy",
  securityNotice:
    "Your information is encrypted and stored securely in compliance with POPIA regulations. We never share your data.",
  submitButton: "Complete Registration",
  continueButton: "Continue",
  backButton: "Back",
  restoredToast: "Welcome back! We\u2019ve restored your progress.",
  startOverLabel: "Start Over",
  successTitle: "You\u2019re All Set!",
  successMessage:
    "Your eMandate has been submitted successfully. You\u2019ll receive a confirmation email shortly. Thank you for choosing StratCol. You can now close this window",
};
