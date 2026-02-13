"use client";

import { useFormContext } from "react-hook-form";
import type { EMandateFormData } from "@/app/emandate/types";
import { mandateTypeOptions, productOptions } from "@/app/emandate/content";
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
 * Phase 1: Mandate Selection
 * Entirely tap-based. Premium fintech aesthetic with rich gold accents.
 */
const PhasePlan = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EMandateFormData>();

  const mandateType = watch("mandateType");
  const productType = watch("productType");
  const bothSelected = !!mandateType && !!productType;

  return (
    <div className="space-y-3">
      <div className="flex flex-row gap-2.5">
        <FieldGroup label="Mandate Type">
          <div className="flex flex-col gap-2.5">
            <Label
              htmlFor="mandateType"
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(245, 166, 35, 0.45)" }}
            >
              Mandate Type
            </Label>
            <Select
              value={mandateType}
              onValueChange={(value) =>
                setValue("mandateType", value, { shouldValidate: true })
              }
            >
              <SelectTrigger
                className={cn(
                  "stratcol-input transition-all duration-300",
                  mandateType && "border-[rgba(245,166,35,0.2)]",
                )}
                id="mandateType"
              >
                <SelectValue placeholder="Select Mandate Type" />
              </SelectTrigger>
              <SelectContent
                className="border-white/8 backdrop-blur-xl"
                style={{ background: "rgba(28, 28, 30, 0.97)" }}
              >
                {mandateTypeOptions.map((opt) => (
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

            {errors.mandateType && (
              <p className="text-red-400 text-xs mt-0.5 shake">
                {errors.mandateType.message}
              </p>
            )}
          </div>
        </FieldGroup>

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
                <SelectValue placeholder="Select Product Type" />
              </SelectTrigger>
              <SelectContent
                className="border-white/8 backdrop-blur-xl"
                style={{ background: "rgba(28, 28, 30, 0.97)" }}
              >
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
