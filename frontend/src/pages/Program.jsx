import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import ProgramHero from '../components/sections/program/ProgramHero'
import AcademicPathways from '../components/sections/program/AcademicPathways'
import ProgramCTA from '../components/sections/program/ProgramCTA'

const Program = () => {
  return (
    <>
      <style>{`
        /* ===== PROGRAM PAGE ===== */
        .program-page {
          width: 100%;
          min-height: 100vh;
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