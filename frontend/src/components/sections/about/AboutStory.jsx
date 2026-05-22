import { useEffect, useRef, useState } from 'react'
import { CheckCircle } from 'lucide-react'

const checklistItems = [
  'Kurikulum terstruktur & terakreditasi',
  'Guru berpengalaman & bersertifikat',
  'Metode belajar interaktif & fun',
  'Program untuk SD, SMP, dan SMA',
  'Suasana belajar yang nyaman & supportif',
  'Progres siswa terpantau setiap bulan',
]

const YOUTUBE_VIDEO_ID = 'Pz6esoyf454'

const AboutStory = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .about-story {
          padding: 120px 80px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        /* soft bg circle */
        .about-story::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,86,71,0.055) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .about-story__container {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 88px; align-items: center;
          position: relative; z-index: 1;
        }

        /* ── Animate ── */
        .about-story__left {
          opacity: 0; transform: translateX(-36px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .about-story__right {
          opacity: 0; transform: translateX(36px);
          transition: opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s;
        }
        .about-story__left.as-visible { opacity:1; transform:translateX(0); }
        .about-story__right.as-visible { opacity:1; transform:translateX(0); }

        /* ── Video ── */
        .about-story__video-wrapper {
          border-radius: 20px; overflow: hidden;
          aspect-ratio: 16/10; position: relative;
          background: #0a231c;
          box-shadow: 0 28px 72px rgba(16,86,71,0.18), 0 4px 16px rgba(0,0,0,0.08);
        }

        .about-story__video-thumb {
          position: relative; width: 100%; height: 100%;
          cursor: pointer; overflow: hidden;
        }
        .about-story__thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .about-story__video-thumb:hover .about-story__thumb-img { transform: scale(1.04); }

        .about-story__thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,35,28,0.55) 0%, rgba(10,35,28,0.08) 60%, transparent 100%);
        }

        .about-story__play-btn {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 72px; height: 72px;
          background: #EF6D60; border: none; border-radius: 50%;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 8px 32px rgba(239,109,96,0.5);
        }
        .about-story__play-btn::before {
          content: ''; position: absolute; inset: -8px;
          border-radius: 50%; border: 2px solid rgba(239,109,96,0.35);
          animation: ping-ring 2s infinite;
        }
        @keyframes ping-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .about-story__play-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 12px 40px rgba(239,109,96,0.65);
        }

        .about-story__iframe { width: 100%; height: 100%; border: none; }



        /* ── Right ── */
        .about-story__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: #EF6D60; margin-bottom: 16px;
        }
        .about-story__eyebrow-line {
          width: 28px; height: 2px;
          background: #EF6D60; border-radius: 2px;
        }

        .about-story__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 40px; font-weight: 800;
          color: #105647; margin-bottom: 8px;
          line-height: 1.1; letter-spacing: -0.5px;
        }

        .about-story__highlight {
          font-size: 15px; font-weight: 600;
          color: #1a1a1a; margin-bottom: 18px; line-height: 1.65;
        }

        .about-story__desc {
          font-size: 14px; color: #555;
          line-height: 1.95; margin-bottom: 32px;
        }

        /* ── Checklist ── */
        .about-story__checklist-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 700;
          color: #888; text-transform: uppercase;
          letter-spacing: 1.2px; margin-bottom: 14px;
        }

        .about-story__checklist {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }

        .about-story__check-item {
          display: flex; align-items: flex-start;
          gap: 9px; font-size: 13px;
          color: #EF6D60; line-height: 1.55;
          font-weight: 500;
        }

        .about-story__check-icon {
          color: #EF6D60; flex-shrink: 0; margin-top: 1px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-story { padding: 80px 40px; }
          .about-story__container { gap: 48px; }
        }
        @media (max-width: 768px) {
          .about-story { padding: 60px 24px; }
          .about-story__container { grid-template-columns: 1fr; gap: 40px; }
          .about-story__checklist { grid-template-columns: 1fr; }
          .about-story__title { font-size: 30px; }
        }
      `}</style>

      <section className="about-story" ref={sectionRef}>
        <div className="about-story__container">

          {/* Left: Video */}
          <div className={`about-story__left ${isVisible ? 'as-visible' : ''}`}>
            <div className="about-story__video-wrapper">
              {!isPlaying ? (
                <div className="about-story__video-thumb" onClick={() => setIsPlaying(true)}>
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                    alt="Our Story Video"
                    className="about-story__thumb-img"
                    onError={(e) => { e.target.src = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg` }}
                  />
                  <div className="about-story__thumb-overlay" />
                  <button className="about-story__play-btn" aria-label="Play video">
                    <svg viewBox="0 0 24 24" fill="#ffffff" width="28" height="28">
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

          </div>

          {/* Right: Text */}
          <div className={`about-story__right ${isVisible ? 'as-visible' : ''}`}>
            <div className="about-story__eyebrow">
              <span className="about-story__eyebrow-line" />
              Tentang Kami
            </div>

            <h2 className="about-story__title">Our Story</h2>

            <p className="about-story__highlight">
              FOLKS Institute lahir dari keyakinan bahwa setiap anak berhak belajar
              bahasa Inggris dengan cara yang menyenangkan dan efektif.
            </p>

            <p className="about-story__desc">
              Berlokasi di Jakarta Selatan, kami hadir untuk mendampingi siswa SD, SMP,
              dan SMA dalam perjalanan mereka menguasai bahasa Inggris. Bukan sekadar
              menghafal — tapi benar-benar paham, percaya diri, dan berani berbicara.
            </p>

            <p className="about-story__checklist-title">Yang membuat kami berbeda</p>

            <div className="about-story__checklist">
              {checklistItems.map((item, i) => (
                <div key={i} className="about-story__check-item">
                  <CheckCircle size={17} className="about-story__check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default AboutStory