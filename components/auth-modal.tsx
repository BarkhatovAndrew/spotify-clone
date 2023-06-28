'use client'

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'

import { Modal } from '@/components/modal'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useCallback, useEffect } from 'react'

interface AuthModalProps {
  className?: string
}

export const AuthModal = (props: AuthModalProps) => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const session = useSessionContext()
  const { isOpen, onClose } = useAuthModal()

  const onChange = useCallback(
    (open: boolean) => {
      if (isOpen) {
        onClose()
      }
    },
    [isOpen, onClose],
  )

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [onClose, router, session])

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}>
      <Auth
        supabaseClient={supabaseClient}
        theme="dark"
        magicLink
        providers={['github', 'google']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  )
}
