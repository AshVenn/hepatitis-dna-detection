import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function ImpactSection({ T }: CommonSectionProps) {
  const cards = [
    { titleFr: "Génomique assistée par IA", titleEn: "AI-assisted genomics", descFr: "Automatise le génotypage VHC.", descEn: "Automates HCV genotyping." },
    { titleFr: "Décision clinique", titleEn: "Clinical decision", descFr: "Support rapide et économique.", descEn: "Fast, cost-effective support." },
    { titleFr: "Valeur pédagogique", titleEn: "Educational value", descFr: "Cas d'étude ML + bioinfo.", descEn: "ML + bioinformatics case study." },
  ]

  return (
    <Section id="impact" className="bg-background">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Impact" en="Impact" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Impact & valeur" en="Impact & value" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <Card key={c.titleEn} className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">
                <T fr={c.titleFr} en={c.titleEn} />
              </h3>
              <p className="text-muted-foreground text-sm">
                <T fr={c.descFr} en={c.descEn} />
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
