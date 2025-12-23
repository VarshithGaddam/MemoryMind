import type { NextApiRequest, NextApiResponse } from 'next';
import { MemoryExtractor } from '@/lib/memoryExtractor';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('API key not found in environment variables');
      return res.status(500).json({ error: 'OpenRouter API key not configured. Please add OPENAI_API_KEY to environment variables.' });
    }

    console.log('API key found, extracting memory...');
    const extractor = new MemoryExtractor(apiKey);
    const memory = await extractor.extractMemory(messages);

    res.status(200).json(memory);
  } catch (error: any) {
    console.error('Memory extraction error:', error);
    res.status(500).json({ error: error.message || 'Failed to extract memory' });
  }
}
