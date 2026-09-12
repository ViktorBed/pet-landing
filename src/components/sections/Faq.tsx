import { useState } from 'react'
import { faqs } from '../../data/casinos.ts'
import { Plus } from '../ui/icons.tsx'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
              <div key={item.question} className={`faq__item ${open ? 'is-open' : ''}`}>
                <button
                  className="faq__q"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <Plus className="faq__icon" width={18} height={18} />
                </button>
                <div className="faq__a-wrap">
                  <p className="faq__a">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
