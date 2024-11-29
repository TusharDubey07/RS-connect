import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Share2 } from 'lucide-react';

export function EngagementChart({ data }) {
  return (
    <div className="col-span-full bg-white rounded-lg shadow-md p-6 w-[800px] h-[280px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Employee Engagement Rate</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              Monthly
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Yearly
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}