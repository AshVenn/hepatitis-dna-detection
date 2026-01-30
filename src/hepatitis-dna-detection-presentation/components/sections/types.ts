import { ReactNode } from "react"

export type Translator = ({ fr, en }: { fr: ReactNode; en: ReactNode }) => ReactNode

export interface CommonSectionProps {
  T: Translator
  lang: "fr" | "en"
  isFr: boolean
}
