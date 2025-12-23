import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  res.status(200).json({
    hasApiKey: !!apiKey,
    keyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
  });
}
