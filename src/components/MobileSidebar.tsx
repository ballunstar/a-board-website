'use client'

import { useProfileStore } from '@/store/zustand/profile'
import { MENU_ITEMS } from '@/common/utilities/routes'
import { UserRoleEnum } from '@/common/models/user'
import { Home, Edit, Close } from '@mui/icons-material'
import { Typography, IconButton } from '@mui/material'
import { JSX } from 'react'

export default function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const { profile } = useProfileStore()
  const userRole = profile?.role
  const menuItems = MENU_ITEMS()

  const ICON_MAP: { [key: string]: JSX.Element } = {
    'tabler-home': <Home fontSize='small' style={{ color: '#243831' }} />,
    'tabler-edit': <Edit fontSize='small' style={{ color: '#243831' }} />
  }

  // for (const section in menuItems) {
  //   menuItems[section] = menuItems[section].filter(
  //     item =>
  //       item.visible &&
  //       (userRole === UserRoleEnum.ADMIN || !item.permissions || (userRole && item.permissions.includes(userRole)))
  //   )
  //   if (menuItems[section].length === 0) {
  //     delete menuItems[section]
  //   }
  // }

  return (
    <div className='fixed inset-0 z-[9999] bg-[#BBC2C0] md:hidden p-6'>
      {/* Close Button */}
      <div className='flex justify-end mb-6'>
        <IconButton onClick={onClose} className='text-[#243831]'>
          <Close />
        </IconButton>
      </div>

      {/* Menu */}
      {/* <Typography variant='h6' className='mb-10 font-serif tracking-wide text-[#243831]'>
        a Board
      </Typography> */}

      <nav className='space-y-6 text-sm font-medium'>
        {Object.entries(menuItems).map(([section, items]) =>
          items.map(item => (
            <a
              href={item.href}
              key={item.label}
              className='flex items-center gap-2 cursor-pointer hover:opacity-80 text-[#243831]'
              onClick={onClose}
            >
              {ICON_MAP[item.icon] || <span className='w-4 h-4 inline-block' />}
              <span>{item.label}</span>
            </a>
          ))
        )}
      </nav>
    </div>
  )
}
