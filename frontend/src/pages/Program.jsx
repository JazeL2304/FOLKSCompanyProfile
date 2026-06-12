import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import ProgramHero from '../components/sections/program/ProgramHero'
import AcademicPathways from '../components/sections/program/AcademicPathways'
import ProgramCTA from '../components/sections/program/ProgramCTA'

const Program = () => {
  return (
    <>
      <SEO title="Program Kami | FOLKS" description="Daftar program unggulan dari FOLKS untuk pengembangan Anda." />
      <style>{`
        /* ===== PROGRAM PAGE ===== */
        @keyframes pageFadeIn {
          0% {
            opacity: 0;
            transform: translateY(15px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .program-page {
          width: 100%;
          min-height: 100vh;
          animation: pageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>
      <div className="program-page">
        <Navbar />
        <ProgramHero />
        <AcademicPathways />
        <ProgramCTA />
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}

export default Program