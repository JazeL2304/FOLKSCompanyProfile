import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../styles/AcademicPathways.css'

// Import foto SD
import sd1 from '../../../assets/Program/sd/sd1.png'
import sd2 from '../../../assets/Program/sd/sd2.png'
import sd3 from '../../../assets/Program/sd/sd3.png'

// Import foto SMP
import smp1 from '../../../assets/Program/smp/smp1.png'
import smp2 from '../../../assets/Program/smp/smp2.png'
import smp3 from '../../../assets/Program/smp/smp3.png'

// Import foto SMA
import sma1 from '../../../assets/Program/sma/sma1.png'
import sma2 from '../../../assets/Program/sma/sma2.png'
import sma3 from '../../../assets/Program/sma/sma3.png'

const tabs = ['General', 'Conversation', 'ESP', 'Professional Business']
const levels = ['SD', 'SMP', 'SMA']

const programData = {
  General: {
    SD: [
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: sd1, photoAlt: 'Program SD 1', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: sd2, photoAlt: 'Program SD 2', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: sd3, photoAlt: 'Program SD 3', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
    ],
    SMP: [
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: smp1, photoAlt: 'Program SMP 1', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: smp2, photoAlt: 'Program SMP 2', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: smp3, photoAlt: 'Program SMP 3', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
    ],
    SMA: [
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: sma1, photoAlt: 'Program SMA 1', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: sma2, photoAlt: 'Program SMA 2', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
      { badge: 'CAREER BOOST', title: 'Business English', price: '$450', photo: sma3, photoAlt: 'Program SMA 3', features: ['English untuk profesional', 'Untuk kerja & bisnis', 'Skill English kerja'] },
    ],
  },
  Conversation: {
    SD: [
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: sd1, photoAlt: 'Conversation SD 1', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: sd2, photoAlt: 'Conversation SD 2', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: sd3, photoAlt: 'Conversation SD 3', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
    ],
    SMP: [
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: smp1, photoAlt: 'Conversation SMP 1', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: smp2, photoAlt: 'Conversation SMP 2', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: smp3, photoAlt: 'Conversation SMP 3', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
    ],
    SMA: [
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: sma1, photoAlt: 'Conversation SMA 1', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: sma2, photoAlt: 'Conversation SMA 2', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
      { badge: 'CONVERSATION', title: 'English Conversation', price: '$350', photo: sma3, photoAlt: 'Conversation SMA 3', features: ['Speaking & listening', 'Daily conversation', 'Pronunciation practice'] },
    ],
  },
  ESP: {
    SD: [
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: sd1, photoAlt: 'ESP SD 1', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: sd2, photoAlt: 'ESP SD 2', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: sd3, photoAlt: 'ESP SD 3', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
    ],
    SMP: [
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: smp1, photoAlt: 'ESP SMP 1', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: smp2, photoAlt: 'ESP SMP 2', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: smp3, photoAlt: 'ESP SMP 3', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
    ],
    SMA: [
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: sma1, photoAlt: 'ESP SMA 1', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: sma2, photoAlt: 'ESP SMA 2', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
      { badge: 'ESP', title: 'English for Specific Purposes', price: '$400', photo: sma3, photoAlt: 'ESP SMA 3', features: ['Academic writing', 'Technical vocabulary', 'Research skills'] },
    ],
  },
  'Professional Business': {
    SD: [
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: sd1, photoAlt: 'Pro SD 1', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: sd2, photoAlt: 'Pro SD 2', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: sd3, photoAlt: 'Pro SD 3', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
    ],
    SMP: [
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: smp1, photoAlt: 'Pro SMP 1', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: smp2, photoAlt: 'Pro SMP 2', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: smp3, photoAlt: 'Pro SMP 3', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
    ],
    SMA: [
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: sma1, photoAlt: 'Pro SMA 1', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: sma2, photoAlt: 'Pro SMA 2', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
      { badge: 'PROFESSIONAL', title: 'Professional Business English', price: '$500', photo: sma3, photoAlt: 'Pro SMA 3', features: ['Business communication', 'Presentation skills', 'Negotiation English'] },
    ],
  },
}

