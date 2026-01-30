import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function AnalysisSection({ T }: CommonSectionProps) {
  return (
    <Section id="analysis-1" className="bg-accent/10">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            <T fr="Analyse critique" en="Critical analysis" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Interprétation des scores" en="Interpreting scores" />
          </h2>
        </div>

        <Card className="p-6 space-y-4 bg-accent/20 border-accent/40">
          <h3 className="text-xl font-semibold">
            <T fr="Scores parfaits = signal d'alerte" en="Perfect scores = warning sign" />
          </h3>
          <p className="text-muted-foreground">
            <T
              fr="Sur un petit jeu (140 échantillons), des scores à 100 % peuvent indiquer un surapprentissage."
              en="On a small set (140 samples), 100% scores may mean overfitting."
            />
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><T fr="Forêt aléatoire : variance élevée" en="Random forest: high variance" /></li>
            <li><T fr="SVM linéaire : marge ajustée, généralisation incertaine" en="Linear SVM: tuned margin, uncertain generalisation" /></li>
            <li><T fr="Régression logistique : 97,86 %, plus stable" en="Logistic regression: 97.86%, more stable" /></li>
          </ul>
        </Card>
      </div>
    </Section>
  )
}
