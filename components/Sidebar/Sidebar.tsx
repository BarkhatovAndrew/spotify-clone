'use client'

import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Box } from '@/components/Box'
import { SidebarItem } from '@/components/SidebarItem'
import { Library } from '@/components/Library'

interface SidebarProps {
  children: ReactNode
}

export const Sidebar = (props: SidebarProps) => {
  const { children } = props
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        label: 'Home',
        href: '/',
        active: pathname !== '/search',
        icon: HiHome,
      },
      {
        label: 'Search',
        href: '/search',
        active: pathname === '/search',
        icon: BiSearch,
      },
    ],
    [pathname],
  )

  return (
    <div className="flex h-full">
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}
