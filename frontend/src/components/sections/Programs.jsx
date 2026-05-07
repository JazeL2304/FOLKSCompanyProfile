import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Programs.css'

import sd1 from '../../assets/Program/sd/sd1.png'
import smp1 from '../../assets/Program/smp/smp1.png'
import sma1 from '../../assets/Program/sma/sma1.png'
import bgProgram from '../../assets/background-program.png'

import { BookOpen, GraduationCap, Award } from 'lucide-react'

const programs = [
  {
    img: sd1,
    icon: <BookOpen size={13} />,
    badge: 'SD',
    title: 'ENGLISH FOR KIDS',
    desc: 'Membantu anak-anak SD menguasai English reading, writing, listening, dan speaking secara menyenangkan dan efektif.',
    program: 'Business English',
    price: '450',
    level: 'SD',
    category: 'General',
  },
  {
    img: smp1,
    icon: <GraduationCap size={13} />,
    badge: 'SMP',
    title: 'ACADEMIC ENGLISH',
    desc: 'Fokus pada peningkatan kemampuan English untuk menunjang prestasi akademik siswa SMP di sekolah.',
    program: 'Business English',
    price: '450',
    level: 'SMP',
    category: 'General',
  },
  {
    img: sma1,
    icon: <Award size={13} />,
    badge: 'SMA',
    title: 'PROFESSIONAL ENGLISH',
    desc: 'Menyediakan pelatihan English untuk siswa SMA yang ingin siap menghadapi dunia kerja dan universitas.',
    program: 'Business English',
    price: '450',
    level: 'SMA',
    category: 'General',
  },
]

const Programs = () => {
  const navigate = useNavigate()
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
    <section
      id="program"
      className="programs"
      ref={sectionRef}
      style={{
        backgroundImage: `url(${bgProgram})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay putih tipis biar background tidak terlalu ramai */}
      <div className="programs__overlay" />

      <div className="programs__inner">

        <div className={`programs__header ${triggered ? 'programs__header--visible' : ''}`}>
          <h2 className="programs__title">PROGRAM UNGGULAN</h2>
          <p className="programs__subtitle">
            Pilih program yang sesuai dengan kebutuhan dan tujuan belajar kamu
          </p>
        </div>

        <div className="programs__grid">
          {programs.map((p, i) => (
            <div
              key={i}
              className={`programs__card ${cardVisible[i] ? 'programs__card--visible' : ''}`}
            >
              <div className="programs__card-img-wrap">
                <img src={p.img} alt={p.title} className="programs__card-img" />
                <span className="programs__card-badge">
                  {p.icon} {p.badge}
                </span>
              </div>
              <div className="programs__card-body">
                <h3 className="programs__card-title">{p.title}</h3>
                <p className="programs__card-desc">{p.desc}</p>

                <button
                  className="programs__card-btn"
                  onClick={() => navigate('/program')}
                >
                  Pelajari Selengkapnya <span className="arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="programs__cta">
          <button
            className="programs__cta-btn"
            onClick={() => navigate('/program')}
          >
            Lihat Semua Program
          </button>
        </div>

      </div>
    </section>
  )
}

export default Programs