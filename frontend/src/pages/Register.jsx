import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: integrate with your auth API
    console.log('Register:', formData)
    navigate('/login')
  }

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-logo">
          <img src="/src/assets/FOLKS Institute Logo No Background.png" alt="FOLKS Institute" />
        </div>

        <div className="auth-form-wrapper">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join our community of learners today.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-btn">Create Account</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>

        <p className="auth-footer">© 2024 Folks Education. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="auth-right auth-right--register">
        <div className="auth-right-content">
          <div className="quote-card">
            <div className="quote-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L13.09 8.26L19 7L15.45 11.87L21 14L15.45 16.13L19 21L13.09 19.74L12 26L10.91 19.74L5 21L8.55 16.13L3 14L8.55 11.87L5 7L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <div className="quote-header">
              <strong>Curation Excellence</strong>
              <span>Verified by Academic Peers</span>
            </div>
            <blockquote>
              "Education is the most powerful tool which you can use to change the world."
            </blockquote>
            <cite>Nelson Mandela</cite>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register