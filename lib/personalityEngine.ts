import { PersonalityType, ExtractedMemory } from '@/types';

export class PersonalityEngine {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getPersonalityPrompt(personality: PersonalityType): string {
    const prompts = {
      'calm-mentor': `You are a calm, wise mentor. Speak with patience, wisdom, and encouragement. 
Use thoughtful pauses, ask reflective questions, and provide guidance without being pushy. 
Your tone is warm, measured, and supportive. Think of a life coach or experienced teacher.`,
      
      'witty-friend': `You are a witty, playful friend. Use humor, casual language, and pop culture references. 
Be lighthearted, use emojis occasionally, make jokes, and keep things fun. 
Your tone is energetic, relatable, and entertaining. Think of a fun best friend.`,
      
      'therapist': `You are an empathetic therapist. Use active listening, validation, and gentle probing. 
Reflect emotions back, ask open-ended questions, and create a safe space. 
Your tone is compassionate, non-judgmental, and deeply understanding. Think of a professional counselor.`
    };
    return prompts[personality];
  }

  async transformResponse(
    userQuery: string,
    memory: ExtractedMemory,
    personality: PersonalityType
  ): Promise<string> {
    const memoryContext = `
USER MEMORY:
Preferences: ${memory.preferences.map(p => p.preference).join(', ')}
Emotional Patterns: ${memory.emotionalPatterns.map(e => e.emotion).join(', ')}
Key Facts: ${memory.facts.map(f => f.fact).join(', ')}
`;

    const systemPrompt = this.getPersonalityPrompt(personality);
    
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
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${memoryContext}\n\nUser Query: ${userQuery}` }
        ],
        temperature: 0.8,
        max_tokens: 200
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

    return data.choices[0].message.content;
  }
}
