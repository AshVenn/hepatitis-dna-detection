'use client' 
 
import { Canvas } from '@react-three/fiber' 
import { OrbitControls, PerspectiveCamera } from '@react-three/drei' 
import { DNAHelix } from '@/components/dna-helix' 
import { FloatingParticles } from '@/components/floating-particles' 
import { Section } from '@/components/section' 
import { useSmoothScroll } from '@/hooks/use-smooth-scroll' 
import { Card } from '@/components/ui/card' 
import { Badge } from '@/components/ui/badge' 
import { Button } from '@/components/ui/button' 
import { Separator } from '@/components/ui/separator' 
import { ChevronDown, ChevronUp, ExternalLink, Github, Moon, Sun } from 'lucide-react' 
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react' 
 
const PROJECT_REPORT_URL = 'https://drive.google.com/file/d/1zZPmeF91Bwa7tJgNxpoKqLoGJaz7Uwcz/view?usp=sharing' 
 
const SECTION_ITEMS = [ 
  { id: 'hero', labelFr: 'Ouverture', labelEn: 'Opening' }, 
  { id: 'problem', labelFr: 'Défi', labelEn: 'Challenge' }, 
  { id: 'solution', labelFr: 'Solution', labelEn: 'Solution' }, 
  { id: 'data', labelFr: 'Données', labelEn: 'Data' }, 
  { id: 'features', labelFr: 'Caractéristiques', labelEn: 'Features' }, 
  { id: 'models', labelFr: 'Modèles', labelEn: 'Models' }, 
  { id: 'setup', labelFr: 'Protocole', labelEn: 'Protocol' }, 
  { id: 'results-roc', labelFr: 'ROC & matrices', labelEn: 'ROC & matrices' }, 
  { id: 'results-table', labelFr: 'Tableau', labelEn: 'Performance' }, 
  { id: 'analysis-interpretation', labelFr: 'Interprétation', labelEn: 'Interpretation' }, 
  { id: 'analysis-selection', labelFr: 'Sélection', labelEn: 'Selection' }, 
  { id: 'final-model', labelFr: 'Modèle final', labelEn: 'Final model' }, 
  { id: 'impact', labelFr: 'Impact', labelEn: 'Impact' }, 
  { id: 'perspectives', labelFr: 'Perspectives', labelEn: 'Perspectives' }, 
  { id: 'github', labelFr: 'Reproductibilité', labelEn: 'Reproducibility' }, 
] 
 
const storyboardSteps = [ 
  { 
    key: 'capture', 
    number: '01', 
    titleFr: 'Capture multimodale', 
    titleEn: 'Multimodal capture', 
    descriptionFr: 'Séquences alignées et nettoyées pour préserver le signal biologique.', 
    descriptionEn: 'Aligned and cleaned sequences preserve the biological signal.', 
  }, 
  { 
    key: 'transform', 
    number: '02', 
    titleFr: 'Transformation k-mer', 
    titleEn: 'k-mer transformation', 
    descriptionFr: 'k-mers, TF-IDF et réduction créent des signatures distinctives.', 
    descriptionEn: 'k-mers, TF-IDF, and embedding extract unique signatures.', 
  }, 
  { 
