import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import '../styles/Blog.css'

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

const featuredPost = {
  id: 1,
  category: 'FEATURED STORY',
  title: 'Unlock Global Opportunities with English',
  titleAccent: 'English',
  desc: 'Strong English skills connect your local dreams to global opportunities.',
  slug: 'unlock-global-opportunities-with-english',
  image: null,
}

const posts = [
  {
    id: 2,
    category: 'CONVERSATION',
    title: 'Tips for Fluency: Moving Beyond Textbooks',
    desc: 'Language is a living entity. Learn how to immerse yourself in natural speech patterns and colloquialisms for authentic fluency.',
    slug: 'tips-for-fluency',
    image: null,
  },
  {
    id: 3,
    category: 'PROFESSIONAL',
    title: 'Business English Hacks for Leaders',
    desc: 'Master the art of negotiation and boardroom presentations with precise vocabulary tailored for global executive leadership.',
    slug: 'business-english-hacks',
    image: null,
  },
  {
    id: 4,
    category: 'ESP',
    title: 'English for Specific Academic Purposes',
    desc: 'A deep dive into technical writing and research methodology for scholars aiming to publish in international journals.',
    slug: 'english-specific-academic-purposes',
    image: null,
  },
  {
    id: 5,
    category: 'GENERAL',
    title: 'The Psychology of Language Learning',
    desc: 'How mindset and cognitive flexibility impact your ability to acquire new languages at any stage of your professional life.',
    slug: 'psychology-language-learning',
    image: null,
  },
  {
    id: 6,
    category: 'CONVERSATION',
    title: 'Perfecting Pronunciation: A Guide',
    desc: 'Understanding the phonetic foundations of English to improve clarity and confidence in public speaking engagements.',
    slug: 'perfecting-pronunciation',
    image: null,
  },
  {
    id: 7,
    category: 'ESP',
    title: 'The Future of AI in Education',
    desc: 'Exploring how artificial intelligence is personalizing the learning journey for modern students in the Folks ecosystem.',
    slug: 'future-ai-education',
    image: null,
  },
]

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All Stories')
  const navigate = useNavigate()

  const filtered = activeCategory === 'All Stories'
    ? posts
    : posts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())

  const handleRead = (slug) => navigate(`/blog/${slug}`)

  return (
    <div className="blog-page">
      <Navbar />

      {/* Featured Hero */}
      <section className="blog-hero" onClick={() => handleRead(featuredPost.slug)}>
        <div className="blog-hero__overlay" />
        <div className="blog-hero__content">
          <span className="blog-hero__badge">{featuredPost.category}</span>
          <h1 className="blog-hero__title">
            {featuredPost.title.replace(featuredPost.titleAccent, '')}
            <span className="blog-hero__accent">{featuredPost.titleAccent}</span>
          </h1>
          <p className="blog-hero__desc">{featuredPost.desc}</p>
          <button className="blog-hero__btn">
            Read More <span className="blog-hero__arrow">→</span>
          </button>
        </div>
      </section>

      {/* Category Filter + Grid */}
      <section className="blog-main">
        <div className="blog-main__inner">

          <div className="blog-categories">
            {categories.map(cat => (
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
            {filtered.map((post, i) => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => handleRead(post.slug)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="blog-card__img-wrap">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="blog-card__img" />
                  ) : (
                    <div className="blog-card__img-placeholder" />
                  )}
                  <span className="blog-card__category">{post.category}</span>
                </div>
                <div className="blog-card__body">
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__desc">{post.desc}</p>
                  <button className="blog-card__read">
                    Read Article <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default Blog