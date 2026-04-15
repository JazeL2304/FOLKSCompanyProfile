import { useEffect, useRef } from 'react'
import teamPhoto from '../../../assets/TeamFOLKS.jpg'
import '../.././../styles/AboutHero.css'

const AboutHero = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.ah-animate').forEach((el, i) => {
              setTimeout(() => el.classList.add('ah-visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about-hero" ref={sectionRef}>
      <div className="about-hero__container">
        {/* Left Content */}
        <div className="about-hero__left">
          <p className="about-hero__label ah-animate">Why FOLKS?</p>
          <h1 className="about-hero__title ah-animate">
            Empowering <br />
            Innovation Together
          </h1>
          <p className="about-hero__subtitle ah-animate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="about-hero__desc ah-animate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            dapibus dapibus porttitor. Maecenas est libero, varius a augue sed,
            malesuada malesuada erat. In hac habitasse platea dictumst. Praesent
            at diam sed quam aliquet posuere. Duis quis velit ullamcorper,
            porttitor leo at, mattis tortor. Donec tristique nunc a ipsum iaculis
            convallis. Maecenas aliquam, orci ut finibus ornare, diam odio blandit
            mi, nec vulputate diam lectus sit amet sapien.
          </p>
        </div>

        {/* Right: Photo + Stats Card */}
        <div className="about-hero__right ah-animate">
          <div className="about-hero__photo-wrapper">
            <img
              src={teamPhoto}
              alt="FOLKS Team"
              className="about-hero__photo"
            />
            {/* Stats overlay card */}
            <div className="about-hero__stats-card">
              <div className="about-hero__stat">
                <span className="about-hero__stat-value">+1</span>
                <span className="about-hero__stat-label">Years Experience</span>
              </div>
              <div className="about-hero__stat-divider" />
              <div className="about-hero__stat">
                <span className="about-hero__stat-value">+50</span>
                <span className="about-hero__stat-label">Project Completed</span>
              </div>
              <div className="about-hero__stat-divider" />
              <div className="about-hero__stat">
                <span className="about-hero__stat-value-small">Lorem ipsum</span>
                <span className="about-hero__stat-label">dolor Si</span>
              </div>
              <div className="about-hero__stat-divider" />
              <div className="about-hero__stat">
                <span className="about-hero__stat-value-small">Global</span>
                <span className="about-hero__stat-label">Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero