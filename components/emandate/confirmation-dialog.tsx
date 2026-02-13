"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { EMandateFormData } from "@/app/emandate/types";
import {
  pageCopy,
  mandateTypeLabelMap,
  productLabelMap,
  bankLabelMap,
  idTypeOptions,
} from "@/app/emandate/content";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Building2,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Fingerprint,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: EMandateFormData;
  onConfirm: () => void;
}

/** Resolves the human-readable ID type label */
function idTypeLabel(value: string): string {
  return idTypeOptions.find((o) => o.value === value)?.label ?? value;
}

/** Masks an account number, showing only the last 4 digits */
function maskAccount(acc: string): string {
  if (acc.length <= 4) return acc;
  return `${"•".repeat(acc.length - 4)}${acc.slice(-4)}`;
}

/**
 * Premium confirmation dialog that summarises the full eMandate application
 * before the user commits. Warm gold + charcoal palette.
 */
const ConfirmationDialog = ({
  open,
  onOpenChange,
  data,
  onConfirm,
}: ConfirmationDialogProps): React.ReactNode => {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const canSubmit = termsAccepted && privacyAccepted;

  // Reset checkboxes when the dialog opens
  useEffect(() => {
    if (open) {
      setTermsAccepted(false);
      setPrivacyAccepted(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="confirmation-dialog md:max-w-4xl p-0 gap-0 border-none overflow-hidden sm:rounded-3xl">
        {/* ── Header ──────────────────────────────────────── */}
        <DialogHeader className="relative px-7 pt-7 pb-5">
          {/* Top gold accent line */}
          <div
            className="absolute top-0 left-[12%] right-[12%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,166,35,0.55), transparent)",
            }}
          />

          <div className="flex items-center gap-3 mb-1">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,166,35,0.15), rgba(245,166,35,0.06))",
              }}
            >
              <Sparkles
                className="w-4.5 h-4.5"
                style={{ color: "rgba(245, 166, 35, 0.7)" }}
              />
            </div>
            <DialogTitle className="text-foreground text-xl font-bold tracking-tight">
              {pageCopy.confirmationTitle}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* ── Body ────────────────────────────────────────── */}
        <div className="px-7 pb-0 m-1 grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Mandate section */}
          <SummarySection title="Mandate">
            <SummaryItem
              icon={<Tag className="w-3.5 h-3.5" />}
              label="Mandate Type"
              value={mandateTypeLabelMap[data.mandateType] || "—"}
            />
            <SummaryItem
              icon={<CreditCard className="w-3.5 h-3.5" />}
              label="Product Type"
              value={productLabelMap[data.productType] || "—"}
            />
          </SummarySection>

          {/* Personal details section */}
          <SummarySection
            title="Personal Details"
            className="h-full row-span-2"
          >
            <SummaryItem
              icon={<User className="w-3.5 h-3.5" />}
              label="Name"
              value={fullName || "—"}
            />
            <SummaryItem
              icon={<Mail className="w-3.5 h-3.5" />}
              label="Email"
              value={data.email || "—"}
            />
            <SummaryItem
              icon={<Phone className="w-3.5 h-3.5" />}
              label="Phone"
              value={data.phone || "—"}
            />
            <SummaryItem
              icon={<Fingerprint className="w-3.5 h-3.5" />}
              label={idTypeLabel(data.idType)}
              value={data.idNumber || "—"}
            />
          </SummarySection>

          {/* Banking section */}
          <SummarySection title="Bank Account">
            <SummaryItem
              icon={<Building2 className="w-3.5 h-3.5" />}
              label="Bank"
              value={bankLabelMap[data.bankName] || "—"}
            />
            <SummaryItem
              icon={<CreditCard className="w-3.5 h-3.5" />}
              label="Account"
              value={
                data.accountNumber
                  ? `${data.accountType ? `${data.accountType.charAt(0).toUpperCase()}${data.accountType.slice(1)} · ` : ""}${maskAccount(data.accountNumber)}`
                  : "—"
              }
            />
            <SummaryItem
              icon={<ShieldCheck className="w-3.5 h-3.5" />}
              label="Branch Code"
              value={data.branchCode || "—"}
            />
          </SummarySection>
          <div
            className="col-span-2 rounded-xl py-2.5 px-4 border mb-3"
            style={{
              background: "rgba(245, 166, 35, 0.075)",
              borderColor: "rgba(245, 166, 35, 0.06)",
            }}
          >
            <p className="text-xs flex items-center gap-2 text-chart-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              {pageCopy.securityNotice}
            </p>
          </div>
        </div>

        {/* ── Terms & Privacy ────────────────────────────── */}
        <div className="px-9 space-y-3">
          <div className="flex items-start space-x-3 group">
            <Checkbox
              id="dialog-terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5"
            />
            <Label
              htmlFor="dialog-terms"
              className="text-xs leading-relaxed cursor-pointer text-white/50 group-hover:text-white/70 transition-colors"
            >
              {pageCopy.termsLabel}
            </Label>
          </div>

          <div className="flex items-start space-x-3 group">
            <Checkbox
              id="dialog-privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) =>
                setPrivacyAccepted(checked === true)
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="dialog-privacy"
              className="text-xs leading-relaxed cursor-pointer text-white/50 group-hover:text-white/70 transition-colors"
            >
              {pageCopy.privacyLabel}
            </Label>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <DialogFooter className="px-7 pt-3 pb-7 flex flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="ghost-button flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Details
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!canSubmit}
            className={cn(
              "gold-button flex items-center gap-2 text-sm transition-opacity",
              !canSubmit && "opacity-40 cursor-not-allowed",
            )}
          >
            <CheckCircle className="w-4 h-4" />
            Confirm &amp; Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SummarySection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card  rounded-sm shadow-md shadow-black/20 p-4 border space-y-2.5",
        className,
      )}
      style={{
        borderColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <h4
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: "rgba(245, 166, 35, 0.45)" }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  const isFilled = value !== "—";
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="shrink-0" style={{ color: "rgba(245, 166, 35, 0.3)" }}>
        {icon}
      </span>
      <span className="text-white/30 text-xs w-24 shrink-0">{label}</span>
      <span
        className={cn(
          "transition-colors duration-300 text-xs font-medium  truncate",
          isFilled ? "text-white/75" : "text-white/15",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default ConfirmationDialog;
