// src/components/admin/Dashboard.jsx
import { useState, useEffect } from 'react'

const API_URL = `${import.meta.env.VITE_API_URL}/api`
const getToken = () => sessionStorage.getItem('admin_token')

// ── Build chart data dari registrations (6 bulan terakhir) ─
function buildChartData(registrations) {
  const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const BULAN_FULL = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  // Generate 6 bulan terakhir dari sekarang
  const now = new Date()
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ year: d.getFullYear(), month: d.getMonth() }) // month: 0-indexed
  }

  return months.map(({ year, month }) => {
    const regsInMonth = registrations.filter(r => {
      if (!r.created_at) return false
      const d = new Date(r.created_at)
      return d.getFullYear() === year && d.getMonth() === month
    })
    return {
      bulan: BULAN[month],
      fullBulan: BULAN_FULL[month],
      pendaftar: regsInMonth.length,
      konfirmasi: regsInMonth.filter(r => r.status === 'confirmed').length,
    }
  })
}

// ── SVG Icons ─────────────────────────────────────────────
const IconClock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconEdit = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

// ── Area Chart SVG (pure SVG, no library) ─────────────────
function AreaChart({ data }) {
  const [activeIdx, setActiveIdx] = useState(data.length - 1)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 })

  const W = 520, H = 200
  const PAD = { top: 24, right: 20, bottom: 40, left: 52 }
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const maxRaw = Math.max(...data.map(d => d.pendaftar), 1)
  const maxVal = Math.ceil(maxRaw / 5) * 5 + 5  // round up ke kelipatan 5, kasih padding
  const step = Math.max(1, Math.ceil(maxVal / 3))
  const yLabels = [0, step, step * 2, maxVal]

  const xPos = (i) => PAD.left + (i / (data.length - 1)) * innerW
  const yPos = (v) => PAD.top + innerH - (v / maxVal) * innerH

  // Smooth cubic bezier path
  const smoothPath = (pts) => {
    if (pts.length < 2) return ''
    let d = `M ${pts[0][0]} ${pts[0][1]}`
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1]
      const [cx2, cy] = pts[i]
      const cpx = (px + cx2) / 2
      d += ` C ${cpx} ${py}, ${cpx} ${cy}, ${cx2} ${cy}`
    }
    return d
  }

  const pPts = data.map((d, i) => [xPos(i), yPos(d.pendaftar)])
  const kPts = data.map((d, i) => [xPos(i), yPos(d.konfirmasi)])

  // Area path = line path + close to bottom
  const areaPath = (pts) => {
    const linePart = smoothPath(pts)
    const bottomRight = `L ${pts[pts.length - 1][0]} ${PAD.top + innerH}`
    const bottomLeft = `L ${pts[0][0]} ${PAD.top + innerH}`
    return `${linePart} ${bottomRight} ${bottomLeft} Z`
  }

  const handleMouseMove = (e) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    // Find nearest data point
    let closest = 0, minDist = Infinity
    data.forEach((_, i) => {
      const dist = Math.abs(xPos(i) * (rect.width / W) - mouseX)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActiveIdx(closest)
    setTooltip({ visible: true, x: e.clientX, y: e.clientY })
  }

  const active = data[activeIdx]

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ overflow: 'visible', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
      >
        <defs>
          {/* Gradient area pendaftar (coral) */}
          <linearGradient id="gradPendaftar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
          {/* Gradient area konfirmasi (hijau) */}
          <linearGradient id="gradKonfirmasi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y-axis grid lines + labels */}
        {yLabels.map((v) => (
          <g key={v}>
            <line
              x1={PAD.left} y1={yPos(v)}
              x2={W - PAD.right} y2={yPos(v)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 8} y={yPos(v) + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--text-muted)"
              fontFamily="inherit"
            >
              {v} siswa
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={xPos(i)} y={H - 6}
            textAnchor="middle"
            fontSize="11"
            fill={i === activeIdx ? 'var(--text-main)' : 'var(--text-muted)'}
            fontWeight={i === activeIdx ? 600 : 400}
            fontFamily="inherit"
          >
            {d.bulan}
          </text>
        ))}

        {/* Area fill — konfirmasi (di bawah pendaftar) */}
        <path
          d={areaPath(kPts)}
          fill="url(#gradKonfirmasi)"
        />

        {/* Area fill — pendaftar */}
        <path
          d={areaPath(pPts)}
          fill="url(#gradPendaftar)"
        />

        {/* Konfirmasi line (dashed hijau) */}
        <path
          d={smoothPath(kPts)}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {/* Pendaftar line (solid coral) */}
        <path
          d={smoothPath(pPts)}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Dots — konfirmasi */}
        {kPts.map(([x, y], i) => (
          <circle
            key={i} cx={x} cy={y}
            r={i === activeIdx ? 5 : 3.5}
            fill={i === activeIdx ? 'var(--primary)' : 'var(--card-bg, #1a1a1a)'}
            stroke="var(--primary)"
            strokeWidth="2"
            style={{ transition: 'r 0.15s' }}
          />
        ))}

        {/* Dots — pendaftar */}
        {pPts.map(([x, y], i) => (
          <circle
            key={i} cx={x} cy={y}
            r={i === activeIdx ? 6 : 4}
            fill={i === activeIdx ? 'var(--accent)' : 'var(--card-bg, #1a1a1a)'}
            stroke="var(--accent)"
            strokeWidth="2.5"
            style={{ transition: 'r 0.15s' }}
          />
        ))}

        {/* Vertical crosshair */}
        <line
          x1={xPos(activeIdx)} y1={PAD.top}
          x2={xPos(activeIdx)} y2={PAD.top + innerH}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div style={{
          position: 'fixed',
          left: tooltip.x + 16,
          top: tooltip.y - 24,
          background: 'var(--card-bg, #1e1e1e)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '10px 14px',
          pointerEvents: 'none',
          zIndex: 999,
          minWidth: 140,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            {active.fullBulan} 2026
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: 'var(--accent)', flexShrink: 0 }} />
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{active.pendaftar}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>pendaftar</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: 'var(--primary)', flexShrink: 0 }} />
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>{active.konfirmasi}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>konfirmasi</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Donut Chart ───────────────────────────────────────────
function DonutChart({ laki, perempuan, total }) {
  const r = 62, cx = 80, cy = 80
  const circ = 2 * Math.PI * r
  const lakiD = (laki / 100) * circ
  const perD = (perempuan / 100) * circ
  const offset = circ * 0.25

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="22" />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--primary)" strokeWidth="22"
        strokeDasharray={`${lakiD} ${circ - lakiD}`}
        strokeDashoffset={offset}
        strokeLinecap="butt"
      />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--accent)" strokeWidth="22"
        strokeDasharray={`${perD} ${circ - perD}`}
        strokeDashoffset={offset - lakiD}
        strokeLinecap="butt"
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text-main)" fontFamily="inherit">
        {total}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="inherit">
        Total
      </text>
    </svg>
  )
}

