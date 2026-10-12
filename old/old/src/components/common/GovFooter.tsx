'use client';

import React from 'react';

// GIGW-standard government footer. These link categories (Terms of Use,
// Hyperlinking Policy, Accessibility Statement, Copyright Policy) and the
// content-ownership disclaimer are mandatory boilerplate on Indian
// government websites per GIGW v3 guidelines. Hrefs are placeholders
// pointing at #, wire to real static pages before production deployment.

const FOOTER_LINKS = [
  'Terms of Use',
  'Privacy Policy',
  'Hyperlinking Policy',
  'Copyright Policy',
  'Accessibility Statement',
  'Sitemap',
  'Help',
  'Contact Us',
];

export const GovFooter: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <footer className="w-full bg-gov-navy text-slate-300 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] border-b border-slate-800">
        {FOOTER_LINKS.map((link, i) => (
          <React.Fragment key={link}>
            <a href="#" className="hover:text-white hover:underline underline-offset-2">
              {link}
            </a>
            {i < FOOTER_LINKS.length - 1 && <span className="text-slate-700">|</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 text-[11px] text-slate-400 leading-relaxed">
        <p>
          Website content managed by the Department of Land Resources, Ministry of Rural Development,
          Government of India. Designed, developed and hosted as a prototype for Smart India Hackathon
          2026 — not an official government deployment.
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3">
          <span>Last Updated: {lastUpdated}</span>
          <span className="text-slate-700">|</span>
          <span>Best viewed in Chrome, Firefox, Edge (latest versions)</span>
          <span className="text-slate-700">|</span>
          <span>WCAG 2.1 Level AA compliant</span>
        </p>
      </div>
    </footer>
  );
};
