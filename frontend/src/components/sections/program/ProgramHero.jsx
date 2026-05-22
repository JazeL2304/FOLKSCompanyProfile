import { useState, useEffect, useRef } from 'react'
import heroImg1 from '../../../assets/Program/fotoprogram.jpg'
import heroImg2 from '../../../assets/Program/fotoprogram2.jpg'
import heroImg3 from '../../../assets/Program/fotoprogram3.jpg'

const slides = [heroImg1, heroImg2, heroImg3]

const ProgramHero = () => {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [direction, setDirection] = useState('next')
  const [prev, setPrev] = useState(null)
  const [dragStart, setDragStart] = useState(null)

  // Refs to avoid stale closure in setInterval
  const currentRef = useRef(0)
  const transitioningRef = useRef(false)
  const timerRef = useRef(null)

  useEffect(() => { currentRef.current = current }, [current])
  useEffect(() => { transitioningRef.current = transitioning }, [transitioning])

  const advance = (dir) => {
    if (transitioningRef.current) return
    const cur = currentRef.current
    const next = dir === 'next'
      ? (cur + 1) % slides.length
      : (cur - 1 + slides.length) % slides.length
    setDirection(dir)
    setPrev(cur)
    setTransitioning(true)
    transitioningRef.current = true
    setCurrent(next)
    currentRef.current = next
    setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
      transitioningRef.current = false
    }, 800)
  }

  // Auto-slide — runs once, uses refs so never stale
  useEffect(() => {
    timerRef.current = setInterval(() => advance('next'), 4500)
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    if (i === currentRef.current || transitioningRef.current) return
    advance(i > currentRef.current ? 'next' : 'prev')
    // Reset timer on manual nav
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => advance('next'), 4500)
  }

  const handleDragStart = (e) => setDragStart(e.touches ? e.touches[0].clientX : e.clientX)
  const handleDragEnd = (e) => {
    if (dragStart === null) return
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    if (Math.abs(dragStart - endX) > 40) {
      advance(dragStart - endX > 0 ? 'next' : 'prev')
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => advance('next'), 4500)
    }
    setDragStart(null)
  }

  return (
    <>
      <style>{`
        .program-hero {
          position: relative;
          padding: 100px 80px 60px;
          background: #ffffff;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .program-hero__bg-circle {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .program-hero__bg-circle--1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(16,86,71,0.06) 0%, transparent 70%);
          top: -100px; right: 10%;
        }
        .program-hero__bg-circle--2 {
          width: 250px; height: 250px;
          background: radial-gradient(circle, rgba(232,98,26,0.07) 0%, transparent 70%);
          bottom: -60px; left: 5%;
        }
        .program-hero__container {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center; width: 100%;
        }
        .program-hero__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 48px; font-weight: 800; color: #105647;
          line-height: 1.15; margin-bottom: 20px;
        }
        .program-hero__title--accent { color: #EF6D60; }
        .program-hero__desc {
          font-size: 15px; color: #6b7a99;
          line-height: 1.8; max-width: 440px; margin-bottom: 32px;
        }
        .program-hero__actions {
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
        }
        .program-hero__btn { text-decoration: none; padding: 14px 32px; font-size: 15px; }
        .program-hero__link {
          color: #105647; font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          text-decoration: none; font-size: 14px; transition: color 0.2s;
        }
        .program-hero__link:hover { color: #EF6D60; }

        /* ===== SLIDESHOW ===== */
        .ph-wrapper {
          position: relative; border-radius: 24px; overflow: hidden;
          height: 480px; box-shadow: 0 24px 64px rgba(16,86,71,0.18);
          cursor: grab; user-select: none;
        }
        .ph-wrapper:active { cursor: grabbing; }

        .ph-slide {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; will-change: transform, opacity; border-radius: 24px;
        }
        .ph-slide--idle { opacity: 0; z-index: 0; }
        .ph-slide--current {
          opacity: 1; z-index: 2;
          animation: kenBurns 5s ease-in-out forwards;
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.08) translate(3px, 2px); }
          100% { transform: scale(1.00) translate(0px, 0px); }
        }
        .ph-slide--enter-next {
          z-index: 3;
          animation: enterNext 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes enterNext {
          0%   { opacity: 0; transform: translateX(100%) scale(1.05); }
          100% { opacity: 1; transform: translateX(0%)   scale(1);    }
        }
        .ph-slide--enter-prev {
          z-index: 3;
          animation: enterPrev 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes enterPrev {
          0%   { opacity: 0; transform: translateX(-100%) scale(1.05); }
          100% { opacity: 1; transform: translateX(0%)    scale(1);    }
        }
        .ph-slide--leave-next {
          z-index: 1;
          animation: leaveNext 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes leaveNext {
          0%   { opacity: 1; transform: translateX(0%)   scale(1);    }
          100% { opacity: 0; transform: translateX(-28%) scale(0.94); }
        }
        .ph-slide--leave-prev {
          z-index: 1;
          animation: leavePrev 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes leavePrev {
          0%   { opacity: 1; transform: translateX(0%)  scale(1);    }
          100% { opacity: 0; transform: translateX(28%) scale(0.94); }
        }
        .ph-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(10,40,30,0.45) 100%);
          z-index: 4; pointer-events: none; border-radius: 24px;
        }
        .ph-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 5; width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.9); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #105647; font-size: 22px;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          line-height: 1; padding: 0;
          opacity: 0; transition: opacity 0.2s, background 0.2s, transform 0.2s;
        }
        .ph-wrapper:hover .ph-arrow { opacity: 1; }
        .ph-arrow--prev { left: 14px; }
        .ph-arrow--next { right: 14px; }
        .ph-arrow:hover {
          background: #105647; color: white;
          transform: translateY(-50%) scale(1.1);
        }
        .ph-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 4px; background: rgba(255,255,255,0.2);
          z-index: 5; border-radius: 0 0 24px 24px; overflow: hidden;
        }
        .ph-progress__fill {
          height: 100%; background: rgba(255,255,255,0.85); border-radius: 2px;
          animation: progressFill 4.5s linear forwards;
        }
        @keyframes progressFill { from { width: 0%; } to { width: 100%; } }
        .ph-dots {
          position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
          z-index: 5; display: flex; gap: 7px; align-items: center;
        }
        .ph-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.5);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.35s ease;
        }
        .ph-dot--active { width: 22px; border-radius: 3px; background: rgba(255,255,255,0.95); }

        @media (max-width: 768px) {
          .program-hero { padding: 100px 24px 60px; min-height: auto; }
          .program-hero__container { grid-template-columns: 1fr; gap: 40px; }
          .program-hero__title { font-size: 36px; }
          .ph-wrapper { height: 300px; }
        }
      `}</style>

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
              <a href="#pathways" className="btn-primary program-hero__btn">Lihat Program</a>
              <a href="#cta" className="program-hero__link">Hubungi Kami →</a>
            </div>
          </div>

          <div className="program-hero__right">
            <div
              className="ph-wrapper"
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              {slides.map((src, i) => {
                let cls = 'ph-slide ph-slide--idle'
                if (transitioning) {
                  if (i === current) cls = `ph-slide ph-slide--enter-${direction}`
                  else if (i === prev) cls = `ph-slide ph-slide--leave-${direction}`
                } else {
                  if (i === current) cls = 'ph-slide ph-slide--current'
                }
                return <img key={i} src={src} alt={`Slide ${i + 1}`} className={cls} draggable={false} />
              })}

              <div className="ph-overlay" />
              <button className="ph-arrow ph-arrow--prev" onClick={() => { advance('prev'); clearInterval(timerRef.current); timerRef.current = setInterval(() => advance('next'), 4500) }} aria-label="Previous">‹</button>
              <button className="ph-arrow ph-arrow--next" onClick={() => { advance('next'); clearInterval(timerRef.current); timerRef.current = setInterval(() => advance('next'), 4500) }} aria-label="Next">›</button>

              <div className="ph-dots">
                {slides.map((_, i) => (
                  <button key={i} className={`ph-dot ${current === i ? 'ph-dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <div className="ph-progress">
                <div key={current} className="ph-progress__fill" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProgramHero