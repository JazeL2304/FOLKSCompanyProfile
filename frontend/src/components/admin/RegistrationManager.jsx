import { useState, useEffect } from 'react'

const API_URL = `${import.meta.env.VITE_API_URL}/api`
const getToken = () => sessionStorage.getItem('admin_token')

// ── SVG Icons ─────────────────────────────────────────────
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
)

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconCheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const IconXCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const IconWhatsapp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconX = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
)

const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

// ── WA Message Builder ─────────────────────────────────────
function buildWAMessage(reg, action) {
  if (action === 'confirmed') {
    return encodeURIComponent(
      `Halo ${reg.student_name}, terima kasih telah mendaftar di FOLKS Institute!\n\n` +
      `Pembayaran Anda telah kami konfirmasi.\n\n` +
      `Materi pembelajaran akan kami kirimkan segera. Selamat belajar!\n\n` +
      `— Tim FOLKS Institute`
    )
  }
  return encodeURIComponent(
    `Halo ${reg.student_name}, kami telah meninjau bukti pembayaran Anda.\n\n` +
    `Sayangnya kami belum bisa mengkonfirmasi pendaftaran Anda.\n\n` +
    `Mohon kirim ulang bukti pembayaran yang lebih jelas, atau hubungi kami untuk informasi lebih lanjut.\n\n` +
    `— Tim FOLKS Institute`
  )
}

const emptyForm = {
  student_name: '',
  phone: '',
  gender: '',
  program_id: '',
  notes: '',
  status: 'pending',
}

