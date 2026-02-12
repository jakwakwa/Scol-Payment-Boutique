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
 * Entirely tap-based. Premium fintech aesthetic with rich gold accents.
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
			<div className="flex flex-row gap-2.5">
			<FieldGroup label="Product Type">
				<div className="flex flex-col gap-2.5">
					<Label
						htmlFor="productType"
						className="text-xs uppercase tracking-widest"
						style={{ color: "rgba(245, 166, 35, 0.45)" }}
					>
						Product Type
					</Label>
					<Select
						value={productType}
						onValueChange={(value) =>
							setValue("productType", value, { shouldValidate: true })
						}
					>
						<SelectTrigger
							className={cn(
								"stratcol-input transition-all duration-300",
								productType && "border-[rgba(245,166,35,0.2)]",
							)}
							id="productType"
						>
							<SelectValue placeholder="What are you looking for?" />
						</SelectTrigger>
						<SelectContent className="border-white/8 backdrop-blur-xl" style={{ background: "rgba(28, 28, 30, 0.97)" }}>
							{productOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="text-white/80 hover:text-white focus:text-white transition-colors"
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

			<FieldGroup label="Subscription Plan">
				<div className="flex flex-col gap-2.5">
					<Label
						htmlFor="subscriptionPlan"
					className="text-xs uppercase tracking-widest"
						style={{ color: "rgba(245, 166, 35, 0.45)" }}
					>
						Subscription Plan
					</Label>
					<Select
						value={subscriptionPlan}
						onValueChange={(value) =>
							setValue("subscriptionPlan", value, { shouldValidate: true })
						}
					>
						<SelectTrigger
							className={cn(
								"stratcol-input transition-all duration-300",
								subscriptionPlan && "border-[rgba(245,166,35,0.2)]",
							)}
							id="subscriptionPlan"
						>
							<SelectValue placeholder="Choose the right fit" />
						</SelectTrigger>
						<SelectContent className="border-white/8 backdrop-blur-xl" style={{ background: "rgba(28, 28, 30, 0.97)" }}>
							{planOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="text-white/80 hover:text-white focus:text-white transition-colors"
								>
									<span className="font-medium">{opt.label}</span>
									<span className="ml-2" style={{ color: "rgba(245, 166, 35, 0.6)" }}>{opt.price}</span>
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
			</div>
			{bothSelected && (
				<div className="flex items-center gap-2 pt-2 px-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
					<CheckCircle className="w-4 h-4 text-green-400" />
					<p className="text-green-400/70 text-xs font-medium">
						Great choice! You can continue when you&apos;re ready.
					</p>
				</div>
			)}
		</div>
	);
};

export default PhasePlan;
