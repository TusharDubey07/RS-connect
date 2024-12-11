import { X, ChevronRight, Star } from 'lucide-react';

const AppointmentDetails = ({ appointment, onClose }) => {
  const patientDetails = [
    { 
      label: "Name:", 
      value: appointment?.patientName || "N/A" 
    },
    { 
      label: "Type:", 
      value: appointment?.type?.charAt(0).toUpperCase() + appointment?.type?.slice(1) || "N/A" 
    },
    { 
      label: "Location:", 
      value: appointment?.clinic ? appointment.clinic.name : "Online Meeting"
    },
  ];

  const medicalDetails = [
    {
      label: "Symptoms:",
      value: appointment?.medicalDetails?.symptoms?.join(", ") || "N/A"
    },
    {
      label: "Diagnosis:",
      value: appointment?.medicalDetails?.diagnosis || "N/A"
    },
    {
      label: "Prescriptions:",
      value: appointment?.medicalDetails?.prescriptions?.map(p => 
        `${p.dosage} - ${p.frequency}`
      ).join(", ") || "N/A"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">
            Appointment with {appointment?.patientName}
          </h1>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Patient Details */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Patient Details</h2>
              <button className="text-gray-500 text-sm flex items-center gap-1 p-2 hover:bg-gray-100 rounded">
                View more
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {patientDetails.map((detail, index) => (
                <div key={index} className="flex items-center border-b border-gray-200 pb-2">
                  <span className="w-24 text-gray-600">{detail.label}</span>
                  <span>{detail.value}</span>
                </div>
              ))}
            </div>

            {/* Medical Details Section */}
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-4">Medical Details</h2>
              <div className="space-y-4">
                {medicalDetails.map((detail, index) => (
                  <div key={index} className="flex flex-col border-b border-gray-200 pb-2">
                    <span className="text-gray-600 mb-1">{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Appointment Details & Feedback */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {new Date(appointment?.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h2>
              <p className="text-gray-600">
                {appointment?.startTime} - {appointment?.endTime}
              </p>
            </div>

            {/* Feedback Section */}
            {appointment?.feedback?.rating && (
              <div className="bg-white rounded-3xl shadow-xl border p-4 mb-4">
                <h3 className="text-lg font-medium mb-3">Feedback</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < appointment.feedback.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  {appointment.feedback.review}
                </p>
              </div>
            )}

            {/* Notes Section */}
            <div className="bg-white rounded-3xl shadow-xl border p-4">
              <h3 className="text-lg font-medium mb-3">Notes</h3>
              <div className="space-y-4">
                {appointment?.notes?.map((note, index) => (
                  <div key={index} className="text-gray-600 leading-relaxed border-b border-gray-100 pb-2">
                    <p>{note.content}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                  </div>
                )) || "No notes available"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;