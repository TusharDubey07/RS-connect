import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDoctorStore = create((set) => ({
  doctors: [],
  selectedDoctor: null,
  doctorDetails: null,

  fetchDoctors: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/doctors`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch doctors');

      const data = await response.json();
      const formattedDoctors = data.data.doctors.map(doctor => {
        // Store the full doctor data for later use
        const fullData = {
          id: doctor._id,
          name: `${doctor.title}. ${doctor.userId.firstName} ${doctor.userId.lastName}`,
          qualifications: doctor.qualifications.map(qual => ({
            degree: qual.degree,
            institution: qual.institution,
            year: qual.year
          })),
          clinics: doctor.clinics.map(clinic => ({
            name: clinic.name,
            address: `${clinic.address.street}, ${clinic.address.city}, ${clinic.address.state}, ${clinic.address.pincode}`,
            contact: clinic.contact,
            consultationFee: clinic.consultationFee.amount
          }))
        };

        // Set the full data when selecting a doctor
        return {
          id: doctor._id,
          name: `${doctor.title}. ${doctor.userId.firstName} ${doctor.userId.lastName}`,
          pricePerSession: doctor.onlineConsultation.pricePerSession,
          specializations: doctor.specializations.join(', '),
          isActive: true,
          fullData // Store the full data with each doctor
        };
      });

      set({ doctors: formattedDoctors });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  setSelectedDoctor: (doctor) => {
    set({ 
      selectedDoctor: doctor,
      doctorDetails: doctor.fullData 
    });
  },
}));

export default useDoctorStore;