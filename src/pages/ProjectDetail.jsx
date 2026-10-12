import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, MapPin, Calendar, CheckCircle, Info, Target, AlertCircle } from 'lucide-react';
import { projects, workflowStages, getStatusColor, formatArea, formatCurrency, formatNumber } from '../data/mockData';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId || p.shortName === projectId);

  if (!project) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Project not found</h2>
        <Link to="/projects" className="btn btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  const currentStageIndex = workflowStages.findIndex(s => s.code === project.stageCode) || 0;

  return (
    <div className="page-enter p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 mb-4 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-900">{project.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 font-mono">ID: {project.id}</span>
              <span className="text-xs text-gray-300">|</span>
              <span className="text-sm text-gray-500">Updated: {new Date(project.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-info text-sm py-1">{project.category}</span>
            <span className={`badge ${getStatusColor(project.status)} text-sm py-1`}>{project.status}</span>
            {project.priority === 'High' && <span className="badge badge-danger text-sm py-1">High Priority</span>}
          </div>
        </div>
        <p className="mt-4 text-gray-700 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
          {project.description || "No description provided for this project."}
        </p>
      </div>

      {/* ROW 1: Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 flex items-start gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building className="w-5 h-5" /></div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Requesting Body</div>
            <div className="font-semibold text-gray-800">{project.requestingBody}</div>
          </div>
        </div>
        <div className="card p-4 flex items-start gap-3">
          <div className="p-2 bg-saffron-50 text-saffron-600 rounded-lg"><MapPin className="w-5 h-5" /></div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Location</div>
            <div className="font-semibold text-gray-800">{project.state}</div>
            <div className="text-xs text-gray-600 truncate">{project.districts.join(', ')}</div>
          </div>
        </div>
        <div className="card p-4 flex items-start gap-3">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Calendar className="w-5 h-5" /></div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Start Date</div>
            <div className="font-semibold text-gray-800">{new Date(project.startDate).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="card p-4 flex items-start gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Target className="w-5 h-5" /></div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Target Completion</div>
            <div className="font-semibold text-gray-800">{new Date(project.targetDate).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* ROW 2: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between">
            <span>Land Acquisition</span>
            <span className="text-sm font-normal text-gray-500">{formatArea(project.landProposed)} Total</span>
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Acquired</span>
                <span className="font-medium">{formatArea(project.landAcquired)} ({(project.landAcquired/project.landProposed*100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(project.landAcquired/project.landProposed)*100}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Possessed</span>
                <span className="font-medium">{formatArea(project.landPossessed)} ({(project.landPossessed/project.landProposed*100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: `${(project.landPossessed/project.landProposed)*100}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between">
            <span>Compensation</span>
            <span className="text-sm font-normal text-gray-500">{formatCurrency(project.compensationAssessed)} Total</span>
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Paid Amount</span>
                <span className="font-medium">{formatCurrency(project.compensationPaid)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-saffron-500 h-2 rounded-full" style={{width: `${(project.compensationPaid/project.compensationAssessed)*100}%`}}></div>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pending Amount</span>
                <span className="font-medium text-amber-600">{formatCurrency(project.compensationAssessed - project.compensationPaid)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between">
            <span>Families Affected</span>
            <span className="text-sm font-normal text-gray-500">{formatNumber(project.familiesAffected)} Total</span>
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Resettled</span>
                <span className="font-medium">{formatNumber(project.familiesResettled)} ({(project.familiesResettled/project.familiesAffected*100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(project.familiesResettled/project.familiesAffected)*100}%`}}></div>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">R&R Progress Score</span>
                <span className="font-medium text-purple-600">{project.rrProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3 & 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Timeline */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-600" />
            LARR Act 2013 Workflow Progress
          </h3>
          <div className="relative border-l-2 border-gray-200 ml-3 md:ml-4 space-y-6">
            {workflowStages.map((stage, index) => {
              const isCompleted = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              const isFuture = index > currentStageIndex;

              return (
                <div key={stage.code} className="relative pl-6 md:pl-8">
                  {/* Dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white
                    ${isCompleted ? 'border-green-500 bg-green-500' : ''}
                    ${isCurrent ? 'border-blue-500 bg-blue-50 animate-pulse ring-4 ring-blue-100' : ''}
                    ${isFuture ? 'border-gray-300' : ''}
                  `}>
                    {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-white -ml-[1px] -mt-[1px]" />}
                  </div>
                  
                  <div className={`
                    ${isCompleted ? 'text-gray-800' : ''}
                    ${isCurrent ? 'text-blue-900 font-semibold' : ''}
                    ${isFuture ? 'text-gray-400' : ''}
                  `}>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                      <h4 className="text-md font-medium">{stage.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${isFuture ? 'border-gray-200' : 'border-gray-300'} bg-gray-50`}>
                        {stage.section}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${isFuture ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Key Dates</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Start Date</span>
                <span className="text-sm font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Notification (Sec 11)</span>
                <span className="text-sm font-medium">{project.notificationDate ? new Date(project.notificationDate).toLocaleDateString() : 'Pending'}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Award (Sec 23)</span>
                <span className="text-sm font-medium">{project.awardDate ? new Date(project.awardDate).toLocaleDateString() : 'Pending'}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Target Date</span>
                <span className="text-sm font-medium text-primary-700">{new Date(project.targetDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">R&R Progress</h3>
            <div className="flex justify-center my-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                  />
                  <path
                    className="text-purple-500"
                    strokeDasharray={`${project.rrProgress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-gray-800">{project.rrProgress}%</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Completed</span>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>Rehabilitation and Resettlement implementation is currently at {project.rrProgress}% completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
