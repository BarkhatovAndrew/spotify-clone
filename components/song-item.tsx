'use client'

import { Song } from '@/types'
import { useLoadImage } from '@/hooks/use-load-image'
import Image from 'next/image'
import { PlayButton } from '@/components/play-button'

interface SongFileProps {
  className?: string
  song: Song
  onClick: (id: string) => void
}

export const SongItem = (props: SongFileProps) => {
  const { song, onClick } = props
  const imagePath = useLoadImage(song)

  return (
    <div
      onClick={() => onClick(song.id)}
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden
      rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image src={imagePath ?? '/images/liked.png'} alt="image" fill className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{song.title}</p>
        <p className="w-full truncate pb-4 text-sm text-neutral-400">{song.author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  )
}
