import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommonSectionProps } from "./types"

type Point = { x: number; y: number }
type RocLine = { key: string; color: string; labelFr: string; labelEn: string; points: Point[] }

interface ResultsSectionProps extends CommonSectionProps {
  rocLines: RocLine[]
}

const chartOriginX = 80
const chartOriginY = 60
const chartWidth = 480
const chartHeight = 300
const projectPoint = ({ x, y }: Point) => ({
  x: chartOriginX + x * chartWidth,
  y: chartOriginY + chartHeight - y * chartHeight,
})
const polyline = (points: Point[]) => points.map((p) => `${projectPoint(p).x},${projectPoint(p).y}`).join(" ")

export function ResultsSection({ T, rocLines }: ResultsSectionProps) {
  return (
    <Section id="results-roc" className="bg-background">
      <div className="space-y-8" data-animate>
        <div className="text-center space-y-3">
          <Badge variant="secondary">
            <T fr="Résultats" en="Results" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <T fr="Courbe ROC AUC" en="ROC AUC curve" />
          </h2>
        </div>

        <Card className="p-6 space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              <T fr="Courbe ROC" en="ROC Curve" />
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <T fr="AUC parfait (référence)" en="Perfect AUC (reference)" />
            </span>
          </div>

          <div className="w-full overflow-hidden rounded-lg border bg-card">
            <svg viewBox="0 0 640 420" className="w-full h-[320px]">
              <rect x="0" y="0" width="640" height="420" fill="white" className="dark:fill-slate-900" />
              <g stroke="#d0d0d0" strokeWidth="1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`v-${i}`}
                    x1={chartOriginX + i * (chartWidth / 5)}
                    y1={chartOriginY}
                    x2={chartOriginX + i * (chartWidth / 5)}
                    y2={chartOriginY + chartHeight}
                  />
                ))}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`h-${i}`}
                    x1={chartOriginX}
                    y1={chartOriginY + i * (chartHeight / 5)}
                    x2={chartOriginX + chartWidth}
                    y2={chartOriginY + i * (chartHeight / 5)}
                  />
                ))}
              </g>
              <g stroke="#111" strokeWidth="2" className="dark:stroke-slate-100">
                <line x1={chartOriginX} y1={chartOriginY + chartHeight} x2={chartOriginX + chartWidth} y2={chartOriginY + chartHeight} />
                <line x1={chartOriginX} y1={chartOriginY} x2={chartOriginX} y2={chartOriginY + chartHeight} />
              </g>
              <g fontSize="12" fill="#111" className="dark:fill-slate-100">
                {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v, i) => (
                  <text key={`x-${v}`} x={chartOriginX + i * (chartWidth / 5)} y={chartOriginY + chartHeight + 16} textAnchor="middle">
                    {v.toFixed(1)}
                  </text>
                ))}
                {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v, i) => (
                  <text
                    key={`y-${v}`}
                    x={chartOriginX - 8}
                    y={chartOriginY + chartHeight - i * (chartHeight / 5)}
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {v.toFixed(1)}
                  </text>
                ))}
              </g>
              <line
                x1={chartOriginX}
                y1={chartOriginY + chartHeight}
                x2={chartOriginX + chartWidth}
                y2={chartOriginY}
                stroke="#d33"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {rocLines.map((line) => (
                <polyline
                  key={line.key}
                  points={polyline(line.points)}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="3"
                  className="animate-[drawLine_1.2s_ease-out] [animation-fill-mode:forwards]"
                />
              ))}
            </svg>
          </div>

        <div className="grid gap-3 text-sm md:grid-cols-3">
            {rocLines.map((line) => (
              <div key={line.key} className="flex items-center gap-3">
                <span className="h-2 w-10 rounded-full" style={{ backgroundColor: line.color }} />
                <p className="text-muted-foreground">
                  <T fr={line.labelFr} en={line.labelEn} />
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  )
}
