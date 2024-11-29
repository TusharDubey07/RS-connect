
import React, { useState } from "react";
import { Search, Users, Calendar, UserMinus, CheckSquare } from "lucide-react";
import { VscSettings } from "react-icons/vsc";
import { Sidebar } from "../component/Sidebar"; 
import { StatusCard } from "../component/Statuscard"; 
import { PatientList } from "../component/PatientList"; 
import { StatsCard } from "../component/Statscard";

export default function Patient() {
  const [showCalendar, setShowCalendar] = useState(false);
  
  const statusCards = [
    {
      icon: Users,
      label: "New Patients",
      value: "16",
    },
    {
      icon: CheckSquare,
      label: "Total Appointments",
      value: "200",
    },
    {
      icon: CheckSquare,
      label: "Inactive Patients",
      value: "140",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pl-[150px]">
        <div className="container mx-auto p-6 space-y-6">
          {/* Search */}
          <div className="flex justify-center">
            <div className="max-w-md w-full relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border rounded pl-10"
                style={{ borderColor: "#54BE87" }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Status This Month Box */}
    
        <div className="p-6 bg-white rounded-lg shadow-md border border-emerald-500 w-[922px]">
            <div className="flex flex-col">
              <div className="flex items-start "> {/* Changed to items-start */}
                <div className="flex-col">
                <h2 className="text-lg font-medium text-gray-700 mr-8 mb-5">Status This Month</h2>
                <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="self-start flex items-center gap-2 text-gray-600 px-3 py-1 border border-emerald-500 rounded-md hover:bg-gray-50"
              >
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 transform transition-transform ${
                    showCalendar ? 'rotate-180' : ''
                  }`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              </div>
                <div className="grid grid-cols-3 gap-6"> {/* Increased gap */}
                  {statusCards.map((card, index) => (
                    <StatusCard
                      key={index}
                      icon={card.icon}
                      label={card.label}
                      value={card.value}
                    />
                  ))}
                </div>
              </div>
              
             

              {showCalendar && (
                <div className="mt-4 p-4 border border-emerald-500 rounded-md bg-white">
                  <p className="text-sm text-gray-600">Calendar content goes here...</p>
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-[#318459] rounded-lg">
              <PatientList />
            </div>
            <div className="space-y-4 ">
              {/* Donut Chart Card */}
              <StatsCard title="lorem">
                <div className="relative aspect-square w-full max-w-[200px] mx-auto mb-4 h-[250px]">
                  
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray="251.2"
                      strokeDashoffset="55.264"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-semibold">78%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                  <span>Lorem ipsum</span>
                </div>
              </StatsCard>

              {/* Progress Bars Card */}
              <StatsCard title="Lorem">
                <div className="space-y-4">
                  {[
                    { label: "Lorem", percentage: 78 },
                    { label: "Lorem", percentage: 12 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </StatsCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}