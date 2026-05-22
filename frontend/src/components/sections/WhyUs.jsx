import { useEffect, useRef, useState } from 'react'
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
    <>
      <style>{`
        .whyus {
          padding: 80px 5%;
          background: #f9faff;
        }

        .whyus__inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .whyus__header {
          text-align: center;
          margin-bottom: 60px;
        }

        .whyus__title {
          font-weight: 900;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          color: var(--primary);
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .whyus__title span {
          color: var(--accent);
        }

        .whyus__subtitle {
          color: var(--primary);
          font-size: 17px;
          font-weight: 500;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Grid */
        .whyus__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* Card */
        .whyus__card {
          background: white;
          border-radius: 20px;
          padding: 28px 32px 40px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(26, 58, 107, 0.08);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .whyus__card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(26, 58, 107, 0.14);
        }

        /* Garis merah di atas card */
        .whyus__card-redline {
          width: 60px;
          height: 5px;
          background: var(--accent);
          border-radius: 6px;
          margin: 0 auto 20px;
        }

        /* Icon */
        .whyus__card-icon-wrap {
          width: 100px;
          height: 100px;
          margin: 20px auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .whyus__card-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Title */
        .whyus__card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: var(--primary);
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        /* Desc */
        .whyus__card-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.8;
        }

        /* Scroll animations */
        .whyus__header {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .whyus__header--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .whyus__card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
        }

        .whyus__card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .whyus__grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .whyus {
            padding: 60px 5%;
          }

          .whyus__grid {
            grid-template-columns: 1fr;
          }

          .whyus__header {
            margin-bottom: 40px;
          }

          .whyus__card {
            padding: 24px 24px 32px;
          }
        }
      `}</style>
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
    </>
  )
}

export default WhyUs