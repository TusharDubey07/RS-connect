import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AuthPage({ setIsAuthenticated }) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('signin')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsAuthenticated(true)
      navigate('/') 
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen shadow-xl bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500">
            Enter your email to sign in to your account
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="grid w-full grid-cols-2 mb-6">
            <button
              onClick={() => setActiveTab('signin')}
              className={`p-2 text-center ${
                activeTab === 'signin'
                  ? 'border-b-2 border-[#54BE87] text-[#54BE87]'
                  : 'text-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`p-2 text-center ${
                activeTab === 'signup'
                  ? 'border-b-2 border-[#54BE87] text-[#54BE87]'
                  : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[#2B3D52] text-white rounded-md disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[#2B3D52] text-white rounded-md  disabled:opacity-50"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline hover:text-blue-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-blue-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}