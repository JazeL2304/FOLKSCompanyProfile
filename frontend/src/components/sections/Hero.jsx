import '../../styles/Hero.css'

import backgroundHero from '../../assets/background-hero.png'
import heroStudent from '../../assets/hero-student.png'
import iconStar from '../../assets/icon-star.png'
import iconBook from '../../assets/icon-book.png'
import iconMic from '../../assets/icon-mic.png'
import iconCap from '../../assets/icon-cap.png'

const Hero = () => {
  return (
    <section id="beranda" className="hero">
      <img src={backgroundHero} alt="" className="hero__bg" />

      <div className="hero__inner">

        {/* Left Content */}
        <div className="hero__content">
          <h1 className="hero__title">
            Mahir Bahasa English<br />
            dalam <span className="hero__title-accent">30 hari</span>
          </h1>

          <p className="hero__desc">
            Best Online English Course & Programs - Belajar Bahasa Inggris dari 0,
            secara terstruktur dengan tutor professional & friendly
          </p>

          <ul className="hero__checklist">
            {['Program Intensif 30 Hari', 'Tutor Bersertifikat', 'Live Session & Rekaman'].map((item, i) => (
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
            <button className="btn-primary">Daftar Sekarang</button>
            <button className="btn-outline">Lihat Program</button>
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
  )
}

export default Hero