"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Lock, Pencil } from "lucide-react";
import type { EMandateFormData } from "@/app/emandate/types";
import {
	bankOptions,
	bankBranchCodeMap,
	accountTypeOptions,
	pageCopy,
	productLabelMap,
	planLabelMap,
	bankLabelMap,
} from "@/app/emandate/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import FieldGroup from "@/components/shared/field-group";
import { cn } from "@/lib/utils";

/**
 * Phase 3: Set Up Payment
 * Banking details + inline confirmation summary.
 *
 * Smart features:
 * - Bank selection auto-fills branch code (read-only by default)
 * - Account type as visual toggle pills instead of dropdown
 * - Inline confirmation summary at the bottom
 * - Account number character counter
 */
const PhasePayment = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<EMandateFormData>();

	const bankName = watch("bankName");
	const accountType = watch("accountType");
	const accountNumber = watch("accountNumber");
	const branchCode = watch("branchCode");
	const termsAccepted = watch("termsAccepted");
	const privacyAccepted = watch("privacyAccepted");
	const productType = watch("productType");
	const subscriptionPlan = watch("subscriptionPlan");
	const firstName = watch("firstName");
	const lastName = watch("lastName");
	const email = watch("email");

	const [branchEditable, setBranchEditable] = useState(false);

	// Auto-fill branch code when bank changes
	useEffect(() => {
		if (bankName && bankBranchCodeMap[bankName]) {
			setValue("branchCode", bankBranchCodeMap[bankName], {
				shouldValidate: true,
			});
			setBranchEditable(false);
		}
	}, [bankName, setValue]);

	// Account number: digits only, max 16
	const handleAccountNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value.replace(/\D/g, "").slice(0, 16);
		setValue("accountNumber", value, { shouldValidate: true });
	};

	return (
		<div className="space-y-2">
			{/* Bank selection */}
			<FieldGroup label="Bank">
				<div className="flex flex-col gap-2">
					<Label
						htmlFor="bankName"
						className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
					>
						Bank
					</Label>
					<Select
						value={bankName}
						onValueChange={(value) =>
							setValue("bankName", value, {
								shouldValidate: true,
							})
						}
					>
						<SelectTrigger className="stratcol-input" id="bankName">
							<SelectValue placeholder="Select your bank" />
						</SelectTrigger>
						<SelectContent className="bg-stone-900/95 border-gray-600 backdrop-blur-md">
							{bankOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="text-white hover:bg-gray-700"
								>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.bankName && (
						<p className="text-red-400 text-xs mt-1">
							{errors.bankName.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Account type – visual toggle pills */}
			<FieldGroup label="Account Type">
				<div className="flex flex-col gap-2">
					<Label className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold">
						Account Type
					</Label>
					<div className="flex gap-2">
						{accountTypeOptions.map((opt) => (
							<button
								key={opt.value}
								type="button"
								onClick={() =>
									setValue("accountType", opt.value, {
										shouldValidate: true,
									})
								}
								className={cn(
									"flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border w-auto h-auto",
									accountType === opt.value
										? "bg-yellow-500/15 border-yellow-500/40 text-yellow-300"
										: "bg-white/3 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70",
								)}
							>
								{opt.label}
							</button>
						))}
					</div>
					{errors.accountType && (
						<p className="text-red-400 text-xs mt-1">
							{errors.accountType.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Account number + Branch code row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				<div className="md:col-span-2">
					<FieldGroup label="Account Number">
						<div className="flex flex-col gap-2">
							<Label
								htmlFor="accountNumber"
								className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
							>
								Account Number
							</Label>
							<Input
								id="accountNumber"
								className="stratcol-input"
								placeholder="Enter account number"
								inputMode="numeric"
								value={accountNumber}
								onChange={handleAccountNumberChange}
								aria-invalid={!!errors.accountNumber}
							/>
							<div className="flex justify-between">
								{errors.accountNumber ? (
									<p className="text-red-400 text-xs">
										{errors.accountNumber.message}
									</p>
								) : (
									<span />
								)}
								<span className="text-white/30 text-xs">
									{accountNumber?.length || 0}/16
								</span>
							</div>
						</div>
					</FieldGroup>
				</div>

				<FieldGroup label="Branch Code">
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<Label
								htmlFor="branchCode"
								className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
							>
								Branch Code
							</Label>
							{bankName && !branchEditable && (
								<button
									type="button"
									onClick={() => setBranchEditable(true)}
									className="text-yellow-500/50 hover:text-yellow-400 text-xs flex items-center gap-1 bg-transparent border-none w-auto h-auto p-0"
								>
									<Pencil className="w-2.5 h-2.5" />
									Edit
								</button>
							)}
						</div>
						<div className="relative">
							<Input
								id="branchCode"
								className={cn(
									"stratcol-input",
									!branchEditable &&
										branchCode &&
										"opacity-70",
								)}
								placeholder="Branch code"
								inputMode="numeric"
								readOnly={!branchEditable}
								value={branchCode}
								onChange={(e) => {
									if (branchEditable) {
										const v = e.target.value
											.replace(/\D/g, "")
											.slice(0, 6);
										setValue("branchCode", v, {
											shouldValidate: true,
										});
									}
								}}
								aria-invalid={!!errors.branchCode}
							/>
							{!branchEditable && branchCode && (
								<Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-yellow-500/40" />
							)}
						</div>
						{errors.branchCode && (
							<p className="text-red-400 text-xs mt-1">
								{errors.branchCode.message}
							</p>
						)}
						{bankName && !branchEditable && (
							<p className="text-white/25 text-xs">
								Auto-filled for{" "}
								{bankLabelMap[bankName] || bankName}
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Inline confirmation summary */}
			<div className="bg-white/3 border border-white/6 rounded-xl p-5 mt-3 space-y-3">
				<h3 className="text-white/80 font-semibold text-sm">
					{pageCopy.confirmationTitle}
				</h3>
				<div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
					<SummaryRow
						label="Product"
						value={productLabelMap[productType] || "—"}
					/>
					<SummaryRow
						label="Plan"
						value={planLabelMap[subscriptionPlan] || "—"}
					/>
					<SummaryRow
						label="Name"
						value={
							firstName || lastName
								? `${firstName} ${lastName}`.trim()
								: "—"
						}
					/>
					<SummaryRow label="Email" value={email || "—"} />
					<SummaryRow
						label="Bank"
						value={bankLabelMap[bankName] || "—"}
					/>
					<SummaryRow
						label="Account"
						value={
							accountNumber
								? `***${accountNumber.slice(-4)}`
								: "—"
						}
					/>
				</div>
			</div>

			{/* Terms & Privacy */}
			<div className="space-y-3 mt-3">
				<div className="flex items-start space-x-3">
					<Checkbox
						id="terms"
						checked={termsAccepted}
						onCheckedChange={(checked) =>
							setValue("termsAccepted", checked === true, {
								shouldValidate: true,
							})
						}
					/>
					<Label
						htmlFor="terms"
						className="text-white/70 text-sm leading-relaxed cursor-pointer"
					>
						{pageCopy.termsLabel}
					</Label>
				</div>
				{errors.termsAccepted && (
					<p className="text-red-400 text-xs ml-7">
						{errors.termsAccepted.message}
					</p>
				)}

				<div className="flex items-start space-x-3">
					<Checkbox
						id="privacy"
						checked={privacyAccepted}
						onCheckedChange={(checked) =>
							setValue("privacyAccepted", checked === true, {
								shouldValidate: true,
							})
						}
					/>
					<Label
						htmlFor="privacy"
						className="text-white/70 text-sm leading-relaxed cursor-pointer"
					>
						{pageCopy.privacyLabel}
					</Label>
				</div>
				{errors.privacyAccepted && (
					<p className="text-red-400 text-xs ml-7">
						{errors.privacyAccepted.message}
					</p>
				)}
			</div>
		</div>
	);
};

/** Small helper for the summary grid */
function SummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<span className="text-white/30">{label}:</span>
			<span className="text-white/70 ml-1.5">{value}</span>
		</div>
	);
}

export default PhasePayment;
