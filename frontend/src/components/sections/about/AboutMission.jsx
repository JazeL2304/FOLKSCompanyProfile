import { useEffect, useRef, useState } from 'react'
import bulbIcon from '../../../assets/Bulb.png'
import excellenceIcon from '../../../assets/Excellence.png'
import integrityIcon from '../../../assets/Integrity.png'

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
    <>
      <style>{`
        /* ===== ABOUT MISSION ===== */
        .about-mission {
          padding: 100px 80px;
          background: #ffffff;
        }

        .about-mission__container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ---- Header ---- */
        .about-mission__header {
          text-align: center;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about-mission__header.am-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-mission__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: var(--primary);        /* ← ganti dari #1a2744 */
          margin-bottom: 10px;
        }

        .about-mission__subtitle {
          font-size: 14px;
          color: #EF6D60;     /* ← ganti dari var(--text-muted) */
          font-weight: 600;
        }

        /* ---- Grid ---- */
        .about-mission__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* ---- Card ---- */
        .about-mission__card {
          background: #ffffff;
          border: 1px solid var(--border);   /* ← ganti dari #e8eef8 */
          border-radius: 16px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(var(--primary-rgb), 0.06);  /* ← ganti */
        }
        .about-mission__card.am-card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .about-mission__card:hover {
          box-shadow: 0 16px 48px rgba(var(--primary-rgb), 0.14); /* ← ganti */
          transform: translateY(-6px);
        }

        /* ---- Icon ---- */
        .about-mission__icon-wrap {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .about-mission__icon-img {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }

        .about-mission__card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--primary);        /* ← ganti dari #1a2744 */
        }

        .about-mission__card-desc {
          font-size: 14px;
          color: var(--text-muted);     /* ← ganti dari #6b7a99 */
          line-height: 1.7;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .about-mission__grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .about-mission {
            padding: 60px 24px;
          }
          .about-mission__title {
            font-size: 28px;
          }
        }
      `}</style>
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
    </>
  )
}

export default AboutMission