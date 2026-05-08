import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: integrate with your auth API
    console.log('Login:', formData)
    navigate('/')
  }

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-logo">
          <img src="/src/assets/FOLKS Institute Logo No Background.png" alt="FOLKS Institute" />
        </div>

        <div className="auth-form-wrapper">
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
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
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className="auth-btn">Sign In</button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
          </p>
        </div>

        <p className="auth-footer">© 2025 FOLKS. All Rights Reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="auth-right auth-right--login">
        <div className="auth-right-content">
          <div className="featured-card">
            <span className="featured-badge">FEATURED PROGRAM</span>
            <h2 className="featured-title">
              Elevate your <em>intellectual journey</em> with curated insights.
            </h2>
            <p className="featured-desc">
              Join 50,000+ educators and learners building the future of peer-to-peer knowledge exchange.
            </p>
            <div className="featured-users">
              <div className="user-avatars">
                <img src="https://i.pravatar.cc/32?img=1" alt="user" />
                <img src="https://i.pravatar.cc/32?img=2" alt="user" />
                <img src="https://i.pravatar.cc/32?img=3" alt="user" />
              </div>
              <span>Active folks currently learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login