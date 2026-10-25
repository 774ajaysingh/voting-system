# 🗳️ Smart & Secure College Voting System
### Project No. 94 • B.Tech Mini Project • College Level
> **"A modern digital platform for secure, simple, and transparent college elections."**

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-00f2fe?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)
[![B.Tech Mini Project](https://img.shields.io/badge/Project-No.%2094-8b5cf6?style=for-the-badge)](README.md)

---

## 👥 Project Team
* **Akhil Kumar** — Team Leader
* **Aksh Cheema** — Team Member
* **Ajay Singh** — Team Member
* **Akhtar Ali** — Team Member

---

## 🌟 Key Features & Innovations

1. **Smart Candidate Comparison Matrix (Slide 5 — The Core Innovation):**
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

2. **Dual-Factor Authentication & Verification (Slides 4 & 7):**
   - Institutional Student ID / Roll Number validation.
   - 6-digit SMS OTP simulation and contactless QR Badge scanning.

3. **Zero-Knowledge Decoupling & One-Student → One-Vote (Slides 7 & 8):**
   - Permanent double-vote prevention (`hasVoted` state guard).
   - Strict voter-choice separation: voter records verify eligibility, while anonymous encrypted ballot tokens are stored independently.

4. **Cryptographic Digital Vote Receipt (Slide 8):**
   - Generates an immutable HMAC/SHA-256 voting proof hash and dynamic QR verification badge.
   - Built-in **Public Ledger Receipt Verifier** allows any student to check their ballot inclusion without revealing their choice.

5. **Centralized Admin Dashboard & Turnout Analytics (Slides 6 & 10):**
   - Live automated election countdown timer.
   - Real-time **Department-wise Turnout Chart** (Chart.js) across CSE, ECE, ME, IT, CE.
   - Candidate vote distribution donut chart.
   - Security audit trail and suspicious activity monitoring (simulated double-vote block, rate limiting).

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
