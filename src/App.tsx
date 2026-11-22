// ============================================================
// src/App.tsx
// Thin AppShell Router and Layout Orchestrator
// Per ARCHITECTURE_PATTERNS.md §2.1 & ACCESSIBILITY.md §2
// ============================================================

import { memo } from 'react';
import { AppContextProvider, useAppContext } from '@/context/AppContext';
import { TabId } from '@/types';
import { Header } from '@/components/Navigation/Header';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { AirTelemetryDashboard } from '@/components/Dashboard/AirTelemetryDashboard';
import { DailyRoutineOptimizer } from '@/components/Routine/DailyRoutineOptimizer';
import { TransitPlanner } from '@/components/Transit/TransitPlanner';
import { IAQCenter } from '@/components/IAQ/IAQCenter';
import { CommunityHub } from '@/components/Community/CommunityHub';

const AppShell = memo(function AppShell() {
  const { activeTab, alerts, dismissAlert, accessibilityMode } = useAppContext();

  return (
    <div
      className={`min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200 ${
        accessibilityMode === 'high-contrast' ? 'contrast-125' : ''
      }`}
    >
      {/* 1. Header with Tab Navigation */}
      <Header />

      {/* 2. Global Alert Banner Overlay */}
      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />

      {/* 3. Primary Semantic Landmark Viewport */}
      <main
        id="main-content"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={-1}
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 focus:outline-none"
      >
        {activeTab === TabId.Dashboard && <AirTelemetryDashboard />}
        {activeTab === TabId.Routine && <DailyRoutineOptimizer />}
        {activeTab === TabId.Transit && <TransitPlanner />}
        {activeTab === TabId.IAQ && <IAQCenter />}
        {activeTab === TabId.Community && <CommunityHub />}
      </main>

      {/* 4. Footer Landmark */}
      <footer
        aria-label="Application footer"
        className="border-t border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md py-6 text-xs text-slate-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-300">AeroGuard AI</span>
            <span className="text-slate-700">•</span>
            <span>WCAG 2.2 AA Compliant</span>
            <span className="text-slate-700">•</span>
            <span>EPA Breakpoints Standardized</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Gemini 2.5 Flash Integrated
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="text-slate-500">Zero-Trust Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default function App() {
  return (
    <AppContextProvider>
      <AppShell />
    </AppContextProvider>
  );
}
