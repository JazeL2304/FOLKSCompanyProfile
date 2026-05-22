import { useEffect, useRef, useState } from 'react'
import { Facebook, Linkedin, Instagram } from 'lucide-react'
import foto1 from '../../../assets/fototeam1.jpg'
import foto2 from '../../../assets/fototeam2.jpg'
import foto3 from '../../../assets/fototeam3.jpg'
import foto4 from '../../../assets/fototeam4.jpg'

const teamMembers = [
  {
    photo: foto1,
    name: 'Ilyas S',
    role: 'CEO & Founder',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    photo: foto2,
    name: 'Kevin Wijaya',
    role: 'Head of Operations',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    photo: foto3,
    name: 'Michelle Tan',
    role: 'Lead Software Engineer',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    photo: foto4,
    name: 'Ada Wong',
    role: 'UI/UX Designer',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
]

const AboutTeam = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 80) {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        /* ===== ABOUT TEAM ===== */
        .about-team {
          padding: 100px 80px;
          background: #f9fbff;
        }

        .about-team__container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ---- Header ---- */
        .about-team__header {
          text-align: center;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about-team__header.at-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-team__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: var(--primary);        /* ← ganti dari #1a2744 */
          margin-bottom: 10px;
        }

        .about-team__subtitle {
          font-size: 14px;
          color: #EF6D60;     /* ← ganti dari var(--text-muted) */
        }

        /* ---- Grid ---- */
        .about-team__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* ---- Card ---- */
        .about-team__card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);   /* ← ganti dari #e8eef8 */
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(var(--primary-rgb), 0.06);  /* ← ganti */
        }
        .about-team__card.at-card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .about-team__card:hover {
          box-shadow: 0 16px 40px rgba(var(--primary-rgb), 0.14); /* ← ganti */
          transform: translateY(-6px);
        }

        /* ---- Photo ---- */
        .about-team__photo-wrapper {
          width: 100%;
          height: 260px;
          overflow: hidden;
          background: #f0f4f8;
        }

        .about-team__photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.4s ease;
        }
        .about-team__card:hover .about-team__photo {
          transform: scale(1.05);
        }

        /* ---- Info ---- */
        .about-team__info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .about-team__name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--primary);        /* ← ganti dari #1a2744 */
        }

        .about-team__role {
          font-size: 13px;
          color: #EF6D60;     /* ← ganti dari var(--text-muted) */
          margin-bottom: 6px;
        }

        /* ---- Socials ---- */
        .about-team__socials {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .about-team__social-link {
          width: 32px;
          height: 32px;
          background: #f0f4f8;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);        /* ← ganti dari #1a2744 */
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .about-team__social-link:hover {
          background: var(--primary);   /* ← hapus fallback #1a3a6b */
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* ---- Responsive ---- */
        @media (max-width: 1024px) {
          .about-team__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .about-team {
            padding: 60px 24px;
          }
          .about-team__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .about-team__title {
            font-size: 28px;
          }
        }
        @media (max-width: 480px) {
          .about-team__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <section className="about-team" ref={sectionRef}>
        <div className="about-team__container">
          <div className={`about-team__header ${isVisible ? 'at-visible' : ''}`}>
            <h2 className="about-team__title">Meet Our <span style={{ color: '#EF6D60' }}>Tutor</span></h2>
            <p className="about-team__subtitle">The Dynamic Minds Behind FOLKS</p>
          </div>

          <div className="about-team__grid">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`about-team__card ${isVisible ? 'at-card-visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="about-team__photo-wrapper">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="about-team__photo"
                  />
                </div>
                <div className="about-team__info">
                  <h3 className="about-team__name">{member.name}</h3>
                  <p className="about-team__role">{member.role}</p>
                  <div className="about-team__socials">
                    <a href={member.facebook} className="about-team__social-link" aria-label="Facebook">
                      <Facebook size={16} />
                    </a>
                    <a href={member.linkedin} className="about-team__social-link" aria-label="LinkedIn">
                      <Linkedin size={16} />
                    </a>
                    <a href={member.instagram} className="about-team__social-link" aria-label="Instagram">
                      <Instagram size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutTeam