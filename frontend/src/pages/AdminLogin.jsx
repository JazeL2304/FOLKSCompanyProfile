import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import folksLogo from '../assets/FOLKS Institute Logo No Background.webp'

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Email atau password salah.')
        return
      }

      sessionStorage.setItem('admin_logged_in', 'true')
      sessionStorage.setItem('admin_token', data.token)
      navigate('/admin')

    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan backend berjalan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f4f2;
          font-family: 'Segoe UI', system-ui, sans-serif;
          padding: 24px;
        }

        .admin-login-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8e5;
          padding: 40px 44px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 24px rgba(16, 86, 71, 0.08);
        }

        .admin-login-logo {
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .admin-login-logo img {
          height: 34px;
          width: auto;
          object-fit: contain;
        }

        .admin-login-header {
          margin-bottom: 28px;
        }

        .admin-login-badge {
          display: inline-block;
          background: rgba(16, 86, 71, 0.08);
          color: #105647;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 11px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .admin-login-title {
          font-size: 26px;
          font-weight: 800;
          color: #1a2e28;
          margin: 0 0 6px;
          letter-spacing: -0.4px;
        }

        .admin-login-subtitle {
          font-size: 14px;
          color: #6b8a80;
          margin: 0;
          line-height: 1.5;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .admin-login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.07);
          color: #dc2626;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid rgba(239, 68, 68, 0.18);
        }

        .al-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .al-field label {
          font-size: 12px;
          font-weight: 600;
          color: #6b8a80;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .al-field input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #e2e8e5;
          border-radius: 8px;
          font-size: 14px;
          color: #1a2e28;
          background: #f5f7f5;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          font-family: inherit;
        }

        .al-field input:focus {
          border-color: #105647;
          background: #ffffff;
        }

        .al-field input::placeholder {
          color: #b0c8c0;
        }

        .al-password-wrap {
          position: relative;
        }

        .al-password-wrap input {
          padding-right: 44px;
        }

        .al-eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #a0b8b0;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.2s;
        }

        .al-eye-btn:hover {
          color: #105647;
        }

        .al-submit-btn {
          width: 100%;
          padding: 13px;
          background: #105647;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
          margin-top: 4px;
        }

        .al-submit-btn:hover:not(:disabled) {
          background: #1a7a60;
        }

        .al-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .al-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: al-spin 0.6s linear infinite;
          flex-shrink: 0;
        }

        @keyframes al-spin {
          to { transform: rotate(360deg); }
        }

        .admin-login-note {
          font-size: 13px;
          color: #a0b8b0;
          text-align: center;
          margin: 0;
        }

        .admin-login-note a {
          color: #105647;
          font-weight: 600;
          text-decoration: none;
        }

        .admin-login-note a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .admin-login-card {
            padding: 32px 24px;
          }
        }
      `}</style>

      <div className="admin-login-page">
        <div className="admin-login-card">

          <div className="admin-login-logo">
            <img src={folksLogo} alt="FOLKS Institute" />
          </div>

          <div className="admin-login-header">
            <span className="admin-login-badge">Login</span>
            <h1 className="admin-login-title">Welcome back</h1>
            <p className="admin-login-subtitle">Masuk untuk mengelola platform FOLKS Institute.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">

            {error && (
              <div className="admin-login-error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="al-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="al-field">
              <label>Password</label>
              <div className="al-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="al-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="al-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="al-spinner" />
                  Memverifikasi...
                </>
              ) : (
                'Login'
              )}
            </button>

          </form>

        </div>
      </div>
    </>
  )
}