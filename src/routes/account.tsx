import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import liff from '@line/liff'

interface Profile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export const Route = createFileRoute('/account')({
  component: Account,
})

function Account() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await liff.getProfile()
        setProfile(profile)
      } catch (err) {
        setError('Failed to fetch profile')
        console.error(err)
      }
    }

    fetchProfile()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          {profile.pictureUrl && (
            <img
              src={profile.pictureUrl}
              alt={profile.displayName}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <h1 className="text-2xl font-bold">{profile.displayName}</h1>
          {profile.statusMessage && (
            <p className="text-gray-600">{profile.statusMessage}</p>
          )}
          <div className="text-sm text-gray-500">
            User ID: {profile.userId}
          </div>
        </div>
      </div>
    </div>
  )
} 