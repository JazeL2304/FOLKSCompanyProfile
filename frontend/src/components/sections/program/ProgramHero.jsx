import '../../../styles/ProgramHero.css'
import heroImg from '../../../assets/Program/fotoprogram.jpg'

const ProgramHero = () => {
  return (
    <section className="program-hero">
      <div className="program-hero__bg-circle program-hero__bg-circle--1" />
      <div className="program-hero__bg-circle program-hero__bg-circle--2" />

      <div className="program-hero__container">
        <div className="program-hero__left">
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

        <div className="program-hero__right">
          <div className="program-hero__photo-wrapper">
            <img src={heroImg} alt="Program FOLKS" className="program-hero__photo" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramHero