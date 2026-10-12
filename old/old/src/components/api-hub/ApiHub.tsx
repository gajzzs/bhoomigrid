'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Terminal, 
  Copy, 
  Check, 
  Code2
} from 'lucide-react';
import { offlineDb } from '@/lib/db';

interface ApiHubProps {
  language: 'en' | 'hi';
}

export const ApiHub: React.FC<ApiHubProps> = ({ language }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'parcels' | 'projects' | 'dbt' | 'postgis'>('parcels');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (endpoint: string) => {
    setLoading(true);
    try {
      let res;
      if (endpoint === 'parcels') {
        res = await fetch('/api/parcels?projectId=proj-nhai-dme-01');
      } else if (endpoint === 'projects') {
        res = await fetch('/api/projects');
      } else if (endpoint === 'dbt') {
        res = await fetch('/api/parcels'); // Inspect ready-for-DBT parcels
      }

      if (res) {
        const json = await res.json();
        setApiResponse(JSON.stringify(json, null, 2));
      } else {
        const sql = offlineDb.exportToPostgreSQLDump();
        setApiResponse(sql.slice(0, 1500) + '\n\n-- ... [TRUNCATED - DOWNLOAD COMPLETE POSTGIS DUMP]');
      }
    } catch (err) {
      setApiResponse(JSON.stringify({ error: 'Failed to test endpoint' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (apiResponse) {
      navigator.clipboard.writeText(apiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadSql = () => {
    window.open('/api/postgis/dump', '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-gov-blue" />
            {language === 'hi'
              ? 'राष्ट्रीय अंतर-प्रचालनीयता एपीआई एवं पोस्टजीआईएस केंद्र'
              : 'National API Interoperability Hub & PostGIS Spatial Core'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'भूलेख (भूमि अभिलेख), पीएफएमएस डीबीटी, भुवन जीआईएस एवं पोस्टजीआईएस डेटाबेस एकीकरण'
              : 'Standardized Open APIs for Bhulekh (State RoR), PFMS DBT Gateway, and PostGIS Spatial Engine'}
          </p>
        </div>

        <button
          onClick={downloadSql}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download PostgreSQL + PostGIS SQL Dump</span>
        </button>
      </div>

      {/* API Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Available Endpoints */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Standard Government Endpoints
          </h3>

          <div className="space-y-2">
            {[
              {
                id: 'parcels',
                title: 'Cadastral GeoJSON API',
                desc: 'GET /api/parcels?projectId=... (PostGIS polygon geometries, Khasra, Owner KYC)',
                badge: 'GET',
                badgeColor: 'bg-blue-100 text-blue-800',
              },
              {
                id: 'projects',
                title: 'Megaprojects Lifecycle API',
                desc: 'GET /api/projects (National pipeline, budget, statutory stages)',
                badge: 'GET',
                badgeColor: 'bg-blue-100 text-blue-800',
              },
              {
                id: 'dbt',
                title: 'PFMS Direct Benefit Transfer API',
                desc: 'POST /api/dbt (Disburse compensation directly into bank account)',
                badge: 'POST',
                badgeColor: 'bg-emerald-100 text-emerald-800',
              },
              {
                id: 'postgis',
                title: 'PostgreSQL + PostGIS Schema & Dump',
                desc: 'Full offline DDL, GIST indexes, and geodetic ellipsoidal spatial functions',
                badge: 'SQL',
                badgeColor: 'bg-purple-100 text-purple-800',
              },
            ].map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setSelectedEndpoint(ep.id as any);
                  testEndpoint(ep.id);
                }}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selectedEndpoint === ep.id
                    ? 'bg-gov-light/80 border-gov-blue text-gov-navy shadow-xs ring-1 ring-gov-blue'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{ep.title}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${ep.badgeColor}`}>
                    {ep.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono line-clamp-2">{ep.desc}</p>
              </button>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Offline PostGIS Architecture:</span>
            <p>
              Designed to operate 100% offline in isolated government intranets (NIC MeghRaj / NIC Net / State SDCs) with complete geodetic accuracy.
            </p>
          </div>
        </div>

        {/* Right: Interactive API Sandbox & Live Terminal */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[520px]">
          <div className="bg-slate-900 text-slate-200 px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-gov-gold" />
              <span className="font-bold font-mono">
                {selectedEndpoint === 'parcels' && 'GET /api/parcels'}
                {selectedEndpoint === 'projects' && 'GET /api/projects'}
                {selectedEndpoint === 'dbt' && 'POST /api/dbt'}
                {selectedEndpoint === 'postgis' && 'database/schema.sql (PostGIS)'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => testEndpoint(selectedEndpoint)}
                disabled={loading}
                className="px-2.5 py-1 bg-gov-blue hover:bg-gov-navy text-white rounded text-[11px] font-semibold transition"
              >
                {loading ? 'Sending Request...' : 'Send Live Request'}
              </button>
              {apiResponse && (
                <button
                  onClick={copyResponse}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 bg-slate-950 p-4 overflow-auto font-mono text-[11px] text-emerald-400 leading-relaxed">
            {loading ? (
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="animate-pulse">Querying internal spatial database...</span>
              </div>
            ) : apiResponse ? (
              <pre className="whitespace-pre-wrap">{apiResponse}</pre>
            ) : (
              <div className="text-slate-500 flex flex-col items-center justify-center h-full">
                <Code2 className="w-8 h-8 text-slate-600 mb-2" />
                <span>Click &ldquo;Send Live Request&rdquo; to execute test query</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
