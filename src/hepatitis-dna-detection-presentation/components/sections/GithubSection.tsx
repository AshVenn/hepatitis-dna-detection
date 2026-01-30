import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, ExternalLink } from "lucide-react"
import { CommonSectionProps } from "./types"

export function GithubSection({ T }: CommonSectionProps) {
  return (
    <Section id="github" className="bg-gradient-to-b from-secondary/20 to-background">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Science ouverte" en="Open science" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Reproductibilité & transparence" en="Reproducibility & transparency" />
          </h2>
        </div>

        <Card className="p-10 space-y-6 text-center max-w-3xl mx-auto">
          <Github className="h-16 w-16 mx-auto text-primary" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              <T fr="Dépôt & rapport" en="Repository & report" />
            </h3>
            <p className="text-muted-foreground">
              <T
                fr="Code, prétraitement, modèles et notebooks accessibles."
                en="Code, preprocessing, models and notebooks available."
              />
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2">
              <a href="https://github.com/AshVenn/hepatitis-dna-detection" target="_blank" rel="noreferrer">
                GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a href="https://drive.google.com/file/d/1zZPmeF91Bwa7tJgNxpoKqLoGJaz7Uwcz/view?usp=sharing" target="_blank" rel="noreferrer">
                <T fr="Rapport PDF" en="Project report" /> <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <Separator />
          <p className="text-xs text-muted-foreground">
            <T fr="Scripts + pipelines + documentation disponibles pour reproduction." en="Scripts + pipelines + docs available for reproduction." />
          </p>
        </Card>
      </div>
    </Section>
  )
}
