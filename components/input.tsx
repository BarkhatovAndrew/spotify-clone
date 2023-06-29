import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { className, disabled, type, ...restProps } = props

  return (
    <input
      className={twMerge(
        'flex w-full rounded-md border border-transparent bg-neutral-700 p-3 text-sm file:border-0 file:bg-transparent file:text-sm placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={disabled}
      type={type}
      ref={ref}
      {...restProps}
    />
  )
})

Input.displayName = 'Input'
