import { useEffect, useState } from 'react'
import { Zap, GraduationCap, Users } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import teamPhoto1 from '../../../assets/TeamFOLKS.jpg'
import teamPhoto2 from '../../../assets/TeamFOLKS2.jpg'
import teamPhoto3 from '../../../assets/TeamFOLKS3.jpg'
import teamPhoto4 from '../../../assets/TeamFOLKS4.jpg'

const photos = [teamPhoto1, teamPhoto2, teamPhoto3, teamPhoto4]

const AboutHero = () => {
  const { t } = useLanguage()
  
  const pillars = [
    { Icon: Zap, text: t.about_hero.pillars[0] },
    { Icon: GraduationCap, text: t.about_hero.pillars[1] },
    { Icon: Users, text: t.about_hero.pillars[2] },
  ]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        .about-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .about-hero__bg { position: absolute; inset: 0; z-index: 0; }

        .about-hero__slide {
          position: absolute; inset: 0;
          opacity: 0; transform: scale(1.06);
          transition: opacity 1.2s ease, transform 6s ease;
        }
        .about-hero__slide.active { opacity: 1; transform: scale(1); }
        .about-hero__slide img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center; display: block;
        }

        .about-hero__overlay-left {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            100deg,
            rgba(255,255,255,0.82) 0%,
            rgba(255,255,255,0.72) 45%,
            rgba(255,255,255,0.40) 70%,
            rgba(255,255,255,0.10) 100%
          );
        }

        .about-hero__accent-line {
          position: absolute;
          top: 0; left: 88px;
          width: 3px; height: 0;
          background: linear-gradient(to bottom, #EF6D60, transparent);
          z-index: 3;
          transition: height 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }
        .about-hero.hero-loaded .about-hero__accent-line { height: 60%; }

        .about-hero__container {
          position: relative; z-index: 2;
          max-width: 1200px; width: 100%;
          margin: 0 auto;
          padding: 160px 80px 140px 96px;
        }

        .about-hero__content { max-width: 580px; }

        .ah-fade {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .hero-loaded .ah-fade { opacity: 1; transform: translateY(0); }
        .hero-loaded .ah-fade:nth-child(1) { transition-delay: 0.10s; }
        .hero-loaded .ah-fade:nth-child(2) { transition-delay: 0.22s; }
        .hero-loaded .ah-fade:nth-child(3) { transition-delay: 0.34s; }
        .hero-loaded .ah-fade:nth-child(4) { transition-delay: 0.46s; }
        .hero-loaded .ah-fade:nth-child(5) { transition-delay: 0.58s; }

        .about-hero__label {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(239,109,96,0.10);
          border: 1px solid rgba(239,109,96,0.40);
          color: #EF6D60;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 6px 16px; border-radius: 40px; margin-bottom: 24px;
        }
        .about-hero__label-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #EF6D60;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.65); }
        }

        .about-hero__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 58px; font-weight: 800;
          color: #105647; line-height: 1.08;
          margin-bottom: 8px; letter-spacing: -1.5px;
        }
        .about-hero__title em {
          font-style: italic; font-weight: 800;
          color: #105647;
        }

        .about-hero__divider {
          width: 56px; height: 3px;
          background: linear-gradient(90deg, #105647, transparent);
          border-radius: 2px; margin: 28px 0;
        }

        .about-hero__subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 600;
          color: #105647;
          margin-bottom: 14px; line-height: 1.65;
        }

        .about-hero__desc {
          font-size: 14px; color: #444444;
          line-height: 1.95; max-width: 500px;
          margin-bottom: 40px;
        }

        /* ── Pills ── */
        .about-hero__pillars {
          display: flex; gap: 10px; flex-wrap: wrap;
        }

        .about-hero__pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(16,86,71,0.07);
          border: 1px solid rgba(16,86,71,0.25);
          border-radius: 40px;
          padding: 8px 18px;
          font-size: 13px; font-weight: 600;
          color: #105647;
          cursor: default;
          opacity: 0;
          /* transition-delay 0s saat hover agar langsung berubah */
          transition: background 0s, border-color 0s, color 0s, box-shadow 0s;
        }

        .about-hero__pill:hover {
          background: #105647 !important;
          border-color: #105647 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(16,86,71,0.30);
          transition-delay: 0s !important;
        }

        .about-hero__pill:hover svg {
          stroke: #ffffff;
        }

        /* entrance — opacity saja, delay hanya untuk masuk pertama kali */
        .hero-loaded .about-hero__pill:nth-child(1) { opacity: 1; transition: opacity 0.5s ease 0.70s, background 0s, border-color 0s, color 0s, box-shadow 0s; }
        .hero-loaded .about-hero__pill:nth-child(2) { opacity: 1; transition: opacity 0.5s ease 0.82s, background 0s, border-color 0s, color 0s, box-shadow 0s; }
        .hero-loaded .about-hero__pill:nth-child(3) { opacity: 1; transition: opacity 0.5s ease 0.94s, background 0s, border-color 0s, color 0s, box-shadow 0s; }

        /* setelah muncul, hover langsung tanpa delay */
        .hero-loaded .about-hero__pill:nth-child(1):hover,
        .hero-loaded .about-hero__pill:nth-child(2):hover,
        .hero-loaded .about-hero__pill:nth-child(3):hover {
          transition: background 0s, border-color 0s, color 0s, box-shadow 0s !important;
        }

        @media (max-width: 768px) {
          .about-hero__container { padding: 120px 24px 90px; }
          .about-hero__title { font-size: 36px; }
          .about-hero__accent-line { left: 24px; }
          .about-hero__content { max-width: 100%; }
        }
      `}</style>

      <section className={`about-hero ${loaded ? 'hero-loaded' : ''}`}>

        <div className="about-hero__bg">
          {photos.map((photo, index) => (
            <div key={index} className={`about-hero__slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={photo} alt="" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="about-hero__overlay-left" />
        <div className="about-hero__accent-line" />

        <div className="about-hero__container">
          <div className="about-hero__content">

            <div className="ah-fade">
              <span className="about-hero__label">
                <span className="about-hero__label-dot" />
                {t.about_hero.label}
              </span>
            </div>

            <h1 className="about-hero__title ah-fade">
              {t.about_hero.title_1}<em>{t.about_hero.title_2}</em>{t.about_hero.title_3}
            </h1>

            <div className="about-hero__divider ah-fade" />

            <p className="about-hero__subtitle ah-fade">
              {t.about_hero.subtitle}
            </p>

            <p className="about-hero__desc ah-fade">
              {t.about_hero.desc}
            </p>

            <div className="about-hero__pillars">
              {pillars.map(({ Icon, text }, i) => (
                <span key={i} className="about-hero__pill">
                  <Icon size={14} strokeWidth={2.2} />
                  {text}
                </span>
              ))}
            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default AboutHero