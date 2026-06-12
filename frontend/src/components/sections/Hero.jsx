import backgroundHero from '../../assets/background-hero.png'
import heroStudent from '../../assets/hero-student.png'
import iconStar from '../../assets/icon-star.png'
import iconBook from '../../assets/icon-book.png'
import iconMic from '../../assets/icon-mic.png'
import iconCap from '../../assets/icon-cap.png'
import { useLanguage } from '../../context/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()

  const handleRegisterClick = () => {
    window.open('https://api.whatsapp.com/send?phone=6287886180776&text=Halo%20FOLKS,%20saya%20ingin%20mendaftar.', '_blank')
  }

  const handleViewProgramsClick = () => {
    const el = document.getElementById('program')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 5% 0;
          position: relative;
          overflow: hidden;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
        }

        .hero__inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* LEFT CONTENT */
        .hero__content {
          opacity: 0;
          animation: fadeInLeft 0.8s ease 0.1s forwards;
          padding-bottom: 20px;
        }

        .hero__title {
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.2rem);
          color: var(--primary); /* ← sudah pakai --primary (#105647), harusnya sudah hijau */
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .hero__title-accent {
          color: var(--accent);
        }

        .hero__desc {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 16px;
          max-width: 340px;
        }

        .hero__checklist {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
          list-style: none;
        }

        .hero__checklist li {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hero__check-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hero__check-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--text-dark);
        }

        .hero__actions {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        /* RIGHT VISUAL */
        .hero__visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          height: calc(100vh - 72px);
          min-height: 650px;
          align-self: stretch;
          opacity: 0;
          animation: fadeInRight 0.8s ease 0.3s forwards;
        }

        .hero__student {
          height: 100%;
          max-height: 100%;
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          position: relative;
          z-index: 2;
          margin-bottom: 0;
          display: block;
        }

        /* Floating icons */
        .hero__floating {
          position: absolute;
          z-index: 3;
          animation: float 3s ease-in-out infinite;
        }

        /* 📚 book — kanan atas */
        .hero__floating--book {
          width: 159px;
          top: 10px;
          right: -10px;
          animation-delay: 0.3s;
        }

        /* ⭐ star besar — tepat di atas kepala cowok (tengah visual) */
        .hero__floating--star1 {
          width: 160px;
          top: 20px;
          left: 50%;
          transform: translateX(-120%);
          animation-delay: 0s;
        }

        /* ⭐ star kecil — kanan tengah */
        .hero__floating--star2 {
          width: 89px;
          top: 210px;
          right: -20px;
          animation-delay: 0.6s;
        }

        /* 🎤 mic — kiri tengah */
        .hero__floating--mic {
          width: 223px;
          top: 140px;
          left: -100px;
          animation-delay: 0.8s;
        }

        /* 🎓 cap — bawah kiri, lebih ke kiri dari foto */
        .hero__floating--cap {
          width: 150px;
          bottom: 80px;
          left: -110px;
          animation-delay: 0.5s;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 90px 5% 0;
            height: auto;
            min-height: 100svh;
          }

          .hero__inner {
            grid-template-columns: 1fr;
            gap: 0;
            padding-bottom: 0;
          }

          .hero__content {
            text-align: center;
            padding-bottom: 0;
          }

          .hero__desc {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .hero__checklist {
            align-items: flex-start;
            display: inline-flex;
            text-align: left;
          }

          .hero__actions {
            justify-content: center;
          }

          .hero__visual {
            height: 380px;
            min-height: unset;
            width: 100%;
          }

          .hero__floating--book  { width: 90px;  top: 0;    right: 0; }
          .hero__floating--star1 { width: 90px;  top: 10px; left: 50%; transform: translateX(-160%); }
          .hero__floating--star2 { width: 55px;  top: 120px; right: 0; }
          .hero__floating--mic   { width: 120px; top: 80px;  left: -20px; }
          .hero__floating--cap   { width: 90px;  bottom: 20px; left: -10px; }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 80px 4% 0;
          }

          .hero__visual {
            height: 300px;
          }

          .hero__floating--book  { width: 70px; }
          .hero__floating--star1 { width: 70px; }
          .hero__floating--star2 { width: 44px; }
          .hero__floating--mic   { width: 90px; }
          .hero__floating--cap   { width: 70px; }
        }
      `}</style>
      <section id="beranda" className="hero">
        <img src={backgroundHero} alt="" className="hero__bg" />

        <div className="hero__inner">

          {/* Left Content */}
          <div className="hero__content">
            <h1 className="hero__title">
              {t.hero.title_1}<br />
              {t.hero.title_2} <span className="hero__title-accent">{t.hero.title_3}</span>
            </h1>

            <p className="hero__desc">
              {t.hero.desc}
            </p>

            <ul className="hero__checklist">
              {t.hero.checks.map((item, i) => (
                <li key={i}>
                  <div className="hero__check-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="hero__check-label">{item}</span>
                </li>
              ))}
            </ul>

            <div className="hero__actions">
              <button className="btn-primary" onClick={handleRegisterClick}>{t.hero.btn_register}</button>
              <button className="btn-outline" onClick={handleViewProgramsClick}>{t.hero.btn_program}</button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero__visual">
            {/* Icons di dalam kolom kanan */}
            <img src={iconBook}  alt="book" className="hero__floating hero__floating--book" />
            <img src={iconStar}  alt="star" className="hero__floating hero__floating--star1" />
            <img src={iconStar}  alt="star" className="hero__floating hero__floating--star2" />
            <img src={iconMic}   alt="mic"  className="hero__floating hero__floating--mic" />
            <img src={iconCap}   alt="cap"  className="hero__floating hero__floating--cap" />

            {/* Foto siswa */}
            <img src={heroStudent} alt="Student" className="hero__student" />
          </div>

        </div>
      </section>
    </>
  )
}

export default Hero