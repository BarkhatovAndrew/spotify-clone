'use client'

import { ReactNode } from 'react'
import { MyUserContextProvider } from '@/hooks/use-user'

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = (props: UserProviderProps) => {
  const { children } = props

  return <MyUserContextProvider>{children}</MyUserContextProvider>
}
