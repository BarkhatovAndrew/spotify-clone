'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'

interface HeaderProps {
  className?: string
  children: ReactNode
}

export const Header = (props: HeaderProps) => {
  const { children, className } = props
  const router = useRouter()

  const handleLogout = () => {
    //
  }

  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black felx items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black felx items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full bg-white flex items-center justify-center p-2 hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full bg-white flex items-center justify-center p-2 hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
