import React from "react";
import { useNavigate } from "react-router-dom";

const staffs = [
  { id: 1, name: "Ray Kapoor", role: "Developer", permission: "Developer", lorem: "Developer", status: "InActive" },
  { id: 2, name: "Ray Kapoor", role: "Developer", permission: "Developer", lorem: "Developer", status: "Active" },
  { id: 3, name: "Ray Kapoor", role: "Designer", permission: "Designer", lorem: "Designer", status: "InActive" },
  { id: 4, name: "Ray Kapoor", role: "Tester", permission: "Tester", lorem: "Tester", status: "Active" },
  { id: 5, name: "Ray Kapoor", role: "Tester", permission: "Tester", lorem: "Tester", status: "Active" },
  { id: 6, name: "Ray Kapoor", role: "Tester", permission: "Tester", lorem: "Tester", status: "Active" },
];

export function StaffList() {
  const navigate = useNavigate(); 

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Staff List</h2>
        <button className="text-sm text-emerald-600 hover:text-emerald-700">
          View More →
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Permission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Lorem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffs.map((staff) => (
              <tr 
              key={staff.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate('/staff-details')}
            >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 font-medium">
                          {staff.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {staff.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.permission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.lorem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      staff.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}