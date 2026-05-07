// src/components/admin/ProgramManager.jsx
import { useState } from 'react'

const mockPrograms = [
  {
    id: 1,
    name: 'CTA Program',
    description: 'Program persiapan masuk universitas top dalam dan luar negeri. Fokus pada penguatan akademik, essay, dan interview skill.',
    price: 2500000,
    level: 'SMA / Sederajat',
    duration: '3 Bulan',
    active: true,
    students: 28
  },
  {
    id: 2,
    name: 'Academic Program',
    description: 'Program bimbingan belajar intensif untuk mata pelajaran utama dengan metode terbukti meningkatkan nilai siswa.',
    price: 1500000,
    level: 'SMP & SMA',
    duration: '1 Bulan',
    active: true,
    students: 15
  },
  {
    id: 3,
    name: 'IELTS Preparation',
    description: 'Program persiapan ujian IELTS dengan target score minimal 6.5. Fokus pada 4 skill: Reading, Writing, Listening, Speaking.',
    price: 3000000,
    level: 'Semua Level',
    duration: '2 Bulan',
    active: true,
    students: 12
  },
  {
    id: 4,
    name: 'UTBK Intensif',
    description: 'Program intensif khusus persiapan UTBK/SNBT. Latihan soal terpola dan simulasi ujian lengkap.',
    price: 1800000,
    level: 'Kelas 12 SMA',
    duration: '6 Minggu',
    active: false,
    students: 0
  }
]

const formatRupiah = (amount) => 'Rp ' + amount.toLocaleString('id-ID')

const emptyForm = {
  name: '',
  description: '',
  price: '',
  level: '',
  duration: '',
  active: true
}

export default function ProgramManager() {
  const [programs, setPrograms] = useState(mockPrograms)
  const [modal, setModal] = useState(null)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  const openEdit = (prog) => {
    setFormData({
      name: prog.name,
      description: prog.description,
      price: prog.price,
      level: prog.level,
      duration: prog.duration,
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

  const handleSave = () => {
    if (!formData.name.trim()) return alert('Nama program wajib diisi')
    if (modal === 'create') {
      setPrograms(prev => [...prev, { id: Date.now(), ...formData, price: Number(formData.price), students: 0 }])
    } else {
      setPrograms(prev => prev.map(p => p.id === editId ? { ...p, ...formData, price: Number(formData.price) } : p))
    }
    setModal(null)
  }

  const toggleActive = (id) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  return (
    <div>
      {/* Summary */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Program', value: programs.length, color: 'blue' },
          { label: 'Program Aktif', value: programs.filter(p => p.active).length, color: 'green' },
          { label: 'Nonaktif', value: programs.filter(p => !p.active).length, color: 'amber' },
          { label: 'Total Siswa', value: programs.reduce((a, p) => a + p.students, 0), color: 'coral' }
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-accent" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Tambah Program
        </button>
      </div>

      {/* Program Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {programs.map(prog => (
          <div
            key={prog.id}
            className="admin-card"
            style={{ opacity: prog.active ? 1 : 0.65, transition: 'opacity 0.2s' }}
          >
            <div style={{ padding: '20px 20px 0' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                    {prog.name}
                  </h3>
                  <span className={`badge ${prog.active ? 'badge-active' : 'badge-inactive'}`}>
                    {prog.active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <div style={{
                  background: 'rgba(239,109,96,0.1)', color: 'var(--accent)',
                  padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                  fontWeight: 800, fontSize: 15
                }}>
                  {formatRupiah(prog.price)}
                </div>
              </div>

              {/* Desc */}
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                {prog.description}
              </p>

              {/* Info pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {[
                  { icon: '🎓', text: prog.level },
                  { icon: '⏱️', text: prog.duration },
                  { icon: '👥', text: `${prog.students} siswa` }
                ].map(info => (
                  <span key={info.text} style={{
                    fontSize: 12, padding: '4px 10px',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: 20, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4
                  }}>
                    {info.icon} {info.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <label className="toggle-wrap" style={{ gap: 8 }}>
                <label className="toggle">
                  <input type="checkbox" checked={prog.active} onChange={() => toggleActive(prog.id)} />
                  <span className="toggle-slider"/>
                </label>
                <span className="toggle-label" style={{ fontSize: 12 }}>
                  {prog.active ? 'Nonaktifkan' : 'Aktifkan'}
                </span>
              </label>
              <button className="btn btn-ghost btn-sm" onClick={() => openEdit(prog)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Program
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
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
                  placeholder="Contoh: CTA Program"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
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
                  <label>Harga (Rp)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 1500000"
                    value={formData.price}
                    onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Level / Target Siswa</label>
                  <input
                    type="text"
                    placeholder="Contoh: SMA / Sederajat"
                    value={formData.level}
                    onChange={e => setFormData(p => ({ ...p, level: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Durasi Program</label>
                <input
                  type="text"
                  placeholder="Contoh: 3 Bulan"
                  value={formData.duration}
                  onChange={e => setFormData(p => ({ ...p, duration: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={e => setFormData(p => ({ ...p, active: e.target.checked }))}
                  />
                  <span className="toggle-slider"/>
                </label>
                <span className="toggle-label">Program aktif (tampil di website)</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-accent" onClick={handleSave}>
                {modal === 'create' ? 'Tambah Program' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}