import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { MoreHorizontal, Share2 } from 'lucide-react';

export function AreaChartComponent({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Employee Feedback</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="value" 
            fill="#10b981" 
            fillOpacity={0.3} 
            stroke="#10b981" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}