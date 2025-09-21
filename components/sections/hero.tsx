type Props = {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  heroImage?: string
}

export default function Hero({ title, subtitle, ctaLabel, ctaHref, heroImage }: Props) {
  return (
    <section className='lp-hero'>
      <div className='container'>
        {heroImage && <img src={heroImage} alt='Hero image' className='hero-media' />}
        <h1 className='hero-title'>{title}</h1>
        {subtitle && <p className='hero-sub'>{subtitle}</p>}
        {ctaLabel && ctaHref && (
          <div className='hero-cta'>
            <a href={ctaHref} role='button' aria-label={ctaLabel} className='btn'>
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
