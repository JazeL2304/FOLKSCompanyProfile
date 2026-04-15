import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/FOLKS Group Logo No Bakcground.png'
import '../styles/Navbar.css'

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Program', path: '/program' },
  { label: 'Promo', path: '/promo' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="FOLKS Group" className="navbar__logo-img" />
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/login" className="btn-primary navbar__login">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar