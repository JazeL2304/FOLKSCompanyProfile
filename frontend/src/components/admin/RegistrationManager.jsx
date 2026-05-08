// src/components/admin/RegistrationManager.jsx
import { useState } from 'react'

const mockRegistrations = [
  {
    id: 1,
    name: 'Siti Rahayu',
    phone: '08123456789',
    email: 'siti@gmail.com',
    program: 'CTA Program',
    status: 'pending',
    date: '06 Mei 2026',
    note: '',
    proofUrl: 'https://placehold.co/400x600/EF6D60/white?text=Bukti+Bayar'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    phone: '08234567890',
    email: 'budi@gmail.com',
    program: 'Academic Program',
    status: 'pending',
    date: '05 Mei 2026',
    note: '',
    proofUrl: 'https://placehold.co/400x600/105647/white?text=Bukti+Bayar'
  },
  {
    id: 3,
    name: 'Maya Indah',
    phone: '08345678901',
    email: 'maya@gmail.com',
    program: 'CTA Program',
    status: 'pending',
    date: '05 Mei 2026',
    note: '',
    proofUrl: null
  },
  {
    id: 4,
    name: 'Ahmad Fauzi',
    phone: '08456789012',
    email: 'ahmad@gmail.com',
    program: 'Academic Program',
    status: 'confirmed',
    date: '03 Mei 2026',
    note: 'Sudah dikonfirmasi, materi dikirim via WA',
    proofUrl: 'https://placehold.co/400x600/22c55e/white?text=Dikonfirmasi'
  },
  {
    id: 5,
    name: 'Rizki Maulana',
    phone: '08567890123',
    email: 'rizki@gmail.com',
    program: 'Academic Program',
    status: 'confirmed',
    date: '02 Mei 2026',
    note: '',
    proofUrl: 'https://placehold.co/400x600/22c55e/white?text=Dikonfirmasi'
  },
  {
    id: 6,
    name: 'Dewi Lestari',
    phone: '08678901234',
    email: 'dewi@gmail.com',
    program: 'CTA Program',
    status: 'rejected',
    date: '01 Mei 2026',
    note: 'Bukti pembayaran tidak jelas / buram',
    proofUrl: null
  }
]

const PROGRAM_LIST = [
  'CTA Program',
  'Academic Program',
  'IELTS Preparation',
  'UTBK Intensif',
]

// ── SVG Icons ─────────────────────────────────────────────
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
)

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const IconCheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

const IconXCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
)

const IconWhatsapp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconX = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
)

const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

// ── WA Message Builder ─────────────────────────────────────
function buildWAMessage(reg, action) {
  if (action === 'confirmed') {
    return encodeURIComponent(
      `Halo ${reg.name}, terima kasih telah mendaftar di FOLKS Institute!\n\n` +
      `Pembayaran Anda untuk program *${reg.program}* telah kami konfirmasi.\n\n` +
      `Materi pembelajaran akan kami kirimkan segera. Selamat belajar!\n\n` +
      `— Tim FOLKS Institute`
    )
  }
  return encodeURIComponent(
    `Halo ${reg.name}, kami telah meninjau bukti pembayaran Anda.\n\n` +
    `Sayangnya kami belum bisa mengkonfirmasi pendaftaran Anda untuk program *${reg.program}*.\n\n` +
    `Mohon kirim ulang bukti pembayaran yang lebih jelas, atau hubungi kami untuk informasi lebih lanjut.\n\n` +
    `— Tim FOLKS Institute`
  )
}

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  program: PROGRAM_LIST[0],
  kelas: '',
  jadwal: '',
  metodePembayaran: 'Transfer Bank',
  jumlahBayar: '',
  note: '',
  status: 'pending',
}

