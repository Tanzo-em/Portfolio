import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { insertContactSchema } from '../shared/schema';
import {storage} from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      to: 'your-email@example.com',
      subject: `New Contact Form Submission: ${validated.subject}`,
      text: `You have received a new message from ${validated.name} <${validated.email}>\n\n${validated.message}`,
    });
    res.status(200).json({ success: true, contact });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
      return;
    }
    res.status(500).json({ success: false, message: 'Failed to submit contact form' });
  }
}
