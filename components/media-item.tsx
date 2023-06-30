'use client'

import { Song } from '@/types'
import { useLoadImage } from '@/hooks/use-load-image'
import Image from 'next/image'

interface MediaItemProps {
  className?: string
  song: Song
  onClick: (id: string) => void
}

export const MediaItem = (props: MediaItemProps) => {
  const { className, song, onClick } = props
  const imageUrl = useLoadImage(song)

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id)
    }
  }

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
      onClick={handleClick}>
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          className="object-cover"
          fill
          src={imageUrl ?? '/images/liked.png'}
          alt="media item"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{song.title}</p>
        <p className="truncate text-sm text-neutral-400">{song.author}</p>
      </div>
    </div>
  )
}
