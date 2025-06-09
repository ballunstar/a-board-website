'use client'

import { useProfileStore } from '@/store/zustand/profile'
import { MENU_ITEMS } from '@/common/utilities/routes'
import { UserRoleEnum } from '@/common/models/user'
import { Home, Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { JSX } from 'react'

export default function Sidebar() {
  const { profile } = useProfileStore()
  const userRole = profile?.role

  const menuItems = MENU_ITEMS()

  const ICON_MAP: { [key: string]: JSX.Element } = {
    'tabler-home': <Home fontSize='small' style={{ color: '#243831' }} />,
    'tabler-edit': <Edit fontSize='small' style={{ color: '#243831' }} />
  }

  // Filter menu items based on role
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
    <aside className='hidden md:flex flex-col w-[240px] p-6' style={{ backgroundColor: '#BBC2C0' }}>
      <nav className='space-y-6 text-sm font-medium'>
        {Object.entries(menuItems).map(([section, items]) =>
          items.map(item => (
            <a
              href={item.href}
              key={item.label}
              className='flex items-center gap-2 cursor-pointer hover:opacity-80'
              style={{ color: '#243831' }}
            >
              {ICON_MAP[item.icon] || <span className='w-4 h-4 inline-block' />}
              <span>{item.label}</span>
            </a>
          ))
        )}
      </nav>
    </aside>
  )
}
