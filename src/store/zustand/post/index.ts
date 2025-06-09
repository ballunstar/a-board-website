import Post from '@/common/models/post'
import { create } from 'zustand'

interface PostStore {
  post: Post | null
  setPost: (post: Post) => void
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  post: null,
  setPost: post => set({ post }),
  posts: [],
  setPosts: posts => set({ posts })
}))
