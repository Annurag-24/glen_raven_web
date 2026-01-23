'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------------------------------*/

type StepperOrientation = 'horizontal' | 'vertical';
type StepState = 'active' | 'completed' | 'inactive' | 'loading';

type StepIndicators = {
  active?: React.ReactNode;
  completed?: React.ReactNode;
  inactive?: React.ReactNode;
  loading?: React.ReactNode;
};

interface StepperContextValue {
  activeStep: number;
  setActiveStep: (step: number) => void;
  stepsCount: number;
  orientation: StepperOrientation;
  registerTrigger: (node: HTMLButtonElement | null) => void;
  triggerNodes: HTMLButtonElement[];
  focusNext: (index: number) => void;
  focusPrev: (index: number) => void;
  focusFirst: () => void;
  focusLast: () => void;
  indicators: StepIndicators;
}

interface StepItemContextValue {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Contexts
 * -------------------------------------------------------------------------------------------------*/

const StepperContext = React.createContext<StepperContextValue | null>(null);
const StepItemContext = React.createContext<StepItemContextValue | null>(null);

/* -------------------------------------------------------------------------------------------------
 * Hooks (kept in same file, but stable)
 * -------------------------------------------------------------------------------------------------*/

export function useStepper() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) throw new Error('useStepper must be used within <Stepper />');
  return ctx;
}

export function useStepItem() {
  const ctx = React.useContext(StepItemContext);
  if (!ctx) throw new Error('useStepItem must be used within <StepperItem />');
  return ctx;
}

/* -------------------------------------------------------------------------------------------------
 * Stepper
 * -------------------------------------------------------------------------------------------------*/

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: StepperOrientation;
  indicators?: StepIndicators;
}

export function Stepper({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = 'horizontal',
  indicators = {},
  className,
  children,
  ...props
}: StepperProps) {
  const [internalStep, setInternalStep] = React.useState(defaultValue);
  const [triggerNodes, setTriggerNodes] = React.useState<HTMLButtonElement[]>([]);

  const activeStep = value ?? internalStep;

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) setInternalStep(step);
      onValueChange?.(step);
    },
    [value, onValueChange]
  );

  const registerTrigger = React.useCallback((node: HTMLButtonElement | null) => {
    setTriggerNodes((prev) => {
      if (!node) return prev.filter((n) => n !== node);
      if (prev.includes(node)) return prev;
      return [...prev, node];
    });
  }, []);

  const focusAt = React.useCallback((idx: number) => triggerNodes[idx]?.focus(), [triggerNodes]);

  const focusNext = React.useCallback(
    (idx: number) => focusAt((idx + 1) % triggerNodes.length),
    [focusAt, triggerNodes.length]
  );

  const focusPrev = React.useCallback(
    (idx: number) => focusAt((idx - 1 + triggerNodes.length) % triggerNodes.length),
    [focusAt, triggerNodes.length]
  );

  const focusFirst = React.useCallback(() => focusAt(0), [focusAt]);
  const focusLast = React.useCallback(
    () => focusAt(triggerNodes.length - 1),
    [focusAt, triggerNodes.length]
  );

  const stepsCount = React.Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) &&
      typeof child.type === 'function' &&
      (child.type as React.FC).displayName === 'StepperItem'
  ).length;

  const context = React.useMemo(
    () => ({
      activeStep,
      setActiveStep,
      stepsCount,
      orientation,
      registerTrigger,
      triggerNodes,
      focusNext,
      focusPrev,
      focusFirst,
      focusLast,
      indicators,
    }),
    [
      activeStep,
      setActiveStep,
      stepsCount,
      orientation,
      registerTrigger,
      triggerNodes,
      focusNext,
      focusPrev,
      focusFirst,
      focusLast,
      indicators,
    ]
  );

  return (
    <StepperContext.Provider value={context}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * StepperItem
 * -------------------------------------------------------------------------------------------------*/

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { activeStep } = useStepper();

  const state: StepState =
    completed || step < activeStep ? 'completed' : step === activeStep ? 'active' : 'inactive';

  const isLoading = loading && step === activeStep;

  return (
    <StepItemContext.Provider value={{ step, state, isDisabled: disabled, isLoading }}>
      <div data-state={state} className={cn('flex items-center gap-2', className)} {...props}>
        {children}
      </div>
    </StepItemContext.Provider>
  );
}

StepperItem.displayName = 'StepperItem';
