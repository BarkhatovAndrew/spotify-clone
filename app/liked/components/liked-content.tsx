'use client'

import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/use-user'
import { useEffect } from 'react'
import { MediaItem } from '@/components/media-item'
import { LikeButton } from '@/components/like-button'

interface LikedContentProps {
  songs: Song[]
}

export const LikedContent = (props: LikedContentProps) => {
  const { songs } = props
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [isLoading, router, user])

  if (songs.length === 0) {
    return <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">No songs</div>
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-6">
      {songs.map((song) => (
        <div className="flex w-full items-center gap-x-4" key={song.id}>
          <div className="flex-1">
            <MediaItem song={song} onClick={() => {}} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}
