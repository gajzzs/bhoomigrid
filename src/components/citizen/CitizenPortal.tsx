'use client';

import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Send, 
  Download
} from 'lucide-react';
import { LandParcel, Project, StatutoryNotification } from '@/types/land-acquisition';
import { formatIndianCurrency } from '@/lib/rfctlarr-calculator';

interface CitizenPortalProps {
  parcels: LandParcel[];
  projects: Project[];
  notifications: StatutoryNotification[];
  language: 'en' | 'hi';
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  parcels,
  projects,
  notifications,
  language,
}) => {
  const [searchKhasra, setSearchKhasra] = useState('');
  const [searchedParcel, setSearchedParcel] = useState<LandParcel | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Grievance form
  const [claimantName, setClaimantName] = useState('');
  const [claimantPhone, setClaimantPhone] = useState('');
  const [claimantText, setClaimantText] = useState('');
  const [objectionSuccess, setObjectionSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = parcels.find(
      (p) => p.khasraNumber.toLowerCase().trim() === searchKhasra.toLowerCase().trim()
    );
    setSearchedParcel(found || null);
  };

  const handleObjectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName || !claimantText) return;
    setObjectionSuccess(true);
    setTimeout(() => {
      setClaimantName('');
      setClaimantPhone('');
      setClaimantText('');
      setObjectionSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Citizen Hero Banner */}
      <div className="bg-gradient-to-r from-gov-navy to-gov-blue text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="bg-gov-saffron text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            {language === 'hi' ? 'नागरिक एवं भूस्वामी सूचना खिड़की' : 'Public Transparency & Landowner Window'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-2">
            {language === 'hi'
              ? 'अपनी भूमि की अर्जन स्थिति, पंचाट एवं मुआवजा जानें'
              : 'Know Your Land Acquisition Status, Gazette Notification & Award'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            {language === 'hi'
              ? 'खसरा संख्या दर्ज करें और देखें कि क्या आपकी भूमि किसी राष्ट्रीय या राज्यीय बुनियादी ढांचा परियोजना के तहत अधिसूचित है।'
              : 'Enter your Khasra / Survey Number to check preliminary notification (Sec 11), declaration (Sec 19), or DBT compensation credit.'}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-5 flex flex-wrap sm:flex-nowrap gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Enter Khasra Number (e.g. 142/1, 142/2, 143, 210/A)..."
                value={searchKhasra}
                onChange={(e) => setSearchKhasra(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gov-saffron"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gov-saffron hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer whitespace-nowrap"
            >
              Check Status
            </button>
          </form>
        </div>
      </div>

      {/* Search Results Display */}
      {hasSearched && (
        <div>
          {searchedParcel ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">
                    Verified Land Record Match
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Khasra No. {searchedParcel.khasraNumber} ({searchedParcel.surveyNumber})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Village: <strong>{searchedParcel.village}</strong> | Taluk: <strong>{searchedParcel.taluk}</strong> | District: <strong>{searchedParcel.district}</strong>, {searchedParcel.state}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {searchedParcel.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Status details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Registered Khatedar (Owner)</span>
                  <span className="font-bold text-slate-900 text-sm block mt-0.5">{searchedParcel.ownerName}</span>
                  <span className="text-slate-400 text-[10px]">Aadhaar Masked: {searchedParcel.aadhaarMasked}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Area under Acquisition</span>
                  <span className="font-bold text-slate-900 text-sm block mt-0.5">
                    {searchedParcel.areaHectares} Hectares ({searchedParcel.areaAcres} Acres)
                  </span>
                  <span className="text-slate-400 text-[10px]">Type: {searchedParcel.landType.replace('_', ' ')}</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="text-emerald-800 block text-[11px] font-semibold">Determined Compensation</span>
                  <span className="font-black text-emerald-900 text-base block mt-0.5">
                    {formatIndianCurrency(searchedParcel.totalCompensationAmount)}
                  </span>
                  <span className="text-emerald-700 text-[10px]">
                    Status: {searchedParcel.compensationStatus === 'DISBURSED' ? 'Credited to Bank Account (DBT)' : 'In Disbursal Pipeline'}
                  </span>
                </div>
              </div>

              {searchedParcel.pfmsUtrNumber && (
                <div className="bg-emerald-100/60 p-3 rounded-lg border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                  <span>
                    Direct Benefit Transfer UTR Reference: <strong className="font-mono">{searchedParcel.pfmsUtrNumber}</strong>
                  </span>
                  <span className="font-bold">PAID on {searchedParcel.disbursementDate}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No Acquisition Notice Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No active land acquisition notification was found matching Khasra &ldquo;{searchKhasra}&rdquo;. Please verify the survey number or select a village.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Online Objection / Grievance Submission Window (Section 15) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="border-b border-slate-200 pb-3 mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gov-blue" />
            {language === 'hi'
              ? 'धारा 15 के तहत ऑनलाइन आपत्ति अथवा अभ्यावेदन दर्ज करें'
              : 'File Online Objection / Representation under Section 15'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'अधिसूचना के 60 दिनों के भीतर संरेखण, स्वामित्व या मूल्यांकन पर आपत्ति दर्ज करने का वैधानिक अधिकार।'
              : 'Statutory 60-day window to raise concerns regarding alignment, boundary measurement, or market valuation.'}
          </p>
        </div>

        {objectionSuccess && (
          <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>
              Your objection has been officially registered with CALA. Digital Acknowledgment Receipt: <strong>ACK/SEC15/2026/0912</strong>.
            </span>
          </div>
        )}

        <form onSubmit={handleObjectionSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Landowner / Claimant Full Name *</label>
              <input
                type="text"
                required
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                placeholder="e.g. Rameshbhai Somabhai Patel"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number (for SMS Hearing Alerts) *</label>
              <input
                type="tel"
                required
                value={claimantPhone}
                onChange={(e) => setClaimantPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Grounds of Objection / Description of Grievance *
            </label>
            <textarea
              required
              rows={3}
              value={claimantText}
              onChange={(e) => setClaimantText(e.target.value)}
              placeholder="State the nature of dispute (e.g. Error in cadastral area measurement, non-inclusion of standing mango orchard, joint khatedar inheritance dispute)..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gov-navy hover:bg-gov-blue text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Formal Objection to Collector / CALA</span>
          </button>
        </form>
      </div>

      {/* Gazette Notifications Public Download Vault */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gov-gold" />
          Public Gazette Notifications & E-Gazette Orders
        </h3>

        <div className="divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div key={notif.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{notif.section}</span>
                  <span className="text-slate-400 font-mono">({notif.gazetteNumber})</span>
                </div>
                <p className="text-slate-600 mt-0.5">{notif.documentTitle}</p>
                <span className="text-[10px] text-slate-400">
                  Published: {notif.gazetteDate} | Digital Signature Hash: {notif.digitalSignCertHash.slice(0, 16)}...
                </span>
              </div>

              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading Official Gazette copy: ${notif.gazetteNumber}.pdf`);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold flex items-center gap-1 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF ({notif.fileSizeMb} MB)</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
