import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api'
const getToken = () => sessionStorage.getItem('admin_token')
const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return '-'
  return 'Rp ' + Number(amount).toLocaleString('id-ID')
}

const CATEGORIES = ['General', 'Conversation', 'ESP', 'Professional Business']
const LEVELS = ['SD', 'SMP', 'SMA']

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
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

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
    if (!formData.title.trim()) return alert('Nama program wajib diisi')
    if (!formData.level) return alert('Level wajib dipilih')
    if (!formData.category) return alert('Kategori wajib dipilih')
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
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message)
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
    } catch (err) {
      alert('Gagal update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus program ini?')) return
    try {
      await fetch(`${API_URL}/programs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
      await fetchPrograms()
    } catch (err) {
      alert('Gagal menghapus program')
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
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: 20, color: 'var(--text-muted)'
                  }}>
                    🎓 {prog.level}
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
                  <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }} onClick={() => handleDelete(prog.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
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
    </div>
  )
}