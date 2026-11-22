// ============================================================
// src/components/IAQ/WindowSchedule.tsx
// Smart Inversion-Aware Window Ventilation Schedule
// ============================================================

import { memo } from 'react';

interface WindowScheduleProps {
  currentAqi: number;
}

export const WindowSchedule = memo(function WindowSchedule({ currentAqi }: WindowScheduleProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-3 backdrop-blur-xl">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <span aria-hidden="true">🪟</span> Smart Inversion-Aware Window Ventilation Schedule
      </h3>
      <p className="text-xs text-slate-400">
        Tailored to current outdoor AQI ({currentAqi}) and meteorological boundary layer dynamics.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
        <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400 block font-mono">
              Morning Inversion Lock (6:00 – 10:30 AM)
            </span>
            <strong className="text-white text-sm block mt-1.5 font-semibold">Windows Tightly Latched</strong>
          </div>
          <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
            Cold nocturnal air traps ground-level vehicular soot. Opening windows increases indoor PM2.5 by 300%.
          </p>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 block font-mono">
              Optimal Flush Window (1:30 – 3:30 PM)
            </span>
            <strong className="text-white text-sm block mt-1.5 font-semibold">Crack Opposing Windows (15m)</strong>
          </div>
          <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
            Solar radiation breaks surface inversion, maximizing vertical air mixing and flushing stale CO2.
          </p>
        </div>

        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 block font-mono">
              Evening Rush Trap (5:30 – 9:00 PM)
            </span>
            <strong className="text-white text-sm block mt-1.5 font-semibold">Seal Perimeter & Run HEPA</strong>
          </div>
          <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
            Commuter traffic and cooling surface temperatures cause toxic secondary particulate settling.
          </p>
        </div>
      </div>
    </div>
  );
});