// ── Custom Select Component ────────────────────────────────
function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  // Group options if they have a `group` property
  const groupedOptions = options.reduce((acc, opt) => {
    const group = opt.group || '';
    if (!acc[group]) acc[group] = [];
    acc[group].push(opt);
    return acc;
  }, {});

  const groups = Object.keys(groupedOptions);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '10px 14px',
          border: '1px solid var(--border, #e5e7eb)',
          borderRadius: 8,
          background: 'white',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        <span style={{ color: selectedOption ? 'inherit' : 'var(--text-muted)' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 99 }} 
            onClick={() => setIsOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: 'white',
            border: '1px solid var(--border, #e5e7eb)',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxHeight: 250,
            overflowY: 'auto',
            zIndex: 100,
          }}>
            {groups.map(group => (
              <div key={group || 'ungrouped'}>
                {group && (
                  <div style={{
                    padding: '8px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--text-muted, #6b7280)',
                    background: '#f3f4f6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {group}
                  </div>
                )}
                {groupedOptions[group].map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    style={{
                      padding: '10px 14px',
                      cursor: 'pointer',
                      fontSize: 14,
                      background: value === opt.value ? 'rgba(16,86,71,0.08)' : 'transparent',
                      color: value === opt.value ? 'var(--primary, #105647)' : 'inherit',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (value !== opt.value) e.target.style.background = '#f9fafb';
                    }}
                    onMouseLeave={e => {
                      if (value !== opt.value) e.target.style.background = 'transparent';
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


// ══════════════════════════════════════════════════════════
export default function RegistrationManager() {
  const [registrations, setRegistrations] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterProgram, setFilterProgram] = useState('all')
  const [selectedReg, setSelectedReg] = useState(null)
  const [modal, setModal] = useState(null)
  const [rejectNote, setRejectNote] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [alertModal, setAlertModal] = useState({ show: false, title: '', message: '', type: 'info' })

  const showAlert = (title, message, type = 'info') => {
    setAlertModal({ show: true, title, message, type })
  }

  // ── Fetch Data ───────────────────────────────────────────
  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${API_URL}/registrations`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      const data = await res.json()
      setRegistrations(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Gagal fetch registrations:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPrograms = async () => {
    try {
      const res = await fetch(`${API_URL}/programs`)
      const data = await res.json()
      setPrograms(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Gagal fetch programs:', err)
    }
  }

  useEffect(() => {
    fetchRegistrations()
    fetchPrograms()
  }, [])

  // ── Filter & Stats ───────────────────────────────────────
  const filtered = registrations.filter(r => {
    const matchSearch =
      (r.student_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.phone || '').includes(search)
    const matchStatus = filterStatus === 'all' || r.status === filterStatus
    const matchProg = filterProgram === 'all' || r.program_id === filterProgram
    return matchSearch && matchStatus && matchProg
  })

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    confirmed: registrations.filter(r => r.status === 'confirmed').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  }

  // ── Actions ──────────────────────────────────────────────
  const handleConfirm = async (reg) => {
    try {
      await fetch(`${API_URL}/registrations/${reg.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: 'confirmed' }),
      })
      await fetchRegistrations()
      showAlert('Berhasil!', 'Pendaftaran berhasil dikonfirmasi.', 'success')
      window.open(
        `https://api.whatsapp.com/send?phone=${reg.phone.replace(/^0/, '62')}&text=${buildWAMessage(reg, 'confirmed')}`,
        '_blank'
      )
      setModal(null)
    } catch (err) {
      showAlert('Gagal!', 'Gagal konfirmasi pendaftaran', 'error')
    }
  }

  const handleReject = async () => {
    try {
      await fetch(`${API_URL}/registrations/${selectedReg.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: 'rejected', notes: rejectNote }),
      })
      await fetchRegistrations()
      showAlert('Berhasil!', 'Pendaftaran berhasil ditolak.', 'success')
      window.open(
        `https://wa.me/${selectedReg.phone.replace(/^0/, '62')}?text=${buildWAMessage(selectedReg, 'rejected')}`,
        '_blank'
      )
      setModal(null)
      setRejectNote('')
    } catch (err) {
      showAlert('Gagal!', 'Gagal menolak pendaftaran', 'error')
    }
  }

  const handleAddSubmit = async () => {
    if (!form.student_name || !form.phone) {
      showAlert('Validasi', 'Nama dan No WhatsApp wajib diisi.', 'warning')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          student_name: form.student_name,
          phone: form.phone,
          gender: form.gender || null,
          program_id: form.program_id || null,
          notes: form.notes,
          status: form.status,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan')
      await fetchRegistrations()
      showAlert('Berhasil!', 'Pendaftar berhasil ditambahkan.', 'success')
      setForm(emptyForm)
      setModal(null)
    } catch (err) {
      showAlert('Gagal!', 'Gagal menyimpan: ' + err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/registrations/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      await fetchRegistrations()
      showAlert('Berhasil!', 'Pendaftar berhasil dihapus.', 'success')
      setDeleteTarget(null)
    } catch (err) {
      showAlert('Gagal!', 'Gagal menghapus pendaftar', 'error')
    }
  }

  // ── Helpers ──────────────────────────────────────────────
  const getProgramName = (id) => {
    const prog = programs.find(p => p.id === id)
    return prog ? prog.title : '-'
  }

  const formatDate = (iso) => {
    if (!iso) return '-'
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
  }

  const formatDateLong = (iso) => {
    if (!iso) return '-'
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric',
    })
  }

  const openDetail = (reg) => { setSelectedReg(reg); setModal('detail') }
  const closeModal = () => setModal(null)

  const avatarBg = (reg) => {
    if (reg.status === 'confirmed') return 'var(--success)'
    if (reg.status === 'rejected') return 'var(--danger)'
    return 'var(--accent)'
  }

  // ── Loading State ────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
        Memuat data pendaftar...
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div>

      {/* ── Stat Cards ── */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Pendaftar', value: stats.total, color: 'blue', Icon: IconUsers },
          { label: 'Menunggu Konfirmasi', value: stats.pending, color: 'amber', Icon: IconClock },
          { label: 'Terkonfirmasi', value: stats.confirmed, color: 'green', Icon: IconCheckCircle },
          { label: 'Ditolak', value: stats.rejected, color: 'coral', Icon: IconXCircle },
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama, no. WA..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="filter-select"
            value={filterProgram}
            onChange={e => setFilterProgram(e.target.value)}
          >
            <option value="all">Semua Program</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <button
            className="btn btn-admin-primary btn-sm"
            style={{ gap: 6 }}
            onClick={() => { setForm(emptyForm); setModal('add') }}
          >
            <IconPlus />
            <span className="btn-label-mobile-hide">Input Manual</span>
            <span className="btn-label-mobile-only">+ Tambah</span>
          </button>
        </div>

        {/* ── Table ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
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
                  <th className="col-hide-mobile">No. WhatsApp</th>
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
                          background: avatarBg(reg), color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: 13, flexShrink: 0,
                        }}>
                          {(reg.student_name || '?').charAt(0)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontWeight: 600, fontSize: 13,
                            whiteSpace: 'nowrap', overflow: 'hidden',
                            textOverflow: 'ellipsis', maxWidth: 120,
                          }}>
                            {reg.student_name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Program */}
                    <td>
                      <span style={{
                        fontSize: 12, padding: '3px 8px',
                        background: 'rgba(16,86,71,0.08)',
                        color: 'var(--primary)', borderRadius: 20, whiteSpace: 'nowrap',
                      }}>
                        {getProgramName(reg.program_id)}
                      </span>
                    </td>

                    {/* WA */}
                    <td className="col-hide-mobile">
                      <a
                        href={`https://wa.me/${(reg.phone || '').replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: '#25D366', fontSize: 13, fontWeight: 600,
                          display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                        }}
                      >
                        <IconWhatsapp />
                        {reg.phone}
                      </a>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge badge-${reg.status}`}>
                        {reg.status === 'pending'
                          ? 'Pending'
                          : reg.status === 'confirmed'
                            ? 'Konfirmasi'
                            : 'Ditolak'}
                      </span>
                    </td>

                    {/* Tanggal */}
                    <td className="col-hide-mobile" style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {formatDate(reg.created_at)}
                    </td>

                    {/* Aksi */}
                    <td>
                      <div className="action-btn-group">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => openDetail(reg)}
                          title="Lihat detail"
                          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <IconEye />
                          <span className="btn-label-mobile-hide">Detail</span>
                        </button>

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
          <div className="modal-box" style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>Input Manual Pendaftar</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Nama Lengkap *</label>
                  <input
                    type="text"
                    placeholder="Nama siswa"
                    value={form.student_name}
                    onChange={e => setForm(f => ({ ...f, student_name: e.target.value }))}
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
                <div className="form-group">
                  <label>Jenis Kelamin</label>
                  <CustomSelect
                    value={form.gender}
                    onChange={val => setForm(f => ({ ...f, gender: val }))}
                    placeholder="Pilih jenis kelamin..."
                    options={[
                      { value: 'Male', label: 'Laki-laki' },
                      { value: 'Female', label: 'Perempuan' }
                    ]}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Program</label>
                  <CustomSelect
                    value={form.program_id}
                    onChange={val => setForm(f => ({ ...f, program_id: val }))}
                    placeholder="Pilih program..."
                    options={programs.map(p => ({ value: p.id, label: p.title, group: p.category }))}
                  />
                </div>
                <div className="form-group">
                  <label>Status Awal</label>
                  <CustomSelect
                    value={form.status}
                    onChange={val => setForm(f => ({ ...f, status: val }))}
                    placeholder="Pilih status..."
                    options={[
                      { value: 'pending', label: 'Pending' },
                      { value: 'confirmed', label: 'Langsung Konfirmasi' }
                    ]}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Catatan Tambahan</label>
                <textarea
                  placeholder="Info tambahan dari WA siswa, atau catatan admin..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  style={{ minHeight: 72 }}
                />
              </div>
            </div>
            <div className="modal-footer has-multiple">
              <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
              <button
                className="btn btn-admin-primary"
                onClick={handleAddSubmit}
                disabled={saving || !form.student_name || !form.phone}
                style={{ opacity: (!form.student_name || !form.phone) ? 0.5 : 1 }}
              >
                {saving ? 'Menyimpan...' : 'Simpan Pendaftar'}
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
                { label: 'Nama', value: selectedReg.student_name },
                { label: 'No. WhatsApp', value: selectedReg.phone },
                { label: 'Jenis Kelamin', value: selectedReg.gender === 'Male' ? 'Laki-laki' : selectedReg.gender === 'Female' ? 'Perempuan' : 'Belum Diatur' },
                { label: 'Program', value: getProgramName(selectedReg.program_id) },
                { label: 'Status', value: selectedReg.status },
                { label: 'Tanggal Daftar', value: formatDateLong(selectedReg.created_at) },
                { label: 'Catatan', value: selectedReg.notes || '-' },
              ].map(row => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex', paddingBottom: 12, marginBottom: 12,
                    borderBottom: '1px solid var(--border)',
                    flexWrap: 'wrap', gap: 4,
                  }}
                >
                  <span style={{ width: 140, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: row.label === 'Nama' ? 700 : 400, flex: 1, minWidth: 120 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className={`modal-footer ${selectedReg.status === 'pending' ? 'has-multiple' : ''}`}>
              {selectedReg.status === 'pending' && (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={() => setModal('reject')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <IconX /> Tolak
                  </button>
                  <button
                    className="btn btn-accent"
                    onClick={() => handleConfirm(selectedReg)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <IconCheck /> Konfirmasi &amp; WA
                  </button>
                </>
              )}
              <button className="btn btn-ghost" onClick={closeModal}>Tutup</button>
            </div>
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
                Pendaftaran <strong>{selectedReg.student_name}</strong> akan ditolak.
                WhatsApp otomatis akan terbuka.
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
                <IconX /> Tolak &amp; Kirim WA
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
                Yakin ingin menghapus data pendaftar{' '}
                <strong style={{ color: 'var(--text-main)' }}>{deleteTarget.student_name}</strong>?
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

      {/* ════ MODAL — Alert ════ */}
      {alertModal.show && (
        <div className="modal-overlay" onClick={() => setAlertModal({ ...alertModal, show: false })} style={{ zIndex: 9999 }}>
          <div className="modal-box" style={{ maxWidth: 360, textAlign: 'center', padding: '32px 24px' }}>
            {alertModal.type === 'success' && (
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <IconCheck />
              </div>
            )}
            {alertModal.type === 'warning' && (
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </div>
            )}
            {alertModal.type === 'error' && (
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <IconX />
              </div>
            )}
            <h3 style={{ fontSize: 20, color: 'var(--text-main)', marginBottom: 8 }}>{alertModal.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              {alertModal.message}
            </p>
            <button className="btn btn-accent" onClick={() => setAlertModal({ ...alertModal, show: false })} style={{ width: '100%', justifyContent: 'center' }}>
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  )
}