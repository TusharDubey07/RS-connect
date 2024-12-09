import useAuthStore from '../stores/authStore'

export function AuthDebug() {
  const { token, isAuthenticated } = useAuthStore()
  
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg">
      <pre>
        {JSON.stringify(
          {
            zustandToken: token,
            localStorageToken: localStorage.getItem('token'),
            isAuthenticated,
          },
          null,
          2
        )}
      </pre>
    </div>
  )
}