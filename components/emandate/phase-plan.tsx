"use client";

import { useFormContext } from "react-hook-form";
import type { EMandateFormData } from "@/app/emandate/types";
import { productOptions, planOptions } from "@/app/emandate/content";
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
import { CheckCircle } from "lucide-react";

/**
 * Phase 1: Choose Your Plan
 * Two quick select fields with visual feedback.
 * Entirely tap-based, zero keystrokes. Feels like browsing, not filling a form.
 */
const PhasePlan = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<EMandateFormData>();

	const productType = watch("productType");
	const subscriptionPlan = watch("subscriptionPlan");

	const bothSelected = !!productType && !!subscriptionPlan;

	return (
		<div className="space-y-3">
			{/* Product Type */}
			<FieldGroup label="Product Type">
				<div className="flex flex-col gap-2.5">
					<Label
						htmlFor="productType"
						className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
					>
						Product Type
					</Label>
					<Select
						value={productType}
						onValueChange={(value) =>
							setValue("productType", value, {
								shouldValidate: true,
							})
						}
					>
						<SelectTrigger
							className={cn(
								"stratcol-input transition-all duration-300",
								productType && "border-yellow-500/20",
							)}
							id="productType"
						>
							<SelectValue placeholder="What are you looking for?" />
						</SelectTrigger>
						<SelectContent className="bg-stone-950/95 border-white/10 backdrop-blur-xl">
							{productOptions.map((opt) => (
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
					{errors.productType && (
						<p className="text-red-400 text-xs mt-0.5 shake">
							{errors.productType.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Subscription Plan */}
			<FieldGroup label="Subscription Plan">
				<div className="flex flex-col gap-2.5">
					<Label
						htmlFor="subscriptionPlan"
						className="text-yellow-500/50 text-xs uppercase tracking-widest font-semibold"
					>
						Subscription Plan
					</Label>
					<Select
						value={subscriptionPlan}
						onValueChange={(value) =>
							setValue("subscriptionPlan", value, {
								shouldValidate: true,
							})
						}
					>
						<SelectTrigger
							className={cn(
								"stratcol-input transition-all duration-300",
								subscriptionPlan && "border-yellow-500/20",
							)}
							id="subscriptionPlan"
						>
							<SelectValue placeholder="Choose the right fit" />
						</SelectTrigger>
						<SelectContent className="bg-stone-950/95 border-white/10 backdrop-blur-xl">
							{planOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="text-white/80 hover:bg-yellow-500/10 hover:text-yellow-200 focus:bg-yellow-500/10 focus:text-yellow-200 transition-colors"
								>
									<span className="font-medium">{opt.label}</span>
									<span className="text-yellow-400/60 ml-2">{opt.price}</span>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.subscriptionPlan && (
						<p className="text-red-400 text-xs mt-0.5 shake">
							{errors.subscriptionPlan.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Micro-interaction: confirmation when both selected */}
			{bothSelected && (
				<div className="flex items-center gap-2 pt-2 px-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
					<CheckCircle className="w-4 h-4 text-green-400" />
					<p className="text-green-400/80 text-xs font-medium">
						Great choice! You can continue when you&apos;re ready.
					</p>
				</div>
			)}
		</div>
	);
};

export default PhasePlan;
