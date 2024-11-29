import React from "react";
import { useNavigate } from "react-router-dom";

const patients = [
  { id: 1, name: "Ray Kapoor", diagnosis: "Diabetes", status: "InActive" },
  { id: 2, name: "Ray Kapoor", diagnosis: "Hypertension", status: "Active" },
  { id: 3, name: "Ray Kapoor", diagnosis: "Asthma", status: "InActive" },
  { id: 4, name: "Ray Kapoor", diagnosis: "Arthritis", status: "Active" },
  { id: 5, name: "Ray Kapoor", diagnosis: "Migraine", status: "Active" },
  { id: 6, name: "Ray Kapoor", diagnosis: "Anxiety", status: "Active" },
];

export function PatientList() {
  const navigate = useNavigate(); // Add this line to get the navigate function

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Patient List</h2>
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
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr 
              key={patient.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate('/patient-details')}
            >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 font-medium">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.diagnosis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {patient.status}
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