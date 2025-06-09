'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import { createPost, deletePost, getOurPosts, getPosts, updatePost } from '@/services/api/function/post'
import { usePostStore } from '@/store/zustand/post'
import { navigateToUrl } from '@/common/utilities/navigation'
import { ROUTES } from '@/common/utilities/routes'
import { debounce } from 'lodash'
import EditPostDialog from './EditPostDialog'
import Post from '@/common/models/post'

const categories = ['All', 'History', 'Food', 'Pets', 'Health', 'Fashion', 'Exercise', 'Others']

const OurPostList = () => {
  const { posts, setPosts } = usePostStore()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const pageSize = 10
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchPosts = async (newPage = 1, reset = false) => {
    const filters = selectedCategory !== 'All' ? [`category|=|${selectedCategory}`] : []
    const trimmedSearch = search.trim()
    const searchValue = trimmedSearch ? `*${trimmedSearch}*` : '**'

    const response = await getOurPosts({
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

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deletePost(deleteTarget) // <- call your API
    setDeleteTarget(null)
    await fetchPosts(1, true) // refresh list
  }

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
            onClick={() => setDialogOpen(true)}
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
              <div key={post.id} className='transition-colors'>
                <Box
                  className='p-4 bg-white rounded-xl'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  {/* Top Row: Avatar, Name, Actions */}
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                    {/* Left: Avatar + Name */}
                    <Box display='flex' alignItems='center' gap={1}>
                      <Avatar
                        src={post.author?.avatarUrl || '/images/default-avatar.png'}
                        alt={post.author?.email}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant='body2' sx={{ fontWeight: 500, color: '#888' }}>
                        {post.author?.fullName || post.author?.email}
                      </Typography>
                    </Box>

                    {/* Action icons */}
                    <Box display='flex' gap={1}>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setEditingPost(post)
                          setDialogOpen(true)
                        }}
                      >
                        <EditIcon sx={{ fontSize: 18, color: '#1D3B2F' }} />
                      </IconButton>
                      <IconButton size='small' onClick={() => setDeleteTarget(post.id)}>
                        <DeleteIcon sx={{ fontSize: 18, color: '#1D3B2F' }} />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Category */}
                  <Chip
                    label={post.category}
                    size='small'
                    sx={{ backgroundColor: '#eee', color: '#243831', width: 'fit-content' }}
                  />

                  {/* Title */}
                  <Typography variant='subtitle1' fontWeight='bold' className='text-[#243831]'>
                    {post.title}
                  </Typography>

                  {/* Content */}
                  <Typography
                    variant='body2'
                    className='text-[#243831]'
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {post.content}
                  </Typography>

                  {/* Comment Count */}
                  <Typography variant='caption' color='text.secondary'>
                    💬 {post.commentCount || 0} Comment{post.commentCount === 1 ? '' : 's'}
                  </Typography>
                </Box>

                {index !== posts.length - 1 && <Divider className='my-4' />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle sx={{ fontWeight: 600, textAlign: 'center' }}>
          Please confirm if you wish to delete the post
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          Are you sure you want to delete the post?
          <br />
          <Typography color='text.secondary' fontSize={14}>
            Once deleted, it cannot be recovered.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 1, px: 3, pb: 3 }}>
          <Button fullWidth variant='contained' color='error' onClick={handleDelete} sx={{ fontWeight: 600 }}>
            Delete
          </Button>
          <Button fullWidth variant='outlined' onClick={() => setDeleteTarget(null)} sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <EditPostDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        post={editingPost} // pass `undefined` to create
        onSubmit={async data => {
          if (editingPost) {
            await updatePost(editingPost.id, data)
          } else {
            await createPost(data)
          }
          setDialogOpen(false)
          await fetchPosts()
        }}
      />
    </div>
  )
}

export default OurPostList
