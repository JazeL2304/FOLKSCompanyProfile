import { useState, useEffect } from 'react'

const API_URL = `${import.meta.env.VITE_API_URL}/api`
const getToken = () => sessionStorage.getItem('admin_token')
const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return '-'
  return 'Rp ' + Number(amount).toLocaleString('id-ID')
}

const CATEGORIES = ['General', 'Conversation', 'ESP', 'Professional Business']
const LEVELS = ['SD', 'SMP', 'SMA', 'Profesional']

const emptyForm = {
  title: '',
  description: '',
  price: '',
  level: '',
  category: 'General',
  features: '',
  active: true
}

export default function ProgramManager() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [editId, setEditId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [alertModal, setAlertModal] = useState({ show: false, title: '', message: '', type: 'info' })

  const showAlert = (title, message, type = 'info') => {
    setAlertModal({ show: true, title, message, type })
  }

  const fetchPrograms = async () => {
    try {
      const res = await fetch(`${API_URL}/programs`)
      const data = await res.json()
      setPrograms(data)
    } catch (err) {
      console.error('Gagal fetch programs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPrograms() }, [])

  const openEdit = (prog) => {
    setFormData({
      title: prog.title,
      description: prog.description || '',
      price: prog.price || '',
      level: prog.level || '',
      category: prog.category || 'General',
      features: Array.isArray(prog.features) ? prog.features.join(', ') : (prog.features || ''),
      active: prog.active
    })
    setEditId(prog.id)
    setModal('edit')
  }

  const openCreate = () => {
    setFormData(emptyForm)
    setEditId(null)
    setModal('create')
  }

  const handleSave = async () => {
    if (!formData.title.trim()) return showAlert('Peringatan', 'Nama program wajib diisi', 'warning')
    if (!formData.level) return showAlert('Peringatan', 'Level wajib dipilih', 'warning')
    if (!formData.category) return showAlert('Peringatan', 'Kategori wajib dipilih', 'warning')
    setSaving(true)

    let featuresArr = []
    if (formData.features.trim()) {
      try {
        featuresArr = JSON.parse(formData.features)
      } catch {
        featuresArr = formData.features.split(',').map(f => f.trim()).filter(Boolean)
      }
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      level: formData.level,
      category: formData.category,
      features: featuresArr,
      active: formData.active
    }

    try {
      if (modal === 'create') {
        const res = await fetch(`${API_URL}/programs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
      } else {
        const res = await fetch(`${API_URL}/programs/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
      }
      await fetchPrograms()
      setModal(null)
      showAlert('Berhasil!', modal === 'create' ? 'Program berhasil ditambahkan.' : 'Perubahan berhasil disimpan.', 'success')
    } catch (err) {
      showAlert('Error', 'Gagal menyimpan: ' + err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (prog) => {
    try {
      await fetch(`${API_URL}/programs/${prog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({ ...prog, active: !prog.active })
      })
      await fetchPrograms()
      showAlert('Berhasil!', 'Status program berhasil diperbarui.', 'success')
    } catch (err) {
      showAlert('Error', 'Gagal update status', 'error')
    }
  }

  const openDelete = (id) => {
    setDeleteId(id)
    setModal('delete')
  }

  const confirmDelete = async () => {
    try {
      setSaving(true)
      await fetch(`${API_URL}/programs/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
      await fetchPrograms()
      setModal(null)
      showAlert('Berhasil!', 'Program berhasil dihapus.', 'success')
    } catch (err) {
      showAlert('Error', 'Gagal menghapus program', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat program...</div>

  return (
    <div>
      {/* Summary */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Program', value: programs.length, color: 'blue' },
          { label: 'Program Aktif', value: programs.filter(p => p.active).length, color: 'green' },
          { label: 'Nonaktif', value: programs.filter(p => !p.active).length, color: 'amber' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-accent" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Program
        </button>
      </div>

      {programs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          Belum ada program. Klik "Tambah Program" untuk mulai.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
          {programs.map(prog => (
            <div key={prog.id} className="admin-card" style={{ opacity: prog.active ? 1 : 0.65, transition: 'opacity 0.2s' }}>
              <div style={{ padding: '20px 20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 10 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4, wordBreak: 'break-word' }}>
                      {prog.title}
                    </h3>
                    <span className={`badge ${prog.active ? 'badge-active' : 'badge-inactive'}`}>
                      {prog.active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(239,109,96,0.1)', color: 'var(--accent)',
                    padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                    fontWeight: 800, fontSize: 13, flexShrink: 0, whiteSpace: 'nowrap'
                  }}>
                    {formatRupiah(prog.price)}
                  </div>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
                  {prog.description}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  <span style={{
                    fontSize: 12, padding: '4px 10px',
                    background: prog.level === 'Profesional'
                      ? 'rgba(239,109,96,0.1)'
                      : 'var(--bg)',
                    border: prog.level === 'Profesional'
                      ? '1px solid rgba(239,109,96,0.3)'
                      : '1px solid var(--border)',
                    borderRadius: 20,
                    color: prog.level === 'Profesional' ? 'var(--accent)' : 'var(--text-muted)',
                    fontWeight: prog.level === 'Profesional' ? 600 : 400
                  }}>
                    {prog.level === 'Profesional' ? '💼' : '🎓'} {prog.level}
                  </span>
                  <span style={{
                    fontSize: 12, padding: '4px 10px',
                    background: 'rgba(16,86,71,0.08)',
                    borderRadius: 20, color: 'var(--primary)', fontWeight: 600
                  }}>
                    {prog.category || 'General'}
                  </span>
                </div>
              </div>

              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 8
              }}>
                <label className="toggle-wrap" style={{ gap: 8 }}>
                  <label className="toggle">
                    <input type="checkbox" checked={prog.active} onChange={() => toggleActive(prog)} />
                    <span className="toggle-slider" />
                  </label>
                  <span className="toggle-label" style={{ fontSize: 12 }}>
                    {prog.active ? 'Nonaktifkan' : 'Aktifkan'}
                  </span>
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(prog)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }} onClick={() => openDelete(prog.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Create / Edit */}
      {(modal === 'create' || modal === 'edit') && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box" style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>{modal === 'create' ? 'Tambah Program Baru' : 'Edit Program'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nama Program *</label>
                <input
                  type="text"
                  placeholder="Contoh: General English SD"
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  placeholder="Jelaskan program ini secara singkat..."
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Kategori *</label>
                  <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}>
                    <option value="">Pilih kategori...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Level *</label>
                  <select value={formData.level} onChange={e => setFormData(p => ({ ...p, level: e.target.value }))}>
                    <option value="">Pilih level...</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Harga (Rp)</label>
                <input
                  type="text"
                  placeholder="Contoh: 1.500.000"
                  value={formData.price ? Number(formData.price).toLocaleString('id-ID') : ''}
                  onChange={e => {
                    const raw = e.target.value.replace(/\./g, '').replace(/[^0-9]/g, '')
                    setFormData(p => ({ ...p, price: raw }))
                  }}
                />
              </div>
              <div className="form-group">
                <label>Features (pisahkan dengan koma)</label>
                <input
                  type="text"
                  placeholder="Contoh: Live Class, Modul PDF, Sertifikat"
                  value={formData.features}
                  onChange={e => setFormData(p => ({ ...p, features: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={e => setFormData(p => ({ ...p, active: e.target.checked }))}
                  />
                  <span className="toggle-slider" />
                </label>
                <span className="toggle-label">Program aktif (tampil di website)</span>
              </div>
            </div>
            <div className="modal-footer has-multiple">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-accent" onClick={handleSave} disabled={saving}>
                {saving ? 'Menyimpan...' : modal === 'create' ? 'Tambah Program' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {modal === 'delete' && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box" style={{ maxWidth: 400, textAlign: 'center', padding: '32px 24px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: '#fee2e2', color: '#ef4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, color: 'var(--text-main)', marginBottom: 8 }}>Hapus Program?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
              Tindakan ini tidak dapat dibatalkan. Program yang dihapus akan hilang secara permanen.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={() => setModal(null)} style={{ flex: 1 }}>Batal</button>
              <button className="btn" onClick={confirmDelete} disabled={saving} style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none' }}>
                {saving ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Alert (Success/Warning/Error) */}
      {alertModal.show && (
        <div className="modal-overlay" onClick={() => setAlertModal({ ...alertModal, show: false })} style={{ zIndex: 9999 }}>
          <div className="modal-box" style={{ maxWidth: 400, textAlign: 'center', padding: '32px 24px' }}>
            {alertModal.type === 'success' && (
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
            )}
            {alertModal.type === 'warning' && (
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
            )}
            {alertModal.type === 'error' && (
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
            )}
            <h3 style={{ fontSize: 20, color: 'var(--text-main)', marginBottom: 8 }}>{alertModal.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
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