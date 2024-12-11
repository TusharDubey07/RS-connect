import React, { useEffect,useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Bold, Italic, LinkIcon, List, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useDoctorStore from '../stores/doctorStore';
import useAppointmentStore from '../stores/appointmentStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css'
import AppointmentDetails from './AppointmentDetails';

const Staffdetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  const { doctorDetails } = useDoctorStore();
  const { 
    appointments, 
    selectedDate, 
    filteredAppointments,
    fetchAppointments, 
    setSelectedDate 
  } = useAppointmentStore();

  useEffect(() => {
    if (!doctorDetails) {
      navigate('/staff');
    }
  }, [doctorDetails, navigate]);

  useEffect(() => {
    if (doctorDetails?.id) {
      fetchAppointments(doctorDetails.id);
    }
  }, [doctorDetails?.id, fetchAppointments]);

  if (!doctorDetails) {
    return null;
  }

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-blue-100 text-blue-600';
      case 'cancelled':
        return 'bg-blue-100 text-blue-600';
      case 'pending':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Dummy messages data (you can replace this with real data later)
  const messages = [
    {
      text: "Hello Doctor",
      time: "09:30 AM",
      isSender: false
    },
    {
      text: "Hi, how can I help you?",
      time: "09:35 AM",
      isSender: true
    },
    // Add more messages as needed
  ];

  const Staffdetails = [
    { 
      label: "Name:", 
      value: doctorDetails.name,
      type: "text"
    },
    { 
      label: "Qualifications:", 
      value: doctorDetails.qualifications.map(qual => ({
        degree: qual.degree,
        institution: qual.institution,
        year: qual.year
      })),
      type: "qualification"
    },
    { 
      label: "Clinics:", 
      value: doctorDetails.clinics,
      type: "clinic"
    }
  ];

  const renderValue = (detail) => {
    switch (detail.type) {
      case "qualification":
        return (
          <div className="flex flex-col gap-2">
            {detail.value.map((qual, idx) => (
              <div key={idx} className="bg-blue-50 p-2 rounded-md">
                <div className="font-medium text-blue-700">{qual.degree}</div>
                <div className="text-sm text-gray-600">
                  {qual.institution} • {qual.year}
                </div>
              </div>
            ))}
          </div>
        );

      case "clinic":
        return (
          <div className="flex flex-col gap-3">
            {detail.value.map((clinic, idx) => (
              <div key={idx} className="bg-green-50 p-3 rounded-md">
                <div className="font-medium text-green-700">{clinic.name}</div>
                <div className="text-sm text-gray-600 mt-1">{clinic.address}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    📞 {clinic.contact}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    ₹{clinic.consultationFee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <span className="text-gray-700">{detail.value}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={()=>navigate('/staff')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <h1 className="text-lg font-semibold text-gray-700">{doctorDetails.name}</h1>
          </div>

          <div className="space-y-6 w-[300px] bg-white p-4 rounded-lg shadow">
            {Staffdetails.map((detail, index) => (
              <div key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {detail.label}
                  </span>
                  <div className="w-full">
                    {renderValue(detail)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="md:col-span-5 p-6 bg-white rounded-lg shadow-md h-auto">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Appointments</h2>
          
          <div className="w-full max-w-md mx-auto"> 
          <div className="bg-blue-50 rounded-xl shadow-lg p-6">
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                inline
                highlightDates={[
                  {
                    "react-datepicker__day--highlighted-custom-1": appointments.filter(apt => apt.status === 'completed').map(apt => new Date(apt.date))
                  },
                  {
                    "react-datepicker__day--highlighted-custom-2": appointments.filter(apt => apt.status === 'pending').map(apt => new Date(apt.date))
                  },
                  {
                    "react-datepicker__day--highlighted-custom-3": appointments.filter(apt => apt.status === 'cancelled').map(apt => new Date(apt.date))
                  }
                ]}
                dayClassName={date => {
                  const appointment = appointments.find(apt => new Date(apt.date).toDateString() === date.toDateString());
                  if (appointment) {
                    switch (appointment.status) {
                      case 'completed':
                        return 'bg-blue-100 text-blue-600';
                      case 'pending':
                        return 'bg-blue-100 text-blue-600';
                      case 'cancelled':
                        return 'bg-blue-100 text-blue-600';
                      default:
                        return '';
                    }
                  }
                  return '';
                }}
                className="w-full"
                calendarClassName="bg-blue-50 rounded-lg shadow-md p-4"
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div className="flex justify-between items-center mb-2">
                    <button onClick={decreaseMonth} className="text-gray-600 hover:text-gray-800">
                      &lt;
                    </button>
                    <span className="text-lg font-medium text-gray-800">
                      {date.toLocaleString('default', { month: 'long' })}
                    </span>
                    <button onClick={increaseMonth} className="text-gray-600 hover:text-gray-800">
                      &gt;
                    </button>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {selectedDate && (
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Appointments for {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            )}
            
            {filteredAppointments.map((appointment, index) => (
              <div 
                  key={index} 
                  className="flex items-center justify-between border-l-4 border-blue-500 pl-4 py-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50" // Added cursor-pointer and hover
                  onClick={() => handleAppointmentClick(appointment)}
                   >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {appointment.patientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          🕒 {appointment.startTime} - {appointment.endTime}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`
                  px-3 py-1.5 rounded-full text-sm font-medium
                  ${appointment.status === 'completed' && 'bg-green-100 text-green-700'}
                  ${appointment.status === 'cancelled' && 'bg-red-100 text-red-700'}
                  ${appointment.status === 'pending' && 'bg-yellow-100 text-yellow-700'}
                `}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>
              </div>
            ))}
            
            {selectedDate && filteredAppointments.length === 0 && (
              <div className="text-center py-4">
                <div className="text-gray-400 text-2xl mb-2">📅</div>
                <p className="text-gray-500 font-medium">No appointments scheduled</p>
                <p className="text-sm text-gray-400 mt-1">Select another date to view appointments</p>
              </div>
            )}
          </div>
          
        </div>

        {/* Chat Section */}
        <div className="md:col-span-4 p-3 bg-white rounded-lg shadow h-[700px]">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
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

            <div className="mt-auto p-4 border-t">
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
      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative w-full max-w-4xl">
          <AppointmentDetails 
            appointment={selectedAppointment}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    )}
    </div>
  );
}

export default Staffdetails;

