import { IconType } from 'react-icons'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
  className?: string
  icon: IconType
  label: string
  active: boolean
  href: string
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { className, active, icon: Icon, href, label } = props

  return (
    <Link
      href={href}
      className={twMerge(
        'text-md flex h-auto items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white',
        active && 'text-white',
        className,
      )}
    >
      <Icon size={26} />
      <p className="truncate">{label}</p>
    </Link>
  )
}
