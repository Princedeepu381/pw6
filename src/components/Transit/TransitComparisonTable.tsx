// ============================================================
// src/components/Transit/TransitComparisonTable.tsx
// Multi-modal transit comparison table with health risk indicators
// ============================================================

import { memo } from 'react';
import type { TransitRouteComparison } from '@/types';

interface TransitComparisonTableProps {
  modalComparisons: TransitRouteComparison[];
}

export const TransitComparisonTable = memo(function TransitComparisonTable({
  modalComparisons,
}: TransitComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-200 border-collapse">
        <caption className="sr-only">
          Comparison of transit modes by duration, PM2.5 exposure dose, carbon emissions, and health risk
        </caption>
        <thead>
          <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
            <th scope="col" className="py-3 px-3 font-semibold">Transit Mode</th>
            <th scope="col" className="py-3 px-3 font-semibold">Duration</th>
            <th scope="col" className="py-3 px-3 font-semibold">PM2.5 Inhaled Dose</th>
            <th scope="col" className="py-3 px-3 font-semibold">CO₂ Footprint</th>
            <th scope="col" className="py-3 px-3 font-semibold">Health Risk</th>
            <th scope="col" className="py-3 px-3 font-semibold">Clinical Advisory</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80">
          {modalComparisons.map((item) => (
            <tr
              key={item.mode}
              className={`hover:bg-slate-800/30 transition-colors ${
                item.isRecommended ? 'bg-emerald-950/20' : ''
              }`}
            >
              <td className="py-3.5 px-3 flex items-center gap-2">
                {item.isRecommended && (
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                    title="Recommended Option"
                    aria-hidden="true"
                  />
                )}
                <span className={`font-medium ${item.isRecommended ? 'text-emerald-300 font-semibold' : 'text-white'}`}>
                  {item.modeLabel}
                </span>
              </td>
              <td className="py-3.5 px-3 whitespace-nowrap text-slate-300 font-mono">
                {item.durationMinutes} mins
              </td>
              <td className="py-3.5 px-3 font-mono font-semibold">
                <span
                  className={
                    item.pm25ExposureDoseUg > 40
                      ? 'text-red-400'
                      : item.pm25ExposureDoseUg > 20
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }
                >
                  {item.pm25ExposureDoseUg} µg
                </span>
              </td>
              <td className="py-3.5 px-3 whitespace-nowrap text-slate-300 font-mono">
                {item.co2EmissionsKg} kg
              </td>
              <td className="py-3.5 px-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    item.healthRiskRating === 'severe'
                      ? 'bg-red-950/80 text-red-400 border border-red-500/30'
                      : item.healthRiskRating === 'moderate'
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                      : item.healthRiskRating === 'low'
                      ? 'bg-sky-950/80 text-sky-400 border border-sky-500/30'
                      : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {item.healthRiskRating}
                </span>
              </td>
              <td className="py-3.5 px-3 text-slate-300 max-w-xs leading-relaxed">
                {item.advisory}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
