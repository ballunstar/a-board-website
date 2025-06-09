'use client'

import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Chip, Typography, Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter, useParams } from 'next/navigation'
import { getPostDetail } from '@/services/api/function/post'
import { formatDistanceToNow } from 'date-fns'
import Comment from '@/common/models/comment'

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const postId = Array.isArray(params?.postId) ? params.postId[0] : params?.postId
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<Comment[]>([])

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

  if (!post) return <Box p={8}>Loading...</Box>

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 8 },
        backgroundColor: '#fff',
        color: '#243831',
        maxWidth: 'md',
        mx: 'auto'
      }}
    >
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ color: '#1D3B2F' }}>
            Back
          </Button>
        </Grid>

        <Grid item>
          <Grid container alignItems='center' spacing={2}>
            <Grid item>
              <Avatar src={post.author?.avatarUrl || '/images/default-avatar.png'} />
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>{post.author?.fullName || post.author?.email}</Typography>
              <Typography variant='caption' color='text.secondary'>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Chip label={post.category} sx={{ backgroundColor: '#eee', color: '#243831' }} />
        </Grid>

        <Grid item>
          <Typography variant='h5' fontWeight='bold' mb={2}>
            {post.title}
          </Typography>
          <Typography variant='body1'>{post.content}</Typography>
        </Grid>

        <Grid item>
          <Typography variant='caption' color='text.secondary'>
            💬 {post.commentCount || 0} Comments
          </Typography>
        </Grid>

        <Grid item>
          <Button variant='outlined' color='success'>
            Add Comments
          </Button>
        </Grid>

        <Grid item>
          <Grid container direction='column' spacing={4}>
            {comments.map((comment, index) => (
              <Grid item key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Avatar src={comment.author?.avatarUrl || '/images/default-avatar.png'} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant='subtitle2'>{comment.author?.fullName}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </Typography>
                    <Typography variant='body2' mt={1}>
                      {comment.content}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
