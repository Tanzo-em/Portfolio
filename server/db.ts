import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "@shared/schema";
import dotenv from 'dotenv';
dotenv.config();

// Only set WebSocket constructor if ws is available (not in Vercel environment)
try {
  const ws = require("ws");
  neonConfig.webSocketConstructor = ws;
} catch (error) {
  // WebSocket not available in Vercel environment, use default
  console.log("WebSocket not available, using default connection");
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });