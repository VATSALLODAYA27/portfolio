"""Build both resume PDFs from one data set: python resume/build.py"""
import subprocess
from pathlib import Path

HERE = Path(__file__).parent
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
GH = "https://github.com/VATSALLODAYA27"

# name, live url (None if not deployed), tech, full bullets, one-line bullet for the 1-page version
PROJECTS = [
    ("AI-Based Fish Detection System", "https://fish-detection-9lb2.onrender.com/",
     "Python, Flask, YOLOv11, HTML, CSS, JavaScript, MySQL",
     ["Developed an AI-powered system using YOLO-based object detection to identify and classify fish species from underwater images and live video streams with high accuracy.",
      "Implemented a web application with user authentication, image upload, and real-time detection features for efficient marine data analysis."],
     "YOLO-based detection and classification of fish species from underwater images and live video, in a web app with sign-in, image upload and real-time detection."),
    ("Companio", "https://companio-web-hns4.onrender.com",
     "Next.js, NestJS, TypeScript, PostgreSQL, PostGIS, Prisma, Redis, Socket.IO, Docker",
     ["Full-stack app to find a verified person nearby for the same activity: Google OAuth and email sign-in, nearby discovery through an indexed PostGIS query, with map pins randomized to protect real locations.",
      "Live chat over Socket.IO, connection requests, block and report flows; 166 unit and 88 end-to-end tests, k6 load tests on 5,000 seeded users, Docker deployment."],
     "Find a verified person nearby for the same activity: PostGIS nearby search with privacy-safe map pins, OAuth, live Socket.IO chat; 254 unit and E2E tests, Docker."),
    ("EDITH - Multi-Agent AI Orchestrator", None,
     "Python, LangGraph, LangChain, Groq, FastAPI, React, ChromaDB",
     ["Orchestrator plans a request (e.g. a PDF into slides) and hands steps to specialist agents for RAG, documents, Excel, PowerPoint, browsing, research, email and calendar, running independent steps in parallel.",
      "Human approval pauses the graph before risky actions; conversations are checkpointed, failing agents are isolated, and every run is traced."],
     "LangGraph supervisor that splits a request across specialist agents (RAG, docs, Excel, PPT, browser, email, calendar) in parallel, with human approval for risky actions."),
    ("RAG Assistant", None,
     "React, Vite, FastAPI, Python, ChromaDB, Gemini, OpenRouter",
     ["Upload PDFs and chat with them; answers are grounded in the document text with page-level citations.",
      "Hybrid retrieval (embeddings + BM25, reciprocal rank fusion, cross-encoder reranking), background indexing with resume/cancel, and OCR for scanned pages."],
     "Chat with uploaded PDFs, with page-level citations; hybrid embedding + BM25 retrieval, reranking, OCR and resumable background indexing."),
    ("Trade Advisor", "https://tradeadvisor.streamlit.app",
     "Python, LangGraph, Streamlit, yfinance, Pandas, Plotly",
     ["Verdict-only advisor for Indian markets: each rule section (intraday, swing, long-term, options, hedge) runs as a parallel LangGraph agent; an LLM only explains the verdicts.",
      "Opportunity scanner, bar-by-bar backtester with no lookahead, option strike picking by delta, and a daily PDF morning brief."],
     "Rule-based market advisor with parallel LangGraph agents, scanner, no-lookahead backtester, option strike picker and PDF morning brief."),
    ("Customer Churn Analysis Dashboard", "https://custchurn.vercel.app",
     "SQL, Python, Pandas, Power BI",
     ["Analyzed 10,000+ customer records using SQL and Python to identify key churn drivers and built an interactive Power BI dashboard, cutting manual reporting time by ~40%."],
     "Analyzed 10,000+ customer records with SQL and Python to find churn drivers; Power BI dashboard cut manual reporting time by ~40%."),
    ("GYM Management System", "https://gym27.vercel.app",
     "MERN Stack",
     ["Digital platform that manages memberships, tracks training schedules, guides workouts, and handles equipment purchases, streamlining all gym operations in one system."],
     "Manages memberships, training schedules, workout guidance and equipment purchases in one system."),
    ("Loan Default Prediction Model", None,
     "Python, Scikit-learn, Streamlit",
     ["Built and compared ML models (Logistic Regression, Random Forest) achieving 87% accuracy, and deployed the model as a Streamlit app for real-time predictions."],
     "Compared Logistic Regression and Random Forest (87% accuracy); deployed as a Streamlit app for real-time predictions."),
    ("Credit Card Statement Parser", None,
     "Python, Streamlit, pdfplumber, Regex",
     ["Streamlit app that reads credit card statement PDFs, detects the bank and extracts card holder, last four digits, billing period, due date and total due."],
     "Extracts bank, card holder, billing period, due date and total due from statement PDFs with per-bank regex."),
]

LINK_ICON = ('<svg viewBox="0 0 24 24" width="0.85em" height="0.85em" fill="none" stroke="currentColor" stroke-width="2.4" '
             'stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/>'
             '<path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>')

