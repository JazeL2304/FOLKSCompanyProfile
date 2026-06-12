const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, 'frontend/src/locales/en.json');
const idJsonPath = path.join(__dirname, 'frontend/src/locales/id.json');

const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const idData = JSON.parse(fs.readFileSync(idJsonPath, 'utf8'));

// EN text
enData.program_detail = {
  "sd": {
    "levelLabel": "KIDS PROGRAM",
    "heroTitle": "English Program for Kids",
    "heroSubtitle": "Fun and interactive learning for the next generation. Join our joyful classes where every lesson is an adventure.",
    "heroCtaEnroll": "Enroll Now",
    "detailTitle": "Learning That Feels Like Play",
    "detailDesc": "We believe that children learn best when they're having fun. Our curriculum blends engaging storytelling, interactive games, and guided play to make mastering English a joyful journey rather than a chore.",
    "detailImageCaption": "Learning is Fun",
    "detailImageSub": "Interactive & Joyful Methods",
    "advantages": [
      { "title": "Play-based Learning", "desc": "Interactive games that teach without feeling like lessons." },
      { "title": "Storytelling & Songs", "desc": "Memorable adventures and catchy tunes for natural language acquisition." },
      { "title": "Friendly Teachers", "desc": "Patient, encouraging guides who celebrate every small victory." },
      { "title": "Progress Stars", "desc": "Reward systems that motivate and build unshakeable confidence." }
    ],
    "ctaLabel": "Ready to start?",
    "ctaTitle": "Free Consultation",
    "ctaButton": "Contact Us",
    "features": [
      { "title": "Live Online Classes", "desc": "Fun sessions with friends and teachers. Our small group sizes ensure every child gets the attention they need to speak up confidently." },
      { "title": "Fun Learning Activities", "desc": "Quizzes, games, and storytelling adventures. Learning vocabulary and grammar happens naturally while completing exciting missions." },
      { "title": "Cheerful Support", "desc": "Friendly teachers who help you every step of the way. We focus on building self-esteem alongside language skills." }
    ],
    "faqItems": [
      { "q": "How do I enroll my child?", "a": "Registration can be done directly via the 'Enroll Now' button on our website or by visiting the nearest branch for a free consultation." },
      { "q": "What teaching method is used?", "a": "We use the 'Interactive Narrative' method where children learn through stories involving Folks characters in an active two-way environment." },
      { "q": "Is there a placement test before joining?", "a": "Yes, we provide a fun trial session and short assessment to ensure children are placed in a class that suits their abilities." },
      { "q": "What is the maximum number of students in a class?", "a": "To maintain interaction quality, each class is limited to a maximum of 8-10 students." }
    ]
  },
  "smp": {
    "levelLabel": "MIDDLE SCHOOL (SMP)",
    "heroTitle": "Academic English for SMP Students",
    "heroSubtitle": "Bridge the gap to academic excellence. Master communication, grammar, and critical thinking with our comprehensive English program designed specifically for middle schoolers.",
    "heroCtaEnroll": "Enroll Now",
    "detailTitle": "Interactive Academic English",
    "detailDesc": "Our methodology shifts the focus from basic literacy to advanced comprehension and expression, equipping SMP students with the linguistic tools they need for academic success.",
    "detailImageCaption": "Learning is Fun",
    "detailImageSub": "Immersive & Methodology",
    "advantages": [
      { "title": "Communication", "desc": "Develop fluent speaking and active listening skills essential for academic discussions." },
      { "title": "Grammar Mastery", "desc": "Solidify structural understanding through practical application rather than rote memorization." },
      { "title": "Critical Thinking", "desc": "Analyze texts and formulate reasoned arguments, preparing for high school rigor." },
      { "title": "Measurable Results", "desc": "Regular assessments and progress tracking to ensure consistent academic growth." }
    ],
    "ctaLabel": "Ready to start?",
    "ctaTitle": "Free Consultation",
    "ctaButton": "Contact Us",
    "features": [
      { "title": "Live Online Classes", "desc": "Join dynamic, real-time video sessions where students actively collaborate. Participate in lively group discussions, debates, and breakout rooms that mirror the energy of a physical classroom." },
      { "title": "Interactive Activities", "desc": "Learning doesn't stop at lectures. Engage with digital quizzes, collaborative online games, and interactive exercises designed specifically to keep teenagers focused and motivated while mastering English." },
      { "title": "Progress & Feedback", "desc": "Stay on track with our intuitive digital dashboard that monitors performance. Receive direct, personalized guidance from experienced teachers to target areas for improvement and celebrate academic wins." }
    ],
    "faqItems": [
      { "q": "How do I enroll my child?", "a": "Registration can be done directly via the 'Enroll Now' button on our website or by visiting the nearest branch for a free consultation." },
      { "q": "What teaching method is used?", "a": "We use the 'Interactive Narrative' method where children learn through stories involving Folks characters in an active two-way environment." },
      { "q": "Is there a placement test before joining?", "a": "Yes, we provide a fun trial session and short assessment to ensure children are placed in a class that suits their abilities." },
      { "q": "What is the maximum number of students in a class?", "a": "To maintain interaction quality, each class is limited to a maximum of 8-10 students." }
    ]
  },
  "sma": {
    "levelLabel": "HIGH SCHOOL (SMA)",
    "heroTitle": "Advanced English for SMA Students",
    "heroSubtitle": "Prepare for university, international exams, and global opportunities. Our advanced English program builds the skills you need to stand out.",
    "heroCtaEnroll": "Enroll Now",
    "detailTitle": "University-Ready English",
    "detailDesc": "Our SMA program focuses on advanced academic writing, critical analysis, and presentation skills — everything needed to excel in national exams, scholarship applications, and international settings.",
    "detailImageCaption": "Learning is Fun",
    "detailImageSub": "Academic & Career-Ready",
    "advantages": [
      { "title": "Academic Writing", "desc": "Master essay structures, argumentative writing, and research paper techniques for university entrance." },
      { "title": "Public Speaking", "desc": "Build confidence to present ideas clearly in English, from class presentations to debate competitions." },
      { "title": "Global Readiness", "desc": "Prepare for IELTS, TOEFL, and international scholarships with targeted test-preparation modules." },
      { "title": "Critical Analysis", "desc": "Develop higher-order thinking to evaluate, synthesize, and articulate complex ideas in English." }
    ],
    "ctaLabel": "Ready to start?",
    "ctaTitle": "Free Consultation",
    "ctaButton": "Contact Us",
    "features": [
      { "title": "Live Online Classes", "desc": "Intensive live sessions focused on discussion, debate, and collaborative problem-solving. Real academic scenarios prepare you for university-level discourse." },
      { "title": "Exam Preparation", "desc": "Structured modules for IELTS, TOEFL, and SNBT. Practice under exam conditions with timed drills and detailed feedback from expert instructors." },
      { "title": "Achievement Tracking", "desc": "Detailed progress reports every month, personalized study plans, and 1-on-1 coaching sessions to ensure you hit your target scores and goals." }
    ],
    "faqItems": [
      { "q": "How do I enroll my child?", "a": "Registration can be done directly via the 'Enroll Now' button on our website or by visiting the nearest branch for a free consultation." },
      { "q": "What teaching method is used?", "a": "We use the 'Interactive Narrative' method where children learn through stories involving Folks characters in an active two-way environment." },
      { "q": "Is there a placement test before joining?", "a": "Yes, we provide a fun trial session and short assessment to ensure children are placed in a class that suits their abilities." },
      { "q": "What is the maximum number of students in a class?", "a": "To maintain interaction quality, each class is limited to a maximum of 8-10 students." }
    ]
  },
  "conversation": {
    "levelLabel": "CONVERSATION",
    "heroTitle": "Master Spoken English with Confidence",
    "heroSubtitle": "Speak naturally, fluently, and confidently in any situation. From casual small talk to deep philosophical discussions, express yourself without hesitation.",
    "heroCtaEnroll": "Enroll Now",
    "detailTitle": "Fluent, Dynamic & Expressive",
    "detailDesc": "Our Conversation program focuses on practical speaking skills, idioms, and cultural nuances. You will engage in storytelling, debates, and role-plays designed to mirror real-life interactions.",
    "detailImageCaption": "Speak Up",
    "detailImageSub": "Interactive Dialogue Sessions",
    "advantages": [
      { "title": "Impromptu Speaking", "desc": "Learn to think on your feet and articulate thoughts clearly without preparation." },
      { "title": "Group Discussions", "desc": "Participate in lively debates and roundtable discussions on popular topics." },
      { "title": "Idioms & Slang", "desc": "Master the informal expressions and vocabulary native speakers actually use." },
      { "title": "Accent & Pronunciation", "desc": "Refine your intonation and understand various global English accents." }
    ],
    "ctaLabel": "Ready to speak?",
    "ctaTitle": "Free Consultation",
    "ctaButton": "Contact Us",
    "features": [
      { "title": "Live Speaking Practice", "desc": "Interactive sessions focusing 80% on student speaking time. Overcome the fear of making mistakes in a supportive environment." },
      { "title": "Podcast & Film Analysis", "desc": "Learn conversational context by analyzing popular media, improving both listening comprehension and conversational responses." },
      { "title": "CEFR Aligned Progress", "desc": "Structured progression from CEFR B1 (Intermediate) up to C2 (Mastery), ensuring your fluency constantly evolves." }
    ],
    "faqItems": [
      { "q": "Is this program suitable for beginners?", "a": "This program is recommended for participants who already have a basic understanding of English (minimum A2/B1 level) and want to focus on speaking fluency." },
      { "q": "How many students are in a Conversation class?", "a": "To maximize speaking time for each participant, classes are limited to a maximum of 6-8 people." },
      { "q": "Is grammar taught too?", "a": "Grammar is taught contextually through direct feedback while practicing speaking, rather than through written theory." },
      { "q": "How do I know my current speaking level?", "a": "We will conduct a short speaking assessment at the beginning to place you in the most appropriate class." }
    ]
  },
  "esp": {
    "levelLabel": "ENGLISH FOR SPECIFIC PURPOSES (ESP)",
    "heroTitle": "English Tailored for Your Industry",
    "heroSubtitle": "Accelerate your career with industry-specific English. Whether you are in IT, Medical, Legal, or Hospitality, master the exact vocabulary you need.",
    "heroCtaEnroll": "Enroll Now",
    "detailTitle": "Industry-Focused Language Mastery",
    "detailDesc": "General English is often not enough in professional specialized fields. Our ESP program provides targeted language training based on your specific occupational needs and jargon.",
    "detailImageCaption": "Career Booster",
    "detailImageSub": "Specialized Vocabulary",
    "advantages": [
      { "title": "Industry Jargon", "desc": "Learn the exact terminologies and phrasing used by professionals in your specific field." },
      { "title": "Case Studies", "desc": "Analyze real-world scenarios, documents, and reports relevant to your profession." },
      { "title": "Role-Play Scenarios", "desc": "Simulate workplace situations like patient consultations, client meetings, or technical support." },
      { "title": "Professional Standards", "desc": "Communicate with international clients and colleagues adhering to global professional standards." }
    ],
    "ctaLabel": "Boost your career?",
    "ctaTitle": "Free Consultation",
    "ctaButton": "Contact Us",
    "features": [
      { "title": "Customized Curriculum", "desc": "Materials are carefully selected and tailored to your specific industry, whether it is Aviation, Engineering, Medicine, or Hospitality." },
      { "title": "Professional Documentation", "desc": "Learn to write precise and accurate reports, emails, and technical documentation required in your line of work." },
      { "title": "Career Advancement", "desc": "Equip yourself with the linguistic competence to seek promotions or international opportunities in your specialized field." }
    ],
    "faqItems": [
      { "q": "What industries are available?", "a": "We cater to various fields including IT, Medical, Legal, Hospitality, Aviation, and Engineering. You can consult for other specific needs." },
      { "q": "Is this a private or group class?", "a": "We offer private classes as well as in-house training for companies (small groups from the same industry)." },
      { "q": "How long is the ESP program?", "a": "The duration is highly flexible depending on your goals and the complexity of the material, typically ranging from 3 to 6 months." },
      { "q": "Who are the instructors?", "a": "The instructors are professional English teachers with understanding or background in the relevant industry." }
    ]
  },
  "professional-business": {
    "levelLabel": "PROFESSIONAL BUSINESS",
    "heroTitle": "Executive English & Corporate Communication",
    "heroSubtitle": "Communicate with authority. Master business negotiations, leadership phrasing, and executive presentations for the global corporate stage.",
    "heroCtaEnroll": "Enroll Now",
    "detailTitle": "Strategic Business Communication",
    "detailDesc": "Designed for corporate leaders and professionals. This program goes beyond basic business English, focusing on diplomacy, strategic negotiations, and executive boardroom presence.",
    "detailImageCaption": "Executive Level",
    "detailImageSub": "Leadership & Diplomacy",
    "advantages": [
      { "title": "Business Negotiations", "desc": "Master the language of persuasion, compromise, and commercial diplomacy." },
      { "title": "Leadership Phrasing", "desc": "Learn how to direct teams, resolve conflicts, and deliver feedback effectively." },
      { "title": "Executive Pitching", "desc": "Deliver compelling presentations and pitches to investors or global stakeholders." },
      { "title": "Cross-Cultural Comm", "desc": "Navigate international business etiquette and cultural nuances with ease." }
    ],
    "ctaLabel": "Improve business performance?",
    "ctaTitle": "Free Consultation",
    "ctaButton": "Contact Us",
    "features": [
      { "title": "Boardroom Simulations", "desc": "Practice high-stakes meetings, crisis management, and strategic planning sessions in a simulated corporate environment." },
      { "title": "Executive Summaries", "desc": "Enhance your ability to write concise, impactful executive summaries, proposals, and official corporate correspondence." },
      { "title": "C-Level Proficiency", "desc": "Reach CEFR C1/C2 levels of proficiency, ensuring your language skills match your professional expertise and ambition." }
    ],
    "faqItems": [
      { "q": "Is this program suitable for fresh graduates?", "a": "This program is more aimed at mid-level professionals to executives who already have work experience and want to elevate their business communication level." },
      { "q": "Is it available for corporate training?", "a": "Absolutely. We provide B2B Corporate Training packages tailored to your company's strategic goals." },
      { "q": "How does the material differ from ESP?", "a": "ESP focuses on technical vocabulary for a specific industry (e.g., medical/IT), while Professional Business focuses on managerial communication, negotiation, and cross-industry leadership skills." },
      { "q": "Is the schedule flexible?", "a": "Yes, we understand the busy lives of professionals, so schedules can be adjusted to your availability." }
    ]
  }
};

