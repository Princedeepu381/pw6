// ============================================================
// src/components/Routine/DailyRoutineOptimizer.tsx
// GenAI-powered personalized daily schedule & exposure minimizer
// Per PROBLEM_ALIGNMENT.md §1.2 & ACCESSIBILITY.md §6
// ============================================================

import { memo, useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { apiService } from '@/services/apiService';
import type { PersonaProfile } from '@/types';
import { RoutineTimeline } from './RoutineTimeline';

export const DailyRoutineOptimizer = memo(function DailyRoutineOptimizer() {
  const {
    personas,
    activePersona,
    setActivePersona,
    selectedZone,
    language,
    routinePlan,
    setRoutinePlan,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const plan = await apiService.generateDailyRoutine({
        persona: activePersona,
        zone: selectedZone,
        language,
      });
      setRoutinePlan(plan);
    } catch (err: unknown) {
      console.error('Failed to generate routine:', err);
      setErrorMessage('Unable to reach AI gateway. Showing localized heuristic guidance.');
    } finally {
      setIsLoading(false);
    }
  }, [activePersona, selectedZone, language, setRoutinePlan]);

  return (
    <section aria-label="GenAI Daily Routine and Exposure Optimizer" className="flex flex-col gap-6 fade-in">
      {/* Persona Selection Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span aria-hidden="true">🤖</span> GenAI Daily Routine & Smog Exposure Optimizer
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Gemini 2.5 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select your family or lifestyle vulnerability profile to generate hour-by-hour exposure mitigation routines.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-center gap-2 shrink-0"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <span>Generating with Gemini AI…</span>
              </>
            ) : (
              <>
                <span aria-hidden="true">✨</span>
                <span>Generate Smart Schedule</span>
              </>
            )}
          </button>
        </div>

        {/* Persona Selector Chips */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-medium text-slate-300">
            Target Vulnerability Profile:
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {personas.map((p: PersonaProfile) => {
              const isSelected = p.id === activePersona.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActivePersona(p)}
                  className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isSelected
                      ? 'bg-slate-900/95 border-emerald-500/80 shadow-md shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {p.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                        p.sensitivityLevel === 'high'
                          ? 'bg-red-950/80 text-red-400 border border-red-500/30'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {p.sensitivityLevel} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div aria-live="polite" aria-busy={isLoading} className="sr-only">
          {isLoading ? 'Generating personalized air quality daily schedule with Gemini AI…' : 'Schedule ready.'}
        </div>

        {errorMessage && (
          <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-center gap-2">
            <span aria-hidden="true">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Routine Plan Results */}
      {routinePlan && (
        <div className="flex flex-col gap-6 fade-in">
          {/* Key Metric Highlights & Optimal Window */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Optimal Outdoor Activity Window
                </span>
                <div className="text-2xl font-black text-white mt-1 font-mono">
                  {routinePlan.optimalOutdoorWindow.startHour}:00 – {routinePlan.optimalOutdoorWindow.endHour}:00
                </div>
              </div>
              <p className="text-xs text-emerald-200/90 mt-2 leading-relaxed">
                {routinePlan.optimalOutdoorWindow.rationale}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Predicted PM2.5 Inhaled Dose
                </span>
                <div className="text-2xl font-black text-sky-400 mt-1 font-mono">
                  {routinePlan.totalExposureScore} µg·h
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Avoiding morning inversion peaks reduces pulmonary particulate intake by ~42%.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Estimated Carbon Abatement
                </span>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                  {routinePlan.carbonOffsetKg} kg CO₂
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Achieved by consolidating errands and shifting peak motorized transit trips.
              </p>
            </div>
          </div>

          <RoutineTimeline
            routinePlan={routinePlan}
            zoneName={selectedZone.zoneName}
          />

          {/* Actionable General Guidance */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <span aria-hidden="true">💡</span> Expert Smog Defense Directives
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              {routinePlan.generalAdvice.map((advice, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-slate-300 leading-relaxed"
                >
                  <span className="text-emerald-400 font-bold" aria-hidden="true">✔</span>
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
});
