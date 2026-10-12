import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, Lock, AlertCircle, CheckCircle2, 
  Landmark, MapPin, Building2, User, KeyRound, Info, FileText
} from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [serviceId, setServiceId] = useState('DC-MH-NANDURBAR');
  const [password, setPassword] = useState('INDIa@114');
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const cleanId = serviceId.trim();
    if (!cleanId) {
      setErrorMsg('Please enter your Government Service Identity Code or Certified Land Revenue Khata ID.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your authorization password.');
      return;
    }

    setLoginLoading(true);
    setErrorMsg('');
    try {
      const res = await login({
        serviceId: cleanId,
        password: password.trim(),
      });

      if (res?.success) {
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your Government Service ID and authorization passkey.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f4f9] flex flex-col items-center justify-between page-enter">
      {/* Top Tricolor Banner */}
      <div className="w-full">
        <div className="tricolor-bar w-full h-1.5"></div>
        <div className="gov-header-gradient py-3 px-6 text-white text-xs flex flex-wrap justify-between items-center shadow-sm gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-300">भारत सरकार | Government of India</span>
            <span className="text-blue-200 hidden md:inline">• Ministry of Rural Development • Department of Land Resources (DoLR)</span>
          </div>
          <span className="text-blue-200 font-medium">RFCTLARR Act 2013 National Single Sign-On Gateway</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl px-4 py-8 flex flex-col md:flex-row gap-6 items-stretch my-auto">
        {/* Left Side: National Land Management Portal Info & Statutory Rationale */}
        <div className="w-full md:w-5/12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center p-1.5 shadow-xs shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" className="w-10 h-10">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-primary-900 leading-tight">NLAMS</h1>
                <p className="text-xs font-semibold text-slate-800">National Land Acquisition & Management System</p>
                <p className="text-[11px] text-slate-500">राष्ट्रीय भूमि अधिग्रहण एवं प्रबंधन पोर्टल</p>
              </div>
            </div>

            {/* Statutory Identification Protocol Notice */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 space-y-2 mb-4 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Statutory Identification Protocol</span>
              </div>
              <p className="text-[11px] font-semibold text-amber-950">
                Mandatory Verification via Government Service ID Card (No Aadhaar Mandate):
              </p>
              <ul className="text-[11px] text-amber-900 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>
                  <strong>Supreme Court Precedent</strong> (<em>K.S. Puttaswamy v. UOI</em>): Aadhaar is legally restricted to social welfare subsidy delivery and is strictly excluded from administrative executive governance credentials.
                </li>
                <li>
                  <strong>Statutory Jurisdiction Confining</strong>: Under RFCTLARR Act 2013 (Sections 3(g), 11, 15, 23 & 38), an officer's executive authority is derived <em>exclusively</em> from their active Civil Services Posting Order.
                </li>
                <li>
                  Entering your verified Service ID automatically locks your session to your assigned territorial posting (District, State, or National).
                </li>
              </ul>
            </div>

            {/* Accepted ID Formats */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <FileText size={13} className="text-primary-700" />
                <span>Accepted Identification Credentials:</span>
              </div>
              <div className="text-slate-500 pl-4 space-y-0.5">
                <div>• <strong>All-India & State Civil Services ID</strong> (DoPT / SPARROW / State GAD Identity Card)</div>
                <div>• <strong>Project Implementing Agency Officer ID</strong> (NHAI, Railways, CIDCO, Port Trusts)</div>
                <div>• <strong>Certified Land Revenue Khata Passbook No.</strong> (RoR 7/12 record for Landowners)</div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            National Informatics Centre (NIC) • Digital India Land Records Standards
          </div>
        </div>

        {/* Right Side: Official Single Sign-On Form */}
        <div className="w-full md:w-7/12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-5">
              <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider block">
                DoPT / State Revenue Cadre Authentication
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">Official Portal Sign-In</h2>
              <p className="text-xs text-slate-500">
                Department of Land Resources (DoLR) • Ministry of Rural Development
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 mb-4">
                <AlertCircle size={16} className="shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Government Service ID Card Code / Revenue Khata ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value.toUpperCase())}
                    className="form-input text-xs font-mono font-bold uppercase py-2.5 px-3 w-full rounded-lg border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    placeholder="Enter Government Service ID / Civil List No. / Khata No."
                    required
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Civil List Code, SPARROW ID, or certified 7/12 Revenue Passbook Khata No.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Official SSO Authorization Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input text-xs py-2.5 px-3 w-full rounded-lg border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    placeholder="Enter authorization password"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-[10px] text-slate-500">
                  <span>Case-sensitive authorization passphrase</span>
                  <span className="text-primary-700 hover:underline cursor-pointer">Forgot Passphrase?</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 mt-2 bg-primary-800 hover:bg-primary-900 active:bg-primary-950 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <KeyRound size={15} />
                )}
                <span>Sign In & Access Assigned Jurisdiction / प्रवेश करें</span>
              </button>
            </form>

            {/* Official Security & Compliance Notice */}
            <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  NIC e-Pramaan Single Sign-On Gateway
                </span>
                <span className="badge badge-success text-[10px]">Production Node</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Access is monitored and recorded under Section 43 of the Information Technology Act, 2000. All administrative sessions are cryptographically signed and bound to your active posting orders.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-100 flex flex-wrap justify-between items-center text-[10px] text-slate-400 gap-2">
            <span>Security: SHA-256 Civil List Hash • e-Pramaan Compliant</span>
            <span>24x7 Helpdesk: 1800-11-26016</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-3 bg-slate-800 text-slate-300 text-center text-xs border-t border-slate-700">
        National Land Acquisition & Management System (NLAMS) • Right to Fair Compensation & Transparency in Land Acquisition (RFCTLARR) Act 2013
      </div>
    </div>
  );
}
