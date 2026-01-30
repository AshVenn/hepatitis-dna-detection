import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function ProblemSection({ T }: CommonSectionProps) {
  return (
    <Section id="problem" className="bg-background">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Contexte" en="Context" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Le problème scientifique" en="The scientific problem" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              <T fr="Variabilité du VHC" en="HCV variability" />
            </h3>
            <p className="text-muted-foreground">
              <T
                fr="Le VHC possède plusieurs génotypes; distinguer G1 et G2 guide le traitement antiviral."
                en="HCV has multiple genotypes; distinguishing G1 vs G2 drives antiviral treatment choice."
              />
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li><T fr="Méthodes de labo coûteuses" en="Wet-lab genotyping is costly" /></li>
              <li><T fr="Accès limité dans certains pays" en="Limited access in many settings" /></li>
              <li><T fr="G1 et G2 sont proches biologiquement" en="G1 and G2 are biologically close" /></li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              <T fr="Besoins" en="Needs" />
            </h3>
            <p className="text-muted-foreground">
              <T
                fr="Un diagnostic rapide, fiable et peu coûteux basé sur la séquence ADN."
                en="Fast, reliable, low-cost diagnosis directly from DNA sequence."
              />
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li><T fr="Automatisation" en="Automation" /></li>
              <li><T fr="Interprétabilité" en="Interpretability" /></li>
              <li><T fr="Compatibilité clinique" en="Clinical readiness" /></li>
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  )
}
