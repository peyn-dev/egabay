import { cn } from '@/lib/utils'

type IctcCreditProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function IctcCredit({ className, variant = 'dark' }: IctcCreditProps) {
  const isLight = variant === 'light'

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1.5 px-6 py-3 text-[11px] tracking-wide',
        isLight
          ? 'text-primary-foreground/45'
          : 'border-t border-neutral-100 text-muted-foreground',
        className,
      )}
    >
      <span>Developed by</span>
      <img
        src="/ictc-logo.png"
        alt="ICTC"
        className="h-5 w-auto rounded-full"
      />
      <span
        className={cn(
          'h-3 w-px',
          isLight ? 'bg-primary-foreground/15' : 'bg-border',
        )}
      />
      <span>MSU - Information and Communication Technology Center</span>
    </div>
  )
}
