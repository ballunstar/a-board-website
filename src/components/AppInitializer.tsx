// components/AppInitializer.tsx
'use client'

import { useEffect } from 'react'
import { useProfileStore } from '@/store/zustand/profile'
import { getProfile } from '@/services/api/function/auth'

export default function AppInitializer() {
  const { setProfile } = useProfileStore()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setProfile(res)
      } catch (err) {
        setProfile(null)
      }
    }

    fetchProfile()
  }, [])

  return null
}
