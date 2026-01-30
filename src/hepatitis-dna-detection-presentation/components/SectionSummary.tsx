import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Translator = ({ fr, en }: { fr: ReactNode; en: ReactNode }) => ReactNode

interface SectionSummaryProps {
  T: Translator
  className?: string
  children: ReactNode
}

/**
 * Compact summary block shown after each slide.
 */
export function SectionSummary({ T, className, children }: SectionSummaryProps) {
  return (
    <Card
      data-animate
      className={cn(
        "border-primary/20 bg-primary/5 px-6 py-5 text-sm text-muted-foreground",
        className
      )}
    >
      <p className="leading-relaxed">
        <span className="font-semibold text-foreground mr-1">
          <T fr="Résumé :" en="Summary:" />
        </span>
        {children}
      </p>
    </Card>
  )
}
