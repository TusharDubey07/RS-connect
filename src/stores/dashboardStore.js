import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDashboardStore = create((set) => ({
  stats: {
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  },

  fetchDashboardStats: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch dashboard stats');

      const data = await response.json();
      set({
        stats: {
          totalUsers: data.totalUsers,
          totalDoctors: data.totalDoctors,
          totalAppointments: data.totalAppointments,
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
}));

export default useDashboardStore;