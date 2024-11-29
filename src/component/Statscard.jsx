import React from "react";
import { VscSettings } from "react-icons/vsc";

export function StatsCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
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
