import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const API_URL = 'http://localhost:5000/api'
const getToken = () => sessionStorage.getItem('admin_token')

// Supabase client untuk upload Storage langsung dari frontend
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const CATEGORIES = ['General', 'Conversation', 'ESP', 'Academic', 'IELTS Preparation', 'Business', 'Tech', 'Scholarship']

const emptyForm = {
  title: '',
  slug: '',
  category: '',
  status: 'draft',
  featured: false,
  excerpt: '',
  content: '',
  author: 'Tim FOLKS',
  cover_image: ''
}

export default function BlogManager() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [modal, setModal] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const fileInputRef = useRef(null)

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`)
      const data = await res.json()
      setArticles(data)
    } catch (err) {
      console.error('Gagal fetch articles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const generateSlug = (title) =>
    title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    const matchCat = filterCategory === 'all' || a.category === filterCategory
    return matchSearch && matchStatus && matchCat
  })

  const openCreate = () => {
    setFormData(emptyForm)
    setImagePreview('')
    setEditId(null)
    setModal('create')
  }

  const openEdit = (article) => {
    setFormData({
      title: article.title,
      slug: article.slug || '',
      category: article.category || '',
      status: article.status || 'draft',
      featured: article.featured || false,
      excerpt: article.excerpt || '',
      content: article.content || '',
      author: article.author || 'Tim FOLKS',
      cover_image: article.cover_image || ''
    })
    setImagePreview(article.cover_image || '')
    setEditId(article.id)
    setModal('edit')
  }

  const openDelete = (article) => {
    setEditId(article.id)
    setModal('delete')
  }

  // Upload gambar ke Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.')
      return
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.')
      return
    }

    setUploading(true)

    try {
      // Buat nama file unik
      const ext = file.name.split('.').pop()
      const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

      // Upload ke Supabase Storage bucket "blog-images"
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Dapatkan public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      const publicUrl = urlData.publicUrl

      setFormData(p => ({ ...p, cover_image: publicUrl }))
      setImagePreview(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      alert('Gagal upload gambar: ' + err.message)
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = () => {
    setFormData(p => ({ ...p, cover_image: '' }))
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async () => {
    if (!formData.title.trim()) return alert('Judul artikel wajib diisi')
    if (uploading) return alert('Tunggu hingga gambar selesai diupload')
    setSaving(true)

    const payload = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      category: formData.category,
      status: formData.status,
      featured: formData.featured,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      cover_image: formData.cover_image || null
    }

    try {
      if (modal === 'create') {
        const res = await fetch(`${API_URL}/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
      } else {
        const res = await fetch(`${API_URL}/blogs/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
      }
      await fetchArticles()
      setModal(null)
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/blogs/${editId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
      await fetchArticles()
      setModal(null)
    } catch (err) {
      alert('Gagal menghapus artikel')
    }
  }

  const toggleStatus = async (article) => {
    try {
      await fetch(`${API_URL}/blogs/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          ...article,
          status: article.status === 'published' ? 'draft' : 'published'
        })
      })
      await fetchArticles()
    } catch (err) {
      alert('Gagal update status')
    }
  }

  const toggleFeatured = async (article) => {
    try {
      await Promise.all(articles.map(a =>
        fetch(`${API_URL}/blogs/${a.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({ ...a, featured: a.id === article.id ? !article.featured : false })
        })
      ))
      await fetchArticles()
    } catch (err) {
      alert('Gagal update featured')
    }
  }

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
    featured: articles.filter(a => a.featured).length
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat artikel...</div>

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
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
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
        <div className="filter-bar">
          <div className="search-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Artikel Baru
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Thumbnail */}
                        {article.cover_image ? (
                          <img
                            src={article.cover_image}
                            alt=""
                            style={{
                              width: 44, height: 44, borderRadius: 6,
                              objectFit: 'cover', flexShrink: 0,
                              border: '1px solid var(--border)'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: 44, height: 44, borderRadius: 6, flexShrink: 0,
                            background: 'rgba(16,86,71,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px dashed var(--border)'
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        )}
                        <div className="name-cell" style={{ maxWidth: 240 }}>
                          <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {article.title}
                          </p>
                          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {article.excerpt || 'Tidak ada ringkasan'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 12, padding: '3px 8px',
                        background: 'rgba(16,86,71,0.08)',
                        color: 'var(--primary)', borderRadius: 20, fontWeight: 500
                      }}>
                        {article.category || '-'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(article)}
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
                            checked={article.featured || false}
                            onChange={() => toggleFeatured(article)}
                          />
                          <span className="toggle-slider" />
                        </label>
                      </label>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }) : '-'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(article)} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => openDelete(article)} title="Hapus">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
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

              {/* === UPLOAD FOTO === */}
              <div className="form-group">
                <label>Foto Cover Artikel</label>

                {imagePreview ? (
                  /* Preview gambar yang sudah diupload */
                  <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                    />
                    <button
                      onClick={handleRemoveImage}
                      style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'rgba(0,0,0,0.6)', color: 'white',
                        border: 'none', borderRadius: 6, padding: '4px 10px',
                        fontSize: 12, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', gap: 4
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Hapus foto
                    </button>
                  </div>
                ) : (
                  /* Area upload */
                  <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed var(--border)',
                      borderRadius: 8,
                      padding: '32px 20px',
                      textAlign: 'center',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      background: 'rgba(16,86,71,0.03)',
                      transition: 'border-color 0.2s',
                      opacity: uploading ? 0.7 : 1
                    }}
                    onMouseEnter={e => !uploading && (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    {uploading ? (
                      <>
                        <div style={{
                          width: 32, height: 32, margin: '0 auto 10px',
                          border: '3px solid var(--border)',
                          borderTopColor: 'var(--primary)',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite'
                        }} />
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Mengupload gambar...</p>
                      </>
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ margin: '0 auto 10px', display: 'block', opacity: 0.6 }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)', margin: '0 0 4px' }}>
                          Klik untuk upload foto
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
                          JPG, PNG, WebP — Maksimal 5MB
                        </p>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Field lainnya */}
              <div className="form-group">
                <label>Judul Artikel *</label>
                <input
                  type="text"
                  placeholder="Masukkan judul artikel..."
                  value={formData.title}
                  onChange={e => setFormData(p => ({
                    ...p,
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  }))}
                />
              </div>
              <div className="form-group">
                <label>Slug (auto-generated)</label>
                <input
                  type="text"
                  placeholder="slug-artikel"
                  value={formData.slug}
                  onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
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
                  placeholder="Tulis konten artikel di sini..."
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
                  <span className="toggle-slider" />
                </label>
                <span className="toggle-label">Jadikan Featured Article</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-accent" onClick={handleSave} disabled={saving || uploading}>
                {uploading ? 'Mengupload foto...' : saving ? 'Menyimpan...' : modal === 'create' ? 'Simpan Artikel' : 'Update Artikel'}
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

      {/* CSS untuk spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}