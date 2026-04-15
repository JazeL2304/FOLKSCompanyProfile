import { useEffect, useRef, useState } from 'react'
import bulbIcon from '../../../assets/Bulb.png'
import excellenceIcon from '../../../assets/Excellence.png'
import integrityIcon from '../../../assets/Integrity.png'
import '../../../styles/AboutMission.css'

const missions = [
  {
    icon: bulbIcon,
    title: 'Innovation',
    desc: 'We are committed to pioneering cutting-edge solutions that drive business growth and set new industry standards.',
    bg: '#fff8f0',
  },
  {
    icon: excellenceIcon,  // ← ganti dari magnifierIcon
    title: 'Excellence',
    desc: 'Our pursuit of quality and performance ensures exceptional results for our clients.',
    bg: '#fff8f0',
  },
  {
    icon: integrityIcon,   // ← ganti dari shieldIcon
    title: 'Integrity',
    desc: 'We uphold the highest standards of transparency, honesty, and ethical conduct in all our endeavors.',
    bg: '#f0f5ff',
  },
]

const AboutMission = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 100) {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="about-mission" ref={sectionRef}>
      <div className="about-mission__container">
        <div className={`about-mission__header ${isVisible ? 'am-visible' : ''}`}>
          <h2 className="about-mission__title">Our Mission & Values</h2>
          <p className="about-mission__subtitle">Driving Impact Through Technology & Integrity</p>
        </div>

        <div className="about-mission__grid">
          {missions.map((m, i) => (
            <div
              key={i}
              className={`about-mission__card ${isVisible ? 'am-card-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="about-mission__icon-wrap" style={{ background: m.bg }}>
                <img src={m.icon} alt={m.title} className="about-mission__icon-img" />
              </div>
              <h3 className="about-mission__card-title">{m.title}</h3>
              <p className="about-mission__card-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMission