import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { insertContactSchema } from '../shared/schema';
import {storage} from '../server/storage';

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
    
    // For now, just return success without database or email
    // TODO: Add database and email functionality after environment variables are set
    console.log('Contact form submission:', validated);
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contact: {
        id: Date.now().toString(),
        ...validated,
        createdAt: new Date().toISOString()
      }
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
