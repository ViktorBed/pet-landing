import { useState } from 'react'
import { faqs } from '../data/casinos.js'
import { Plus } from './icons.jsx'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section section--tinted" id="faq">
      <div className="container container--narrow">
        <div className="section__head" data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2>
            Fair <em>questions</em>
          </h2>
        </div>

        <div className="faq" data-reveal>
          {faqs.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.q} className={`faq__item ${open ? 'is-open' : ''}`}>
                <button
                  className="faq__q"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <Plus className="faq__icon" width={18} height={18} />
                </button>
                <div className="faq__a-wrap">
                  <p className="faq__a">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
