'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { StageId, WORKFLOW_STAGES } from '@/types/land-acquisition';

interface WorkflowStepperProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  language: 'en' | 'hi';
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStage,
  onSelectStage,
  language,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'hi' ? 'सांविधिक भूमि अधिग्रहण जीवनचक्र (9 चरण)' : 'End-to-End Statutory RFCTLARR Workflow Lifecycle'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'hi' 
              ? 'प्रस्ताव प्रस्तुति से अंतिम कब्जा एवं पुनर्वास तक मानकीकृत डिजिटल प्रक्रिया'
              : 'Digital routing across Central Ministries, State Revenue, CALA, and Project Authorities'}
          </p>
        </div>
        <span className="text-xs font-bold text-gov-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          Stage {currentStage} of 9 Active
        </span>
      </div>

      {/* Responsive Horizontal Stepper */}
      <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
        {WORKFLOW_STAGES.map((stage) => {
          const isCompleted = stage.id < currentStage;
          const isCurrent = stage.id === currentStage;
          const isPending = stage.id > currentStage;

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`text-left p-2.5 rounded-lg border transition-all relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-gov-navy text-white border-gov-navy ring-2 ring-gov-saffron/80 shadow-sm'
                  : isCompleted
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 hover:bg-emerald-100/60'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                    isCurrent
                      ? 'bg-gov-saffron text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : stage.id}
                </span>

                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    isCurrent ? 'text-slate-300' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {isCompleted ? 'Done' : isCurrent ? 'Active' : 'Pending'}
                </span>
              </div>

              <div className="line-clamp-2">
                <span className={`text-[11px] font-bold block ${isCurrent ? 'text-white' : 'text-slate-800'}`}>
                  {language === 'hi' ? stage.hindiName : stage.name}
                </span>
              </div>

              <span
                className={`text-[9px] mt-1.5 block font-mono truncate ${
                  isCurrent ? 'text-gov-gold' : 'text-slate-400'
                }`}
              >
                {stage.actReference.split('/')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
