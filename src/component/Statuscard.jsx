import React from "react";

export function StatusCard({ icon: Icon, label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-[200px] h-[90px] content-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg border border-emerald-500">
          <Icon className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs text-gray-600">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}