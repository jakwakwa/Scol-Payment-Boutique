import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface PhaseProgressProps {
	currentPhase: number;
	labels: string[];
}

/**
 * Immersive 3-phase progress indicator with:
 * - Glowing active step dot with pulse animation
 * - Animated gradient bar with ambient glow
 * - Completed steps with celebratory checkmarks
 * - Emotionally intelligent labels
 */
const PhaseProgress = ({ currentPhase, labels }: PhaseProgressProps) => {
	return (
		<div className="w-full max-w-md mx-auto mb-8">
			{/* Labels row */}
			<div className="flex justify-between mb-4 px-1">
				{labels.map((label, i) => {
					const phaseNum = i + 1;
					const isActive = currentPhase === phaseNum;
					const isComplete = currentPhase > phaseNum;

					return (
						<div key={label} className="flex items-center gap-2">
							{/* Step indicator with glow */}
							<div
								className={cn(
									"relative flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-500",
									isComplete &&
										"bg-green-500/20 text-green-400 success-pulse",
									isActive &&
										"bg-yellow-500/20 text-yellow-300 glow-pulse",
									!isActive &&
										!isComplete &&
										"bg-white/5 text-white/25",
								)}
							>
								{isComplete ? (
									<CheckCircle className="w-4 h-4" />
								) : (
									phaseNum
								)}

								{/* Active indicator ring */}
								{isActive && (
									<span className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-ping" style={{ animationDuration: '2s' }} />
								)}
							</div>

							{/* Label text */}
							<span
								className={cn(
									"text-sm font-semibold tracking-wide transition-all duration-500",
									isActive && "text-yellow-300",
									isComplete && "text-green-400/70",
									!isActive &&
										!isComplete &&
										"text-white/25",
								)}
							>
								{label}
							</span>
						</div>
					);
				})}
			</div>

			{/* Animated progress bar with glow */}
			<div className="relative">
				<div
					className="progress-track"
					data-phase={currentPhase}
					role="progressbar"
					aria-valuenow={currentPhase}
					aria-valuemin={1}
					aria-valuemax={labels.length}
					aria-label={`Step ${currentPhase} of ${labels.length}`}
				/>
			</div>
		</div>
	);
};

export default PhaseProgress;
