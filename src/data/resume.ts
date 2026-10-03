/**
 * Single source of truth for every word on the site.
 *
 * Provenance rule:
 *  - `source: 'resume'`  → taken from the resume PDF.
 *  - `source: 'github'`  → taken from the public repositories linked in the resume
 *                          (github.com/VATSALLODAYA27) and not on the resume itself.
 * Nothing here is invented. If a fact is not in one of those two places, it is not here.
 */

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const site = {
  name: 'Vatsal Hitesh Lodaya',
  firstLine: 'Vatsal Hitesh',
  lastLine: 'Lodaya',
  role: 'Computer Engineer',
  headline: 'B.Tech Computer Engineer working across the MERN stack, data analytics and generative AI.',
  intro:
    'Detail-oriented, with a strong foundation in programming, software development and data structures. I build web applications and management systems with the MERN stack, and I keep growing in data science and analytics through hands-on projects.',
  email: 'vatsallodaya04@gmail.com',
  phone: '+91 91674 10901',
  phoneHref: 'tel:+919167410901',
  location: 'Mulund, Mumbai',
  github: 'https://github.com/VATSALLODAYA27',
  githubHandle: 'VATSALLODAYA27',
  linkedin: 'https://www.linkedin.com/in/vatsal-hitesh-lodaya-426529257',
  resumeFile: 'Vatsal_Lodaya_Resume.pdf',
} as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

/* ------------------------------------------------------------------ About */

export const aboutCards = {
  background: {
    title: 'Background',
    heading: 'Computer Engineering with Honours in Data Science',
    body: 'Shah & Anchor Kutchhi Engineering College, 2022 to 2026, with a CGPA of 8.',
  },
  focus: {
    title: 'Professional focus',
    body: 'Web applications and management systems built with the MERN stack: MongoDB, Express, React and Node.js.',
  },
  interests: {
    title: 'Interests',
    items: ['Data science and analytics', 'Generative AI and LLM models', 'Efficient digital solutions'],
  },
  direction: {
    title: 'Career direction',
    body: 'Combining full-stack development with data-driven insight, and expanding technical knowledge through hands-on projects.',
  },
  strengths: {
    title: 'Key strengths',
    items: ['Rapid learning', 'Public speaking', 'Leadership under pressure'],
  },
}

/* ------------------------------------------------------------- Experience */

export const experience = [
  {
    company: 'Nimap Infotech LLP',
    role: 'Associate Software Developer Intern',
    period: 'June 2024 to July 2024',
    points: [
      'Assisted in web application development and debugging.',
      'Collaborated with the development team on various software projects.',
      'Gained practical experience across the software and web development lifecycle.',
    ],
  },
] as const

export const experienceNote =
  'Also completed a paid internship and training program in web development at Acmegrade (listed under Certifications).'

/* --------------------------------------------------------------- Projects */

export type MotifKind = 'fish' | 'companio' | 'gym' | 'loan' | 'parser' | 'edith' | 'rag' | 'trade'

export type Project = {
  id: string
  name: string
  kind: string
  summary: string
  contribution?: string
  highlights: string[]
  tech: string[]
  links: { label: string; href: string }[]
  source: 'resume' | 'github'
  wide?: boolean
  preview: { type: 'image'; src: string; alt: string } | { type: 'motif'; motif: MotifKind }
  extra?: { title: string; items: string[]; note?: string }
  badge?: string
}

