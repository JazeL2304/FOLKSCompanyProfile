import { useEffect, useRef, useState } from 'react'
import '../../styles/WhyUs.css'
import iconLightbulb from '../../assets/Lightbulb.png'
import iconMagnifier from '../../assets/Magnifier.png'
import iconShield from '../../assets/Shield.png'

const features = [
  { icon: iconLightbulb, title: 'INNOVATIVE METHOD', desc: 'Metode pembelajaran terstruktur yang di rancang untuk meningkatkan literasi, kokunikasi, dan critical thinking secara efektif.' },
  { icon: iconMagnifier, title: 'RESEARCH & DATA DRIVEN', desc: 'Dikembangkan berdasarkan riset dan pengalaman bertahun-tahun dengan pendekatan yang teruji dan terukur.' },
  { icon: iconShield, title: 'TRUSTED & GROWING', desc: 'Dipercaya oleh ratusan peserta dan terus berkembang menjadi insitusi pembelajaran modern berstandar internasional.' },
]

const WhyUs = () => {
  const sectionRef = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [cardVisible, setCardVisible] = useState([false, false, false])

  useEffect(() => {
    // Simpan posisi absolut section dari top of page
    const sectionTop = sectionRef.current?.offsetTop ?? 9999

    const handleScroll = () => {
      if (triggered) return
      // Trigger ketika scroll sudah melewati awal section
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 200) {
        setTriggered(true)
        features.forEach((_, i) => {
          setTimeout(() => {
            setCardVisible(prev => {
              const next = [...prev]
              next[i] = true
              return next
            })
          }, i * 180)
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [triggered])

  return (
    <section className="whyus" ref={sectionRef}>
      <div className="whyus__inner">
        <div className={`whyus__header ${triggered ? 'whyus__header--visible' : ''}`}>
          <h2 className="whyus__title">KENAPA HARUS <span>FOLKS</span> ?</h2>
          <p className="whyus__subtitle">Solusi pembelajaran dan pengembangan berbasis metode modern dan standard global</p>
        </div>
        <div className="whyus__grid">
          {features.map((f, i) => (
            <div key={i} className={`whyus__card ${cardVisible[i] ? 'whyus__card--visible' : ''}`}>
              <div className="whyus__card-redline" />
              <div className="whyus__card-icon-wrap">
                <img src={f.icon} alt={f.title} className="whyus__card-icon" />
              </div>
              <h3 className="whyus__card-title">{f.title}</h3>
              <p className="whyus__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs