// src/components/admin/BlogManager.jsx
import { useState } from 'react'

const CATEGORIES = ['Tips Belajar', 'Beasiswa', 'Persiapan Ujian', 'Motivasi', 'Info Program']

const mockArticles = [
  {
    id: 1,
    title: 'Tips Belajar Efektif untuk Siswa SMA',
    category: 'Tips Belajar',
    status: 'published',
    featured: true,
    author: 'Tim FOLKS',
    date: '01 Mei 2026',
    excerpt: 'Temukan cara belajar yang paling efektif untuk memaksimalkan hasil ujian kamu...'
  },
  {
    id: 2,
    title: 'Panduan Lengkap Beasiswa LPDP 2026',
    category: 'Beasiswa',
    status: 'published',
    featured: false,
    author: 'Tim FOLKS',
    date: '28 Apr 2026',
    excerpt: 'Semua yang perlu kamu ketahui tentang pendaftaran beasiswa LPDP tahun ini...'
  },
  {
    id: 3,
    title: 'Cara Masuk Universitas Luar Negeri',
    category: 'Info Program',
    status: 'draft',
    featured: false,
    author: 'Tim FOLKS',
    date: '25 Apr 2026',
    excerpt: 'Langkah-langkah persiapan yang harus dilakukan jika ingin kuliah di luar negeri...'
  },
  {
    id: 4,
    title: 'Strategi Menghadapi UTBK 2026',
    category: 'Persiapan Ujian',
    status: 'published',
    featured: false,
    author: 'Tim FOLKS',
    date: '20 Apr 2026',
    excerpt: 'Persiapan matang adalah kunci sukses UTBK. Berikut strategi yang terbukti berhasil...'
  },
  {
    id: 5,
    title: 'Kisah Sukses Alumni FOLKS Institute',
    category: 'Motivasi',
    status: 'published',
    featured: false,
    author: 'Tim FOLKS',
    date: '15 Apr 2026',
    excerpt: 'Menginspirasi dari alumni yang berhasil masuk universitas impian mereka...'
  }
]

const emptyForm = {
  title: '',
  category: '',
  status: 'draft',
  featured: false,
  excerpt: '',
  content: ''
}

export default function BlogManager() {
  const [articles, setArticles] = useState(mockArticles)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [modal, setModal] = useState(null) // null | 'create' | 'edit' | 'delete'
  const [formData, setFormData] = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    const matchCat = filterCategory === 'all' || a.category === filterCategory
    return matchSearch && matchStatus && matchCat
  })

  const openCreate = () => {
    setFormData(emptyForm)
    setEditId(null)
    setModal('create')
  }

  const openEdit = (article) => {
    setFormData({
      title: article.title,
      category: article.category,
      status: article.status,
      featured: article.featured,
      excerpt: article.excerpt,
      content: article.content || ''
    })
    setEditId(article.id)
    setModal('edit')
  }

  const openDelete = (article) => {
    setEditId(article.id)
    setModal('delete')
  }

  const handleSave = () => {
    if (!formData.title.trim()) return alert('Judul artikel wajib diisi')
    if (modal === 'create') {
      const newArticle = {
        id: Date.now(),
        ...formData,
        author: 'Tim FOLKS',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      }
      setArticles(prev => [newArticle, ...prev])
    } else {
      setArticles(prev => prev.map(a => a.id === editId ? { ...a, ...formData } : a))
    }
    setModal(null)
  }

  const handleDelete = () => {
    setArticles(prev => prev.filter(a => a.id !== editId))
    setModal(null)
  }

  const toggleFeatured = (id) => {
    setArticles(prev => prev.map(a => ({
      ...a,
      featured: a.id === id ? !a.featured : false // hanya 1 featured
    })))
  }

  const toggleStatus = (id) => {
    setArticles(prev => prev.map(a =>
      a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a
    ))
  }

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
    featured: articles.filter(a => a.featured).length
  }

  return (
    <div>
      {/* Mini stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Artikel', value: stats.total, color: 'blue' },
          { label: 'Published', value: stats.published, color: 'green' },
          { label: 'Draft', value: stats.draft, color: 'amber' },
          { label: 'Featured', value: stats.featured, color: 'coral' }
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main table card */}
      <div className="admin-card">
        {/* Filter bar */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select className="filter-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button className="btn btn-accent" onClick={openCreate}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Artikel Baru
          </button>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <h3>Tidak ada artikel ditemukan</h3>
            <p>Coba ubah filter atau buat artikel baru</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Artikel</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Tanggal</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(article => (
                  <tr key={article.id}>
                    <td>
                      <div className="name-cell" style={{ maxWidth: 280 }}>
                        <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {article.title}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {article.excerpt}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 12, padding: '3px 8px',
                        background: 'rgba(16,86,71,0.08)',
                        color: 'var(--primary)', borderRadius: 20, fontWeight: 500
                      }}>
                        {article.category}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(article.id)}
                        className={`badge ${article.status === 'published' ? 'badge-published' : 'badge-draft'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Klik untuk toggle status"
                      >
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td>
                      <label className="toggle-wrap">
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={article.featured}
                            onChange={() => toggleFeatured(article.id)}
                          />
                          <span className="toggle-slider"/>
                        </label>
                      </label>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{article.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(article)} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => openDelete(article)} title="Hapus">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
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

      {/* Create / Edit Modal */}
      {(modal === 'create' || modal === 'edit') && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box" style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h3>{modal === 'create' ? 'Buat Artikel Baru' : 'Edit Artikel'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Judul Artikel *</label>
                <input
                  type="text"
                  placeholder="Masukkan judul artikel..."
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}>
                    <option value="">Pilih kategori...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Excerpt / Ringkasan</label>
                <textarea
                  placeholder="Ringkasan singkat artikel (tampil di card)..."
                  value={formData.excerpt}
                  onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                  style={{ minHeight: 60 }}
                />
              </div>
              <div className="form-group">
                <label>Konten Artikel</label>
                <textarea
                  placeholder="Tulis konten artikel di sini... (Rich text editor akan diintegrasikan nanti)"
                  value={formData.content}
                  onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                  style={{ minHeight: 120 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))}
                  />
                  <span className="toggle-slider"/>
                </label>
                <span className="toggle-label">Jadikan Featured Article (muncul di hero blog)</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-accent" onClick={handleSave}>
                {modal === 'create' ? 'Simpan Artikel' : 'Update Artikel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {modal === 'delete' && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3>Hapus Artikel?</h3>
              <button className="modal-close" onClick={() => setModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Artikel ini akan dihapus permanen dan tidak bisa dikembalikan. Yakin ingin menghapus?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Batal</button>
              <button className="btn" style={{ background: 'var(--danger)', color: 'white' }} onClick={handleDelete}>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}