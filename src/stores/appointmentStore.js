import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAppointmentStore = create((set) => ({
  appointments: [],
  selectedDate: null,
  filteredAppointments: [],

  fetchAppointments: async (doctorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/appointments?doctorId=${doctorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch appointments');

      const data = await response.json();
      const formattedAppointments = data.data.appointments.map(apt => ({
        id: apt._id,
        patientName: apt.patient ? `${apt.patient.firstName} ${apt.patient.lastName}` : 'N/A',
        date: new Date(apt.scheduledTime.date),
        startTime: apt.scheduledTime.startTime,
        endTime: apt.scheduledTime.endTime,
        status: apt.status,
        type: apt.type
      }));

      set({ appointments: formattedAppointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  setSelectedDate: (date) => {
    set(state => {
      const filtered = state.appointments.filter(apt => 
        apt.date.toDateString() === date.toDateString()
      );
      return { 
        selectedDate: date,
        filteredAppointments: filtered
      };
    });
  },
}));

export default useAppointmentStore;