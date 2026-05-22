import { useRef, useEffect, useState } from 'react'

const ProgramCTA = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 80) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        /* ===== PROGRAM CTA ===== */
        .program-cta {
          padding: 80px;
          background: #f8faff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        /* ---- Card ---- */
        .program-cta__card {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1a7a5e 0%, #105647 40%, #0d4035 100%);
          border-radius: 24px;
          padding: 70px 40px;
          text-align: center;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(16, 86, 71, 0.3);
        }

        /* ---- Deco circles ---- */
        .program-cta__deco {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .program-cta__deco--1 {
          width: 350px;
          height: 350px;
          background: rgba(255,255,255,0.04);
          top: -100px;
          right: -80px;
        }
        .program-cta__deco--2 {
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.05);
          bottom: -60px;
          left: -40px;
        }

        /* ---- Content ---- */
        .program-cta__content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .program-cta__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .program-cta__desc {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          max-width: 500px;
          line-height: 1.8;
          margin-bottom: 32px;
        }

        /* ---- Button ---- */
        .program-cta__btn {
          display: inline-block;
          background: #EF6D60;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 40px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-bottom: 28px;
          box-shadow: 0 8px 24px rgba(232,98,26,0.4);
        }
        .program-cta__btn:hover {
          background: #c9541a;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(232,98,26,0.5);
        }

        /* ---- Trust ---- */
        .program-cta__trust {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .program-cta__avatars {
          display: flex;
        }

        .program-cta__avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          color: #ffffff;
          margin-left: -10px;
        }
        .program-cta__avatars .program-cta__avatar:first-child {
          margin-left: 0;
        }

        .program-cta__avatar--1 { background: #e8621a; }
        .program-cta__avatar--2 { background: #2a7a4b; }
        .program-cta__avatar--3 { background: #7a4ab0; }
        .program-cta__avatar--more {
          background: rgba(255,255,255,0.15);
          font-size: 11px;
        }

        .program-cta__trust-label {
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          font-style: italic;
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .program-cta {
            padding: 60px 24px;
            min-height: auto;
          }
          .program-cta__title {
            font-size: 26px;
          }
        }
      `}</style>
      <section className="program-cta" id="cta" ref={sectionRef}>
        <div className={`program-cta__card ${visible ? 'pcta-visible' : ''}`}>
          {/* Background deco circles */}
          <div className="program-cta__deco program-cta__deco--1" />
          <div className="program-cta__deco program-cta__deco--2" />

          <div className="program-cta__content">
            <h2 className="program-cta__title">Ready to Start Your Journey?</h2>
            <p className="program-cta__desc">
              Join hundreds of professionals and students who have redefined their
              future through English fluency at FOLKS Academic.
            </p>

            <a
              href="https://wa.me/628228999365"
              target="_blank"
              rel="noopener noreferrer"
              className="program-cta__btn"
            >
              Contact Me
            </a>

            {/* Avatars + trust */}
            <div className="program-cta__trust">
              <div className="program-cta__avatars">
                {/* Placeholder avatars — ganti dengan foto nyata jika ada */}
                <div className="program-cta__avatar program-cta__avatar--1">A</div>
                <div className="program-cta__avatar program-cta__avatar--2">S</div>
                <div className="program-cta__avatar program-cta__avatar--3">M</div>
                <div className="program-cta__avatar program-cta__avatar--more">+</div>
              </div>
              <span className="program-cta__trust-label">Trusted by many students</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProgramCTA