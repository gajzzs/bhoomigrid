import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { statesData, projects, categoryData, getStatusColor, formatArea, formatCurrency, formatNumber } from '../data/mockData';
import { Map as MapIcon, Filter, Layers, AlertTriangle, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { useAuth } from '../context/AuthContext';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function GISMap() {
  const { user } = useAuth();
  const isCentral = user?.role === 'central_admin';
  const isState = user?.role === 'state_officer';
  const isCollector = user?.role === 'district_collector';
  const isCitizen = user?.role === 'citizen_landowner';

  const defaultState = isState ? 'Maharashtra' : (isCollector || isCitizen) ? 'Gujarat' : 'All';
  const [stateFilter, setStateFilter] = useState(defaultState);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const mapCenter = isCollector || isCitizen 
    ? [23.0225, 72.5714] 
    : isState 
    ? [19.7515, 75.7139] 
    : [22.5, 82.0];
  const mapZoom = isCitizen ? 12 : isCollector ? 9 : isState ? 7 : 5;

  const filteredProjects = projects.filter(p => {
    // Jurisdiction lock
    if (isState && !p.state.includes('Maharashtra')) return false;
    if (isCollector && (!p.state.includes('Gujarat') || !p.districts.includes('Ahmedabad'))) return false;
    if (isCitizen && p.id !== 'PRJ-2024-001') return false;

    if (stateFilter !== 'All' && p.state !== stateFilter) return false;
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  const recentProjects = [...filteredProjects].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).slice(0, 5);

  return (
    <div className="page-enter p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-900">GIS Map View – Land Parcels</h1>
          <p className="text-gray-500 text-sm">भू-खण्ड मानचित्र दृश्य</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-center">
        <Filter className="w-5 h-5 text-gray-500" />
        <select 
          className="form-select w-48"
          value={stateFilter} 
          onChange={(e) => setStateFilter(e.target.value)}
        >
          <option value="All">All States (सभी राज्य)</option>
          {statesData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        
        <select 
          className="form-select w-48"
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories (सभी श्रेणियां)</option>
          {categoryData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        
        <select 
          className="form-select w-48"
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status (सभी स्थिति)</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delayed">Delayed</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <MapContainer center={mapCenter} zoom={mapZoom} style={{height: '65vh', width: '100%'}} className="z-0 rounded-lg">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {statesData.map(state => {
              if (stateFilter !== 'All' && state.name !== stateFilter) return null;
              const possessionPct = (state.possession / state.landAcquired) * 100 || 0;
              const color = possessionPct > 75 ? '#10b981' : possessionPct > 50 ? '#f59e0b' : '#ef4444';
              const radius = Math.max(6, Math.min(20, state.projects * 2));
              
              return (
                <CircleMarker 
                  key={state.id} 
                  center={[state.lat, state.lng]} 
                  radius={radius}
                  pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
                >
                  <Popup>
                    <div className="p-1 min-w-[200px]">
                      <h3 className="font-bold text-lg border-b pb-1 mb-2">{state.name}</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span>Projects:</span> <span className="font-medium">{state.projects}</span></div>
                        <div className="flex justify-between"><span>Land Acq:</span> <span className="font-medium">{formatArea(state.landAcquired)}</span></div>
                        <div className="flex justify-between"><span>Comp. Paid:</span> <span className="font-medium">{formatCurrency(state.compensationPaid)}</span></div>
                        <div className="flex justify-between"><span>Affected Fam:</span> <span className="font-medium">{formatNumber(state.families)}</span></div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {filteredProjects.map(project => {
              if (!project.coordinates) return null;
              return (
                <Marker key={project.id} position={project.coordinates}>
                  <Popup>
                    <div className="p-1 min-w-[220px]">
                      <h3 className="font-bold text-md mb-1">{project.name}</h3>
                      <div className="flex gap-1 mb-2">
                        <span className="badge badge-info text-xs">{project.category}</span>
                        <span className={`badge ${getStatusColor(project.status)} text-xs`}>{project.status}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Completion</span>
                          <span>{project.completionPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${project.completionPercent}%` }}></div>
                        </div>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between"><span>Acquired:</span> <span>{formatArea(project.landAcquired)}</span></div>
                        <div className="flex justify-between"><span>Proposed:</span> <span>{formatArea(project.landProposed)}</span></div>
                      </div>
                      <Link to={`/projects/${project.id}`} className="mt-2 block text-center text-xs text-primary-600 font-medium hover:underline">
                        View Details
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary-600" />
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="text-2xl font-bold text-primary-700">{filteredProjects.length}</div>
                <div className="text-xs text-gray-500">Projects Plotted</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="text-2xl font-bold text-primary-700">
                  {stateFilter === 'All' ? statesData.length : 1}
                </div>
                <div className="text-xs text-gray-500">States Covered</div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-3">Map Legend</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500 opacity-60"></div>
                <span>&gt; 75% Land Possessed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500 opacity-60"></div>
                <span>50% - 75% Land Possessed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 opacity-60"></div>
                <span>&lt; 50% Land Possessed</span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Project Location</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-3">Recent Projects</h3>
            <div className="space-y-3">
              {recentProjects.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="block border-b border-gray-100 pb-2 last:border-0 last:pb-0 hover:bg-gray-50 p-1 rounded transition-colors">
                  <div className="font-medium text-sm text-gray-800 truncate">{p.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{p.state}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 ${getStatusColor(p.status).replace('badge-', 'text-')}`}>
                      {p.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
