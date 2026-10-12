import React, { useState } from 'react';
import { Upload, FileText, FileImage, Archive, Download, History, Search, List, Grid } from 'lucide-react';
import { documents, getStatusColor } from '../data/mockData';

export default function Documents() {
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  const getFileIcon = (format) => {
    switch(format) {
      case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
      case 'XLSX': return <FileText className="w-8 h-8 text-green-600" />;
      case 'ZIP': return <Archive className="w-8 h-8 text-blue-500" />;
      case 'GeoTIFF': return <FileImage className="w-8 h-8 text-purple-500" />;
      default: return <FileText className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="page-enter p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Document Repository</h1>
          <p className="text-slate-500 text-sm">दस्तावेज़ भण्डार</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Upload className="w-4 h-4 mr-2" /> Upload Document
        </button>
      </div>

      <div className="card p-4 flex flex-wrap gap-4 items-center justify-between bg-slate-50">
        <div className="flex flex-wrap gap-4 flex-1">
          <select className="form-select text-sm w-40">
            <option>All Types</option>
            <option>Notification</option>
            <option>Award</option>
            <option>SIA Report</option>
            <option>Map Data</option>
          </select>
          <select className="form-select text-sm w-48">
            <option>All Projects</option>
            <option>Mumbai-Ahd HSR</option>
            <option>Delhi-Mumbai Exp</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search documents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-input pl-9 text-sm w-full" />
          </div>
        </div>
        <div className="flex bg-white rounded-md border shadow-sm">
          <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-slate-100 text-blue-600' : 'text-slate-500'}`}><List className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-slate-100 text-blue-600' : 'text-slate-500'}`}><Grid className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="card">
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12"></th>
                  <th>Document Details</th>
                  <th>Project</th>
                  <th>Metadata</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{getFileIcon(doc.format)}</td>
                    <td>
                      <div className="font-medium text-slate-800">{doc.name}</div>
                      <div className="text-xs text-slate-500"><span className="badge badge-neutral mr-2">{doc.type}</span> {doc.id}</div>
                    </td>
                    <td className="text-sm">{doc.project}</td>
                    <td>
                      <div className="text-sm">{doc.size} • {doc.version}</div>
                      <div className="text-xs text-slate-500">{doc.uploadDate} by {doc.uploadedBy}</div>
                    </td>
                    <td><span className={`badge ${getStatusColor(doc.status)}`}>{doc.status}</span></td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Download className="w-4 h-4" /></button>
                        <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded"><History className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  {getFileIcon(doc.format)}
                  <span className={`badge ${getStatusColor(doc.status)}`}>{doc.status}</span>
                </div>
                <h4 className="font-medium text-slate-800 text-sm mb-1 line-clamp-2" title={doc.name}>{doc.name}</h4>
                <p className="text-xs text-slate-500 mb-2 truncate">{doc.project}</p>
                <div className="mt-auto pt-4 border-t flex justify-between items-center text-xs text-slate-500">
                  <span>{doc.size} • {doc.version}</span>
                  <button className="text-blue-600 hover:underline"><Download className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
