import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'min-h-screen w-full flex items-center justify-center px-6 py-12 relative snap-start scroll-mt-16 overflow-hidden',
        className
      )}
    >
      <div className="max-w-6xl w-full mx-auto h-full">
        {children}
      </div>
    </section>
  )
}
