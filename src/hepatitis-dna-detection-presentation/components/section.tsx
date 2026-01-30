import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

/**
 * Base slide wrapper: full viewport height, centers content, enables snap scrolling.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex min-h-screen items-center justify-center px-6 py-16 md:px-12 lg:px-16 snap-start",
        className
      )}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </section>
  )
}
