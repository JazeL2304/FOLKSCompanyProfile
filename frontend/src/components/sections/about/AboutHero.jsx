import { useEffect, useRef, useState } from 'react'
import teamPhoto1 from '../../../assets/TeamFOLKS.jpg'
import teamPhoto2 from '../../../assets/TeamFOLKS2.jpg'
import teamPhoto3 from '../../../assets/TeamFOLKS3.jpg'
import teamPhoto4 from '../../../assets/TeamFOLKS4.jpg'

const photos = [teamPhoto1, teamPhoto2, teamPhoto3, teamPhoto4]

const AboutHero = () => {
  const sectionRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.ah-animate').forEach((el, i) => {
              setTimeout(() => el.classList.add('ah-visible'), i * 140)
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

        /* Slideshow */
        .about-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .about-hero__slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }

        .about-hero__slide.active {
          opacity: 1;
        }

        .about-hero__slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Overlay */
        .about-hero__overlay {
          position: absolute;
          inset: 0;
          background: #000000;
          opacity: 0.72;
          z-index: 1;
        }

        /* Dots */
        .about-hero__dots {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .about-hero__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .about-hero__dot.active {
          background: #EF6D60;
          transform: scale(1.25);
        }

        /* Container */
        .about-hero__container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 140px 80px;
        }

        .about-hero__content {
          max-width: 620px;
        }

        /* Animate */
        .ah-animate {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .ah-animate.ah-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Label */
        .about-hero__label {
          display: inline-block;
          background: #EF6D60;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        /* Title */
        .about-hero__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 48px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .about-hero__title .title-main {
          color: #ffffff;
          font-style: normal;
        }

        .about-hero__title em {
          font-style: italic;
          color: #EF6D60;
        }

        /* Subtitle */
        .about-hero__subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.75);
          font-style: italic;
          margin-bottom: 16px;
          line-height: 1.6;
        }

        /* Desc */
        .about-hero__desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.85;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .about-hero {
            min-height: 100vh;
          }
          .about-hero__container {
            padding: 120px 24px 80px;
          }
          .about-hero__title {
            font-size: 32px;
          }
          .about-hero__content {
            max-width: 100%;
          }
        }
      `}</style>

      <section className="about-hero" ref={sectionRef}>
        {/* Slideshow background */}
        <div className="about-hero__bg">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`about-hero__slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={photo} alt="" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Dark overlay */}
        <div className="about-hero__overlay" />

        {/* Content */}
        <div className="about-hero__container">
          <div className="about-hero__content">
            <span className="about-hero__label ah-animate">Why FOLKS?</span>

            <h1 className="about-hero__title ah-animate">
              <span className="title-main">Belajar bahasa Inggris <br />
                seharusnya </span><em>menyenangkan.</em>
            </h1>

            <p className="about-hero__subtitle ah-animate">
              FOLKS hadir untuk membuktikan bahwa setiap anak bisa fasih berbahasa Inggris.
            </p>

            <p className="about-hero__desc ah-animate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              dapibus dapibus porttitor. Maecenas est libero, varius a augue sed,
              malesuada malesuada erat. In hac habitasse platea dictumst. Praesent
              at diam sed quam aliquet posuere. Duis quis velit ullamcorper,
              porttitor leo at, mattis tortor. Donec tristique nunc a ipsum iaculis
              convallis.
            </p>
          </div>
        </div>

        {/* Slide dots indicator */}
        <div className="about-hero__dots">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`about-hero__dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default AboutHero