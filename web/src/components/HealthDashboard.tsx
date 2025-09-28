'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HealthData } from '@/types/avatar';
import { generateMockHealthData } from '@/services/mockHealthData';

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  useEffect(() => {
    // Simulate real-time data updates
    const updateData = () => {
      setHealthData(generateMockHealthData());
    };

    updateData();
    const interval = setInterval(updateData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!healthData) {
    return <div className="flex items-center justify-center h-64">Loading health data...</div>;
  }

  const heartRateChartData = healthData.heartRate.map((rate, index) => ({
    time: `${index}:00`,
    heartRate: rate,
  }));

  const getStressColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-800">Health Metrics Dashboard</h2>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Steps Today</h3>
          <p className="text-2xl font-bold text-blue-600">{healthData.steps.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Goal: 10,000</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Sleep</h3>
          <p className="text-2xl font-bold text-purple-600">{healthData.sleepHours} hrs</p>
          <p className="text-xs text-gray-400">Recommended: 7-9 hrs</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Blood Oxygen</h3>
          <p className="text-2xl font-bold text-green-600">{healthData.bloodOxygen}%</p>
          <p className="text-xs text-gray-400">Normal: 95-100%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Stress Level</h3>
          <p className={`text-2xl font-bold capitalize ${getStressColor(healthData.stressLevel)}`}>
            {healthData.stressLevel}
          </p>
          <p className="text-xs text-gray-400">Based on HRV</p>
        </div>
      </div>

      {/* Heart Rate Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Heart Rate (24 Hours)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={heartRateChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Blood Pressure</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-red-500">
              {healthData.bloodPressure.systolic}
            </span>
            <span className="text-xl text-gray-500">/</span>
            <span className="text-2xl font-bold text-red-400">
              {healthData.bloodPressure.diastolic}
            </span>
            <span className="text-sm text-gray-500">mmHg</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Normal: &lt;120/80</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Activity Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Minutes</span>
              <span className="font-semibold">{healthData.activeMinutes} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Calories Burned</span>
              <span className="font-semibold">{healthData.caloriesBurned} cal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Workout</span>
              <span className="font-semibold text-sm">{healthData.lastWorkout}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Last Update */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {new Date(healthData.lastMeasurement).toLocaleString()}
      </div>
    </div>
  );
}