import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { statesData } from '../data/mockData';
import api from '../services/api';

const steps = [
  { id: 1, title: 'Project Details' },
  { id: 2, title: 'Land Requirements' },
  { id: 3, title: 'Financial Estimates' },
  { id: 4, title: 'Review & Submit' }
];

export default function ProposalSubmission() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    category: '',
    requestingBody: '',
    description: '',
    state: '',
    district: '',
    landRequired: '',
    estimatedFamilies: '',
    landTypes: [],
    estimatedCompensation: '',
    fundingSource: '',
    budgetYear: '',
    hasExistingRecords: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLandTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      landTypes: prev.landTypes.includes(type)
        ? prev.landTypes.filter(t => t !== type)
        : [...prev.landTypes, type]
    }));
  };

  const [submittedId, setSubmittedId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(curr => curr + 1);
    } else {
      setSubmitting(true);
      try {
        const res = await api.proposals.create(formData).catch(() => null);
        const propId = res?.data?.id || `PROP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setSubmittedId(propId);
        setIsSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="page-enter flex items-center justify-center h-full">
        <div className="card p-8 text-center max-w-md w-full">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Proposal Registered!</h2>
          <p className="text-slate-600 text-sm mb-3">
            Your statutory acquisition requisition has been registered in the National Registry with Dossier ID:
          </p>
          <div className="bg-slate-100 p-3 rounded-lg font-mono font-bold text-primary-900 text-base mb-6 border border-slate-200">
            {submittedId}
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/approvals')} className="btn btn-primary w-full text-xs py-2.5">
              Track in Approval Queue
            </button>
            <button onClick={() => navigate('/projects')} className="btn btn-outline w-full text-xs py-2.5">
              Return to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Submit New Acquisition Proposal</h1>
          <p className="text-slate-500 text-sm">नया अधिग्रहण प्रस्ताव</p>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 z-0"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 transition-all z-0" 
               style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold bg-white
                ${step.id < currentStep ? 'border-green-500 text-green-500' : 
                  step.id === currentStep ? 'border-blue-600 text-blue-600' : 'border-slate-300 text-slate-400'}`}>
                {step.id < currentStep ? <Check className="w-6 h-6" /> : step.id}
              </div>
              <span className={`mt-2 text-xs font-medium ${step.id === currentStep ? 'text-blue-600' : 'text-slate-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Project Name</label>
                  <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} className="form-input w-full" required />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="form-select w-full" required>
                    <option value="">Select Category</option>
                    {['Highways', 'Railways', 'Industrial', 'Irrigation', 'Urban Dev.', 'Renewable Energy', 'Aviation', 'Healthcare'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Requesting Body</label>
                  <input type="text" name="requestingBody" value={formData.requestingBody} onChange={handleInputChange} className="form-input w-full" required />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-input w-full h-24" required></textarea>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Land Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">State</label>
                  <select name="state" value={formData.state} onChange={handleInputChange} className="form-select w-full" required>
                    <option value="">Select State</option>
                    {statesData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">District</label>
                  <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="form-input w-full" required />
                </div>
                <div>
                  <label className="form-label">Total Land Required (Ha)</label>
                  <input type="number" name="landRequired" value={formData.landRequired} onChange={handleInputChange} className="form-input w-full" required />
                </div>
                <div>
                  <label className="form-label">Estimated Families Affected</label>
                  <input type="number" name="estimatedFamilies" value={formData.estimatedFamilies} onChange={handleInputChange} className="form-input w-full" required />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Land Types</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {['Agricultural', 'Residential', 'Commercial', 'Forest', 'Government', 'Wasteland'].map(type => (
                      <label key={type} className="flex items-center space-x-2">
                        <input type="checkbox" checked={formData.landTypes.includes(type)} onChange={() => handleLandTypeChange(type)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Financial Estimates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Estimated Compensation (₹ Cr)</label>
                  <input type="number" name="estimatedCompensation" value={formData.estimatedCompensation} onChange={handleInputChange} className="form-input w-full" required />
                </div>
                <div>
                  <label className="form-label">Funding Source</label>
                  <select name="fundingSource" value={formData.fundingSource} onChange={handleInputChange} className="form-select w-full" required>
                    <option value="">Select Source</option>
                    <option value="Central">Central Government</option>
                    <option value="State">State Government</option>
                    <option value="PPP">Public-Private Partnership</option>
                    <option value="Foreign">Foreign Direct Investment</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Budget Year</label>
                  <input type="text" name="budgetYear" value={formData.budgetYear} onChange={handleInputChange} placeholder="e.g., 2023-24" className="form-input w-full" required />
                </div>
                <div className="md:col-span-2 mt-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="hasExistingRecords" checked={formData.hasExistingRecords} onChange={handleInputChange} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="font-medium">Existing land records are available for this area</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Review & Submit</h2>
              <div className="bg-slate-50 p-4 rounded-lg space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-slate-500">Project Name:</span> <span className="font-medium">{formData.projectName || '-'}</span></div>
                  <div><span className="text-slate-500">Category:</span> <span className="font-medium">{formData.category || '-'}</span></div>
                  <div><span className="text-slate-500">State/District:</span> <span className="font-medium">{formData.state || '-'} / {formData.district || '-'}</span></div>
                  <div><span className="text-slate-500">Land Required:</span> <span className="font-medium">{formData.landRequired || '-'} Ha</span></div>
                  <div><span className="text-slate-500">Est. Families:</span> <span className="font-medium">{formData.estimatedFamilies || '-'}</span></div>
                  <div><span className="text-slate-500">Est. Compensation:</span> <span className="font-medium">₹{formData.estimatedCompensation || '-'} Cr</span></div>
                  <div className="col-span-2"><span className="text-slate-500">Land Types:</span> <span className="font-medium">{formData.landTypes.join(', ') || '-'}</span></div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <label className="flex items-start space-x-2">
                  <input type="checkbox" required className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600">I declare that the information provided is true and complies with the requirements of the LARR Act 2013. I understand this proposal is subject to approval.</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t mt-8">
            <button type="button" onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))} disabled={currentStep === 1} className="btn btn-outline flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </button>
            <button type="submit" className={`btn flex items-center ${currentStep === steps.length ? 'btn-saffron' : 'btn-primary'}`}>
              {currentStep === steps.length ? <><Save className="w-4 h-4 mr-2" /> Submit Proposal</> : <>Next <ChevronRight className="w-4 h-4 ml-1" /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
