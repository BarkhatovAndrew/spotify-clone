import { ReactNode } from 'react'

interface BoxProps {
  children: ReactNode
  className?: string
}

export const Box = (props: BoxProps) => {
  const { children, className } = props

  return <div>{children}</div>
}
