'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { getPosts } from '@/services/api/function/post'
import { usePostStore } from '@/store/zustand/post'
import { navigateToUrl } from '@/common/utilities/navigation'
import { ROUTES } from '@/common/utilities/routes'
import { debounce } from 'lodash'

const categories = ['All', 'History', 'Food', 'Pets', 'Health', 'Fashion', 'Exercise', 'Others']

const PostList = () => {
  const { posts, setPosts } = usePostStore()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFetching, setIsFetching] = useState(false)

  const pageSize = 10
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchPosts = async (newPage = 1, reset = false) => {
    const filters = selectedCategory !== 'All' ? [`category|=|${selectedCategory}`] : []
    const trimmedSearch = search.trim()
    const searchValue = trimmedSearch ? `*${trimmedSearch}*` : '**'

    const response = await getPosts({
      page: newPage,
      pageSize,
      sort: '',
      _search: searchValue,
      filter: filters.join(',')
    })

    setTotalPages(response.pagination.pageCount)
    setPage(newPage)
    if (reset) {
      setPosts(response.data)
    } else {
      setPosts([...posts, ...response.data])
    }
    setIsFetching(false)
  }

  // debounce search or category change
  useEffect(() => {
    const delayed = debounce(() => {
      fetchPosts(1, true)
    }, 300)

    delayed()
    return () => delayed.cancel()
  }, [search, selectedCategory])

  // detect scroll bottom
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container || isFetching || page >= totalPages) return

    const scrollY = container.scrollTop + container.clientHeight
    const threshold = container.scrollHeight - 100

    if (scrollY >= threshold) {
      setIsFetching(true)
      fetchPosts(page + 1)
    }
  }, [isFetching, page, totalPages, search, selectedCategory])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className='space-y-6 h-screen overflow-hidden flex flex-col p-4'>
      {/* Top Toolbar */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 pt-4'>
        <TextField
          fullWidth
          size='medium'
          placeholder='Search'
          value={search}
          onChange={e => setSearch(e.target.value)}
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: '#555' }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: '#C5C9C7',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#DCEBE8'
              },
              '&:hover fieldset': {
                borderColor: '#A6D0C1'
              }
            }
          }}
          className='max-w-md'
        />

        <div className='flex gap-2 items-center'>
          <Select
            size='medium'
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            variant='standard'
            sx={{
              px: 1,
              borderRadius: '8px',
              fontWeight: 500,
              minWidth: '120px',
              color: '#222',
              '&::before, &::after': {
                display: 'none'
              }
            }}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>

          <Button
            onClick={() => navigateToUrl(ROUTES.POST_CREATE())}
            variant='contained'
            size='medium'
            sx={{
              borderRadius: '8px',
              backgroundColor: '#41A862',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#369254'
              }
            }}
          >
            Create +
          </Button>
        </div>
      </div>

      {/* Scrollable List */}
      <Card className='shadow-sm p-0' sx={{ borderRadius: '12px' }}>
        <CardContent className='p-0'>
          <div
            ref={scrollRef}
            className='flex-1 overflow-y-auto px-4 pb-8'
            style={{ maxHeight: 'calc(100vh - 110px)' }}
          >
            {posts.map((post, index) => (
              <div
                key={post.id}
                className='cursor-pointer transition-colors'
                onClick={() => navigateToUrl(ROUTES.POST_DETAIL(post.id))}
              >
                <div className='p-4 space-y-2 gap-2 flex flex-col'>
                  <div className='flex items-center gap-3 mb-1'>
                    <Avatar
                      src={post.author?.avatarUrl || '/images/default-avatar.png'}
                      alt={post.author?.email}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant='body2' className='text-[#243831] font-medium'>
                      {post.author?.fullName || post.author?.email}
                    </Typography>
                  </div>
                  <Chip
                    label={post.category}
                    size='small'
                    className='mb-1 w-fit'
                    sx={{ backgroundColor: '#eee', color: '#243831' }}
                  />
                  <Typography variant='subtitle1' fontWeight='bold' className='text-[#243831]'>
                    {post.title}
                  </Typography>
                  <Typography variant='body2' className='text-[#243831] mt-1'>
                    {post.content}
                  </Typography>
                  <Typography variant='caption' color='text.secondary' className='mt-2 block'>
                    💬 {post.commentCount || 0} Comments
                  </Typography>
                </div>
                {index !== posts.length - 1 && <Divider className='mt-4' />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PostList
