
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { DNAHelix } from '@/components/dna-helix'
import { FloatingParticles } from '@/components/floating-particles'
import { Section } from '@/components/section'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, ExternalLink, Github, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

const SECTION_ITEMS = [
  { id: 'hero', labelFr: 'Ouverture', labelEn: 'Opening' },
  { id: 'problem', labelFr: 'Problème', labelEn: 'Problem' },
  { id: 'solution', labelFr: 'Solution', labelEn: 'Solution' },
  { id: 'data', labelFr: 'Données', labelEn: 'Data' },
  { id: 'features', labelFr: 'Caractéristiques', labelEn: 'Features' },
  { id: 'models', labelFr: 'Modèles', labelEn: 'Models' },
  { id: 'setup', labelFr: 'Protocole', labelEn: 'Setup' },
  { id: 'results', labelFr: 'Résultats', labelEn: 'Results' },
  { id: 'analysis', labelFr: 'Analyse', labelEn: 'Analysis' },
  { id: 'final-model', labelFr: 'Modèle final', labelEn: 'Final model' },
  { id: 'impact', labelFr: 'Impact', labelEn: 'Impact' },
  { id: 'perspectives', labelFr: 'Perspectives', labelEn: 'Perspectives' },
  { id: 'github', labelFr: 'Reproductibilité', labelEn: 'Reproducibility' },
]

function SectionSummary({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm" data-animate>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          <span className="lang-fr">Résumé :</span>
          <span className="lang-en">Summary:</span>
        </span>{' '}
        {children}
      </p>
    </div>
  )
}

export default function Home() {
  useSmoothScroll()

  const [isDark, setIsDark] = useState(false)
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [activeSection, setActiveSection] = useState(SECTION_ITEMS[0].id)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)
  const AUTO_SCROLL_DELAY = 8000

  const currentIndex = useMemo(() => {
    const index = SECTION_ITEMS.findIndex((item) => item.id === activeSection)
    return index === -1 ? 0 : index
  }, [activeSection])

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const goToIndex = useCallback(
    (index: number) => {
      const target = SECTION_ITEMS[index]
      if (target) {
        scrollToSection(target.id)
      }
    },
    [scrollToSection]
  )

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextDark = stored ? stored === 'dark' : prefersDark

    setIsDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('lang')
    const browserLang = navigator.language?.toLowerCase() || ''
    const nextLang = stored === 'en' || stored === 'fr' ? stored : browserLang.startsWith('fr') ? 'fr' : 'en'
    setLang(nextLang)
    document.documentElement.lang = nextLang
  }, [])

  useEffect(() => {
    const elements = SECTION_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: [0.35, 0.6, 0.85] }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tagName = target?.tagName?.toLowerCase() || ''
      if (tagName === 'input' || tagName === 'textarea' || target?.isContentEditable) return

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        goToIndex(Math.min(currentIndex + 1, SECTION_ITEMS.length - 1))
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        goToIndex(Math.max(currentIndex - 1, 0))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex, goToIndex])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-parallax]')
    if (!elements.length) return

    let raf = 0

    const update = () => {
      const y = window.scrollY
      elements.forEach((element) => {
        const speed = Number(element.dataset.parallaxSpeed || '0.08')
        element.style.transform = `translate3d(0, ${y * speed * -0.2}px, 0)`
      })
      raf = 0
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('[data-animate]')
    if (!revealElements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
  }

  const toggleLang = () => {
    const nextLang = lang === 'fr' ? 'en' : 'fr'
    setLang(nextLang)
    document.documentElement.lang = nextLang
    localStorage.setItem('lang', nextLang)
  }

  const isFr = lang === 'fr'
  const sectionLabel = SECTION_ITEMS[currentIndex]
    ? isFr
      ? SECTION_ITEMS[currentIndex].labelFr
      : SECTION_ITEMS[currentIndex].labelEn
    : ''
  const T = ({ fr, en }: { fr: ReactNode; en: ReactNode }) => (isFr ? <>{fr}</> : <>{en}</>)
  const storyboardSteps = [
    {
      key: 'capture',
      number: '01',
      titleFr: 'Capture multimodale',
      titleEn: 'Multimodal capture',
      descriptionFr: 'Séquences nucléotidiques collectées, nettoyées et alignées pour préserver le signal biologique.',
      descriptionEn: 'Nucleotide sequences collected, cleaned, and aligned to keep the biological signal intact.',
    },
    {
      key: 'transform',
      number: '02',
      titleFr: 'Transformation inspirée des k-mers',
      titleEn: 'k-mer inspired transformation',
      descriptionFr: 'K-mers, TF-IDF et espaces haute dimension créent des empreintes discriminantes.',
      descriptionEn: 'K-mers, TF-IDF, and high-dimensional spaces create discriminative fingerprints.',
    },
    {
      key: 'validate',
      number: '03',
      titleFr: 'Validation clinique',
      titleEn: 'Clinical validation',
      descriptionFr: 'Matrices de confusion et courbes ROC guident le choix final vers la régression logistique.',
      descriptionEn: 'Confusion matrices and ROC curves guide the final choice toward logistic regression.',
    },
  ]
  const coverageBars = [
    { key: 'atg', value: 82, labelFr: 'Richesse ATG', labelEn: 'ATG density' },
    { key: 'cpg', value: 74, labelFr: 'Zones CpG', labelEn: 'CpG regions' },
    { key: 'kmer', value: 68, labelFr: 'k-mers informatifs', labelEn: 'Informative k-mers' },
    { key: 'smot', value: 59, labelFr: 'Signatures mixtes', labelEn: 'Hybrid signatures' },
  ]
  const rocLines = [
    {
      key: 'logreg',
      color: '#1f77b4',
      labelFr: 'Régression logistique (AUC=1.000)',
      labelEn: 'LogisticRegression (AUC=1.000)',
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
    {
      key: 'rf',
      color: '#ff7f0e',
      labelFr: 'Forêt aléatoire (AUC=1.000)',
      labelEn: 'RandomForest (AUC=1.000)',
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
    {
      key: 'svm',
      color: '#2ca02c',
      labelFr: 'SVM linéaire (AUC=1.000)',
      labelEn: 'LinearSVC_Calibrated (AUC=1.000)',
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0.8, y: 1 },
        { x: 1, y: 1 },
      ],
    },
  ]
  const chartOriginX = 80
  const chartOriginY = 60
  const chartWidth = 480
  const chartHeight = 300
  const projectPoint = ({ x, y }: { x: number; y: number }) => ({
    x: chartOriginX + x * chartWidth,
    y: chartOriginY + chartHeight - y * chartHeight,
  })
  const getPolylinePoints = (points: { x: number; y: number }[]) =>
    points.map((point) => `${projectPoint(point).x},${projectPoint(point).y}`).join(' ')
  const confusionMatrices = [
    {
      key: 'logreg',
      titleFr: 'Matrice de confusion - Régression logistique',
      titleEn: 'Confusion Matrix - Logistic Regression',
      summaryFr: 'Exactitude 0.98 • Précision 0.98 • Rappel 0.98',
      summaryEn: 'Accuracy 0.98 • Precision 0.98 • Recall 0.98',
      matrix: [
        [70, 0],
        [3, 67],
      ],
    },
    {
      key: 'rf',
      titleFr: 'Matrice de confusion - RandomForest',
      titleEn: 'Confusion Matrix - RandomForest',
      summaryFr: 'Exactitude 1.00 • F1-score 1.00',
      summaryEn: 'Accuracy 1.00 • F1-score 1.00',
      matrix: [
        [70, 0],
        [0, 70],
      ],
    },
    {
      key: 'svm',
      titleFr: 'Matrice de confusion - SVM linéaire',
      titleEn: 'Confusion Matrix - Linear SVM',
      summaryFr: 'Approx. 98% • 67 prédictions correctes',
      summaryEn: 'Approx. 98% • 67 correct predictions',
      matrix: [
        [70, 0],
        [3, 67],
      ],
    },
  ]
  const cellColor = (value: number) => {
    if (value >= 60) return '#f4e24b'
    if (value >= 10) return '#7b3b9a'
    if (value > 0) return '#4b1d6e'
    return '#2a0a3d'
  }

  useEffect(() => {
    if (!autoScrollEnabled) return
    const delay = AUTO_SCROLL_DELAY
    const timer = window.setTimeout(() => {
      const nextIndex = currentIndex === SECTION_ITEMS.length - 1 ? 0 : currentIndex + 1
      goToIndex(nextIndex)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [autoScrollEnabled, currentIndex, goToIndex])

  return (
    <main className="relative bg-background text-foreground snap-y snap-mandatory">
      <div className="fixed right-6 top-6 z-50 flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <span><T fr="Mode" en="Theme" /></span>
          <span className="font-semibold text-foreground">
            <T fr={isDark ? 'Sombre' : 'Clair'} en={isDark ? 'Dark' : 'Light'} />
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full border-border/60 bg-background/80 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm backdrop-blur"
          onClick={toggleLang}
          aria-label={isFr ? 'Basculer la langue' : 'Switch language'}
        >
          {isFr ? 'EN' : 'FR'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full border-border/60 bg-background/80 shadow-sm backdrop-blur"
          onClick={toggleTheme}
          aria-label={isFr ? 'Basculer le mode sombre' : 'Toggle dark mode'}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm backdrop-blur">
          <T fr="Section" en="Slide" /> {String(currentIndex + 1).padStart(2, '0')} / {SECTION_ITEMS.length}
        </div>
        <div className="rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm shadow-lg backdrop-blur">
          <p className="font-semibold text-foreground">{sectionLabel}</p>
          <p className="text-xs text-muted-foreground">
            <T fr="Utilisez ↑ ↓ pour naviguer" en="Use ↑ ↓ to navigate" />
          </p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border/60"
              onClick={() => goToIndex(Math.max(currentIndex - 1, 0))}
              aria-label={isFr ? 'Section précédente' : 'Previous section'}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border/60"
              onClick={() => goToIndex(Math.min(currentIndex + 1, SECTION_ITEMS.length - 1))}
              aria-label={isFr ? 'Section suivante' : 'Next section'}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <T fr="Auto-défilement" en="Auto-scroll" />
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={`rounded-full border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${autoScrollEnabled ? 'border-primary text-primary-foreground' : ''}`}
              onClick={() => setAutoScrollEnabled((prev) => !prev)}
            >
              {autoScrollEnabled ? 'ON' : 'OFF'}
            </Button>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            <T fr={`Délai ${AUTO_SCROLL_DELAY / 1000}s`} en={`Delay ${AUTO_SCROLL_DELAY / 1000}s`} />
          </p>
        </div>
      </div>

      {/* Hero Section with DNA Helix */}
      <Section className="bg-gradient-to-b from-background via-secondary/30 to-background" id="hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            data-parallax
            data-parallax-speed="0.15"
          />
          <div
            className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
            data-parallax
            data-parallax-speed="0.1"
          />
          <div
            className="absolute -right-5 top-24 h-48 w-48 rounded-full border border-primary/30 bg-gradient-to-r from-transparent to-primary/40 opacity-70 animate-float-slow"
            data-parallax
            data-parallax-speed="0.05"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <DNAHelix />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
          </Canvas>
        </div>

        <div className="relative z-10 text-center space-y-8" data-animate>
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            <T
              fr="MEIA • Faculté des Sciences Ben M'Sik"
              en="MEIA • Faculty of Sciences Ben M'Sik"
            />
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            <T
              fr="Classification automatique des génotypes du virus de l'hépatite C"
              en="Automatic classification of Hepatitis C virus genotypes"
            />
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            <T
              fr="Une approche par apprentissage automatique et bioinformatique"
              en="A machine learning and bioinformatics approach"
            />
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center text-sm text-muted-foreground">
            <span>Youness Zouhairi</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Mouad Tace</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <T
              fr="Encadré par :"
              en="Supervised by:"
            />{' '}
            <span className="font-semibold text-foreground">Prof. Ichrak BENAMRI</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="animate-bounce mt-8"
            onClick={() => scrollToSection('problem')}
            aria-label={isFr ? 'Descendre à la section suivante' : 'Scroll to next section'}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </Section>

      {/* Scientific Problem */}
      <Section id="problem" className="bg-background">
        <div className="grid md:grid-cols-2 gap-12 items-center" data-animate>
          <div className="space-y-6">
            <Badge variant="secondary">
              <T fr="Contexte scientifique" en="Scientific context" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Le problème scientifique" en="The scientific problem" />
            </h2>

            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <T
                  fr={
                    <>
                      <strong>Le virus de l'hépatite C (VHC)</strong> est un enjeu de santé publique mondial affectant
                      des millions de personnes. Sa forte variabilité génétique a conduit à l'émergence de multiples
                      génotypes.
                    </>
                  }
                  en={
                    <>
                      <strong>Hepatitis C virus (HCV)</strong> is a major global public health issue affecting millions
                      worldwide. Its high genetic variability has led to the emergence of multiple genotypes.
                    </>
                  }
                />
              </p>

              <p>
                <T
                  fr={
                    <>
                      L'identification des génotypes est essentielle car elle influence directement la{' '}
                      <strong>réponse au traitement</strong> et le pronostic clinique. Cependant, les méthodes de
                      génotypage traditionnelles sont :
                    </>
                  }
                  en={
                    <>
                      Genotype identification is essential because it directly influences{' '}
                      <strong>treatment response</strong> and clinical prognosis. However, traditional genotyping
                      methods are:
                    </>
                  }
                />
              </p>

              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>
                  <T fr="Coûteuses et chronophages" en="Costly and time-consuming" />
                </li>
                <li>
                  <T fr="Exigent un équipement spécialisé" en="Require specialized equipment" />
                </li>
                <li>
                  <T
                    fr="Difficiles pour des génotypes biologiquement proches (G1 vs G2)"
                    en="Difficult for biologically close genotypes (G1 vs G2)"
                  />
                </li>
                <li>
                  <T
                    fr="Peu accessibles dans les contextes à ressources limitées"
                    en="Limited accessibility in resource-constrained settings"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-[400px] bg-secondary/20 rounded-lg overflow-hidden">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 25]} />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <FloatingParticles count={80} />
            </Canvas>
            <div
              className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur"
              data-parallax
              data-parallax-speed="0.2"
            >
              <T fr="Signal biologique" en="Biological signal" />
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20" data-animate>
          <p className="text-sm text-muted-foreground">
            <strong><T fr="Références :" en="References:" /></strong>{' '}
            <T
              fr="Rapport mondial OMS sur l'hépatite • Messina et al. (2015) • Base de données NCBI Virus"
              en="WHO Global Hepatitis Report • Messina et al. (2015) • NCBI Virus database"
            />
          </p>
        </div>

        <SectionSummary>
          <T
            fr="Le VHC impose un diagnostic rapide et accessible. L'automatisation du génotypage permettrait d'améliorer l'équité d'accès aux traitements tout en conservant la précision clinique."
            en="HCV demands rapid, accessible diagnosis. Automating genotyping could improve equity in treatment access while preserving clinical precision."
          />
        </SectionSummary>
      </Section>
      {/* Proposed Solution */}
      <Section id="solution" className="bg-secondary/30">
        <div className="text-center space-y-8 mb-16" data-animate>
          <Badge variant="secondary">
            <T fr="Notre approche" en="Our approach" />
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-balance">
            <T fr="Solution proposée" en="Proposed solution" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            <T
              fr="Classification automatique des génotypes à partir des séquences nucléotidiques via l'apprentissage automatique, comme alternative et complément aux méthodes de laboratoire."
              en="Automatic genotype classification directly from nucleotide sequences using machine learning, as an alternative and complement to wet-lab methods."
            />
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" data-animate>
          <Card className="p-6 space-y-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold">
              <T fr="Robustesse" en="Robustness" />
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <T
                fr="Haute précision même pour des génotypes biologiquement proches."
                en="High accuracy even for biologically similar genotypes."
              />
            </p>
          </Card>

          <Card className="p-6 space-y-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-semibold">
              <T fr="Interprétabilité" en="Interpretability" />
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <T
                fr="Compréhension claire des décisions du modèle pour renforcer la confiance clinique."
                en="Clear understanding of model decisions to strengthen clinical trust."
              />
            </p>
          </Card>

          <Card className="p-6 space-y-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-semibold">
              <T fr="Réalisme clinique" en="Clinical realism" />
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <T
                fr="Déploiement pragmatique, pensé pour les conditions réelles de diagnostic."
                en="Pragmatic deployment designed for real-world diagnostic constraints."
              />
            </p>
          </Card>
        </div>

        <div className="mt-12" data-animate>
          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-semibold">
              <T fr="Flux de décision" en="Decision flow" />
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1">
                <T fr="Séquence" en="Sequence" />
              </span>
              <span className="h-1 w-10 bg-primary/40 rounded-full" />
              <span className="rounded-full bg-primary/10 px-3 py-1">k-mers</span>
              <span className="h-1 w-10 bg-primary/40 rounded-full" />
              <span className="rounded-full bg-primary/10 px-3 py-1">
                <T fr="ML" en="ML" />
              </span>
              <span className="h-1 w-10 bg-primary/40 rounded-full" />
              <span className="rounded-full bg-primary/10 px-3 py-1">G1 / G2</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <T
                fr="Pipeline lisible et linéaire pour une interprétation rapide."
                en="Readable, linear pipeline for quick interpretation."
              />
            </p>
          </Card>
        </div>

        <div className="mt-12 space-y-6" data-animate>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-0.5 w-8 bg-primary/60" aria-hidden />
            <T fr="Story-board" en="Storyboard" />
            <span className="h-0.5 w-8 bg-primary/60" aria-hidden />
          </div>
              <div className="grid gap-4 md:grid-cols-3">
                {storyboardSteps.map((step, index) => (
                  <Card
                key={step.key}
                className="p-5 bg-background/80 border border-border/60 shadow-lg transition duration-500 hover:translate-y-1 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-xs font-mono text-primary tracking-[0.4em]">{step.number}</div>
                <h3 className="text-lg font-semibold">
                  <T fr={step.titleFr} en={step.titleEn} />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <T fr={step.descriptionFr} en={step.descriptionEn} />
                </p>
              </Card>
            ))}
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Nous proposons un pipeline ML centré sur la robustesse et la transparence, optimisé pour un usage clinique rapide et fiable."
            en="We propose an ML pipeline focused on robustness and transparency, optimized for fast and reliable clinical use."
          />
        </SectionSummary>
      </Section>

      {/* Data Collection */}
      <Section id="data" className="bg-background">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Pipeline de données" en="Data pipeline" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Collecte et prétraitement" en="Data collection & preprocessing" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">
                <T fr="Sources de données" en="Data sources" />
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <T
                      fr={<>Données génomiques publiques issues de <strong>NCBI Virus</strong> / GenBank</>}
                      en={<>Public genomic data from <strong>NCBI Virus</strong> / GenBank</>}
                    />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <T fr="Séquences nucléotidiques au format FASTA" en="FASTA format nucleotide sequences" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <T fr="Focus sur les génotypes 1 et 2" en="Focused on Genotype 1 and Genotype 2" />
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">
                <T fr="Étapes de prétraitement" en="Preprocessing steps" />
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <T fr="Conversion ARN → ADN (U → T)" en="RNA to DNA conversion (U → T)" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <T fr="Suppression des nucléotides ambigus" en="Ambiguous nucleotide removal" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <T fr="Filtrage par longueur et fenêtres fixes" en="Length filtering and fixed-length windows" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong>
                      <T fr="Stratégie stricte anti-fuite de données" en="Strict anti–data leakage strategy" />
                    </strong>
                  </span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6" data-animate>
            <Card className="p-6 space-y-4 bg-background/80 border border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  <T fr="Cartographie des signatures" en="Signatures snapshot" />
                </h3>
                <span className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
                  <T fr={`Intervalle ${AUTO_SCROLL_DELAY / 1000}s`} en={`Interval ${AUTO_SCROLL_DELAY / 1000}s`} />
                </span>
              </div>
              <div className="relative h-40">
                <svg viewBox="0 0 320 120" className="h-full w-full">
                  {coverageBars.map((bar, index) => {
                    const x = 40 + index * 60
                    const height = (bar.value / 100) * 80
                    return (
                      <g key={bar.key}>
                        <rect
                          x={x}
                          y={100 - height}
                          width={40}
                          height={height}
                          className="transition-all duration-1000 ease-out fill-primary/80 hover:fill-primary"
                        />
                        <text
                          x={x + 20}
                          y={100 - height - 6}
                          textAnchor="middle"
                          fontSize="10"
                          className="fill-foreground"
                        >
                          {bar.value}%
                        </text>
                      </g>
                    )
                  })}
                  <line x1="20" y1="100" x2="300" y2="100" stroke="#000" strokeOpacity="0.1" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                {coverageBars.map((bar) => (
                  <div key={bar.key} className="space-y-1">
                    <p className="font-semibold text-foreground">
                      <T fr={bar.labelFr} en={bar.labelEn} />
                    </p>
                    <div className="h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-accent/10 border-accent/20">
            <h3 className="text-xl font-semibold mb-4">
              <T fr="Stratégie anti-fuite" en="Anti-leakage strategy" />
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <T
                fr="Pour garantir la validité du modèle, nous avons appliqué un protocole strict de suppression des doublons et des chevauchements. Cela évite toute contamination du jeu de test et garantit des performances honnêtes."
                en="To ensure model validity, we applied a strict protocol to remove duplicates and overlaps. This prevents test-set contamination and guarantees honest performance."
              />
            </p>
          </Card>
        </div>

        <SectionSummary>
          <T
            fr="Des données propres et équilibrées, avec un protocole anti-fuite rigoureux, assurent une évaluation fidèle et reproductible."
            en="Clean, balanced data and a rigorous anti-leakage protocol ensure a faithful and reproducible evaluation."
          />
        </SectionSummary>
      </Section>

      {/* Feature Engineering */}
      <Section id="features" className="bg-secondary/30">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Représentation" en="Representation learning" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Ingénierie des caractéristiques" en="Feature engineering" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              <T
                fr="Transformer les séquences nucléotidiques brutes en représentations numériques exploitables."
                en="Transform raw nucleotide sequences into meaningful numerical representations."
              />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4">
              <div className="text-4xl font-mono font-bold text-primary">k-mer</div>
              <h3 className="text-xl font-semibold">
                <T fr="Extraction" en="Extraction" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Décomposer les séquences en sous-chaînes de longueur k pour capturer les motifs locaux."
                  en="Decompose sequences into overlapping k-length subsequences to capture local patterns."
                />
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="text-4xl font-mono font-bold text-primary">TF-IDF</div>
              <h3 className="text-xl font-semibold">
                <T fr="Pondération" en="Weighting" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Mettre en avant les k-mers discriminants via le poids TF-IDF."
                  en="Apply TF-IDF weighting to emphasize discriminative k-mers."
                />
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="text-4xl font-mono font-bold text-primary">Haute-D</div>
              <h3 className="text-xl font-semibold">
                <T fr="Espace" en="Space" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Construire un espace biologique riche qui capture les signatures spécifiques de génotypes."
                  en="Create a rich biological feature space that captures genotype-specific signatures."
                />
              </p>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">
                <T fr="Exemple de transformation" en="Transformation example" />
              </h3>
              <code className="text-sm font-mono text-muted-foreground block rounded-lg bg-background p-4">
                {isFr
                  ? 'ATCGATCG → [ATC, TCG, CGA, GAT, ATC, TCG, ...] → Vecteur TF-IDF'
                  : 'ATCGATCG → [ATC, TCG, CGA, GAT, ATC, TCG, ...] → TF-IDF vector'}
              </code>
            </Card>
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Les séquences sont converties en vecteurs informatifs via les k-mers et le TF-IDF, révélant des signatures discriminantes robustes."
            en="Sequences are converted into informative vectors via k-mers and TF-IDF, revealing robust discriminative signatures."
          />
        </SectionSummary>
      </Section>
      {/* ML Models */}
      <Section id="models" className="bg-background">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Apprentissage automatique" en="Machine learning" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Modèles évalués" en="Evaluated models" />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">
                <T fr="Régression logistique" en="Logistic regression" />
              </h3>
              <Separator />
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Classifieur linéaire probabiliste, très interprétable."
                  en="Linear probabilistic classifier with high interpretability."
                />
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-primary"><T fr="Forces :" en="Strengths:" /></strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><T fr="Coefficients interprétables" en="Interpretable coefficients" /></li>
                  <li><T fr="Probabilités bien calibrées" en="Well-calibrated probabilities" /></li>
                  <li><T fr="Faible variance" en="Low variance" /></li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">
                <T fr="Forêt aléatoire" en="Random forest" />
              </h3>
              <Separator />
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Ensemble d'arbres de décision avec agrégation bootstrap."
                  en="Ensemble of decision trees with bootstrap aggregation."
                />
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-primary"><T fr="Forces :" en="Strengths:" /></strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><T fr="Gère la non-linéarité" en="Handles non-linearity" /></li>
                  <li><T fr="Importance des variables" en="Feature importance" /></li>
                  <li><T fr="Robuste aux valeurs extrêmes" en="Robust to outliers" /></li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">
                <T fr="SVM linéaire" en="Linear SVM" />
              </h3>
              <Separator />
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="SVM calibré fournissant des probabilités exploitables."
                  en="SVM with calibrated probability estimates."
                />
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-primary"><T fr="Forces :" en="Strengths:" /></strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><T fr="Maximise la marge de séparation" en="Maximum margin separation" /></li>
                  <li><T fr="Efficace en espace haute dimension" en="Effective in high-dimensional space" /></li>
                  <li><T fr="Contrôle de la régularisation" en="Regularization control" /></li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Trois modèles complémentaires sont évalués pour équilibrer performance, robustesse et interprétabilité."
            en="Three complementary models are evaluated to balance performance, robustness, and interpretability."
          />
        </SectionSummary>
      </Section>

      {/* Experimental Setup */}
      <Section id="setup" className="bg-secondary/30">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Méthodologie" en="Methodology" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Protocole expérimental" en="Experimental setup" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold">
                <T fr="Jeu de données" en="Dataset" />
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded">
                  <span className="font-semibold">
                    <T fr="Séquences totales" en="Total sequences" />
                  </span>
                  <span className="text-2xl font-bold text-primary">140</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded">
                  <span className="font-semibold">
                    <T fr="Génotype 1" en="Genotype 1" />
                  </span>
                  <span className="text-2xl font-bold text-primary">70</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded">
                  <span className="font-semibold">
                    <T fr="Génotype 2" en="Genotype 2" />
                  </span>
                  <span className="text-2xl font-bold text-primary">70</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <T
                  fr="Échantillon parfaitement équilibré pour éviter le biais d'apprentissage."
                  en="Perfectly balanced sample to avoid class-imbalance bias."
                />
              </p>
            </Card>

            <Card className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold">
                <T fr="Stratégie de validation" en="Validation strategy" />
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>
                      <T
                        fr="Validation croisée stratifiée K-fold"
                        en="Stratified K-fold cross-validation"
                      />
                    </strong>{' '}
                    <T fr="pour préserver les proportions" en="to preserve class proportions" />
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <T fr="Multiples métriques pour une évaluation complète" en="Multiple metrics for a complete evaluation" />
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <T fr="Matrices de confusion et courbes ROC pour l'analyse visuelle" en="Confusion matrices and ROC curves for visual analysis" />
                  </span>
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-semibold">
                  <T fr="Métriques évaluées :" en="Metrics evaluated:" />
                </p>
                <p className="text-sm text-muted-foreground">
                  <T
                    fr="Exactitude • Précision • Rappel • F1-score • ROC-AUC"
                    en="Accuracy • Precision • Recall • F1-score • ROC-AUC"
                  />
                </p>
              </div>
            </Card>
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Un protocole rigoureux et équilibré garantit une évaluation robuste, fidèle aux contraintes biomédicales."
            en="A rigorous, balanced protocol ensures a robust evaluation aligned with biomedical constraints."
          />
        </SectionSummary>
      </Section>

      {/* Results */}
      <Section id="results" className="bg-background">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Performance" en="Performance" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Résultats expérimentaux" en="Experimental results" />
            </h2>
          </div>

          <Card className="p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">
                    <T fr="Modèle" en="Model" />
                  </th>
                  <th className="text-center p-4 font-semibold">
                    <T fr="Exactitude" en="Accuracy" />
                  </th>
                  <th className="text-center p-4 font-semibold">
                    <T fr="Précision" en="Precision" />
                  </th>
                  <th className="text-center p-4 font-semibold">
                    <T fr="Rappel" en="Recall" />
                  </th>
                  <th className="text-center p-4 font-semibold">
                    <T fr="F1-score" en="F1-score" />
                  </th>
                  <th className="text-center p-4 font-semibold">AUC</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-secondary/20">
                  <td className="p-4">
                    <T fr="Régression logistique" en="Logistic regression" />
                  </td>
                  <td className="text-center p-4 font-mono">0.9786</td>
                  <td className="text-center p-4 font-mono">1.0000</td>
                  <td className="text-center p-4 font-mono">0.9571</td>
                  <td className="text-center p-4 font-mono">0.9781</td>
                  <td className="text-center p-4 font-mono">1.0000</td>
                </tr>
                <tr className="border-b hover:bg-secondary/20 bg-accent/5">
                  <td className="p-4 font-semibold">
                    <T fr="Forêt aléatoire" en="Random forest" />
                  </td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                </tr>
                <tr className="hover:bg-secondary/20 bg-accent/5">
                  <td className="p-4 font-semibold">
                    <T fr="SVM linéaire (calibré)" en="Linear SVM (calibrated)" />
                  </td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                  <td className="text-center p-4 font-mono text-primary font-bold">1.0000</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3">
              <h4 className="font-semibold">
                <T fr="Régression logistique" en="Logistic regression" />
              </h4>
              <p className="text-sm text-muted-foreground">
                <T fr="Performance élevée et réaliste." en="High, realistic performance." />
              </p>
            </Card>
            <Card className="p-6 space-y-3 border-primary/50">
              <h4 className="font-semibold">
                <T fr="Forêt aléatoire" en="Random forest" />
              </h4>
              <p className="text-sm text-muted-foreground">
                <T fr="Scores parfaits, risque de surapprentissage." en="Perfect scores, potential overfitting risk." />
              </p>
            </Card>
            <Card className="p-6 space-y-3 border-primary/50">
              <h4 className="font-semibold">
                <T fr="SVM linéaire" en="Linear SVM" />
              </h4>
              <p className="text-sm text-muted-foreground">
                <T fr="Scores parfaits, question de généralisation." en="Perfect scores, generalization concern." />
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 space-y-4" data-animate>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  <T fr="Courbe ROC (améliorée)" en="ROC Curve (enhanced)" />
                </h3>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {isFr ? 'Référence OMS' : 'WHO reference'}
                </span>
              </div>
              <div className="w-full overflow-hidden rounded-lg border border-border/60 bg-background">
                <svg viewBox="0 0 640 420" className="min-w-[520px] w-full h-[320px]">
                  <rect x="0" y="0" width="640" height="420" fill="transparent" />
                  <g stroke="#c9c9c9" strokeWidth="1">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line key={`v-${i}`} x1={chartOriginX + i * (chartWidth / 5)} y1={chartOriginY} x2={chartOriginX + i * (chartWidth / 5)} y2={chartOriginY + chartHeight} />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line key={`h-${i}`} x1={chartOriginX} y1={chartOriginY + i * (chartHeight / 5)} x2={chartOriginX + chartWidth} y2={chartOriginY + i * (chartHeight / 5)} />
                    ))}
                  </g>
                  <g stroke="#111" strokeWidth="2">
                    <line x1={chartOriginX} y1={chartOriginY + chartHeight} x2={chartOriginX + chartWidth} y2={chartOriginY + chartHeight} />
                    <line x1={chartOriginX} y1={chartOriginY} x2={chartOriginX} y2={chartOriginY + chartHeight} />
                  </g>
                  <g fontSize="12" fill="#111">
                    {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v, i) => (
                      <text key={`x-${v}`} x={chartOriginX + i * (chartWidth / 5)} y={chartOriginY + chartHeight + 16} textAnchor="middle">
                        {v.toFixed(1)}
                      </text>
                    ))}
                    {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v, i) => (
                      <text key={`y-${v}`} x={chartOriginX - 8} y={chartOriginY + chartHeight - i * (chartHeight / 5)} textAnchor="end" dominantBaseline="middle">
                        {v.toFixed(1)}
                      </text>
                    ))}
                  </g>
                  <line x1={chartOriginX} y1={chartOriginY + chartHeight} x2={chartOriginX + chartWidth} y2={chartOriginY} stroke="#e11" strokeWidth="2" strokeDasharray="6 6" />
                  {rocLines.map((line) => (
                    <polyline
                      key={line.key}
                      points={getPolylinePoints(line.points)}
                      fill="none"
                      stroke={line.color}
                      strokeWidth="3"
                      className="roc-line"
                    />
                  ))}
                </svg>
              </div>
              <div className="grid gap-3 text-sm md:grid-cols-3">
                {rocLines.map((line) => (
                  <div key={line.key} className="flex items-center gap-3">
                    <span className="h-2 w-10 rounded-full" style={{ backgroundColor: line.color }} />
                    <p className="text-xs text-muted-foreground">
                      <T fr={line.labelFr} en={line.labelEn} />
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <T
                  fr="Réplique fidèle du tracé attendu, avec un AUC parfait pour chaque modèle."
                  en="Faithful rendition of the expected curve, with perfect AUC for each model."
                />
              </p>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              {confusionMatrices.map((matrix, index) => (
                <Card
                  key={matrix.key}
                  className="p-5 space-y-4"
                  data-animate
                  style={{ transitionDelay: `${index * 0.25}s` }}
                >
                  <p className="text-xs text-muted-foreground">
                    {isFr ? matrix.summaryFr : matrix.summaryEn}
                  </p>
                  <h3 className="text-sm font-semibold">
                    {isFr ? matrix.titleFr : matrix.titleEn}
                  </h3>
                  <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center">
                    <div className="flex flex-col gap-10 text-xs text-muted-foreground">
                      <span>True G1</span>
                      <span>True G2</span>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-1">
                        {matrix.matrix.flat().map((value, cellIndex) => (
                          <div
                            key={`${matrix.key}-${cellIndex}`}
                            className={`h-16 w-16 flex items-center justify-center text-sm font-semibold ${value >= 60 ? 'text-black' : 'text-white'}`}
                            style={{ backgroundColor: cellColor(value) }}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Pred G1</span>
                        <span>Pred G2</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-xs text-muted-foreground">
                      <div className="h-32 w-3 rounded-full bg-gradient-to-b from-[#f4e24b] via-[#7b3b9a] to-[#2a0a3d]" />
                      <div className="mt-2 flex flex-col items-center gap-1">
                        <span>70</span>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Les résultats sont excellents, mais les scores parfaits invitent à privilégier un modèle plus stable et interprétable pour un usage clinique."
            en="Results are excellent, but perfect scores suggest favoring a more stable and interpretable model for clinical use."
          />
        </SectionSummary>
      </Section>

      {/* Critical Analysis */}
      <Section id="analysis" className="bg-accent/5 border-y border-accent/20">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              <T fr="Analyse critique" en="Critical analysis" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Interprétation & sélection du modèle" en="Interpretation & model selection" />
            </h2>
          </div>

          <Card className="p-8 space-y-6 border-accent/50 bg-accent/10">
            <h3 className="text-2xl font-semibold">
              <T fr="Comprendre les scores parfaits" en="Understanding perfect scores" />
            </h3>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <T
                  fr={
                    <>
                      Des scores de 100 % sur un petit jeu de données (140 échantillons) sont un{' '}
                      <strong className="text-destructive">signal d'alerte potentiel</strong> en apprentissage automatique :
                    </>
                  }
                  en={
                    <>
                      Perfect 100% scores on a small dataset (140 samples) are a{' '}
                      <strong className="text-destructive">potential red flag</strong> in machine learning:
                    </>
                  }
                />
              </p>

              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold text-xl">!</span>
                  <span>
                    <T
                      fr={<><strong>Forêt aléatoire</strong> : variance élevée, propice au surapprentissage</>}
                      en={<><strong>Random forest</strong> : high variance, prone to overfitting</>}
                    />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold text-xl">!</span>
                  <span>
                    <T
                      fr={<><strong>SVM linéaire</strong> : marge parfaitement ajustée, risque de faible généralisation</>}
                      en={<><strong>Linear SVM</strong> : perfectly tuned margin, risk of poor generalization</>}
                    />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span>
                    <T
                      fr={<><strong>Régression logistique</strong> : 97,86 % et une variance plus faible</>}
                      en={<><strong>Logistic regression</strong> : 97.86% with lower variance</>}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4">
              <h3 className="text-xl font-semibold text-destructive">
                <T fr="Risques de surapprentissage" en="Overfitting risks" />
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><T fr="• Mémorisation au lieu d'apprentissage" en="• Memorization instead of learning" /></li>
                <li><T fr="• Baisse de performance sur de nouvelles données" en="• Poor performance on new data" /></li>
                <li><T fr="• Complexité excessive" en="• Excessive complexity" /></li>
                <li><T fr="• Fiabilité clinique limitée" en="• Limited clinical reliability" /></li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 border-primary">
              <h3 className="text-xl font-semibold text-primary">
                <T fr="Atouts de la régression logistique" en="Logistic regression advantages" />
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><T fr="• Variance réduite, stabilité accrue" en="• Lower variance, higher stability" /></li>
                <li><T fr="• Meilleure généralisation" en="• Better generalization" /></li>
                <li><T fr="• Coefficients interprétables" en="• Interpretable coefficients" /></li>
                <li><T fr="• Probabilités bien calibrées" en="• Well-calibrated probabilities" /></li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 bg-primary/10 border-primary">
            <p className="text-lg leading-relaxed text-center font-semibold text-balance">
              {isFr
                ? 'Dans un contexte clinique, un modèle légèrement imparfait mais stable et interprétable est préférable à un modèle parfait mais potentiellement surajusté.'
                : 'In a clinical context, a slightly imperfect but stable and interpretable model is preferable to a perfect but potentially overfitted one.'}
            </p>
          </Card>
        </div>

        <SectionSummary>
          <T
            fr="L'analyse critique confirme qu'un modèle stable et explicable est plus pertinent pour un usage médical."
            en="The critical analysis confirms that a stable and explainable model is more relevant for medical use."
          />
        </SectionSummary>
      </Section>
      {/* Final Model */}
      <Section id="final-model" className="bg-background">
        <div className="text-center space-y-8" data-animate>
          <Badge variant="secondary">
            <T fr="Décision finale" en="Final decision" />
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-balance">
            <T fr="Modèle retenu : Régression logistique" en="Selected model: Logistic regression" />
          </h2>

          <Card className="p-12 max-w-3xl mx-auto space-y-8">
            <div className="text-6xl font-bold text-primary">
              97,86 %
            </div>
            <p className="text-xl text-muted-foreground">
              <T fr="Performance équilibrée et fiabilité clinique." en="Balanced performance with clinical reliability." />
            </p>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">
                  <T fr="Justification :" en="Justification:" />
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><T fr="• Risque de surapprentissage réduit" en="• Reduced overfitting risk" /></li>
                  <li><T fr="• Coefficients interprétables et pertinents biologiquement" en="• Interpretable coefficients with biological relevance" /></li>
                  <li><T fr="• Utilisabilité clinique et confiance" en="• Clinical usability and trust" /></li>
                  <li><T fr="• Généralisation plus prévisible" en="• More predictable generalization" /></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-primary">
                  <T fr="Valeur clinique :" en="Clinical value:" />
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><T fr="• Probabilités fiables" en="• Reliable probabilities" /></li>
                  <li><T fr="• Décisions explicables pour les médecins" en="• Explainable decisions for physicians" /></li>
                  <li><T fr="• Robustesse aux variations des données" en="• Robust to data variations" /></li>
                  <li><T fr="• Déploiement clinique envisageable" en="• Suitable for clinical deployment" /></li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <SectionSummary>
          <T
            fr="La régression logistique combine performance, explicabilité et stabilité, répondant aux exigences médicales."
            en="Logistic regression combines performance, explainability, and stability, meeting medical requirements."
          />
        </SectionSummary>
      </Section>

      {/* Impact */}
      <Section id="impact" className="bg-secondary/30">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Contribution" en="Contribution" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Impact & valeur scientifique" en="Impact & scientific value" />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">
                <T fr="Génomique virale assistée par IA" en="AI-assisted viral genomics" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Met en évidence le potentiel de l'apprentissage automatique pour classer automatiquement les génotypes."
                  en="Demonstrates the potential of machine learning for automated genotype classification."
                />
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">
                <T fr="Aide à la décision clinique" en="Clinical decision support" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Offre une alternative rapide et économique pour planifier les traitements."
                  en="Provides a fast, cost-effective alternative for treatment planning."
                />
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">
                <T fr="Valeur pédagogique" en="Educational value" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Sert d'étude de cas complète en bioinformatique et en sélection de modèles ML."
                  en="Serves as a comprehensive case study in bioinformatics and ML model selection."
                />
              </p>
            </Card>
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Le projet démontre l'impact scientifique et éducatif d'une approche ML explicable en génomique virale."
            en="The project highlights the scientific and educational impact of explainable ML in viral genomics."
          />
        </SectionSummary>
      </Section>

      {/* Future Perspectives */}
      <Section id="perspectives" className="bg-background">
        <div className="space-y-12" data-animate>
          <div className="text-center space-y-4">
            <Badge variant="secondary">
              <T fr="Perspectives" en="Future work" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Perspectives & directions futures" en="Perspectives & future directions" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">
                <T fr="Couverture étendue" en="Extended genotype coverage" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Étendre la classification à tous les génotypes majeurs (G1–G7) et aux sous-types."
                  en="Expand classification to all major HCV genotypes (G1–G7) and subtypes."
                />
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">
                <T fr="Validation externe" en="External validation" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Tester le modèle sur des cohortes indépendantes et multi-géographiques."
                  en="Test the model on independent cohorts from different regions and sequencing platforms."
                />
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">
                <T fr="Intégration clinique" en="Clinical metadata integration" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Ajouter des métadonnées patient pour améliorer la précision et la pertinence."
                  en="Incorporate patient metadata to improve accuracy and clinical relevance."
                />
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold">
                <T fr="Modèles hybrides" en="Hybrid models" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <T
                  fr="Explorer des réseaux avec attention tout en conservant l'interprétabilité."
                  en="Explore attention-based networks while maintaining interpretability."
                />
              </p>
            </Card>
          </div>
        </div>

        <SectionSummary>
          <T
            fr="Les prochaines étapes visent à étendre la couverture génomique et à renforcer la validation clinique."
            en="Next steps aim to expand genomic coverage and strengthen clinical validation."
          />
        </SectionSummary>
      </Section>

      {/* GitHub / Reproducibility */}
      <Section id="github" className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="text-center space-y-12" data-animate>
          <div className="space-y-4">
            <Badge variant="secondary">
              <T fr="Science ouverte" en="Open science" />
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              <T fr="Reproductibilité & transparence" en="Reproducibility & transparency" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              <T
                fr="Tout le code, les pipelines de prétraitement et les modèles entraînés sont accessibles publiquement."
                en="All code, preprocessing pipelines, and trained models are publicly available."
              />
            </p>
          </div>

          <Card className="p-12 max-w-2xl mx-auto space-y-8">
            <Github className="h-24 w-24 mx-auto text-primary animate-[floatSlow_8s_ease-in-out_infinite]" />

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                <T fr="Dépôt GitHub" en="GitHub repository" />
              </h3>
              <code className="block p-4 bg-secondary rounded text-sm">
                github.com/AshVenn/hepatitis-dna-detection
              </code>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://github.com/AshVenn/hepatitis-dna-detection" target="_blank" rel="noopener noreferrer">
                  <T fr="Consulter le dépôt" en="View repository" />
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://drive.google.com/file/d/1zZPmeF91Bwa7tJgNxpoKqLoGJaz7Uwcz/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <T fr="Rapport de projet" en="Project report" />
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground">
              <T
                fr="Inclut : scripts de prétraitement • extraction de caractéristiques • entraînement des modèles • notebooks d'évaluation • documentation"
                en="Includes: preprocessing scripts • feature extraction • model training • evaluation notebooks • documentation"
              />
            </p>
          </Card>
        </div>

        <SectionSummary>
          <T
            fr="La transparence du projet facilite la reproduction des résultats et l'amélioration par la communauté."
            en="Project transparency enables reproducibility and community-driven improvements."
          />
        </SectionSummary>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              <T fr="Merci" en="Thank you" />
            </h3>
            <p className="text-primary-foreground/80">
              <T
                fr="Master of Excellence in Artificial Intelligence (MEIA)"
                en="Master of Excellence in Artificial Intelligence (MEIA)"
              />
            </p>
            <p className="text-primary-foreground/80">
              <T fr="Faculté des Sciences Ben M'Sik (FSBM)" en="Faculty of Sciences Ben M'Sik (FSBM)" />
            </p>
          </div>

          <Separator className="bg-primary-foreground/20" />

          <div className="flex gap-4 items-center justify-center text-sm">
            <span>Youness Zouhairi</span>
            <Separator orientation="vertical" className="h-4 bg-primary-foreground/20" />
            <span>Mouad Tace</span>
          </div>

          <p className="text-xs text-primary-foreground/60">
            {new Date().getFullYear()} • <T fr="Projet académique" en="Academic project" />
          </p>
        </div>
      </footer>

      <style jsx global>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        [data-animate].is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        html[lang='fr'] .lang-en { display: none; }
        html[lang='en'] .lang-fr { display: none; }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes barPulse {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1); }
        }
        @keyframes heatPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes pulseLine {
          0%, 100% { transform: translateX(-20%); opacity: 0.4; }
          50% { transform: translateX(20%); opacity: 1; }
        }
        @keyframes drawLine {
          0% { stroke-dasharray: 0 400; }
          100% { stroke-dasharray: 400 0; }
        }
      `}</style>
    </main>
  )
}
