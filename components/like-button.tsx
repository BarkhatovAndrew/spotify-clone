'use client'

import { useRouter } from 'next/navigation'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiFillLike, AiOutlineHeart } from 'react-icons/ai'
import toast from 'react-hot-toast'

interface LikeButtonProps {
  songId: string
}

export const LikeButton = (props: LikeButtonProps) => {
  const { songId } = props
  const { supabaseClient } = useSessionContext()
  const { user } = useUser()
  const router = useRouter()
  const authModal = useAuthModal()
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen()
    }

    if (isLiked) {
      setIsLiked(false)
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('song_id', songId)
        .eq('user_id', user.id)

      if (error) {
        toast.error(error.message)
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    } else {
      setIsLiked(true)
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ user_id: user.id, song_id: songId })

      if (error) {
        toast.error(error.message)
        setIsLiked(false)
      } else {
        setIsLiked(true)
      }
    }

    router.refresh()
  }

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  return (
    <button className="transition hover:opacity-75" onClick={handleLike}>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}
