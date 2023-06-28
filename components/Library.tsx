'use client'

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

export const Library = () => {
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
        />
      </div>
      <div className="mt-4 flex flex-col px-3">List of Songs</div>
    </div>
  )
}
