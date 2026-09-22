'use client';

import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { StatutoryAlert } from '@/types/land-acquisition';

interface StatutoryTimelineWatchProps {
  alerts: StatutoryAlert[];
  language: 'en' | 'hi';
  onSelectProject?: (projectId: string) => void;
}

export const StatutoryTimelineWatch: React.FC<StatutoryTimelineWatchProps> = ({
  alerts,
  language,
  onSelectProject,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <Clock className="w-5 h-5 text-gov-gold animate-spin-slow" />
          <div>
            <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
              {language === 'hi' ? 'सांविधिक समय-सीमा निगरानी कक्ष' : 'Statutory Timeline Compliance Watch'}
              <span className="bg-red-500/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                RFCTLARR Sec 19(7) & Sec 25
              </span>
            </h3>
            <p className="text-[11px] text-slate-300">
              {language === 'hi' 
                ? 'अधिग्रहण लैप्स (निरस्त) होने से रोकने हेतु स्वचालित समय सीमा चेतावनी'
                : 'Automated statutory lapse prevention and legal deadline countdowns'}
            </p>
          </div>
        </div>
        <div className="text-right text-xs">
          <span className="text-slate-400 block">{language === 'hi' ? 'सक्रिय चेतावनियां' : 'Active Trackers'}</span>
          <span className="font-extrabold text-gov-gold">{alerts.length} Critical Items</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 p-2">
        {alerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isWarning = alert.severity === 'WARNING';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg my-1 transition-all ${
                isCritical 
                  ? 'bg-rose-50/60 border border-rose-200/80 hover:bg-rose-50' 
                  : isWarning 
                  ? 'bg-amber-50/50 border border-amber-200/70 hover:bg-amber-50'
                  : 'bg-emerald-50/50 border border-emerald-200/70 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCritical && (
                      <div className="p-1.5 rounded-md bg-red-100 text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    )}
                    {isWarning && (
                      <div className="p-1.5 rounded-md bg-amber-100 text-amber-700">
                        <Clock className="w-5 h-5" />
                      </div>
                    )}
                    {!isCritical && !isWarning && (
                      <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{alert.projectTitle}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {alert.stageName}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 mt-1 font-medium">{alert.message}</p>

                    <div className="flex items-center gap-2 mt-2 text-[11px] text-rose-800 bg-white/80 px-2.5 py-1 rounded border border-rose-100 inline-flex">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{alert.legalImplication}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-white border shadow-xs text-center">
                    <span className="block text-[10px] text-slate-500 uppercase font-semibold">
                      {language === 'hi' ? 'शेष दिन' : 'Days Left'}
                    </span>
                    <span className={`text-xl font-black ${isCritical ? 'text-red-600 animate-pulse' : 'text-amber-600'}`}>
                      {alert.daysRemaining}
                    </span>
                    <span className="block text-[10px] text-slate-400">Due: {alert.deadlineDate}</span>
                  </div>

                  {onSelectProject && (
                    <button
                      onClick={() => onSelectProject(alert.projectId)}
                      className="mt-2 text-xs font-semibold text-gov-blue hover:text-gov-navy flex items-center gap-1 justify-end ml-auto"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
