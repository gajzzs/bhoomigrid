'use client';

import React, { useState } from 'react';
import { AuthUser, SAMPLE_USERS, UserRole } from '@/types/auth';

interface SampleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onSelectUser: (user: AuthUser) => void;
}

export const SampleSignInModal: React.FC<SampleSignInModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);
  const [emailInput, setEmailInput] = useState<string>(currentUser.email);
  const [passwordInput, setPasswordInput] = useState<string>('GovTech#2026');

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmailInput(SAMPLE_USERS[role].email);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectUser(SAMPLE_USERS[selectedRole]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded shadow-2xl border border-outline-variant overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-primary px-space-lg py-space-md text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-2.5 h-7 bg-tertiary rounded"></div>
            <div>
              <span className="font-label-sm text-label-sm text-tertiary-fixed tracking-wider uppercase block">
                Sovereign Single Sign-On (SSO) • NIC MeghRaj Gateway
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                NLAMS Central Identity & Access Management
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-space-xs hover:bg-surface-container-high/20 rounded text-on-primary/80 hover:text-on-primary"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-space-lg flex flex-col gap-space-md max-h-[85vh] overflow-y-auto">
          <div className="bg-surface-container-low p-space-sm rounded flex items-center justify-between text-on-surface text-body-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span>Select a <strong>Sample GovTech Persona</strong> below for instant role simulation:</span>
            </div>
            <span className="font-cadastral-code text-label-sm text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded">
              Role-Based Access Control (RBAC)
            </span>
          </div>

          {/* Persona Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            {(Object.keys(SAMPLE_USERS) as UserRole[]).map((role) => {
              const u = SAMPLE_USERS[role];
              const isSelected = selectedRole === role;
              return (
                <div
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={`p-space-md rounded border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-secondary bg-secondary-fixed/20 shadow-sm ring-1 ring-secondary'
                      : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-start gap-space-sm">
                    <img
                      src={u.avatarUrl}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant shrink-0"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                          {u.name}
                        </span>
                        {currentUser.id === u.id && (
                          <span className="bg-primary text-on-primary font-label-sm text-[9px] px-1.5 py-0.2 rounded uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        {u.designation}
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary mt-0.5">
                        {u.department}
                      </span>
                    </div>
                  </div>

                  <div className="mt-space-xs pt-space-xs border-t border-outline-variant/40 flex items-center justify-between text-label-sm font-cadastral-code text-on-surface-variant">
                    <span className="truncate max-w-[170px]">{u.email}</span>
                    <span className="text-secondary font-semibold uppercase shrink-0">{role.replace('_', ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="bg-surface-container-low p-space-md rounded flex flex-col gap-space-sm mt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase text-on-surface-variant tracking-wider">
                Simulate Digital Signature (e-Sign / DSC Token)
              </span>
              <span className="font-cadastral-code text-label-sm text-secondary">
                {SAMPLE_USERS[selectedRole].nicToken}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Official Gov.in / NIC Email ID
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-space-sm py-space-xs bg-surface-container-lowest border border-outline-variant rounded font-cadastral-code text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  DSC Passphrase / OTP Code
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-space-sm py-space-xs bg-surface-container-lowest border border-outline-variant rounded font-cadastral-code text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-xs mt-space-xs border-t border-outline-variant/40">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Jurisdiction: <strong className="text-on-surface">{SAMPLE_USERS[selectedRole].jurisdiction}</strong>
              </span>

              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-label-md text-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-lg py-space-xs bg-primary hover:bg-surface-tint text-on-primary rounded font-label-md text-label-md flex items-center gap-space-xs shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">login</span>
                  <span>Authorize & Switch Session</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
