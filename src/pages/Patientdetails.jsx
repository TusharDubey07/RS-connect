import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../component/Sidebar";

export default function PatientDetails() {
  const navigate = useNavigate();
  
  const patientInfo = [
    { label: "Name:", value: "Raghu" },
    { label: "Age:", value: "25" },
    { label: "Status:", value: "Active" },
    { label: "Diagnosis:", value: "Hypertension" },
    { label: "Allergies:", value: "Peanuts" },
    { label: "Blood Group:", value: "O+" },
    { label: "Last Visit:", value: "10th Nov 2024" },
    { label: "Next Appointment:", value: "20th Dec 2024" },
  ];

  const medications = Array(10).fill("Paracetamol 500mg - Twice Daily");
  const previousVisits = Array(10).fill("Routine Checkup - 15th Oct 2024");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pl-[150px]">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/')}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              <span className="h-5 w-5">&larr;</span>
            </button>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
              RK
            </div>
            <h1 className="text-xl font-medium">Ray Kapoor</h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Info - Left Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Patient Information</h2>
              <div className="space-y-4">
                {patientInfo.map((info, index) => (
                  <div key={index} className="flex border-b pb-2">
                    <span className="w-32 text-gray-600 font-medium">{info.label}</span>
                    <span className="text-gray-800">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Medications and Previous Visits */}
            <div className="space-y-6">
              {/* Medications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium mb-4">Medications</h2>
                <ol className="list-decimal list-inside space-y-2">
                  {medications.slice(0, 5).map((med, index) => (
                    <li key={index} className="text-gray-600">
                      {med}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Previous Visits */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium mb-4">Previous Visits</h2>
                <ol className="list-decimal list-inside space-y-2">
                  {previousVisits.slice(0, 5).map((visit, index) => (
                    <li key={index} className="text-gray-600">
                      {visit}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Notes Section - Full Width Below */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Notes</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi?
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}