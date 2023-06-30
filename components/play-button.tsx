import { FaPlay } from 'react-icons/fa'

interface PlayButtonProps {
  className?: string
}

export const PlayButton = (props: PlayButtonProps) => {
  const { className } = props

  return (
    <button
      className="group flex translate-y-1/4 items-center rounded-full bg-green-500 p-3 opacity-0 drop-shadow-md
    transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
      <FaPlay className="text-black" />
    </button>
  )
}
