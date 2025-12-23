import type { NextApiRequest, NextApiResponse } from 'next';
import { PersonalityEngine } from '@/lib/personalityEngine';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userQuery, memory, personality } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    const engine = new PersonalityEngine(apiKey);
    const response = await engine.transformResponse(userQuery, memory, personality);

    res.status(200).json({ response });
  } catch (error: any) {
    console.error('Personality transformation error:', error);
    res.status(500).json({ error: error.message || 'Failed to transform personality' });
  }
}
