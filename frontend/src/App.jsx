import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import './styles/global.css'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Program = lazy(() => import('./pages/Program'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Payment = lazy(() => import('./pages/Payment'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Admin = lazy(() => import('./pages/Admin'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'))

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Memuat...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/program" element={<Program />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/program/:level" element={<ProgramDetail />} />
        </Routes>
      </Suspense>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App