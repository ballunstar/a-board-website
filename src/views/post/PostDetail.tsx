'use client'

import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
  Grid,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter, useParams } from 'next/navigation'
import { getPostDetail } from '@/services/api/function/post'
import { addHours, formatDistanceToNow, subHours } from 'date-fns'
import Comment from '@/common/models/comment'
import { useProfileStore } from '@/store/zustand/profile'
import { navigateToUrl } from '@/common/utilities/navigation'
import { ROUTES } from '@/common/utilities/routes'
import CommentInput from './CommentInput'
import { th } from 'date-fns/locale'

export default function PostDetailPage() {
  const { profile } = useProfileStore()
  const router = useRouter()
  const params = useParams()
  const postId = Array.isArray(params?.postId) ? params.postId[0] : params?.postId
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const theme = useTheme()
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false)
  const [showInlineComment, setShowInlineComment] = useState(false)

  const handleAddCommentClick = () => {
    if (!profile) {
      router.push(ROUTES.LOGIN() + `?redirectTo=${encodeURIComponent(window.location.pathname)}`)
    }

    setMobileDialogOpen(true)
    setShowInlineComment(true)
  }

  useEffect(() => {
    if (postId) {
      fetchPost()
    }
  }, [postId])

  const fetchPost = async () => {
    const data = await getPostDetail(postId)
    setPost(data ?? null)
    setComments(data?.comments ?? [])
  }

  const handleEdit = (comment: Comment) => {
    // You can toggle an "edit mode" and prefill comment input
    console.log('Editing comment:', comment)
  }

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return
    // Call your API to delete comment
    // await deleteComment(postId, commentId)
    await fetchPost() // Refresh comments after deletion
  }

  if (!post) return <Box p={8}>Loading...</Box>

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 8 },
        backgroundColor: '#fff',
        color: '#243831',
        minHeight: '100vh' // ✅ allows it to grow beyond screen
      }}
    >
      {/* Back Button */}
      <Box mb={4}>
        <IconButton onClick={() => router.back()} sx={{ color: '#1D3B2F' }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Author Info */}
      <Box display='flex' alignItems='center' mb={2}>
        <Avatar src={post.author?.avatarUrl || '/images/default-avatar.png'} sx={{ width: 48, height: 48 }} />
        <Box ml={2}>
          <Typography variant='subtitle2'>{post.author?.fullName || post.author?.email}</Typography>
          <Typography variant='caption' color='text.secondary'>
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>

      {/* Category */}
      <Box mb={2}>
        <Chip label={post.category} size='small' sx={{ backgroundColor: '#eee', color: '#243831' }} />
      </Box>

      {/* Post Title and Content */}
      <Typography variant='h5' fontWeight='bold' mb={2}>
        {post.title}
      </Typography>
      <Typography variant='body1' mb={4}>
        {post.content}
      </Typography>

      {/* Comment Summary */}
      <Typography variant='body2' color='text.secondary' mb={1}>
        💬 {post.commentCount || comments.length} Comments
      </Typography>
      <CommentInput
        mobileDialogOpen={mobileDialogOpen}
        setMobileDialogOpen={setMobileDialogOpen}
        showInline={showInlineComment}
        setShowInline={setShowInlineComment}
        postId={postId}
        onCommentPosted={fetchPost} // Refresh comments after posting
      />
      {/* Add Comment Button */}
      {!showInlineComment && !mobileDialogOpen && (
        <Box mb={4}>
          <Button
            variant='outlined'
            onClick={handleAddCommentClick}
            sx={{
              borderColor: '#22C55E',
              color: '#22C55E',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f0fdf4', // subtle greenish bg
                borderColor: '#16A34A',
                color: '#16A34A'
              }
            }}
          >
            Add Comments
          </Button>
        </Box>
      )}

      {/* Comments List */}
      <Grid container direction='column' spacing={4}>
        {comments.map((comment, index) => (
          <Grid item key={index}>
            <Grid container spacing={2}>
              {/* Avatar and Author Info in same row */}
              <Grid item xs={12}>
                <Box display='flex' alignItems='center' gap={1} mb={1}>
                  <Avatar
                    src={comment.author?.avatarUrl || '/images/default-avatar.png'}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box display='flex' alignItems='center' gap={1}>
                    <Typography variant='subtitle2' fontWeight={500}>
                      {comment.author?.fullName}
                    </Typography>

                    {/* ✅ Show Edit/Delete only if user is the author */}
                    {/* {comment.author?.id === profile?.id && (
                      <>
                        <Button
                          size='small'
                          variant='text'
                          onClick={() => handleEdit(comment)}
                          sx={{ fontSize: '0.75rem', textTransform: 'none', minWidth: 'auto' }}
                        >
                          Edit
                        </Button>
                        <Button
                          size='small'
                          variant='text'
                          color='error'
                          onClick={() => handleDelete(comment.id)}
                          sx={{ fontSize: '0.75rem', textTransform: 'none', minWidth: 'auto' }}
                        >
                          Delete
                        </Button>
                      </>
                    )} */}
                  </Box>

                  <Typography variant='caption' color='text.secondary'>
                    ·{' '}
                    {formatDistanceToNow(addHours(new Date(comment.createdAt), 7), {
                      addSuffix: true
                    })}
                  </Typography>
                </Box>
              </Grid>

              {/* Comment content */}
              <Grid item xs={12}>
                <Typography variant='body2'>{comment.content}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
