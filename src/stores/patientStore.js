import { create } from 'zustand'
import useLoadingStore from './loadingStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const usePatientStore = create((set, get) => ({
  patients: [],
  selectedPatient: null,
  isViewingAll: false,

  fetchPatients: async () => {
    try {
      const token = localStorage.getItem('token')
      const url = `${API_BASE_URL}/api/admin/users`
      
      const params = new URLSearchParams()
      if (!get().isViewingAll) {
        params.append('page', '1')
        params.append('limit', '10')
      }

      const finalUrl = params.toString() ? `${url}?${params}` : url

      const response = await fetch(finalUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) throw new Error('Failed to fetch patients')
      
      const data = await response.json()
      set({ 
        patients: data.data.users,
      })
    } catch (error) {
      console.error('Error fetching patients:', error)
      throw error
    }
  },

  togglePatientStatus: async (userId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Failed to update patient status')
      
      const result = await response.json()
      console.log('Status update response:', result)

      const updatedPatients = get().patients.map(patient => {
        if (patient._id === userId) {
          return { ...patient, isActive: result.data.user.isActive }
        }
        return patient
      })

      set({ patients: updatedPatients })

      await get().fetchPatients()

      return result.data.user
    } catch (error) {
      console.error('Error updating patient status:', error)
      throw error
    }
  },

  setViewAll: (viewAll) => set({ isViewingAll: viewAll }),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
}))

export default usePatientStore