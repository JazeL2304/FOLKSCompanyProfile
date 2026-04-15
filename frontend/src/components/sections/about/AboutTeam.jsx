import { useEffect, useRef, useState } from 'react'
import { Facebook, Linkedin, Instagram } from 'lucide-react'
import foto1 from '../../../assets/fototeam1.jpg'
import foto2 from '../../../assets/fototeam2.jpg'
import foto3 from '../../../assets/fototeam3.jpg'
import foto4 from '../../../assets/fototeam4.jpg'
import '../../../styles/AboutTeam.css'

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
    name: 'Kevin WijayaA',
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
    <section className="about-team" ref={sectionRef}>
      <div className="about-team__container">
        <div className={`about-team__header ${isVisible ? 'at-visible' : ''}`}>
          <h2 className="about-team__title">Meet Our Tutor</h2>
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
  )
}

export default AboutTeam