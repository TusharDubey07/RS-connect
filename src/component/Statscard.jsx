// import React from "react";
// import { VscSettings } from "react-icons/vsc";

// export function StatsCard({ title, children }) {
//   return (
//     <div className="bg-white rounded-lg border border-[#318459] p-4">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="font-medium text-gray-700">{title}</h3>
//         <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//           <VscSettings className="h-4 w-4 text-gray-600" />
//         </button>
//       </div>
//       {children}
//     </div>
//   );
// }


import React from "react";
import { VscSettings } from "react-icons/vsc";

export function StatsCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg border border-[#318459] p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <VscSettings className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      {children}
    </div>
  );
}

export function UserStatsDonutCard({ users }) {
  const calculatePercentages = () => {
    const total = users.length;
    const active = users.filter(user => user.isActive).length;
    const activePercentage = Math.round((active / total) * 100);
    const inactivePercentage = 100 - activePercentage;
    
    return { activePercentage, inactivePercentage };
  };

  const { activePercentage, inactivePercentage } = calculatePercentages();
  const circumference = 2 * Math.PI * 40; // r = 40
  const activeOffset = circumference * (1 - activePercentage / 100);

  return (
    <StatsCard title="User Activity Status">
      <div className="relative aspect-square w-full max-w-[200px] mx-auto mb-4 h-[250px]">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Active users percentage */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#10b981"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={activeOffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">{activePercentage}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
          <span>Active Users ({activePercentage}%)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-gray-200 rounded-sm" />
          <span>Inactive Users ({inactivePercentage}%)</span>
        </div>
      </div>
    </StatsCard>
  );
}

export function UserStatsProgressCard({ users }) {
  const calculatePercentages = () => {
    const total = users.length;
    const active = users.filter(user => user.isActive).length;
    const inactive = total - active;
    
    return {
      active: {
        count: active,
        percentage: Math.round((active / total) * 100)
      },
      inactive: {
        count: inactive,
        percentage: Math.round((inactive / total) * 100)
      }
    };
  };

  const stats = calculatePercentages();

  return (
    <StatsCard title="User Status Distribution">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Active Users</span>
            <span>{stats.active.percentage}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${stats.active.percentage}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Inactive Users</span>
            <span>{stats.inactive.percentage}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-gray-400 rounded-full"
              style={{ width: `${stats.inactive.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </StatsCard>
  );
}