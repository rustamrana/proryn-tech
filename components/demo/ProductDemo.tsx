'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import DemoStep from './DemoStep';
import DemoCompletion from './DemoCompletion';
import { businessOSSteps } from './demo-data';

const STORAGE_KEY = 'proryn-demo-step';

export default function ProductDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const totalSteps = businessOSSteps.length;

  // Restore step from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < totalSteps) {
          setCurrentStep(parsed);
          setIsStarted(true);
        }
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [totalSteps]);

  // Save step to sessionStorage
  useEffect(() => {
    if (isStarted) {
      try {
        sessionStorage.setItem(STORAGE_KEY, String(currentStep));
      } catch {
        // sessionStorage unavailable
      }
    }
  }, [currentStep, isStarted]);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, [currentStep, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setDirection(1);
    setIsCompleted(false);
    setIsStarted(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '0');
    } catch {
      // ignore
    }
  }, []);

  const startDemo = useCallback(() => {
    setIsStarted(true);
    setCurrentStep(0);
    setDirection(1);
    setIsCompleted(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isStarted || isCompleted) return;
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isCompleted, goNext, goPrev]);

  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  // Landing state before demo starts
  if (!isStarted) {
    return (
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-accent shadow-lg">
              <Play className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-6 font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">
              Try the Interactive Demo
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-inter text-base text-slate-600">
              Experience PRORYN BusinessOS through a guided walkthrough. Explore
              each module, discover key features, and see how it all fits
              together.
            </p>
            <button
              onClick={startDemo}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-8 py-4 font-inter text-base font-semibold text-white shadow-lg shadow-brand-secondary/25 transition-all hover:bg-blue-700 hover:shadow-xl"
            >
              <Play className="h-5 w-5" />
              Start Interactive Demo
            </button>
            <p className="mt-3 font-inter text-xs text-slate-400">
              5 steps · ~2 min · No signup required
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-poppins text-2xl font-bold text-brand-primary sm:text-3xl">
            Interactive Demo — PRORYN BusinessOS
          </h2>
          <p className="mt-2 font-inter text-sm text-slate-500">
            Use arrow keys or buttons to navigate · Click hotspots to explore
          </p>
        </div>

        {isCompleted ? (
          <DemoCompletion steps={businessOSSteps} onRestart={restart} />
        ) : (
          <>
            {/* Progress bar */}
            <div className="mx-auto mb-10 max-w-2xl">
              <div className="flex items-center justify-between">
                <span className="font-inter text-xs font-medium text-slate-500">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="font-inter text-xs font-medium text-brand-secondary">
                  {Math.round(progressPercent)}% complete
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <div className="relative min-h-[400px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <DemoStep
                  key={businessOSSteps[currentStep].id}
                  step={businessOSSteps[currentStep]}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={goPrev}
                disabled={currentStep === 0}
                aria-label="Previous step"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-5 py-3 font-inter text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {/* Step dots */}
              <div className="hidden items-center gap-2 sm:flex">
                {businessOSSteps.map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setDirection(i > currentStep ? 1 : -1);
                      setCurrentStep(i);
                    }}
                    aria-label={`Go to step ${i + 1}: ${step.title}`}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      i === currentStep
                        ? 'scale-125 bg-brand-secondary'
                        : i < currentStep
                          ? 'bg-brand-secondary/40'
                          : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                aria-label={
                  currentStep === totalSteps - 1
                    ? 'Complete demo'
                    : 'Next step'
                }
                className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 font-inter text-sm font-semibold text-white shadow-md shadow-brand-secondary/20 transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
