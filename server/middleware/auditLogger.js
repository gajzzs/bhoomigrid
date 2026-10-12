import Database from '../db/database.js';

export function auditLogger(req, res, next) {
  // Capture the original response json to record success/failure
  const originalJson = res.json;
  
  res.json = function(body) {
    // Only log state-changing actions or security authentications
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) || req.path.includes('/login') || req.path.includes('/switch-role')) {
      try {
        const actor = req.user || {
          id: body?.user?.id || 'ANONYMOUS',
          name: body?.user?.name || req.body?.username || req.body?.email || 'Public User',
          role: body?.user?.role || req.body?.role || 'unauthenticated',
        };

        const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
        const userAgent = req.headers['user-agent'] || 'Browser/Client';
        const status = res.statusCode >= 200 && res.statusCode < 400 ? 'SUCCESS' : 'FAILED';

        let actionType = `${req.method}_${req.baseUrl}${req.path}`.replace(/[\/\-]/g, '_').toUpperCase();
        if (req.path.includes('/login')) actionType = 'USER_LOGIN_ATTEMPT';
        if (req.path.includes('/switch-role')) actionType = 'JURISDICTION_ROLE_SWITCH';
        if (req.path.includes('/proposals')) actionType = 'PROPOSAL_WORKFLOW_EVENT';
        if (req.path.includes('/disburse')) actionType = 'DBT_DISBURSEMENT_RECORDED';
        if (req.path.includes('/grievances')) actionType = 'GRIEVANCE_LODGED_OR_UPDATED';

        Database.auditLogs.record({
          actorId: actor.id,
          actorName: actor.name,
          actorRole: actor.role,
          action: actionType,
          entity: req.baseUrl.replace('/api/', '').toUpperCase() || 'SYSTEM',
          entityId: req.params?.id || req.body?.id || body?.data?.id || 'GENERAL',
          details: `Endpoint ${req.method} ${req.originalUrl} executed with status ${res.statusCode}`,
          ipAddress: Array.isArray(ip) ? ip[0] : ip,
          status,
          userAgent: userAgent.substring(0, 80),
        });
      } catch (err) {
        console.error('[AUDIT_ERROR] Failed to record statutory log:', err);
      }
    }

    return originalJson.call(this, body);
  };

  next();
}