CSS = """
@page { size: A4; margin: %(margin)s; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Calibri, Carlito, sans-serif; font-size: %(size)s; line-height: 1.25; color: #000; }
a { color: #1155cc; }
h1 { text-align: center; font-size: 1.45em; }
.contact { text-align: center; }
h2 { font-size: 1.15em; border-bottom: 1px solid #000; margin-top: %(gap)s; margin-bottom: 3px; }
h3 { font-size: 1.05em; margin-top: %(pgap)s; break-after: avoid; }
h2 { break-after: avoid; }
ul { break-inside: avoid; }
h3 a { margin-left: 5px; text-decoration: none; }
.row { display: flex; justify-content: space-between; }
p, li { text-align: justify; }
ul { padding-left: 1.2em; }
.tech b { font-weight: bold; }
"""


def page(compact):
    contact = (f'vatsallodaya04@gmail.com | +91 91674 10901 | Mulund, Mumbai<br>'
               f'<a href="{GH}">github.com/VATSALLODAYA27</a> | '
               f'<a href="https://www.linkedin.com/in/vatsal-hitesh-lodaya-426529257">linkedin.com/in/vatsal-hitesh-lodaya</a> | '
               f'Portfolio: <a href="https://vatsal27.vercel.app">vatsal27.vercel.app</a>')
    profile = ("B.Tech Computer Engineer (Honours in Data Science) building full-stack web apps with the MERN stack and "
               "generative AI systems with LangGraph and RAG, with hands-on data analytics experience in SQL, Python and Power BI."
               if compact else
               "Motivated and detail-oriented B.Tech Computer Engineer with a strong foundation in programming, software development, "
               "and data structures. Experienced in building web applications and management systems using the MERN stack, and "
               "multi-agent and RAG systems with generative AI, with a growing interest in data science and analytics. Adept at "
               "problem-solving, team collaboration, and fast learning. Passionate about developing efficient digital solutions, "
               "analyzing data-driven insights, and continually expanding technical knowledge through hands-on projects.")

    projects = []
    for name, live, tech, full, short in PROJECTS:
        link = f' <a href="{live}" title="Live demo">{LINK_ICON}</a>' if live else ""
        if compact:
            projects.append(f'<h3>{name}{link}</h3><ul><li>{short} <i>({tech})</i></li></ul>')
        else:
            items = "".join(f"<li>{b}</li>" for b in full)
            projects.append(f'<h3>{name}{link}</h3><ul>{items}<li class="tech"><b>Technologies Used</b>: {tech}</li></ul>')

    soft = ("Communication, Teamwork, Problem Solving, Detail Oriented, Initiative, Time Management, Adaptability, "
            "Multi-Tasking, Creativity")
    sizes = dict(margin="0.45in 0.5in", size="10pt", gap="6px", pgap="3px") if compact else \
        dict(margin="0.55in 0.6in", size="11pt", gap="12px", pgap="7px")
    return f"""<!doctype html><html><head><meta charset="utf-8"><title>Vatsal Lodaya Resume</title>
<style>{CSS % sizes}</style></head><body>
<h1>Vatsal Hitesh Lodaya</h1>
<div class="contact">{contact}</div>
<h2>Profile</h2><p>{profile}</p>
<h2>Education</h2>
<div class="row"><b>Shah &amp; Anchor Kutchhi Engineering College</b><span>2022-2026</span></div>
<div class="row"><span>Bachelor of Technology (B.Tech) Computer Engineering &amp; Honours in Data Science</span><span>CGPA: 8</span></div>
<h2>Experience</h2>
<div class="row"><b>Associate Software Developer Intern | Nimap Infotech LLP</b><span>June 2024 - July 2024</span></div>
<p>Assisted in web application development and debugging while collaborating with the development team on various software
projects, gaining practical experience in the software and web development lifecycle.</p>
<h2>Projects</h2>
{"".join(projects)}
<h2>Skills</h2><ul>
<li><b>Technical Skills:</b> C/C++, Python, SQL, MERN Stack, TypeScript, Next.js, FastAPI, Flask, Gen AI &amp; LLMs, LangGraph, LangChain, RAG</li>
<li><b>Other Software:</b> Power BI, Tableau, MS Tools, n8n, Docker, PostgreSQL, MySQL, Redis</li>
{"" if compact else f"<li><b>Soft Skills:</b> {soft}</li>"}
<li><b>Strengths:</b> Rapid learning, public speaking, leadership under pressure</li></ul>
<h2>Certifications</h2><ul>
<li>AWS Cloud Practitioner Essentials, AWS Training and Certification</li>
<li>Paid Internship and Training Program in Web Development, Acmegrade</li>
<li>Deloitte Australia Data Analytics Job Simulation on Forage, July 2025</li></ul>
</body></html>"""


for compact, out in [(True, "Vatsal_Lodaya_Resume_1page"), (False, "Vatsal_Lodaya_Resume_detailed")]:
    html = HERE / f"{out}.html"
    html.write_text(page(compact), encoding="utf-8")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={HERE / (out + '.pdf')}", html.as_uri()], check=True, capture_output=True)
    print("wrote", out + ".pdf")
