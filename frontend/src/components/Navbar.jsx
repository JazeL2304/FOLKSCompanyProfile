import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Globe } from 'lucide-react'
import logo from '../assets/FOLKS Institute Logo No Background.png'

const Navbar = () => {
  const { lang, toggleLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/tentang' },
    { label: t.nav.program, path: '/program' },
    { label: t.nav.blog, path: '/blog' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Prevent body scroll saat menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: white;
          transition: all 0.3s ease;
          border-bottom: 1px solid var(--border);
        }

        .navbar--scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          border-bottom: none;
        }

        .navbar__inner {
          max-width: 100%;
          margin: 0;
          padding: 0 40px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ---- Logo ---- */
        .navbar__logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar__logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        /* ---- Nav Links ---- */
        .navbar__links {
          display: flex;
          gap: 36px;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar__link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: var(--text-dark);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
        }

        .navbar__link:hover {
          color: var(--primary);
        }

        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .navbar__link:hover::after {
          transform: scaleX(1);
        }

        .navbar__link--active {
          color: var(--primary);
          font-weight: 700;
        }

        .navbar__link--active::after {
          transform: scaleX(1);
          transition: transform 0.2s ease;
        }

        .navbar__links:hover .navbar__link--active::after {
          transform: scaleX(0);
        }

        .navbar__links:hover .navbar__link:hover::after {
          transform: scaleX(1);
        }

        /* ---- Right side ---- */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navbar__login {
          font-size: 14px !important;
          padding: 10px 24px !important;
        }

        /* Login di dalam mobile menu — hidden di desktop */
        .navbar__login-mobile {
          display: none;
        }

        /* ---- Hamburger ---- */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .navbar__hamburger:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .navbar__hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        /* Animasi hamburger jadi X */
        .navbar__hamburger--open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ---- Overlay ---- */
        .navbar__overlay {
          position: fixed;
          inset: 0;
          top: 72px;
          background: rgba(0, 0, 0, 0.3);
          z-index: 999;
        }

        .lang-toggle {
          background: transparent;
          border: 1.5px solid var(--primary);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lang-toggle:hover {
          background: var(--primary);
          color: white;
        }

        /* ================================
           RESPONSIVE
        ================================ */
        @media (max-width: 768px) {
          .navbar__inner {
            padding: 0 20px;
            height: 64px;
          }

          .navbar__hamburger {
            display: flex;
          }

          .navbar__login {
            display: none !important;
          }

          .navbar__links {
            display: flex;
            flex-direction: column;
            gap: 0;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: white;
            padding: 12px 0 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            border-top: 1px solid var(--border);
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-8px);
            transition: opacity 0.25s ease, transform 0.25s ease;
          }

          .navbar__links--open {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0);
          }

          .navbar__links li {
            width: 100%;
          }

          .navbar__link {
            display: block;
            padding: 14px 24px;
            font-size: 16px;
            border-bottom: 1px solid var(--border);
          }

          /* Di mobile, nonaktifkan underline hover effect */
          .navbar__link::after {
            display: none;
          }

          .navbar__link--active::after {
            display: none;
          }

          .navbar__link--active {
            background: rgba(16, 86, 71, 0.05);
            padding-left: 28px;
            border-left: 3px solid var(--primary);
          }

          .navbar__login-mobile {
            display: flex;
            justify-content: center;
            padding: 20px 24px 0;
          }

          .navbar__login-mobile .btn-primary {
            width: 100%;
            text-align: center;
            padding: 14px !important;
            font-size: 15px !important;
            border-radius: 12px !important;
          }

          .navbar__overlay {
            top: 64px;
          }
        }

        @media (max-width: 480px) {
          .navbar__logo-img {
            height: 34px;
          }
        }
      `}</style>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">

          <Link to="/" className="navbar__logo">
            <img src={logo} alt="FOLKS Institute" className="navbar__logo-img" />
          </Link>

          <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
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
            <li className="navbar__login-mobile">
              <Link to="/login" className="btn-primary">{t.nav.login}</Link>
            </li>
          </ul>

          <div className="navbar__right">
            <button onClick={toggleLang} className="lang-toggle">
              <Globe size={16} style={{ marginRight: '6px' }} />
              {lang === 'id' ? 'ID (Indonesia)' : 'EN (English)'}
            </button>
            <Link to="/login" className="btn-primary navbar__login">{t.nav.login}</Link>
            <button
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>

        {/* Overlay saat menu mobile open */}
        {menuOpen && (
          <div
            className="navbar__overlay"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>
    </>
  )
}

export default Navbar