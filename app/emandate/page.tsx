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

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PhaseProgress from "@/components/shared/phase-progress";
import PhasePlan from "@/components/emandate/phase-plan";
import PhaseDetails from "@/components/emandate/phase-details";
import PhasePayment from "@/components/emandate/phase-payment";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "emandate-form-draft";

/** Map phase number to its Zod schema for per-phase validation */
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
// Page component
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

	// Restore draft on mount
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

	// Auto-save (debounced)
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

	// Warn on accidental navigation
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

	// Phase transition with View Transitions API
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
				).startViewTransition(() => {
					setCurrentPhase(nextPhase);
				});
			} else {
				setCurrentPhase(nextPhase);
			}
		},
		[currentPhase],
	);

	// Validate current phase, then advance with celebration
	const handleNext = useCallback(async () => {
		const schema = phaseSchemas[currentPhase as keyof typeof phaseSchemas];
		if (!schema) return;

		const fieldNames = Object.keys(
			"shape" in schema
				? schema.shape
				: (
						schema as {
							_def: {
								schema: {
									shape: Record<string, unknown>;
								};
							};
						}
					)._def.schema.shape,
		) as (keyof EMandateFormData)[];

		const valid = await trigger(fieldNames);
		if (!valid) return;

		// Celebration micro-interaction
		const celebrationMsg =
			phaseEmotions.celebrations[currentPhase - 1];
		if (celebrationMsg) {
			toast.success(celebrationMsg, { duration: 2000 });
		}

		setShowCelebrate(true);
		setTimeout(() => setShowCelebrate(false), 500);

		transitionToPhase(currentPhase + 1);
	}, [currentPhase, trigger, transitionToPhase]);

	const handlePrevious = useCallback(() => {
		if (currentPhase > 1) {
			transitionToPhase(currentPhase - 1);
		}
	}, [currentPhase, transitionToPhase]);

	// Final submission
	const onSubmit = useCallback((data: EMandateFormData) => {
		console.log("eMandate registration submitted:", data);
		clearDraft();
		setIsSubmitted(true);
		toast.success(pageCopy.successTitle, {
			description: pageCopy.successMessage,
			duration: 5000,
		});
	}, []);

	// Keyboard: Enter to advance
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
	const continueLabel =
		phaseEmotions.continueLabels[currentPhase - 1] ||
		pageCopy.continueButton;

	// -----------------------------------------------------------------------
	// Success state
	// -----------------------------------------------------------------------
	if (isSubmitted) {
		return (
			<div className="bg-gradient-to-b from-gray-950 via-stone-950/95 to-gray-950 min-h-screen relative overflow-hidden">
				{/* Ambient lights */}
				<div className="ambient-light w-64 h-64 bg-green-500/20 top-1/4 left-1/4" />
				<div
					className="ambient-light w-48 h-48 bg-yellow-500/15 bottom-1/3 right-1/4"
					style={{ animationDelay: "4s" }}
				/>

				<div className="flex items-center justify-center min-h-screen p-4 relative z-10">
					<div className="glass-card w-full max-w-md text-center p-10 space-y-6 celebrate">
						<div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center success-pulse">
							<CheckCircle className="w-10 h-10 text-green-400" />
						</div>
						<h2 className="text-white text-2xl font-bold tracking-tight">
							{pageCopy.successTitle}
						</h2>
						<p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
							{pageCopy.successMessage}
						</p>
						<div className="pt-2">
							<div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mx-auto" />
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
		<div className="bg-gradient-to-b from-gray-950 via-stone-950/95 to-gray-950 min-h-screen relative overflow-hidden">
			{/* Ambient background lights */}
			<div className="ambient-light w-72 h-72 bg-yellow-600/10 -top-20 -right-20" />
			<div
				className="ambient-light w-56 h-56 bg-amber-500/8 bottom-20 -left-16"
				style={{ animationDelay: "3s" }}
			/>
			<div
				className="ambient-light w-40 h-40 bg-yellow-400/6 top-1/2 right-1/3"
				style={{ animationDelay: "6s" }}
			/>

			<div className="flex items-center justify-center min-h-screen p-4 relative z-10">
				<div className="w-full max-w-2xl">
					{/* Header with subtle float */}
					<div className="mb-8 text-center">
						<div className="flex items-center justify-center gap-2.5 mb-3">
							<Sparkles className="w-5 h-5 text-yellow-400/80 float" />
							<h1 className="text-white text-2xl font-bold tracking-tight">
								{pageCopy.brandName}
							</h1>
						</div>
						<h2 className="text-white/80 text-lg font-medium mb-1.5">
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

					{/* Glassmorphism form card */}
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
								<CardHeader className="phase-header px-7 pt-7 pb-0">
									<CardTitle className="text-white/90 text-lg font-semibold">
										{currentPhaseConfig.label}
									</CardTitle>
									<CardDescription className="text-white/35 text-sm">
										{currentPhaseConfig.description}
									</CardDescription>
									{/* Emotionally intelligent hint */}
									{phaseHint && (
										<p className="text-yellow-400/30 text-xs mt-1.5 font-medium animate-in fade-in-0 duration-700">
											{phaseHint}
										</p>
									)}
								</CardHeader>

								<CardContent className="phase-content space-y-4 px-7 py-6">
									{/* Phase panels */}
									{currentPhase === 1 && <PhasePlan />}
									{currentPhase === 2 && <PhaseDetails />}
									{currentPhase === 3 && <PhasePayment />}

									{/* Navigation */}
									<div className="flex justify-between pt-4">
										<Button
											type="button"
											variant="outline"
											onClick={handlePrevious}
											disabled={currentPhase === 1}
											className={cn(
												"flex items-center gap-2 bg-transparent border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all duration-300",
												currentPhase === 1 && "opacity-0 pointer-events-none",
											)}
										>
											<ArrowLeft className="w-4 h-4" />
											{pageCopy.backButton}
										</Button>

										{currentPhase < 3 ? (
											<Button
												type="button"
												onClick={handleNext}
												className="glow-button flex items-center gap-2"
											>
												{continueLabel}
												<ArrowRight className="w-4 h-4" />
											</Button>
										) : (
											<Button
												type="submit"
												className="glow-button flex items-center gap-2"
											>
												<CheckCircle className="w-4 h-4" />
												{pageCopy.submitButton}
											</Button>
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
