import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

const API_URL = 'http://localhost:5000/api'

const TABS = ['General', 'Conversation', 'ESP', 'Professional Business']
const LEVELS = ['SD', 'SMP', 'SMA']

// Foto lokal per level — fallback kalau program belum punya foto sendiri
const levelPhotos = {
  SD: [sd1, sd2, sd3],
  SMP: [smp1, smp2, smp3],
  SMA: [sma1, sma2, sma3],
}

const formatRupiah = (amount) => {
  if (!amount) return '-'
  return 'Rp ' + Number(amount).toLocaleString('id-ID')
}

// =====================================================
// PROGRAM CARD
// =====================================================
const ProgramCard = ({ program, photoIndex, level }) => {
  const navigate = useNavigate()

  const photo = levelPhotos[level]?.[photoIndex % 3] || levelPhotos.SD[0]

  const handleKonsultasi = () => {
    const waUrl = `https://wa.me/6282289993655?text=${encodeURIComponent(
      `Halo, saya tertarik dengan program *${program.title}* (${level}) seharga ${formatRupiah(program.price)}. Boleh saya tahu info lebih lanjut?`
    )}`
    window.open(waUrl, '_blank')
  }

  const handleLearnMore = () => {
    navigate(`/program/${level.toLowerCase()}`)
  }

  const features = Array.isArray(program.features) ? program.features : []

  return (
    <div className="ap-card">
      <img src={photo} alt={`Program ${level}`} className="ap-card__bg" />
      <div className="ap-card__overlay" />
      <div className="ap-card__content">
        <span className="ap-card__badge">{program.category?.toUpperCase() || 'PROGRAM'}</span>
        <div className="ap-card__body">
          <h3 className="ap-card__title">{program.title}</h3>
          <div className="ap-card__price-row">
            <span className="ap-card__price-from">From</span>
            <span className="ap-card__price">{formatRupiah(program.price)}</span>
          </div>
          <button className="ap-card__btn-konsultasi" onClick={handleKonsultasi}>
            Mulai Konsultasi
          </button>
          {features.length > 0 && (
            <ul className="ap-card__features">
              {features.map((f, i) => (
                <li key={i} className="ap-card__feature-item">
                  <span className="ap-card__check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          <button className="ap-card__btn-learn" onClick={handleLearnMore}>Learn More</button>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// CAROUSEL PER LEVEL
// =====================================================
const LevelCarousel = ({ levelName, cards }) => {
  const [index, setIndex] = useState(0)
  const visibleCount = 3
  const maxIndex = Math.max(0, cards.length - visibleCount)

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(maxIndex, i + 1))

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
              <div className="ap-carousel__slide" key={card.id || i}>
                <ProgramCard program={card} photoIndex={i} level={levelName} />
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
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${API_URL}/programs`)
        const data = await res.json()
        // Hanya tampilkan yang aktif
        setPrograms(data.filter(p => p.active))
      } catch (err) {
        console.error('Gagal fetch programs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

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

  // Filter by tab (category) dan level
  const getCards = (level) =>
    programs.filter(p =>
      p.category === activeTab &&
      p.level === level
    )

  return (
    <>
      <style>{`
        .academic-pathways {
          padding: 60px 80px 80px;
          background: #f8faff;
        }
        .ap-container { max-width: 1200px; margin: 0 auto; }
        .ap-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px; font-weight: 800; color: #105647; margin-bottom: 20px;
        }
        .ap-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 48px; }
        .ap-tab {
          padding: 7px 18px; border-radius: 6px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.3px;
          border: none; cursor: pointer; transition: all 0.25s ease;
          background: #e2eaf5; color: #4a5568; text-transform: uppercase;
        }
        .ap-tab--active { background: #105647; color: #ffffff; }
        .ap-tab:hover:not(.ap-tab--active) { background: rgba(16,86,71,0.1); color: #105647; }
        .ap-levels { display: flex; flex-direction: column; gap: 48px; }
        .ap-level__name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px; font-weight: 800; color: #EF6D60;
          text-align: center; margin-bottom: 24px; letter-spacing: 0.5px;
        }
        .ap-level__empty { text-align: center; color: #6b7a99; font-size: 14px; padding: 40px 0; }
        .ap-carousel { display: flex; align-items: center; gap: 12px; position: relative; }
        .ap-carousel__viewport { flex: 1; overflow: hidden; }
        .ap-carousel__track {
          display: flex; gap: 16px;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ap-carousel__slide { flex: 0 0 calc((100% - 32px) / 3); min-width: 0; }
        .ap-carousel__arrow {
          width: 40px; height: 40px; border-radius: 50%;
          background: #ffffff; border: 2px solid #e2eaf5;
          font-size: 22px; color: #105647; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; flex-shrink: 0; line-height: 1; padding: 0;
          box-shadow: 0 2px 8px rgba(26,58,107,0.1);
        }
        .ap-carousel__arrow:hover:not(.ap-carousel__arrow--disabled) {
          background: #105647; color: #ffffff; border-color: #105647;
        }
        .ap-carousel__arrow--disabled { opacity: 0.3; cursor: not-allowed; }
        .ap-card {
          border-radius: 16px; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          height: 100%; display: flex; flex-direction: column;
          position: relative; min-height: 420px; cursor: pointer;
        }
        .ap-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(26,58,107,0.3); }
        .ap-card__bg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: transform 0.4s ease; z-index: 0;
        }
        .ap-card:hover .ap-card__bg { transform: scale(1.05); }
        .ap-card__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(16,86,71,0.3) 0%, rgba(16,86,71,0.6) 40%, rgba(10,50,35,0.92) 100%);
          z-index: 1;
        }
        .ap-card__content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; height: 100%; padding: 14px;
        }
        .ap-card__badge {
          display: inline-block; background: rgba(16,86,71,0.85); color: #ffffff;
          font-size: 9px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.8px; padding: 4px 10px; border-radius: 4px;
          text-transform: uppercase; align-self: flex-start; margin-bottom: auto;
          backdrop-filter: blur(4px);
        }
        .ap-card__body { display: flex; flex-direction: column; gap: 0; margin-top: auto; }
        .ap-card__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 4px; line-height: 1.2;
        }
        .ap-card__price-row { display: flex; align-items: baseline; gap: 4px; margin-bottom: 12px; }
        .ap-card__price-from { font-size: 11px; color: rgba(255,255,255,0.7); font-style: italic; }
        .ap-card__price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; }
        .ap-card__btn-konsultasi {
          width: 100%; padding: 10px;
          background: rgba(255,255,255,0.15); color: #ffffff;
          border: 1.5px solid rgba(255,255,255,0.5); border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.3px; cursor: pointer; transition: all 0.2s ease;
          margin-bottom: 12px; backdrop-filter: blur(4px);
        }
        .ap-card__btn-konsultasi:hover { background: rgba(255,255,255,0.25); }
        .ap-card__features { list-style: none; padding: 0; margin: 0 0 12px; display: flex; flex-direction: column; gap: 6px; }
        .ap-card__feature-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.85); line-height: 1.4; }
        .ap-card__check { color: #ffffff; font-weight: 800; font-size: 13px; flex-shrink: 0; }
        .ap-card__btn-learn {
          align-self: flex-end; width: auto; padding: 6px 14px;
          background: transparent; color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.35); border-radius: 6px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 0.5px; cursor: pointer; transition: all 0.2s ease;
          text-transform: uppercase; margin-top: 8px;
        }
        .ap-card__btn-learn:hover { background: rgba(255,255,255,0.15); color: #ffffff; border-color: rgba(255,255,255,0.6); }
        .ap-loading { text-align: center; padding: 80px 0; color: #6b7a99; font-size: 14px; }
        @media (max-width: 900px) {
          .academic-pathways { padding: 60px 24px; }
          .ap-carousel__slide { flex: 0 0 calc((100% - 16px) / 2); }
          .ap-card { min-height: 380px; }
        }
        @media (max-width: 600px) {
          .ap-carousel__slide { flex: 0 0 80%; }
          .ap-card { min-height: 360px; }
        }
      `}</style>

      <section className="academic-pathways" id="pathways" ref={sectionRef}>
        <div className="ap-container">
          <div className={`ap-header ${visible ? 'ap-visible' : ''}`}>
            <h2 className="ap-title">Academic Pathways</h2>
          </div>
          <div className={`ap-tabs ${visible ? 'ap-visible' : ''}`}>
            {TABS.map(tab => (
              <button
                key={tab}
                className={`ap-tab ${activeTab === tab ? 'ap-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="ap-loading">Memuat program...</div>
          ) : (
            <div className="ap-levels">
              {LEVELS.map(level => (
                <LevelCarousel
                  key={`${activeTab}-${level}`}
                  levelName={level}
                  cards={getCards(level)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default AcademicPathways