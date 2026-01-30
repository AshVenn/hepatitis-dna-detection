import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

type ConfusionMatrix = {
  key: string
  titleFr: string
  titleEn: string
  summaryFr: string
  summaryEn: string
  matrix: number[][]
}

interface ConfusionSectionProps extends CommonSectionProps {
  confusionMatrices: ConfusionMatrix[]
}

const cellColor = (value: number) => {
  if (value >= 60) return "#f4e24b"
  if (value >= 10) return "#7b3b9a"
  if (value > 0) return "#4b1d6e"
  return "#2a0a3d"
}

export function ConfusionSection({ T, confusionMatrices }: ConfusionSectionProps) {
  return (
    <Section id="confusion" className="bg-secondary/10">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Résultats" en="Results" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Matrices de confusion" en="Confusion matrices" />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {confusionMatrices.map((matrix, idx) => (
            <Card
              key={matrix.key}
              className="p-5 space-y-3"
              data-animate
              style={{ transitionDelay: `${idx * 0.25}s` }}
            >
              <p className="text-xs text-muted-foreground">
                <T fr={matrix.summaryFr} en={matrix.summaryEn} />
              </p>
              <h3 className="text-sm font-semibold">
                <T fr={matrix.titleFr} en={matrix.titleEn} />
              </h3>
              <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                <div className="flex flex-col gap-10 text-[11px] text-muted-foreground">
                  <span>True G1</span>
                  <span>True G2</span>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-1">
                    {matrix.matrix.flat().map((value, i) => (
                      <div
                        key={`${matrix.key}-${i}`}
                        className={`h-12 w-12 flex items-center justify-center text-sm font-semibold ${value >= 60 ? "text-black" : "text-white"}`}
                        style={{ backgroundColor: cellColor(value) }}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>Pred G1</span>
                    <span>Pred G2</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-[11px] text-muted-foreground">
                  <div className="h-24 w-2 rounded-full bg-gradient-to-b from-[#f4e24b] via-[#7b3b9a] to-[#2a0a3d]" />
                  <div className="mt-1 flex flex-col items-center gap-1">
                    <span>70</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
