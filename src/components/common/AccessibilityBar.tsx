'use client';

import React, { useEffect, useState } from 'react';

// GIGW (Guidelines for Indian Government Websites, v3) compliance bar.
// Required elements: skip-to-content link, text resize controls, and a
// high-contrast mode toggle, all keyboard-operable and announced to
// screen readers.

type FontScale = 'normal' | 'large' | 'xlarge';

const FONT_SCALE_LABEL: Record<FontScale, string> = {
  normal: 'A',
  large: 'A+',
  xlarge: 'A++',
};

export const AccessibilityBar: React.FC = () => {
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-scale', fontScale);
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
  }, [highContrast]);

  return (
    <div className="w-full bg-gov-dark text-slate-200 text-[11px]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-1 focus:z-[100] focus:bg-white focus:text-gov-navy focus:px-3 focus:py-2 focus:rounded focus:font-semibold focus:shadow-lg"
      >
        Skip to Main Content
      </a>
      <div className="max-w-[1600px] mx-auto px-4 py-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <a href="#main-content" className="hover:text-white underline-offset-2 hover:underline">
            Screen Reader Access
          </a>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={() => window.print()}
            className="hover:text-white underline-offset-2 hover:underline"
          >
            Print Page
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400" id="text-size-label">Text Size:</span>
          <div className="flex items-center gap-1" role="group" aria-labelledby="text-size-label">
            {(['normal', 'large', 'xlarge'] as FontScale[]).map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => setFontScale(scale)}
                aria-pressed={fontScale === scale}
                className={`px-1.5 py-0.5 rounded border transition ${
                  fontScale === scale
                    ? 'bg-white text-gov-navy border-white font-bold'
                    : 'border-slate-600 text-slate-300 hover:text-white hover:border-slate-400'
                }`}
              >
                {FONT_SCALE_LABEL[scale]}
              </button>
            ))}
          </div>

          <span className="text-slate-600">|</span>

          <button
            type="button"
            onClick={() => setHighContrast((v) => !v)}
            aria-pressed={highContrast}
            className={`px-2 py-0.5 rounded border transition ${
              highContrast
                ? 'bg-amber-400 text-gov-dark border-amber-400 font-bold'
                : 'border-slate-600 text-slate-300 hover:text-white hover:border-slate-400'
            }`}
          >
            High Contrast
          </button>
        </div>
      </div>
    </div>
  );
};
