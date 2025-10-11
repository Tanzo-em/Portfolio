import express, { type Request, type Response, type NextFunction } from 'express';

import { setupVite, serveStatic, log } from './vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




async function main() {


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
