import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from "lucide-react";
import usePatientStore from '../stores/patientStore';
import useLoadingStore from '../stores/loadingStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PatientDetails() {
  const navigate = useNavigate();
  const { selectedPatient } = usePatientStore();
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    setIsLoading(true);

    if (!selectedPatient) {
      navigate('/');
    }

    // Reduced timeout to 300ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [selectedPatient, navigate, setIsLoading]);

  // If there's no selected patient, return null or a loading state
  if (!selectedPatient) {
    return null;
  }

  const patientInfo = [
    { label: "Name:", value: `${selectedPatient.firstName} ${selectedPatient.lastName}` },
    { label: "Birth Date:", value: new Date(selectedPatient.dateOfBirth).toLocaleDateString() },
    { label: "Status:", value: selectedPatient.isActive ? "Active" : "Inactive" },
    { label: "Diagnosis:", value: selectedPatient.chronicDiseases.length > 0 
      ? selectedPatient.chronicDiseases.join(', ') 
      : 'No diagnosis' },
    { label: "Allergies:", value: selectedPatient.allergies.length > 0 
      ? selectedPatient.allergies.join(', ') 
      : 'None' },
    { label: "Blood Group:", value: selectedPatient.bloodGroup || 'Not specified' },
    { label: "Last Visit:", value: "Not available" },
    { label: "Next Appointment:", value: "Not scheduled" },
  ];

  return (
    <main className="flex-1 pl-[30px]">
      {/* Rest of your existing JSX */}
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
            {selectedPatient.firstName.charAt(0)}
          </div>
          <h1 className="text-xl font-medium">
            {`${selectedPatient.firstName} ${selectedPatient.lastName}`}
          </h1>
        </div>

        {/* Patient Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Patient Info */}
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

          {/* Right Column - Medications */}
        <div className="grid grid-rows-2 gap-2">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Medications</h2>
              <ol className="list-decimal list-inside space-y-2">
                {selectedPatient.currentMedications.map((med, index) => (
                  <li key={index} className="text-gray-600">
                    {`${med.name} ${med.dosage} - ${med.frequency}`}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Reports</h2>
              <div className="space-y-6">
                {selectedPatient.medicalReports.map((report, index) => (
                  <div key={report._id} className="flex space-x-4">
                    <span className="text-gray-500 font-medium">{index + 1}.</span>
                    <div className="flex-1 space-y-2">
                      <div><strong>Name:</strong> {report.title}</div>
                      <div><strong>Type:</strong> {report.type}</div>
                      <div><strong>Description:</strong> {report.description}</div>
                      <div><strong>Upload Date:</strong> {new Date(report.uploadDate).toLocaleDateString()}</div>
                      {report.fileUrl && (
                        <a
                          href={`${API_BASE_URL}${report.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                          <Download size={16} />
                          <span>Download Report</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                {selectedPatient.medicalReports.length === 0 && (
                  <p className="text-gray-500 italic">No medical reports available</p>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}