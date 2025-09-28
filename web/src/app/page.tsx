'use client';

import { useState } from 'react';
import InteractiveAvatar from '@/components/InteractiveAvatar';
import ConversationPanel from '@/components/ConversationPanel';
import HealthDashboard from '@/components/HealthDashboard';
import { ConversationMessage } from '@/types/avatar';
import { mockUserProfile } from '@/services/mockHealthData';

export default function Home() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'health'>('chat');
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);

  const handleSendMessage = async (userMessage: string) => {
    // Add user message to conversation
    const userMsg: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Get response from Claude API
    setIsAvatarSpeaking(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-10), // Send last 10 messages for context
        }),
      });

      const data = await response.json();

      if (data.response) {
        // Add Cathy's response to conversation
        const cathyMsg: ConversationMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, cathyMsg]);

        // TODO: Make avatar speak the response
        // This would integrate with the InteractiveAvatar component
      }
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsAvatarSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cathy - Your Health Coach</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {mockUserProfile.name}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'chat'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'health'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Health Metrics
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'chat' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Avatar Section */}
            <div>
              <InteractiveAvatar
                onMessage={(message) => {
                  // Handle avatar messages if needed
                  console.log('Avatar said:', message);
                }}
              />
            </div>

            {/* Conversation Section */}
            <div className="h-[600px]">
              <ConversationPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isAvatarSpeaking={isAvatarSpeaking}
              />
            </div>
          </div>
        ) : (
          <HealthDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-600">
        <p>© 2024 Interactive Avatar Health Coach. Powered by HeyGen & Claude AI.</p>
      </footer>
    </div>
  );
}
