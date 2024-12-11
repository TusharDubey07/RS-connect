import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDoctorStore from '../stores/doctorStore';
import useLoadingStore from '../stores/loadingStore';
import Loader from './Loader';

export function StaffList() {
  const navigate = useNavigate();
  const { doctors, fetchDoctors, setSelectedDoctor } = useDoctorStore();
  const { isLoading, setIsLoading } = useLoadingStore();

  useEffect(() => {
    const loadDoctors = async () => {
      setIsLoading(true);
      try {
        await fetchDoctors();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, [fetchDoctors, setIsLoading]);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    navigate('/staff-details');
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Staff List</h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
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
                    Price Per Session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Specializations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr 
                    key={doctor.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleDoctorClick(doctor)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-600 font-medium">
                              {doctor.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {doctor.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{doctor.pricePerSession}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doctor.specializations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doctor.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}