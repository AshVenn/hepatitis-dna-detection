import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommonSectionProps } from "./types"

export function FinalModelSection({ T }: CommonSectionProps) {
  return (
    <Section id="final-model" className="bg-secondary/20">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Décision" en="Decision" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Modèle retenu" en="Selected model" />
          </h2>
        </div>

        <Card className="p-8 space-y-6 text-center max-w-3xl mx-auto">
          <div className="text-5xl font-bold text-primary">97.86%</div>
          <p className="text-muted-foreground">
            <T fr="Régression logistique : équilibre entre performance et interprétabilité."
               en="Logistic regression: balance of performance and interpretability." />
          </p>
          <Separator />
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground text-left">
            <div>
              <p className="font-semibold text-primary">
                <T fr="Justification" en="Rationale" />
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><T fr="Moins de surapprentissage" en="Less overfitting" /></li>
                <li><T fr="Explicable par les coefficients" en="Explainable coefficients" /></li>
                <li><T fr="Probabilités utilisables en clinique" en="Clinically usable probabilities" /></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary">
                <T fr="Valeur clinique" en="Clinical value" />
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><T fr="Décisions transparentes" en="Transparent decisions" /></li>
                <li><T fr="Robuste aux variations" en="Robust to variations" /></li>
                <li><T fr="Prêt pour le déploiement" en="Deployment ready" /></li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  )
}
