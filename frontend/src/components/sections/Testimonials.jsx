import { useState, useEffect, useRef } from 'react'
import imgAndi from '../../assets/Andi.webp'
import imgSalsa from '../../assets/Salsa.webp'
import imgMaria from '../../assets/Maria.webp'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const testimonialsData = [
  { img: imgAndi,  name: 'Andi Pratama' },
  { img: imgSalsa, name: 'Salsabila Rahma' },
  { img: imgMaria, name: 'Maria Wijaya' },
]

const n = testimonialsData.length

const Testimonials = () => {
  const { t } = useLanguage()
  const [startIndex, setStartIndex] = useState(0)
  const [animClass, setAnimClass] = useState('')
  const lockRef = useRef(false)

  const slide = (dir) => {
    if (lockRef.current) return
    lockRef.current = true
    const cls = dir === 'next' ? 'slide-left' : 'slide-right'
    setAnimClass(cls)
    setStartIndex(i => (i + (dir === 'next' ? 1 : -1) + n) % n)
    setTimeout(() => {
      setAnimClass('')
      lockRef.current = false
    }, 250)
  }

  useEffect(() => {
    const timerId = setInterval(() => slide('next'), 4000)
    return () => clearInterval(timerId)
  }, [])

  const visible = [0, 1, 2].map(i => {
    const idx = (startIndex + i) % n
    return {
      ...testimonialsData[idx],
      role: t.testimonials.items[idx].role,
      text: t.testimonials.items[idx].text,
      rating: '4.9/5'
    }
  })

  return (
    <>
      <style>{`
        .testimonials {
          background: var(--accent);
          padding: 80px 5% 100px;
          position: relative;
          overflow: hidden;
        }

        .testimonials__deco-circle {
          position: absolute;
          border-radius: 50%;
          border: 60px solid rgba(255,255,255,0.06);
          pointer-events: none;
        }
        .testimonials__deco-circle--tl { width: 400px; height: 400px; bottom: -100px; left: -100px; }
        .testimonials__deco-circle--br { width: 300px; height: 300px; top: -80px; right: -80px; }

        .testimonials__inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .testimonials__title {
          text-align: center;
          color: white;
          font-weight: 900;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          letter-spacing: 1px;
          margin-bottom: 70px;
        }

        /* Grid */
        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        /* Card */
        .testimonials__card {
          background: white;
          border-radius: 20px;
          padding: 24px 20px 24px 110px;
          position: relative;
          min-height: 200px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
        }

        .testimonials__card--active {
          outline: 2px solid rgba(255,255,255,0.6);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transform: translateY(-4px);
        }

        /* Slide animation */
        .testimonials__card--next {
          animation: slideNext 0.3s ease;
        }
        .testimonials__card--prev {
          animation: slidePrev 0.3s ease;
        }

        @keyframes slideNext {
          from { opacity: 0.4; transform: translateX(20px) translateY(-4px); }
          to   { opacity: 1;   transform: translateX(0)    translateY(-4px); }
        }
        @keyframes slidePrev {
          from { opacity: 0.4; transform: translateX(-20px) translateY(-4px); }
          to   { opacity: 1;   transform: translateX(0)     translateY(-4px); }
        }

        /* Photo overflow top-left */
        .testimonials__photo-col {
          position: absolute;
          left: -10px;
          top: -30px;
          width: 110px;
          height: 150px;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .testimonials__photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        /* Body */
        .testimonials__card-body { position: relative; }

        .testimonials__name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--text-dark);
          margin-bottom: 2px;
        }

        .testimonials__role {
          font-size: 11px;
          color: #475569;
          margin-bottom: 4px;
        }

        .testimonials__rating {
          font-weight: 800;
          font-size: 13px;
          color: #c23a2b;
          margin-bottom: 10px;
        }

        .testimonials__text {
          font-size: 12px;
          color: #334155;
          line-height: 1.7;
        }

        /* Controls: arrow + dots + arrow */
        .testimonials__controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .testimonials__arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          flex-shrink: 0;
        }

        .testimonials__arrow:hover {
          background: rgba(255,255,255,0.45);
          transform: scale(1.1);
        }

        /* Dots */
        .testimonials__dots {
          display: flex;
          gap: 10px;
        }

        .testimonials__dot {
          width: 28px; height: 8px;
          border-radius: 4px;
          border: none;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .testimonials__dot--active {
          background: white;
          width: 40px;
        }

        /* Carousel slide animation */
        .testimonials__grid {
          overflow: visible;
        }

        .testimonials__grid.slide-left {
          animation: slideLeft 0.25s ease;
        }

        .testimonials__grid.slide-right {
          animation: slideRight 0.25s ease;
        }

        @keyframes slideLeft {
          from { transform: translateX(30px); opacity: 0.6; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        @keyframes slideRight {
          from { transform: translateX(-30px); opacity: 0.6; }
          to   { transform: translateX(0);     opacity: 1; }
        }

        /* Center card slightly elevated */
        .testimonials__card--center {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.18);
          outline: 2px solid rgba(255,255,255,0.5);
        }

        @media (max-width: 900px) {
          .testimonials__grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          /* Sembunyikan card ketiga di tablet */
          .testimonials__card:last-child {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .testimonials {
            padding: 60px 5% 80px;
          }

          .testimonials__grid {
            grid-template-columns: 1fr;
          }

          /* Tampilkan hanya 1 card di mobile */
          .testimonials__card:not(:first-child) {
            display: none;
          }

          .testimonials__card {
            padding: 24px 20px 24px 100px;
            min-height: 180px;
          }

          .testimonials__photo-col {
            width: 90px;
            height: 130px;
            left: -5px;
            top: -20px;
          }

          .testimonials__title {
            margin-bottom: 50px;
          }
        }
      `}</style>
      <section id="blog" className="testimonials">
        <div className="testimonials__deco-circle testimonials__deco-circle--tl" />
        <div className="testimonials__deco-circle testimonials__deco-circle--br" />

        <div className="testimonials__inner">
          <h2 className="testimonials__title">{t.testimonials.title}</h2>

          <div className={`testimonials__grid ${animClass}`}>
            {visible.map((t, i) => (
              <div key={`${startIndex}-${i}`} className={`testimonials__card ${i === 1 ? 'testimonials__card--center' : ''}`}>
                <div className="testimonials__photo-col">
                  <img src={t.img} alt={t.name} className="testimonials__photo" />
                </div>
                <div className="testimonials__card-body">
                  <div className="testimonials__name">{t.name}</div>
                  <div className="testimonials__role">{t.role}</div>
                  <div className="testimonials__rating">★ {t.rating}</div>
                  <p className="testimonials__text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__controls">
            <button className="testimonials__arrow" aria-label="Testimoni sebelumnya" onClick={() => slide('prev')}>
              <ChevronLeft size={18} />
            </button>
            <div className="testimonials__dots">
              {testimonialsData.map((_, i) => (
                <button key={i}
                  aria-label={`Pilih testimoni ${i + 1}`}
                  className={`testimonials__dot ${i === startIndex ? 'testimonials__dot--active' : ''}`}
                  onClick={() => slide(i > startIndex ? 'next' : 'prev')} />
              ))}
            </div>
            <button className="testimonials__arrow" aria-label="Testimoni selanjutnya" onClick={() => slide('next')}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials