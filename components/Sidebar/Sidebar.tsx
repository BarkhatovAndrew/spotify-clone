'use client'

import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Box } from '@/components/Box'

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
        <Box>Sidebar Navigation</Box>
      </div>
    </div>
  )
}
