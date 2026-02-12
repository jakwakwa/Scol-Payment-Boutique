"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
// zodResolver available if needed for full-form validation
// import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

import type { EMandateFormData } from "./types";
import {
	phasePlanSchema,
	phaseDetailsRefined,
	phasePaymentSchema,
} from "./schema";
import { phases, defaultFormValues, pageCopy } from "./content";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PhaseProgress from "@/components/shared/phase-progress";
import PhasePlan from "@/components/emandate/phase-plan";
import PhaseDetails from "@/components/emandate/phase-details";
import PhasePayment from "@/components/emandate/phase-payment";

const STORAGE_KEY = "emandate-form-draft";

/** Map phase number to its Zod schema for per-phase validation */
const phaseSchemas = {
	1: phasePlanSchema,
	2: phaseDetailsRefined,
	3: phasePaymentSchema,
} as const;

// ---------------------------------------------------------------------------
// Helper: Safely read/write localStorage
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
		// Storage full or unavailable — silent fail
	}
}

function clearDraft() {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// silent
	}
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function EMandateOnboarding() {
	const [currentPhase, setCurrentPhase] = useState(1);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const directionRef = useRef<"forward" | "backward">("forward");
	const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const draftRef = useRef(typeof window !== "undefined" ? loadDraft() : null);

	const methods = useForm<EMandateFormData>({
		defaultValues: draftRef.current?.data ?? defaultFormValues,
		mode: "onTouched",
	});

	const { handleSubmit, trigger, getValues, watch, reset } = methods;

	// Show restoration toast on mount
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

	// Auto-save to localStorage (debounced)
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
			if (hasData) {
				e.preventDefault();
			}
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

	// Validate current phase, then advance
	const handleNext = useCallback(async () => {
		const schema = phaseSchemas[currentPhase as keyof typeof phaseSchemas];
		if (!schema) return;

		// Get field names from the schema shape for targeted validation
		const fieldNames = Object.keys(
			"shape" in schema ? schema.shape : (schema as { _def: { schema: { shape: Record<string, unknown> } } })._def.schema.shape,
		) as (keyof EMandateFormData)[];

		const valid = await trigger(fieldNames);
		if (!valid) return;

		transitionToPhase(currentPhase + 1);
	}, [currentPhase, trigger, transitionToPhase]);

	const handlePrevious = useCallback(() => {
		if (currentPhase > 1) {
			transitionToPhase(currentPhase - 1);
		}
	}, [currentPhase, transitionToPhase]);

	// Final submission
	const onSubmit = useCallback(
		(data: EMandateFormData) => {
			console.log("eMandate registration submitted:", data);
			clearDraft();
			setIsSubmitted(true);
			toast.success(pageCopy.successTitle, {
				description: pageCopy.successMessage,
			});
		},
		[],
	);

	// Keyboard navigation: Enter to advance
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				if (currentPhase < 3) {
					handleNext();
				}
			}
		},
		[currentPhase, handleNext],
	);

	const currentPhaseConfig = phases[currentPhase - 1];

	// Success state
	if (isSubmitted) {
		return (
			<div className="bg-gradient-to-t from-gray-950 to-stone-950/90 min-h-screen">
				<div className="flex items-center justify-center min-h-screen p-4">
					<Card className="w-full max-w-md text-center">
						<CardContent className="pt-10 pb-10 space-y-4">
							<div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
								<CheckCircle className="w-8 h-8 text-green-400" />
							</div>
							<h2 className="text-white text-2xl font-bold">
								{pageCopy.successTitle}
							</h2>
							<p className="text-gray-400 text-sm max-w-xs mx-auto">
								{pageCopy.successMessage}
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gradient-to-t from-gray-950 to-stone-950/90 min-h-screen">
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="w-full max-w-2xl">
					{/* Header */}
					<div className="mb-6 text-center">
						<div className="flex items-center justify-center gap-2 mb-3">
							<Sparkles className="w-6 h-6 text-yellow-400" />
							<h1 className="text-white text-2xl font-bold tracking-tight">
								{pageCopy.brandName}
							</h1>
						</div>
						<h2 className="text-white/90 text-lg font-medium mb-1">
							{pageCopy.pageTitle}
						</h2>
						<p className="text-gray-400 text-sm">
							{pageCopy.pageSubtitle}
						</p>
					</div>

					{/* Progress bar */}
					<PhaseProgress
						currentPhase={currentPhase}
						labels={phases.map((p) => p.label)}
					/>

					{/* Form card */}
					<FormProvider {...methods}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							onKeyDown={handleKeyDown}
							noValidate
						>
							<Card>
								<CardHeader className="phase-header">
									<CardTitle className="text-white text-lg">
										{currentPhaseConfig.label}
									</CardTitle>
									<CardDescription className="text-gray-400">
										{currentPhaseConfig.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="phase-content space-y-4">
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
											className="flex items-center gap-2 bg-transparent"
										>
											<ArrowLeft className="w-4 h-4" />
											{pageCopy.backButton}
										</Button>

										{currentPhase < 3 ? (
											<Button
												type="button"
												onClick={handleNext}
												className="flex items-center gap-2"
											>
												{pageCopy.continueButton}
												<ArrowRight className="w-4 h-4" />
											</Button>
										) : (
											<Button
												type="submit"
												className="flex items-center gap-2"
											>
												<CheckCircle className="w-4 h-4" />
												{pageCopy.submitButton}
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}
