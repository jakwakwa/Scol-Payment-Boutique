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

const LABEL_STYLE = { color: "rgba(245, 166, 35, 0.45)" };
const GOLD_DIM = "rgba(245, 166, 35, 0.25)";

/**
 * Phase 2: Your Details — contact + identity with smart auto-detection.
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

	const detectIdType = useCallback(
		(value: string) => {
			if (!value || value.length < 3) return;
			if (/^\d{13}$/.test(value)) {
				if (idType !== "sa-id") setValue("idType", "sa-id", { shouldValidate: false });
			} else if (/[a-zA-Z]/.test(value)) {
				if (idType === "sa-id") setValue("idType", "passport", { shouldValidate: false });
			}
		},
		[idType, setValue],
	);

	useEffect(() => {
		detectIdType(idNumber);
	}, [idNumber, detectIdType]);

	const isIdValid = idType === "sa-id" && isValidSaId(idNumber);
	const dob = isIdValid ? extractDobFromSaId(idNumber) : null;

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/[^\d+]/g, "");
		if (!value.startsWith("+27")) value = "+27" + value.replace(/^\+?27?/, "");
		if (value.length > 12) value = value.slice(0, 12);
		setValue("phone", value, { shouldValidate: true });
	};

	const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (idType === "sa-id") {
			setValue("idNumber", value.replace(/\D/g, "").slice(0, 13), { shouldValidate: true });
		} else {
			setValue("idNumber", value.slice(0, 20), { shouldValidate: true });
		}
	};

	const hasErrors = Object.keys(errors).length > 0;

	return (
		<div className="space-y-3">
			{firstName && firstName.length >= 2 && (
				<div className="flex items-center gap-2 px-4 py-1 animate-in fade-in-0 duration-500">
					<Sparkles className="w-3.5 h-3.5" style={{ color: GOLD_DIM }} />
					<p className="text-xs font-medium" style={{ color: GOLD_DIM }}>
						Nice to meet you, {firstName}.
					</p>
				</div>
			)}

			{/* Name row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<FieldGroup label="First Name">
					<div className="flex flex-col gap-2">
						<Label htmlFor="firstName" className="text-xs uppercase tracking-widest font-semibold" style={LABEL_STYLE}>
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
						{errors.firstName && <p className="text-red-400 text-xs mt-0.5">{errors.firstName.message}</p>}
					</div>
				</FieldGroup>

				<FieldGroup label="Last Name">
					<div className="flex flex-col gap-2">
						<Label htmlFor="lastName" className="text-xs uppercase tracking-widest font-semibold" style={LABEL_STYLE}>
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
						{errors.lastName && <p className="text-red-400 text-xs mt-0.5">{errors.lastName.message}</p>}
					</div>
				</FieldGroup>
			</div>

			{/* Contact row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<FieldGroup label="Email">
					<div className="flex flex-col gap-2">
						<Label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold" style={LABEL_STYLE}>
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
						{errors.email && <p className="text-red-400 text-xs mt-0.5">{errors.email.message}</p>}
					</div>
				</FieldGroup>

				<FieldGroup label="Phone">
					<div className="flex flex-col gap-2">
						<Label htmlFor="phone" className="text-xs uppercase tracking-widest font-semibold" style={LABEL_STYLE}>
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
							<p className="text-red-400 text-xs mt-0.5">{errors.phone.message}</p>
						) : (
							<p className="text-white/15 text-xs">Pre-filled with +27 for SA numbers</p>
						)}
					</div>
				</FieldGroup>
			</div>

			{/* Identity section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<div className="md:col-span-2">
					<FieldGroup label="ID Number">
						<div className="flex flex-col gap-2">
							<Label htmlFor="idNumber" className="text-xs uppercase tracking-widest font-semibold" style={LABEL_STYLE}>
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
									placeholder={idType === "sa-id" ? "Enter 13-digit SA ID" : "Enter passport number"}
									inputMode={idType === "sa-id" ? "numeric" : "text"}
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
								<p className="text-red-400 text-xs mt-0.5">{errors.idNumber.message}</p>
							) : idNumber && !isIdValid && idType === "sa-id" && idNumber.length > 0 && idNumber.length < 13 ? (
								<p className="text-white/15 text-xs">{13 - idNumber.length} digits remaining</p>
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
						<Label htmlFor="idType" className="text-xs uppercase tracking-widest font-semibold" style={LABEL_STYLE}>
							ID Type
						</Label>
						<Select
							value={idType}
							onValueChange={(value) => setValue("idType", value, { shouldValidate: true })}
						>
							<SelectTrigger className="stratcol-input" id="idType">
								<SelectValue placeholder="ID Type" />
							</SelectTrigger>
							<SelectContent className="border-white/8 backdrop-blur-xl" style={{ background: "rgba(28, 28, 30, 0.97)" }}>
								{idTypeOptions.map((opt) => (
									<SelectItem
										key={opt.value}
										value={opt.value}
										className="text-white/80 hover:text-white focus:text-white"
									>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.idType && <p className="text-red-400 text-xs mt-0.5 shake">{errors.idType.message}</p>}
						{!errors.idType && <p className="text-white/15 text-xs">Auto-detected from your input</p>}
					</div>
				</FieldGroup>
			</div>

			{/* Security notice */}
			<div
				className={cn("rounded-2xl p-4 mt-2 border transition-all duration-500")}
				style={{
					background: hasErrors ? "rgba(239, 68, 68, 0.04)" : "rgba(245, 166, 35, 0.03)",
					borderColor: hasErrors ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 166, 35, 0.06)",
				}}
			>
				<p
					className="text-xs flex items-center gap-2"
					style={{ color: hasErrors ? "rgba(239, 68, 68, 0.6)" : "rgba(245, 166, 35, 0.35)" }}
				>
					<Shield className="w-3.5 h-3.5 shrink-0" />
					{hasErrors ? "Please check the highlighted fields above." : pageCopy.securityNotice}
				</p>
			</div>
		</div>
	);
};

export default PhaseDetails;
