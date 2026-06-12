import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import AboutHero from '../components/sections/about/AboutHero'
import AboutStory from '../components/sections/about/AboutStory'
import AboutMission from '../components/sections/about/AboutMission'
import AboutTeam from '../components/sections/about/AboutTeam'
import AboutLocation from '../components/sections/about/AboutLocation'

const About = () => {
  return (
    <>
      <SEO title="Tentang Kami | FOLKS" description="Pelajari lebih lanjut tentang visi, misi, dan perjalanan FOLKS." />
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
        <AboutLocation />
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}

export default About