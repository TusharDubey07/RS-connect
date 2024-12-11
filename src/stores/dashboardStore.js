import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDashboardStore = create((set, get) => ({
  stats: {
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    inactiveUsers: 0,
    inactiveStaff: 0,
  },
  appointmentAnalytics: [],
  isLoading: false,
  error: null,

  processAppointmentsData: (appointments) => {
    const appointmentsByYear = {};
    
    appointments?.forEach(appointment => {
      const year = new Date(appointment.scheduledTime.date).getFullYear();
      if (!appointmentsByYear[year]) {
        appointmentsByYear[year] = 0;
      }
      appointmentsByYear[year]++;
    });

    return Object.entries(appointmentsByYear).map(([year, value]) => ({
      year: year.toString(),
      value: value
    })).sort((a, b) => a.year - b.year);
  },

  fetchDashboardStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch dashboard stats');

      const data = await response.json();
    
      const inactiveUsers = data?.users ? 
        data.users.filter(user => !user.isActive).length : 
        0;
      const inactiveStaff = data?.doctors?.reduce((count, doctor) => {
        const doctorUser = data.users.find(user => user._id === doctor.userId);
        if (doctorUser && !doctorUser.isActive) {
          return count + 1;
        }
        return count;
      }, 0) || 0;

      const appointmentAnalytics = get().processAppointmentsData(data.appointments);

      set({
        stats: {
          totalUsers: data?.totalUsers || 0,
          totalDoctors: data?.totalDoctors || 0,
          totalAppointments: data?.totalAppointments || 0,
          inactiveUsers: inactiveUsers,
          inactiveStaff: inactiveStaff,
        },
        appointmentAnalytics,
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      set({
        stats: {
          totalUsers: 0,
          totalDoctors: 0,
          totalAppointments: 0,
          inactiveUsers: 0,
          inactiveStaff: 0,
        },
        appointmentAnalytics: [],
        isLoading: false,
        error: error.message
      });
      throw error;
    }
  },
}));

export default useDashboardStore;