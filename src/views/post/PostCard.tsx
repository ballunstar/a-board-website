'use client'

import Post from '@/common/models/post'
import { useRouter } from 'next/navigation'
import { Avatar, Card, CardContent, Chip, Grid, Typography } from '@mui/material'

interface PropsPostCard {
  post: Post
}

const PostCard = ({ post }: PropsPostCard) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/post/${post.id}`)
  }

  return (
    <Card
      key={post.id}
      variant='outlined'
      className='hover:shadow-md transition-shadow cursor-pointer'
      onClick={handleClick}
    >
      <CardContent>
        <Grid container spacing={1}>
          {/* Author */}
          <Grid item xs={12} className='flex items-center gap-2'>
            {/* Optional avatar: <Avatar src={post.author?.avatarUrl || ''} /> */}
            <Typography variant='body2' style={{ color: '#243831' }}>
              {post.author?.email}
            </Typography>
          </Grid>

          {/* Category */}
          <Grid item xs={12}>
            <Chip label={post.category} size='small' sx={{ backgroundColor: '#eee', color: '#243831' }} />
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <Typography variant='subtitle1' fontWeight='bold' style={{ color: '#243831' }}>
              {post.title}
            </Typography>
          </Grid>

          {/* Content Preview */}
          <Grid item xs={12}>
            <Typography variant='body2' className='line-clamp-2 text-[#243831]'>
              {post.content}
            </Typography>
          </Grid>

          {/* Comment Count */}
          <Grid item xs={12}>
            <Typography variant='caption' color='text.secondary'>
              💬 {post.commentCount || 0} Comments
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PostCard
