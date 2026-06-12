import { useRef, useEffect, useState } from 'react'
import Map from '../../ui/Map'

const AboutLocation = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about-location" ref={sectionRef}>
      <style>{`
        .about-location {
          padding: 80px;
          background: #f8faff; /* Matching standard section background */
        }
        .al-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .al-header {
          text-align: center;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .al-visible .al-header {
          opacity: 1;
          transform: translateY(0);
        }
        .al-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #105647;
          margin-bottom: 12px;
        }
        .al-subtitle {
          color: #6b7a99;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        /* Shadcn-like Card Design for Map */
        .al-map-card {
          background: #ffffff;
          border-radius: 12px; /* shadcn rounded-xl */
          border: 1px solid #e2e8f0; /* shadcn border */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); /* shadcn shadow-md */
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }
        .al-visible .al-map-card {
          opacity: 1;
          transform: translateY(0);
        }
        .al-map-container {
          width: 100%;
          height: 450px;
          position: relative;
          background: #f1f5f9; /* Skeleton background before map loads */
        }
        .al-map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Address Details below map like a Card Footer */
        .al-card-footer {
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          border-top: 1px solid #e2e8f0;
          background: #fafafa;
        }
        .al-icon-wrapper {
          background: rgba(16, 86, 71, 0.1);
          color: #105647;
          padding: 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .al-address-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .al-address-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          color: #1a202c;
          font-size: 16px;
        }
        .al-address-desc {
          color: #4a5568;
          font-size: 14px;
          line-height: 1.6;
        }

        .al-btn-maps {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 8px 16px;
          background: #105647;
          color: white;
          text-decoration: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .al-btn-maps:hover {
          background: #0b3d32;
        }

        @media (max-width: 768px) {
          .about-location {
            padding: 60px 24px;
          }
          .al-title {
            font-size: 28px;
          }
          .al-map-container {
            height: 300px;
          }
        }
      `}</style>
      <div className={`al-container ${visible ? 'al-visible' : ''}`}>
        <div className="al-header">
          <h2 className="al-title">Our Location</h2>
          <p className="al-subtitle">
            Temukan kami. Kami siap membantu perjalanan belajar Anda secara langsung.
          </p>
        </div>

        <div className="al-map-card">
          <div className="al-map-container">
            {visible && (
              <Map 
                center={[-6.2625056, 106.8248386]} 
                zoom={16} 
                addressTitle="FOLKS Institute" 
                addressDesc="Jl. Duren Tiga Selatan No.0B 4" 
                googleMapsUrl="https://www.google.com/maps/search/?api=1&query=-6.2625056,106.8248386"
              />
            )}
          </div>
          <div className="al-card-footer">
            <div className="al-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="al-address-text">
              <span className="al-address-title">Headquarters</span>
              <span className="al-address-desc">
                Jl. Duren Tiga Selatan No.0B 4, RT.4/RW.2, Duren Tiga, Kec. Pancoran, <br />
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12760
              </span>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=-6.2625056,106.8248386" 
                target="_blank" 
                rel="noreferrer" 
                className="al-btn-maps"
              >
                Buka di Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutLocation
