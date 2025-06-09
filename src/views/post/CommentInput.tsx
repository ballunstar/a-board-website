'use client'

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Controller, useForm } from 'react-hook-form'
import { createComment } from '@/services/api/function/post'
import { useState } from 'react'

interface CommentInputProps {
  mobileDialogOpen: boolean
  setMobileDialogOpen: (open: boolean) => void
  showInline: boolean
  setShowInline: (show: boolean) => void
  postId: string // Assuming postId is a number, adjust as needed
  onCommentPosted?: () => void // Optional callback when comment is posted
}

type CommentForm = {
  comment: string
}

export default function CommentInput({
  mobileDialogOpen,
  setMobileDialogOpen,
  showInline,
  setShowInline,
  postId,
  onCommentPosted
}: CommentInputProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentForm>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCancel = () => {
    reset()
    setMobileDialogOpen(false)
    setShowInline(false)
  }

  const onSubmit = async (data: CommentForm) => {
    try {
      setIsSubmitting(true)
      await createComment(postId, { content: data.comment })
      reset()
      setMobileDialogOpen(false)
      setShowInline(false)
      onCommentPosted?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* ✅ Mobile Dialog */}
      <Dialog
        open={mobileDialogOpen}
        onClose={handleCancel}
        fullWidth
        sx={{
          display: { xs: 'flex', md: 'none' },
          '& .MuiDialog-container': {
            width: '100% !important',
            margin: 0
          },
          '& .MuiPaper-root': {
            borderRadius: 3,
            width: '100%',
            m: 2
          }
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography fontWeight={700}>Add Comments</Typography>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Controller
              name='comment'
              control={control}
              rules={{ required: 'Comment is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='What’s on your mind...'
                  error={!!errors.comment}
                  helperText={errors.comment?.message}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ flexDirection: 'column', gap: 1, px: 3, pb: 3 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={handleCancel}
              sx={{ color: '#22C55E', borderColor: '#22C55E', fontWeight: 600, textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              disabled={isSubmitting}
              sx={{ backgroundColor: '#22C55E', fontWeight: 600, textTransform: 'none' }}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ✅ Desktop Inline */}
      {showInline && (
        <Box mt={3} display={{ xs: 'none', md: 'block' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='comment'
              control={control}
              rules={{ required: 'Comment is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='What’s on your mind...'
                  error={!!errors.comment}
                  helperText={errors.comment?.message}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              )}
            />

            <Box mt={2} display='flex' justifyContent='flex-end' gap={1}>
              <Button
                variant='outlined'
                onClick={handleCancel}
                sx={{ color: '#22C55E', borderColor: '#22C55E', fontWeight: 600, textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                sx={{ backgroundColor: '#22C55E', fontWeight: 600, textTransform: 'none' }}
              >
                Post
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  )
}
