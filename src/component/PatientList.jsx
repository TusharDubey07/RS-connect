import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePatientStore from '../stores/patientStore';
import useLoadingStore from '../stores/loadingStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function PatientList() {
  const navigate = useNavigate();
  const { patients, fetchPatients, setSelectedPatient, setViewAll, togglePatientStatus } = usePatientStore();
  const { setIsLoading } = useLoadingStore();
  const [imageErrors, setImageErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      setIsLoading(true);
      setDataLoaded(false);
      try {
        await fetchPatients();
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        // Only set loading to false when we actually have data
        if (patients && patients.length > 0) {
          setDataLoaded(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      }
    };
    
    loadPatients();

    // Cleanup function
    return () => {
      setIsLoading(true);
      setDataLoaded(false);
    };
  }, [fetchPatients, setIsLoading]);

  // Add another useEffect to handle patients changes
  useEffect(() => {
    if (patients && patients.length > 0 && !dataLoaded) {
      setDataLoaded(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [patients, dataLoaded, setIsLoading]);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    navigate('/patient-details');
  };

  const renderProfileImage = (patient) => {
    if (patient.profilePicture?.url && !imageErrors[patient._id]) {
      return (
        <img 
          src={`${API_BASE_URL}${patient.profilePicture.url}`}
          alt={`${patient.firstName} ${patient.lastName}`}
          className="h-10 w-10 rounded-full object-cover"
          onError={() => setImageErrors(prev => ({ ...prev, [patient._id]: true }))}
        />
      );
    }

    return (
      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
        <span className="text-emerald-600 font-medium">
          {patient.firstName.charAt(0)}
        </span>
      </div>
    );
  };

  const handleViewMore = async () => {
    setIsLoading(true);
    try {
      setViewAll(true);  // Remove pagination
      await fetchPatients();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusToggle = async (e, userId, currentStatus) => {
    e.stopPropagation(); // Prevent row click event
    setIsLoading(true);
    try {
      const result = await togglePatientStatus(userId);
      console.log('Toggle status result:', result); // Debug log
      
      // Optionally show a success message
      // toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error:', error);
      // Optionally show an error message
      // toast.error('Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  // Only render content when data is loaded
  if (!dataLoaded) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white content-loaded">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Patient List</h2>
        <button 
          onClick={handleViewMore}
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          View More →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr 
                key={patient._id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePatientClick(patient)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {renderProfileImage(patient)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {`${patient.firstName} ${patient.lastName}`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.chronicDiseases?.length > 0 
                    ? patient.chronicDiseases.join(', ') 
                    : 'No diagnosis'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={(e) => handleStatusToggle(e, patient._id, patient.isActive)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      patient.isActive
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {patient.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}