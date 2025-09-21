type Item = { title: string; desc?: string; icon?: string }

export default function Features({ items }: { items: Item[] }) {
  return (
    <section className='lp-features'>
      <div className='grid'>
        {items.map((it, i) => (
          <div key={i} className='item'>
            {it.icon && <img src={it.icon} alt={`${it.title} icon`} className='icon' />}
            <div>
              <h3 className='item-title'>{it.title}</h3>
              {it.desc && <p className='item-desc'>{it.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
