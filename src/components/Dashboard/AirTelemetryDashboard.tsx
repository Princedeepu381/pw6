// ============================================================
// src/components/Dashboard/AirTelemetryDashboard.tsx
// Hyperlocal AQI telemetry dashboard orchestrator
// Per ACCESSIBILITY.md §3 (Twin Representation) & EFFICIENCY.md §3
// ============================================================

import { memo } from 'react';
import { useAirAnalytics } from '@/hooks/useAirAnalytics';
import { ZoneCard } from '@/components/shared/ZoneCard';
import { SmogHeatmap } from './SmogHeatmap';
import { TelemetryHeroCard } from './TelemetryHeroCard';
import { PollutantSparklinesPanel } from './PollutantSparklinesPanel';

export const AirTelemetryDashboard = memo(function AirTelemetryDashboard() {
  const {
    zones,
    currentZone,
    selectedZoneId,
    setSelectedZoneId,
    aqiCategory,
    aqiColor,
    inversionStatus,
    pollutantBreakdown,
    simulateSmogSpike,
    simulateCleanDispersion,
  } = useAirAnalytics();

  return (
    <section aria-label="Hyperlocal AQI Telemetry Dashboard" className="flex flex-col gap-6 fade-in">
      {/* 1. Hero KPI Telemetry Card */}
      <TelemetryHeroCard
        currentZone={currentZone}
        aqiCategory={aqiCategory}
        aqiColor={aqiColor}
        inversionStatus={inversionStatus}
        simulateSmogSpike={simulateSmogSpike}
        simulateCleanDispersion={simulateCleanDispersion}
      />

      {/* 2. Grid: SVG Heatmap (Left) & Pollutant Sparklines (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SmogHeatmap
          zones={zones}
          selectedZoneId={selectedZoneId}
          onSelectZone={setSelectedZoneId}
        />

        <PollutantSparklinesPanel
          zoneName={currentZone.zoneName}
          pollutantBreakdown={pollutantBreakdown}
        />
      </div>

      {/* 3. Municipal Zone Selector Cards */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span>Monitored Urban Sectors ({zones.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.zoneId}
              zone={zone}
              isSelected={zone.zoneId === selectedZoneId}
              onSelect={setSelectedZoneId}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
