import { useState, useEffect, useRef } from 'react'
import '../../styles/Testimonials.css'
import imgAndi from '../../assets/Andi.jpg'
import imgSalsa from '../../assets/Salsa.jpg'
import imgMaria from '../../assets/Maria.jpg'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const testimonials = [
  { img: imgAndi,  name: 'Andi Pratama',    role: 'Mahasiswa',      rating: '4.9/5', text: 'Programnya sangat terstruktur dan mudah dipahami. Saya jadi lebih percaya diri saat presentasi dalam bahasa Inggris. Mentor juga responsif dan benar-benar membantu perkembangan saya.' },
  { img: imgSalsa, name: 'Salsabila Rahma', role: 'Karyawan Swasta', rating: '4.9/5', text: 'Materinya praktis dan langsung bisa diterapkan di dunia kerja. Saya merasa kemampuan komunikasi saya meningkat signifikan dalam waktu yang relatif singkat.' },
  { img: imgMaria, name: 'Maria Wijaya',    role: 'Orang Tua Murid', rating: '4.9/5', text: 'Saya melihat perkembangan yang sangat positif pada anak saya sejak bergabung di Intelligence Corp. Kemampuan bahasa Inggrisnya meningkat dan ia menjadi lebih percaya diri.' },
]

const n = testimonials.length

const Testimonials = () => {
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
    const t = setInterval(() => slide('next'), 4000)
    return () => clearInterval(t)
  }, [])

  const visible = [0, 1, 2].map(i => testimonials[(startIndex + i) % n])

  return (
    <section id="promo" className="testimonials">
      <div className="testimonials__deco-circle testimonials__deco-circle--tl" />
      <div className="testimonials__deco-circle testimonials__deco-circle--br" />

      <div className="testimonials__inner">
        <h2 className="testimonials__title">WHAT OUR LOVELY CLIENTS SAY ?</h2>

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
          <button className="testimonials__arrow" onClick={() => slide('prev')}>
            <ChevronLeft size={18} />
          </button>
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button key={i}
                className={`testimonials__dot ${i === startIndex ? 'testimonials__dot--active' : ''}`}
                onClick={() => slide(i > startIndex ? 'next' : 'prev')} />
            ))}
          </div>
          <button className="testimonials__arrow" onClick={() => slide('next')}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials