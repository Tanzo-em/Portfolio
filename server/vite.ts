import express, { type Express } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer, createLogger } from 'vite';
import type { Server } from 'http';
import viteConfig from '../vite.config';
import { nanoid } from 'nanoid';

const viteLogger = createLogger();

export function log(message: string, source: 'express' | 'vite' = 'vite') {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  // One simple console logger for dev DX
  console.log(`[${formattedTime}] [${source}] ${message}`);
}

// Only used in local development; on Vercel this returns early.
export async function setupVite(app: Express, server: Server) {
  if (process.env.VERCEL) {
    // Prevent Vite middleware from running on Vercel
    return;
  }

  const serverOptions = {
    middlewareMode: true as const,
    hmr: {
      server,
      // allowedHosts is OK for local preview; irrelevant on Vercel
      allowedHosts: true as const,
    },
  };

  // Start a Vite dev server programmatically
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error(msg, options) {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: 'custom',
  });

  app.use(vite.middlewares);

  // Always reload the HTML template through Vite in dev
  app.use(async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(import.meta.dirname, '../client/index.html');
      let template = fs.readFileSync(clientTemplate, 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// Optional helper for serving prebuilt static files locally in "preview" mode.
// Do NOT use this on Vercel; Vercel serves dist/ automatically.
export function serveStatic(app: Express) {
  if (process.env.VERCEL) {
    return;
  }
  const dist = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(dist)) {
    app.use(express.static(dist));
  }
}
