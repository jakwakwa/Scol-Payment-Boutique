"use client";

import { useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { CheckCircle, Shield } from "lucide-react";
import type { EMandateFormData } from "@/app/emandate/types";
import { idTypeOptions, pageCopy } from "@/app/emandate/content";
import { isValidSaId, extractDobFromSaId } from "@/app/emandate/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import FieldGroup from "@/components/shared/field-group";

/**
 * Phase 2: Your Details
 * Contact details + identity verification merged into one phase.
 *
 * Smart features:
 * - Phone pre-filled with +27 prefix
 * - SA ID auto-detection (Luhn check) + DOB extraction
 * - Auto-switches idType based on input pattern
 */
const PhaseDetails = () => {
	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<EMandateFormData>();

	const idNumber = watch("idNumber");
	const idType = watch("idType");

	// Auto-detect ID type from input pattern
	const detectIdType = useCallback(
		(value: string) => {
			if (!value || value.length < 3) return;

			// If purely numeric and 13 chars, likely SA ID
			if (/^\d{13}$/.test(value)) {
				if (idType !== "sa-id") {
					setValue("idType", "sa-id", { shouldValidate: false });
				}
			} else if (/[a-zA-Z]/.test(value)) {
				// Contains letters — likely passport
				if (idType === "sa-id") {
					setValue("idType", "passport", { shouldValidate: false });
				}
			}
		},
		[idType, setValue],
	);

	useEffect(() => {
		detectIdType(idNumber);
	}, [idNumber, detectIdType]);

	const isIdValid = idType === "sa-id" && isValidSaId(idNumber);
	const dob = isIdValid ? extractDobFromSaId(idNumber) : null;

	// Phone number handler: ensure +27 prefix stays
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		// Strip non-digits except leading +
		value = value.replace(/[^\d+]/g, "");
		// Ensure prefix
		if (!value.startsWith("+27")) {
			value = "+27" + value.replace(/^\+?27?/, "");
		}
		// Cap at +27 + 9 digits = 12 chars
		if (value.length > 12) {
			value = value.slice(0, 12);
		}
		setValue("phone", value, { shouldValidate: true });
	};

	// Account number: digits only
	const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// For SA ID, allow only digits; for passport, allow alphanumeric
		if (idType === "sa-id") {
			const cleaned = value.replace(/\D/g, "").slice(0, 13);
			setValue("idNumber", cleaned, { shouldValidate: true });
		} else {
			setValue("idNumber", value.slice(0, 20), { shouldValidate: true });
		}
	};

	return (
		<div className="space-y-2">
			{/* Name row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<FieldGroup label="First Name">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="firstName"
							className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
						>
							First Name
						</Label>
						<Input
							id="firstName"
							className="stratcol-input"
							placeholder="Enter your first name"
							autoComplete="given-name"
							aria-invalid={!!errors.firstName}
							{...register("firstName")}
						/>
						{errors.firstName && (
							<p className="text-red-400 text-xs mt-1">
								{errors.firstName.message}
							</p>
						)}
					</div>
				</FieldGroup>

				<FieldGroup label="Last Name">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="lastName"
							className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
						>
							Last Name
						</Label>
						<Input
							id="lastName"
							className="stratcol-input"
							placeholder="Enter your last name"
							autoComplete="family-name"
							aria-invalid={!!errors.lastName}
							{...register("lastName")}
						/>
						{errors.lastName && (
							<p className="text-red-400 text-xs mt-1">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Contact row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<FieldGroup label="Email">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="email"
							className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
						>
							Email Address
						</Label>
						<Input
							id="email"
							type="email"
							className="stratcol-input"
							placeholder="name@example.com"
							autoComplete="email"
							aria-invalid={!!errors.email}
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-red-400 text-xs mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
				</FieldGroup>

				<FieldGroup label="Phone">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="phone"
							className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
						>
							Phone Number
						</Label>
						<Input
							id="phone"
							type="tel"
							className="stratcol-input"
							placeholder="+27821234567"
							inputMode="tel"
							autoComplete="tel"
							value={watch("phone")}
							onChange={handlePhoneChange}
							aria-invalid={!!errors.phone}
						/>
						{errors.phone && (
							<p className="text-red-400 text-xs mt-1">
								{errors.phone.message}
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Identity section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				<div className="md:col-span-2">
					<FieldGroup label="ID Number">
						<div className="flex flex-col gap-2">
							<Label
								htmlFor="idNumber"
								className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
							>
								ID / Passport Number
							</Label>
							<div className="relative">
								<Input
									id="idNumber"
									className="stratcol-input pr-10"
									placeholder={
										idType === "sa-id"
											? "Enter 13-digit SA ID"
											: "Enter passport number"
									}
									inputMode={
										idType === "sa-id"
											? "numeric"
											: "text"
									}
									value={idNumber}
									onChange={handleIdNumberChange}
									aria-invalid={!!errors.idNumber}
								/>
								{isIdValid && (
									<CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
								)}
							</div>
							{errors.idNumber && (
								<p className="text-red-400 text-xs mt-1">
									{errors.idNumber.message}
								</p>
							)}
							{dob && (
								<p className="text-green-400/70 text-xs mt-0.5">
									Date of birth: {dob}
								</p>
							)}
						</div>
					</FieldGroup>
				</div>

				<FieldGroup label="ID Type">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="idType"
							className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
						>
							ID Type
						</Label>
						<Select
							value={idType}
							onValueChange={(value) =>
								setValue("idType", value, {
									shouldValidate: true,
								})
							}
						>
							<SelectTrigger className="stratcol-input" id="idType">
								<SelectValue placeholder="ID Type" />
							</SelectTrigger>
							<SelectContent className="bg-stone-900/95 border-gray-600 backdrop-blur-md">
								{idTypeOptions.map((opt) => (
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
						{errors.idType && (
							<p className="text-red-400 text-xs mt-1">
								{errors.idType.message}
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Security notice */}
			<div className="bg-yellow-400/5 border border-yellow-400/10 rounded-xl p-3 mt-2">
				<p className="text-yellow-200/70 text-xs flex items-center gap-2">
					<Shield className="w-3.5 h-3.5 shrink-0" />
					{pageCopy.securityNotice}
				</p>
			</div>
		</div>
	);
};

export default PhaseDetails;
