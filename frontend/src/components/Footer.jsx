import logo from '../assets/FOLKS Institute Logo Word Only No Background.png'
import worldpic from '../assets/worldpicture.png'
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  return (
    <>
      <style>{`
        .footer {
          background: white;
          border-top: 1px solid #eef0f5;
          padding: 60px 5% 0;
          position: relative;
          overflow: hidden;
        }

        .footer__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1fr;
          gap: 60px;
          padding-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        /* Brand */
        .footer__logo {
          height: 80px;
          width: auto;
          object-fit: contain;
          margin-bottom: 20px;
          display: block;
        }

        .footer__country {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: var(--primary);
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }

        .footer__address {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        /* Socials */
        .footer__socials {
          display: flex;
          gap: 10px;
        }

        .footer__social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #e0e6f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .footer__social-btn:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          transform: translateY(-2px);
        }

        /* Nav */
        .footer__heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .footer__links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__links a {
          font-size: 14px;
          color: var(--accent);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer__links a:hover {
          color: var(--primary);
        }

        /* Contact */
        .footer__contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer__contact-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-dark);
        }

        .footer__contact-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--light-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        /* Bottom */
        .footer__bottom {
          border-top: 1px solid #eef0f5;
          padding: 20px 0;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer__bottom p {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* World picture - sudut kanan bawah footer terpotong */
        .footer__world-wrap {
          position: absolute;
          bottom: -100px;
          right: -100px;
          pointer-events: none;
          z-index: 0;
        }

        .footer__world {
          width: 650px;
          opacity: 0.4;
          display: block;
        }

        @media (max-width: 900px) {
          .footer__inner {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          /* Brand full width di baris pertama */
          .footer__brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 600px) {
          .footer {
            padding: 48px 5% 0;
          }

          .footer__inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .footer__brand {
            grid-column: auto;
          }

          .footer__logo {
            height: 60px;
          }

          .footer__world {
            width: 300px;
          }

          .footer__world-wrap {
            bottom: -40px;
            right: -40px;
          }
        }
      `}</style>
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
              <a href="https://api.whatsapp.com/send?phone=6287886180776" className="footer__social-btn" aria-label="WhatsApp"><MessageCircle size={18} /></a>
              <a href="#" className="footer__social-btn" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="footer__social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className="footer__social-btn" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>

          {/* CENTER - Navigasi */}
          <div className="footer__nav">
            <h4 className="footer__heading">{t.footer.nav_heading}</h4>
            <ul className="footer__links">
              <li><a href="/">{t.nav.home}</a></li>
              <li><a href="/tentang">{t.nav.about}</a></li>
              <li><a href="/program">{t.nav.program}</a></li>
              <li><a href="/blog">{t.nav.blog}</a></li>
            </ul>
          </div>

          {/* RIGHT - Hubungi Kami */}
          <div className="footer__contact">
            <h4 className="footer__heading">{t.footer.contact_heading}</h4>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-icon"><Mail size={16} /></span>
                mailus.folks@gmail.com
              </li>
              <li>
                <span className="footer__contact-icon"><Phone size={16} /></span>
                +62 878 8618 0776
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
          <p>{t.footer.rights}</p>
        </div>
      </footer>
    </>
  )
}

export default Footer