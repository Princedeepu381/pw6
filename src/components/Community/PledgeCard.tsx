// ============================================================
// src/components/Community/PledgeCard.tsx
// Community pledge card with participation progress bar
// ============================================================

import { memo } from 'react';
import type { CommunityPledge } from '@/types';

interface PledgeCardProps {
  pledge: CommunityPledge;
  onToggle: (id: string) => void;
  pledgedLabel: string;
  pledgeNowLabel: string;
}

export const PledgeCard = memo(function PledgeCard({
  pledge,
  onToggle,
  pledgedLabel,
  pledgeNowLabel,
}: PledgeCardProps) {
  const progress = Math.min(
    100,
    Math.round((pledge.currentParticipants / pledge.targetParticipants) * 100)
  );

  return (
    <div
      className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
        pledge.userPledged
          ? 'bg-slate-900/90 border-emerald-500/70 shadow-sm ring-1 ring-emerald-500/30'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-white text-base leading-snug">
            {pledge.title}
          </h4>
          {pledge.userPledged && (
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shrink-0">
              {pledgedLabel}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          {pledge.impactDescription}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>
            Participation: <strong className="text-white font-mono">{pledge.currentParticipants}</strong> / {pledge.targetParticipants} households
          </span>
          <span className="font-semibold text-emerald-400 font-mono">{progress}%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={pledge.currentParticipants}
            aria-valuemin={0}
            aria-valuemax={pledge.targetParticipants}
            aria-label={`${pledge.title} progress`}
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-1">
          <span className="text-xs text-slate-400">
            Est. Relief: <strong className="text-slate-300 font-mono">~{pledge.estimatedEmissionReductionKg} kg CO₂ / wk</strong>
          </span>

          <button
            type="button"
            onClick={() => onToggle(pledge.id)}
            aria-pressed={pledge.userPledged}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              pledge.userPledged
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
            }`}
          >
            {pledge.userPledged ? 'Cancel Pledge' : pledgeNowLabel}
          </button>
        </div>
      </div>
    </div>
  );
});
