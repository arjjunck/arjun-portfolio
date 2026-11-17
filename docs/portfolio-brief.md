# Portfolio Website Brief — Arjun Krishna Krishnakumar

A brief for updating arjjunck.vercel.app. Written for an agent editing the site.
Last updated: 16 November 2026.

---

## 1. The one-line goal

Get hired into a **permanent C# / .NET or backend role in Ireland within 6 months**, while
building credibility for a later move into computer vision and perception work.

The site must serve the first goal primarily. The second goal gets a quiet corner, not the
headline.

---

## 2. Who I am

- Mechanical engineer turned software engineer. 3+ years commercial experience.
- Built and supported clinical data systems deployed across **200+ hospital sites in India
  and the UAE** — regulated healthcare, validation, audit trails, data integrity.
- MSc Data Science and Analytics, **First Class Honours (73.77%)**, MTU Cork, Oct 2026.
- BTech Mechanical Engineering, APJ Abdul Kalam Technological University.
- Based in Cork, Ireland. Open to anywhere in Ireland.
- **Stamp 1G, eligible for Critical Skills Employment Permit.**

The unusual combination: production software + applied ML + mechanical/manufacturing
background. Most backend developers have none of the last two.

---

## 3. Target roles, in priority order

### Tier 1 — applying now (80% of effort). The site must be built for these.

| Role | Core ask |
| --- | --- |
| .NET / C# Developer | C#, ASP.NET Core, SQL Server or PostgreSQL, REST APIs |
| Full Stack Developer | C# or Node backend, Angular or React, SQL |
| Backend Engineer | REST API design, schema design, Docker, CI/CD |
| Software Engineer (general) | C# and/or Python |
| Python Backend Developer | FastAPI, PostgreSQL, Docker |
| Software Engineer in Test | Python, test automation, CI |
| Data Engineer | SQL, Python, pandas, pipelines |

Backstop lane (same tier, apply if the above is slow):

| Role | Core ask |
| --- | --- |
| MES Engineer | C#, SQL, GMP environment, batch records |
| CSV / Validation Engineer | Validation, IQ/OQ/PQ, GAMP 5, traceability |

### Tier 2 — 3 to 6 months away (20% of effort)

| Role | Core ask | My gap |
| --- | --- | --- |
| Machine Learning Engineer | Python, scikit-learn, deployment | MLOps tooling |
| AI / ML Engineer | Python, PyTorch, LLM and RAG | PyTorch |
| Computer Vision Engineer (junior) | OpenCV, image processing, CNNs | OpenCV, classical CV |
| Data Scientist (sensor/vision) | Statistics, time series, anomaly detection | none significant |

### Tier 3 — 12+ months, not a site priority

Robotics Software Engineer, Perception / ADAS Engineer, Embedded Vision Engineer.
Gated on C++ and ROS 2. Mention the direction, do not claim the skills.

---

## 4. What each audience is scanning for

**Irish .NET recruiters** (the main audience) want, within 6 seconds:
- C#, .NET, Angular, SQL — visible without scrolling
- Years of commercial experience
- Whether I need sponsorship (say it plainly, it saves them a call)
- Something real I have shipped

**Hiring managers** who read further want:
- Evidence I can take a feature from requirement to production
- Debugging and root-cause ability
- That I have worked in a real team, with code review and CI/CD

**ML / CV employers** (secondary) want:
- Python, PyTorch, OpenCV
- Measured results, not just "built a model"

---

## 5. Required site changes

### 5.1 Hero / headline

Must lead with backend and .NET, not with AI or robotics.

Suggested:
> **Arjun Krishna Krishnakumar**
> Software Engineer — C# / .NET · Angular · PostgreSQL · Python
> Cork, Ireland · Eligible for Critical Skills Employment Permit

Add a short sub-line:
> Three years building backend systems in regulated healthcare and logistics.
> MSc in Data Science. Currently open to roles in Ireland.

Primary CTA: **Download CV**. Secondary: **Email me**, **LinkedIn**, **GitHub**.

### 5.2 Availability banner

A small, persistent, non-intrusive line near the top:
> Open to permanent software roles in Ireland · Eligible for Critical Skills Employment Permit

This matters. Recruiters filter on visa status early, and ambiguity gets a CV skipped.

### 5.3 Projects — order and framing

Order is deliberate. Do not reorder by date.

**1. Medical Claims AI Platform** *(flagship — live, deployed, built alone)*
- Link to the live app. Make the link prominent and obviously clickable.
- Frame as a **full-stack engineering project first, AI second.**
- Stack: Python, FastAPI, React, TypeScript, PostgreSQL, Docker, GitHub Actions,
  Azure Container Apps, LLM APIs
- What it does: upload insurance policy documents, ask questions answered from the
  document with page-level citations, analyse claim files for risk through a
  retrieval-augmented generation (RAG) workflow.
- What it demonstrates: end-to-end ownership — schema design, API, frontend,
  containerisation, CI/CD pipeline, cloud deployment.
- Include a screenshot or short GIF. A live project with no visual is wasted.

