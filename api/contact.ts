import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

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
    console.log('Contact form submission:', validated);
    
    // For now, just create a mock contact (database functionality temporarily disabled)
    const contact = {
      id: Date.now().toString(),
      ...validated,
      createdAt: new Date().toISOString()
    };
    console.log('Contact data processed:', contact);
    
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
