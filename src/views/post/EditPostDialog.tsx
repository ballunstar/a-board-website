'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, Controller } from 'react-hook-form'
import Post from '@/common/models/post'
import { useEffect } from 'react'

const categories = ['History', 'Food', 'Pets', 'Health', 'Fashion', 'Exercise', 'Others']

interface EditPostDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { title: string; content: string; category: string }) => void
  post?: Post | null
}

export default function EditPostDialog({ open, onClose, onSubmit, post }: EditPostDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Post>({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      category: post?.category || (categories[0] as Post['category'])
    }
  })

  useEffect(() => {
    reset({
      title: post?.title || '',
      content: post?.content || '',
      category: post?.category || (categories[0] as Post['category'])
    })
  }, [post, reset])

  const handleClose = () => {
    reset({
      title: post?.title || '',
      content: post?.content || '',
      category: post?.category || (categories[0] as Post['category'])
    })
    onClose()
  }

  const handleFormSubmit = (data: any) => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          {post ? 'Edit Post' : 'Create Post'}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Category */}
          <Controller
            name='category'
            control={control}
            rules={{ required: 'กรุณาเลือกหมวดหมู่' }}
            render={({ field }) => (
              <Select {...field} fullWidth sx={{ borderRadius: 2 }}>
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {/* Title */}
          <Controller
            name='title'
            control={control}
            rules={{ required: 'กรุณากรอกชื่อโพสต์' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='ชื่อโพสต์'
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          {/* Content */}
          <Controller
            name='content'
            control={control}
            rules={{ required: 'กรุณากรอกรายละเอียดโพสต์' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={4}
                label='เนื้อหาโพสต์'
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{ borderRadius: 2, color: '#49A569', borderColor: '#49A569' }}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ backgroundColor: '#22C55E', borderRadius: 2 }}>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
