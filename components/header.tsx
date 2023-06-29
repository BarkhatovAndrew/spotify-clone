'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Button } from '@/components/button'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

interface HeaderProps {
  className?: string
  children: ReactNode
}

export const Header = (props: HeaderProps) => {
  const { children, className } = props
  const router = useRouter()
  const { onOpen } = useAuthModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    router.refresh()

    if (error) {
      return toast.error(error.message)
    }

    return toast.success('Logged out')
  }

  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
            onClick={() => router.back()}>
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
            onClick={() => router.forward()}>
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => {
                  router.push('/account')
                }}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button className="bg-transparent font-medium text-neutral-300" onClick={onOpen}>
                  Sign up
                </Button>
              </div>
              <div>
                <Button className="bg-white px-6 py-2 font-medium text-black" onClick={onOpen}>
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
