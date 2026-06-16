import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <>
      <style>{`
        /* ===== AUTH PAGES ===== */
        .auth-page {
          display: flex;
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Segoe UI', sans-serif;
        }

        /* LEFT PANEL */
        .auth-left {
          width: 52%;
          display: flex;
          flex-direction: column;
          padding: 40px 60px;
          position: relative;
        }

        .auth-logo img {
          height: 45px;                 /* ← dikecilkan dari 70px */
          object-fit: contain;
        }

        .auth-form-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 440px;
          margin-top: 32px;
        }

        .auth-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--primary);
          margin: 0 0 8px 0;
          line-height: 1.2;
        }

        .auth-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
          margin: 0 0 32px 0;
        }

        /* FORM */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary);        /* ← hijau */
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 50px;
          border: 1.5px solid transparent;
          transition: border-color 0.2s;
          overflow: hidden;
        }

        .input-wrapper:focus-within {
          border-color: var(--primary); /* ← hijau */
          background: #fff;
        }

        .input-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          color: #9ca3af;
          flex-shrink: 0;
        }

        .input-wrapper input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 14px 16px 14px 0;
          font-size: 0.9rem;
          color: #374151;
          outline: none;
        }

        .input-wrapper input::placeholder {
          color: #b0b7c3;
        }

        .toggle-password {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 14px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .toggle-password:hover {
          color: var(--primary);        /* ← hijau */
        }

        /* FORM OPTIONS */
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -4px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #374151;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-label input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: var(--primary); /* ← hijau */
          cursor: pointer;
        }

        .forgot-link {
          font-size: 0.88rem;
          color: var(--primary);        /* ← hijau */
          text-decoration: none;
          font-weight: 600;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        /* SUBMIT BUTTON */
        .auth-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #EF6D60, #d95a4d);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 4px;
          box-shadow: 0 4px 16px rgba(239, 109, 96, 0.35);
        }

        .auth-btn:hover {
          opacity: 0.93;
          transform: translateY(-1px);
        }

        .auth-btn:active {
          transform: translateY(0);
        }

        /* SWITCH LINK */
        .auth-switch {
          text-align: center;
          font-size: 0.9rem;
          color: #6b7280;
          margin-top: 24px;
        }

        .auth-link {
          color: var(--primary);        /* ← hijau */
          font-weight: 700;
          text-decoration: none;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        /* FOOTER */
        .auth-footer {
          font-size: 0.78rem;
          color: #9ca3af;
          text-align: left;
          margin-top: auto;
          padding-top: 24px;
        }

        /* ===== RIGHT PANEL ===== */
        .auth-right {
          width: 48%;
          position: relative;
          border-radius: 20px;
          margin: 16px 16px 16px 0;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 32px;
        }

        .auth-right--login {
          background: linear-gradient(160deg, #2d6a80 0%, #1a3d52 40%, #0f2535 100%);
        }

        .auth-right--register {
          background: linear-gradient(160deg, #0d3d2e 0%, #062a1e 50%, #021510 100%);
        }

        .auth-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 60%);
        }

        /* FEATURED CARD (Login) */
        .featured-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 28px 28px 24px;
          color: white;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .featured-badge {
          display: inline-block;
          background: #EF6D60;
          color: white;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 1.2px;
          padding: 5px 12px;
          border-radius: 50px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .featured-title {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 14px 0;
        }

        .featured-title em {
          font-style: normal;
          color: var(--primary);
        }

        .featured-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin: 0 0 20px 0;
        }

        .featured-users {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.75);
        }

        .user-avatars {
          display: flex;
        }

        .user-avatars img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          margin-left: -8px;
          object-fit: cover;
        }

        .user-avatars img:first-child {
          margin-left: 0;
        }

        /* QUOTE CARD (Register) */
        .quote-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 28px;
          color: white;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .quote-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #EF6D60;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .quote-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 16px;
        }

        .quote-header strong {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.9);
        }

        .quote-header span {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
        }

        .quote-card blockquote {
          font-size: 1.2rem;
          font-weight: 800;
          color: rgba(255,255,255,0.95);
          line-height: 1.45;
          margin: 0 0 12px 0;
          font-style: normal;
        }

        .quote-card cite {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
          font-style: normal;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .auth-page {
            flex-direction: column;
          }

          .auth-left {
            width: 100%;
            padding: 32px 24px;
          }

          .auth-right {
            width: calc(100% - 32px);
            margin: 0 16px 16px;
            min-height: 240px;
          }

          .auth-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
      <div className="auth-page">
        {/* Left Panel */}
        <div className="auth-left">
          <div className="auth-logo">
            <img src="/src/assets/FOLKS Institute Logo No Background.webp" alt="FOLKS Institute" />
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
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
                      <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
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
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

          <p className="auth-footer">© 2026 FOLKS. All Rights Reserved.</p>
        </div>

        {/* Right Panel */}
        <div className="auth-right auth-right--register">
          <div className="auth-right-content">
            <div className="quote-card">
              <div className="quote-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L13.09 8.26L19 7L15.45 11.87L21 14L15.45 16.13L19 21L13.09 19.74L12 26L10.91 19.74L5 21L8.55 16.13L3 14L8.55 11.87L5 7L10.91 8.26L12 2Z" />
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
    </>
  )
}

export default Register