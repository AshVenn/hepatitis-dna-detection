'use client'

import { useEffect, useMemo, useState, useCallback, ReactNode } from "react"
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProblemSection } from "@/components/sections/ProblemSection"
import { SolutionSection } from "@/components/sections/SolutionSection"
import { DataSection } from "@/components/sections/DataSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { ModelsSection } from "@/components/sections/ModelsSection"
import { SetupSection } from "@/components/sections/SetupSection"
import { ResultsSection } from "@/components/sections/ResultsSection"
import { ConfusionSection } from "@/components/sections/ConfusionSection"
import { ResultsTableSection } from "@/components/sections/ResultsTableSection"
import { AnalysisSection } from "@/components/sections/AnalysisSection"
import { AnalysisFollowSection } from "@/components/sections/AnalysisFollowSection"
import { FinalModelSection } from "@/components/sections/FinalModelSection"
import { ImpactSection } from "@/components/sections/ImpactSection"
import { PerspectivesSection } from "@/components/sections/PerspectivesSection"
import { GithubSection } from "@/components/sections/GithubSection"

type SectionItem = { id: string; labelFr: string; labelEn: string }

const SECTION_ITEMS: SectionItem[] = [
  { id: "hero", labelFr: "Ouverture", labelEn: "Opening" },
  { id: "problem", labelFr: "Problème", labelEn: "Problem" },
  { id: "solution", labelFr: "Solution", labelEn: "Solution" },
  { id: "data", labelFr: "Données", labelEn: "Data" },
  { id: "features", labelFr: "Caractéristiques", labelEn: "Features" },
  { id: "models", labelFr: "Modèles", labelEn: "Models" },
  { id: "setup", labelFr: "Protocole", labelEn: "Setup" },
  { id: "results-roc", labelFr: "ROC AUC", labelEn: "ROC AUC" },
  { id: "confusion", labelFr: "Matrices", labelEn: "Matrices" },
  { id: "results-table", labelFr: "Tableau", labelEn: "Table" },
  { id: "analysis-1", labelFr: "Analyse (1)", labelEn: "Analysis (1)" },
  { id: "analysis-2", labelFr: "Analyse (2)", labelEn: "Analysis (2)" },
  { id: "final-model", labelFr: "Modèle final", labelEn: "Final model" },
  { id: "impact", labelFr: "Impact", labelEn: "Impact" },
  { id: "perspectives", labelFr: "Perspectives", labelEn: "Perspectives" },
  { id: "github", labelFr: "Reproductibilité", labelEn: "Reproducibility" },
]

type Point = { x: number; y: number }
const rocLines = [
  {
    key: "logreg",
    color: "#1f77b4",
    labelFr: "Régression logistique (AUC=1.000)",
    labelEn: "LogisticRegression (AUC=1.000)",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ] as Point[],
  },
  {
    key: "rf",
    color: "#ff7f0e",
    labelFr: "RandomForest (AUC=1.000)",
    labelEn: "RandomForest (AUC=1.000)",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ] as Point[],
  },
  {
    key: "svm",
    color: "#2ca02c",
    labelFr: "LinearSVC (AUC=1.000)",
    labelEn: "LinearSVC (AUC=1.000)",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ] as Point[],
  },
]

const confusionMatrices = [
  {
    key: "logreg",
    titleFr: "Matrice de confusion - Régression logistique",
    titleEn: "Confusion Matrix - Logistic Regression",
    summaryFr: "Exactitude 0.98 • Précision 0.98 • Rappel 0.98",
    summaryEn: "Accuracy 0.98 • Precision 0.98 • Recall 0.98",
    matrix: [
      [70, 0],
      [3, 67],
    ],
  },
  {
    key: "rf",
    titleFr: "Matrice de confusion - RandomForest",
    titleEn: "Confusion Matrix - RandomForest",
    summaryFr: "Exactitude 1.00 • F1-score 1.00",
    summaryEn: "Accuracy 1.00 • F1-score 1.00",
    matrix: [
      [70, 0],
      [0, 70],
    ],
  },
  {
    key: "svm",
    titleFr: "Matrice de confusion - Linear SVM",
    titleEn: "Confusion Matrix - Linear SVM",
    summaryFr: "Approx. 98 % • 67 bonnes prédictions",
    summaryEn: "Approx. 98% • 67 correct predictions",
    matrix: [
      [70, 0],
      [3, 67],
    ],
  },
]

const performanceRows = [
  {
    modelFr: "Régression logistique",
    modelEn: "Logistic regression",
    accuracy: "0.9786",
    precision: "1.0000",
    recall: "0.9571",
    f1: "0.9781",
    auc: "1.0000",
  },
  {
    modelFr: "Forêt aléatoire",
    modelEn: "Random forest",
    accuracy: "1.0000",
    precision: "1.0000",
    recall: "1.0000",
    f1: "1.0000",
    auc: "1.0000",
    highlight: true,
  },
  {
    modelFr: "SVM linéaire",
    modelEn: "Linear SVM",
    accuracy: "1.0000",
    precision: "1.0000",
    recall: "1.0000",
    f1: "1.0000",
    auc: "1.0000",
  },
]