export const projects: Project[] = [
  {
    id: 'fish-detection',
    name: 'AI-Based Fish Detection System',
    kind: 'Computer vision and web app',
    summary:
      'An AI-powered system that uses YOLO-based object detection to identify and classify fish species from underwater images and live video streams.',
    contribution:
      'Developed the detection system and implemented the web application around it: user authentication, image upload and real-time detection for efficient marine data analysis.',
    highlights: [
      'Detects and classifies fish species in still images and live video.',
      'Web app with sign-in, image upload and real-time detection.',
      'Public repository includes the trained model, database schema and the full project report.',
    ],
    tech: ['Python', 'Flask', 'YOLOv11', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    links: [
      { label: 'Live demo', href: 'https://fish-detection-9lb2.onrender.com/' },
      { label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/Fish-Detection' },
    ],
    source: 'resume',
    wide: true,
    preview: { type: 'motif', motif: 'fish' },
  },
  {
    id: 'companio',
    name: 'Companio',
    kind: 'Full-stack prototype',
    summary:
      'Helps you find a verified person nearby who wants to do the same activity as you. Scoped deliberately as a prototype: no payments, business accounts or recommendations.',
    contribution: 'Author of the public repository, built and documented in 11 phases.',
    highlights: [
      'Google OAuth and email/password sign-in with sessions, CSRF protection and rate limiting.',
      'Nearby discovery through a single indexed PostGIS query, with distance shown only as a range.',
      'Map pins are randomized within about 150 m so a real location is never exposed.',
      'Connection requests, live chat over Socket.IO, and block and report flows.',
      '166 unit tests and 88 end-to-end tests, k6 load tests against a 5,000-user seeded dataset, and multi-stage Docker deployment.',
    ],
    tech: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'PostGIS', 'Prisma', 'Redis', 'Socket.IO', 'Docker'],
    links: [
      { label: 'Live demo', href: 'https://companio-web-hns4.onrender.com' },
      { label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/companio' },
    ],
    source: 'github',
    wide: true,
    badge: 'From GitHub',
    preview: { type: 'motif', motif: 'companio' },
  },
  {
    id: 'gym-management',
    name: 'Gym Management System',
    kind: 'MERN web application',
    summary:
      'A digital platform that manages memberships, tracks training schedules, guides workouts and handles equipment purchases, bringing all gym operations into one system.',
    highlights: [
      'Memberships and training schedules in one place.',
      'Workout guidance and equipment purchases.',
    ],
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    links: [{ label: 'Live demo', href: 'https://gym27.vercel.app' }],
    source: 'resume',
    preview: { type: 'motif', motif: 'gym' },
  },
  {
    id: 'churn-dashboard',
    name: 'Customer Churn Analysis Dashboard',
    kind: 'Data analytics',
    summary:
      'Analyzed 10,000+ customer records with SQL and Python to find the key drivers of churn, then built an interactive Power BI dashboard that cut manual reporting time by about 40%.',
    contribution: 'Ran the SQL and Python analysis and built the interactive dashboard.',
    highlights: [
      'Ten business questions answered in SQL, plus EDA and a driver ranking in Python.',
      'Interactive dashboard in Power BI, with a browser-based equivalent in the repository.',
    ],
    tech: ['SQL', 'Python', 'Pandas', 'Power BI', 'scikit-learn', 'Chart.js'],
    links: [
      { label: 'Live demo', href: 'https://custchurn.vercel.app' },
      { label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/customer-churn-analysis-dashboard' },
    ],
    source: 'resume',
    preview: {
      type: 'image',
      src: 'images/churn-by-contract.webp',
      alt: 'Bar chart from the project showing churn rate by contract type: month-to-month 41.6%, one year 16.1%, two year 6.7%.',
    },
    extra: {
      title: 'Findings in the repository',
      items: [
        'Overall churn rate of 28.2%.',
        'Month-to-month contracts churn at 41.6%, against 16.1% for one-year contracts.',
        'Highest-risk segment (month-to-month, fiber optic, electronic check) churns at 67.0%.',
      ],
      note: 'These figures come from a synthetic, reproducible dataset that follows the IBM Telco Customer Churn schema, as the repository README states.',
    },
  },
  {
    id: 'loan-default',
    name: 'Loan Default Prediction Model',
    kind: 'Machine learning',
    summary:
      'Built and compared machine learning models, Logistic Regression and Random Forest, reaching 87% accuracy, and deployed the model as a Streamlit app for real-time predictions.',
    contribution: 'Built and compared the models, then deployed the result as an app.',
    highlights: ['Two models compared head to head.', 'Deployed for real-time predictions through Streamlit.'],
    tech: ['Python', 'Scikit-learn', 'Streamlit'],
    links: [],
    source: 'resume',
    preview: { type: 'motif', motif: 'loan' },
  },
  {
    id: 'statement-parser',
    name: 'Credit Card Statement Parser',
    kind: 'Python utility',
    summary:
      'A Streamlit app that reads credit card statement PDFs and pulls out the bank, card holder, last four digits, billing period, payment due date and total due.',
    contribution: 'Author of the public repository.',
    highlights: [
      'Detects the bank, then applies per-bank regular expressions.',
      'Fields that cannot be matched are reported as "Not Found" instead of guessed.',
      'Includes sample statements that use fictitious names and amounts.',
    ],
    tech: ['Python', 'Streamlit', 'pdfplumber', 'Regex'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/sure_fintech_assignment' }],
    source: 'github',
    badge: 'From GitHub',
    preview: { type: 'motif', motif: 'parser' },
  },
  {
    id: 'edith',
    name: 'EDITH',
    kind: 'Multi-agent AI orchestrator',
    summary:
      'A multi-agent task orchestrator: one request, such as turning a PDF into slides, is planned by an orchestrator and handed to specialist agents for RAG, documents, Excel, PowerPoint, browsing, research, email and calendar.',
    contribution: 'Author of the public repository, built in phases with notes on each design choice.',
    highlights: [
      'Supervisor pattern in LangGraph: agents report back to the orchestrator, which runs independent steps in parallel.',
      'Risky actions pause the graph until a human approves or rejects them.',
      'Conversations are checkpointed, failing agents are isolated, and every run is traced.',
    ],
    tech: ['Python', 'LangGraph', 'LangChain', 'Groq', 'FastAPI', 'React', 'ChromaDB'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/EDITH' }],
    source: 'github',
    wide: true,
    badge: 'From GitHub',
    preview: { type: 'motif', motif: 'edith' },
  },
  {
    id: 'rag-assistant',
    name: 'RAG Assistant',
    kind: 'Retrieval-augmented generation',
    summary:
      'Upload PDFs and ask questions in a chat UI; answers are grounded in the document text with page-level citations. Ported from a Streamlit prototype to a FastAPI backend and a React frontend.',
    contribution: 'Author of the public repository.',
    highlights: [
      'Hybrid retrieval: embeddings plus BM25, fused by reciprocal rank fusion, then reranked by a cross-encoder.',
      'Background indexing with live progress, cancel and resume, and OCR for pages without a text layer.',
      'Gemini writes the answer, with a fallback model when it is rate-limited.',
    ],
    tech: ['React', 'Vite', 'FastAPI', 'Python', 'ChromaDB', 'Gemini', 'OpenRouter'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/Rag_model' }],
    source: 'github',
    badge: 'From GitHub',
    preview: { type: 'motif', motif: 'rag' },
  },
  {
    id: 'trade-advisor',
    name: 'Trade Advisor',
    kind: 'Market analysis tool',
    summary:
      'A verdict-only trading advisor for Indian markets that never places orders. Each section of a rules file becomes an agent that returns a verdict; an LLM only explains the verdicts and flags conflicts.',
    contribution: 'Author of the public repository.',
    highlights: [
      'Intraday, swing, long-term, options and hedge advisors run in parallel through LangGraph.',
      'Opportunity scanner, bar-by-bar backtester with no lookahead, and option strike picking by delta.',
      'Morning brief generated as a PDF, in a Streamlit trading-terminal UI.',
    ],
    tech: ['Python', 'LangGraph', 'Streamlit', 'yfinance', 'Pandas', 'Plotly'],
    links: [
      { label: 'Live demo', href: 'https://tradeadvisor.streamlit.app' },
      { label: 'View on GitHub', href: 'https://github.com/VATSALLODAYA27/TradeAdvisor' },
    ],
    source: 'github',
    badge: 'From GitHub',
    preview: { type: 'motif', motif: 'trade' },
  },
]

/* ----------------------------------------------------------------- Skills */

export type SkillGroup = { id: string; title: string; note?: string; items: string[]; tone: 'primary' | 'quiet' }

export const skillGroups: SkillGroup[] = [
  { id: 'technical', title: 'Technical skills', items: ['C/C++', 'Python', 'SQL', 'MERN Stack', 'Gen AI & LLM models'], tone: 'primary' },
  { id: 'software', title: 'Other software', items: ['Power BI', 'Tableau', 'MS Tools', 'n8n'], tone: 'primary' },
  {
    id: 'strengths',
    title: 'Strengths',
    items: ['Rapid learning', 'Public speaking', 'Leadership under pressure'],
    tone: 'quiet',
  },
  {
    id: 'soft',
    title: 'Soft skills',
    items: [
      'Communication',
      'Teamwork',
      'Problem solving',
      'Detail oriented',
      'Initiative',
      'Time management',
      'Adaptability',
      'Multi-tasking',
      'Creativity',
    ],
    tone: 'quiet',
  },
  {
    id: 'projects',
    title: 'Also used in my projects',
    note: 'Technologies from the project work above that are not on the resume skills list.',
    items: [
      'TypeScript',
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Socket.IO',
      'Docker',
      'Flask',
      'MySQL',
      'Pandas',
      'Scikit-learn',
      'Streamlit',
      'YOLO',
      'FastAPI',
      'LangGraph',
      'LangChain',
      'ChromaDB',
    ],
    tone: 'quiet',
  },
]

/* ------------------------------------------------- Education & credentials */

export const education = [
  {
    degree: 'Bachelor of Technology (B.Tech) in Computer Engineering, with Honours in Data Science',
    institution: 'Shah & Anchor Kutchhi Engineering College',
    period: '2022 to 2026',
    detail: 'CGPA: 8',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'K J Somaiya College of Science & Commerce',
    period: '2020 to 2022',
    detail: 'Score: 68%',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'I E S Secondary School',
    period: '2010 to 2020',
    detail: 'Score: 93%',
  },
]

export type Certification = { title: string; issuer: string; when?: string; icon: 'cloud' | 'code' | 'chart' }

export const certifications: Certification[] = [
  { title: 'AWS Cloud Practitioner Essentials', issuer: 'AWS Training and Certification', icon: 'cloud' },
  { title: 'Paid Internship and Training Program in Web Development', issuer: 'Acmegrade', icon: 'code' },
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte Australia, on Forage', when: 'July 2025', icon: 'chart' },
]

/* ---------------------------------------------------------------- Contact */

export const contactLinks = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
  { label: 'Phone', value: site.phone, href: site.phoneHref, external: false },
  { label: 'LinkedIn', value: 'vatsal-hitesh-lodaya', href: site.linkedin, external: true },
  { label: 'GitHub', value: site.githubHandle, href: site.github, external: true },
] as const
