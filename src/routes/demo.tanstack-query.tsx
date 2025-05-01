import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
  address: {
    street: string
    city: string
  }
}

export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryDemo,
})

function TanStackQueryDemo() {
  const [refreshCount, setRefreshCount] = useState(0)
  
  const { data, isLoading, error, refetch } = useQuery<Array<User>>({
    queryKey: ['users', refreshCount],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      return response.json()
    },
  })

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1)
    refetch()
  }

  if (isLoading) return <div className="p-4">Loading users...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Users List</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">Refreshed: {refreshCount} times</span>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {data?.map((user) => (
          <div key={user.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.company.name}</p>
            <p className="text-sm mt-2">
              {user.address.street}, {user.address.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
