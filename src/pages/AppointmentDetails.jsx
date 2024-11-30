import { X, ChevronRight } from 'lucide-react'

export default function AppointmentDetails() {
  const patientDetails = [
    { label: "Name:", value: "Raghu" },
    { label: "Age:", value: "Raghu" },
    { label: "Status:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
    { label: "Diagnosis:", value: "Raghu" },
  ]

  return (
    <div className="min-h-screen flex items-center pl-[80px]">
    <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-md bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Appointment with Ray</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
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
          </div>

        {/* Right Column - Appointment Details */}
        <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">14th July, 2023</h2>
              <p className="text-gray-600">05:00 PM - 06:00PM</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border p-4">
              <h3 className="text-lg font-medium mb-3">Notes</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisil?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}