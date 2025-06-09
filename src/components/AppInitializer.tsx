// components/AppInitializer.tsx
'use client'

import { useEffect } from 'react'
import { useProfileStore } from '@/store/zustand/profile'
import { getProfile } from '@/services/api/function/auth'
import { TOKEN_COOKIE } from '@/common/constants'

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export default function AppInitializer() {
  const { setProfile } = useProfileStore()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie(TOKEN_COOKIE)
      if (!token) {
        return
      }
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
