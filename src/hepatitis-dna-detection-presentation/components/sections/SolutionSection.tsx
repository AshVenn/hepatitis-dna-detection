import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function SolutionSection({ T }: CommonSectionProps) {
  const pillars = [
    { key: "robust", titleFr: "Robustesse", titleEn: "Robustness", descFr: "Modèle fiable sur données proches G1/G2.", descEn: "Reliable on close genotypes G1/G2." },
    { key: "interpretable", titleFr: "Interprétabilité", titleEn: "Interpretability", descFr: "Décisions explicables pour les cliniciens.", descEn: "Decisions clinicians can explain." },
    { key: "practical", titleFr: "Pragmatisme", titleEn: "Practicality", descFr: "Déploiement léger et reproductible.", descEn: "Lightweight, reproducible deployment." },
  ]

  return (
    <Section id="solution" className="bg-secondary/20">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Approche" en="Approach" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Solution proposée" en="Proposed solution" />
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            <T
              fr="Classification automatique des génotypes à partir des séquences ADN avec pipeline ML transparent."
              en="Automatic genotype classification from DNA sequences with a transparent ML pipeline."
            />
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Card
              key={p.key}
              className="p-6 space-y-3 transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${i * 0.1}s` }}
              data-animate
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary font-semibold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold">
                <T fr={p.titleFr} en={p.titleEn} />
              </h3>
              <p className="text-muted-foreground">
                <T fr={p.descFr} en={p.descEn} />
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
