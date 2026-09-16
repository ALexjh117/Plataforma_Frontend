import type { ReactNode } from 'react'
import { heroImage } from '../assets/images'
import Button from './Button'

type HeroProps = {
  title: ReactNode
  description: string
  primaryCtaText: string
  primaryCtaHref?: string
  image?: string
}

export default function Hero({
  title,
  description,
  primaryCtaText,
  primaryCtaHref = '#oferta',
  image = heroImage,
}: HeroProps) {
  return (
    <section className="hero-section" id="inicio" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
        <Button
          as="a"
          href={primaryCtaHref}
          variant="primary"
          className="hero-button"
          icon={<span aria-hidden="true">→</span>}
        >
          {primaryCtaText}
        </Button>
      </div>
    </section>
  )
}
