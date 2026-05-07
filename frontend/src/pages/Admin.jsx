// src/pages/Admin.jsx
// Route: /admin
// TODO production: tambahkan auth guard (cek session Supabase sebelum render)

import { useState } from 'react'
import '../styles/Admin.css'

// ─── Components ───────────────────────────────────────────
import Dashboard from '../components/admin/Dashboard'
import BlogManager from '../components/admin/BlogManager'
import RegistrationManager from '../components/admin/RegistrationManager'
import ProgramManager from '../components/admin/ProgramManager'
import folksLogo from '../assets/FOLKS Institute Logo No Background.png'

// ─── Icons ────────────────────────────────────────────────
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
)
const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)
const IconBell = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
)
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

// ─── Nav Config ───────────────────────────────────────────
const NAV = [
  {
    section: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', Icon: IconGrid }]
  },
  {
    section: 'Konten',
    items: [
      { id: 'blog', label: 'Blog & Artikel', Icon: IconDoc },
      { id: 'programs', label: 'Program', Icon: IconBook }
    ]
  },
  {
    section: 'Operasional',
    items: [{ id: 'registrations', label: 'Pendaftaran', Icon: IconUsers, badge: true }]
  }
]

const PAGE_META = {
  dashboard:     { title: 'Dashboard', desc: 'Overview keseluruhan aktivitas' },
  blog:          { title: 'Blog & Artikel', desc: 'Kelola konten artikel yang dipublikasikan' },
  programs:      { title: 'Program', desc: 'Kelola program kursus yang tersedia' },
  registrations: { title: 'Pendaftaran', desc: 'Konfirmasi pembayaran & kelola pendaftar' }
}

// ─── Mock pending count — ganti dengan Supabase query ─────
const PENDING_COUNT = 3

// ─── Main Component ───────────────────────────────────────
export default function Admin() {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const meta = PAGE_META[activePage] || PAGE_META.dashboard

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':     return <Dashboard onNavigate={setActivePage} />
      case 'blog':          return <BlogManager />
      case 'registrations': return <RegistrationManager />
      case 'programs':      return <ProgramManager />
      default:              return <Dashboard onNavigate={setActivePage} />
    }
  }

  const navigate = (id) => {
    setActivePage(id)
    setSidebarOpen(false)
  }

  return (
    <div className="admin-layout">

      {/* ── Mobile Backdrop ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 98
          }}
        />
      )}

      {/* ════════════════════════════════════════
          SIDEBAR
      ════════════════════════════════════════ */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <img
            src={folksLogo}
            alt="FOLKS Institute"
            className="sidebar-logo-img"
          />
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV.map(section => (
            <div key={section.section}>
              <div className="sidebar-section-label">{section.section}</div>
              {section.items.map(({ id, label, Icon, badge }) => (
                <button
                  key={id}
                  className={`sidebar-nav-item ${activePage === id ? 'active' : ''}`}
                  onClick={() => navigate(id)}
                >
                  <Icon />
                  {label}
                  {badge && PENDING_COUNT > 0 && (
                    <span className="sidebar-nav-badge">{PENDING_COUNT}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">A</div>
            <div className="sidebar-user-info">
              <span>Super Admin</span>
              <span>admin@folks.id</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════
          MAIN
      ════════════════════════════════════════ */}
      <main className="admin-main">

        {/* Topbar */}
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka sidebar"
            >
              <IconMenu />
            </button>
            <div className="topbar-left">
              <h1>{meta.title}</h1>
              <p>{meta.desc}</p>
            </div>
          </div>

          <div className="topbar-right">
            <button className="topbar-btn" title="Notifikasi">
              <IconBell />
              {PENDING_COUNT > 0 && <span className="topbar-notif-dot" />}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ fontSize: 12, gap: 5 }}
            >
              <IconExternal />
              Lihat Website
            </a>
          </div>
        </div>

        {/* Page Content */}
        <div className="admin-content">
          {renderPage()}
        </div>

      </main>
    </div>
  )
}