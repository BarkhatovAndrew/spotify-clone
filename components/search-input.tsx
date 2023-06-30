'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

interface SearchInputProps {
  className?: string
}

export const SearchInput = (props: SearchInputProps) => {
  const { className } = props
  const router = useRouter()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  return <div>Search Input</div>
}
