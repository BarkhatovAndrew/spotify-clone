'use client'

import { usePlayer } from '@/hooks/use-player'
import { useGetSongById } from '@/hooks/use-get-song-by-id'
import { useLoadSongUrl } from '@/hooks/use-load-song-url'
import { PlayerContent } from '@/components/player-content'

interface PlayerProps {
  className?: string
}

export const Player = (props: PlayerProps) => {
  const { className } = props
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  )
}
