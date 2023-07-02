'use client'

import { Song } from '@/types'
import { SongItem } from '@/components/song-item'
import { useOnPlay } from '@/hooks/use-on-play'

interface PageContentProps {
  className?: string
  songs: Song[]
}

export const PageContent = (props: PageContentProps) => {
  const { className, songs } = props
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>
  }

  return (
    <div
      className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5
    xl:grid-cols-6 2xl:grid-cols-8">
      {songs.map((song) => (
        <SongItem song={song} key={song.id} onClick={(id: string) => onPlay(id)} />
      ))}
    </div>
  )
}
