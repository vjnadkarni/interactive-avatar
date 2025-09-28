import { HealthData, UserProfile } from '@/types/avatar';

export const generateMockHealthData = (): HealthData => {
  const baseHeartRate = 72;
  const heartRateData = Array.from({ length: 24 }, (_, i) => {
    const variation = Math.sin(i / 3) * 10 + Math.random() * 5;
    return Math.round(baseHeartRate + variation);
  });

  return {
    heartRate: heartRateData,
    steps: Math.floor(Math.random() * 5000) + 5000,
    sleepHours: Number((Math.random() * 2 + 6).toFixed(1)),
    bloodOxygen: Math.floor(Math.random() * 3) + 96,
    bloodPressure: {
      systolic: Math.floor(Math.random() * 20) + 110,
      diastolic: Math.floor(Math.random() * 15) + 65,
    },
    lastWorkout: ['30 min walk', '45 min yoga', '20 min strength training', '40 min cycling'][
      Math.floor(Math.random() * 4)
    ],
    caloriesBurned: Math.floor(Math.random() * 800) + 1800,
    activeMinutes: Math.floor(Math.random() * 60) + 30,
    stressLevel: (['low', 'moderate', 'high'] as const)[Math.floor(Math.random() * 3)],
    lastMeasurement: new Date(),
  };
};

export const mockUserProfile: UserProfile = {
  name: 'Alex Johnson',
  age: 35,
  gender: 'Female',
  height: 165,
  weight: 65,
  healthGoals: [
    'Improve cardiovascular health',
    'Reduce stress',
    'Better sleep quality',
    'Maintain healthy weight',
  ],
  medicalConditions: ['Mild hypertension'],
  medications: ['Lisinopril 10mg daily'],
};

export const getCathyPersonality = () => ({
  name: 'Cathy',
  role: 'Health & Wellness Coach',
  personality: `You are Cathy, a warm, bubbly, and enthusiastic health and wellness coach.
    You're incredibly knowledgeable about health, fitness, and wellness, but you present
    information in a friendly, approachable way. You're an excellent listener who asks
    thoughtful questions to understand each person's unique needs and goals. You remember
    all previous conversations and build on them. You're encouraging without being pushy,
    and you celebrate small victories. You occasionally use analogies and real-world examples
    to explain complex health concepts. You're empathetic and understand that making health
    changes can be challenging.`,
  greetings: [
    "Hi there! I'm Cathy, your personal health and wellness coach. I'm so excited to work with you!",
    "Hello! Welcome back! I've been looking forward to our chat today.",
    "Hi! It's great to see you again! How have you been feeling since we last talked?",
  ],
  iceBreakers: [
    "Before we dive in, tell me - what's one thing that made you smile today?",
    "I'm curious - what brought you to focus on your health right now?",
    "What's one small win you've had this week, health-related or not?",
  ],
});