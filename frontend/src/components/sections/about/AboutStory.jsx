import { useEffect, useRef, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import '../../../styles/AboutStory.css'

const checklistItems = [
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
]

const stats = [
  { value: '+100', label: 'Team members' },
  { value: '+150', label: 'Projects Completed' },
  { value: '10', label: 'Countries Served' },
]

// Ganti dengan YouTube video ID kamu
// Contoh: https://www.youtube.com/watch?v=XXXXXXXXXXX → ID-nya adalah XXXXXXXXXXX
const YOUTUBE_VIDEO_ID = 'Pz6esoyf454'

const AboutStory = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 100) {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="about-story" ref={sectionRef}>
      <div className="about-story__container">
        {/* Left: Video */}
        <div className={`about-story__left ${isVisible ? 'as-visible' : ''}`}>
          <div className="about-story__video-wrapper">
            {!isPlaying ? (
              <div className="about-story__video-thumb" onClick={() => setIsPlaying(true)}>
                {/* YouTube thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  alt="Our Story Video"
                  className="about-story__thumb-img"
                  onError={(e) => { e.target.src = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg` }}
                />
                <button className="about-story__play-btn" aria-label="Play video">
                 <svg viewBox="0 0 24 24" fill="var(--primary)" width="32" height="32">
                  <path d="M8 5v14l11-7z" />
                </svg>
                </button>
              </div>
            ) : (
              <iframe
                className="about-story__iframe"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title="Our Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Stats bar */}
          <div className="about-story__stats-bar">
            {stats.map((s, i) => (
              <div key={i} className="about-story__stat-item">
                <span className="about-story__stat-val">{s.value}</span>
                <span className="about-story__stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Text */}
        <div className={`about-story__right ${isVisible ? 'as-visible' : ''}`}>
          <h2 className="about-story__title">Our Story</h2>
          <p className="about-story__highlight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          </p>
          <p className="about-story__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            dapibus dapibus porttitor. Maecenas est libero, varius a augue sed,
            malesuada malesuada erat. In hac habitasse platea dictumst. Praesent
            at diam sed quam aliquet posuere. Duis quis velit ullamcorper,
            porttitor leo at, mattis tortor. Donec tristique nunc a ipsum iaculis
            convallis. Maecenas aliquam, orci ut finibus ornare, diam odio blandit
            mi, nec vulputate diam lectus sit amet sapien.
          </p>

          {/* Checklist grid */}
          <div className="about-story__checklist">
            {checklistItems.map((item, i) => (
              <div key={i} className="about-story__check-item">
                <CheckCircle size={18} className="about-story__check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutStory