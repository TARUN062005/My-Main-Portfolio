import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    try {
      // Implement your logic to handle the message, e.g., send an email or save to a database
      // Example: Send an email using a service like SendGrid, Nodemailer, etc.
      // await sendEmail({ name, email, message });

      console.log(`Received message from ${name} (${email}): ${message}`);

      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Failed to send message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}