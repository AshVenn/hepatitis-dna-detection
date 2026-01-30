import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommonSectionProps } from "./types"

export function ModelsSection({ T }: CommonSectionProps) {
  const models = [
    {
      key: "logreg",
      titleFr: "Régression logistique",
      titleEn: "Logistic regression",
      pointsFr: ["Coefficients interprétables", "Probabilités calibrées", "Variance faible"],
      pointsEn: ["Interpretable coefficients", "Calibrated probabilities", "Low variance"],
    },
    {
      key: "rf",
      titleFr: "Forêt aléatoire",
      titleEn: "Random forest",
      pointsFr: ["Non-linéaire", "Importance des variables", "Robuste aux valeurs extrêmes"],
      pointsEn: ["Handles non-linearity", "Feature importance", "Robust to outliers"],
    },
    {
      key: "svm",
      titleFr: "SVM linéaire",
      titleEn: "Linear SVM",
      pointsFr: ["Marge maximale", "Efficace en haute dimension", "Régularisation contrôlée"],
      pointsEn: ["Maximum margin", "High-dimensional efficiency", "Controlled regularization"],
    },
  ]

  return (
    <Section id="models" className="bg-background">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Modèles" en="Models" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Modèles évalués" en="Evaluated models" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <Card key={m.key} className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">
                <T fr={m.titleFr} en={m.titleEn} />
              </h3>
              <Separator />
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                {m.pointsFr.map((_, idx) => (
                  <li key={idx}>
                    <T fr={m.pointsFr[idx]} en={m.pointsEn[idx]} />
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
