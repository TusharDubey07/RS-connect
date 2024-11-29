import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import { MoreHorizontal, Share2 } from 'lucide-react';

export function RadarChartComponent({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md  h-[280px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium mt-6 ml-6">Lorem Ipsum</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar dataKey="A" fill="#10b981" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}