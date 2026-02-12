import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface PhaseProgressProps {
	currentPhase: number;
	labels: string[];
}

/**
 * 3-phase progress indicator with an animated gradient bar
 * and compact text labels. Uses the `.progress-track` CSS class
 * defined in globals.css for the background-size transition.
 */
const PhaseProgress = ({ currentPhase, labels }: PhaseProgressProps) => {
	return (
		<div className="w-full max-w-md mx-auto mb-6">
			{/* Labels row */}
			<div className="flex justify-between mb-3 px-1">
				{labels.map((label, i) => {
					const phaseNum = i + 1;
					const isActive = currentPhase === phaseNum;
					const isComplete = currentPhase > phaseNum;

					return (
						<div key={label} className="flex items-center gap-1.5">
							{/* Step indicator */}
							<div
								className={cn(
									"flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-all duration-300",
									isComplete &&
										"bg-yellow-500/20 text-yellow-400",
									isActive &&
										"bg-yellow-500/30 text-yellow-300 ring-2 ring-yellow-500/40",
									!isActive &&
										!isComplete &&
										"bg-white/5 text-white/30",
								)}
							>
								{isComplete ? (
									<CheckCircle className="w-3.5 h-3.5" />
								) : (
									phaseNum
								)}
							</div>

							{/* Label text */}
							<span
								className={cn(
									"text-sm font-medium transition-colors duration-300",
									isActive && "text-yellow-300",
									isComplete && "text-yellow-500/70",
									!isActive &&
										!isComplete &&
										"text-white/30",
								)}
							>
								{label}
							</span>
						</div>
					);
				})}
			</div>

			{/* Animated progress bar */}
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
	);
};

export default PhaseProgress;
