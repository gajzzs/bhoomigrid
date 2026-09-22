'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Database, 
  Download, 
  Globe, 
  UserCheck,
  Scale
} from 'lucide-react';
import { StakeholderRole } from '@/types/land-acquisition';

interface HeaderProps {
  currentRole: StakeholderRole;
  onRoleChange: (role: StakeholderRole) => void;
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  criticalAlertCount: number;
}

const ROLE_LABELS: Record<StakeholderRole, { en: string; hi: string; badge: string; color: string }> = {
  CENTRAL_MINISTRY: {
    en: 'Central Ministry (PM GatiShakti)',
    hi: 'केंद्रीय मंत्रालय (पीएम गतिशक्ति)',
    badge: 'MoRTH / Railways',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  DISTRICT_COLLECTOR_CALA: {
    en: 'District Collector / CALA',
    hi: 'जिला कलेक्टर / सक्षम प्राधिकारी (CALA)',
    badge: 'Statutory Authority',
    color: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  REQUIRING_BODY: {
    en: 'Land Requiring Body',
    hi: 'भूमि याचक निकाय',
    badge: 'NHAI / DFCCIL / NTPC',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  RNR_ADMIN: {
    en: 'R&R Commissioner',
    hi: 'पुनर्वास एवं पुनर्व्यवस्थापन आयुक्त',
    badge: 'Rehabilitation Admin',
    color: 'bg-purple-100 text-purple-900 border-purple-300',
  },
  CITIZEN: {
    en: 'Citizen & Landowner Portal',
    hi: 'नागरिक एवं भूस्वामी पोर्टल',
    badge: 'Public Transparency',
    color: 'bg-slate-100 text-slate-900 border-slate-300',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  criticalAlertCount,
}) => {
  const downloadSqlDump = () => {
    window.open('/api/postgis/dump', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-gov-navy text-white shadow-md border-b-2 border-gov-saffron">
      {/* Top Gov Bar */}
      <div className="bg-gov-dark px-4 py-1.5 text-xs flex justify-between items-center text-slate-300 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-white tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-gov-gold" />
            भारत सरकार | GOVERNMENT OF INDIA
          </span>
          <span className="text-slate-500">|</span>
          <span className="hidden sm:inline">डिजिटल भूमि प्रबंधन एवं निर्णय सहायता प्रणाली (PM GatiShakti Aligned)</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={downloadSqlDump}
            className="flex items-center gap-1 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 transition text-[11px]"
            title="Download PostgreSQL with PostGIS Spatial Database Dump"
          >
            <Database className="w-3 h-3 text-emerald-400" />
            <span>PostGIS Offline Engine</span>
            <Download className="w-2.5 h-2.5 ml-0.5 text-slate-400" />
          </button>
          
          <div className="flex items-center space-x-1 bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <Globe className="w-3 h-3 text-slate-400" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${language === 'en' ? 'bg-gov-saffron text-white' : 'text-slate-400 hover:text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${language === 'hi' ? 'bg-gov-saffron text-white' : 'text-slate-400 hover:text-white'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Branding & Role Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          {/* Ashoka Emblem / National Icon */}
          <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm border border-slate-200">
            <div className="text-center">
              <span className="text-gov-navy text-[9px] font-bold block leading-none">सत्यमेव</span>
              <span className="text-gov-navy text-[9px] font-bold block leading-none">जयते</span>
              <Scale className="w-4 h-4 text-gov-navy mx-auto mt-0.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                {language === 'hi' ? 'राष्ट्रीय भूमि अर्जन एवं प्रबंधन प्रणाली' : 'National Land Acquisition & Management System'}
                <span className="bg-gov-saffron/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  NLAMS / BHOOMI-GATI
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-300">
              {language === 'hi' 
                ? 'भू-अधिग्रहण, पंचाट, डीबीटी मुआवजा एवं जीआईएस डिजिटल निगरानी पोर्टल (RFCTLARR Act, 2013)'
                : 'Statutory RFCTLARR 2013 Lifecycle, GIS Cadastral Cadre, Awards & PFMS/DBT Disbursal'}
            </p>
          </div>
        </div>

        {/* Multi-Stakeholder Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <div className="flex items-center gap-1.5 px-2 text-xs text-slate-300 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-gov-gold" />
            <span className="hidden md:inline">Active Role:</span>
          </div>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as StakeholderRole)}
            className="bg-gov-navy text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-gov-saffron cursor-pointer"
          >
            {(Object.keys(ROLE_LABELS) as StakeholderRole[]).map((role) => (
              <option key={role} value={role} className="bg-slate-900 text-white">
                {language === 'hi' ? ROLE_LABELS[role].hi : ROLE_LABELS[role].en}
              </option>
            ))}
          </select>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border hidden lg:inline-block ${ROLE_LABELS[currentRole].color}`}>
            {ROLE_LABELS[currentRole].badge}
          </span>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="bg-slate-900/90 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex overflow-x-auto space-x-1 py-1 scrollbar-none">
          {[
            { id: 'dashboard', labelEn: 'National Dashboard', labelHi: 'राष्ट्रीय डैशबोर्ड', icon: Building2 },
            { id: 'workflow', labelEn: 'Statutory Workflow (9 Stages)', labelHi: 'सांविधिक कार्यप्रवाह (9 चरण)', icon: Layers },
            { id: 'gis', labelEn: 'GIS Cadastral Map', labelHi: 'जीआईएस भूकर मानचित्र', icon: MapPin },
            { id: 'compensation', labelEn: 'Landowners & DBT Disbursal', labelHi: 'भूस्वामी एवं डीबीटी वितरण', icon: Scale },
            { id: 'rnr', labelEn: 'R&R Management (PAF/PDF)', labelHi: 'पुनर्वास एवं विस्थापन (PAF/PDF)', icon: ShieldCheck },
            { id: 'citizen', labelEn: 'Citizen Transparency Portal', labelHi: 'नागरिक पोर्टल', icon: Globe },
            { id: 'api', labelEn: 'Gov API Hub & PostGIS', labelHi: 'सरकारी एपीआई एवं पोस्टजीआईएस', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-t-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-gov-bg text-gov-navy font-bold border-b-2 border-gov-saffron shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gov-navy' : 'text-slate-400'}`} />
                <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
                {tab.id === 'workflow' && criticalAlertCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                    {criticalAlertCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
