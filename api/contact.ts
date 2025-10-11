import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import {storage} from '../server/storage';

// Define schema locally to avoid import issues in Vercel
const insertContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

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
    const contact = await storage.createContact(validated);
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
    res.status(200).json({ success: true, contact });
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
