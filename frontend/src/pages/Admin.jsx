// src/pages/Admin.jsx
// Route: /admin
// Auth guard: cek sessionStorage, redirect ke /admin/login kalau belum login
// TODO production: ganti sessionStorage dengan Supabase session check

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Dashboard from '../components/admin/Dashboard'
import BlogManager from '../components/admin/BlogManager'
import RegistrationManager from '../components/admin/RegistrationManager'
import ProgramManager from '../components/admin/ProgramManager'
import folksLogo from '../assets/FOLKS Institute Logo No Background.webp'

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
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

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

const PENDING_COUNT = 0

export default function Admin() {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true'
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in')
    window.location.href = '/admin/login'
  }

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
    <>
      <style>{`
        /* ============================================================
           Admin.css — FOLKS Institute Admin Panel
           Design: Clean sidebar dashboard, pakai --primary & --accent
           ============================================================ */

        :root {
          --primary: #105647;
          --primary-light: #1a7a60;
          --primary-dark: #0b3d32;
          --accent: #EF6D60;
          --accent-light: #f28a80;
          --sidebar-width: 260px;
          --topbar-height: 64px;
          --bg: #f5f7f5;
          --card-bg: #ffffff;
          --border: #e2e8e5;
          --text-main: #1a2e28;
          --text-muted: #6b8a80;
          --text-light: #a0b8b0;
          --success: #22c55e;
          --warning: #f59e0b;
          --danger: #ef4444;
          --info: #3b82f6;
          --shadow-sm: 0 1px 3px rgba(16, 86, 71, 0.08);
          --shadow-md: 0 4px 16px rgba(16, 86, 71, 0.12);
          --shadow-lg: 0 8px 32px rgba(16, 86, 71, 0.16);
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --transition: 0.2s ease;
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        /* ============================================================
           SIDEBAR
           ============================================================ */

        .admin-sidebar {
          width: var(--sidebar-width);
          background: var(--primary-dark);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
          transition: transform var(--transition);
          overflow: hidden;
        }

        .sidebar-logo {
          padding: 20px 24px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-logo-img {
          height: 42px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          overflow-y: auto;
        }

        .sidebar-section-label {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 12px 8px 6px;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition);
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 2px;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .sidebar-nav-item:hover {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.9);
        }

        .sidebar-nav-item.active {
          background: var(--accent);
          color: white;
        }

        .sidebar-nav-item svg {
          width: 18px;
          height: 18px;
          opacity: 0.7;
          flex-shrink: 0;
        }

        .sidebar-nav-item.active svg {
          opacity: 1;
        }

        .sidebar-nav-badge {
          margin-left: auto;
          background: var(--accent);
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          min-width: 20px;
          text-align: center;
        }

        .sidebar-nav-item.active .sidebar-nav-badge {
          background: rgba(255,255,255,0.25);
        }

        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background var(--transition);
        }

        .sidebar-user:hover {
          background: rgba(255,255,255,0.07);
        }

        .sidebar-user-avatar {
          width: 34px;
          height: 34px;
          background: var(--primary-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .sidebar-user-info {
          flex: 1;
          min-width: 0;
        }

        .sidebar-user-info span:first-child {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-user-info span:last-child {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }

        /* ============================================================
           MAIN CONTENT
           ============================================================ */

        .admin-main {
          margin-left: var(--sidebar-width);
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-width: 0;
        }

        /* ============================================================
           TOPBAR
           ============================================================ */

        .admin-topbar {
          height: var(--topbar-height);
          background: var(--card-bg);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 50;
          gap: 12px;
        }

        .topbar-left h1 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-main);
        }

        .topbar-left p {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 1px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .topbar-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--card-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
          transition: all var(--transition);
          position: relative;
        }

        .topbar-btn:hover {
          background: var(--bg);
          color: var(--primary);
        }

        .topbar-notif-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 7px;
          height: 7px;
          background: var(--accent);
          border-radius: 50%;
          border: 2px solid white;
        }

        .topbar-website-label {
          display: inline;
        }

        /* ============================================================
           PAGE CONTENT
           ============================================================ */

        .admin-content {
          padding: 28px;
          flex: 1;
          min-width: 0;
        }

        /* ============================================================
           STAT CARDS
           ============================================================ */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: var(--card-bg);
          border-radius: var(--radius-md);
          padding: 20px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: box-shadow var(--transition);
        }

        .stat-card:hover {
          box-shadow: var(--shadow-md);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon.green { background: rgba(16, 86, 71, 0.1);  color: var(--primary); }
        .stat-icon.coral { background: rgba(239, 109, 96, 0.1); color: var(--accent);  }
        .stat-icon.blue  { background: rgba(59, 130, 246, 0.1); color: var(--info);    }
        .stat-icon.amber { background: rgba(245, 158, 11, 0.1); color: var(--warning); }

        .stat-info {
          flex: 1;
          min-width: 0;
        }

        .stat-info h3 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1;
        }

        .stat-info p {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .stat-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 20px;
        }

        .stat-badge.up      { background: rgba(34, 197, 94, 0.1);  color: var(--success); }
        .stat-badge.pending { background: rgba(245, 158, 11, 0.1); color: var(--warning); }

        /* ============================================================
           CARDS / PANELS
           ============================================================ */

        .admin-card {
          background: var(--card-bg);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .admin-card-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .admin-card-header h2 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-main);
        }

        .admin-card-header p {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* ============================================================
           TABLE
           ============================================================ */

        .admin-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 500px;
        }

        .admin-table thead th {
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }

        .admin-table tbody tr {
          border-bottom: 1px solid var(--border);
          transition: background var(--transition);
        }

        .admin-table tbody tr:last-child {
          border-bottom: none;
        }

        .admin-table tbody tr:hover {
          background: var(--bg);
        }

        .admin-table td {
          padding: 14px 16px;
          color: var(--text-main);
          vertical-align: middle;
        }

        .admin-table td .name-cell {
          font-weight: 600;
        }

        .admin-table td .sub-text {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Kolom yang disembunyikan di mobile */
        .col-hide-mobile {
          /* dipakai di Dashboard table & Registration table */
        }

        /* ============================================================
           BADGES / STATUS
           ============================================================ */

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        .badge-pending   { background: rgba(245, 158, 11, 0.12); color: #b45309;        }
        .badge-confirmed { background: rgba(34, 197, 94, 0.12);  color: #15803d;        }
        .badge-rejected  { background: rgba(239, 68, 68, 0.12);  color: #dc2626;        }
        .badge-published { background: rgba(16, 86, 71, 0.12);   color: var(--primary); }
        .badge-draft     { background: rgba(107, 138, 128, 0.12); color: var(--text-muted); }
        .badge-active    { background: rgba(34, 197, 94, 0.12);  color: #15803d;        }
        .badge-inactive  { background: rgba(107, 138, 128, 0.12); color: var(--text-muted); }

        /* ============================================================
           BUTTONS
           ============================================================ */

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all var(--transition);
          text-decoration: none;
          white-space: nowrap;
        }

        .btn-admin-primary {
          background: var(--primary);
          color: white;
        }

        .btn-admin-primary:hover {
          background: var(--primary-light);
        }

        .btn-accent {
          background: var(--accent);
          color: white;
        }

        .btn-accent:hover {
          background: var(--accent-light);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .btn-ghost:hover {
          background: var(--bg);
          color: var(--text-main);
        }

        .btn-danger {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
        }

        .btn-danger:hover {
          background: var(--danger);
          color: white;
        }

        .btn-success {
          background: rgba(34, 197, 94, 0.1);
          color: var(--success);
        }

        .btn-success:hover {
          background: var(--success);
          color: white;
        }

        .btn-sm {
          padding: 5px 12px;
          font-size: 12px;
        }

        .btn-icon {
          padding: 7px;
          border-radius: var(--radius-sm);
        }

        /* ============================================================
           SEARCH / FILTER BAR
           ============================================================ */

        .filter-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 160px;
        }

        .search-input-wrap svg {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          width: 15px;
          height: 15px;
        }

        .search-input-wrap input {
          width: 100%;
          padding: 8px 12px 8px 32px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 13px;
          background: var(--bg);
          color: var(--text-main);
          outline: none;
          transition: border-color var(--transition);
        }

        .search-input-wrap input:focus {
          border-color: var(--primary);
          background: white;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 13px;
          background: var(--bg);
          color: var(--text-main);
          outline: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .filter-select:focus {
          border-color: var(--primary);
        }

        /* Tombol di filter bar tidak boleh shrink */
        .filter-bar .btn {
          flex-shrink: 0;
        }

        /* ============================================================
           MODAL
           ============================================================ */

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(11, 61, 50, 0.4);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.15s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .modal-box {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 540px;
          box-shadow: var(--shadow-lg);
          animation: slideUp 0.2s ease;
          max-height: 92vh;
          overflow-y: auto;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .modal-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: var(--card-bg);
          z-index: 1;
        }

        .modal-header h3 {
          font-size: 16px;
          font-weight: 700;
        }

        .modal-close {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: none;
          background: var(--bg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 18px;
          transition: all var(--transition);
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: var(--danger);
          color: white;
        }

        .modal-body {
          padding: 20px 24px;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
          position: sticky;
          bottom: 0;
          background: var(--card-bg);
        }

        /* ============================================================
           FORM FIELDS
           ============================================================ */

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 13px;
          color: var(--text-main);
          background: var(--bg);
          outline: none;
          transition: border-color var(--transition);
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: var(--primary);
          background: white;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* ============================================================
           EMPTY STATE
           ============================================================ */

        .empty-state {
          text-align: center;
          padding: 60px 24px;
          color: var(--text-muted);
        }

        .empty-state svg {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          opacity: 0.3;
        }

        .empty-state h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 6px;
        }

        .empty-state p {
          font-size: 13px;
        }

        /* ============================================================
           ACTIVITY LOG
           ============================================================ */

        .activity-list {
          padding: 4px 0;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 20px;
          border-bottom: 1px solid var(--border);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .activity-dot.green { background: var(--success); }
        .activity-dot.coral { background: var(--accent);  }
        .activity-dot.blue  { background: var(--info);    }
        .activity-dot.amber { background: var(--warning); }

        .activity-text {
          flex: 1;
        }

        .activity-text p {
          font-size: 13px;
          color: var(--text-main);
          line-height: 1.4;
        }

        .activity-text span {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          display: block;
        }

        /* ============================================================
           PAYMENT IMAGE PREVIEW
           ============================================================ */

        .payment-proof-thumb {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: opacity var(--transition);
        }

        .payment-proof-thumb:hover {
          opacity: 0.8;
        }

        .proof-modal-img {
          width: 100%;
          border-radius: var(--radius-sm);
          max-height: 70vh;
          object-fit: contain;
        }

        /* ============================================================
           TOGGLE SWITCH
           ============================================================ */

        .toggle-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toggle {
          position: relative;
          width: 36px;
          height: 20px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          inset: 0;
          background: var(--border);
          border-radius: 20px;
          cursor: pointer;
          transition: background var(--transition);
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: transform var(--transition);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .toggle input:checked + .toggle-slider {
          background: var(--primary);
        }

        .toggle input:checked + .toggle-slider::before {
          transform: translateX(16px);
        }

        .toggle-label {
          font-size: 13px;
          color: var(--text-main);
          cursor: pointer;
        }

        /* ============================================================
           DASHBOARD — Layout & Components
           ============================================================ */

        .dashboard-root {}

        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }

        .dash-breadcrumb {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .dash-breadcrumb span {
          color: var(--text-main);
          font-weight: 600;
        }

        .dash-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
          letter-spacing: -0.4px;
        }

        .dash-date-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 4px;
          white-space: nowrap;
        }

        .dash-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .dash-stat-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 20px 24px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: box-shadow var(--transition);
        }

        .dash-stat-card:hover {
          box-shadow: var(--shadow-md);
        }

        .dash-stat-card--featured {
          border: 1.5px solid var(--accent);
          background: rgba(239,109,96,0.04);
        }

        .dash-stat-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .dash-stat-top .stat-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
        }

        .dash-stat-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          margin: 0;
          padding-top: 2px;
        }

        .dash-stat-number {
          font-size: 36px;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -1px;
          line-height: 1;
          margin: 0 0 12px;
        }

        .dash-stat-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
        }

        .dash-mid-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
          margin-bottom: 16px;
        }

        .dash-legend {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .dash-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .dash-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        .dash-program-list {
          padding: 4px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dash-program-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 7px;
        }

        .dash-program-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-main);
        }

        .dash-program-count {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .dash-progress-track {
          height: 7px;
          background: var(--bg);
          border-radius: 99px;
          overflow: hidden;
        }

        .dash-progress-bar {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s ease;
        }

        .dash-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
        }

        .dash-right-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dash-gender-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 20px 20px;
        }

        .dash-gender-legend {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 4px;
        }

        .dash-gender-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dash-gender-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dash-gender-label {
          font-size: 13px;
          color: var(--text-muted);
          flex: 1;
        }

        .dash-gender-pct {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-main);
        }

        /* ============================================================
           PROGRAM CARDS (ProgramManager)
           ============================================================ */

        .program-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          padding: 20px;
        }

        /* Teks yang hanya muncul di mobile (disembunyikan di desktop) */
        .btn-label-mobile-only {
          display: none;
        }

        /* ============================================================
           SIDEBAR TOGGLE BUTTON
           ============================================================ */

        .sidebar-toggle-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--card-bg);
          cursor: pointer;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        /* ============================================================
           ACTION BUTTONS — Registration table
           Tombol aksi di tabel, bisa wrap di mobile
           ============================================================ */

        .action-btn-group {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          flex-wrap: nowrap;
        }

        /* ============================================================
           RESPONSIVE — 1100px (tablet landscape)
           ============================================================ */

        @media (max-width: 1100px) {
          .dash-stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dash-mid-grid,
          .dash-bottom-grid {
            grid-template-columns: 1fr;
          }

          .dash-right-col {
            flex-direction: row;
          }

          .dash-right-col > .admin-card {
            flex: 1;
          }
        }

        /* ============================================================
           RESPONSIVE — 768px (tablet portrait / mobile)
           ============================================================ */

        @media (max-width: 768px) {

          /* ── Sidebar ── */
          .admin-sidebar {
            transform: translateX(-100%);
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          /* ── Main ── */
          .admin-main {
            margin-left: 0;
          }

          /* ── Topbar ── */
          .admin-topbar {
            padding: 0 16px;
          }

          .topbar-left h1 {
            font-size: 15px;
          }

          .topbar-left p {
            display: none;
          }

          .topbar-website-label {
            display: none;
          }

          /* ── Sidebar toggle ── */
          .sidebar-toggle-btn {
            display: flex;
          }

          /* ── Content ── */
          .admin-content {
            padding: 16px;
          }

          /* ── Stat cards ── */
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .dash-stat-grid {
            grid-template-columns: 1fr 1fr;
          }

          .dash-stat-number {
            font-size: 28px;
          }

          /* ── Dashboard header ── */
          .dash-header {
            flex-direction: column;
            gap: 8px;
            margin-bottom: 16px;
          }

          .dash-title {
            font-size: 20px;
          }

          /* ── Dashboard right col ── */
          .dash-right-col {
            flex-direction: column;
          }

          /* ── Filter bar ── */
          .filter-bar {
            padding: 12px 16px;
            gap: 8px;
          }

          /* Search full width */
          .search-input-wrap {
            flex: unset;
            width: 100%;
            min-width: 100%;
          }

          /* Select pair berdampingan */
          .filter-select {
            flex: 1;
            min-width: 0;
          }

          /* Tombol tambah/baru full width di bawah filter */
          .filter-bar .btn-accent,
          .filter-bar .btn-admin-primary {
            width: 100%;
            justify-content: center;
          }

          /* ── Card header ── */
          .admin-card-header {
            padding: 14px 16px;
          }

          /* ── Modal — bottom sheet di mobile ── */
          .modal-overlay {
            padding: 0;
            align-items: flex-end;
          }

          .modal-box {
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            max-height: 95vh;
            max-width: 100%;
          }

          /* ── Form ── */
          .form-row {
            grid-template-columns: 1fr;
          }

          /* ── Program cards ── */
          .program-cards-grid {
            grid-template-columns: 1fr;
            padding: 16px;
          }

          /* ── Modal footer ── */
          .modal-footer {
            padding: 14px 16px;
          }

          /* Footer dengan 2+ tombol: equal width */
          .modal-footer.has-multiple .btn {
            flex: 1;
            justify-content: center;
          }

          /* Footer dengan 1 tombol: natural width saja */
          .modal-footer.has-single .btn {
            width: auto;
          }

          /* ── Dashboard table: sembunyikan kolom ID di mobile ── */
          .col-hide-mobile {
            display: none;
          }

          /* ── Registration table: action buttons lebih compact ── */
          .action-btn-group {
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
          }

          /* Sembunyikan teks tombol di mobile, tampilkan icon saja */
          .btn-label-mobile-hide {
            display: none;
          }

          /* Teks alternatif yang hanya muncul di mobile */
          .btn-label-mobile-only {
            display: inline;
          }

          /* Hapus button di registration table: icon only */
          .btn-hapus-mobile {
            padding: 5px 8px;
          }
        }

        /* ============================================================
           RESPONSIVE — 480px (small mobile)
           ============================================================ */

        @media (max-width: 480px) {

          /* ── Stat cards jadi 1 kolom ── */
          .dash-stat-grid {
            grid-template-columns: 1fr 1fr; /* tetap 2 kolom, angka cukup besar */
          }

          .dash-stat-number {
            font-size: 24px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          /* ── Topbar compact ── */
          .admin-topbar {
            padding: 0 12px;
            height: 56px;
          }

          .topbar-left h1 {
            font-size: 14px;
          }

          /* ── Content padding lebih kecil ── */
          .admin-content {
            padding: 12px;
          }

          /* ── Modal body padding lebih kecil ── */
          .modal-body {
            padding: 16px;
          }

          .modal-header {
            padding: 16px 16px 12px;
          }

          .modal-footer {
            padding: 12px 16px;
          }

          /* ── Program card info pills wrap ── */
          .program-info-pills {
            flex-wrap: wrap;
          }

          /* ── Stat card padding lebih kecil ── */
          .stat-card {
            padding: 16px;
            gap: 12px;
          }

          .stat-icon {
            width: 38px;
            height: 38px;
          }

          .stat-info h3 {
            font-size: 20px;
          }

          /* ── Filter bar: select jadi full width ── */
          .filter-select {
            width: 100%;
            flex: unset;
          }
        }
      `}</style>
      <div className="admin-layout">

        {/* Mobile Backdrop */}
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

        {/* SIDEBAR */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <a 
            href="/"
            target="_blank"
            rel="noreferrer"
            className="sidebar-logo"
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            title="Lihat Website"
          >
            <img src={folksLogo} alt="FOLKS Institute" className="sidebar-logo-img" />
          </a>

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

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">A</div>
              <div className="sidebar-user-info">
                <span>Super Admin</span>
                <span>admin@folks.id</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="sidebar-nav-item"
              style={{ marginTop: 4, color: 'rgba(255,255,255,0.4)' }}
            >
              <IconLogout />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="admin-main">
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
                <span className="topbar-website-label">Lihat Website</span>
              </a>
            </div>
          </div>

          <div className="admin-content">
            {renderPage()}
          </div>
        </main>
      </div>
    </>
  )
}