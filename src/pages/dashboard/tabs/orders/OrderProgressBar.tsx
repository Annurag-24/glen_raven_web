import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperTrigger,
} from '@/components/ui/Stepper';
import { Check, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export type ProgressStep = {
  id: string;
  label: string;
  date?: Date | string;
  completedBy?: string;
  isCompleted: boolean;
  isCurrent: boolean;
};

type OrderProgressBarProps = {
  steps: ProgressStep[];
  className?: string;
};

export default function OrderProgressBar({ steps, className }: OrderProgressBarProps) {
  const currentStepIndex = steps.findIndex((s) => s.isCurrent) + 1;
  const confirmedIndex = steps.findIndex((s) => s.id === 'confirmed') + 1;

  return (
    <div className={cn('w-full', className)}>
      <Stepper defaultValue={currentStepIndex} className="space-y-6">
        <StepperNav className="relative flex items-start">
          {/* Progress Line Background - Full width, always visible */}
          <div className="absolute top-[31px] left-0 right-0 h-0.5 bg-gray-200 z-0" />

          {/* Progress Line Fill - Blue for completed, gray for incomplete */}
          <div
            className="absolute top-[31px] left-0 h-0.5 transition-all duration-300 z-10 pointer-events-none"
            style={{
              width: `${(steps.filter((s) => s.isCompleted).length / steps.length) * 100}%`,
              backgroundColor: '#036FED',
            }}
          />

          {/* Remove individual separators - use continuous progress line instead */}

          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = step.isCompleted;
            const isCurrent = step.isCurrent;
            const isConfirmed = stepNumber === confirmedIndex;

            // Circle color logic
            const circleColor = isCompleted
              ? '#036FED'
              : isCurrent && isConfirmed
                ? '#0B6936'
                : '#E5E7EB';

            // Line color: Blue if previous step is completed, gray otherwise

            return (
              <StepperItem key={step.id} step={stepNumber} className="flex-1 min-w-0 relative z-20">
                <StepperTrigger className="flex flex-col items-center gap-1 w-full">
                  {/* Label on top */}
                  <span
                    className={cn(
                      'text-[12.3px] font-medium whitespace-nowrap',
                      (isCompleted || isCurrent) && 'text-[#52525B]',
                      !isCompleted && !isCurrent && 'text-gray-500'
                    )}
                  >
                    {step.label}
                  </span>

                  {/* Circle - 15px */}
                  <StepperIndicator
                    className={cn(
                      'w-[15px] h-[15px] border-2 transition-all duration-300 flex items-center justify-center shrink-0',
                      isCompleted && 'bg-[#036FED] border-[#036FED]',
                      isCurrent && isConfirmed && 'bg-[#0B6936] border-[#0B6936]',
                      !isCompleted && !isCurrent && 'bg-white border-gray-300'
                    )}
                    style={{
                      backgroundColor: circleColor,
                      borderColor: circleColor,
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : isCurrent ? (
                      <Circle className="w-3 h-3 text-white fill-white" />
                    ) : (
                      <Circle className="w-3 h-3 text-gray-400" />
                    )}
                  </StepperIndicator>

                  {/* Date and completedBy below circle */}
                  {step.date && (
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[10.93px] text-[#71717A] whitespace-nowrap">
                        {typeof step.date === 'string'
                          ? step.date
                          : format(step.date, 'EEE, d MMM')}
                      </span>
                      {step.completedBy && (
                        <span className="text-[8px] text-[#71717A] whitespace-nowrap">
                          {step.completedBy}
                        </span>
                      )}
                    </div>
                  )}
                </StepperTrigger>
                {/* Separators removed - using continuous progress line instead */}
              </StepperItem>
            );
          })}
        </StepperNav>
        {/* <StepperPanel className="hidden">
                    {steps.map((step, index) => (
                        <StepperContent key={step.id} value={index + 1}>
                            {step.label}
                        </StepperContent>
                    ))}
                </StepperPanel> */}
      </Stepper>
    </div>
  );
}
