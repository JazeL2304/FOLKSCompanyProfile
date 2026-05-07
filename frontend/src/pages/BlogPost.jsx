import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import '../styles/Blog.css'

const post = {
  category: 'EDUCATION TECH',
  readTime: '15 MIN READ',
  title: 'The Evolution of Language Learning in the Digital Era',
  subtitle: 'Exploring how digital tools are reshaping literacy development and creating hyper-personalized learning pathways for the next generation of global students.',
  author: {
    name: 'Dr. Sarah Chen',
    role: 'Academic Director',
    date: 'March 15, 2024',
    avatar: null,
  },
  image: null,
  tableOfContents: [
    'The Digital Shift',
    'Personalized Fluency',
    'AI-Powered Feedback',
    'Future of Classrooms',
  ],
  sections: [
    {
      heading: 'The Shift from Analog to Digital',
      body: `For decades, language learning was confined to heavy textbooks and static audio recordings. However, the digital revolution has completely dismantled these barriers, introducing a more dynamic, interactive, and efficient way to achieve fluency.\n\nArtificial intelligence now offers a solution that mimics the attention of a private tutor at a global scale. By analyzing a student's reading speed, comprehension gaps, and even emotional engagement, AI systems can dynamically adjust the difficulty of English literacy exercises in real-time.`,
      quote: 'Digital tools are not a replacement for teachers, but a powerful catalyst for human-centered learning.',
      quoteImage: null,
    },
    {
      heading: 'Personalized Fluency Pathways',
      body: `One of the most significant advantages of digital tools is the ability to create personalized learning journeys. Every student has a unique pace and specific areas of struggle. Traditional classroom settings often fail to address these nuances, leaving some students behind while others feel unchallenged.\n\nWith the integration of data-driven insights, we can now provide students with content that reflects their specific cultural context while introducing them to global perspectives. The future of English education isn't just about learning vocabulary; it's about leveraging technology to foster deeper critical thinking and global empathy.`,
      numbered: [
        {
          num: '01',
          title: 'Adaptive Learning Tech',
          desc: 'Algorithms that adjust content difficulty based on user performance, ensuring an optimal flow state for learning.',
        },
      ],
    },
  ],
  tags: ['#LANGUAGE_LEARNING', '#EDTECH', '#DIGITAL_ERA', '#FLUENCY'],
  recentPosts: [
    {
      category: 'EXAM PREP',
      title: 'Top 5 IELTS Tips: Mastering the Speaking Section',
      desc: 'Practical strategies to boost your confidence and score higher on your next exam.',
      slug: 'ielts-tips',
    },
    {
      category: 'BUSINESS',
      title: 'Business English Hacks for Global Meetings',
      desc: 'The essential phrases and etiquette for navigating international corporate environments.',
      slug: 'business-english-hacks',
    },
    {
      category: 'CAREER',
      title: 'Public Speaking Mastery for Professionals',
      desc: 'How to showcase your personality and skills to win over global audiences.',
      slug: 'public-speaking',
    },
  ],
  related: [
    {
      category: 'CULTURE',
      title: 'The Role of Empathy in Language Learning',
      desc: 'Understanding cultural nuance is just as important as mastering grammar rules for true...',
      slug: 'empathy-language',
    },
    {
      category: 'TECH',
      title: 'Gamification: Why Your Brain Loves Points',
      desc: 'The neurobiology behind why earning badges makes learning English more addictive and fun.',
      slug: 'gamification',
    },
    {
      category: 'METHODS',
      title: 'Reading vs. Watching: Which is Faster?',
      desc: 'A comparison of vocabulary retention between reading literature and watching cinema in...',
      slug: 'reading-vs-watching',
    },
  ],
}

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  return (
    <div className="blogpost-page">
      <Navbar />

      {/* Header */}
      <div className="blogpost-header">
        <div className="blogpost-header__inner">
          <div className="blogpost-meta">
            <span className="blogpost-cat">{post.category}</span>
            <span className="blogpost-dot">•</span>
            <span className="blogpost-read">{post.readTime}</span>
          </div>
          <h1 className="blogpost-title">{post.title}</h1>
          <p className="blogpost-subtitle">{post.subtitle}</p>

          <div className="blogpost-author">
            <div className="blogpost-author__avatar">
              {post.author.avatar
                ? <img src={post.author.avatar} alt={post.author.name} />
                : <div className="blogpost-author__avatar-placeholder" />
              }
            </div>
            <div>
              <p className="blogpost-author__name">{post.author.name}</p>
              <p className="blogpost-author__meta">{post.author.date} · {post.author.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="blogpost-cover">
        <div className="blogpost-cover__inner">
          {post.image
            ? <img src={post.image} alt={post.title} />
            : <div className="blogpost-cover__placeholder" />
          }
        </div>
      </div>

      {/* Body */}
      <div className="blogpost-body">
        <div className="blogpost-body__inner">

          {/* Left: TOC */}
          <aside className="blogpost-toc">
            <p className="blogpost-toc__title">Table of Contents</p>
            <ul className="blogpost-toc__list">
              {post.tableOfContents.map((item, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="blogpost-toc__link">• {item}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Center: Content */}
          <article className="blogpost-content">
            {post.sections.map((section, i) => (
              <div key={i} id={`section-${i}`} className="blogpost-section">
                <h2 className="blogpost-section__heading">{section.heading}</h2>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="blogpost-section__para">{para}</p>
                ))}

                {section.quote && (
                  <div className="blogpost-quote-wrap">
                    {section.quoteImage
                      ? <img src={section.quoteImage} alt="" className="blogpost-quote-img" />
                      : <div className="blogpost-quote-img blogpost-quote-img--placeholder" />
                    }
                    <blockquote className="blogpost-quote">
                      <span className="blogpost-quote__bar" />
                      "{section.quote}"
                    </blockquote>
                  </div>
                )}

                {section.numbered && section.numbered.map((item, k) => (
                  <div key={k} className="blogpost-numbered">
                    <span className="blogpost-numbered__num">{item.num}</span>
                    <div>
                      <p className="blogpost-numbered__title">{item.title}</p>
                      <p className="blogpost-numbered__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Tags */}
            <div className="blogpost-tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="blogpost-tag">{tag}</span>
              ))}
            </div>
          </article>

          {/* Right: Sidebar */}
          <aside className="blogpost-sidebar">
            <div className="blogpost-sidebar__recent">
              <p className="blogpost-sidebar__title">↗ Recent Posts</p>
              {post.recentPosts.map((rp, i) => (
                <div key={i} className="blogpost-recent-item" onClick={() => navigate(`/blog/${rp.slug}`)}>
                  <span className="blogpost-recent-cat">{rp.category}</span>
                  <p className="blogpost-recent-title">{rp.title}</p>
                  <p className="blogpost-recent-desc">{rp.desc}</p>
                </div>
              ))}
            </div>

            <div className="blogpost-sidebar__subscribe">
              <p className="blogpost-subscribe__title">Stay Informed</p>
              <p className="blogpost-subscribe__desc">Join 5,000+ students receiving weekly insights on literacy and tech.</p>
              <input type="email" placeholder="your@email.com" className="blogpost-subscribe__input" />
              <button className="blogpost-subscribe__btn">Subscribe Now</button>
            </div>
          </aside>

        </div>
      </div>

      {/* Related Articles */}
      <section className="blogpost-related">
        <div className="blogpost-related__inner">
          <div className="blogpost-related__header">
            <h2 className="blogpost-related__title">Related Articles</h2>
            <button className="blogpost-related__view-all" onClick={() => navigate('/blog')}>View All →</button>
          </div>
          <div className="blogpost-related__grid">
            {post.related.map((r, i) => (
              <article key={i} className="blog-card" onClick={() => navigate(`/blog/${r.slug}`)}>
                <div className="blog-card__img-wrap">
                  <div className="blog-card__img-placeholder" />
                  <span className="blog-card__category">{r.category}</span>
                </div>
                <div className="blog-card__body">
                  <h3 className="blog-card__title">{r.title}</h3>
                  <p className="blog-card__desc">{r.desc}</p>
                  <button className="blog-card__read">Read Article <span>→</span></button>
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

export default BlogPost