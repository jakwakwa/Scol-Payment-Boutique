"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
	ArrowLeft,
	ArrowRight,
	CheckCircle,
	Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import type { EMandateFormData } from "./types";
import {
	phasePlanSchema,
	phaseDetailsRefined,
	phasePaymentSchema,
} from "./schema";
import {
	phases,
	defaultFormValues,
	pageCopy,
	phaseEmotions,
} from "./content";

import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PhaseProgress from "@/components/shared/phase-progress";
import PhasePlan from "@/components/emandate/phase-plan";
import PhaseDetails from "@/components/emandate/phase-details";
import PhasePayment from "@/components/emandate/phase-payment";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "emandate-form-draft";

const phaseSchemas = {
	1: phasePlanSchema,
	2: phaseDetailsRefined,
	3: phasePaymentSchema,
} as const;

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------
function loadDraft(): { data: EMandateFormData; phase: number } | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function saveDraft(data: EMandateFormData, phase: number) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, phase }));
	} catch {
		/* silent */
	}
}

function clearDraft() {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		/* silent */
	}
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function EMandateOnboarding() {
	const [currentPhase, setCurrentPhase] = useState(1);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showCelebrate, setShowCelebrate] = useState(false);
	const directionRef = useRef<"forward" | "backward">("forward");
	const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const draftRef = useRef(typeof window !== "undefined" ? loadDraft() : null);

	const methods = useForm<EMandateFormData>({
		defaultValues: draftRef.current?.data ?? defaultFormValues,
		mode: "onTouched",
	});

	const { handleSubmit, trigger, getValues, watch, reset } = methods;

	useEffect(() => {
		const saved = draftRef.current;
		if (saved) {
			setCurrentPhase(saved.phase);
			toast(pageCopy.restoredToast, {
				action: {
					label: pageCopy.startOverLabel,
					onClick: () => {
						clearDraft();
						reset(defaultFormValues);
						setCurrentPhase(1);
					},
				},
			});
		}
	}, [reset]);

	const formValues = watch();
	useEffect(() => {
		if (isSubmitted) return;
		if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
		saveTimerRef.current = setTimeout(() => {
			saveDraft(formValues as EMandateFormData, currentPhase);
		}, 500);
		return () => {
			if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
		};
	}, [formValues, currentPhase, isSubmitted]);

	useEffect(() => {
		if (isSubmitted) return;
		const handler = (e: BeforeUnloadEvent) => {
			const values = getValues();
			const hasData = Object.entries(values).some(([key, val]) => {
				if (key === "phone" && val === "+27") return false;
				if (key === "idType" && val === "sa-id") return false;
				if (typeof val === "boolean") return val;
				return typeof val === "string" && val.length > 0;
			});
			if (hasData) e.preventDefault();
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [getValues, isSubmitted]);

	const transitionToPhase = useCallback(
		(nextPhase: number) => {
			directionRef.current =
				nextPhase > currentPhase ? "forward" : "backward";
			if (
				typeof document !== "undefined" &&
				"startViewTransition" in document
			) {
				(
					document as Document & {
						startViewTransition: (cb: () => void) => void;
					}
				).startViewTransition(() => setCurrentPhase(nextPhase));
			} else {
				setCurrentPhase(nextPhase);
			}
		},
		[currentPhase],
	);

	const handleNext = useCallback(async () => {
		const schema = phaseSchemas[currentPhase as keyof typeof phaseSchemas];
		if (!schema) return;

		const fieldNames = Object.keys(
			"shape" in schema
				? schema.shape
				: (schema as { _def: { schema: { shape: Record<string, unknown> } } })._def.schema.shape,
		) as (keyof EMandateFormData)[];

		const valid = await trigger(fieldNames);
		if (!valid) return;

		const celebrationMsg = phaseEmotions.celebrations[currentPhase - 1];
		if (celebrationMsg) {
			toast.success(celebrationMsg, { duration: 2000 });
		}

		setShowCelebrate(true);
		setTimeout(() => setShowCelebrate(false), 500);
		transitionToPhase(currentPhase + 1);
	}, [currentPhase, trigger, transitionToPhase]);

	const handlePrevious = useCallback(() => {
		if (currentPhase > 1) transitionToPhase(currentPhase - 1);
	}, [currentPhase, transitionToPhase]);

	const onSubmit = useCallback((data: EMandateFormData) => {
		console.log("eMandate registration submitted:", data);
		clearDraft();
		setIsSubmitted(true);
		toast.success(pageCopy.successTitle, {
			description: pageCopy.successMessage,
			duration: 5000,
		});
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				if (currentPhase < 3) handleNext();
			}
		},
		[currentPhase, handleNext],
	);

	const currentPhaseConfig = phases[currentPhase - 1];
	const phaseHint = phaseEmotions.hints[currentPhase - 1];
	const continueLabel = phaseEmotions.continueLabels[currentPhase - 1] || pageCopy.continueButton;

	// -----------------------------------------------------------------------
	// Success state
	// -----------------------------------------------------------------------
	if (isSubmitted) {
		return (
			<div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(170deg, #1C1C1E 0%, #151517 40%, #0E0E10 100%)' }}>
				{/* Ambient lights */}
				<div className="ambient-light w-72 h-72 top-1/4 left-1/4" style={{ background: 'rgba(74, 222, 128, 0.08)' }} />
				<div className="ambient-light w-56 h-56 bottom-1/3 right-1/4" style={{ background: 'rgba(245, 166, 35, 0.06)', animationDelay: '4s' }} />

				<div className="flex items-center justify-center min-h-screen p-4 relative z-10">
					<div className="glass-card w-full max-w-md text-center p-12 space-y-6 celebrate">
						<div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center success-pulse" style={{ background: 'rgba(74, 222, 128, 0.08)' }}>
							<CheckCircle className="w-10 h-10 text-green-400" />
						</div>
						<h2 className="text-white text-2xl font-bold tracking-tight">
							{pageCopy.successTitle}
						</h2>
						<p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
							{pageCopy.successMessage}
						</p>
						<div className="pt-2">
							<div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.3), transparent)' }} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	// -----------------------------------------------------------------------
	// Main form
	// -----------------------------------------------------------------------
	return (
		<div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(170deg, #1C1C1E 0%, #151517 40%, #0E0E10 100%)' }}>
			{/* Ambient background lights — warm gold tones */}
			<div className="ambient-light w-80 h-80 -top-24 -right-24" style={{ background: 'rgba(245, 166, 35, 0.06)' }} />
			<div className="ambient-light w-64 h-64 bottom-16 -left-20" style={{ background: 'rgba(212, 137, 26, 0.05)', animationDelay: '3s' }} />
			<div className="ambient-light w-48 h-48 top-1/2 right-1/4" style={{ background: 'rgba(255, 193, 46, 0.04)', animationDelay: '6s' }} />

			<div className="flex items-center justify-center min-h-screen p-4 md:p-6 relative z-10">
				<div className="w-full max-w-2xl">
					{/* Header */}
					<div className="mb-10 text-center">
						<div className="flex items-center justify-center gap-2.5 mb-4">
							<Sparkles className="w-5 h-5 float" style={{ color: '#F5A623' }} />
							<h1 className="text-white text-2xl font-bold tracking-tight">
								{pageCopy.brandName}
							</h1>
						</div>
						<h2 className="text-white/80 text-xl font-semibold mb-2">
							{pageCopy.pageTitle}
						</h2>
						<p className="text-white/30 text-sm">
							{pageCopy.pageSubtitle}
						</p>
					</div>

					{/* Progress bar */}
					<PhaseProgress
						currentPhase={currentPhase}
						labels={phases.map((p) => p.label)}
					/>

					{/* Premium form card */}
					<FormProvider {...methods}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							onKeyDown={handleKeyDown}
							noValidate
						>
							<div
								className={cn(
									"glass-card transition-transform duration-500",
									showCelebrate && "celebrate",
								)}
							>
								<CardHeader className="phase-header px-8 pt-8 pb-0">
									<CardTitle className="text-white text-xl font-semibold">
										{currentPhaseConfig.label}
									</CardTitle>
									<CardDescription className="text-white/35 text-sm">
										{currentPhaseConfig.description}
									</CardDescription>
									{phaseHint && (
										<p className="text-sm mt-2 font-medium animate-in fade-in-0 duration-700" style={{ color: 'rgba(245, 166, 35, 0.35)' }}>
											{phaseHint}
										</p>
									)}
								</CardHeader>

								<CardContent className="phase-content space-y-4 px-8 py-7">
									{currentPhase === 1 && <PhasePlan />}
									{currentPhase === 2 && <PhaseDetails />}
									{currentPhase === 3 && <PhasePayment />}

									{/* Navigation */}
									<div className="flex justify-between pt-5">
										<button
											type="button"
											onClick={handlePrevious}
											disabled={currentPhase === 1}
											className={cn(
												"ghost-button flex items-center gap-2 text-sm",
												currentPhase === 1 && "opacity-0 pointer-events-none",
											)}
										>
											<ArrowLeft className="w-4 h-4" />
											{pageCopy.backButton}
										</button>

										{currentPhase < 3 ? (
											<button
												type="button"
												onClick={handleNext}
												className="gold-button flex items-center gap-2 text-sm"
											>
												{continueLabel}
												<ArrowRight className="w-4 h-4" />
											</button>
										) : (
											<button
												type="submit"
												className="gold-button flex items-center gap-2 text-sm"
											>
												<CheckCircle className="w-4 h-4" />
												{pageCopy.submitButton}
											</button>
										)}
									</div>
								</CardContent>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}
