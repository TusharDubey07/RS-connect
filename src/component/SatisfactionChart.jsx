import React from 'react';
import { MoreHorizontal, Share2 } from 'lucide-react';

export function SatisfactionChart() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[350px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Patient Satisfaction</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="relative h-[180px] flex items-center justify-center">
      <div className="w-[180px] h-[180px]"> 
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#10b981"
            strokeWidth="12"
            strokeDasharray="251.2"
            strokeDashoffset="55.264"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">78%</span>
        </div>
      </div>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <div className="w-3 h-3 bg-emerald-500" />
        <span className="text-sm">Average running rate of employee</span>
      </div>
    </div>
  );
}