import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { auditLogger } from './middleware/auditLogger.js';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import compensationRoutes from './routes/compensationRoutes.js';
import rrRoutes from './routes/rrRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import integrationRoutes from './routes/integrationRoutes.js';
import districtRoutes from './routes/districtRoutes.js';

const app = express();

// Security and middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({ origin: '*', credentials: true }));
app.use(compression());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100000, // limit each IP to 100,000 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute'
});
app.use(limiter);

// Cache-Control headers on GET endpoints
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=60');
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Statutory audit trail interceptor
app.use(auditLogger);

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'NLAMS Enterprise Core Backend API',
    department: 'Dept. of Land Resources (DoLR)',
    ministry: 'Ministry of Rural Development, Govt. of India',
    version: '2.5.0-production',
    uptimeSeconds: Math.floor(process.uptime()),
    compliance: config.compliance,
    timestamp: new Date().toISOString(),
  });
});

// Mount modular statutory API routes (supporting both /api and root paths)
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/dashboard', '/dashboard'], dashboardRoutes);
app.use(['/api/projects', '/projects'], projectRoutes);
app.use(['/api/proposals', '/proposals'], proposalRoutes);
app.use(['/api/compensation', '/compensation'], compensationRoutes);
app.use(['/api/rehabilitation', '/rehabilitation'], rrRoutes);
app.use(['/api/documents', '/documents'], documentRoutes);
app.use(['/api/grievances', '/grievances'], grievanceRoutes);
app.use(['/api/audit', '/audit'], auditRoutes);
app.use(['/api/integrations', '/integrations'], integrationRoutes);
app.use(['/api/districts', '/districts'], districtRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[UNHANDLED_ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.name || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An unexpected statutory processing error occurred.',
    timestamp: new Date().toISOString(),
  });
});

// Start standalone server when executed directly
if (!process.env.VERCEL && process.env.NODE_ENV !== 'vercel') {
  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`🏛️  NLAMS Government Enterprise Backend Online`);
    console.log(`📡  Listening on: http://localhost:${PORT}`);
    console.log(`🛡️  Compliance: RFCTLARR Act 2013 Statutory Workflows`);
    console.log(`================================================================`);
  });
}

export default app;
