'use client'

import { useForm } from 'react-hook-form'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/common/utilities/routes'
import { signIn } from '@/services/api/function/auth'
import { SignInAPIRequestBody } from '@/services/api/request/auth/SignInAPIRequest'
import { TOKEN_COOKIE } from '@/common/constants'
import { setCookie } from 'cookies-next'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInAPIRequestBody>()

  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loginError, setLoginError] = useState<string | null>(null)
  const redirectTo = searchParams.get('redirectTo') || ROUTES.POST()

  const onSubmit = async (data: SignInAPIRequestBody) => {
    try {
      const result = await signIn({ email: data.email })
      if (!result.token) throw new Error('No token received')
      const cookieMaxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 days if "Remember Me" checked, otherwise 1 day
      setCookie(TOKEN_COOKIE, result.token, { path: '/', maxAge: cookieMaxAge })
      router.push(redirectTo)
    } catch (err) {
      setLoginError('Failed to sign in. Please check your email and try again.')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Form Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#1D3B2F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant='h5' sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
            Sign in
          </Typography>

          <TextField
            fullWidth
            placeholder='Email'
            type='email'
            variant='outlined'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              input: {
                backgroundColor: '#fff',
                borderRadius: '8px'
              },
              mb: 2
            }}
          />
          {loginError && (
            <Typography variant='body2' sx={{ color: '#f44336', mb: 1 }}>
              {loginError}
            </Typography>
          )}

          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{
              backgroundColor: '#41A862',
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#369254'
              }
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#216348',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 6,
          px: 4,
          borderBottomLeftRadius: { xs: '40px', md: 0 },
          borderBottomRightRadius: { xs: '40px', md: 0 }
        }}
      >
        <img src='/images/logo/signin_image_logo.png' alt='Logo' style={{ width: '160px', marginBottom: '1rem' }} />
        <Typography className='text-white italic text-lg md:text-xl font-serif'>a Board</Typography>
      </Box>
    </Box>
  )
}
