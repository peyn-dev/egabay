import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock, User } from "lucide-react"
import type { ComponentType } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router"

import { BrandSeal } from "@/components/auth/BrandSeal"
import { IctcCredit } from "@/components/auth/IctcCredit"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Separator } from "@/components/ui/separator"
import { useLogin } from "@/features/auth/hooks/useLogin"
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

function FieldIcon({
  icon: Icon,
  className,
}: {
  icon: ComponentType<{ className?: string }>
  className?: string
}) {
  return (
    <Icon
      className={cn(
        "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground",
        className,
      )}
      aria-hidden
    />
  )
}

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const login = useLogin()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-neutral-50">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="min-h-svh bg-neutral-50">
      <div className="grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
        {/* Brand panel */}
        <section className="relative flex flex-col items-center justify-center overflow-x-hidden px-6 py-10 text-primary-foreground sm:px-10 sm:py-14 lg:px-14 lg:py-20"
          style={{
            background: 'linear-gradient(160deg, #5A0E0E 0%, #7A1716 40%, #8D201D 70%, #A52A2A 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.18)_0%,transparent_65%),radial-gradient(ellipse_60%_50%_at_100%_100%,color-mix(in_srgb,var(--color-msu-gold)_18%,transparent),transparent_55%),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary-foreground/25 to-transparent"
          />

          <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 text-center lg:gap-12">
            <BrandSeal className="hidden lg:block" />
            <BrandSeal size="compact" className="lg:hidden" />

            <div className="flex flex-col items-center gap-4 lg:gap-5">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase hover:bg-[#D4AF37]/15"
              >
                <img
                  src="/msu-seal.png"
                  alt="MSU seal"
                  className="h-4 w-4 rounded object-contain"
                />
                Mindanao State University
              </Badge>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="font-display text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
                    e<span className="bg-gradient-to-r from-pink-400 via-[#8BC34A] to-[#FFC928] bg-clip-text text-transparent animate-gabay">
                      GABAY
                    </span>
                  </h1>
                  <div className="mx-auto flex items-center justify-center gap-3">
                    <span
                      aria-hidden
                      className="h-px w-10 bg-linear-to-r from-transparent to-msu-green/80"
                    />
                    <p className="text-sm font-semibold tracking-[0.22em] text-primary-foreground/80 uppercase">
                      MSU Division of Student Affairs
                    </p>
                    <span
                      aria-hidden
                      className="h-px w-10 bg-linear-to-l from-transparent to-msu-green/80"
                    />
                  </div>
                </div>

                <p className="mx-auto max-w-sm text-[0.9375rem] leading-relaxed text-primary-foreground/72">
                  Secure digital access for Mindanao State University Division of Student Affairs staff — 
                  managing student profiles, counseling records, and guidance services in one unified workspace.
                </p>
              </div>
            </div>

            {/* <p className="hidden text-xs tracking-wide text-primary-foreground/45 lg:block">
              Mindanao State University · Est. 1961
            </p> */}
          </div>

          <IctcCredit
            variant="light"
            className="absolute inset-x-0 bottom-0 hidden border-t border-primary-foreground/10 lg:flex"
          />
        </section>

        {/* Form panel */}
        <section className="relative flex flex-col items-center justify-center px-6 py-14 sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,color-mix(in_srgb,var(--color-msu-green)_6%,transparent),transparent_70%),linear-gradient(to_bottom,hsl(0_0%_99%),hsl(0_0%_96%))]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(0 0% 85%) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative w-full max-w-[420px]">
            <Card className="gap-0 overflow-hidden border-neutral-200/80 bg-white/90 py-0 shadow-[0_20px_50px_-20px_rgba(26,26,26,0.18)] ring-1 ring-neutral-950/[0.04] backdrop-blur-xl">
              <CardHeader className="space-y-2 border-b border-neutral-100 px-8 pt-8 pb-6">
                <CardTitle className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-[0.9375rem] leading-relaxed">
                  Sign in with your MSU Division of Student Affairs staff credentials.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 py-7">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    {login.isError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm leading-snug text-destructive"
                      >
                        {login.error.message}
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[0.8125rem] font-semibold tracking-wide text-foreground/80 uppercase">
                            Username
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FieldIcon icon={User} />
                              <Input
                                {...field}
                                autoComplete="username"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck={false}
                                placeholder="e.g. juandelacruz"
                                disabled={login.isPending}
                                className="h-11 bg-neutral-50/80 pl-10 text-base md:text-sm"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[0.8125rem] font-semibold tracking-wide text-foreground/80 uppercase">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FieldIcon icon={Lock} />
                              <PasswordInput
                                {...field}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                disabled={login.isPending}
                                className="h-11 bg-neutral-50/80 pl-10 text-base md:text-sm"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-1" />

                    <Button
                      type="submit"
                      className="h-11 w-full text-[0.9375rem] font-semibold shadow-sm"
                      size="lg"
                      disabled={login.isPending}
                    >
                      {login.isPending ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Signing in…
                        </>
                      ) : (
                        "Sign in to eGABAY"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>

              <div className="flex items-center justify-center gap-2 border-t border-neutral-100 bg-neutral-50/50 px-8 py-3.5 text-xs text-muted-foreground">
                <Lock className="size-3.5 shrink-0 text-secondary" />
                <span>Encrypted connection · Authorized personnel only</span>
              </div>

              <IctcCredit className="border-t border-neutral-100/80 bg-neutral-50/30 lg:hidden" />
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
