import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { useLanguage } from '../context/LanguageContext'

const API_URL = `${import.meta.env.VITE_API_URL}/api`

const categories = [
  'All Stories',
  'General',
  'Conversation',
  'ESP',
  'Academic',
  'IELTS Preparation',
  'Business',
  'Tech',
  'Scholarship',
]

// ── Skeleton ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="blog-card" style={{ pointerEvents: 'none' }}>
      <div className="blog-card__img-wrap">
        <div className="blog-card__img-placeholder" style={{ opacity: 0.4 }} />
      </div>
      <div className="blog-card__body">
        {[70, 90, 55].map((w, i) => (
          <div key={i} style={{
            height: i === 1 ? 18 : 13,
            width: `${w}%`,
            borderRadius: 6,
            background: 'var(--border)',
            marginBottom: 10,
          }} />
        ))}
      </div>
    </div>
  )
}

const Blog = () => {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All Stories')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then(r => {
        if (!r.ok) throw new Error(t.blog.error_fetch)
        return r.json()
      })
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // BARU
  const publishedPosts = posts.filter(p => p.status === 'published')
  const featuredPost = publishedPosts.find(p => p.featured) || publishedPosts[0] || null

  const filtered = activeCategory === 'All Stories'
    ? publishedPosts
    : publishedPosts.filter(p =>
      p.category?.toLowerCase() === activeCategory.toLowerCase()
    )

  const dynamicCategories = ['All Stories', ...Array.from(
    new Set(publishedPosts.map(p => p.category).filter(Boolean))
  )]

  const handleRead = (slug) => navigate(`/blog/${slug}`)

  return (
    <>
      <style>{`
        .blog-page {
          padding-top: 72px;
          min-height: 100vh;
        }

        /* ---- Hero Featured ---- */
        .blog-hero {
          position: relative;
          height: 420px;
          background: linear-gradient(160deg, #0f2535 0%, #1a3d52 50%, #2d6a80 100%);
          display: flex;
          align-items: flex-end;
          padding: 48px 5%;
          cursor: pointer;
          overflow: hidden;
          border-radius: 0 0 24px 24px;
        }
        .blog-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%);
        }
        .blog-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }
        .blog-hero__content {
          position: relative;
          z-index: 1;
          max-width: 520px;
        }
        .blog-hero__badge {
          display: inline-block;
          background: var(--accent);
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 5px 14px;
          border-radius: 50px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .blog-hero__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .blog-hero__desc {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 400px;
        }
        .blog-hero__btn {
          background: none;
          border: none;
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          transition: gap 0.3s ease;
        }
        .blog-hero__btn:hover { gap: 14px; }

        /* ---- Empty State ---- */
        .blog-hero--empty {
          cursor: default;
          align-items: center;
          justify-content: center;
        }
        .blog-hero--empty .blog-hero__content {
          text-align: center;
        }

        /* ---- Main Section ---- */
        .blog-main { padding: 48px 5% 80px; }
        .blog-main__inner { max-width: 1200px; margin: 0 auto; }

        /* ---- Category Filter ---- */
        .blog-categories {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .blog-cat-btn {
          padding: 8px 20px;
          border-radius: 50px;
          border: 1.5px solid var(--border);
          background: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .blog-cat-btn:hover { border-color: var(--primary); color: var(--primary); }
        .blog-cat-btn--active { background: var(--primary); border-color: var(--primary); color: white; }

        /* ---- Blog Grid ---- */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        /* ---- Blog Card ---- */
        .blog-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: blogCardIn 0.5s ease both;
        }
        @keyframes blogCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(16, 86, 71, 0.12);
        }
        .blog-card__img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .blog-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .blog-card:hover .blog-card__img { transform: scale(1.05); }
        .blog-card__img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a3d52 0%, #2d6a80 50%, #0f2535 100%);
        }
        .blog-card__category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0,0,0,0.6);
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 50px;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }
        .blog-card__body { padding: 20px 22px 24px; }
        .blog-card__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: var(--primary);
          line-height: 1.35;
          margin-bottom: 10px;
        }
        .blog-card__desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card__read {
          background: none;
          border: none;
          color: var(--accent);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.25s ease;
        }
        .blog-card__read:hover { gap: 10px; }

        /* ---- Empty / Error ---- */
        .blog-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 0;
          color: var(--text-muted);
          font-size: 15px;
        }

        @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) { .blog-hero { height: 320px; padding: 32px 5%; } }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr; }
          .blog-categories { gap: 8px; }
          .blog-cat-btn { font-size: 12px; padding: 6px 14px; }
        }
      `}</style>

      <div className="blog-page">
        <Navbar />

        {/* Featured Hero */}
        {loading ? (
          <section className="blog-hero" style={{ cursor: 'default' }}>
            <div className="blog-hero__overlay" />
            <div className="blog-hero__content">
              <div style={{ width: 100, height: 26, borderRadius: 50, background: 'rgba(255,255,255,0.2)', marginBottom: 16 }} />
              <div style={{ width: '80%', height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.15)', marginBottom: 12 }} />
              <div style={{ width: '60%', height: 16, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </section>
        ) : featuredPost ? (
          <section className="blog-hero" onClick={() => handleRead(featuredPost.slug)}>
            {featuredPost.cover_image && (
              <img src={featuredPost.cover_image} alt={featuredPost.title} className="blog-hero__img" />
            )}
            <div className="blog-hero__overlay" />
            <div className="blog-hero__content">
              <span className="blog-hero__badge">
                {featuredPost.featured ? t.blog.featured_badge : featuredPost.category || 'Article'}
              </span>
              <h1 className="blog-hero__title">{featuredPost.title}</h1>
              <p className="blog-hero__desc">
                {featuredPost.excerpt || featuredPost.content?.slice(0, 120) + '...'}
              </p>
              <button className="blog-hero__btn">
                {t.blog.read_more} <span>→</span>
              </button>
            </div>
          </section>
        ) : (
          <section className="blog-hero blog-hero--empty">
            <div className="blog-hero__overlay" />
            <div className="blog-hero__content">
              <h1 className="blog-hero__title" style={{ fontSize: '1.6rem' }}>{t.blog.empty_hero_title}</h1>
              <p className="blog-hero__desc">{t.blog.empty_hero_desc}</p>
            </div>
          </section>
        )}

        {/* Category Filter + Grid */}
        <section className="blog-main">
          <div className="blog-main__inner">

            <div className="blog-categories">
              {dynamicCategories.map(cat => (
                <button
                  key={cat}
                  className={`blog-cat-btn ${activeCategory === cat ? 'blog-cat-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog-grid">
              {loading ? (
                [1, 2, 3].map(i => <SkeletonCard key={i} />)
              ) : error ? (
                <div className="blog-empty">
                  <p>⚠ {error}</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="blog-empty">
                  <p>{t.blog.empty_grid}</p>
                </div>
              ) : (
                filtered.map((post, i) => (
                  <article
                    key={post.id}
                    className="blog-card"
                    onClick={() => handleRead(post.slug)}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="blog-card__img-wrap">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="blog-card__img" />
                      ) : (
                        <div className="blog-card__img-placeholder" />
                      )}
                      <span className="blog-card__category">{post.category || 'Article'}</span>
                    </div>
                    <div className="blog-card__body">
                      <h3 className="blog-card__title">{post.title}</h3>
                      <p className="blog-card__desc">
                        {post.excerpt || post.content?.slice(0, 120) + '...'}
                      </p>
                      <button className="blog-card__read">
                        {t.blog.read_article} <span>→</span>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}

export default Blog