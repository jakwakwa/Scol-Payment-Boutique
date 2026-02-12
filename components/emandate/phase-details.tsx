"use client";

import { useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { CheckCircle, Shield, Sparkles } from "lucide-react";
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
import { cn } from "@/lib/utils";

/**
 * Phase 2: Your Details
 * Contact + identity merged. Smart auto-detection, warm microcopy.
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
	const firstName = watch("firstName");

	// Auto-detect ID type from input pattern
	const detectIdType = useCallback(
		(value: string) => {
			if (!value || value.length < 3) return;
			if (/^\d{13}$/.test(value)) {
				if (idType !== "sa-id") {
					setValue("idType", "sa-id", { shouldValidate: false });
				}
			} else if (/[a-zA-Z]/.test(value)) {
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
		value = value.replace(/[^\d+]/g, "");
		if (!value.startsWith("+27")) {
			value = "+27" + value.replace(/^\+?27?/, "");
		}
		if (value.length > 12) {
			value = value.slice(0, 12);
		}
		setValue("phone", value, { shouldValidate: true });
	};

	const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (idType === "sa-id") {
			const cleaned = value.replace(/\D/g, "").slice(0, 13);
			setValue("idNumber", cleaned, { shouldValidate: true });
		} else {
			setValue("idNumber", value.slice(0, 20), { shouldValidate: true });
		}
	};

	const hasErrors = Object.keys(errors).length > 0;

	return (
		<div className="space-y-3">
			{/* Warm greeting if we have a first name */}
			{firstName && firstName.length >= 2 && (
				<div className="flex items-center gap-2 px-4 py-1 animate-in fade-in-0 duration-500">
					<Sparkles className="w-3.5 h-3.5 text-yellow-400/60" />
					<p className="text-yellow-300/50 text-xs font-medium">
						Nice to meet you, {firstName}.
					</p>
				</div>
			)}

			{/* Name row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<FieldGroup label="First Name">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="firstName"
							className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
						>
							First Name
						</Label>
						<Input
							id="firstName"
							className={cn("stratcol-input", errors.firstName && "shake")}
							placeholder="Your first name"
							autoComplete="given-name"
							aria-invalid={!!errors.firstName}
							{...register("firstName")}
						/>
						{errors.firstName && (
							<p className="text-red-400 text-xs mt-0.5">
								{errors.firstName.message}
							</p>
						)}
					</div>
				</FieldGroup>

				<FieldGroup label="Last Name">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="lastName"
							className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
						>
							Last Name
						</Label>
						<Input
							id="lastName"
							className={cn("stratcol-input", errors.lastName && "shake")}
							placeholder="Your last name"
							autoComplete="family-name"
							aria-invalid={!!errors.lastName}
							{...register("lastName")}
						/>
						{errors.lastName && (
							<p className="text-red-400 text-xs mt-0.5">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Contact row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<FieldGroup label="Email">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="email"
							className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
						>
							Email Address
						</Label>
						<Input
							id="email"
							type="email"
							className={cn("stratcol-input", errors.email && "shake")}
							placeholder="name@example.com"
							autoComplete="email"
							aria-invalid={!!errors.email}
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-red-400 text-xs mt-0.5">
								{errors.email.message}
							</p>
						)}
					</div>
				</FieldGroup>

				<FieldGroup label="Phone">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="phone"
							className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
						>
							Phone Number
						</Label>
						<Input
							id="phone"
							type="tel"
							className={cn("stratcol-input", errors.phone && "shake")}
							placeholder="+27 82 123 4567"
							inputMode="tel"
							autoComplete="tel"
							value={watch("phone")}
							onChange={handlePhoneChange}
							aria-invalid={!!errors.phone}
						/>
						{errors.phone ? (
							<p className="text-red-400 text-xs mt-0.5">
								{errors.phone.message}
							</p>
						) : (
							<p className="text-white/20 text-xs">
								Pre-filled with +27 for SA numbers
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Identity section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<div className="md:col-span-2">
					<FieldGroup label="ID Number">
						<div className="flex flex-col gap-2">
							<Label
								htmlFor="idNumber"
								className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
							>
								ID / Passport Number
							</Label>
							<div className="relative">
								<Input
									id="idNumber"
									className={cn(
										"stratcol-input pr-10",
										errors.idNumber && "shake",
										isIdValid && "border-green-500/30",
									)}
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
									<div className="absolute right-3 top-1/2 -translate-y-1/2 success-pulse rounded-full">
										<CheckCircle className="w-4 h-4 text-green-400" />
									</div>
								)}
							</div>
							{errors.idNumber ? (
								<p className="text-red-400 text-xs mt-0.5">
									{errors.idNumber.message}
								</p>
							) : idNumber && !isIdValid && idType === "sa-id" && idNumber.length > 0 && idNumber.length < 13 ? (
								<p className="text-white/20 text-xs">
									{13 - idNumber.length} digits remaining
								</p>
							) : null}
							{dob && (
								<p className="text-green-400/60 text-xs animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
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
							className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
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
							<SelectContent className="bg-stone-950/95 border-white/10 backdrop-blur-xl">
								{idTypeOptions.map((opt) => (
									<SelectItem
										key={opt.value}
										value={opt.value}
										className="text-white/80 hover:bg-yellow-500/10 hover:text-yellow-200 focus:bg-yellow-500/10 focus:text-yellow-200"
									>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.idType && (
							<p className="text-red-400 text-xs mt-0.5 shake">
								{errors.idType.message}
							</p>
						)}
						{!errors.idType && (
							<p className="text-white/20 text-xs">
								Auto-detected from your input
							</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Security notice — glassmorphism style */}
			<div className={cn(
				"rounded-xl p-3.5 mt-2 backdrop-blur-sm border transition-all duration-500",
				hasErrors
					? "bg-red-500/5 border-red-500/10"
					: "bg-yellow-400/5 border-yellow-400/10",
			)}>
				<p className={cn(
					"text-xs flex items-center gap-2",
					hasErrors ? "text-red-300/70" : "text-yellow-200/60",
				)}>
					<Shield className="w-3.5 h-3.5 shrink-0" />
					{hasErrors
						? "Please check the highlighted fields above."
						: pageCopy.securityNotice}
				</p>
			</div>
		</div>
	);
};

export default PhaseDetails;
