// ============================================================
// src/components/Routine/RoutineTimeline.tsx
// Hour-by-hour exposure schedule timeline list
// ============================================================

import { memo } from 'react';
import type { DailyRoutinePlan } from '@/types';

interface RoutineTimelineProps {
  routinePlan: DailyRoutinePlan;
  zoneName: string;
}

export const RoutineTimeline = memo(function RoutineTimeline({
  routinePlan,
  zoneName,
}: RoutineTimelineProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 backdrop-blur-xl">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span aria-hidden="true">📅</span> Hour-by-Hour Exposure & Routine Timeline
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Tailored for {routinePlan.persona} in {zoneName}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {routinePlan.hourlySchedule.map((slot) => {
          const isOutdoor = slot.recommendation === 'safe-outdoor';
          const isIndoorOnly = slot.recommendation === 'indoor-only';

          return (
            <div
              key={slot.hour}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isIndoorOnly
                  ? 'bg-red-950/15 border-red-500/25'
                  : isOutdoor
                  ? 'bg-emerald-950/15 border-emerald-500/25'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 min-w-[140px]">
                <span className="text-sm font-bold text-white font-mono">
                  {slot.timeLabel}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    isIndoorOnly
                      ? 'bg-red-950/80 text-red-400 border border-red-500/30'
                      : isOutdoor
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {slot.recommendation.replace('-', ' ')}
                </span>
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{slot.activity}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{slot.healthImpactNotes}</p>
              </div>

              <div className="flex items-center gap-4 text-xs min-w-[160px] justify-end">
                <div className="text-right">
                  <div className="text-slate-500 text-[10px] font-mono">Predicted AQI</div>
                  <div className="font-bold text-white font-mono">{slot.predictedAQI}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 text-[10px] font-mono">Inversion Risk</div>
                  <div
                    className={`font-semibold capitalize text-xs ${
                      slot.inversionLikelihood === 'high' ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {slot.inversionLikelihood}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
