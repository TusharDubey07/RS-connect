import React, { useEffect } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Bold, Italic, LinkIcon, List, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useDoctorStore from '../stores/doctorStore';
import useAppointmentStore from '../stores/appointmentStore';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Staffdetails = () => {
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
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
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

  const calendarClassNames = {
    root: 'w-[300px] mx-auto',
    months: 'flex justify-center',
    month: 'w-full',
    caption: 'flex justify-between items-center h-10 mb-4',
    caption_label: 'text-base font-semibold text-gray-900',
    nav: 'flex gap-1',
    nav_button: 'h-8 w-8 bg-transparent hover:bg-blue-100 flex items-center justify-center rounded-full transition-colors',
    nav_button_previous: 'text-gray-600',
    nav_button_next: 'text-gray-600',
    table: 'w-full border-collapse space-y-1',
    thead: 'block mb-2',
    tbody: 'block',
    head_row: 'grid grid-cols-7 mb-1',
    head_cell: 'text-gray-500 font-medium text-center text-sm',
    row: 'grid grid-cols-7 mt-2',
    cell: 'text-center text-sm p-0 relative',
    day: 'h-8 w-8 mx-auto flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors',
    day_range_start: 'rounded-l-full',
    day_range_end: 'rounded-r-full',
    day_selected: 'bg-blue-600 text-white hover:bg-blue-700',
    day_today: 'bg-gray-100 font-semibold',
    day_outside: 'text-gray-400',
    day_disabled: 'text-gray-400',
    day_hidden: 'invisible',
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
        <div className="md:col-span-5 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Appointments</h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
            <div className="flex justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                classNames={calendarClassNames}
                modifiers={{
                  hasAppointment: (date) => 
                    appointments.some(apt => apt.date.toDateString() === date.toDateString())
                }}
                modifiersStyles={{
                  hasAppointment: {
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: '500'
                  }
                }}
                showOutsideDays={true}
                weekStartsOn={0}
                formatters={{
                  formatWeekdayName: (date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
                }}
                styles={{
                  table: { width: '100%' },
                  head_row: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' },
                  row: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' },
                  cell: { textAlign: 'center' },
                }}
              />
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {selectedDate && (
              <h3 className="text-sm font-medium text-gray-600 mb-4">
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
                className="flex items-center justify-between border-l-4 border-blue-500 pl-4 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
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
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-3">📅</div>
                <p className="text-gray-500 font-medium">No appointments scheduled</p>
                <p className="text-sm text-gray-400 mt-1">Select another date to view appointments</p>
              </div>
            )}
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
  );
}

export default Staffdetails;
