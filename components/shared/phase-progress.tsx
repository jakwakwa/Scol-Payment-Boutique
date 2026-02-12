import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface PhaseProgressProps {
	currentPhase: number;
	labels: string[];
}

/**
 * Premium 3-phase progress indicator with rich gold accents.
 */
const PhaseProgress = ({ currentPhase, labels }: PhaseProgressProps) => {
	return (
		<div className="w-100 mb-8">
			{/* Labels row */}
			<div className="flex justify-between mb-4 px-1">
				{labels.map((label, i) => {
					const phaseNum = i + 1;
					const isActive = currentPhase === phaseNum;
					const isComplete = currentPhase > phaseNum;

					return (
						<div key={label} className="flex items-center gap-2">
							{/* Step indicator */}
							<div
								className={cn(
									"relative flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-500",
									isComplete && "text-green-400 success-pulse",
									isActive && "glow-pulse",
									!isActive && !isComplete && "text-white/20",
								)}
								style={{
									background: isComplete
										? "rgba(74, 222, 128, 0.12)"
										: isActive
											? "rgba(245, 166, 35, 0.15)"
											: "rgba(255, 255, 255, 0.04)",
									color: isActive ? "#F5A623" : undefined,
								}}
							>
								{isComplete ? (
									<CheckCircle className="w-4 h-4" />
								) : (
									phaseNum
								)}

								{isActive && (
									<span
										className="absolute inset-0 rounded-full animate-ping"
										style={{
											border: "2px solid rgba(245, 166, 35, 0.2)",
											animationDuration: "2s",
										}}
									/>
								)}
							</div>

							{/* Label text */}
							<span
								className={cn(
									"text-sm font-semibold tracking-wide transition-all duration-500",
									isComplete && "text-green-400/60",
									!isActive && !isComplete && "text-white/20",
								)}
								style={{
									color: isActive ? "#F5A623" : undefined,
								}}
							>
								{label}
							</span>
						</div>
					);
				})}
			</div>

			{/* Animated progress bar */}
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