**2. UAV Battery Anomaly Detection** *(MSc)*
- Stack: Python, Keras, LSTM, autoencoders
- Forecast multivariate battery sensor readings across operating cycles; flag abnormal
  behaviour with an autoencoder; alert threshold calibrated on held-out data.
- Demonstrates: time series, anomaly detection, working with real sensor data.

**3. Semiconductor Manufacturing Fault Detection** *(MSc)*
- Stack: Python, PCA, SMOTE, XGBoost
- Detecting rare fault events in heavily imbalanced manufacturing sensor data,
  evaluated on precision and recall.
- Demonstrates: imbalanced classification, manufacturing data. Relevant to both ML
  roles and pharma/manufacturing employers.

**4. Geometrical Optimisation of an MR Damper** *(BTech, team of 4)*
- Stack: Creo Parametric, Ansys, Minitab
- 2D axisymmetric magnetostatic FEM model; geometry optimised with response surface
  methodology and a Taguchi design of experiments. Selected design gave **498.5 N
  damping force at 1 A**.
- Keep it. It is the only hard engineering number on the site and it differentiates me
  from every other backend developer.

Each project card needs: title, one-line summary, stack tags, what I built, a link to
code or live demo. No project without a link.

### 5.4 Experience section

Three roles, reverse chronological, with these as the load-bearing facts:

- **Cydez Technologies** (Jan–Jul 2025) — logistics platform for a global shipping
  customer. C#, ASP.NET Core, TypeScript, Angular, PostgreSQL. CI/CD with GitHub Actions
  and Docker supporting **twice-weekly releases** for a **20-person Agile team**.
  Traced production incidents through logs to root cause.

- **Kameda Infologics** (Oct 2022–Sep 2024) — clinical data applications deployed across
  **200+ hospital sites in India and the UAE**, in a regulated healthcare environment.
  C#, TypeScript, Angular, PostgreSQL schemas with validation and audit trails.
  Debugging across a multi-site deployment.

- **Luminar Technolab** (Nov 2021–Oct 2022) — delivered the Kiniqaly application end to
  end in a **six-person team**. C#, Angular, MongoDB. Trained **60+ junior engineers
  across three cohorts**.

Keep the numbers. They are the strongest thing on the page and they are all true.

### 5.5 Skills section

Group them. Do not list a flat wall of logos.

- **Backend:** C#, ASP.NET Core, .NET, REST APIs, object-oriented design
- **Frontend:** Angular, TypeScript, React, HTML, CSS
- **Databases:** PostgreSQL, MS SQL, MongoDB
- **Cloud & delivery:** Docker, Azure Container Apps, GitHub Actions, CI/CD, Git
- **Python & AI:** Python, FastAPI, RAG and LLM integration, scikit-learn, Keras,
  XGBoost, anomaly detection
- **Engineering:** Creo Parametric, Ansys FEA, design of experiments, Taguchi methods

Do **not** list: C++, ROS, OpenCV, PyTorch. I do not have them yet. Add them only when
a shipped project on this site uses them.

### 5.6 About section

Short. Three or four sentences. Cover:
- Mechanical engineering → software, and why that combination is useful
- Regulated healthcare experience and what it taught me about data integrity
- The MSc and where I am heading (data-heavy backend, with an interest in computer vision)
- That I am open to roles in Ireland

Avoid: "passionate", "results-driven", "cutting-edge". Plain language.

### 5.7 Contact

- Email: arjjunck@gmail.com
- LinkedIn: linkedin.com/in/arjjunck
- GitHub: github.com/arjjunck
- CV: direct PDF download, no form, no gate

---

## 6. Keywords to appear in page text

These exist for keyword search and recruiter scanning. Work them into real sentences,
never as a hidden block.

C#, ASP.NET Core, .NET, .NET Core, TypeScript, Angular, React, REST API, PostgreSQL,
SQL, MongoDB, Docker, Azure, Azure Container Apps, GitHub Actions, CI/CD, unit testing,
integration testing, Agile, code review, root cause analysis, regulated environment,
audit trail, data integrity, Python, FastAPI, RAG, LLM, machine learning, anomaly
detection, Cork, Ireland, Critical Skills Employment Permit.

---

## 7. What to de-emphasise or remove

- Anything that frames me primarily as a data scientist or ML researcher. That is not
  the job I am applying for this year.
- Robotics. I have no robotics project yet. Claiming the interest is fine; claiming the
  skill is not.
- Long prose about my journey. Recruiters skim.
- Certifications I have not completed. AI-200 can appear as "in progress" only once I
  have actually started it.

---

## 8. Tone and constraints

- Plain, direct, specific. Numbers over adjectives.
- No invented metrics. Every figure in this brief is real and verifiable.
- Fast loading, works on mobile — recruiters open links on phones.
- The CV download must always work. It is the main conversion.

---

## 9. Later (do not build yet)

When the perception projects exist, add a section for them:
1. Fisheye camera calibration run as a designed experiment (OpenCV + DOE)
2. Surround-view / bird's-eye-view stitching from multiple cameras

Both will carry measured results. Until they exist and are linked, the site says nothing
about computer vision beyond a stated interest.
