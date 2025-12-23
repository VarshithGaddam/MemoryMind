'use client';

import { useState } from 'react';
import { ChatMessage, ExtractedMemory, PersonalityType, PersonalityResponse } from '@/types';
import { sampleMessages } from '@/lib/sampleMessages';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [memory, setMemory] = useState<ExtractedMemory | null>(null);
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('How can I manage my stress better?');
  const [responses, setResponses] = useState<PersonalityResponse[]>([]);
  const [step, setStep] = useState<'input' | 'memory' | 'personality'>('input');
  const [showAllMessages, setShowAllMessages] = useState(false);

  const handleExtractMemory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/extract-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to extract memory');
      }
      
      const data = await res.json();
      
      // Validate the response structure
      if (!data.preferences || !data.emotionalPatterns || !data.facts) {
        throw new Error('Invalid response structure from API');
      }
      
      setMemory(data);
      setStep('memory');
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Failed to extract memory: ${error.message}`);
    }
    setLoading(false);
  };

  const handleGenerateResponses = async () => {
    if (!memory) return;
    setLoading(true);
    const personalities: PersonalityType[] = ['calm-mentor', 'witty-friend', 'therapist'];
    
    try {
      const responsePromises = personalities.map(async (personality) => {
        const res = await fetch('/api/transform-personality', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userQuery, memory, personality })
        });
        const data = await res.json();
        return { personality, response: data.response };
      });

      const results = await Promise.all(responsePromises);
      setResponses(results);
      setStep('personality');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate responses');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">
          AI Companion Memory System
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Memory Extraction + Personality Engine
        </p>

        {/* Step 1: Messages Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
            Step 1: Chat Messages ({messages.length})
          </h2>
          <div className="bg-gray-50 rounded p-4 max-h-96 overflow-y-auto mb-4">
            {(showAllMessages ? messages : messages.slice(0, 5)).map((msg, idx) => (
              <div key={idx} className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">User:</span> {msg.content}
              </div>
            ))}
            {!showAllMessages && messages.length > 5 && (
              <button
                onClick={() => setShowAllMessages(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-2"
              >
                ... and {messages.length - 5} more messages (click to show all)
              </button>
            )}
            {showAllMessages && (
              <button
                onClick={() => setShowAllMessages(false)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-2"
              >
                Show less
              </button>
            )}
          </div>
          <button
            onClick={handleExtractMemory}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? 'Extracting...' : 'Extract Memory'}
          </button>
        </div>

        {/* Step 2: Extracted Memory */}
        {memory && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              Step 2: Extracted Memory
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Preferences</h3>
                <ul className="text-sm space-y-1">
                  {(memory.preferences || []).map((p, idx) => (
                    <li key={idx} className="text-gray-700">
                      • {p.preference}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Emotional Patterns</h3>
                <ul className="text-sm space-y-1">
                  {(memory.emotionalPatterns || []).map((e, idx) => (
                    <li key={idx} className="text-gray-700">
                      • {e.emotion}: {e.context}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded p-4">
                <h3 className="font-semibold text-green-900 mb-2">Key Facts</h3>
                <ul className="text-sm space-y-1">
                  {(memory.facts || []).map((f, idx) => (
                    <li key={idx} className="text-gray-700">
                      • {f.fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                User Query for Personality Engine:
              </label>
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-gray-800"
                placeholder="Enter a question..."
              />
            </div>

            <button
              onClick={handleGenerateResponses}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
            >
              {loading ? 'Generating...' : 'Generate Personality Responses'}
            </button>
          </div>
        )}

        {/* Step 3: Personality Responses */}
        {responses.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              Step 3: Personality Engine Responses
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Query: <span className="font-semibold">{userQuery}</span>
            </p>

            <div className="space-y-4">
              {responses.map((resp, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-lg mb-2 capitalize text-indigo-900">
                    {resp.personality.replace('-', ' ')}
                  </h3>
                  <p className="text-gray-700">{resp.response}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
