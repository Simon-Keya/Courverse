import type { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from '../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      await signUp(email, password);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
