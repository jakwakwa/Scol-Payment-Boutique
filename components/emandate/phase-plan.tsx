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

/**
 * Phase 1: Choose Your Plan
 * Two quick select fields — product type and subscription plan.
 * Entirely tap-based, zero keystrokes.
 */
const PhasePlan = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<EMandateFormData>();

	const productType = watch("productType");
	const subscriptionPlan = watch("subscriptionPlan");

	return (
		<div className="space-y-2">
			{/* Product Type */}
			<FieldGroup label="Product Type">
				<div className="flex flex-col gap-2">
					<Label
						htmlFor="productType"
						className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
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
						<SelectTrigger className="stratcol-input" id="productType">
							<SelectValue placeholder="Select product type" />
						</SelectTrigger>
						<SelectContent className="bg-stone-900/95 border-gray-600 backdrop-blur-md">
							{productOptions.map((opt) => (
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
					{errors.productType && (
						<p className="text-red-400 text-xs mt-1">
							{errors.productType.message}
						</p>
					)}
				</div>
			</FieldGroup>

			{/* Subscription Plan */}
			<FieldGroup label="Subscription Plan">
				<div className="flex flex-col gap-2">
					<Label
						htmlFor="subscriptionPlan"
						className="text-yellow-600/60 text-xs uppercase tracking-wider font-semibold"
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
						<SelectTrigger className="stratcol-input" id="subscriptionPlan">
							<SelectValue placeholder="Select subscription plan" />
						</SelectTrigger>
						<SelectContent className="bg-stone-900/95 border-gray-600 backdrop-blur-md">
							{planOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="text-white hover:bg-gray-700"
								>
									{opt.label} &mdash; {opt.price}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.subscriptionPlan && (
						<p className="text-red-400 text-xs mt-1">
							{errors.subscriptionPlan.message}
						</p>
					)}
				</div>
			</FieldGroup>
		</div>
	);
};

export default PhasePlan;
