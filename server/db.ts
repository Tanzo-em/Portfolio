import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

// Only set WebSocket constructor if ws is available (not in Vercel environment)
try {
  const ws = require("ws");
  neonConfig.webSocketConstructor = ws;
} catch (error) {
  // WebSocket not available in Vercel environment, use default
  console.log("WebSocket not available, using default connection");
}

// Get database URL with fallback
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL not found in environment variables");
  throw new Error(
    "DATABASE_URL must be set. Please check your Vercel environment variables.",
  );
}

console.log("Database URL found:", databaseUrl.substring(0, 20) + "...");

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool });