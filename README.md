# AI Companion Memory System

A modular AI companion system that extracts user memory from chat messages and transforms responses using different personality engines.

## Features

### 1. Memory Extraction Module
Analyzes 30 chat messages to identify:
- **User Preferences**: Hobbies, likes, dislikes, habits
- **Emotional Patterns**: Recurring emotions, triggers, contexts
- **Memorable Facts**: Personal info, goals, relationships, experiences

### 2. Personality Engine
Transforms agent responses with three distinct personalities:
- **Calm Mentor**: Patient, wise, encouraging guidance
- **Witty Friend**: Playful, humorous, casual conversation
- **Therapist**: Empathetic, validating, professional support

### 3. Before/After Comparison
Shows how the same query gets different responses based on personality and user memory context.

## Architecture

```
├── lib/
│   ├── memoryExtractor.ts    # Memory extraction logic
│   ├── personalityEngine.ts  # Personality transformation
│   └── sampleMessages.ts     # Sample chat data
├── pages/api/
│   ├── extract-memory.ts     # Memory extraction API
│   └── transform-personality.ts  # Personality API
├── types/
│   └── index.ts              # TypeScript interfaces
└── app/
    ├── page.tsx              # Main UI
    └── globals.css           # Styles
```

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
OPENAI_API_KEY=sk-or-v1-your-openrouter-api-key-here
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy

### Other Platforms
- Build: `npm run build`
- Start: `npm start`

## How It Works

1. **Input**: 30 sample chat messages (or custom messages)
2. **Memory Extraction**: Uses GPT-3.5 Turbo via OpenRouter with structured output to extract preferences, emotions, and facts
3. **Personality Transformation**: Applies different personality prompts to generate contextual responses
4. **Comparison**: Shows side-by-side responses from all three personalities

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **AI**: OpenRouter API with GPT-3.5 Turbo (cheapest option)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## Key Design Decisions

- **Modular Architecture**: Separate classes for memory extraction and personality engine
- **Structured Output**: JSON mode for reliable memory extraction
- **Type Safety**: Full TypeScript coverage
- **API Routes**: Serverless functions for AI operations
- **Sample Data**: Pre-loaded messages for quick demo

## License

MIT
