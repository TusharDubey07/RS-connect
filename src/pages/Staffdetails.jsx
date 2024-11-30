import React from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Bold, Italic, LinkIcon, List, Send } from 'lucide-react'
import { Sidebar } from '../component/Sidebar'
import { useNavigate } from 'react-router-dom'

const Staffdetails = () => {
  const navigate = useNavigate();
  const patientDetails = [
    { label: "Name:", value: "Raghu" },
    { label: "Age:", value: "Raghu" },
    { label: "Status:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
  ]

  const appointments = [
    { name: "Hema", time: "12:30 PM - 1:30 PM", status: "completed" },
    { name: "Hema", time: "12:30 PM - 1:30 PM", status: "completed" },
    { name: "Hema", time: "12:30 PM - 1:30 PM", status: "cancelled" },
    { name: "Hema", time: "12:30 PM - 1:30 PM", status: "completed" },
    { name: "Hema", time: "12:30 PM - 1:30 PM", status: "cancelled" },
  ]

  const messages = [
    {
      text: "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nislt?",
      time: "14/03, 9:03 PM",
      isSender: false
    },
    {
      text: "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ?",
      time: "14/03, 9:03 PM",
      isSender: true
    }
  ]

  return (
      <div className="min-h-screen bg-gray-50 p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-3">
            <button 
            onClick={()=>navigate('/staff')}
            className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <h1 className="text-lg font-semibold text-gray-700">Doctor Name</h1>
          </div>

          <div className="space-y-4 w-[300px]">
            {patientDetails.map((detail, index) => (
              <div key={index} className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{detail.label}</span>
                  <span>{detail.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="md:col-span-5 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-center mb-6">Appointments</h2>
          
          <div className="bg-blue-50 rounded-lg shadow-md  p-4">
            <div className="flex justify-between items-center mb-6">
              <button className="p-2 hover:bg-blue-100 rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-lg font-medium">February</span>
              <button className="p-2 hover:bg-blue-100 rounded-full">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-sm font-medium">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {[27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((date, i) => (
                <div 
                  key={i}
                  className={`p-2 text-sm rounded-full cursor-pointer ${date === 3 ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}`}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between border-l-4 border-gray-200 pl-4">
                <div>
                  <p className="font-medium">{appointment.name}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="md:col-span-4 p-6 bg-white rounded-lg shadow w-[500px]">
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4">
              {messages.map((message, index) => (
                <div 
                key={index} 
                className={`flex flex-col ${
                  message.isSender 
                    ? 'items-end ml-12' 
                    : 'items-start mr-12'
                }`}
              >
                <div className={`rounded-lg p-4 max-w-[85%] ${
                  message.isSender 
                    ? 'bg-blue-400 text-[#525252]' 
                    : 'bg-gray-100'
                }`}>
                  <p className={message.isSender ? 'text-white' : 'text-gray-700'}>
                    {message.text}
                  </p>
                  <p className={`text-right text-sm mt-2 ${
                    message.isSender ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <textarea 
                placeholder="Type Here" 
                className="w-full min-h-[100px] mb-2 p-2 border rounded-lg resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Bold className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Italic className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <LinkIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <button className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Staffdetails
