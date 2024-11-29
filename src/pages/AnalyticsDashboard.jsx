// import React from 'react';
// import { EngagementChart } from '../component/EngagementChart';
// import { RadarChartComponent } from '../component/RadarChart';
// import { SatisfactionChart } from '../component/SatisfactionChart';
// import { BarChartComponent } from '../component/BarChart';
// import { AreaChartComponent } from '../component/AreaChart';

// export default function AnalyticsDashboard() {
//   // Sample data for the charts
//   const engagementData = [
//     { year: '2017', value: 50 },
//     { year: '2018', value: 45 },
//     { year: '2019', value: 60 },
//     { year: '2020', value: 40 },
//     { year: '2021', value: 55 },
//     { year: '2022', value: 58 },
//     { year: '2023', value: 62 },
//     { year: '2024', value: 40 },
//   ];

//   const radarData = [
//     { subject: 'Stress', A: 80 },
//     { subject: 'Anxiety', A: 85 },
//     { subject: 'Mood', A: 70 },
//     { subject: 'Depression', A: 75 },
//     { subject: 'Joy', A: 80 },
//     { subject: 'Addiction', A: 85 },
//   ];
//   const barData = [
//     { week: 'Week1', conducted: 30, participated: 20 },
//     { week: 'Week2', conducted: 25, participated: 18 },
//     { week: 'Week3', conducted: 30, participated: 25 },
//     { week: 'Week4', conducted: 32, participated: 22 },
//   ];

//   const areaData = [
//     { week: 'Week1', value: 10 },
//     { week: 'Week2', value: 30 },
//     { week: 'Week3', value: 15 },
//     { week: 'Week4', value: 25 },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       <EngagementChart data={engagementData} />
//       <RadarChartComponent data={radarData} />
//       <SatisfactionChart />
//       <BarChartComponent data={barData} />
//       <AreaChartComponent data={areaData} />
//     </div>
//   );
// }

import React, { useState } from 'react';
import { EngagementChart } from '../component/EngagementChart';
import { RadarChartComponent } from '../component/RadarChart';
import { SatisfactionChart } from '../component/SatisfactionChart';
import { BarChartComponent } from '../component/BarChart';
import { AreaChartComponent } from '../component/AreaChart';
import { Sidebar } from '../component/Sidebar';
import { Search, Users, Calendar, UserMinus, CheckSquare } from 'lucide-react';
import { StatusCard } from '../component/Statuscard';

export default function AnalyticsDashboard() {
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

  // Sample data for the charts
  const engagementData = [
    { year: '2017', value: 50 },
    { year: '2018', value: 45 },
    { year: '2019', value: 60 },
    { year: '2020', value: 40 },
    { year: '2021', value: 55 },
    { year: '2022', value: 58 },
    { year: '2023', value: 62 },
    { year: '2024', value: 40 },
  ];

  const radarData = [
    { subject: 'Stress', A: 80 },
    { subject: 'Anxiety', A: 85 },
    { subject: 'Mood', A: 70 },
    { subject: 'Depression', A: 75 },
    { subject: 'Joy', A: 80 },
    { subject: 'Addiction', A: 85 },
  ];

  const barData = [
    { week: 'Week1', conducted: 30, participated: 20 },
    { week: 'Week2', conducted: 25, participated: 18 },
    { week: 'Week3', conducted: 30, participated: 25 },
    { week: 'Week4', conducted: 32, participated: 22 },
  ];

  const areaData = [
    { week: 'Week1', value: 10 },
    { week: 'Week2', value: 30 },
    { week: 'Week3', value: 15 },
    { week: 'Week4', value: 25 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pl-[150px]">
        <div className="container mx-auto p-6 space-y-6">
          {/* Search Bar */}
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


          {/* Content Grid for Charts */}
          <div className="flex  flex-row gap-6">
            <div className="md:col-span-2">
              <EngagementChart data={engagementData} />
            </div>
            <div>
              <RadarChartComponent data={radarData} />
            </div>
          </div>

          {/* Additional Charts in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#318459] rounded-lg">
              <SatisfactionChart />
            </div>
            <div className="border border-[#318459] rounded-lg">
              <BarChartComponent data={barData} />
            </div>
            <div className="border border-[#318459] rounded-lg">
              <AreaChartComponent data={areaData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}