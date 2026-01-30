import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function FeaturesSection({ T }: CommonSectionProps) {
  const blocks = [
    { key: "kmer", labelFr: "k-mers", labelEn: "k-mers", descFr: "Motifs locaux capturés par fenêtres glissantes.", descEn: "Local motifs captured with sliding windows." },
    { key: "tfidf", labelFr: "TF-IDF", labelEn: "TF-IDF", descFr: "Pondère les k-mers discriminants.", descEn: "Weights discriminative k-mers." },
    { key: "space", labelFr: "Espace haute-D", labelEn: "High-D space", descFr: "Empreintes numériques prêtes pour ML.", descEn: "Numeric fingerprints ready for ML." },
  ]

  return (
    <Section id="features" className="bg-secondary/20">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Représentation" en="Representation" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Ingénierie des caractéristiques" en="Feature engineering" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <Card key={b.key} className="p-6 space-y-3">
              <div className="text-4xl font-mono text-primary">•</div>
              <h3 className="text-xl font-semibold">
                <T fr={b.labelFr} en={b.labelEn} />
              </h3>
              <p className="text-muted-foreground">
                <T fr={b.descFr} en={b.descEn} />
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
