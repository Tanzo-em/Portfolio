import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { sql } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

// Define schema locally to avoid import issues in Vercel
const insertContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

// Define database schema locally
const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Database connection
let db: any = null;
const getDb = async () => {
  if (!db) {
    // Only set WebSocket constructor if ws is available (not in Vercel environment)
    try {
      const ws = require("ws");
      neonConfig.webSocketConstructor = ws;
    } catch (error) {
      console.log("WebSocket not available, using default connection");
    }

    const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL not found in environment variables");
    }

    const pool = new Pool({ connectionString: databaseUrl });
    db = drizzle({ client: pool });
  }
  return db;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }
  
  try {
    const validated = insertContactSchema.parse(req.body);
    console.log('Contact form submission:', validated);
    
    // Try to save to database
    let contact = null;
    try {
      const database = await getDb();
      const [newContact] = await database.insert(contacts).values(validated).returning();
      contact = newContact;
      console.log('Contact saved to database:', contact);
    } catch (dbError: any) {
      console.error('Database save failed:', dbError);
      // Create a mock contact for response if database fails
      contact = {
        id: Date.now().toString(),
        ...validated,
        createdAt: new Date().toISOString()
      };
      console.log('Using mock contact due to database error');
    }
    
    // Try to send email, but don't fail if it doesn't work
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });
      
      await transporter.sendMail({
        from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
        to: 'rakeshkr.kumar88@gmail.com',
        subject: `New Contact Form Submission: ${validated.subject}`,
        text: `You have received a new message from ${validated.name} <${validated.email}>\n\n${validated.message}`,
      });
      
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the entire request if email fails
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contact
    });
  } catch (err: any) {
    console.error('Contact form error:', err);
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
      return;
    }
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}