// ══════════════════════════════════════════════════════════
export default function RegistrationManager() {
  const [registrations, setRegistrations] = useState(mockRegistrations)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterProgram, setFilterProgram] = useState('all')
  const [selectedReg, setSelectedReg] = useState(null)
  const [modal, setModal] = useState(null)
  const [rejectNote, setRejectNote] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const programs = [...new Set(registrations.map(r => r.program))]

  const filtered = registrations.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || r.status === filterStatus
    const matchProg = filterProgram === 'all' || r.program === filterProgram
    return matchSearch && matchStatus && matchProg
  })

  const stats = {
    total:     registrations.length,
    pending:   registrations.filter(r => r.status === 'pending').length,
    confirmed: registrations.filter(r => r.status === 'confirmed').length,
    rejected:  registrations.filter(r => r.status === 'rejected').length,
  }

  // ── Actions ──────────────────────────────────────────────
  const handleConfirm = (reg) => {
    setRegistrations(prev => prev.map(r =>
      r.id === reg.id ? { ...r, status: 'confirmed', note: 'Dikonfirmasi admin' } : r
    ))
    window.open(`https://wa.me/${reg.phone.replace(/^0/, '62')}?text=${buildWAMessage(reg, 'confirmed')}`, '_blank')
    setModal(null)
  }

  const handleReject = () => {
    setRegistrations(prev => prev.map(r =>
      r.id === selectedReg.id ? { ...r, status: 'rejected', note: rejectNote } : r
    ))
    window.open(`https://wa.me/${selectedReg.phone.replace(/^0/, '62')}?text=${buildWAMessage(selectedReg, 'rejected')}`, '_blank')
    setModal(null)
    setRejectNote('')
  }

  const handleAddSubmit = () => {
    if (!form.name || !form.phone || !form.program) return
    const now = new Date()
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    const newReg = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      program: form.program,
      kelas: form.kelas,
      jadwal: form.jadwal,
      metodePembayaran: form.metodePembayaran,
      jumlahBayar: form.jumlahBayar,
      status: form.status,
      date: dateStr,
      note: form.note,
      proofUrl: null,
    }
    setRegistrations(prev => [newReg, ...prev])
    setForm(emptyForm)
    setModal(null)
  }

  const handleDelete = () => {
    setRegistrations(prev => prev.filter(r => r.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const openDetail = (reg) => { setSelectedReg(reg); setModal('detail') }
  const openProof  = (reg) => { setSelectedReg(reg); setModal('proof')  }
  const closeModal = ()    => setModal(null)

  const avatarBg = (reg) => {
    if (reg.status === 'confirmed') return 'var(--success)'
    if (reg.status === 'rejected')  return 'var(--danger)'
    return 'var(--accent)'
  }

  return (
    <div>

      {/* ── Stat Cards ── */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Pendaftar',     value: stats.total,     color: 'blue',  Icon: IconUsers       },
          { label: 'Menunggu Konfirmasi', value: stats.pending,   color: 'amber', Icon: IconClock       },
          { label: 'Terkonfirmasi',       value: stats.confirmed, color: 'green', Icon: IconCheckCircle },
          { label: 'Ditolak',             value: stats.rejected,  color: 'coral', Icon: IconXCircle     },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}><s.Icon /></div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">

        {/* ── Toolbar ── */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Cari nama, no. WA, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="filter-select" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
            <option value="all">Semua Program</option>
            {programs.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            className="btn btn-admin-primary btn-sm"
            style={{ gap: 6 }}
            onClick={() => { setForm(emptyForm); setModal('add') }}
          >
            <IconPlus /> <span className="btn-label-mobile-hide">Input Manual</span>
            <span className="btn-label-mobile-only">+ Tambah</span>
          </button>
        </div>

        {/* ── Table ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            <h3>Tidak ada pendaftar ditemukan</h3>
            <p>Coba ubah filter pencarian</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pendaftar</th>
                  <th>Program</th>
                  {/* Kolom WA disembunyikan di mobile, bisa dilihat di detail */}
                  <th className="col-hide-mobile">No. WhatsApp</th>
                  <th className="col-hide-mobile">Bukti Bayar</th>
                  <th>Status</th>
                  <th className="col-hide-mobile">Tanggal</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(reg => (
                  <tr key={reg.id}>

                    {/* Pendaftar */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: avatarBg(reg),
                          color: 'white', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0,
                        }}>
                          {reg.name.charAt(0)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                            {reg.name}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                            {reg.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Program */}
                    <td>
                      <span style={{
                        fontSize: 12, padding: '3px 8px',
                        background: 'rgba(16,86,71,0.08)',
                        color: 'var(--primary)', borderRadius: 20,
                        whiteSpace: 'nowrap',
                      }}>
                        {reg.program}
                      </span>
                    </td>

                    {/* WA — disembunyikan di mobile */}
                    <td className="col-hide-mobile">
                      <a
                        href={`https://wa.me/${reg.phone.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#25D366', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}
                      >
                        <IconWhatsapp />
                        {reg.phone}
                      </a>
                    </td>

                    {/* Bukti Bayar — disembunyikan di mobile */}
                    <td className="col-hide-mobile">
                      {reg.proofUrl ? (
                        <button onClick={() => openProof(reg)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          <img src={reg.proofUrl} alt="Bukti bayar" className="payment-proof-thumb" />
                        </button>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Belum ada</span>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge badge-${reg.status}`}>
                        {reg.status === 'pending' ? 'Pending' : reg.status === 'confirmed' ? 'Konfirmasi' : 'Ditolak'}
                      </span>
                    </td>

                    {/* Tanggal — disembunyikan di mobile */}
                    <td className="col-hide-mobile" style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {reg.date}
                    </td>

                    {/* Aksi */}
                    <td>
                      <div className="action-btn-group">
                        {/* Detail selalu tampil */}
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => openDetail(reg)}
                          title="Lihat detail"
                          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <IconEye />
                          <span className="btn-label-mobile-hide">Detail</span>
                        </button>

                        {/* Konfirmasi & Tolak hanya untuk pending */}
                        {reg.status === 'pending' && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                              onClick={() => handleConfirm(reg)}
                              title="Konfirmasi"
                            >
                              <IconCheck />
                              <span className="btn-label-mobile-hide">Konfirmasi</span>
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                              onClick={() => { setSelectedReg(reg); setModal('reject') }}
                              title="Tolak"
                            >
                              <IconX />
                              <span className="btn-label-mobile-hide">Tolak</span>
                            </button>
                          </>
                        )}

                        {/* Hapus selalu tampil */}
                        <button
                          className="btn btn-sm btn-hapus-mobile"
                          title="Hapus"
                          style={{
                            background: 'rgba(239,68,68,0.08)',
                            color: 'var(--danger)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            display: 'flex', alignItems: 'center', gap: 4,
                          }}
                          onClick={() => setDeleteTarget(reg)}
                        >
                          <IconTrash />
                          <span className="btn-label-mobile-hide">Hapus</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ════ MODAL — Input Manual ════ */}
      {modal === 'add' && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 580 }}>
            <div className="modal-header">
              <h3>Input Manual Pendaftar</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                Data Siswa
              </p>
              <div className="form-row">
                <div className="form-group">
                  <label>Nama Lengkap *</label>
                  <input
                    type="text"
                    placeholder="Nama siswa"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>No. WhatsApp *</label>
                  <input
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, margin: '8px 0 12px' }}>
                Detail Kelas
              </p>
              <div className="form-row">
                <div className="form-group">
                  <label>Program *</label>
                  <select
                    value={form.program}
                    onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                  >
                    {PROGRAM_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Kelas / Batch</label>
                  <input
                    type="text"
                    placeholder="Contoh: Batch 12 / Kelas A"
                    value={form.kelas}
                    onChange={e => setForm(f => ({ ...f, kelas: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Jadwal Kelas</label>
                <input
                  type="text"
                  placeholder="Contoh: Senin & Rabu, 19.00–21.00 WIB"
                  value={form.jadwal}
                  onChange={e => setForm(f => ({ ...f, jadwal: e.target.value }))}
                />
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, margin: '8px 0 12px' }}>
                Info Pembayaran
              </p>
              <div className="form-row">
                <div className="form-group">
                  <label>Metode Pembayaran</label>
                  <select
                    value={form.metodePembayaran}
                    onChange={e => setForm(f => ({ ...f, metodePembayaran: e.target.value }))}
                  >
                    <option>Transfer Bank</option>
                    <option>QRIS</option>
                    <option>Tunai</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Jumlah Bayar</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1.500.000"
                    value={form.jumlahBayar}
                    onChange={e => setForm(f => ({ ...f, jumlahBayar: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status Awal</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Langsung Konfirmasi</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Catatan Tambahan</label>
                <textarea
                  placeholder="Info tambahan dari WA siswa, atau catatan admin..."
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  style={{ minHeight: 72 }}
                />
              </div>

            </div>
            <div className="modal-footer has-multiple">
              <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
              <button
                className="btn btn-admin-primary"
                onClick={handleAddSubmit}
                disabled={!form.name || !form.phone}
                style={{ opacity: (!form.name || !form.phone) ? 0.5 : 1 }}
              >
                Simpan Pendaftar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ MODAL — Detail ════ */}
      {modal === 'detail' && selectedReg && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>Detail Pendaftar</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {[
                { label: 'Nama',           value: selectedReg.name },
                { label: 'Email',          value: selectedReg.email },
                { label: 'No. WhatsApp',   value: selectedReg.phone },
                { label: 'Program',        value: selectedReg.program },
                { label: 'Kelas / Batch',  value: selectedReg.kelas  || '-' },
                { label: 'Jadwal',         value: selectedReg.jadwal || '-' },
                { label: 'Metode Bayar',   value: selectedReg.metodePembayaran || '-' },
                { label: 'Jumlah Bayar',   value: selectedReg.jumlahBayar ? `Rp ${selectedReg.jumlahBayar}` : '-' },
                { label: 'Tanggal Daftar', value: selectedReg.date },
                { label: 'Status',         value: selectedReg.status },
                { label: 'Catatan',        value: selectedReg.note || '-' },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', paddingBottom: 12, marginBottom: 12,
                  borderBottom: '1px solid var(--border)',
                  flexWrap: 'wrap', gap: 4,
                }}>
                  <span style={{ width: 140, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: row.label === 'Nama' ? 700 : 400, flex: 1, minWidth: 120 }}>
                    {row.value}
                  </span>
                </div>
              ))}
              {selectedReg.proofUrl && (
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>BUKTI PEMBAYARAN</p>
                  <img src={selectedReg.proofUrl} alt="Bukti bayar" className="proof-modal-img" />
                </div>
              )}
            </div>
            <div className={`modal-footer ${selectedReg.status === 'pending' ? 'has-multiple' : 'has-single'}`}>
              {selectedReg.status === 'pending' && (
                <>
                  <button className="btn btn-danger" onClick={() => setModal('reject')}>
                    <IconX /> Tolak
                  </button>
                  <button className="btn btn-accent" onClick={() => handleConfirm(selectedReg)}>
                    <IconCheck /> Konfirmasi & WA
                  </button>
                </>
              )}
              <button className="btn btn-ghost" onClick={closeModal}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* ════ MODAL — Bukti Bayar ════ */}
      {modal === 'proof' && selectedReg && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3>Bukti Pembayaran — {selectedReg.name}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <img src={selectedReg.proofUrl} alt="Bukti bayar" className="proof-modal-img" />
            </div>
            {selectedReg.status === 'pending' && (
              <div className="modal-footer has-multiple">
                <button className="btn btn-danger" onClick={() => setModal('reject')}>
                  <IconX /> Tolak
                </button>
                <button className="btn btn-accent" onClick={() => handleConfirm(selectedReg)}>
                  <IconCheck /> Konfirmasi & WA
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════ MODAL — Tolak ════ */}
      {modal === 'reject' && selectedReg && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3>Tolak Pendaftaran</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
                Pendaftaran <strong>{selectedReg.name}</strong> akan ditolak. WhatsApp otomatis akan terbuka.
              </p>
              <div className="form-group">
                <label>Alasan Penolakan (opsional)</label>
                <textarea
                  placeholder="Contoh: Bukti pembayaran tidak jelas, nominal tidak sesuai, dll."
                  value={rejectNote}
                  onChange={e => setRejectNote(e.target.value)}
                  style={{ minHeight: 80 }}
                />
              </div>
            </div>
            <div className="modal-footer has-multiple">
              <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
              <button
                className="btn"
                style={{ background: 'var(--danger)', color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={handleReject}
              >
                <IconX /> Tolak & Kirim WA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ MODAL — Konfirmasi Hapus ════ */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="modal-box" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3>Hapus Pendaftar</h3>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Yakin ingin menghapus data pendaftar <strong style={{ color: 'var(--text-main)' }}>{deleteTarget.name}</strong>?
                <br />
                Data yang dihapus tidak bisa dikembalikan.
              </p>
            </div>
            <div className="modal-footer has-multiple">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Batal</button>
              <button
                className="btn"
                style={{ background: 'var(--danger)', color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={handleDelete}
              >
                <IconTrash /> Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}