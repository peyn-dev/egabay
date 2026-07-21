import { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

const SESSION_KEY = 'egabay_token'
const TIMESTAMP_KEY = 'egabay_login_timestamp'
const INACTIVITY_TIMEOUT = 60 * 60 * 1000

interface SessionContextValue {
  isAuthenticated: boolean
  logout: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isLoginPage = location.pathname === '/login'

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(TIMESTAMP_KEY)
    queryClient.clear()
    setIsAuthenticated(false)
    if (location.pathname !== '/login') {
      navigate('/login', { replace: true })
    }
  }, [navigate, queryClient, location.pathname])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT)
  }, [logout])

  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_KEY)
    const timestamp = sessionStorage.getItem(TIMESTAMP_KEY)

    if (!token || !timestamp) {
      if (!isLoginPage) logout()
      return
    }

    const elapsed = Date.now() - Number(timestamp)
    if (elapsed > INACTIVITY_TIMEOUT) {
      if (!isLoginPage) logout()
      return
    }

    setIsAuthenticated(true)

    const remaining = INACTIVITY_TIMEOUT - elapsed
    timerRef.current = setTimeout(() => {
      if (!isLoginPage) logout()
    }, remaining)

    const events = ['mousedown', 'keydown', 'touchstart', 'mousemove', 'scroll']
    const handleActivity = () => resetTimer()
    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }))

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, handleActivity))
    }
  }, [logout, resetTimer, isLoginPage])

  return (
    <SessionContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </SessionContext.Provider>
  )
}
