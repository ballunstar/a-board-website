'use client'

import AppInitializer from './AppInitializer'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden bg-[#BBC2C0]'>
      <AppInitializer />
      <Topbar />
      <div className='flex flex-1 overflow-x-hidden'>
        <Sidebar />
        <main className='flex-1 w-full overflow-x-hidden'>{children}</main>
      </div>
    </div>
  )
}
