import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { MoreHorizontal, Share2 } from 'lucide-react';

export function BarChartComponent({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Lorem Ipsum</h2>
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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="conducted" fill="#1e293b" />
          <Bar dataKey="participated" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-800" />
          Challenges Conducted
        </span>
        <span className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500" />
          Challenges Participated
        </span>
      </div>
    </div>
  );
}