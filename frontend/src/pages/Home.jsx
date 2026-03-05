import '../styles/Home.css'
import Navbar from '../components/Navbar'
import Hero from '../components/sections/Hero'
import ValueStats from '../components/sections/ValueStats'
import WhyUs from '../components/sections/WhyUs'
import Programs from '../components/sections/Programs'
import Testimonials from '../components/sections/Testimonials'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <WhyUs />
      <Programs />
      <ValueStats />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default Home