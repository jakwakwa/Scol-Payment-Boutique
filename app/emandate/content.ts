import type {
	PhaseConfig,
	BankEntry,
	ProductOption,
	PlanOption,
	AccountTypeOption,
	IdTypeOption,
	EMandateFormData,
} from "./types";

// ---------------------------------------------------------------------------
// Phase configuration
// ---------------------------------------------------------------------------
export const phases: PhaseConfig[] = [
	{
		id: 1,
		label: "Plan",
		description: "Select your product and subscription plan",
	},
	{
		id: 2,
		label: "Details",
		description: "Tell us about yourself",
	},
	{
		id: 3,
		label: "Payment",
		description: "Set up your debit order",
	},
];

// ---------------------------------------------------------------------------
// Phase 1 – Choose Your Plan
// ---------------------------------------------------------------------------
export const productOptions: ProductOption[] = [
	{ value: "client-service", label: "Client Service Testing" },
	{ value: "training", label: "StratCol Training" },
	{ value: "consulting", label: "Consulting Services" },
];

export const planOptions: PlanOption[] = [
	{ value: "basic", label: "Basic Plan", price: "R299/month" },
	{ value: "professional", label: "Professional Plan", price: "R599/month" },
	{ value: "enterprise", label: "Enterprise Plan", price: "R999/month" },
];

// ---------------------------------------------------------------------------
// Phase 2 – Your Details
// ---------------------------------------------------------------------------
export const idTypeOptions: IdTypeOption[] = [
	{ value: "sa-id", label: "South African ID" },
	{ value: "passport", label: "Passport" },
	{ value: "drivers-license", label: "Driver's License" },
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

/** Lookup map for human-readable product labels */
export const productLabelMap: Record<string, string> = Object.fromEntries(
	productOptions.map((p) => [p.value, p.label]),
);

/** Lookup map for human-readable plan labels (includes price) */
export const planLabelMap: Record<string, string> = Object.fromEntries(
	planOptions.map((p) => [p.value, `${p.label} – ${p.price}`]),
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
	productType: "",
	subscriptionPlan: "",
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
// Static copy
// ---------------------------------------------------------------------------
export const pageCopy = {
	brandName: "StratCol",
	pageTitle: "eMandate Registration",
	pageSubtitle: "Streamlined debit order registration",
	phase1Title: "Choose Your Plan",
	phase2Title: "Your Details",
	phase3Title: "Set Up Payment",
	confirmationTitle: "Registration Summary",
	termsLabel:
		"I agree to the Terms and Conditions and authorize StratCol to process debit orders from my account",
	privacyLabel:
		"I acknowledge that I have read and understood the Privacy Policy",
	securityNotice:
		"Your information is encrypted and stored securely in compliance with POPIA regulations.",
	submitButton: "Complete Registration",
	continueButton: "Continue",
	backButton: "Back",
	restoredToast: "Welcome back! We\u2019ve restored your progress.",
	startOverLabel: "Start Over",
	successTitle: "Registration Complete",
	successMessage:
		"Your eMandate has been submitted successfully. You will receive a confirmation email shortly.",
};
