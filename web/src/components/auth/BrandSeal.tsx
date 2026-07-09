import { cn } from '@/lib/utils'

type BrandSealProps = {
  className?: string
  size?: 'full' | 'compact'
}

export function BrandSeal({ className, size = 'full' }: BrandSealProps) {
  if (size === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-primary-foreground/10 ring-1 ring-primary-foreground/20 backdrop-blur-sm">
          <img
            src="/dsa-logo.png"
            alt="DSA"
            className="size-8 object-contain"
          />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold tracking-wide text-primary-foreground/80 uppercase">
            Mindanao State University
          </p>
          <p className="text-[10px] tracking-wide text-primary-foreground/50 uppercase">
            Marawi City
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div
        className="animate-float relative flex items-center justify-center"
        style={{
          width: '270px',
          height: '290px',
          borderRadius: '24px',
          background: 'linear-gradient(160deg, rgba(184,134,11,0.35) 0%, rgba(153,79,16,0.35) 30%, rgba(122,23,22,0.30) 60%, rgba(90,14,14,0.40) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)',
        }}
      >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[24px]"
            style={{
              background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[24px]"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(184,134,11,0.10) 0%, transparent 60%)',
            }}
          />
          <img
            src="/dsa-logo.png"
            alt="Mindanao State University institutional seal"
            className="relative z-10 h-auto w-[180px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          />
      </div>
    </div>
  )
}
