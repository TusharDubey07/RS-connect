import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
          })

          if (!response.ok) {
            throw new Error('Invalid credentials')
          }

          const data = await response.json()
          localStorage.setItem('token', data.token)
          set({ 
            token: data.token,
            isAuthenticated: true,
            isLoading: false 
          })
          
          return true
        } catch (error) {
          set({ 
            error: 'Invalid email or password',
            isLoading: false,
            isAuthenticated: false,
            token: null
          })
          return false
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ 
          token: null,
          isAuthenticated: false,
          error: null
        })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)

export default useAuthStore