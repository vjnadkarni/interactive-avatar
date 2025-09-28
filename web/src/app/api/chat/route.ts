import { NextRequest, NextResponse } from 'next/server';
import Anthropic from 'anthropic';
import { getCathyPersonality, mockUserProfile, generateMockHealthData } from '@/services/mockHealthData';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get Cathy's personality and current health data
    const cathyPersonality = getCathyPersonality();
    const healthData = generateMockHealthData();

    // Construct the system prompt with Cathy's personality and user context
    const systemPrompt = `${cathyPersonality.personality}

Current User Profile:
- Name: ${mockUserProfile.name}
- Age: ${mockUserProfile.age}
- Gender: ${mockUserProfile.gender}
- Health Goals: ${mockUserProfile.healthGoals.join(', ')}
- Medical Conditions: ${mockUserProfile.medicalConditions.join(', ')}
- Current Medications: ${mockUserProfile.medications.join(', ')}

Current Health Metrics:
- Steps Today: ${healthData.steps}
- Sleep Last Night: ${healthData.sleepHours} hours
- Current Heart Rate Average: ${Math.round(healthData.heartRate.reduce((a, b) => a + b, 0) / healthData.heartRate.length)} bpm
- Blood Pressure: ${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}
- Stress Level: ${healthData.stressLevel}
- Last Workout: ${healthData.lastWorkout}
- Active Minutes Today: ${healthData.activeMinutes}

Remember to:
1. Be warm, encouraging, and supportive
2. Reference the user's specific health data when relevant
3. Provide actionable advice tailored to their goals
4. Ask follow-up questions to better understand their needs
5. Celebrate their achievements, no matter how small
6. Keep responses concise but informative (2-3 paragraphs max)`;

    // Prepare conversation history for Claude
    const messages = [
      {
        role: 'user' as const,
        content: message,
      },
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      messages.unshift(...conversationHistory.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })));
    }

    // Get response from Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: messages,
    });

    const responseText = response.content[0].type === 'text'
      ? response.content[0].text
      : 'I apologize, but I couldn\'t generate a response. Please try again.';

    return NextResponse.json({
      response: responseText,
      healthContext: {
        steps: healthData.steps,
        sleepHours: healthData.sleepHours,
        stressLevel: healthData.stressLevel,
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}