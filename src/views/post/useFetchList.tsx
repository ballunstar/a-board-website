// fetchlist.ts - utility hook for infinite scroll fetching

import { useEffect, useState, useRef, useCallback } from 'react'

interface FetchListOptions<T> {
  fetcher: (params: { page: number }) => Promise<{ data: T[]; pageCount: number }>
  pageSize?: number
  dependencies?: any[]
}

export function useFetchList<T>({ fetcher, pageSize = 10, dependencies = [] }: FetchListOptions<T>) {
  const [list, setList] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const loadData = useCallback(
    async (reset = false) => {
      if (loading) return
      setLoading(true)

      const pageToFetch = reset ? 1 : page
      const response = await fetcher({ page: pageToFetch })

      if (reset) {
        setList(response.data)
        setPage(1)
      } else {
        setList(prev => [...prev, ...response.data])
        setPage(prev => prev + 1)
      }

      setTotalPages(response.pageCount)
      setLoading(false)
    },
    [fetcher, page, loading]
  )

  // Auto-load more when in view
  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        loadData()
      }
    })

    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current)

    return () => observer.current?.disconnect()
  }, [loadData, totalPages, page])

  // Reset on dependencies
  useEffect(() => {
    loadData(true)
  }, dependencies)

  return { list, loadMoreRef, loading, refresh: () => loadData(true) }
}