// ── Status Badge ──────────────────────────────────────────
function StatusBadge({ status }) {
  const cls = { pending: 'badge-pending', confirmed: 'badge-confirmed', rejected: 'badge-rejected' }
  const label = { pending: 'Pending', confirmed: 'Dikonfirmasi', rejected: 'Ditolak' }
  return <span className={`badge ${cls[status] || ''}`}>{label[status] || status}</span>
}

// ── Avatar ────────────────────────────────────────────────
function Avatar({ nama, size = 34 }) {
  const initials = (nama || '?').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const colors = ['var(--accent)', 'var(--primary)', '#F4A261', '#2A9D8F']
  const bg = colors[(nama || '?').charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ── Skeleton Card ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="dash-stat-card" style={{ gap: 8 }}>
      {[60, 40, 50].map((w, i) => (
        <div key={i} style={{
          height: i === 1 ? 32 : 14,
          width: `${w}%`,
          borderRadius: 6,
          background: 'var(--border)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ══════════════════════════════════════════════════════════
export default function Dashboard({ onNavigate }) {
  const [loading, setLoading] = useState(true)
  const [registrations, setRegistrations] = useState([])
  const [programs, setPrograms] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const headers = { Authorization: `Bearer ${getToken()}` }
    Promise.all([
      fetch(`${API_URL}/registrations`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/programs`).then(r => r.json()),
      fetch(`${API_URL}/blogs`).then(r => r.json()),
    ])
      .then(([regs, progs, bls]) => {
        setRegistrations(Array.isArray(regs) ? regs : [])
        setPrograms(Array.isArray(progs) ? progs : [])
        setBlogs(Array.isArray(bls) ? bls : [])
      })
      .catch(err => console.error('Dashboard fetch error:', err))
      .finally(() => setLoading(false))
  }, [])

  // ── Derived Stats ────────────────────────────────────────
  const totalPendaftar = registrations.length
  const pendingKonfirmasi = registrations.filter(r => r.status === 'pending').length
  const maleCount = registrations.filter(r => r.gender === 'Male').length
  const femaleCount = registrations.filter(r => r.gender === 'Female').length
  const unknownCount = totalPendaftar - maleCount - femaleCount

  const malePct = totalPendaftar > 0 ? Math.round((maleCount / totalPendaftar) * 100) : 0
  const femalePct = totalPendaftar > 0 ? Math.round((femaleCount / totalPendaftar) * 100) : 0
  const unknownPct = totalPendaftar > 0 ? (100 - malePct - femalePct) : 0

  const programAktif = programs.filter(p => p.active).length
  const artikelPublished = blogs.filter(b => b.status === 'published').length
  const artikelDraft = blogs.filter(b => b.status === 'draft').length

  const programStats = programs
    .map(p => ({
      nama: p.title,
      jumlah: registrations.filter(r => r.program_id === p.id).length,
      max: 50,
    }))
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 4)

  const chartData = buildChartData(registrations)

  const recentRegs = [...registrations]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4)
    .map(r => ({
      ...r,
      nama: r.student_name,
      program: programs.find(p => p.id === r.program_id)?.title || '-',
    }))

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="dashboard-root">

      {/* ── Page Header ── */}
      <div className="dash-header">
        <div>
          <p className="dash-breadcrumb">Admin › <span>Dashboard</span></p>
          <h2 className="dash-title">Dashboard Overview</h2>
        </div>
        <div className="dash-date-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="dash-stat-grid">
        {loading ? (
          [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
        ) : (
          <>
            {/* 1 — Total Pendaftar */}
            <div className="dash-stat-card">
              <div className="dash-stat-top">
                <p className="dash-stat-label">Total Pendaftar</p>
                <div className="stat-icon coral">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
              </div>
              <h3 className="dash-stat-number">{totalPendaftar}</h3>
              <span className="stat-badge pending">
                <IconClock /> {pendingKonfirmasi} pending
              </span>
              <div className="dash-stat-bar" style={{ background: 'var(--accent)' }} />
            </div>

            {/* 2 — Pending Konfirmasi (featured) */}
            <div className="dash-stat-card dash-stat-card--featured">
              <div className="dash-stat-top">
                <p className="dash-stat-label" style={{ color: 'var(--accent)' }}>Pending Konfirmasi</p>
                <div className="stat-icon coral">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
              <h3 className="dash-stat-number" style={{ color: 'var(--accent)' }}>{pendingKonfirmasi}</h3>
              <button className="btn btn-accent btn-sm" onClick={() => onNavigate?.('registrations')}>
                Review →
              </button>
              <div className="dash-stat-bar" style={{ background: 'var(--accent)' }} />
            </div>

            {/* 3 — Program Aktif */}
            <div className="dash-stat-card">
              <div className="dash-stat-top">
                <p className="dash-stat-label">Program Aktif</p>
                <div className="stat-icon green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
              </div>
              <h3 className="dash-stat-number">{programAktif}</h3>
              <span className="stat-badge up">
                <IconCheck /> dari {programs.length} program
              </span>
              <div className="dash-stat-bar" style={{ background: 'var(--primary)' }} />
            </div>

            {/* 4 — Artikel Published */}
            <div className="dash-stat-card">
              <div className="dash-stat-top">
                <p className="dash-stat-label">Artikel Published</p>
                <div className="stat-icon blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
              </div>
              <h3 className="dash-stat-number">{artikelPublished}</h3>
              <span className="stat-badge" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--info)' }}>
                <IconEdit /> {artikelDraft} draft
              </span>
              <div className="dash-stat-bar" style={{ background: 'var(--info)' }} />
            </div>
          </>
        )}
      </div>

      {/* ── Middle Row ── */}
      <div className="dash-mid-grid">

        {/* Area Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Laporan Pendaftaran</h2>
              <p>6 bulan terakhir</p>
            </div>
            <div className="dash-legend">
              <span className="dash-legend-item">
                <span style={{ width: 24, height: 2.5, background: 'var(--accent)', borderRadius: 2, display: 'inline-block' }} />
                Pendaftar
              </span>
              <span className="dash-legend-item">
                <svg width="24" height="8" viewBox="0 0 24 8" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="4" x2="24" y2="4"
                    stroke="var(--primary)" strokeWidth="2"
                    strokeDasharray="5 3" strokeLinecap="round"
                  />
                </svg>
                Dikonfirmasi
              </span>
            </div>
          </div>
          <div style={{ padding: '4px 16px 16px' }}>
            <AreaChart data={chartData} />
          </div>
        </div>

        {/* Program Progress */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Statistik Program</h2>
              <p>Jumlah pendaftar per program</p>
            </div>
          </div>
          <div className="dash-program-list">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="dash-program-item">
                  <div style={{ height: 12, width: '60%', borderRadius: 4, background: 'var(--border)' }} />
                  <div className="dash-progress-track" style={{ marginTop: 8 }}>
                    <div className="dash-progress-bar" style={{ width: '30%', background: 'var(--border)' }} />
                  </div>
                </div>
              ))
            ) : programStats.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '16px 0' }}>Belum ada data program</p>
            ) : (
              programStats.map((p, i) => {
                const pct = p.max > 0 ? Math.min(Math.round((p.jumlah / p.max) * 100), 100) : 0
                const barColor = i % 2 === 0 ? 'var(--accent)' : 'var(--primary)'
                return (
                  <div key={i} className="dash-program-item">
                    <div className="dash-program-meta">
                      <span className="dash-program-name">{p.nama}</span>
                      <span className="dash-program-count">{p.jumlah}</span>
                    </div>
                    <div className="dash-progress-track">
                      <div className="dash-progress-bar" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

      </div>

      {/* ── Bottom Row ── */}
      <div className="dash-bottom-grid">

        {/* Pendaftar Table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Pendaftar Terbaru</h2>
              <p>4 pendaftaran terakhir masuk</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate?.('registrations')}>
              Lihat Semua
            </button>
          </div>
          <div className="admin-table-wrap">
            {loading ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Memuat data...</div>
            ) : recentRegs.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Belum ada pendaftar</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>PROFIL</th>
                    <th>NAMA</th>
                    <th>PROGRAM</th>
                    <th>STATUS</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegs.map((p, i) => (
                    <tr key={p.id || i}>
                      <td><Avatar nama={p.nama} /></td>
                      <td><span style={{ fontWeight: 600, fontSize: 13 }}>{p.nama}</span></td>
                      <td><span style={{ fontSize: 12 }}>{p.program}</span></td>
                      <td><StatusBadge status={p.status} /></td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm btn-icon"
                          title="Lihat di Registrasi"
                          onClick={() => onNavigate?.('registrations')}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Gender Donut */}
        <div className="admin-card">
          <div className="admin-card-header" style={{ paddingBottom: 8 }}>
            <div><h2>Distribusi Gender</h2></div>
          </div>
          <div className="dash-gender-body">
            <DonutChart laki={malePct} perempuan={femalePct} total={totalPendaftar} />
            <div className="dash-gender-legend">
              {[
                { label: 'Male', pct: malePct, color: 'var(--primary)' },
                { label: 'Female', pct: femalePct, color: 'var(--accent)' },
                { label: 'Belum Diatur', pct: unknownPct, color: 'var(--border)' },
              ].map(g => (
                <div key={g.label} className="dash-gender-row">
                  <span className="dash-gender-dot" style={{ background: g.color }} />
                  <span className="dash-gender-label">{g.label}</span>
                  <span className="dash-gender-pct">{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="admin-card">
          <div className="admin-card-header" style={{ paddingBottom: 8 }}>
            <div>
              <h2>Aktivitas Terbaru</h2>
              <p>Dari data pendaftaran real</p>
            </div>
          </div>
          <div className="activity-list">
            {loading ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Memuat...</p>
            ) : recentRegs.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '8px 0' }}>Belum ada aktivitas</p>
            ) : (
              recentRegs.map((r, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot ${r.status === 'confirmed' ? 'green' :
                      r.status === 'rejected' ? 'coral' : 'amber'
                    }`} />
                  <div className="activity-text">
                    <p>
                      {r.status === 'confirmed'
                        ? `Dikonfirmasi: ${r.nama} — ${r.program}`
                        : r.status === 'rejected'
                          ? `Ditolak: ${r.nama} — ${r.program}`
                          : `Pendaftaran baru: ${r.nama} — ${r.program}`}
                    </p>
                    <span>
                      {r.created_at
                        ? new Date(r.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '-'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}