import { useEffect, useRef, useState } from 'react'
import '../../styles/Programs.css'
import imgKids from '../../assets/EnglishForKids.jpg'
import imgAcademic from '../../assets/AcademicEnglish.jpg'
import imgPro from '../../assets/ProfessionalEnglish.jpg'
import { Target, GraduationCap, Briefcase } from 'lucide-react'

const programs = [
  { img: imgKids,     icon: <Target size={13} />,       badge: 'Untuk Anak',  title: 'ENGLISH FOR KIDS',      desc: 'Membantu anak-anak menguasai English reading, writing, listening, dan speaking secara menyenangkan dan efektif.' },
  { img: imgAcademic, icon: <GraduationCap size={13} />, badge: 'Akademik',    title: 'ACADEMIC ENGLISH',      desc: 'Fokus pada peningkatan kemampuan English untuk menunjang prestasi akademik di sekolah dan universitas.' },
  { img: imgPro,      icon: <Briefcase size={13} />,     badge: 'Profesional', title: 'PROFESIONAL ENGLISH',   desc: 'Menyediakan pelatihan English khusus profesional untuk komunikasi yang percaya diri di dunia kerja.' },
]

const Programs = () => {
  const sectionRef = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [cardVisible, setCardVisible] = useState([false, false, false])

  useEffect(() => {
    const sectionTop = sectionRef.current?.offsetTop ?? 9999

    const handleScroll = () => {
      if (triggered) return
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 200) {
        setTriggered(true)
        programs.forEach((_, i) => {
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
    <section id="program" className="programs" ref={sectionRef}>
      <div className="programs__inner">

        <div className={`programs__header ${triggered ? 'programs__header--visible' : ''}`}>
          <h2 className="programs__title">PROGRAM UNGGULAN</h2>
          <p className="programs__subtitle">Pilih program yang sesuai dengan kebutuhan dan tujuan belajar kamu</p>
        </div>

        <div className="programs__grid">
          {programs.map((p, i) => (
            <div key={i} className={`programs__card ${cardVisible[i] ? 'programs__card--visible' : ''}`}>
              <div className="programs__card-img-wrap">
                <img src={p.img} alt={p.title} className="programs__card-img" />
                <span className="programs__card-badge">{p.icon} {p.badge}</span>
              </div>
              <div className="programs__card-body">
                <h3 className="programs__card-title">{p.title}</h3>
                <p className="programs__card-desc">{p.desc}</p>
                <button className="programs__card-btn">Pelajari Selengkapnya →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="programs__cta">
          <button className="programs__cta-btn">Lihat Semua Program</button>
        </div>

      </div>
    </section>
  )
}

export default Programs