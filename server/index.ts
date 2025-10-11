import express, { type Request, type Response, type NextFunction } from 'express';
import { registerRoutes } from './routes';
import { setupVite, serveStatic, log } from './vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic API logging (dev only)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  // @ts-ignore
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    // @ts-ignore
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79);
      log(logLine, 'express');
    }
  });

  next();
});

async function main() {
  await registerRoutes(app);

  // Only run a dev server locally.
  if (process.env.NODE_ENV === 'development' && !process.env.VERCEL) {
    const http = await import('http');
    const server = http.createServer(app);
    await setupVite(app, server);
    const port = Number(process.env.PORT) || 5173;
    server.listen(port, () => log(`Dev server running on http://localhost:${port}`, 'express'));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Export nothing for Vercel; APIs are in api/*.ts
export {};
