export interface AvatarConfig {
  avatarId?: string;
  voiceId?: string;
  quality?: 'low' | 'medium' | 'high';
  language?: string;
}

export interface HealthData {
  heartRate: number[];
  steps: number;
  sleepHours: number;
  bloodOxygen: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  lastWorkout: string;
  caloriesBurned: number;
  activeMinutes: number;
  stressLevel: 'low' | 'moderate' | 'high';
  lastMeasurement: Date;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  healthGoals: string[];
  medicalConditions: string[];
  medications: string[];
}