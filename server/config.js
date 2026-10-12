// Government of India - Ministry of Rural Development - DoLR
// NLAMS (National Land Acquisition & Management System) Backend Config

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'nlams-mord-dolr-secure-jwt-token-secret-2026',
  jwtExpiresIn: '24h',
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  compliance: {
    act: 'Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR)',
    standard: 'Digital India Land Records Modernization Programme (DILRMP)',
    securityClassification: 'Government Restricted - Role Based Access Control',
  }
};
