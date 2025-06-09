'use client'

import { Menu } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useState } from 'react'
import MobileSidebar from './MobileSidebar'
import { useProfileStore } from '@/store/zustand/profile'
import { deleteCookie } from 'cookies-next'
import { TOKEN_COOKIE } from '@/common/constants'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/common/utilities/routes'

export default function Topbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile, setProfile } = useProfileStore()
  const router = useRouter()

  const handleSignOut = () => {
    deleteCookie(TOKEN_COOKIE)
    setProfile(null)
    router.push(ROUTES.LOGIN())
  }

  const handleSignIn = () => {
    router.push(ROUTES.LOGIN())
  }

  return (
    <>
      <header className='w-full sticky top-0 z-50 bg-[#1D3B2F] text-white shadow'>
        <div className='mx-auto flex  items-center justify-between  py-3 px-4'>
          <div className='text-lg font-semibold font-serif tracking-wide'>a Board</div>

          <div className='flex items-center'>
            {/* Hamburger (mobile only) */}
            <div className='md:hidden'>
              <IconButton className='text-white' size='small' onClick={() => setSidebarOpen(true)}>
                <Menu />
              </IconButton>
            </div>

            {/* Sign In / Sign Out (desktop only) */}
            <div className='hidden md:block'>
              {profile ? (
                <Button
                  variant='outlined'
                  color='inherit'
                  size='small'
                  onClick={handleSignOut}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    whiteSpace: 'nowrap',
                    padding: '4px 12px',
                    minWidth: 0, // prevent forcing extra width
                    '&:hover': {
                      backgroundColor: '#2c4e3f'
                    }
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button variant='contained' color='success' size='small' onClick={handleSignIn}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
