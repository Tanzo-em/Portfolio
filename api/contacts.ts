import type { VercelRequest, VercelResponse } from '@vercel/node';
import {storage} from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }
  try {
    const contacts = await storage.getContacts();
    res.status(200).json({ success: true, contacts });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
}
