import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import AboutHero from '../components/sections/about/AboutHero'
import AboutStory from '../components/sections/about/AboutStory'
import AboutMission from '../components/sections/about/AboutMission'
import AboutTeam from '../components/sections/about/AboutTeam'

const About = () => {
  return (
    <>
      <style>{`
        .about-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }
      `}</style>
      <div className="about-page">
        <Navbar />
        <AboutHero />
        <AboutStory />
        <AboutMission />
        <AboutTeam />
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}

export default About