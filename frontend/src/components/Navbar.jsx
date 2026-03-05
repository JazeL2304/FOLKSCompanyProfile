import { useState, useEffect } from 'react'
import '../styles/Navbar.css'
import logo from '../assets/FOLKS Group Logo No Bakcground.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Beranda', 'Tentang', 'Program', 'Promo']

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">

        <a href="#beranda" className="navbar__logo">
          <img src={logo} alt="Intelligence Corp Logo" className="navbar__logo-img" />
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}>{link}</a>
            </li>
          ))}
        </ul>

        <button className="btn-primary navbar__login">Login</button>

      </div>
    </nav>
  )
}

export default Navbar