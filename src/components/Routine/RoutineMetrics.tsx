// ============================================================
// src/components/Routine/RoutineMetrics.tsx
// Key metric highlights and expert smog defense directives
// ============================================================

import { memo } from 'react';
import type { DailyRoutinePlan } from '@/types';

interface RoutineMetricsProps {
  routinePlan: DailyRoutinePlan;
}

export const RoutineMetrics = memo(function RoutineMetrics({
  routinePlan,
}: RoutineMetricsProps) {
  return (
    <>
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
    </>
  );
});
