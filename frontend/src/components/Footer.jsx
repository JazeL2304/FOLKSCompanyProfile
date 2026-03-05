import '../styles/Footer.css'
import logo from '../assets/FOLKS Group Word Only No Background.png'
import worldpic from '../assets/worldpicture.png'
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, MessageCircle, Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* LEFT - Logo + Address + Socials */}
        <div className="footer__brand">
          <img src={logo} alt="FOLKS Group" className="footer__logo" />
          <p className="footer__country">INDONESIA</p>
          <p className="footer__address">
            Jl. Duren Tiga Selatan No.08 4, RT.4/RW.2,<br />
            Duren Tiga, Kec. Pancoran, Kota Jakarta<br />
            Selatan, Daerah Khusus Ibukota Jakarta 12760
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-btn" aria-label="WhatsApp"><MessageCircle size={18} /></a>
            <a href="#" className="footer__social-btn" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className="footer__social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" className="footer__social-btn" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>

        {/* CENTER - Navigasi */}
        <div className="footer__nav">
          <h4 className="footer__heading">Navigasi</h4>
          <ul className="footer__links">
            {['Beranda', 'Tentang', 'Program', 'Promo'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT - Hubungi Kami */}
        <div className="footer__contact">
          <h4 className="footer__heading">Hubungi Kami</h4>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon"><Mail size={16} /></span>
              jastinlim2304@gmail.com
            </li>
            <li>
              <span className="footer__contact-icon"><Phone size={16} /></span>
              +62 822 8999 3655
            </li>
            <li>
              <span className="footer__contact-icon"><MapPin size={16} /></span>
              Jakarta, Indonesia
            </li>
          </ul>
        </div>

      </div>

      {/* World picture decoration */}
      <div className="footer__world-wrap">
        <img src={worldpic} alt="" className="footer__world" />
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>© 2025 Intelligence Corp. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer