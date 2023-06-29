'use client'

import { useCallback, useState } from 'react'
import uniqid from 'uniqid'
import { Modal } from '@/components/modal'
import { useUploadModal } from '@/hooks/use-upload-modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/use-user'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export const UploadModal = () => {
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabaseClient = useSupabaseClient()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  })

  const onChange = useCallback(() => {
    if (uploadModal.isOpen) {
      reset()
      uploadModal.onClose()
    }
  }, [reset, uploadModal])

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        return toast.error('Missing fields')
      }

      const uniqId = uniqid()

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (songError) {
        setIsLoading(false)
        return toast.error('Failed song upload')
      }

      // Upload image
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.title}-${uniqId}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      const { error: supabaseError } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData?.path,
        song_path: songData?.path,
      })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Song uploaded')
      uploadModal.onClose()
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            {...register('song', { required: true })}
            placeholder="Song author"
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            disabled={isLoading}
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            placeholder="Song author"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  )
}
