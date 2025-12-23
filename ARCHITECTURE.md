# Architecture Documentation

## System Overview

This AI Companion Memory System is built with a modular architecture that separates concerns into distinct layers.

## Core Modules

### 1. Memory Extractor (`lib/memoryExtractor.ts`)

**Purpose**: Analyzes chat messages to extract structured user information.

**Key Features**:
- Uses GPT-4o-mini with JSON mode for structured output
- Extracts three categories: preferences, emotional patterns, facts
- Confidence scoring for preferences
- Importance scoring for facts

**Prompt Design**:
- Clear instructions for extraction
- Structured JSON schema definition
- Low temperature (0.3) for consistency
- JSON mode enabled for reliable parsing

**Output Schema**:
```typescript
{
  preferences: Array<{category, preference, confidence}>,
  emotionalPatterns: Array<{emotion, frequency, context}>,
  facts: Array<{fact, category, importance}>
}
```

### 2. Personality Engine (`lib/personalityEngine.ts`)

**Purpose**: Transforms responses based on personality type and user memory.

**Personalities**:
1. **Calm Mentor**: Wise, patient, encouraging
2. **Witty Friend**: Playful, humorous, casual
3. **Therapist**: Empathetic, validating, professional

**Key Features**:
- Memory-aware responses (uses extracted user data)
- Distinct system prompts for each personality
- Higher temperature (0.8) for natural variation
- Context injection from memory

### 3. API Routes

**`/api/extract-memory`**:
- Accepts: Array of chat messages
- Returns: Extracted memory object
- Error handling for API failures

**`/api/transform-personality`**:
- Accepts: User query, memory, personality type
- Returns: Transformed response
- Parallel processing support

### 4. Frontend (`app/page.tsx`)

**Three-Step Flow**:
1. Display chat messages
2. Show extracted memory
3. Compare personality responses

**State Management**:
- React hooks for local state
- Loading states for async operations
- Step-based navigation

## Design Decisions

### Why Next.js?
- Built-in API routes (serverless functions)
- Easy deployment to Vercel
- TypeScript support
- App Router for modern React patterns

### Why Separate Classes?
- Modularity: Easy to test and maintain
- Reusability: Can be used in other contexts
- Single Responsibility: Each class has one job
- Extensibility: Easy to add new features

### Why GPT-3.5 Turbo via OpenRouter?
- Most cost-effective option
- Fast response times
- Sufficient capability for extraction and transformation
- JSON mode support
- OpenRouter provides unified API access

## Extensibility

### Adding New Personalities
1. Add personality type to `types/index.ts`
2. Add prompt in `personalityEngine.ts`
3. Update frontend to display new personality

### Adding Memory Categories
1. Update `ExtractedMemory` interface
2. Modify extraction prompt
3. Update frontend visualization

### Adding Persistence
1. Add database (e.g., Supabase, MongoDB)
2. Create storage API routes
3. Update frontend to save/load data
