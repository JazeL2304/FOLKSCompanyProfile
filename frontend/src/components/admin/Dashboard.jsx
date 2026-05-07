// src/components/admin/Dashboard.jsx
// Mock data — ganti dengan Supabase query nanti

import { useState } from 'react'

// ── Mock Data ──────────────────────────────────────────────
const mockStats = {
  totalPendaftar: 128,
  pendingKonfirmasi: 3,
  programAktif: 4,
  artikelPublished: 9,
}

const mockChartData = [
  { bulan: 'Jul', pendaftar: 30, konfirmasi: 22 },
  { bulan: 'Agu', pendaftar: 45, konfirmasi: 38 },
  { bulan: 'Sep', pendaftar: 38, konfirmasi: 30 },
  { bulan: 'Okt', pendaftar: 60, konfirmasi: 50 },
  { bulan: 'Nov', pendaftar: 52, konfirmasi: 44 },
  { bulan: 'Des', pendaftar: 70, konfirmasi: 58 },
]

const mockPrograms = [
  { nama: 'CTA Program',       jumlah: 28, max: 50 },
  { nama: 'Academic Program',  jumlah: 15, max: 40 },
  { nama: 'IELTS Preparation', jumlah: 12, max: 30 },
  { nama: 'UTBK Intensif',     jumlah: 8,  max: 30 },
]

const mockPendaftar = [
  { nama: 'Siti Rahayu',   id: '#FK-2026-001', program: 'CTA Program',       status: 'pending'   },
  { nama: 'Ahmad Fauzi',   id: '#FK-2026-042', program: 'Academic Program',  status: 'confirmed' },
  { nama: 'Maya Indah',    id: '#FK-2026-088', program: 'CTA Program',       status: 'pending'   },
  { nama: 'Rizki Maulana', id: '#FK-2026-115', program: 'IELTS Preparation', status: 'confirmed' },
]

const mockGender = { laki: 58, perempuan: 42, total: 128 }

const mockActivity = [
  { type: 'new',    text: 'Pendaftaran baru: Siti Rahayu — CTA Program',       time: '5 menit lalu'  },
  { type: 'ok',     text: 'Pembayaran dikonfirmasi: Ahmad Fauzi',               time: '23 menit lalu' },
  { type: 'blog',   text: 'Artikel dipublikasikan: "Tips Belajar Efektif"',     time: '1 jam lalu'    },
  { type: 'new',    text: 'Pendaftaran baru: Rizki Maulana — Academic Program', time: '2 jam lalu'    },
  { type: 'update', text: 'Program UTBK Intensif dinonaktifkan',                time: '3 jam lalu'    },
]

const dotColor = { new: 'coral', ok: 'green', blog: 'blue', update: 'amber' }

// ── SVG Icons untuk badge (TANPA EMOJI) ───────────────────
const IconClock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconEdit = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

// ── SVG Bar + Smooth Curve Chart ───────────────────────────
function AttendanceChart({ data }) {
  const W = 500, H = 160, PL = 8, PR = 8, PT = 16, PB = 32
  const innerW = W - PL - PR
  const innerH = H - PT - PB
  const maxVal = 90
  const n      = data.length
  const slot   = innerW / n
  const barW   = slot * 0.38

  const xCenter = (i) => PL + slot * i + slot / 2
  const yVal    = (v) => PT + innerH - (v / maxVal) * innerH

  const smoothPath = (pts) => {
    if (pts.length < 2) return ''
    let d = `M ${pts[0][0]} ${pts[0][1]}`
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1], curr = pts[i]
      const cpx  = (prev[0] + curr[0]) / 2
      d += ` C ${cpx} ${prev[1]}, ${cpx} ${curr[1]}, ${curr[0]} ${curr[1]}`
    }
    return d
  }

  const pPts = data.map((d, i) => [xCenter(i), yVal(d.pendaftar)])
  const kPts = data.map((d, i) => [xCenter(i), yVal(d.konfirmasi)])

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {[0, 30, 60, 90].map((v) => (
        <line key={v}
          x1={PL} y1={yVal(v)} x2={W - PR} y2={yVal(v)}
          stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="4 4"
        />
      ))}
      {data.map((d, i) => {
        const bH = (d.pendaftar / maxVal) * innerH
        return (
          <rect key={i}
            x={xCenter(i) - barW / 2} y={yVal(d.pendaftar)}
            width={barW} height={bH} rx={5}
            fill="var(--accent)" opacity="0.16"
          />
        )
      })}
      <path d={smoothPath(kPts)} fill="none"
        stroke="var(--primary)" strokeWidth="2"
        strokeDasharray="6 4" strokeLinecap="round"
      />
      <path d={smoothPath(pPts)} fill="none"
        stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"
      />
      {pPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill="var(--accent)" />)}
      {kPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill="var(--primary)" />)}
      {data.map((d, i) => (
        <text key={i} x={xCenter(i)} y={H - 6}
          textAnchor="middle" fontSize="11"
          fill="var(--text-muted)" fontFamily="inherit"
        >{d.bulan}</text>
      ))}
    </svg>
  )
}

