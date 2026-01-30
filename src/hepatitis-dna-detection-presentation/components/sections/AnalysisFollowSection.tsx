import { Section } from "@/components/section"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function AnalysisFollowSection({ T }: CommonSectionProps) {
  return (
    <Section id="analysis-2" className="bg-background">
      <div className="grid gap-6 md:grid-cols-2" data-animate>
        <Card className="p-6 space-y-3 border-destructive/40">
          <h3 className="text-xl font-semibold text-destructive">
            <T fr="Risques de surapprentissage" en="Overfitting risks" />
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><T fr="Mémorisation au lieu d'apprentissage" en="Memorisation instead of learning" /></li>
            <li><T fr="Faible performance hors échantillon" en="Weak performance off-sample" /></li>
            <li><T fr="Complexité inutile" en="Unnecessary complexity" /></li>
            <li><T fr="Fiabilité clinique limitée" en="Limited clinical reliability" /></li>
          </ul>
        </Card>

        <Card className="p-6 space-y-3 border-primary/50">
          <h3 className="text-xl font-semibold text-primary">
            <T fr="Pourquoi la régression logistique" en="Why logistic regression" />
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><T fr="Variance plus faible, stable" en="Lower variance, stable" /></li>
            <li><T fr="Coefficients interprétables" en="Interpretable coefficients" /></li>
            <li><T fr="Probabilités bien calibrées" en="Well-calibrated probabilities" /></li>
            <li><T fr="Généralisation plus prévisible" en="Predictable generalisation" /></li>
          </ul>
        </Card>
      </div>
    </Section>
  )
}
