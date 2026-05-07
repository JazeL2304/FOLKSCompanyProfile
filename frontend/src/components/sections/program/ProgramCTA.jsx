import { useRef, useEffect, useState } from 'react'
import '../../../styles/ProgramCTA.css'

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
            <span className="program-cta__trust-label">Trusted by students worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramCTA