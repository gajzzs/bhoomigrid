// Government of India - NLAMS Enterprise Client API Gateway
// Transparently handles JWT token authentication, requests, and resilient fallbacks

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('nlams_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    console.warn(`[API] Network or backend error on ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Authentication
  auth: {
    verifyServiceId: async (serviceId) => {
      return await request('/auth/verify-service-id', {
        method: 'POST',
        body: JSON.stringify({ serviceId }),
      });
    },
    getCadreDirectory: async () => {
      return await request('/auth/cadre-directory');
    },
    login: async (credentials) => {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      if (res.token) {
        localStorage.setItem('nlams_token', res.token);
      }
      return res;
    },
    switchRole: async (role) => {
      const res = await request('/auth/switch-role', {
        method: 'POST',
        body: JSON.stringify({ role }),
      });
      if (res.token) {
        localStorage.setItem('nlams_token', res.token);
      }
      return res;
    },
    me: async () => {
      return await request('/auth/me');
    },
    logout: async () => {
      try {
        await request('/auth/logout', { method: 'POST' });
      } finally {
        localStorage.removeItem('nlams_token');
      }
    },
  },

  // Dashboard Stats
  dashboard: {
    getStats: async (role) => {
      return await request(`/dashboard/stats?role=${encodeURIComponent(role || '')}`);
    },
    getNational: async () => {
      return await request('/dashboard/national');
    },
  },

  // Projects
  projects: {
    getAll: async (filters = {}) => {
      const q = new URLSearchParams(filters).toString();
      return await request(`/projects${q ? `?${q}` : ''}`);
    },
    getById: async (id) => {
      return await request(`/projects/${encodeURIComponent(id)}`);
    },
    create: async (data) => {
      return await request('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    updateStage: async (id, stageData) => {
      return await request(`/projects/${encodeURIComponent(id)}/stage`, {
        method: 'PATCH',
        body: JSON.stringify(stageData),
      });
    },
  },

  // Proposals
  proposals: {
    getAll: async (filters = {}) => {
      const q = new URLSearchParams(filters).toString();
      return await request(`/proposals${q ? `?${q}` : ''}`);
    },
    create: async (data) => {
      return await request('/proposals', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    action: async (id, { action, remarks, role, officerName }) => {
      return await request(`/proposals/${encodeURIComponent(id)}/action`, {
        method: 'POST',
        body: JSON.stringify({ action, remarks, role, officerName }),
      });
    },
  },

  // Compensation & Solatium
  compensation: {
    getRecords: async (filters = {}) => {
      const q = new URLSearchParams(filters).toString();
      return await request(`/compensation/records${q ? `?${q}` : ''}`);
    },
    calculate: async ({ marketValue, ruralFactor = 1.0, yearsElapsed = 1 }) => {
      return await request(`/compensation/calculate?marketValue=${marketValue}&ruralFactor=${ruralFactor}&yearsElapsed=${yearsElapsed}`);
    },
    disburse: async (id) => {
      return await request(`/compensation/${encodeURIComponent(id)}/disburse`, {
        method: 'POST',
      });
    },
  },

  // Rehabilitation
  rehabilitation: {
    getRecords: async () => {
      return await request('/rehabilitation/records');
    },
  },

  // Documents Vault & Verification
  documents: {
    getAll: async () => {
      return await request('/documents');
    },
    upload: async (data) => {
      return await request('/documents/upload', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    verify: async (id) => {
      return await request(`/documents/${encodeURIComponent(id)}/verify`);
    },
  },

  // Grievances & Section 15 Objections
  grievances: {
    getAll: async () => {
      return await request('/grievances');
    },
    create: async (data) => {
      return await request('/grievances', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    resolve: async (id, { resolutionNotes }) => {
      return await request(`/grievances/${encodeURIComponent(id)}/resolve`, {
        method: 'PATCH',
        body: JSON.stringify({ resolutionNotes }),
      });
    },
  },

  // Statutory Audit Ledger
  audit: {
    getLogs: async (limit = 50) => {
      return await request(`/audit?limit=${limit}`);
    },
  },

  // Government Integrations
  integrations: {
    getStatus: async () => {
      return await request('/integrations/status');
    },
    bhulekhLookup: async (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return await request(`/integrations/bhulekh/lookup${q ? `?${q}` : ''}`);
    },
  },

  // Pan-India District Directory & CALA Explorer (780+ Districts)
  districts: {
    getAll: async (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return await request(`/districts${q ? `?${q}` : ''}`);
    },
    search: async (query) => {
      return await request(`/districts/search?q=${encodeURIComponent(query)}`);
    },
    getByState: async (stateCode) => {
      return await request(`/districts/state/${encodeURIComponent(stateCode)}`);
    },
    getProfile: async (stateCode, district) => {
      return await request(`/districts/profile/${encodeURIComponent(stateCode)}/${encodeURIComponent(district)}`);
    },
  },
};

export default api;
