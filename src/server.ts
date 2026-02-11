import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');
const logsDir = join(import.meta.dirname, '../logs');
const visitorLogFile = join(logsDir, 'visitors.json');

// Ensure logs directory exists
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

// In-memory visitor counter
let totalVisitors = 0;
let uniqueIPs = new Set<string>();

// Load existing stats on startup
try {
  if (existsSync(visitorLogFile)) {
    const data = readFileSync(visitorLogFile, 'utf-8');
    const lines = data.trim().split('\n').filter(Boolean);
    totalVisitors = lines.length;
    lines.forEach((line) => {
      try {
        const entry = JSON.parse(line);
        uniqueIPs.add(entry.ip);
      } catch {}
    });
    console.log(`[VISITORS] Loaded ${totalVisitors} visits from ${uniqueIPs.size} unique IPs`);
  }
} catch {}

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Visitor tracking middleware - logs IP, user agent, device info, and page visited.
 * Skips static assets (js, css, images, fonts).
 */
app.use((req, res, next) => {
  // Skip static asset requests
  const skipExtensions = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|pdf)$/i;
  if (skipExtensions.test(req.path)) {
    return next();
  }

  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0].trim()
    || req.headers['x-real-ip']?.toString()
    || req.socket.remoteAddress
    || 'unknown';

  const userAgent = req.headers['user-agent'] || 'unknown';
  const referer = req.headers['referer'] || 'direct';
  const timestamp = new Date().toISOString();
  const page = req.originalUrl || req.url;

  // Parse basic device info from user agent
  let device = 'Unknown';
  if (/mobile/i.test(userAgent)) device = 'Mobile';
  else if (/tablet|ipad/i.test(userAgent)) device = 'Tablet';
  else if (/bot|crawler|spider/i.test(userAgent)) device = 'Bot';
  else device = 'Desktop';

  let browser = 'Unknown';
  if (/edg/i.test(userAgent)) browser = 'Edge';
  else if (/chrome/i.test(userAgent)) browser = 'Chrome';
  else if (/firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/safari/i.test(userAgent)) browser = 'Safari';

  let os = 'Unknown';
  if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/macintosh|mac os/i.test(userAgent)) os = 'macOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/iphone|ipad/i.test(userAgent)) os = 'iOS';

  totalVisitors++;
  const isNewVisitor = !uniqueIPs.has(ip);
  uniqueIPs.add(ip);

  const visitorEntry = {
    timestamp,
    ip,
    page,
    device,
    browser,
    os,
    referer,
    userAgent,
    isNewVisitor,
  };

  // Log to console (visible in Azure Container App logs)
  console.log(`[VISITOR] #${totalVisitors} | IP: ${ip} | ${device}/${browser}/${os} | Page: ${page} | New: ${isNewVisitor} | Unique IPs: ${uniqueIPs.size}`);

  // Persist to file
  try {
    appendFileSync(visitorLogFile, JSON.stringify(visitorEntry) + '\n');
  } catch (err) {
    console.error('[VISITOR LOG] Failed to write:', err);
  }

  next();
});

/**
 * API endpoint to view visitor stats (protected with a simple key).
 */
app.get('/api/visitor-stats', (req, res): void => {
  const authKey = req.query['key'];
  if (authKey !== (process.env['VISITOR_STATS_KEY'] || 'harshit2026')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Read recent visitors from log file
  let recentVisitors: any[] = [];
  try {
    if (existsSync(visitorLogFile)) {
      const data = readFileSync(visitorLogFile, 'utf-8');
      const lines = data.trim().split('\n').filter(Boolean);
      recentVisitors = lines.slice(-50).map((line) => {
        try { return JSON.parse(line); } catch { return null; }
      }).filter(Boolean).reverse();
    }
  } catch {}

  res.json({
    totalVisits: totalVisitors,
    uniqueVisitors: uniqueIPs.size,
    recentVisitors,
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