export default function Home() {
  useSmoothScroll()

  const [lang, setLang] = useState<"fr" | "en">("fr")
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState(SECTION_ITEMS[0].id)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)
  const [autoScrollDelay, setAutoScrollDelay] = useState(8000) // ms

  const isFr = lang === "fr"
  const currentIndex = useMemo(
    () => Math.max(0, SECTION_ITEMS.findIndex((s) => s.id === activeSection)),
    [activeSection]
  )
  const T = ({ fr, en }: { fr: ReactNode; en: ReactNode }) => (isFr ? fr : en)

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const goToIndex = useCallback(
    (index: number) => {
      const target = SECTION_ITEMS[index]
      if (target) scrollToSection(target.id)
    },
    [scrollToSection]
  )

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const nextDark = storedTheme ? storedTheme === "dark" : prefersDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle("dark", nextDark)
  }, [])

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    const browser = navigator.language?.toLowerCase() || ""
    const next = storedLang === "en" || storedLang === "fr" ? storedLang : browser.startsWith("fr") ? "fr" : "en"
    setLang(next)
    document.documentElement.lang = next
  }, [])

  useEffect(() => {
    const sections = SECTION_ITEMS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id)
      },
      { threshold: [0.35, 0.6] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]")
    if (!elements.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.2 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault()
        goToIndex(Math.min(currentIndex + 1, SECTION_ITEMS.length - 1))
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault()
        goToIndex(Math.max(currentIndex - 1, 0))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [currentIndex, goToIndex])

  useEffect(() => {
    if (!autoScrollEnabled) return
    const timer = window.setTimeout(() => {
      const next = currentIndex === SECTION_ITEMS.length - 1 ? 0 : currentIndex + 1
      goToIndex(next)
    }, autoScrollDelay)
    return () => window.clearTimeout(timer)
  }, [autoScrollEnabled, autoScrollDelay, currentIndex, goToIndex])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const toggleLang = () => {
    const next = lang === "fr" ? "en" : "fr"
    setLang(next)
    document.documentElement.lang = next
    localStorage.setItem("lang", next)
  }

  return (
    <main className="relative bg-background text-foreground snap-y snap-mandatory">
      {/* HUD */}
      <div className="fixed right-6 top-6 z-50 flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <span><T fr="Mode" en="Theme" /></span>
          <span className="font-semibold text-foreground">
            <T fr={isDark ? "Sombre" : "Clair"} en={isDark ? "Dark" : "Light"} />
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full border-border/60 bg-background/80 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm backdrop-blur"
          onClick={toggleLang}
          aria-label={isFr ? "Basculer la langue" : "Switch language"}
        >
          {isFr ? "EN" : "FR"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full border-border/60 bg-background/80 shadow-sm backdrop-blur"
          onClick={toggleTheme}
          aria-label={isFr ? "Basculer le mode sombre" : "Toggle dark mode"}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm backdrop-blur">
          <T fr="Section" en="Slide" /> {String(currentIndex + 1).padStart(2, "0")} / {SECTION_ITEMS.length}
        </div>

        <Card className="w-64 p-4 space-y-3 border-border/60 bg-background/85 backdrop-blur">
          <div>
            <p className="font-semibold text-foreground">
              {isFr ? SECTION_ITEMS[currentIndex].labelFr : SECTION_ITEMS[currentIndex].labelEn}
            </p>
            <p className="text-xs text-muted-foreground">
              <T fr="Utilisez ↑ ↓ pour naviguer" en="Use ↑ ↓ to navigate" />
            </p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border/60"
              onClick={() => goToIndex(Math.max(currentIndex - 1, 0))}
              aria-label={isFr ? "Section précédente" : "Previous section"}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border/60"
              onClick={() => goToIndex(Math.min(currentIndex + 1, SECTION_ITEMS.length - 1))}
              aria-label={isFr ? "Section suivante" : "Next section"}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span><T fr="Auto-scroll" en="Auto-scroll" /></span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full border-border/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${autoScrollEnabled ? "border-primary text-primary" : ""}`}
                onClick={() => setAutoScrollEnabled((p) => !p)}
              >
                {autoScrollEnabled ? "ON" : "OFF"}
              </Button>
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-2">
              <span><T fr="Délai" en="Delay" /></span>
              <Input
                type="number"
                min={3}
                max={60}
                step={1}
                value={autoScrollDelay / 1000}
                onChange={(e) => setAutoScrollDelay(Math.max(3, Math.min(60, Number(e.target.value) || 0)) * 1000)}
                className="h-8 w-16 text-center text-xs"
              />
              <span>s</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Slides */}
      <HeroSection T={T} isFr={isFr} lang={lang} scrollToNext={() => goToIndex(1)} />
      <ProblemSection T={T} isFr={isFr} lang={lang} />
      <SolutionSection T={T} isFr={isFr} lang={lang} />
      <DataSection T={T} isFr={isFr} lang={lang} />
      <FeaturesSection T={T} isFr={isFr} lang={lang} />
      <ModelsSection T={T} isFr={isFr} lang={lang} />
      <SetupSection T={T} isFr={isFr} lang={lang} />
      <ResultsSection T={T} isFr={isFr} lang={lang} rocLines={rocLines} />
      <ConfusionSection T={T} isFr={isFr} lang={lang} confusionMatrices={confusionMatrices} />
      <ResultsTableSection T={T} isFr={isFr} lang={lang} rows={performanceRows} />
      <AnalysisSection T={T} isFr={isFr} lang={lang} />
      <AnalysisFollowSection T={T} isFr={isFr} lang={lang} />
      <FinalModelSection T={T} isFr={isFr} lang={lang} />
      <ImpactSection T={T} isFr={isFr} lang={lang} />
      <PerspectivesSection T={T} isFr={isFr} lang={lang} />
      <GithubSection T={T} isFr={isFr} lang={lang} />

      <style jsx global>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        [data-animate].is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        html[lang='fr'] .lang-en { display: none; }
        html[lang='en'] .lang-fr { display: none; }
        @keyframes drawLine { from { stroke-dasharray: 0 500; } to { stroke-dasharray: 500 0; } }
      `}</style>
    </main>
  )
}
