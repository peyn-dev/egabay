import { type ComponentPropsWithoutRef } from 'react'
import { ClipboardList, LayoutDashboard, LogOut, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { useLogout } from '@/features/auth/hooks/useLogout'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#', active: true },
  { label: 'Student Forms', icon: ClipboardList, href: '#', active: false },
]

const bottomItems = [
  { label: 'Settings', icon: Settings, href: '#', active: false },
  { label: 'Logout', icon: LogOut, href: '#', active: false },
]

interface SidebarProps extends ComponentPropsWithoutRef<'aside'> {
  onNavClick?: () => void
}

export function Sidebar({ className, onNavClick, ...props }: SidebarProps) {
  const logout = useLogout()

  return (
    <aside
      className={cn(
        'flex h-full w-[260px] flex-col bg-white border-r border-zinc-200',
        className,
      )}
      {...props}
    >
      {/* Brand */}
      <div className="flex flex-col px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          e<span className="text-primary">GABAY</span>
        </h1>
        <p className="mt-1.5 text-[10px] leading-tight text-zinc-400 max-w-[180px]">
          Mindanao State University - Division of Student Affairs
        </p>
      </div>

      <Separator className="mx-5 w-auto" />

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5 px-3 pt-4 pb-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={onNavClick}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700',
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-3 pb-4">
        <Separator className="mb-2" />
        {bottomItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.label === 'Logout' ? logout : onNavClick}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700',
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

export function MobileSidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const logout = useLogout()

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex flex-col px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          e<span className="text-primary">GABAY</span>
        </h1>
        <p className="mt-1.5 text-[10px] leading-tight text-zinc-400 max-w-[180px]">
          Mindanao State University, Division of Student Affairs
        </p>
      </div>

      <Separator className="mx-5 w-auto" />

      <nav className="flex flex-col gap-0.5 px-3 pt-4 pb-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={onNavClick}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700',
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-3 pb-6">
        <Separator className="mb-2" />
        {bottomItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.label === 'Logout' ? logout : onNavClick}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700',
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
