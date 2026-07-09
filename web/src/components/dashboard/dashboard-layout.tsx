import { type ReactNode } from 'react'

import { Sidebar } from './sidebar'
import { Header } from './header'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Desktop sidebar - hidden on mobile */}
      <Sidebar className="hidden lg:flex fixed left-0 top-0 h-screen z-40" />

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:ml-[260px]">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
