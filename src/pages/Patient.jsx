import React, { useState, useEffect } from "react";
import { Search, Users, Calendar as CalendarIcon, UserMinus, CheckSquare } from "lucide-react";
import { StatusCard } from "../component/Statuscard"; 
import { PatientList } from "../component/PatientList"; 
import { UserStatsDonutCard, UserStatsProgressCard } from "../component/Statscard";
import useLoadingStore from '../stores/loadingStore';
import useDashboardStore from '../stores/dashboardStore';
import usePatientStore from '../stores/patientStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

export default function Patient() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setIsLoading } = useLoadingStore();
  const { stats, fetchDashboardStats } = useDashboardStore();
  const { patients } = usePatientStore();

  useEffect(() => {
    const loadStats = async () => {
      try {
        await fetchDashboardStats();
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };
    loadStats();
  }, [fetchDashboardStats]);

  const statusCards = [
    {
      icon: Users,
      label: "Total Patients",
      value: stats.totalUsers.toString(),
    },
    {
      icon: CheckSquare,
      label: "Total Appointments",
      value: stats.totalAppointments.toString(),
    },
    {
      icon: UserMinus,
      label: "Inactive Patients",
      value: stats.inactiveUsers.toString(),
    },
  ];

  return (
    <div className="content-loaded">
      <main className="flex-1 pl-[30px]">
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
          <div className="p-6 bg-white rounded-lg shadow-md border border-emerald-500 w-[922px] relative">
            <div className="flex flex-col">
              <div className="flex items-start">
                <div className="flex-col">
                  <h2 className="text-lg font-medium text-gray-700 mr-8 mb-5">Status This Month</h2>
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="self-start flex items-center gap-2 text-gray-600 px-3 py-1 border border-emerald-500 rounded-md hover:bg-gray-50"
                  >
                    <CalendarIcon className="w-4 h-4" />
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
                <div className="grid grid-cols-3 gap-6">
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
                <div className="absolute top-full mt-2 left-0 p-4 border border-emerald-500 rounded-md bg-white z-10">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-[#318459] rounded-lg">
              <PatientList />
            </div>
            <div className="space-y-4">
              {/* Donut Chart Card */}
              <UserStatsDonutCard users={patients} />

              {/* Progress Bars Card */}
              <UserStatsProgressCard users={patients} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}