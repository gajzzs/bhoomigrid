import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';

// Direct static imports to eliminate any lazy chunk loading delays or failures
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GISMap from './pages/GISMap';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import ProposalSubmission from './pages/ProposalSubmission';
import ApprovalQueue from './pages/ApprovalQueue';
import Compensation from './pages/Compensation';
import Rehabilitation from './pages/Rehabilitation';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="map" element={<GISMap />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="proposals/new" element={<ProposalSubmission />} />
        <Route path="approvals" element={<ApprovalQueue />} />
        <Route path="compensation" element={<Compensation />} />
        <Route path="rehabilitation" element={<Rehabilitation />} />
        <Route path="documents" element={<Documents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
