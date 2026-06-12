import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { useLanguage } from '../context/LanguageContext'

const API_URL = `${import.meta.env.VITE_API_URL}/api`

// ── Estimate read time ─────────────────────────────────────
function estimateReadTime(content = '', t) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200)) + ' ' + (t ? t.blog_post.read_time : 'MIN READ')
}

// ── Avatar initials ────────────────────────────────────────
function AuthorAvatar({ name }) {
  const initials = (name || 'A').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div style={{
      width: 42, height: 42, borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--primary), #2d9a7a)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: 15, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ── Skeleton ───────────────────────────────────────────────
function SkeletonPost() {
  return (
    <div style={{ padding: '48px 5%', maxWidth: 760, margin: '0 auto' }}>
      {[40, 70, 90, 55, 30].map((w, i) => (
        <div key={i} style={{
          height: i === 1 ? 40 : 16,
          width: `${w}%`,
          borderRadius: 8,
          background: 'var(--border)',
          marginBottom: 16,
        }} />
      ))}
    </div>
  )
}

const BlogPost = () => {
  const { t } = useLanguage()
  const { slug } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Fetch artikel by slug + semua artikel untuk related & recent
    Promise.all([
      fetch(`${API_URL}/blogs/${slug}`).then(r => {
        if (!r.ok) throw new Error(t.blog_post.not_found_title)
        return r.json()
      }),
      fetch(`${API_URL}/blogs`).then(r => r.json()),
    ])
      .then(([postData, allPosts]) => {
        setPost(postData)
        // Related = published articles lain, max 3, exclude artikel ini
        const others = (Array.isArray(allPosts) ? allPosts : [])
          .filter(p => p.status === 'published' && p.slug !== slug)
          .slice(0, 3)
        setRelated(others)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <>
      <div style={{ paddingTop: 72 }}>
        <Navbar />
        <SkeletonPost />
      </div>
    </>
  )

  if (error) return (
    <>
      <div style={{ paddingTop: 72, minHeight: '100vh' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 5%' }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>📄</p>
          <h2 style={{ color: 'var(--primary)', marginBottom: 8 }}>{t.blog_post.not_found_title}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{error}</p>
          <button
            onClick={() => navigate('/blog')}
            style={{
              padding: '10px 24px', background: 'var(--primary)', color: 'white',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700,
            }}
          >
            {t.blog_post.back_to_blog}
          </button>
        </div>
        <Footer />
      </div>
    </>
  )

  const readTime = estimateReadTime(post.content, t)
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  // Paragraf dari content (split by \n\n atau \n)
  const paragraphs = (post.content || '').split(/\n\n+/).filter(Boolean)

  return (
    <>
      <style>{`
        .blogpost-page { padding-top: 72px; min-height: 100vh; }

        /* ---- Header ---- */
        .blogpost-header { padding: 48px 5% 32px; border-bottom: 1px solid var(--border); }
        .blogpost-header__inner { max-width: 760px; }
        .blogpost-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .blogpost-cat {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: 1.5px;
          color: var(--accent); text-transform: uppercase;
        }
        .blogpost-dot { color: var(--text-muted); font-size: 12px; }
        .blogpost-read { font-size: 12px; color: var(--text-muted); font-weight: 600; }
        .blogpost-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800; color: var(--primary);
          line-height: 1.2; margin-bottom: 16px;
        }
        .blogpost-subtitle {
          font-size: 16px; color: var(--text-muted);
          line-height: 1.7; margin-bottom: 24px; max-width: 640px;
        }
        .blogpost-author { display: flex; align-items: center; gap: 12px; }
        .blogpost-author__name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; color: var(--text-dark);
        }
        .blogpost-author__meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

        /* ---- Cover Image ---- */
        .blogpost-cover { padding: 32px 5%; }
        .blogpost-cover__inner {
          max-width: 1200px; margin: 0 auto;
          border-radius: 20px; overflow: hidden; height: 420px;
        }
        .blogpost-cover__inner img { width: 100%; height: 100%; object-fit: cover; }
        .blogpost-cover__placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #0f2535 0%, #1a3d52 40%, #2d6a80 100%);
        }

        /* ---- Body Layout ---- */
        .blogpost-body { padding: 0 5% 60px; }
        .blogpost-body__inner {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 200px 1fr 280px;
          gap: 48px; align-items: start;
        }

        /* ---- TOC ---- */
        .blogpost-toc { position: sticky; top: 100px; }
        .blogpost-toc__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 800; color: var(--text-muted);
          letter-spacing: 0.5px; margin-bottom: 14px; text-transform: uppercase;
        }
        .blogpost-toc__list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .blogpost-toc__link {
          font-size: 13px; color: var(--text-muted);
          text-decoration: none; transition: color 0.2s; line-height: 1.5;
        }
        .blogpost-toc__link:hover { color: var(--primary); }

        /* ---- Content ---- */
        .blogpost-content { min-width: 0; }
        .blogpost-section { margin-bottom: 40px; }
        .blogpost-section__para {
          font-size: 15px; color: #374151;
          line-height: 1.85; margin-bottom: 16px;
        }

        /* ---- Tags ---- */
        .blogpost-tags {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-top: 40px; padding-top: 28px;
          border-top: 1px solid var(--border);
        }
        .blogpost-tag {
          background: #f3f4f6; color: var(--text-muted);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          padding: 6px 14px; border-radius: 50px;
        }

        /* ---- Sidebar ---- */
        .blogpost-sidebar {
          position: sticky; top: 100px;
          display: flex; flex-direction: column; gap: 28px;
        }
        .blogpost-sidebar__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 800; color: var(--text-muted);
          letter-spacing: 0.5px; margin-bottom: 16px; text-transform: uppercase;
        }
        .blogpost-recent-item {
          padding: 14px 0; border-bottom: 1px solid var(--border);
          cursor: pointer; transition: opacity 0.2s;
        }
        .blogpost-recent-item:last-child { border-bottom: none; }
        .blogpost-recent-item:hover { opacity: 0.75; }
        .blogpost-recent-cat {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px; font-weight: 800; letter-spacing: 1px;
          color: var(--accent); text-transform: uppercase;
          display: block; margin-bottom: 4px;
        }
        .blogpost-recent-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 700; color: var(--text-dark);
          line-height: 1.4; margin-bottom: 4px;
        }
        .blogpost-recent-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

        /* ---- Subscribe Box ---- */
        .blogpost-sidebar__subscribe { background: var(--primary); border-radius: 16px; padding: 24px; }
        .blogpost-subscribe__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; font-weight: 800; color: white; margin-bottom: 8px;
        }
        .blogpost-subscribe__desc {
          font-size: 12px; color: rgba(255,255,255,0.75);
          line-height: 1.6; margin-bottom: 16px;
        }
        .blogpost-subscribe__btn {
          width: 100%; padding: 10px;
          background: var(--accent); color: white;
          border: none; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.2s;
        }
        .blogpost-subscribe__btn:hover { opacity: 0.9; }

        /* ---- Related Articles ---- */
        .blogpost-related { padding: 48px 5% 80px; border-top: 1px solid var(--border); }
        .blogpost-related__inner { max-width: 1200px; margin: 0 auto; }
        .blogpost-related__header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;
        }
        .blogpost-related__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 24px; font-weight: 800; color: var(--primary);
        }
        .blogpost-related__view-all {
          background: none; border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; color: var(--accent); cursor: pointer;
        }
        .blogpost-related__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

        /* ---- Blog Card (related) ---- */
        .blog-card {
          background: white; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border); cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .blog-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(16,86,71,0.12); }
        .blog-card__img-wrap { position: relative; height: 200px; overflow: hidden; }
        .blog-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .blog-card:hover .blog-card__img { transform: scale(1.05); }
        .blog-card__img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #1a3d52 0%, #2d6a80 50%, #0f2535 100%);
        }
        .blog-card__category {
          position: absolute; top: 12px; left: 12px;
          background: rgba(0,0,0,0.6); color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          padding: 4px 10px; border-radius: 50px;
          text-transform: uppercase; backdrop-filter: blur(8px);
        }
        .blog-card__body { padding: 20px 22px 24px; }
        .blog-card__title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 800; color: var(--primary);
          line-height: 1.35; margin-bottom: 10px;
        }
        .blog-card__desc {
          font-size: 13px; color: var(--text-muted);
          line-height: 1.7; margin-bottom: 16px;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .blog-card__read {
          background: none; border: none; color: var(--accent);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700; font-size: 13px; cursor: pointer; padding: 0;
          display: flex; align-items: center; gap: 6px; transition: gap 0.25s ease;
        }
        .blog-card__read:hover { gap: 10px; }

        /* ---- No Related ---- */
        .blogpost-no-related {
          grid-column: 1/-1; text-align: center;
          padding: 40px 0; color: var(--text-muted); font-size: 14px;
        }

        @media (max-width: 1024px) {
          .blogpost-body__inner { grid-template-columns: 1fr 280px; }
          .blogpost-toc { display: none; }
        }
        @media (max-width: 900px) { .blogpost-related__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
          .blogpost-body__inner { grid-template-columns: 1fr; }
          .blogpost-sidebar { position: static; }
          .blogpost-cover__inner { height: 260px; }
        }
        @media (max-width: 600px) { .blogpost-related__grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="blogpost-page">
        <Navbar />

        {/* Header */}
        <div className="blogpost-header">
          <div className="blogpost-header__inner">
            <div className="blogpost-meta">
              <span className="blogpost-cat">{post.category || 'Article'}</span>
              <span className="blogpost-dot">•</span>
              <span className="blogpost-read">{readTime}</span>
            </div>
            <h1 className="blogpost-title">{post.title}</h1>
            {post.excerpt && (
              <p className="blogpost-subtitle">{post.excerpt}</p>
            )}
            <div className="blogpost-author">
              <AuthorAvatar name={post.author} />
              <div>
                <p className="blogpost-author__name">{post.author || 'FOLKS Team'}</p>
                <p className="blogpost-author__meta">{publishedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="blogpost-cover">
          <div className="blogpost-cover__inner">
            {post.cover_image
              ? <img src={post.cover_image} alt={post.title} />
              : <div className="blogpost-cover__placeholder" />
            }
          </div>
        </div>

        {/* Body */}
        <div className="blogpost-body">
          <div className="blogpost-body__inner">

            {/* Left: TOC — pakai paragraf pertama tiap section sebagai heading */}
            <aside className="blogpost-toc">
              <p className="blogpost-toc__title">{t.blog_post.in_this_article}</p>
              <ul className="blogpost-toc__list">
                {paragraphs.slice(0, 4).map((para, i) => (
                  <li key={i}>
                    <a href={`#para-${i}`} className="blogpost-toc__link">
                      • {para.slice(0, 40)}{para.length > 40 ? '...' : ''}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Center: Content */}
            <article className="blogpost-content">
              <div className="blogpost-section">
                {paragraphs.map((para, i) => (
                  <p key={i} id={`para-${i}`} className="blogpost-section__para">{para}</p>
                ))}
              </div>

              {/* Tags */}
              {post.category && (
                <div className="blogpost-tags">
                  <span className="blogpost-tag">#{post.category.toUpperCase().replace(/\s+/g, '_')}</span>
                  <span className="blogpost-tag">#FOLKS_INSTITUTE</span>
                  <span className="blogpost-tag">#ENGLISH_LEARNING</span>
                </div>
              )}
            </article>

            {/* Right: Sidebar */}
            <aside className="blogpost-sidebar">
              {related.length > 0 && (
                <div className="blogpost-sidebar__recent">
                  <p className="blogpost-sidebar__title">{t.blog_post.recent_posts}</p>
                  {related.map((rp, i) => (
                    <div key={i} className="blogpost-recent-item" onClick={() => navigate(`/blog/${rp.slug}`)}>
                      <span className="blogpost-recent-cat">{rp.category || 'Article'}</span>
                      <p className="blogpost-recent-title">{rp.title}</p>
                      <p className="blogpost-recent-desc">
                        {rp.excerpt || rp.content?.slice(0, 80) + '...'}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="blogpost-sidebar__subscribe">
                <p className="blogpost-subscribe__title">{t.blog_post.subscribe_title}</p>
                <p className="blogpost-subscribe__desc">
                  {t.blog_post.subscribe_desc}
                </p>
                <button
                  className="blogpost-subscribe__btn"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=6287886180776', '_blank')}
                >
                  {t.blog_post.subscribe_btn}
                </button>
              </div>
            </aside>

          </div>
        </div>

        {/* Related Articles */}
        <section className="blogpost-related">
          <div className="blogpost-related__inner">
            <div className="blogpost-related__header">
              <h2 className="blogpost-related__title">{t.blog_post.related_title}</h2>
              <button className="blogpost-related__view-all" onClick={() => navigate('/blog')}>
                {t.blog_post.view_all}
              </button>
            </div>
            <div className="blogpost-related__grid">
              {related.length === 0 ? (
                <div className="blogpost-no-related">{t.blog_post.no_related}</div>
              ) : (
                related.map((r, i) => (
                  <article key={i} className="blog-card" onClick={() => navigate(`/blog/${r.slug}`)}>
                    <div className="blog-card__img-wrap">
                      {r.cover_image
                        ? <img src={r.cover_image} alt={r.title} className="blog-card__img" />
                        : <div className="blog-card__img-placeholder" />
                      }
                      <span className="blog-card__category">{r.category || 'Article'}</span>
                    </div>
                    <div className="blog-card__body">
                      <h3 className="blog-card__title">{r.title}</h3>
                      <p className="blog-card__desc">
                        {r.excerpt || r.content?.slice(0, 100) + '...'}
                      </p>
                      <button className="blog-card__read">{t.blog.read_article} <span>→</span></button>
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

export default BlogPost