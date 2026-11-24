// ============================================================
// src/components/Community/CollectiveImpactBanner.tsx
// Top collective impact KPI banner displaying CO2 and PM2.5 metrics
// ============================================================

import { memo } from 'react';

interface CollectiveImpactBannerProps {
  totalCo2Kg: number;
  totalPm25Grams: number;
}

export const CollectiveImpactBanner = memo(function CollectiveImpactBanner({
  totalCo2Kg,
  totalPm25Grams,
}: CollectiveImpactBannerProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="max-w-xl">
        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
          Collective Neighborhood Resilience Impact
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
          Community Smog Abatement Dashboard
        </h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          When neighbors coordinate emission curbs—eliminating backyard burning, coordinating carpools, and wet-sweeping streets—local PM2.5 levels decrease by up to 28%.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 text-center min-w-[130px]">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">CO₂ Prevented</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">
            {totalCo2Kg} <span className="text-xs text-slate-500 font-sans">kg</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-4 text-center min-w-[130px]">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">PM2.5 Averted</span>
          <div className="text-2xl sm:text-3xl font-black text-sky-400 mt-1 font-mono">
            {totalPm25Grams} <span className="text-xs text-slate-500 font-sans">g</span>
          </div>
        </div>
      </div>
    </div>
  );
});
