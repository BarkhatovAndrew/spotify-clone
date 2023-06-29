import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, disabled, type = 'button', ...restProps } = props

  return (
    <button
      type={type}
      disabled={disabled}
      ref={ref}
      className={twMerge(
        `w-full rounded-full border border-transparent bg-green-500 px-3 py-3 font-bold
        text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      {...restProps}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'