// ── SVG Donut Chart ────────────────────────────────────────
function DonutChart({ laki, perempuan, total }) {
  const r = 62, cx = 80, cy = 80
  const circ   = 2 * Math.PI * r
  const lakiD  = (laki / 100) * circ
  const perD   = (perempuan / 100) * circ
  const offset = circ * 0.25

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="22" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--primary)"
        strokeWidth="22"
        strokeDasharray={`${perD} ${circ - perD}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--accent)"
        strokeWidth="22"
        strokeDasharray={`${lakiD} ${circ - lakiD}`}
        strokeDashoffset={offset - perD}
        strokeLinecap="round"
      />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22"
        fontWeight="800" fill="var(--text-main)" fontFamily="inherit">{total}</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize="10"
        fill="var(--text-muted)" fontFamily="inherit">Total</text>
    </svg>
  )
}

// ── Status Badge ───────────────────────────────────────────
function StatusBadge({ status }) {
  const cls   = { pending: 'badge-pending', confirmed: 'badge-confirmed', rejected: 'badge-rejected' }
  const label = { pending: 'Pending',       confirmed: 'Dikonfirmasi',    rejected: 'Ditolak'        }
  return <span className={`badge ${cls[status] || ''}`}>{label[status] || status}</span>
}

// ── Avatar ─────────────────────────────────────────────────
function Avatar({ nama, size = 34 }) {
  const initials = nama.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const colors   = ['var(--accent)', 'var(--primary)', '#F4A261', '#2A9D8F']
  const bg       = colors[nama.charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ══════════════════════════════════════════════════════════
export default function Dashboard({ onNavigate }) {
  const [dateRange] = useState('Apr 2026 – Des 2026')

  return (
    <div className="dashboard-root">

      {/* ── Page Header ── */}
      <div className="dash-header">
        <div>
          <p className="dash-breadcrumb">
            Admin › <span>Dashboard</span>
          </p>
          <h2 className="dash-title">Dashboard Overview</h2>
        </div>
        <div className="dash-date-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8"  y1="2" x2="8"  y2="6"/>
            <line x1="3"  y1="10" x2="21" y2="10"/>
          </svg>
          {dateRange}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="dash-stat-grid">

        {/* 1 — Total Pendaftar */}
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <p className="dash-stat-label">Total Pendaftar</p>
            <div className="stat-icon coral">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
          </div>
          <h3 className="dash-stat-number">{mockStats.totalPendaftar}</h3>
          <span className="stat-badge pending">
            <IconClock />
            {mockStats.pendingKonfirmasi} pending
          </span>
          <div className="dash-stat-bar" style={{ background: 'var(--accent)' }} />
        </div>

        {/* 2 — Pending Konfirmasi (featured) */}
        <div className="dash-stat-card dash-stat-card--featured">
          <div className="dash-stat-top">
            <p className="dash-stat-label" style={{ color: 'var(--accent)' }}>Pending Konfirmasi</p>
            <div className="stat-icon coral">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
          </div>
          <h3 className="dash-stat-number" style={{ color: 'var(--accent)' }}>{mockStats.pendingKonfirmasi}</h3>
          <button
            className="btn btn-accent btn-sm"
            onClick={() => onNavigate?.('registrations')}
          >
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
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
          </div>
          <h3 className="dash-stat-number">{mockStats.programAktif}</h3>
          <span className="stat-badge up">
            <IconCheck />
            Semua aktif
          </span>
          <div className="dash-stat-bar" style={{ background: 'var(--primary)' }} />
        </div>

        {/* 4 — Artikel Published */}
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <p className="dash-stat-label">Artikel Published</p>
            <div className="stat-icon blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
          </div>
          <h3 className="dash-stat-number">{mockStats.artikelPublished}</h3>
          <span className="stat-badge" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--info)' }}>
            <IconEdit />
            3 draft
          </span>
          <div className="dash-stat-bar" style={{ background: 'var(--info)' }} />
        </div>

      </div>

      {/* ── Middle Row: Chart + Program Progress ── */}
      <div className="dash-mid-grid">

        {/* Attendance Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Laporan Pendaftaran</h2>
              <p>Periode Apr 2026 – Des 2026</p>
            </div>
            <div className="dash-legend">
              <span className="dash-legend-item">
                <span className="dash-legend-dot" style={{ background: 'var(--accent)' }} />
                Pendaftar
              </span>
              <span className="dash-legend-item">
                <svg width="16" height="8" viewBox="0 0 16 8" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="4" x2="16" y2="4"
                    stroke="var(--primary)" strokeWidth="2"
                    strokeDasharray="4 3" strokeLinecap="round" />
                </svg>
                Dikonfirmasi
              </span>
            </div>
          </div>
          <div style={{ padding: '8px 16px 16px' }}>
            <AttendanceChart data={mockChartData} />
          </div>
        </div>

        {/* Program Progress Bars */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Pendaftar per Program</h2>
              <p>Distribusi per program aktif</p>
            </div>
          </div>
          <div className="dash-program-list">
            {mockPrograms.map((p, i) => {
              const pct      = Math.round((p.jumlah / p.max) * 100)
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
            })}
          </div>
        </div>

      </div>

      {/* ── Bottom Row: Table + Gender + Activity ── */}
      <div className="dash-bottom-grid">

        {/* Pendaftar Table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Daftar Pendaftar</h2>
              <p>Data terbaru masuk</p>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onNavigate?.('registrations')}
            >
              Lihat Semua
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>PROFIL</th>
                  <th>NAMA</th>
                  <th>ID</th>
                  <th>PROGRAM</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {mockPendaftar.map((p, i) => (
                  <tr key={i}>
                    <td><Avatar nama={p.nama} /></td>
                    <td><span style={{ fontWeight: 600, fontSize: 13 }}>{p.nama}</span></td>
                    <td><span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id}</span></td>
                    <td><span style={{ fontSize: 12 }}>{p.program}</span></td>
                    <td><StatusBadge status={p.status} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-ghost btn-sm btn-icon"
                          title="Lihat detail"
                          onClick={() => onNavigate?.('registrations')}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                          </svg>
                        </button>
                        <button className="btn btn-ghost btn-sm btn-icon" title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="dash-right-col">

          {/* Gender Distribution */}
          <div className="admin-card">
            <div className="admin-card-header" style={{ paddingBottom: 8 }}>
              <div><h2>Distribusi Gender</h2></div>
            </div>
            <div className="dash-gender-body">
              <DonutChart {...mockGender} />
              <div className="dash-gender-legend">
                {[
                  { label: 'Male',   pct: mockGender.laki,      color: 'var(--accent)'  },
                  { label: 'Female', pct: mockGender.perempuan, color: 'var(--primary)' },
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

          {/* Recent Activity */}
          <div className="admin-card" style={{ flex: 1 }}>
            <div className="admin-card-header" style={{ paddingBottom: 8 }}>
              <div>
                <h2>Aktivitas Terbaru</h2>
                <p>Log aktivitas hari ini</p>
              </div>
            </div>
            <div className="activity-list">
              {mockActivity.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot ${dotColor[a.type]}`} />
                  <div className="activity-text">
                    <p>{a.text}</p>
                    <span>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}