// =====================================================
// PROGRAM CARD — sekarang terima props level & category
// =====================================================
const ProgramCard = ({ card, level, category }) => {
  const navigate = useNavigate()

  const handleKonsultasi = () => {
    const isLoggedIn = false // nanti ganti dengan auth check setelah backend tersambung

    const params = new URLSearchParams({
      program: card.title,
      price: card.price.replace('$', ''),
      level: level,
      category: category,
    }).toString()

    if (!isLoggedIn) {
      // Belum login → ke halaman login dulu, dengan redirect setelah login
      navigate(`/login?redirect=/payment&${params}`)
    } else {
      // Sudah login → langsung ke payment
      navigate(`/payment?${params}`)
    }
  }

  return (
    <div className="ap-card">
      {card.photo ? (
        <img src={card.photo} alt={card.photoAlt} className="ap-card__bg" />
      ) : (
        <div className="ap-card__bg-placeholder" />
      )}
      <div className="ap-card__overlay" />
      <div className="ap-card__content">
        <span className="ap-card__badge">{card.badge}</span>
        <div className="ap-card__body">
          <h3 className="ap-card__title">{card.title}</h3>
          <div className="ap-card__price-row">
            <span className="ap-card__price-from">From</span>
            <span className="ap-card__price">{card.price}</span>
          </div>
          <button className="ap-card__btn-konsultasi" onClick={handleKonsultasi}>
            Mulai Konsultasi
          </button>
          <ul className="ap-card__features" style={{ flex: 1 }}>
            {card.features.map((f, i) => (
              <li key={i} className="ap-card__feature-item">
                <span className="ap-card__check">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button className="ap-card__btn-learn">Learn More</button>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// CAROUSEL PER LEVEL — sekarang terima props activeTab
// =====================================================
const LevelCarousel = ({ levelName, cards, activeTab }) => {
  const [index, setIndex] = useState(0)
  const visibleCount = 3
  const maxIndex = Math.max(0, cards.length - visibleCount)

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  if (cards.length === 0) {
    return (
      <div className="ap-level">
        <h3 className="ap-level__name">{levelName}</h3>
        <p className="ap-level__empty">Program akan segera tersedia.</p>
      </div>
    )
  }

  return (
    <div className="ap-level">
      <h3 className="ap-level__name">{levelName}</h3>
      <div className="ap-carousel">
        <button
          className={`ap-carousel__arrow ap-carousel__arrow--prev ${index === 0 ? 'ap-carousel__arrow--disabled' : ''}`}
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="ap-carousel__viewport">
          <div
            className="ap-carousel__track"
            style={{ transform: `translateX(calc(-${index} * (100% / ${visibleCount} + 8px)))` }}
          >
            {cards.map((card, i) => (
              <div className="ap-carousel__slide" key={i}>
                {/* ← pass level dan category ke ProgramCard */}
                <ProgramCard card={card} level={levelName} category={activeTab} />
              </div>
            ))}
          </div>
        </div>
        <button
          className={`ap-carousel__arrow ap-carousel__arrow--next ${index >= maxIndex ? 'ap-carousel__arrow--disabled' : ''}`}
          onClick={next}
          disabled={index >= maxIndex}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  )
}

// =====================================================
// MAIN COMPONENT
// =====================================================
const AcademicPathways = () => {
  const [activeTab, setActiveTab] = useState('General')
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 100) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentData = programData[activeTab] || {}

  return (
    <section className="academic-pathways" id="pathways" ref={sectionRef}>
      <div className="ap-container">
        <div className={`ap-header ${visible ? 'ap-visible' : ''}`}>
          <h2 className="ap-title">Academic Pathways</h2>
        </div>
        <div className={`ap-tabs ${visible ? 'ap-visible' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`ap-tab ${activeTab === tab ? 'ap-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="ap-levels">
          {levels.map((level) => (
            <LevelCarousel
              key={`${activeTab}-${level}`}
              levelName={level}
              cards={currentData[level] || []}
              activeTab={activeTab} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AcademicPathways