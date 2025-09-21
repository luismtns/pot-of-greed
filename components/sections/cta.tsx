export default function CTA({ id, title, body, button, ctaImage }: any) {
  return (
    <section id={id} className='lp-cta'>
      <div className='container text-center'>
        {ctaImage && <img src={ctaImage} alt='CTA image' className='cta-media' />}
        <h2 className='cta-title'>{title}</h2>
        {body && <p className='cta-body'>{body}</p>}
        {button && button.href && (
          <div className='cta-actions'>
            <a href={button.href} role='button' aria-label={button.label} className='btn'>
              {button.label}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
