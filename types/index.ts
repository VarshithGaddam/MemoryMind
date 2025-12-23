export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface UserPreference {
  category: string;
  preference: string;
  confidence: number;
}

export interface EmotionalPattern {
  emotion: string;
  frequency: string;
  context: string;
}

export interface MemorableFact {
  fact: string;
  category: string;
  importance: number;
}

export interface ExtractedMemory {
  preferences: UserPreference[];
  emotionalPatterns: EmotionalPattern[];
  facts: MemorableFact[];
}

export type PersonalityType = 'calm-mentor' | 'witty-friend' | 'therapist';

export interface PersonalityResponse {
  personality: PersonalityType;
  response: string;
}
