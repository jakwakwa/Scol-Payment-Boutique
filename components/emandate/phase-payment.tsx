"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Lock, Pencil, Shield, PartyPopper } from "lucide-react";
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
 * Banking details + inline glassmorphism summary + emotionally intelligent copy.
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

	const isReady = termsAccepted && privacyAccepted && bankName && accountNumber.length >= 6;

	return (
		<div className="space-y-3">
			{/* Bank selection */}
			<FieldGroup label="Bank">
				<div className="flex flex-col gap-2.5">
					<Label
						htmlFor="bankName"
						className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
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
						<SelectTrigger
							className={cn(
								"stratcol-input transition-all duration-300",
								bankName && "border-yellow-500/20",
							)}
							id="bankName"
						>
							<SelectValue placeholder="Select your bank" />
						</SelectTrigger>
						<SelectContent className="bg-stone-950/95 border-white/10 backdrop-blur-xl">
							{bankOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="text-white/80 hover:bg-yellow-500/10 hover:text-yellow-200 focus:bg-yellow-500/10 focus:text-yellow-200 transition-colors"
								>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.bankName && (
						<p className="text-red-400 text-xs mt-0.5 shake">
							{errors.bankName.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Account type – glowing toggle pills */}
			<FieldGroup label="Account Type">
				<div className="flex flex-col gap-2.5">
					<Label className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold">
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
									"flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 border w-auto h-auto",
									accountType === opt.value
										? "bg-yellow-500/10 border-yellow-500/30 text-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.08)]"
										: "bg-white/3 border-white/8 text-white/40 hover:border-white/15 hover:text-white/60 hover:bg-white/5",
								)}
							>
								{opt.label}
							</button>
						))}
					</div>
					{errors.accountType && (
						<p className="text-red-400 text-xs mt-0.5 shake">
							{errors.accountType.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Account number + Branch code row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<div className="md:col-span-2">
					<FieldGroup label="Account Number">
						<div className="flex flex-col gap-2">
							<Label
								htmlFor="accountNumber"
								className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
							>
								Account Number
							</Label>
							<Input
								id="accountNumber"
								className={cn("stratcol-input", errors.accountNumber && "shake")}
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
								<span className={cn(
									"text-xs transition-colors",
									accountNumber.length >= 6 ? "text-green-400/50" : "text-white/20",
								)}>
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
								className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
							>
								Branch Code
							</Label>
							{bankName && !branchEditable && (
								<button
									type="button"
									onClick={() => setBranchEditable(true)}
									className="text-yellow-500/40 hover:text-yellow-400 text-xs flex items-center gap-1 bg-transparent border-none w-auto h-auto p-0 transition-colors"
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
										"opacity-60",
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
								<Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-yellow-500/30" />
							)}
						</div>
						{errors.branchCode ? (
							<p className="text-red-400 text-xs mt-0.5">
								{errors.branchCode.message}
							</p>
						) : bankName && !branchEditable ? (
							<p className="text-white/20 text-xs">
								Auto-filled for{" "}
								{bankLabelMap[bankName] || bankName}
							</p>
						) : null}
					</div>
				</FieldGroup>
			</div>

			{/* Glassmorphism confirmation summary */}
			<div className="relative rounded-2xl p-5 mt-2 space-y-3 overflow-hidden bg-white/3 backdrop-blur-sm border border-white/6">
				{/* Subtle inner glow */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

				<h3 className="text-white/70 font-semibold text-sm flex items-center gap-2">
					{pageCopy.confirmationTitle}
					{isReady && (
						<PartyPopper className="w-3.5 h-3.5 text-yellow-400/60 animate-in zoom-in-50 duration-300" />
					)}
				</h3>
				<div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
					<SummaryRow
						label="Product"
						value={productLabelMap[productType] || "\u2014"}
					/>
					<SummaryRow
						label="Plan"
						value={planLabelMap[subscriptionPlan] || "\u2014"}
					/>
					<SummaryRow
						label="Name"
						value={
							firstName || lastName
								? `${firstName} ${lastName}`.trim()
								: "\u2014"
						}
					/>
					<SummaryRow label="Email" value={email || "\u2014"} />
					<SummaryRow
						label="Bank"
						value={bankLabelMap[bankName] || "\u2014"}
					/>
					<SummaryRow
						label="Account"
						value={
							accountNumber
								? `\u2022\u2022\u2022${accountNumber.slice(-4)}`
								: "\u2014"
						}
					/>
				</div>
			</div>

			{/* Terms & Privacy with security note */}
			<div className="space-y-3 mt-2">
				<div className="bg-yellow-400/3 border border-yellow-400/8 rounded-xl p-3 backdrop-blur-sm">
					<p className="text-yellow-200/50 text-xs flex items-center gap-2">
						<Shield className="w-3.5 h-3.5 shrink-0" />
						{pageCopy.securityNotice}
					</p>
				</div>

				<div className="flex items-start space-x-3 group">
					<Checkbox
						id="terms"
						checked={termsAccepted}
						onCheckedChange={(checked) =>
							setValue("termsAccepted", checked === true, {
								shouldValidate: true,
							})
						}
						className="mt-0.5"
					/>
					<Label
						htmlFor="terms"
						className="text-white/60 text-sm leading-relaxed cursor-pointer group-hover:text-white/80 transition-colors"
					>
						{pageCopy.termsLabel}
					</Label>
				</div>
				{errors.termsAccepted && (
					<p className="text-red-400 text-xs ml-7 shake">
						{errors.termsAccepted.message}
					</p>
				)}

				<div className="flex items-start space-x-3 group">
					<Checkbox
						id="privacy"
						checked={privacyAccepted}
						onCheckedChange={(checked) =>
							setValue("privacyAccepted", checked === true, {
								shouldValidate: true,
							})
						}
						className="mt-0.5"
					/>
					<Label
						htmlFor="privacy"
						className="text-white/60 text-sm leading-relaxed cursor-pointer group-hover:text-white/80 transition-colors"
					>
						{pageCopy.privacyLabel}
					</Label>
				</div>
				{errors.privacyAccepted && (
					<p className="text-red-400 text-xs ml-7 shake">
						{errors.privacyAccepted.message}
					</p>
				)}
			</div>
		</div>
	);
};

/** Glassmorphism summary row */
function SummaryRow({ label, value }: { label: string; value: string }) {
	const isFilled = value !== "\u2014";
	return (
		<div className="flex items-baseline gap-1.5">
			<span className="text-white/25 shrink-0">{label}:</span>
			<span className={cn(
				"transition-colors duration-300",
				isFilled ? "text-white/70" : "text-white/15",
			)}>
				{value}
			</span>
		</div>
	);
}

export default PhasePayment;