// ID text
idData.program_detail = {
  "sd": {
    "levelLabel": "PROGRAM ANAK (SD)",
    "heroTitle": "Program Bahasa Inggris untuk Anak",
    "heroSubtitle": "Pembelajaran yang menyenangkan dan interaktif untuk generasi penerus. Bergabunglah dengan kelas seru kami di mana setiap pelajaran adalah petualangan.",
    "heroCtaEnroll": "Daftar Sekarang",
    "detailTitle": "Belajar Terasa Seperti Bermain",
    "detailDesc": "Kami percaya anak-anak belajar paling baik ketika mereka bersenang-senang. Kurikulum kami memadukan cerita menarik, permainan interaktif, dan panduan bermain untuk menjadikan penguasaan bahasa Inggris sebagai perjalanan yang menyenangkan, bukan sekadar tugas.",
    "detailImageCaption": "Belajar itu Menyenangkan",
    "detailImageSub": "Metode Interaktif & Ceria",
    "advantages": [
      { "title": "Belajar Berbasis Bermain", "desc": "Permainan interaktif yang mengajarkan tanpa terasa seperti pelajaran." },
      { "title": "Bercerita & Bernyanyi", "desc": "Petualangan tak terlupakan dan lagu yang mudah diingat untuk penguasaan bahasa secara alami." },
      { "title": "Guru yang Ramah", "desc": "Pembimbing yang sabar dan selalu mendukung setiap kemajuan kecil." },
      { "title": "Bintang Kemajuan", "desc": "Sistem penghargaan yang memotivasi dan membangun kepercayaan diri." }
    ],
    "ctaLabel": "Siap untuk memulai?",
    "ctaTitle": "Daftar Konsultasi Gratis",
    "ctaButton": "Hubungi Kami",
    "features": [
      { "title": "Kelas Online Interaktif", "desc": "Sesi menyenangkan bersama teman dan guru. Ukuran kelas kecil kami memastikan setiap anak mendapatkan perhatian yang mereka butuhkan untuk berani berbicara." },
      { "title": "Aktivitas Belajar Seru", "desc": "Kuis, permainan, dan petualangan cerita. Belajar kosakata dan tata bahasa terjadi secara alami saat menyelesaikan misi yang menyenangkan." },
      { "title": "Dukungan yang Ceria", "desc": "Guru yang ramah akan membantu di setiap langkah. Kami berfokus pada membangun kepercayaan diri sejalan dengan kemampuan bahasa." }
    ],
    "faqItems": [
      { "q": "Bagaimana cara mendaftarkan anak saya?", "a": "Pendaftaran dapat dilakukan langsung melalui tombol 'Daftar Sekarang' di website kami atau dengan mengunjungi cabang terdekat untuk konsultasi gratis." },
      { "q": "Apa metode pengajaran yang digunakan?", "a": "Kami menggunakan metode 'Interactive Narrative' di mana anak-anak belajar melalui cerita yang melibatkan karakter Folks dalam lingkungan dua arah yang aktif." },
      { "q": "Apakah ada tes penempatan sebelum masuk?", "a": "Ya, kami menyediakan sesi trial dan asesmen singkat yang menyenangkan untuk memastikan anak berada di kelas yang sesuai dengan kemampuan mereka." },
      { "q": "Berapa jumlah maksimal siswa dalam satu kelas?", "a": "Demi menjaga kualitas interaksi, setiap kelas dibatasi maksimal 8–10 siswa saja." }
    ]
  },
  "smp": {
    "levelLabel": "SEKOLAH MENENGAH (SMP)",
    "heroTitle": "Bahasa Inggris Akademik untuk Siswa SMP",
    "heroSubtitle": "Jembatani kesenjangan menuju keunggulan akademik. Kuasai komunikasi, tata bahasa, dan berpikir kritis dengan program komprehensif yang dirancang khusus untuk siswa SMP.",
    "heroCtaEnroll": "Daftar Sekarang",
    "detailTitle": "Bahasa Inggris Akademik Interaktif",
    "detailDesc": "Metodologi kami menggeser fokus dari literasi dasar ke pemahaman dan ekspresi lanjutan, membekali siswa SMP dengan keterampilan bahasa yang dibutuhkan untuk sukses di sekolah.",
    "detailImageCaption": "Belajar yang Seru",
    "detailImageSub": "Metodologi & Imersif",
    "advantages": [
      { "title": "Komunikasi Lisan", "desc": "Kembangkan kemampuan berbicara lancar dan mendengarkan aktif yang penting untuk diskusi akademik." },
      { "title": "Penguasaan Grammar", "desc": "Perkuat pemahaman struktur melalui aplikasi praktis alih-alih hanya menghafal rumus." },
      { "title": "Berpikir Kritis", "desc": "Menganalisis teks dan merumuskan argumen beralasan, persiapan menuju jenjang SMA." },
      { "title": "Hasil Terukur", "desc": "Penilaian rutin dan pelacakan kemajuan untuk memastikan pertumbuhan akademik yang konsisten." }
    ],
    "ctaLabel": "Siap untuk memulai?",
    "ctaTitle": "Daftar Konsultasi Gratis",
    "ctaButton": "Hubungi Kami",
    "features": [
      { "title": "Kelas Online Live", "desc": "Bergabung dengan sesi video langsung yang dinamis di mana siswa berkolaborasi aktif. Terlibat dalam diskusi grup, debat, dan breakout room yang mirip dengan energi di kelas fisik." },
      { "title": "Aktivitas Interaktif", "desc": "Belajar tidak berhenti pada ceramah. Kerjakan kuis digital, permainan kolaboratif, dan latihan interaktif yang dirancang khusus untuk menjaga fokus dan motivasi remaja." },
      { "title": "Kemajuan & Feedback", "desc": "Tetap di jalur yang benar dengan dasbor digital yang memonitor performa. Dapatkan bimbingan langsung dari guru berpengalaman untuk menargetkan area yang perlu diperbaiki." }
    ],
    "faqItems": [
      { "q": "Bagaimana cara mendaftarkan anak saya?", "a": "Pendaftaran dapat dilakukan langsung melalui tombol 'Daftar Sekarang' di website kami atau dengan mengunjungi cabang terdekat untuk konsultasi gratis." },
      { "q": "Apa metode pengajaran yang digunakan?", "a": "Kami menggunakan metode 'Interactive Narrative' di mana anak-anak belajar melalui cerita yang melibatkan karakter Folks dalam lingkungan dua arah yang aktif." },
      { "q": "Apakah ada tes penempatan sebelum masuk?", "a": "Ya, kami menyediakan sesi trial dan asesmen singkat yang menyenangkan untuk memastikan anak berada di kelas yang sesuai dengan kemampuan mereka." },
      { "q": "Berapa jumlah maksimal siswa dalam satu kelas?", "a": "Demi menjaga kualitas interaksi, setiap kelas dibatasi maksimal 8–10 siswa saja." }
    ]
  },
  "sma": {
    "levelLabel": "SEKOLAH MENENGAH ATAS (SMA)",
    "heroTitle": "Bahasa Inggris Lanjutan untuk Siswa SMA",
    "heroSubtitle": "Persiapan menuju universitas, ujian internasional, dan peluang global. Program bahasa Inggris lanjutan kami membangun keahlian agar Anda lebih menonjol.",
    "heroCtaEnroll": "Daftar Sekarang",
    "detailTitle": "Bahasa Inggris Persiapan Kuliah",
    "detailDesc": "Program SMA kami berfokus pada penulisan akademik lanjutan, analisis kritis, dan keterampilan presentasi — semua yang dibutuhkan untuk unggul di ujian nasional, beasiswa, dan kancah internasional.",
    "detailImageCaption": "Fokus pada Masa Depan",
    "detailImageSub": "Siap Akademik & Karier",
    "advantages": [
      { "title": "Penulisan Akademik", "desc": "Kuasai struktur esai, tulisan argumentatif, dan teknik makalah penelitian untuk masuk universitas." },
      { "title": "Public Speaking", "desc": "Bangun kepercayaan diri untuk mempresentasikan ide dengan jelas, dari kelas hingga lomba debat." },
      { "title": "Kesiapan Global", "desc": "Persiapan IELTS, TOEFL, dan beasiswa internasional dengan modul persiapan ujian yang terarah." },
      { "title": "Analisis Kritis", "desc": "Kembangkan pemikiran tingkat tinggi untuk mengevaluasi, mensintesis, dan mengartikulasikan ide kompleks." }
    ],
    "ctaLabel": "Siap meraih sukses?",
    "ctaTitle": "Daftar Konsultasi Gratis",
    "ctaButton": "Hubungi Kami",
    "features": [
      { "title": "Kelas Online Intensif", "desc": "Sesi live yang intensif dan fokus pada diskusi, debat, serta pemecahan masalah. Skenario akademik nyata mempersiapkan Anda untuk tingkat universitas." },
      { "title": "Persiapan Ujian", "desc": "Modul terstruktur untuk IELTS, TOEFL, dan SNBT. Berlatih di bawah kondisi ujian dengan simulasi waktu dan feedback detail dari ahlinya." },
      { "title": "Pelacakan Prestasi", "desc": "Laporan kemajuan terperinci setiap bulan, rencana studi personal, dan sesi pembinaan 1-on-1 untuk memastikan Anda mencapai target skor." }
    ],
    "faqItems": [
      { "q": "Bagaimana cara pendaftarannya?", "a": "Pendaftaran dapat dilakukan langsung melalui website kami atau dengan menghubungi admin untuk konsultasi program." },
      { "q": "Metode apa yang digunakan untuk persiapan ujian?", "a": "Kami menggabungkan strategi bedah soal, simulasi intensif, dan evaluasi mendalam agar siswa terbiasa dengan format IELTS/TOEFL." },
      { "q": "Apakah ada garansi skor?", "a": "Meski tidak ada jaminan absolut, metode intensif kami telah terbukti membantu lebih dari 90% siswa mencapai atau melampaui target skor mereka." },
      { "q": "Berapa lama durasi program untuk SMA?", "a": "Program tersedia dalam pilihan reguler (6 bulan) dan intensif (3 bulan), tergantung target yang ingin dicapai." }
    ]
  },
  "conversation": {
    "levelLabel": "CONVERSATION",
    "heroTitle": "Kuasai Percakapan Bahasa Inggris dengan Percaya Diri",
    "heroSubtitle": "Bicara secara alami, lancar, dan percaya diri di segala situasi. Dari obrolan santai hingga diskusi filosofis mendalam, ungkapkan diri Anda tanpa ragu.",
    "heroCtaEnroll": "Daftar Sekarang",
    "detailTitle": "Lancar, Dinamis & Ekspresif",
    "detailDesc": "Program Conversation kami berfokus pada kemampuan berbicara praktis, idiom, dan nuansa budaya. Anda akan terlibat dalam bercerita, debat, dan bermain peran yang mencerminkan interaksi di dunia nyata.",
    "detailImageCaption": "Berani Bicara",
    "detailImageSub": "Sesi Dialog Interaktif",
    "advantages": [
      { "title": "Berbicara Spontan", "desc": "Belajar berpikir cepat dan menyampaikan pikiran dengan jelas tanpa persiapan teks." },
      { "title": "Diskusi Grup", "desc": "Berpartisipasi dalam debat aktif dan diskusi meja bundar tentang topik-topik populer." },
      { "title": "Idiom & Bahasa Gaul", "desc": "Kuasai ungkapan informal dan kosakata yang benar-benar digunakan oleh penutur asli." },
      { "title": "Aksen & Pengucapan", "desc": "Perbaiki intonasi dan pahami berbagai aksen bahasa Inggris dari seluruh dunia." }
    ],
    "ctaLabel": "Siap untuk berbicara?",
    "ctaTitle": "Daftar Konsultasi Gratis",
    "ctaButton": "Hubungi Kami",
    "features": [
      { "title": "Praktik Bicara Langsung", "desc": "Sesi interaktif di mana 80% waktunya digunakan siswa untuk berbicara. Atasi rasa takut berbuat salah di lingkungan yang mendukung." },
      { "title": "Analisis Podcast & Film", "desc": "Pelajari konteks percakapan dengan menganalisis media populer, meningkatkan pemahaman mendengar dan respons obrolan." },
      { "title": "Standar CEFR", "desc": "Perkembangan terstruktur dari CEFR B1 (Menengah) hingga C2 (Mahir), memastikan kelancaran Anda terus berkembang." }
    ],
    "faqItems": [
      { "q": "Apakah program ini cocok untuk pemula?", "a": "Program ini direkomendasikan untuk peserta yang sudah memiliki dasar bahasa Inggris (minimal level A2/B1) dan ingin fokus pada kelancaran berbicara." },
      { "q": "Berapa banyak siswa dalam kelas Conversation?", "a": "Untuk memaksimalkan waktu bicara setiap peserta, kelas dibatasi maksimal 6-8 orang." },
      { "q": "Apakah diajarkan grammar juga?", "a": "Grammar diajarkan secara kontekstual melalui koreksi langsung (feedback) saat berlatih berbicara, bukan melalui teori tertulis." },
      { "q": "Bagaimana saya tahu level speaking saya saat ini?", "a": "Kami akan melakukan speaking assessment singkat di awal untuk menempatkan Anda di kelas yang paling sesuai." }
    ]
  },
  "esp": {
    "levelLabel": "BAHASA INGGRIS UNTUK TUJUAN KHUSUS (ESP)",
    "heroTitle": "Bahasa Inggris Khusus Industri Anda",
    "heroSubtitle": "Akselerasi karier Anda dengan bahasa Inggris spesifik industri. Baik di bidang IT, Medis, Hukum, atau Perhotelan, kuasai kosakata yang tepat yang Anda butuhkan.",
    "heroCtaEnroll": "Daftar Sekarang",
    "detailTitle": "Penguasaan Bahasa Fokus Industri",
    "detailDesc": "Bahasa Inggris umum seringkali tidak cukup di bidang profesional spesifik. Program ESP kami memberikan pelatihan bahasa yang ditargetkan berdasarkan kebutuhan pekerjaan dan istilah teknis Anda.",
    "detailImageCaption": "Pendorong Karier",
    "detailImageSub": "Kosakata Spesialisasi",
    "advantages": [
      { "title": "Istilah Teknis (Jargon)", "desc": "Pelajari terminologi dan frasa persis yang digunakan oleh profesional di bidang spesifik Anda." },
      { "title": "Studi Kasus", "desc": "Analisis skenario dunia nyata, dokumen, dan laporan yang relevan dengan profesi Anda." },
      { "title": "Skenario Role-Play", "desc": "Simulasikan situasi di tempat kerja seperti konsultasi pasien, rapat klien, atau dukungan teknis." },
      { "title": "Standar Profesional", "desc": "Berkomunikasi dengan klien dan kolega internasional mengikuti standar profesional global." }
    ],
    "ctaLabel": "Tingkatkan karir Anda?",
    "ctaTitle": "Daftar Konsultasi Gratis",
    "ctaButton": "Hubungi Kami",
    "features": [
      { "title": "Kurikulum yang Disesuaikan", "desc": "Materi dipilih secara hati-hati dan disesuaikan dengan industri spesifik Anda, entah itu Penerbangan, Teknik, Kedokteran, atau Perhotelan." },
      { "title": "Dokumentasi Profesional", "desc": "Belajar menulis laporan yang presisi, email, dan dokumentasi teknis yang diperlukan di lini pekerjaan Anda." },
      { "title": "Kemajuan Karier", "desc": "Bekali diri dengan kompetensi linguistik untuk mencari promosi atau peluang internasional di bidang keahlian Anda." }
    ],
    "faqItems": [
      { "q": "Bidang industri apa saja yang tersedia?", "a": "Kami melayani berbagai bidang termasuk IT, Medis, Hukum, Perhotelan, Penerbangan, dan Teknik. Anda bisa berkonsultasi untuk kebutuhan spesifik lainnya." },
      { "q": "Apakah ini kelas privat atau grup?", "a": "Tersedia pilihan kelas privat maupun in-house training untuk perusahaan (grup kecil dengan industri yang sama)." },
      { "q": "Berapa lama durasi program ESP?", "a": "Durasi sangat fleksibel tergantung target dan kompleksitas materi, umumnya berkisar antara 3 hingga 6 bulan." },
      { "q": "Siapa pengajarnya?", "a": "Pengajar adalah instruktur bahasa Inggris profesional yang memiliki pemahaman atau latar belakang di industri terkait." }
    ]
  },
  "professional-business": {
    "levelLabel": "BISNIS PROFESIONAL",
    "heroTitle": "Bahasa Inggris Eksekutif & Komunikasi Korporat",
    "heroSubtitle": "Berkomunikasi dengan wibawa. Kuasai negosiasi bisnis, ungkapan kepemimpinan, dan presentasi eksekutif untuk panggung korporat global.",
    "heroCtaEnroll": "Daftar Sekarang",
    "detailTitle": "Komunikasi Bisnis Strategis",
    "detailDesc": "Dirancang untuk pemimpin dan profesional korporat. Program ini melampaui bahasa Inggris bisnis dasar, berfokus pada diplomasi, negosiasi strategis, dan kehadiran eksekutif di ruang rapat.",
    "detailImageCaption": "Level Eksekutif",
    "detailImageSub": "Kepemimpinan & Diplomasi",
    "advantages": [
      { "title": "Negosiasi Bisnis", "desc": "Kuasai bahasa persuasif, kompromi, dan diplomasi komersial." },
      { "title": "Ungkapan Kepemimpinan", "desc": "Pelajari cara memimpin tim, menyelesaikan konflik, dan memberikan umpan balik secara efektif." },
      { "title": "Presentasi Eksekutif", "desc": "Sampaikan presentasi dan pitching yang meyakinkan kepada investor atau pemangku kepentingan global." },
      { "title": "Komunikasi Lintas Budaya", "desc": "Menavigasi etika bisnis internasional dan nuansa budaya dengan mudah." }
    ],
    "ctaLabel": "Tingkatkan performa bisnis?",
    "ctaTitle": "Daftar Konsultasi Gratis",
    "ctaButton": "Hubungi Kami",
    "features": [
      { "title": "Simulasi Ruang Rapat", "desc": "Berlatih rapat penting, manajemen krisis, dan sesi perencanaan strategis di lingkungan korporat simulasi." },
      { "title": "Ringkasan Eksekutif", "desc": "Tingkatkan kemampuan menulis ringkasan eksekutif, proposal, dan korespondensi resmi perusahaan dengan singkat dan padat." },
      { "title": "Kemahiran C-Level", "desc": "Capai tingkat kemahiran CEFR C1/C2, memastikan keterampilan bahasa Anda setara dengan keahlian profesional dan ambisi Anda." }
    ],
    "faqItems": [
      { "q": "Apakah program ini cocok untuk fresh graduate?", "a": "Program ini lebih ditujukan bagi profesional madya hingga eksekutif yang sudah memiliki pengalaman kerja dan ingin meningkatkan level komunikasi bisnis mereka." },
      { "q": "Apakah bisa untuk training perusahaan (Corporate Training)?", "a": "Sangat bisa. Kami menyediakan paket B2B Corporate Training yang disesuaikan dengan tujuan strategis perusahaan Anda." },
      { "q": "Materi apa yang membedakan dengan ESP?", "a": "ESP fokus pada kosa kata teknis suatu industri (misal: medis/IT), sedangkan Professional Business fokus pada skill komunikasi manajerial, negosiasi, dan kepemimpinan lintas industri." },
      { "q": "Apakah jadwalnya fleksibel?", "a": "Ya, kami memahami kesibukan profesional, sehingga jadwal dapat disesuaikan dengan ketersediaan Anda." }
    ]
  }
};

fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(idJsonPath, JSON.stringify(idData, null, 2), 'utf8');
console.log('JSON locales updated successfully!');
