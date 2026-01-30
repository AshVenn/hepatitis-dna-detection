import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

export function DataSection({ T }: CommonSectionProps) {
  return (
    <Section id="data" className="bg-background">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Données" en="Data" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Collecte & prétraitement" en="Collection & preprocessing" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              <T fr="Sources" en="Sources" />
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside text-sm">
              <li><T fr="NCBI Virus / GenBank" en="NCBI Virus / GenBank" /></li>
              <li><T fr="Séquences FASTA ADN (G1, G2)" en="DNA FASTA sequences (G1, G2)" /></li>
              <li><T fr="Curées : longueur fixe, U→T, ambiguïtés retirées" en="Curated: fixed length, U→T, ambiguities removed" /></li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              <T fr="Échantillon équilibré" en="Balanced sample" />
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-secondary/40 p-4">
                <p className="text-xs uppercase text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">140</p>
              </div>
              <div className="rounded-lg bg-secondary/40 p-4">
                <p className="text-xs uppercase text-muted-foreground">G1</p>
                <p className="text-2xl font-bold text-primary">70</p>
              </div>
              <div className="rounded-lg bg-secondary/40 p-4">
                <p className="text-xs uppercase text-muted-foreground">G2</p>
                <p className="text-2xl font-bold text-primary">70</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <T fr="Balanced pour éviter le biais; split strict sans fuite." en="Balanced to avoid bias; strict leak-free split." />
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}
