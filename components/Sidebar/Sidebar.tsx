'use client'

import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Box } from '@/components/Box'
import { SidebarItem } from '@/components/SidebarItem'

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
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">Song Library</Box>
      </div>
    </div>
  )
}
