import { useEffect, useRef, useState } from 'react'
import '../../../styles/ProgramHero.css'
import heroImg from '../../../assets/Program/fotoprogram.jpg'

const ProgramHero = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="program-hero" ref={ref}>
      <div className="program-hero__bg-circle program-hero__bg-circle--1" />
      <div className="program-hero__bg-circle program-hero__bg-circle--2" />

      <div className="program-hero__container">
        <div className={`program-hero__left ${visible ? 'ph-visible' : ''}`}>
          <h1 className="program-hero__title">
            Mastering<br />
            English for{' '}
            <span className="program-hero__title--accent">Global</span>
            <br />
            <span className="program-hero__title--accent">Success</span>
          </h1>
          <p className="program-hero__desc">
            Step into a curated academic environment designed to transform your fluency.
            Our bespoke programs blend prestige with creative modern pedagogy.
          </p>
          <div className="program-hero__actions">
            <a href="#pathways" className="btn-primary program-hero__btn">
              Lihat Program
            </a>
            <a href="#cta" className="program-hero__link">
              Hubungi Kami →
            </a>
          </div>
        </div>

        <div className={`program-hero__right ${visible ? 'ph-visible' : ''}`}>
          <div className="program-hero__photo-wrapper">
            <img src={heroImg} alt="Program FOLKS" className="program-hero__photo" />
            <div className="program-hero__photo-badge">
              <span className="program-hero__photo-badge-num">500+</span>
              <span className="program-hero__photo-badge-label">Students Enrolled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramHero