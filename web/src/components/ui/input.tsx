import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', invalid = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid}
        className={cn(
          'flex h-12 w-full rounded-[10px] border bg-white px-3 py-2 text-sm text-zinc-900 shadow-xs transition-all duration-200',
          'placeholder:text-zinc-400',
          'border-[#E5E5E5] focus-visible:border-maroon-top/40 focus-visible:ring-2 focus-visible:ring-maroon-top/15 focus-visible:ring-offset-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
          invalid && 'border-red-500 focus-visible:border-red-500/40 focus-visible:ring-red-500/15',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
