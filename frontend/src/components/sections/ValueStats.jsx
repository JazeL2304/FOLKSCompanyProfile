import { useEffect, useRef, useState } from 'react'
import '../../styles/ValueStats.css'
import valuePage from '../../assets/ValuePage.png'

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
    <section id="tentang" className="valuestats" ref={sectionRef}>
      <div className={`valuestats__inner ${visible ? 'valuestats__inner--visible' : ''}`}>
        <img src={valuePage} alt="Value Stats" className="valuestats__img" />
      </div>
    </section>
  )
}

export default ValueStats