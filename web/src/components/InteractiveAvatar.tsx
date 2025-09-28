'use client';

import { useEffect, useRef, useState } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  VoiceEmotion,
} from '@heygen/streaming-avatar';
import { AvatarConfig, ConversationMessage } from '@/types/avatar';

interface InteractiveAvatarProps {
  config?: AvatarConfig;
  onMessage?: (message: string) => void;
}

export default function InteractiveAvatar({ config, onMessage }: InteractiveAvatarProps) {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize avatar on mount
    initializeAvatar();

    return () => {
      if (avatar) {
        avatar.stopAvatar();
      }
    };
  }, []);

  const initializeAvatar = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get access token from environment variable
      // Note: In production, this should come from a backend endpoint
      const accessToken = process.env.NEXT_PUBLIC_HEYGEN_API_KEY || process.env.HEYGEN_API_KEY || '';

      const newAvatar = new StreamingAvatar({ token: accessToken });

      // Set up event listeners
      newAvatar.on(StreamingEvents.AVATAR_START_TALKING, () => {
        setIsSpeaking(true);
      });

      newAvatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
        setIsSpeaking(false);
      });

      newAvatar.on(StreamingEvents.STREAM_READY, (event) => {
        if (videoRef.current && event.detail) {
          videoRef.current.srcObject = event.detail;
          videoRef.current.play();
          setIsConnected(true);
        }
      });

      newAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        setIsConnected(false);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      });

      // Create avatar session with Cathy's configuration
      const sessionInfo = await newAvatar.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: config?.avatarId || 'anna_public_3_20240108',
        voice: {
          voiceId: config?.voiceId || '1bd001e7e50f421d891986aad5158bc8',
          rate: 1.0,
          emotion: VoiceEmotion.FRIENDLY,
        },
        language: config?.language || 'en',
      });

      setAvatar(newAvatar);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to initialize avatar:', err);
      setError('Failed to connect to avatar. Please check your connection.');
      setIsLoading(false);
    }
  };

  const speak = async (text: string) => {
    if (!avatar || !isConnected) {
      console.error('Avatar not connected');
      return;
    }

    try {
      await avatar.speak({
        text,
        taskType: 'talk',
      });

      if (onMessage) {
        onMessage(text);
      }
    } catch (err) {
      console.error('Failed to speak:', err);
    }
  };

  const stopSpeaking = () => {
    if (avatar) {
      avatar.interrupt();
    }
  };

  const startListening = async () => {
    if (!avatar || !isConnected) {
      console.error('Avatar not connected');
      return;
    }

    try {
      await avatar.startListening();
    } catch (err) {
      console.error('Failed to start listening:', err);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Video Container */}
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Connecting to Cathy...</p>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center px-4">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={initializeAvatar}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className={`flex items-center px-3 py-1 rounded-full ${
              isConnected ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-white text-sm">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {isSpeaking && (
              <div className="flex items-center px-3 py-1 rounded-full bg-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                <span className="text-white text-sm">Speaking</span>
              </div>
            )}
          </div>
        </div>

        {/* Control Bar */}
        <div className="bg-gray-800 p-4 flex justify-center space-x-4">
          <button
            onClick={() => speak("Hello! I'm Cathy, your health and wellness coach. How can I help you today?")}
            disabled={!isConnected || isSpeaking}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Test Greeting
          </button>

          <button
            onClick={stopSpeaking}
            disabled={!isConnected || !isSpeaking}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600"
          >
            Stop Speaking
          </button>

          <button
            onClick={startListening}
            disabled={!isConnected || isSpeaking}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600"
          >
            Start Listening
          </button>
        </div>
      </div>
    </div>
  );
}