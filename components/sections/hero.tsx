type CTA = { label?: string; href?: string }
type HeroProps = { title?: string; subtitle?: string; cta?: CTA }

export default function Hero({ props }: { props?: HeroProps }) {
  const { title, subtitle, cta } = props || {}
  return (
    <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', margin: 0 }}>{title}</h1>
      {subtitle ? <p style={{ marginTop: '0.5rem' }}>{subtitle}</p> : null}
      {cta ? (
        <p style={{ marginTop: '1rem' }}>
          <a href={cta.href}>{cta.label}</a>
        </p>
      ) : null}
    </section>
  )
}
