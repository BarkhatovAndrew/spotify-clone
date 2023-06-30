'use client'

import qs from 'query-string'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { Input } from '@/components/input'

interface SearchInputProps {
  className?: string
}

export const SearchInput = (props: SearchInputProps) => {
  const { className } = props
  const router = useRouter()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }
    const url = qs.stringifyUrl({
      url: '/search',
      query,
    })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
