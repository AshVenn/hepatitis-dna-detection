import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function SetupSection({ T }: CommonSectionProps) {
  return (
    <Section id="setup" className="bg-secondary/20">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Protocole" en="Protocol" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Protocole expérimental" en="Experimental setup" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              <T fr="Jeu de données" en="Dataset" />
            </h3>
            <p className="text-muted-foreground">
              <T fr="140 séquences équilibrées (70 G1 / 70 G2)." en="140 balanced sequences (70 G1 / 70 G2)." />
            </p>
            <p className="text-muted-foreground">
              <T fr="Split stratifié, aucune fuite." en="Stratified split, no leakage." />
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              <T fr="Validation" en="Validation" />
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li><T fr="K-fold stratifié" en="Stratified K-fold" /></li>
              <li><T fr="Métriques : Exactitude, Précision, Rappel, F1, AUC" en="Metrics: Accuracy, Precision, Recall, F1, AUC" /></li>
              <li><T fr="Visualisation par ROC et matrices de confusion" en="Visualised with ROC and confusion matrices" /></li>
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  )
}
