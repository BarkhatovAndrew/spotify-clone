import './globals.css'
import { Figtree } from 'next/font/google'
import { Sidebar } from '@/components/sidebar'
import { SupabaseProvider } from '@/providers/supabase-provider'
import { UserProvider } from '@/providers/user-provider'
import { ModalProvider } from '@/providers/modal-provider'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
