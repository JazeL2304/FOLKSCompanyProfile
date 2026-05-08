// src/pages/AdminLogin.jsx
// Route: /admin/login
// Hardcode credentials — ganti dengan Supabase Auth nanti

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import folksLogo from '../assets/FOLKS Institute Logo No Background.png'
import '../styles/AdminLogin.css'

const ADMIN_CREDENTIALS = {
  email: 'admin@folks.id',
  password: 'folks2026'
}

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (
        formData.email === ADMIN_CREDENTIALS.email &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        sessionStorage.setItem('admin_logged_in', 'true')
        navigate('/admin')
      } else {
        setError('Email atau password salah.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* Logo */}
        <div className="admin-login-logo">
          <img src={folksLogo} alt="FOLKS Institute" />
        </div>

        {/* Header */}
        <div className="admin-login-header">
          <span className="admin-login-badge">Login</span>
          <h1 className="admin-login-title">Welcome back</h1>
          <p className="admin-login-subtitle">Masuk untuk mengelola platform FOLKS Institute.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">

          {error && (
            <div className="admin-login-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <div className="al-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@folks.id"
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
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
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
  )
}