'use client'

import { useEffect, useState } from 'react'

import { Modal } from '@/components/modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal title="test" description="test description" isOpen onChange={() => {}}>
      Test children
    </Modal>
  )
}
