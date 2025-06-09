import User from '@/common/models/user'
import { create } from 'zustand'

interface ProfileStore {
  profile: User | null
  setProfile: (profile: User | null) => void
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  setProfile: (profile: User) => set({ profile })
}))
