'use client'

import { Song } from '@/types'
import { MediaItem } from '@/components/media-item'

interface SearchContentProps {
  className?: string
  songs: Song[]
}

export const SearchContent = (props: SearchContentProps) => {
  const { className, songs } = props

  if (songs.length === 0) {
    return <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">No songs found</div>
  }

  return (
    <div className="flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div className="flex w-full items-center gap-x-4" key={song.id}>
          <div className="flex-1">
            <MediaItem song={song} onClick={() => {}} />
          </div>
        </div>
      ))}
    </div>
  )
}
