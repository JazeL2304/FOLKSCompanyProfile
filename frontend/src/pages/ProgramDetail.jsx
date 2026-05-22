// src/pages/ProgramDetail.jsx

import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const icons = {
  gamepad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4"/>
      <path d="M8 12h4M10 10v4"/>
      <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="13" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
  teacher: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  trendingUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

// ─── DATA PER LEVEL ────────────────────────────────────────────────────────────
const levelData = {
  sd: {
    levelLabel: 'KIDS PROGRAM',
    heroTitle: 'English Program for Kids',
    heroSubtitle: 'Fun and interactive learning for the next generation. Join our joyful classes where every lesson is an adventure.',
    heroCtaEnroll: 'Enroll Now',
    detailTitle: 'Learning That Feels Like Play',
    detailDesc: "We believe that children learn best when they're having fun. Our curriculum blends engaging storytelling, interactive games, and guided play to make mastering English a joyful journey rather than a chore.",
    detailImageCaption: 'Learning is Fun',
    detailImageSub: 'Interactive & Joyful Methods',
    advantages: [
      { iconKey: 'gamepad', title: 'Play-based Learning',  desc: 'Interactive games that teach without feeling like lessons.' },
      { iconKey: 'music',   title: 'Storytelling & Songs', desc: 'Memorable adventures and catchy tunes for natural language acquisition.' },
      { iconKey: 'teacher', title: 'Friendly Teachers',    desc: 'Patient, encouraging guides who celebrate every small victory.' },
      { iconKey: 'star',    title: 'Progress Stars',       desc: 'Reward systems that motivate and build unshakeable confidence.' },
    ],
    ctaLabel: 'Ready to start?',
    ctaTitle: 'Free Consultation',
    ctaButton: 'Contact Us',
    features: [
      { iconKey: 'monitor', title: 'Live Online Classes',     desc: 'Fun sessions with friends and teachers. Our small group sizes ensure every child gets the attention they need to speak up confidently.',                    imageLeft: true  },
      { iconKey: 'zap',     title: 'Fun Learning Activities', desc: 'Quizzes, games, and storytelling adventures. Learning vocabulary and grammar happens naturally while completing exciting missions.',                        imageLeft: false },
      { iconKey: 'users',   title: 'Cheerful Support',        desc: 'Friendly teachers who help you every step of the way. We focus on building self-esteem alongside language skills.',                                         imageLeft: true  },
    ],
    faqItems: [
      { q: 'Bagaimana cara mendaftarkan anak saya?',         a: "Pendaftaran dapat dilakukan langsung melalui tombol 'Enroll Now' di website kami atau dengan mengunjungi cabang terdekat untuk konsultasi gratis." },
      { q: 'Apa metode pengajaran yang digunakan?',          a: "Kami menggunakan metode 'Interactive Narrative' di mana anak-anak belajar melalui cerita yang melibatkan karakter Folks dalam lingkungan dua arah yang aktif." },
      { q: 'Apakah ada tes penempatan sebelum masuk?',       a: 'Ya, kami menyediakan sesi trial dan asesmen singkat yang menyenangkan untuk memastikan anak berada di kelas yang sesuai dengan kemampuan mereka.' },
      { q: 'Berapa jumlah maksimal siswa dalam satu kelas?', a: 'Demi menjaga kualitas interaksi, setiap kelas dibatasi maksimal 8–10 siswa saja.' },
    ],
  },

  smp: {
    levelLabel: 'MIDDLE SCHOOL (SMP)',
    heroTitle: 'Academic English for SMP Students',
    heroSubtitle: 'Bridge the gap to academic excellence. Master communication, grammar, and critical thinking with our comprehensive English program designed specifically for middle schoolers.',
    heroCtaEnroll: 'Enroll Now',
    detailTitle: 'Interactive Academic English',
    detailDesc: 'Our methodology shifts the focus from basic literacy to advanced comprehension and expression, equipping SMP students with the linguistic tools they need for academic success.',
    detailImageCaption: 'Learning is Fun',
    detailImageSub: 'Immersive & Methodology',
    advantages: [
      { iconKey: 'chat',  title: 'Communication',      desc: 'Develop fluent speaking and active listening skills essential for academic discussions.' },
      { iconKey: 'book',  title: 'Grammar Mastery',    desc: 'Solidify structural understanding through practical application rather than rote memorization.' },
      { iconKey: 'brain', title: 'Critical Thinking',  desc: 'Analyze texts and formulate reasoned arguments, preparing for high school rigor.' },
      { iconKey: 'chart', title: 'Measurable Results', desc: 'Regular assessments and progress tracking to ensure consistent academic growth.' },
    ],
    ctaLabel: 'Siap untuk memulai?',
    ctaTitle: 'Daftar Konsultasi Gratis',
    ctaButton: 'Hubungi Kami',
    features: [
      { iconKey: 'monitor',    title: 'Live Online Classes',   desc: 'Join dynamic, real-time video sessions where students actively collaborate. Participate in lively group discussions, debates, and breakout rooms that mirror the energy of a physical classroom.',  imageLeft: true  },
      { iconKey: 'zap',        title: 'Interactive Activities', desc: "Learning doesn't stop at lectures. Engage with digital quizzes, collaborative online games, and interactive exercises designed specifically to keep teenagers focused and motivated while mastering English.", imageLeft: false },
      { iconKey: 'trendingUp', title: 'Progress & Feedback',   desc: 'Stay on track with our intuitive digital dashboard that monitors performance. Receive direct, personalized guidance from experienced teachers to target areas for improvement and celebrate academic wins.', imageLeft: true  },
    ],
    faqItems: [
      { q: 'Bagaimana cara mendaftarkan anak saya?',         a: "Pendaftaran dapat dilakukan langsung melalui tombol 'Enroll Now' di website kami atau dengan mengunjungi cabang terdekat untuk konsultasi gratis." },
      { q: 'Apa metode pengajaran yang digunakan?',          a: "Kami menggunakan metode 'Interactive Narrative' di mana anak-anak belajar melalui cerita yang melibatkan karakter Folks dalam lingkungan dua arah yang aktif." },
      { q: 'Apakah ada tes penempatan sebelum masuk?',       a: 'Ya, kami menyediakan sesi trial dan asesmen singkat yang menyenangkan untuk memastikan anak berada di kelas yang sesuai dengan kemampuan mereka.' },
      { q: 'Berapa jumlah maksimal siswa dalam satu kelas?', a: 'Demi menjaga kualitas interaksi, setiap kelas dibatasi maksimal 8–10 siswa saja.' },
    ],
  },

  sma: {
    levelLabel: 'HIGH SCHOOL (SMA)',
    heroTitle: 'Advanced English for SMA Students',
    heroSubtitle: 'Prepare for university, international exams, and global opportunities. Our advanced English program builds the skills you need to stand out.',
    heroCtaEnroll: 'Enroll Now',
    detailTitle: 'University-Ready English',
    detailDesc: 'Our SMA program focuses on advanced academic writing, critical analysis, and presentation skills — everything needed to excel in national exams, scholarship applications, and international settings.',
    detailImageCaption: 'Learning is Fun',
    detailImageSub: 'Academic & Career-Ready',
    advantages: [
      { iconKey: 'pen',    title: 'Academic Writing',  desc: 'Master essay structures, argumentative writing, and research paper techniques for university entrance.' },
      { iconKey: 'mic',    title: 'Public Speaking',   desc: 'Build confidence to present ideas clearly in English, from class presentations to debate competitions.' },
      { iconKey: 'globe',  title: 'Global Readiness',  desc: 'Prepare for IELTS, TOEFL, and international scholarships with targeted test-preparation modules.' },
      { iconKey: 'search', title: 'Critical Analysis', desc: 'Develop higher-order thinking to evaluate, synthesize, and articulate complex ideas in English.' },
    ],
    ctaLabel: 'Siap untuk memulai?',
    ctaTitle: 'Daftar Konsultasi Gratis',
    ctaButton: 'Hubungi Kami',
    features: [
      { iconKey: 'monitor',   title: 'Live Online Classes',  desc: 'Intensive live sessions focused on discussion, debate, and collaborative problem-solving. Real academic scenarios prepare you for university-level discourse.',                                    imageLeft: true  },
      { iconKey: 'clipboard', title: 'Exam Preparation',     desc: 'Structured modules for IELTS, TOEFL, and SNBT. Practice under exam conditions with timed drills and detailed feedback from expert instructors.',                                                  imageLeft: false },
      { iconKey: 'award',     title: 'Achievement Tracking', desc: 'Detailed progress reports every month, personalized study plans, and 1-on-1 coaching sessions to ensure you hit your target scores and goals.',                                                    imageLeft: true  },
    ],
    faqItems: [
      { q: 'Bagaimana cara mendaftarkan anak saya?',         a: "Pendaftaran dapat dilakukan langsung melalui tombol 'Enroll Now' di website kami atau dengan mengunjungi cabang terdekat untuk konsultasi gratis." },
      { q: 'Apa metode pengajaran yang digunakan?',          a: "Kami menggunakan metode 'Interactive Narrative' di mana anak-anak belajar melalui cerita yang melibatkan karakter Folks dalam lingkungan dua arah yang aktif." },
      { q: 'Apakah ada tes penempatan sebelum masuk?',       a: 'Ya, kami menyediakan sesi trial dan asesmen singkat yang menyenangkan untuk memastikan anak berada di kelas yang sesuai dengan kemampuan mereka.' },
      { q: 'Berapa jumlah maksimal siswa dalam satu kelas?', a: 'Demi menjaga kualitas interaksi, setiap kelas dibatasi maksimal 8–10 siswa saja.' },
    ],
  },
}

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`pd-faq__item ${open ? 'pd-faq__item--open' : ''}`}>
      <button className="pd-faq__question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="pd-faq__icon">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pd-faq__answer">{a}</div>}
    </div>
  )
}

// ─── ICON WRAPPER ──────────────────────────────────────────────────────────────
const Icon = ({ name, className = '' }) => (
  <span className={`pd-icon ${className}`}>{icons[name]}</span>
)

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
const ProgramDetail = () => {
  const { level } = useParams()
  const navigate = useNavigate()
  const data = levelData[level?.toLowerCase()]

  if (!data) {
    return (
      <div className="pd-page">
        <Navbar />
        <div style={{ padding: '120px 24px', textAlign: 'center' }}>
          <h2>Program tidak ditemukan.</h2>
          <button onClick={() => navigate('/program')} style={{ marginTop: 16 }}>
            Kembali ke Program
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleWa = () => {
    window.open('https://wa.me/6282289993655', '_blank')
  }

  return (
    <>
      <style>{`
        /* ============================================================
           ProgramDetail.css — FOLKS Institute
           Halaman detail program SD / SMP / SMA
           ============================================================ */

        .pd-page {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
        }

        /* ── ICON ── */
        .pd-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .pd-icon svg {
          width: 20px;
          height: 20px;
        }

        /* ── BUTTONS ── */
        .pd-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .pd-btn--primary {
          background: var(--accent, #EF6D60);
          color: #fff;
        }
        .pd-btn--primary:hover {
          background: #d85c50;
          transform: translateY(-2px);
        }
        .pd-btn--cta {
          background: #fff;
          color: var(--primary, #105647);
          font-weight: 700;
          width: 100%;
          justify-content: center;
          margin-top: 8px;
          border: none;
        }
        .pd-btn--cta:hover {
          background: #f0faf7;
        }

        /* ── HERO ── */
        .pd-hero {
          padding: 100px 0 60px;
          background: #fff;
        }
        .pd-hero__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .pd-hero__label {
          display: inline-block;
          background: #e8f5f1;
          color: var(--primary, #105647);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 18px;
        }
        .pd-hero__title {
          font-size: 2.4rem;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .pd-hero__subtitle {
          font-size: 1rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 440px;
        }
        .pd-hero__ctas {
          display: flex;
          gap: 14px;
        }

        /* Hero visual */
        .pd-hero__visual {
          display: flex;
          justify-content: center;
        }
        .pd-hero__img-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
        }
        .pd-hero__img-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 20px;
          background: linear-gradient(135deg, #e8f5f1 0%, #d0ede6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-hero__img-icon svg {
          width: 80px;
          height: 80px;
          color: var(--primary, #105647);
          opacity: 0.3;
        }
        .pd-hero__badge {
          position: absolute;
          bottom: -16px;
          left: 20px;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pd-hero__badge-svg svg {
          width: 24px;
          height: 24px;
          color: var(--primary, #105647);
        }
        .pd-hero__badge-num {
          font-size: 1rem;
          font-weight: 800;
          color: #1a1a1a;
        }
        .pd-hero__badge-sub {
          font-size: 0.72rem;
          color: #888;
        }

        /* ── DETAIL + ADVANTAGE ── */
        .pd-detail {
          padding: 80px 0;
          background: #f9fafb;
        }
        .pd-detail__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .pd-detail__left {
          display: flex;
          flex-direction: column;
        }
        .pd-detail__title {
          font-size: 1.9rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 16px;
          line-height: 1.25;
        }
        .pd-detail__desc {
          font-size: 0.97rem;
          color: #555;
          line-height: 1.8;
          margin-bottom: 28px;
        }
        .pd-detail__img-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }
        .pd-detail__img-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #105647 0%, #1a7a64 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
        }
        .pd-detail__img-icon svg {
          width: 72px;
          height: 72px;
          color: #fff;
          opacity: 0.25;
        }
        .pd-detail__img-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.95);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pd-detail__caption-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent, #EF6D60);
          flex-shrink: 0;
        }
        .pd-detail__caption-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1a1a1a;
        }
        .pd-detail__caption-sub {
          font-size: 0.75rem;
          color: #888;
        }

        /* Advantage card */
        .pd-advantage {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          padding: 32px;
        }
        .pd-advantage__title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .pd-advantage__list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .pd-advantage__item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .pd-advantage__icon {
          width: 36px;
          height: 36px;
          background: #e8f5f1;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--primary, #105647);
        }
        .pd-advantage__icon svg {
          width: 18px;
          height: 18px;
        }
        .pd-advantage__name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 3px;
        }
        .pd-advantage__desc {
          font-size: 0.82rem;
          color: #666;
          line-height: 1.5;
        }
        .pd-advantage__cta {
          background: var(--primary, #105647);
          border-radius: 14px;
          padding: 20px;
          color: #fff;
        }
        .pd-advantage__cta-label {
          font-size: 0.75rem;
          opacity: 0.8;
          margin-bottom: 4px;
        }
        .pd-advantage__cta-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        /* ── FEATURES ── */
        .pd-features {
          padding: 80px 0;
          background: #fff;
        }
        .pd-features__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          flex-direction: column;
          gap: 64px;
        }
        .pd-feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .pd-feature--img-left .pd-feature__img-wrap { order: 1; }
        .pd-feature--img-left .pd-feature__text     { order: 2; }
        .pd-feature--img-right .pd-feature__img-wrap { order: 2; }
        .pd-feature--img-right .pd-feature__text    { order: 1; }

        .pd-feature__img-wrap {
          border-radius: 16px;
          overflow: hidden;
        }
        .pd-feature__img-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #105647 0%, #1e9e7a 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-feature__placeholder-icon svg {
          width: 80px;
          height: 80px;
          color: #fff;
          opacity: 0.25;
        }
        .pd-feature__text {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pd-feature__icon-badge {
          width: 44px;
          height: 44px;
          background: #e8f5f1;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary, #105647);
        }
        .pd-feature__icon-badge svg {
          width: 22px;
          height: 22px;
        }
        .pd-feature__title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.2;
        }
        .pd-feature__desc {
          font-size: 0.97rem;
          color: #555;
          line-height: 1.8;
        }

        /* ── FAQ ── */
        .pd-faq {
          padding: 80px 0;
          background: #f9fafb;
        }
        .pd-faq__inner {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .pd-faq__title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 40px;
        }
        .pd-faq__list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pd-faq__item {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .pd-faq__item--open {
          box-shadow: 0 4px 20px rgba(16,86,71,0.12);
        }
        .pd-faq__question {
          width: 100%;
          background: none;
          border: none;
          padding: 18px 24px;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .pd-faq__question:hover { color: var(--primary, #105647); }
        .pd-faq__icon {
          font-size: 1.2rem;
          color: var(--accent, #EF6D60);
          flex-shrink: 0;
          font-weight: 400;
        }
        .pd-faq__answer {
          padding: 14px 24px 18px;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.7;
          border-top: 1px solid #f0f0f0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .pd-hero__inner,
          .pd-detail__inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .pd-hero { padding: 80px 0 48px; }
          .pd-hero__title { font-size: 1.9rem; }
          .pd-hero__visual { order: -1; }
          .pd-feature {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .pd-feature--img-right .pd-feature__img-wrap { order: 1; }
          .pd-feature--img-right .pd-feature__text     { order: 2; }
        }

        @media (max-width: 600px) {
          .pd-hero__inner,
          .pd-detail__inner,
          .pd-features__inner,
          .pd-faq__inner {
            padding: 0 20px;
          }
          .pd-hero__title { font-size: 1.6rem; }
          .pd-hero__ctas { flex-direction: column; }
          .pd-hero__ctas .pd-btn { width: 100%; justify-content: center; }
          .pd-faq__title { font-size: 1.3rem; }
          .pd-advantage { padding: 24px; }
        }
      `}</style>
      <div className="pd-page">
        <Navbar />

        {/* ── HERO ── */}
        <section className="pd-hero">
          <div className="pd-hero__inner">
            <div className="pd-hero__text">
              <span className="pd-hero__label">{data.levelLabel}</span>
              <h1 className="pd-hero__title">{data.heroTitle}</h1>
              <p className="pd-hero__subtitle">{data.heroSubtitle}</p>
              <div className="pd-hero__ctas">
                <button className="pd-btn pd-btn--primary" onClick={handleWa}>
                  {data.heroCtaEnroll}
                </button>
              </div>
            </div>
            <div className="pd-hero__visual">
              <div className="pd-hero__img-wrap">
                <div className="pd-hero__img-placeholder">
                  <Icon name="book" className="pd-hero__img-icon" />
                </div>
                <div className="pd-hero__badge">
                  <Icon name="users" className="pd-hero__badge-svg" />
                  <div>
                    <div className="pd-hero__badge-num">2,000+</div>
                    <div className="pd-hero__badge-sub">Students joined this year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DETAIL + ADVANTAGE ── */}
        <section className="pd-detail">
          <div className="pd-detail__inner">
            <div className="pd-detail__left">
              <span className="pd-hero__label" style={{ marginBottom: 12 }}>{data.levelLabel}</span>
              <h2 className="pd-detail__title">{data.detailTitle}</h2>
              <p className="pd-detail__desc">{data.detailDesc}</p>
              <div className="pd-detail__img-wrap">
                <div className="pd-detail__img-placeholder">
                  <Icon name="teacher" className="pd-detail__img-icon" />
                </div>
                <div className="pd-detail__img-caption">
                  <span className="pd-detail__caption-dot" />
                  <div>
                    <div className="pd-detail__caption-title">{data.detailImageCaption}</div>
                    <div className="pd-detail__caption-sub">{data.detailImageSub}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pd-advantage">
              <h3 className="pd-advantage__title">Folks Advantage</h3>
              <ul className="pd-advantage__list">
                {data.advantages.map((adv, i) => (
                  <li key={i} className="pd-advantage__item">
                    <span className="pd-advantage__icon">
                      <Icon name={adv.iconKey} />
                    </span>
                    <div>
                      <div className="pd-advantage__name">{adv.title}</div>
                      <div className="pd-advantage__desc">{adv.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pd-advantage__cta">
                <div className="pd-advantage__cta-label">{data.ctaLabel}</div>
                <div className="pd-advantage__cta-title">{data.ctaTitle}</div>
                <button className="pd-btn pd-btn--cta" onClick={handleWa}>
                  {data.ctaButton}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="pd-features">
          <div className="pd-features__inner">
            {data.features.map((feat, i) => (
              <div
                key={i}
                className={`pd-feature ${feat.imageLeft ? 'pd-feature--img-left' : 'pd-feature--img-right'}`}
              >
                <div className="pd-feature__img-wrap">
                  <div className="pd-feature__img-placeholder">
                    <Icon name={feat.iconKey} className="pd-feature__placeholder-icon" />
                  </div>
                </div>
                <div className="pd-feature__text">
                  <span className="pd-feature__icon-badge">
                    <Icon name={feat.iconKey} />
                  </span>
                  <h3 className="pd-feature__title">{feat.title}</h3>
                  <p className="pd-feature__desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pd-faq">
          <div className="pd-faq__inner">
            <h2 className="pd-faq__title">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <div className="pd-faq__list">
              {data.faqItems.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}

export default ProgramDetail