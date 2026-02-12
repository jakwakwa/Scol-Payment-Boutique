/** Form data shape for the full eMandate registration */
export interface EMandateFormData {
	// Phase 1: Choose Your Plan
	productType: string;
	subscriptionPlan: string;

	// Phase 2: Your Details
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	idNumber: string;
	idType: string;

	// Phase 3: Set Up Payment
	bankName: string;
	accountType: string;
	accountNumber: string;
	branchCode: string;
	termsAccepted: boolean;
	privacyAccepted: boolean;
}

/** Phase configuration for the progress indicator */
export interface PhaseConfig {
	id: number;
	label: string;
	description: string;
}

/** Bank data entry with auto-fill branch code */
export interface BankEntry {
	value: string;
	label: string;
	branchCode: string;
}

/** Product option for Phase 1 */
export interface ProductOption {
	value: string;
	label: string;
}

/** Subscription plan option for Phase 1 */
export interface PlanOption {
	value: string;
	label: string;
	price: string;
}

/** Account type option for Phase 3 */
export interface AccountTypeOption {
	value: string;
	label: string;
}

/** ID type option for Phase 2 */
export interface IdTypeOption {
	value: string;
	label: string;
}
