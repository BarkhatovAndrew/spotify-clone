'use client'
import { ReactNode, useState } from 'react'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
  children: ReactNode
}

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const { children } = props
  const [supabaseClient] = useState(() => createClientComponentClient<Database>())

  return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
}
