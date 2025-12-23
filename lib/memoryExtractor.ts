import { ChatMessage, ExtractedMemory } from '@/types';

export class MemoryExtractor {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async extractMemory(messages: ChatMessage[]): Promise<ExtractedMemory> {
    const userMessages = messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .join('\n\n');

    const prompt = `Extract user info from these messages as JSON only:

${userMessages}

Return this exact JSON structure:
{
  "preferences": [{"category": "hobby", "preference": "plays guitar", "confidence": 0.9}],
  "emotionalPatterns": [{"emotion": "stress", "frequency": "frequent", "context": "work"}],
  "facts": [{"fact": "has dog named Max", "category": "pets", "importance": 0.9}]
}

Include 5+ preferences, 3+ emotions, 5+ facts. JSON only, no other text.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'AI Companion Memory System'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error(`Invalid API response: ${JSON.stringify(data)}`);
    }

    const content = data.choices[0].message.content;
    
    // Try to parse JSON from the content
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // If content is not valid JSON, try to extract JSON from it
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error(`Failed to parse JSON from response: ${content}`);
    }
  }
}
