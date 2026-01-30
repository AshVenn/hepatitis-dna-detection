import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommonSectionProps } from "./types"

type PerformanceRow = {
  modelFr: string
  modelEn: string
  accuracy: string
  precision: string
  recall: string
  f1: string
  auc: string
  highlight?: boolean
}

interface ResultsTableSectionProps extends CommonSectionProps {
  rows: PerformanceRow[]
}

export function ResultsTableSection({ T, rows }: ResultsTableSectionProps) {
  return (
    <Section id="results-table" className="bg-secondary/20">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Performance" en="Performance" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Tableau de performance" en="Performance table" />
          </h2>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    <T fr="Modèle" en="Model" />
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    <T fr="Exactitude" en="Accuracy" />
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    <T fr="Précision" en="Precision" />
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    <T fr="Rappel" en="Recall" />
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">F1</th>
                  <th className="px-4 py-3 text-center font-semibold">AUC</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={`${row.modelEn}-${i}`}
                    className={row.highlight ? "bg-primary/5" : "hover:bg-secondary/20"}
                  >
                    <td className="px-4 py-3 font-medium">
                      <T fr={row.modelFr} en={row.modelEn} />
                    </td>
                    <td className="px-4 py-3 text-center font-mono">{row.accuracy}</td>
                    <td className="px-4 py-3 text-center font-mono">{row.precision}</td>
                    <td className="px-4 py-3 text-center font-mono">{row.recall}</td>
                    <td className="px-4 py-3 text-center font-mono">{row.f1}</td>
                    <td className="px-4 py-3 text-center font-mono">{row.auc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <h4 className="font-semibold">
              <T fr="Régression logistique" en="Logistic regression" />
            </h4>
            <p className="text-muted-foreground text-sm">
              <T fr="Performances élevées et réalistes, variance basse." en="High, realistic performance; lower variance." />
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-semibold">
              <T fr="Forêt aléatoire" en="Random forest" />
            </h4>
            <p className="text-muted-foreground text-sm">
              <T fr="Scores parfaits, vigilance sur le surapprentissage." en="Perfect scores; watch for overfitting." />
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-semibold">
              <T fr="SVM linéaire" en="Linear SVM" />
            </h4>
            <p className="text-muted-foreground text-sm">
              <T fr="Performances élevées, généralisation à confirmer." en="Strong scores; generalisation to confirm." />
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}
