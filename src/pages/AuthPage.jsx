import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function AuthPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
    clearError()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await login(formData.email, formData.password)
    if (success) {
      // console.log('LocalStorage token:', localStorage.getItem('token'))
      // console.log('Zustand store:', useAuthStore.getState())
      navigate('/')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-500">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="superadmin@hospital.com"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BE87]"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BE87]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#2B3D52] text-white rounded-md disabled:opacity-50 hover:bg-opacity-90 transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          This is a secure system and unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}