import { Song } from '@/types'
import { usePlayer } from '@/hooks/use-player'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'

export const useOnPlay = (songs: Song[]) => {
  const player = usePlayer()
  const authModal = useAuthModal()
  const { user } = useUser()

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen()
    }

    player.setId(id)
    player.setIds(songs.map((song) => song.id))
  }

  return onPlay
}
