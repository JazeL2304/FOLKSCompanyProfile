import { useEffect, useRef, useState } from 'react'
import valuePage from '../../assets/ValuePage.webp'

const ValueStats = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sectionTop = sectionRef.current?.offsetTop ?? 9999
    const handleScroll = () => {
      if (visible) return
      if (window.scrollY + window.innerHeight * 0.7 > sectionTop + 100) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible])

  return (
    <>
      <style>{`
        .valuestats {
          padding: 60px 0;
          background: white;
        }

        .valuestats__inner {
          max-width: 100%;
          margin: 0;
        }

        .valuestats__img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Fade in animation */
        .valuestats__inner {
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .valuestats__inner--visible {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .valuestats {
            padding: 40px 0;
          }
        }
      `}</style>
      <section id="tentang" className="valuestats" ref={sectionRef}>
        <div className={`valuestats__inner ${visible ? 'valuestats__inner--visible' : ''}`}>
          <img src={valuePage} alt="Value Stats" className="valuestats__img" />
        </div>
      </section>
    </>
  )
}

export default ValueStats