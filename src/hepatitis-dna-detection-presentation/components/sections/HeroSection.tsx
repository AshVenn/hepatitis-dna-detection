import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DNAHelix } from "@/components/dna-helix"
import { CommonSectionProps } from "./types"

interface HeroSectionProps extends CommonSectionProps {
  scrollToNext: () => void
}

// Original hero layout (text block centered above the helix)
export function HeroSection({ T, isFr, scrollToNext }: HeroSectionProps) {
  return (
    <Section
      id="hero"
      className="overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background text-foreground"
    >
      {/* Background accents */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8" data-animate>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          <T fr="MEIA • Faculté des Sciences Ben M'Sik" en="MEIA • Faculty of Sciences Ben M'Sik" />
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
          <span className="h-4 w-px bg-border" />
          <span>Mouad Tace</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <T fr="Encadré par :" en="Supervised by:" />{" "}
          <span className="font-semibold text-foreground">Prof. Ichrak BENAMRI</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="animate-bounce mt-2"
          onClick={scrollToNext}
          aria-label={isFr ? "Descendre à la section suivante" : "Scroll to next section"}
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      {/* Helix fills the background but sits behind the text */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <DNAHelix />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </div>
    </Section>
  )
}
