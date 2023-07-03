'use client'

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'
import { useUploadModal } from '@/hooks/use-upload-modal'
import { Song } from '@/types'
import { MediaItem } from '@/components/media-item'
import { useOnPlay } from '@/hooks/use-on-play'

interface LibraryProps {
  songs: Song[]
}

export const Library = (props: LibraryProps) => {
  const { songs } = props
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400">Your Library</p>
        </div>
        <AiOutlinePlus
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          size={20}
          onClick={onClick}
        />
      </div>
      <div className="mt-4 flex flex-col px-3">
        {songs.map((item) => (
          <MediaItem onClick={(id: string) => onPlay(id)} key={item.id} song={item} />
        ))}
      </div>
    </div>
  )
}
