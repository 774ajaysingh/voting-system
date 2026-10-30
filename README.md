# 🗳️ Smart & Secure College Voting System
### Project No. 94 • B.Tech Mini Project • College Level
> **"A modern digital platform for secure, simple, and transparent college elections."**

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-00f2fe?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)
[![B.Tech Mini Project](https://img.shields.io/badge/Project-No.%2094-8b5cf6?style=for-the-badge)](README.md)

---

## 👥 Project Team
* **Anuj Pandey** — Team Leader
* **Ashhab Ahmed** — Team Member
* **Arshad Singh** — Team Member
* **Aryan Katiyar** — Team Member
* **Aryan Mishra** — Team Member

---

## 🌟 Key Features & Innovations

1. **Smart Candidate Comparison Matrix & AI Manifesto Engine (Slide 5 — The Core Innovation):**
   - Side-by-side comparative grid of 2 to 4 candidates simultaneously.
   - Evaluates candidates across **8 standardized benchmarks**:
     - 🎓 **Academic Improvement**
     - 🏛️ **Campus Infrastructure**
     - 🎭 **Events & Clubs**
     - 🤝 **Student Welfare**
     - 💻 **Technology**
     - 💼 **Placement / Career Initiatives**
     - 🏆 **Previous Work & Track Record**
     - 📊 **Manifesto Commitments & Action-Ready % Meter**
   - **🤖 "Ask the Ballot" AI Search & Assistant:** Natural language search answering queries (*e.g., "Who has the best placement plan?"*).
   - **📊 3-Point Feasibility Scoring:** Automated grading of campaign promises on *Budget Feasibility*, *Council Scope*, and *Execution Speed*.

2. **Tamper-Evident Merkle Blockchain Ledger Explorer:**
   - Real-time chained cryptographic blocks linking each ballot with `Previous Hash`, `Merkle Root`, and `SHA-256 Signature`.
   - **Interactive Database Tamper Simulator:** Simulates malicious database injection and visually demonstrates how the cryptographic chain immediately breaks in red, mathematically isolating fraud.
   - Complete ledger JSON export for third-party auditing.

3. **Multi-Factor Authentication with WebCam Biometric Liveness:**
   - Institutional Student ID / Roll Number validation against roster.
   - 3-way verification: **6-Digit SMS OTP**, **Contactless QR Badge Scan**, and **WebCam Biometric Liveness HUD**.

4. **Zero-Knowledge Decoupling, NOTA & One-Student → One-Vote:**
   - Permanent double-vote prevention (`hasVoted` state guard).
   - Strict voter-choice separation: voter records verify eligibility, while anonymous encrypted ballot tokens are stored independently.
   - **Official NOTA ("None Of The Above")** democratic protest alternative.
   - **Voice of the Campus Priority Poll:** Students vote on their #1 campus issue (*Wi-Fi, Placements, Labs, Welfare, Sports*).

5. **Cryptographic Digital Vote Receipt & Public Ledger Verifier:**
   - Generates an immutable HMAC/SHA-256 voting proof hash, Block Index, and dynamic QR verification badge.
   - Built-in **Public Ledger Receipt Verifier** allows any student to check their ballot inclusion without revealing their choice.
   - One-click print / PDF export stylesheet.

6. **Centralized Admin Dashboard & Turnout Analytics (Slides 6 & 10):**
   - Live automated election countdown timer.
   - Real-time **Department-wise Turnout Chart** (Chart.js) across CSE, ECE, ME, IT, CE.
   - Candidate vote distribution donut chart & **Campus Priority Heatmap Chart**.
   - Security audit trail and suspicious activity monitoring (simulated double-vote block, rate limiting).
   - **One-click Export:** Security Audit Trail (CSV), Anonymized Ledger (CSV), Blockchain (JSON).

7. **🏆 Grand Winner Tabulation Ceremony & Official Gazette:**
   - Animated election results reveal with interactive confetti celebration fanfare.
   - Displays winner trophy card, victory margin, and runner-up standings.
   - Generates an **Official University Gazette Certificate** ready for printing.

8. **🔐 Dual-Role Authentication Gateway (Student Voter vs. Election Admin):**
   - **Student (Voter) Portal:** Authenticates institutional roll numbers (e.g., `22BCSE101` with default PIN `1234`). Auto-populates the voting booth and restricts access to administrative controls.
   - **Election Management Team (Admin) Portal:** Secure officer login (`admin@college.edu` with passkey `admin2026`) providing access to turnout controls, winner tabulation, and tamper sentinels.
   - **Role-Based Access Control (RBAC):** Dynamic session pill in top navigation with one-click logout and protected admin tabs.
   - **1-Click Evaluation Chips:** Pre-configured demo profiles for immediate live demonstration during evaluation and viva.

9. **📢 Admin Election Creation & Broadcast Wizard (Multi-Election Engine):**
   - **Full Election Setup:** Administrators can define custom Election Titles, unique IDs (e.g., `ELEX-CR-2026`), contest positions, duration timelines (2h to 3 days), and eligible voter pool sizes.
   - **1-Click Demo Templates:** Quick presets for *Department Class Representative (CR)*, *Hostel & Sports Council*, and *ACM Student Chapter President*.
   - **Dynamic Candidate Roster Builder:** Add and remove custom candidates with live taglines and manifesto goals while preserving constitutional NOTA choice.
   - **Cryptographic Genesis Minting:** Launching an election automatically mints a new **Genesis Block #0** tied to the new Election ID, zeros out previous ballot records, and clears student participation flags for a fresh democratic vote.

10. **📋 Candidate Nomination Scrutiny Desk & 4-Pillar Feasibility Rubric:**
   - **Pre-Ballot Candidate Vetting:** Administrative desk evaluating new student nomination filings (CEC Form 1A) before candidates appear on the live ballot.
   - **4-Pillar Scoring Rubric (100-Point Scale):**
     - 🎓 **Academic Standing & Disciplinary Record (0–25 pts):** CGPA verification, minimum attendance compliance, proctorial conduct clearance.
     - 👨‍🏫 **Teacher Reviews & Faculty Recommendation (0–25 pts):** Faculty mentor ratings, HOD recommendation, and student welfare endorsement.
     - 🏆 **Portfolio & Co-Curricular Review (0–25 pts):** Campus club initiatives, hackathon participation, technical projects, leadership history.
     - ⚖️ **Manifesto Viability & Council Purview (0–25 pts):** Budget realism, student council charter alignment, execution feasibility.
   - **Live Composite Gauge & Letter Grades:** Interactive sliders compute real-time scores (`Grade A+`, `Grade A`, `Grade B`, `Grade C`) with one-click **"Approve & Mint to Ballot"** or **"Reject Nomination"** with official grounds.

11. **🔄 Student Voter Roll & Dynamic Voter Enrolment Desk:**
   - **Enroll New Student Voter:** Administrators can register eligible students to the official voter roll on the fly via the **"Enroll New Voter"** modal, configuring Roll Number/PRN, Full Name, Department, Academic Year, Email, Mobile, and PIN.
   - **Direct Booth Launch:** Includes a 1-click **"Vote in Booth"** action directly from the voter roster, immediately loading the student's credentials into the voting booth for testing and live casting.
   - **Live Search & Filter:** Search registered students by PRN, Name, or Branch with status filters (`All`, `Voted`, `Pending Cast`, `Revote Authorized`).
   - **Statutory Revote Authorization:** Grants administrative clearance for a student to revote with auditable legal grounds:
     - Technical Glitch / Network Interruption during cast
     - Proctorial Appeal / Dual-Factor Discrepancy
     - Biometric Hardware / Camera Desync
     - Accidental Candidate Misclick / Immediate Booth Appeal
     - Chief Election Officer (CEC) Directive
   - **Cryptographic Audit Trail:** Supersedes previous digital receipt, invalidates prior ballot token, records a `REVOTE_CLEARANCE_ISSUED` block on the ledger, and unlocks the student's booth.

12. **⚡ Instant Election Conclusion & Instant Tabulation:**
   - On-demand **"End Election & Declare Results Now"** administrative trigger.
   - Instantly freezes live voting, logs `ELECTION_CONCLUDED_BY_ADMIN` to the blockchain ledger, dispatches campus circular, and opens the grand **Winner Tabulation Ceremony** with certified vote tallies.

13. **⏱️ Election-Specific Timer & Schedule Manager:**
   - Independent countdown tracking configured per election race (*Student Council Main*, *Class Representative*, *ACM Chapter Lead*, etc.).
   - Duration presets (`+30m`, `+1h`, `+3h`, `+24h`), custom closing datetime picker, and live pause/resume switches synced with header HUD and floating tickers.

14. **🔔 Floating Election Status Ticker & Campus Circular Notice Center:**
   - Persistent ambient ticker displaying ongoing and upcoming elections, live status pills, and remaining polling time.
   - Modal notification center with badge alerts for official CEC circulars, schedule changes, and nomination announcements.

15. **⚡ 1,000-Voter High-Concurrency Election Simulation Engine:**
   - **Full Lifecycle Simulation:** 1-click execution simulating an election for **1,000 eligible voters** competing across **4 nominated representatives** + constitutional NOTA.
   - **Live Real-Time Stepper:** Automates **Genesis Minting**, **1,000 Ballot Casts** with realistic multi-department distribution (CSE: 340, ECE: 260, ME: 180, IT: 140, CE: 80), **Cryptographic Ledger Mining**, and **Official Tabulation Ceremony**.
   - **Dynamic Counters & Charts:** Real-time animated progress bars, live terminal logs, and automatic transition to the **Winner Declaration Ceremony** declaring the elected President with certified victory margin and official Gazette Certificate.

16. **🪪 Student Voter Self-Registration Portal & Admin Group Verification Desk:**
   - **Student Self-Registration Portal:** New students submit their academic credentials (Full Name, Roll No/PRN, Department, Academic Year, Email, Mobile, Security PIN) and preview an interactive holographic digital Student ID proof badge.
   - **Real-Time Verification Pipeline:** Transparent 3-step tracking pipeline (*Submitted → Academic Verification → Commission Approval*) allowing students to verify their application status by Roll Number.
   - **Admin Commission Verification Desk:** Administrative review desk in the Election Management Console with live counters, filter tabs (*Pending Review*, *Approved Voters*, *Rejected Records*), batch approval for verified rosters, and statutory rejection recording with reasons.
   - **Election-Specific Voter Eligibility & Scope Criteria:** Automated constitutional filter ensuring that specific elections restrict voting strictly to designated departments (e.g., **CSE Department Class Representative** allows **only CSE students** to vote; students from ECE or ME are blocked with a clear *Electoral Scope Ineligibility Alert* explaining the boundary rule). Universal elections permit all verified enrolled departments.

---

## 🚀 Quick Start (Run Locally)

### Option 1: Full-Stack with Python Backend Server
1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Run the server (Python 3.x with zero external dependencies):
   ```bash
   python server.py
   ```
3. Open your browser at:
   ```
   http://localhost:5000/index.html
   ```

### Option 2: Direct Browser Launch (Static Mode)
Simply open `index.html` in any modern web browser! The system automatically detects static hosting and runs in reactive client-side ledger mode.

---

## 🌐 Deploy to GitHub Pages (Free Live Web URL)

You can host this project on **GitHub Pages** in under 1 minute:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `smart-college-voting-system`).
2. Link your local project and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/smart-college-voting-system.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Click on **Settings** (top navigation tab).
   - In the left sidebar, click on **Pages**.
   - Under **Build and deployment** $\rightarrow$ **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and root folder `/ (root)`, then click **Save**.
4. Within 30 seconds, your site is live at:
   ```
   https://<your-username>.github.io/smart-college-voting-system/
   ```

---

## 📁 Project Structure

```
├── index.html            # Main web UI: Matrix, Voting Booth, Admin & Analytics
├── styles.css            # Cyber Dark Glassmorphic Design System & print styles
├── app.js                # Frontend logic: comparison matrix, dual auth, charts, receipts
├── server.py             # Python REST API server: atomic transactions, audit logs
├── .gitignore            # Git ignore file
└── README.md             # Project documentation & presentation guide
```

---

## 🛠️ Technology Stack
* **Frontend:** Semantic HTML5, Vanilla CSS3 (Custom Glassmorphism, Micro-animations), JavaScript (ES6+)
* **Visuals & Charts:** [Chart.js](https://www.chartjs.org/) for department analytics, [qrcode.js](https://github.com/davidshimjs/qrcodejs) for digital receipts
* **Backend:** Python REST services with HMAC/SHA-256 cryptographic hashing
* **Deployment:** GitHub Pages / HTTPS-enabled web server
