import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function PerspectivesSection({ T }: CommonSectionProps) {
  const items = [
    { n: 1, fr: "Étendre aux génotypes G1–G7", en: "Extend to genotypes G1–G7" },
    { n: 2, fr: "Validation externe multi-sites", en: "External multi-site validation" },
    { n: 3, fr: "Ajout de métadonnées cliniques", en: "Add clinical metadata" },
    { n: 4, fr: "Explorer des modèles hybrides interprétables", en: "Explore interpretable hybrid models" },
  ]

  return (
    <Section id="perspectives" className="bg-secondary/20">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Perspectives" en="Future work" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Perspectives & directions futures" en="Perspectives & future directions" />
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.n} className="p-5 space-y-2">
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                {item.n}
              </div>
              <p className="font-semibold">
                <T fr={item.fr} en={item.en} />
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
