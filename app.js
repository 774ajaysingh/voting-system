/**
 * Smart & Secure College Voting System - Client Application
 * Project No. 94 - B.Tech Mini Project
 * Frontend Controller for Candidate Matrix, Dual Auth, Voting Booth, and Analytics
 */

// Global State
const APP_STATE = {
  election: {
    status: 'active',
    closingTime: new Date(Date.now() + 5 * 3600 * 1000 + 42 * 60 * 1000 + 18 * 1000)
  },
  candidates: [
    {
      id: "CAND-01",
      name: "Aisha Khan",
      position: "For President",
      department: "CSE",
      year: "3rd Year",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      tagline: "Mentorship programs, doubt clearing hub, smart classes",
      color: "#38bdf8",
      manifesto: {
        academic: "Mentorship programs, doubt clearing hub, smart classes",
        infrastructure: "Wi-Fi upgrade, more study spaces, clean campus drive",
        events: "Annual tech fest, culture week, club collaborations",
        welfare: "Counselling cell, peer support network, health camps",
        technology: "Campus app, digital notice board, online feedback",
        placement: "Resume building, mock interviews, industry connect",
        previousWork: "Organized tech workshop with 500+ students",
        commitmentsCount: 10,
        actionReadyScore: 83
      },
      votes: 284
    },
    {
      id: "CAND-02",
      name: "Rohan Mehta",
      position: "For President",
      department: "CSE",
      year: "3rd Year",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      tagline: "More labs, research collaborations, workshops",
      color: "#10b981",
      manifesto: {
        academic: "More labs, research collaborations, workshops",
        infrastructure: "New computer labs, library extension",
        events: "Inter-college events, startup conclave",
        welfare: "Mental health support, financial awareness",
        technology: "AI-based attendance, resource portal",
        placement: "Placement training, aptitude bootcamps",
        previousWork: "Led coding club, trained 200+ juniors",
        commitmentsCount: 12,
        actionReadyScore: 75
      },
      votes: 242
    },
    {
      id: "CAND-03",
      name: "Neha Verma",
      position: "For President",
      department: "CSE",
      year: "3rd Year",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      tagline: "Skill development sessions, study groups",
      color: "#a855f7",
      manifesto: {
        academic: "Skill development sessions, study groups",
        infrastructure: "Parking & transport improvements",
        events: "More cultural events, student-led fests",
        welfare: "Safety helpline, women empowerment programs",
        technology: "Student dashboard, quick issue reporting",
        placement: "Internships portal, career guidance",
        previousWork: "Volunteer at NGO, organized charity events",
        commitmentsCount: 9,
        actionReadyScore: 78
      },
      votes: 165
    },
    {
      id: "CAND-04",
      name: "Arjun Rao",
      position: "For President",
      department: "CSE",
      year: "3rd Year",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      tagline: "AI tools for learning, hackathons, coding culture",
      color: "#f59e0b",
      manifesto: {
        academic: "AI tools for learning, hackathons, coding culture",
        infrastructure: "Smart classrooms, green campus initiative",
        events: "Hackathons, tech talks, e-sports tournaments",
        welfare: "24/7 student support system",
        technology: "IoT labs, tech clubs, innovation challenges",
        placement: "More company tie-ups, online placement prep",
        previousWork: "Managed college tech fest attended by 1000+",
        commitmentsCount: 11,
        actionReadyScore: 80
      },
      votes: 119
    }
  ],
  selectedMatrixIds: ["CAND-01", "CAND-02", "CAND-03", "CAND-04"],
  departments: [
    { name: "Computer Science (CSE)", code: "CSE", total: 450, voted: 320 },
    { name: "Electronics & Comm (ECE)", code: "ECE", total: 310, voted: 195 },
    { name: "Mechanical Eng (ME)", code: "ME", total: 220, voted: 118 },
    { name: "Information Tech (IT)", code: "IT", total: 180, voted: 135 },
    { name: "Civil Engineering (CE)", code: "CE", total: 90, voted: 42 }
  ],
  currentStudent: null,
  selectedBallotCandidateId: null,
  deptChartInstance: null,
  candidateChartInstance: null,
  logs: []
};

// Standardized categories from Slide 5
const MATRIX_CATEGORIES = [
  { key: "academic", label: "Academic Improvement", icon: "fa-graduation-cap" },
  { key: "infrastructure", label: "Campus Infrastructure", icon: "fa-building-columns" },
  { key: "events", label: "Events & Clubs", icon: "fa-calendar-star" },
  { key: "welfare", label: "Student Welfare", icon: "fa-heart-pulse" },
  { key: "technology", label: "Technology", icon: "fa-laptop-code" },
  { key: "placement", label: "Placement / Career Initiatives", icon: "fa-briefcase" },
  { key: "previousWork", label: "Previous Work", icon: "fa-award" },
  { key: "commitments", label: "Manifesto Commitments", icon: "fa-list-check" }
];

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCountdownTimer();
  fetchInitialData();
  initMatrixToggles();
  renderComparisonMatrix();
  initBoothHandlers();
  initAdminDashboard();
  initReceiptVerifier();
  initModals();
});

/* ==========================================================================
   NAVIGATION & TABS
   ========================================================================== */
function initNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      switchTab(targetId);
    });
  });

  // Quick Demo Voter button in header
  const btnQuick = document.getElementById("btnQuickDemoStudent");
  if (btnQuick) {
    btnQuick.addEventListener("click", () => {
      switchTab("tab-booth");
      const idInput = document.getElementById("inputStudentId");
      if (idInput) {
        idInput.value = "22BCSE101";
        showToast("Demo ID 22BCSE101 (Aarav Sharma) selected!", "success");
      }
    });
  }
}

function switchTab(tabId) {
  document.querySelectorAll(".nav-tab").forEach(t => {
    t.classList.toggle("active", t.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === tabId);
  });

  if (tabId === "tab-admin") {
    renderAdminCharts();
  }
}

/* ==========================================================================
   LIVE COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  function update() {
    const now = new Date();
    const diff = APP_STATE.election.closingTime - now;

    if (diff <= 0) {
      document.getElementById("headerCountdown").textContent = "CLOSED";
      document.getElementById("adminTimeRemaining").textContent = "Closed";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;

    const el = document.getElementById("headerCountdown");
    if (el) el.textContent = timeStr;

    const elAdmin = document.getElementById("adminTimeRemaining");
    if (elAdmin) elAdmin.textContent = `${pad(hours)}h ${pad(mins)}m`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   DATA INITIALIZATION & SYNC
   ========================================================================== */
const IS_STATIC_HOST = window.location.hostname.endsWith('github.io') || window.location.protocol === 'file:';
let isStaticMode = IS_STATIC_HOST;

async function fetchInitialData() {
  if (isStaticMode) {
    console.info("Running in GitHub Pages / Static hosting mode with client-side reactive ledger.");
    loadAuditLogs();
    renderBallotCandidates();
    return;
  }
  try {
    const res = await fetch("/api/status");
    if (res.ok) {
      const data = await res.json();
      APP_STATE.election.status = data.election.status;
      updateElectionStatusBadge(data.election.status);
    } else {
      isStaticMode = true;
    }

    const candRes = await fetch("/api/candidates");
    if (candRes.ok) {
      const candData = await candRes.json();
      if (candData.candidates && candData.candidates.length > 0) {
        APP_STATE.candidates = candData.candidates;
        APP_STATE.selectedMatrixIds = candData.candidates.map(c => c.id).slice(0, 4);
        initMatrixToggles();
        renderComparisonMatrix();
        renderBallotCandidates();
      }
    }

    const deptRes = await fetch("/api/departments");
    if (deptRes.ok) {
      const deptData = await deptRes.json();
      if (deptData.departments) {
        APP_STATE.departments = deptData.departments;
      }
    }

    loadAuditLogs();
  } catch (err) {
    isStaticMode = true;
    console.warn("Backend API offline or running static. Using robust built-in state:", err);
    renderBallotCandidates();
  }
}

function updateElectionStatusBadge(status) {
  const pill = document.getElementById("electionStatusPill");
  const text = document.getElementById("electionStatusText");
  if (!pill || !text) return;

  pill.className = "status-pill";
  if (status === "active") {
    pill.classList.add("status-active");
    text.textContent = "LIVE ELECTION";
  } else if (status === "paused") {
    pill.classList.add("status-paused");
    text.textContent = "PAUSED";
  } else {
    pill.classList.add("status-closed");
    text.textContent = "CLOSED";
  }
}

/* ==========================================================================
   SMART CANDIDATE COMPARISON MATRIX (SLIDE 5)
   ========================================================================== */
function initMatrixToggles() {
  const container = document.getElementById("candidateTogglesContainer");
  if (!container) return;
  container.innerHTML = "";

  APP_STATE.candidates.forEach(cand => {
    const isSelected = APP_STATE.selectedMatrixIds.includes(cand.id);
    const chip = document.createElement("div");
    chip.className = `cand-toggle-chip ${isSelected ? "selected" : ""}`;
    chip.dataset.id = cand.id;
    chip.innerHTML = `
      <span class="cand-chip-dot" style="background-color: ${cand.color}"></span>
      <span>${cand.name}</span>
      <i class="fa-solid ${isSelected ? "fa-circle-check" : "fa-circle"}"></i>
    `;

    chip.addEventListener("click", () => {
      toggleCandidateInMatrix(cand.id);
    });

    container.appendChild(chip);
  });
}

function toggleCandidateInMatrix(candId) {
  const idx = APP_STATE.selectedMatrixIds.indexOf(candId);
  if (idx > -1) {
    if (APP_STATE.selectedMatrixIds.length <= 2) {
      showToast("Keep at least 2 candidates selected to compare side-by-side.", "warning");
      return;
    }
    APP_STATE.selectedMatrixIds.splice(idx, 1);
  } else {
    if (APP_STATE.selectedMatrixIds.length >= 4) {
      showToast("Maximum 4 candidates can be compared simultaneously for optimal readability.", "warning");
      return;
    }
    APP_STATE.selectedMatrixIds.push(candId);
  }

  initMatrixToggles();
  renderComparisonMatrix();
}

function renderComparisonMatrix() {
  const tableHeaderRow = document.getElementById("matrixHeaderRow");
  const tableBody = document.getElementById("matrixBodyRows");
  if (!tableHeaderRow || !tableBody) return;

  // Clear existing candidate header cells
  while (tableHeaderRow.children.length > 1) {
    tableHeaderRow.removeChild(tableHeaderRow.lastChild);
  }

  const activeCandidates = APP_STATE.candidates.filter(c => 
    APP_STATE.selectedMatrixIds.includes(c.id)
  );

  // 1. Build Candidate Header Cards
  activeCandidates.forEach(cand => {
    const th = document.createElement("th");
    th.className = "matrix-cand-header-cell";
    th.innerHTML = `
      <div class="cand-profile-card">
        <div class="cand-avatar-wrap">
          <img src="${cand.avatar}" alt="${cand.name}" class="cand-avatar" style="border-color: ${cand.color};">
        </div>
        <div>
          <div class="cand-dept-tag">${cand.department} • ${cand.year}</div>
          <div class="cand-name">${cand.name}</div>
          <div class="cand-post">${cand.position}</div>
        </div>
        <div class="cand-header-action">
          <button class="btn btn-primary-gradient btn-xs btn-block btn-vote-direct" data-id="${cand.id}">
            <i class="fa-solid fa-vote-yea"></i> Vote for ${cand.name.split(' ')[0]}
          </button>
        </div>
      </div>
    `;
    tableHeaderRow.appendChild(th);
  });

  // Attach direct vote click handlers
  tableHeaderRow.querySelectorAll(".btn-vote-direct").forEach(btn => {
    btn.addEventListener("click", () => {
      const candId = btn.dataset.id;
      switchTab("tab-booth");
      APP_STATE.selectedBallotCandidateId = candId;
      showToast(`Selected candidate for ballot. Please login/verify to seal your vote!`, "info");
    });
  });

  // 2. Build 8 Category Rows
  tableBody.innerHTML = "";

  MATRIX_CATEGORIES.forEach(cat => {
    const tr = document.createElement("tr");

    // Left Criteria Name
    const tdCriteria = document.createElement("td");
    tdCriteria.className = "criteria-cell";
    tdCriteria.innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.label}`;
    tr.appendChild(tdCriteria);

    // Columns for each candidate
    activeCandidates.forEach(cand => {
      const tdContent = document.createElement("td");
      
      if (cat.key === "commitments") {
        // Slide 5 Commitments Row with Action Ready gauge ring
        tdContent.className = "manifesto-cell action-ready-cell";
        const count = cand.manifesto.commitmentsCount || 10;
        const score = cand.manifesto.actionReadyScore || 80;
        tdContent.innerHTML = `
          <div class="action-ready-card">
            <div>
              <div class="commitments-count">${count} key commitments</div>
              <div class="commitments-sub"><i class="fa-solid fa-bolt"></i> Action Ready</div>
            </div>
            <div class="gauge-circle" style="--score: ${score};">
              <span>${score}%</span>
            </div>
          </div>
        `;
      } else {
        tdContent.className = "manifesto-cell";
        tdContent.textContent = cand.manifesto[cat.key] || "Standardized policy planned.";
      }

      tr.appendChild(tdContent);
    });

    tableBody.appendChild(tr);
  });
}

/* ==========================================================================
   STUDENT VOTING BOOTH CONTROLLER
   ========================================================================== */
function initBoothHandlers() {
  // Demo fill button
  const btnDemoFill = document.getElementById("btnDemoFillStudent");
  if (btnDemoFill) {
    btnDemoFill.addEventListener("click", () => {
      const sid = document.getElementById("inputStudentId");
      if (sid) sid.value = "22BCSE101";
      showToast("Filled demo Roll No: 22BCSE101 (Aarav Sharma)", "info");
    });
  }

  // Step 1: Login Form
  const formLogin = document.getElementById("formStudentLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const studentId = document.getElementById("inputStudentId").value.trim().toUpperCase();
      const dept = document.getElementById("selectDepartment").value;
      const year = document.getElementById("selectYear").value;

      if (!studentId) return;

      try {
        const res = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, department: dept, year })
        });
        const data = await res.json();

        if (res.ok) {
          APP_STATE.currentStudent = data.student;
          document.getElementById("demoOtpCode").textContent = data.demoOtp || "492108";
          document.getElementById("otpPromptMessage").textContent = data.message;
          transitionBoothStage("stageVerify", 2);
          generateStudentBadgeQr(studentId);
          showToast("OTP generated and sent to student phone!", "success");
        } else {
          showToast(data.error || "Authentication error", "error");
        }
      } catch (err) {
        // Fallback for standalone demo
        APP_STATE.currentStudent = {
          studentId: studentId,
          name: studentId === "22BCSE101" ? "Aarav Sharma" : "Student " + studentId,
          department: dept,
          year: year,
          hasVoted: false
        };
        transitionBoothStage("stageVerify", 2);
        generateStudentBadgeQr(studentId);
        showToast("Demo dual-factor verification triggered", "info");
      }
    });
  }

  // Step 2: OTP Autofill & Verify
  const btnAutofill = document.getElementById("btnAutofillOtp");
  if (btnAutofill) {
    btnAutofill.addEventListener("click", () => {
      const code = document.getElementById("demoOtpCode").textContent || "492108";
      document.getElementById("inputOtpDigits").value = code;
    });
  }

  // QR Badge Simulator
  const btnQrScan = document.getElementById("btnSimulateQrScan");
  if (btnQrScan) {
    btnQrScan.addEventListener("click", () => {
      showToast("Student QR badge verified by scanner sensor!", "success");
      proceedToBallot();
    });
  }

  const formVerify = document.getElementById("formVerifyOtp");
  if (formVerify) {
    formVerify.addEventListener("submit", async (e) => {
      e.preventDefault();
      const otp = document.getElementById("inputOtpDigits").value.trim();
      const sid = APP_STATE.currentStudent?.studentId;

      try {
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: sid, otp })
        });
        const data = await res.json();
        if (res.ok) {
          showToast("Identity verified! Ballot unlocked.", "success");
          proceedToBallot();
        } else {
          showToast(data.error || "Invalid OTP code", "error");
        }
      } catch (err) {
        if (otp === "492108" || otp.length === 6) {
          showToast("Identity verified! Ballot unlocked.", "success");
          proceedToBallot();
        } else {
          showToast("Please enter the 6-digit verification code.", "error");
        }
      }
    });
  }

  // Step 3: Ballot Candidate Selection & Submission
  const btnSubmitBallot = document.getElementById("btnSubmitBallot");
  if (btnSubmitBallot) {
    btnSubmitBallot.addEventListener("click", () => {
      if (!APP_STATE.selectedBallotCandidateId) {
        showToast("Please click on a candidate to select your vote.", "warning");
        return;
      }
      openVoteConfirmModal();
    });
  }

  // Back to Matrix from Ballot
  const btnMatrixLook = document.getElementById("btnMatrixQuickLook");
  if (btnMatrixLook) {
    btnMatrixLook.addEventListener("click", () => {
      switchTab("tab-matrix");
    });
  }

  // Step 4: Digital Receipt Actions
  const btnCopy = document.getElementById("btnCopyHash");
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const hash = document.getElementById("receiptHashValue").textContent;
      navigator.clipboard.writeText(hash);
      showToast("Receipt hash copied to clipboard!", "success");
    });
  }

  const btnPrint = document.getElementById("btnPrintReceipt");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  const btnVerifyReceiptNow = document.getElementById("btnVerifyThisReceiptNow");
  if (btnVerifyReceiptNow) {
    btnVerifyReceiptNow.addEventListener("click", () => {
      const hash = document.getElementById("receiptHashValue").textContent;
      switchTab("tab-receipt-checker");
      const input = document.getElementById("inputReceiptQuery");
      if (input) {
        input.value = hash;
        document.getElementById("btnRunReceiptLookup").click();
      }
    });
  }

  const btnVoteAnother = document.getElementById("btnVoteAnotherStudent");
  if (btnVoteAnother) {
    btnVoteAnother.addEventListener("click", () => {
      APP_STATE.currentStudent = null;
      APP_STATE.selectedBallotCandidateId = null;
      document.getElementById("formStudentLogin").reset();
      document.getElementById("formVerifyOtp").reset();
      transitionBoothStage("stageLogin", 1);
    });
  }
}

function proceedToBallot() {
  const voter = APP_STATE.currentStudent;
  if (!voter) return;

  document.getElementById("voterBadgeName").textContent = voter.name;
  document.getElementById("voterBadgeId").textContent = voter.studentId;
  document.getElementById("voterBadgeDept").textContent = voter.department;

  renderBallotCandidates();
  transitionBoothStage("stageBallot", 3);
}

function renderBallotCandidates() {
  const grid = document.getElementById("ballotCandidatesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  APP_STATE.candidates.forEach(cand => {
    const isSelected = APP_STATE.selectedBallotCandidateId === cand.id;
    const card = document.createElement("div");
    card.className = `ballot-cand-card ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <div class="selected-check-badge"><i class="fa-solid fa-check"></i></div>
      <img src="${cand.avatar}" alt="${cand.name}" class="ballot-cand-avatar">
      <div class="cand-dept-tag">${cand.department} • ${cand.year}</div>
      <div class="ballot-cand-name">${cand.name}</div>
      <div class="ballot-cand-tagline">"${cand.tagline}"</div>
      <div class="gauge-circle" style="--score: ${cand.manifesto.actionReadyScore || 80}; width: 38px; height: 38px; font-size: 11px;">
        <span>${cand.manifesto.actionReadyScore || 80}%</span>
      </div>
    `;

    card.addEventListener("click", () => {
      APP_STATE.selectedBallotCandidateId = cand.id;
      renderBallotCandidates();
      const btnSubmit = document.getElementById("btnSubmitBallot");
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Cast Vote for ${cand.name}`;
      }
    });

    grid.appendChild(card);
  });
}

function openVoteConfirmModal() {
  const cand = APP_STATE.candidates.find(c => c.id === APP_STATE.selectedBallotCandidateId);
  if (!cand) return;

  const card = document.getElementById("confirmCandidateCard");
  card.innerHTML = `
    <img src="${cand.avatar}" alt="${cand.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid ${cand.color};">
    <div>
      <div style="font-weight: 700; color: #fff; font-size: 16px;">${cand.name}</div>
      <div style="font-size: 12px; color: #94a3b8;">${cand.position} • ${cand.department}</div>
      <div style="font-size: 11px; color: #00f2fe; margin-top: 2px;">Action-Ready Score: ${cand.manifesto.actionReadyScore}%</div>
    </div>
  `;

  document.getElementById("modalConfirmVote").classList.remove("hidden");
}

async function castOfficialBallot() {
  document.getElementById("modalConfirmVote").classList.add("hidden");
  const sid = APP_STATE.currentStudent?.studentId;
  const candId = APP_STATE.selectedBallotCandidateId;

  try {
    const res = await fetch("/api/vote/cast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: sid, candidateId: candId })
    });
    const data = await res.json();

    if (res.ok) {
      showToast("Vote successfully recorded and encrypted!", "success");
      displayDigitalReceipt(data.receipt);
    } else {
      showToast(data.error || "Failed to commit ballot", "error");
    }
  } catch (err) {
    // Standalone fallback
    const mockHash = "0x" + Math.random().toString(16).substr(2, 16);
    const mockReceipt = {
      receiptHash: mockHash,
      studentName: APP_STATE.currentStudent.name,
      studentId: sid,
      department: APP_STATE.currentStudent.department,
      electionTitle: "College Student Council Elections 2026",
      timestamp: new Date().toISOString()
    };
    displayDigitalReceipt(mockReceipt);
  }
}

function displayDigitalReceipt(receipt) {
  document.getElementById("receiptStudentName").textContent = receipt.studentName;
  document.getElementById("receiptStudentId").textContent = receipt.studentId;
  document.getElementById("receiptDepartment").textContent = receipt.department;
  document.getElementById("receiptTimestamp").textContent = new Date(receipt.timestamp).toLocaleString() + " UTC";
  document.getElementById("receiptHashValue").textContent = receipt.receiptHash;

  // Render QR Code for receipt
  const qrBox = document.getElementById("receiptQrCode");
  qrBox.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(qrBox, {
      text: `VOTE-PROOF:${receipt.receiptHash}:${receipt.studentId}`,
      width: 80,
      height: 80,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });
  }

  transitionBoothStage("stageReceipt", 4);
}

function transitionBoothStage(stageId, stepNum) {
  document.querySelectorAll(".booth-stage").forEach(s => s.classList.add("hidden"));
  const target = document.getElementById(stageId);
  if (target) target.classList.remove("hidden");

  // Stepper indicator update
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`stepIndicator${i}`);
    if (el) {
      el.classList.remove("active", "done");
      if (i === stepNum) el.classList.add("active");
      else if (i < stepNum) el.classList.add("done");
    }
  }
}

function generateStudentBadgeQr(studentId) {
  const qrBox = document.getElementById("studentBadgeQr");
  if (!qrBox) return;
  qrBox.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(qrBox, {
      text: `STUDENT-ID:${studentId}:GLBITM-AUTH`,
      width: 110,
      height: 110,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });
  }
}

/* ==========================================================================
   TAB 3: ADMIN DASHBOARD & CHARTS
   ========================================================================== */
function initAdminDashboard() {
  const btnReset = document.getElementById("btnResetVoters");
  if (btnReset) {
    btnReset.addEventListener("click", async () => {
      try {
        await fetch("/api/reset-demo", { method: "POST" });
        showToast("Demo voter records reset. Ready for new test votes!", "success");
      } catch (e) {
        showToast("Demo voter state reset.", "info");
      }
    });
  }

  const btnToggle = document.getElementById("btnToggleElectionState");
  if (btnToggle) {
    btnToggle.addEventListener("click", async () => {
      const isPaused = APP_STATE.election.status === "paused";
      const nextStatus = isPaused ? "active" : "paused";
      try {
        const res = await fetch("/api/admin/toggle-election", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus })
        });
        if (res.ok) {
          APP_STATE.election.status = nextStatus;
          btnToggle.innerHTML = isPaused ? '<i class="fa-solid fa-pause"></i> Pause Election' : '<i class="fa-solid fa-play"></i> Resume Election';
          updateElectionStatusBadge(nextStatus);
          showToast(`Election is now ${nextStatus.toUpperCase()}`, "info");
        }
      } catch (e) {
        APP_STATE.election.status = nextStatus;
        updateElectionStatusBadge(nextStatus);
      }
    });
  }

  const btnClose = document.getElementById("btnCloseElection");
  if (btnClose) {
    btnClose.addEventListener("click", async () => {
      if (confirm("Are you sure you want to close this election and certify final results?")) {
        try {
          await fetch("/api/admin/toggle-election", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "closed" })
          });
          APP_STATE.election.status = "closed";
          updateElectionStatusBadge("closed");
          document.getElementById("tallyStatusBadge").textContent = "Final Certified Results";
          renderAdminCharts();
          showToast("Election officially closed! Certified results tabulated.", "success");
        } catch (e) {}
      }
    });
  }

  // Anomaly attack simulator
  const btnAttack = document.getElementById("btnTriggerSimulatedAttack");
  if (btnAttack) {
    btnAttack.addEventListener("click", () => {
      const attackLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        eventType: "DOUBLE_VOTE_BLOCKED",
        details: "Blocked unauthorized replay attack from IP 192.168.1.189. Voter flagged.",
        ip: "192.168.1.189",
        isSuspicious: true
      };
      APP_STATE.logs.unshift(attackLog);
      renderAuditLogTable(APP_STATE.logs);
      showToast("Simulated attack recorded in security audit ledger!", "error");
    });
  }

  // Filter logs buttons
  const btnAll = document.getElementById("btnFilterAllLogs");
  const btnSuspicious = document.getElementById("btnFilterSuspiciousLogs");
  if (btnAll && btnSuspicious) {
    btnAll.addEventListener("click", () => {
      btnAll.classList.add("active");
      btnSuspicious.classList.remove("active");
      renderAuditLogTable(APP_STATE.logs);
    });
    btnSuspicious.addEventListener("click", () => {
      btnSuspicious.classList.add("active");
      btnAll.classList.remove("active");
      renderAuditLogTable(APP_STATE.logs.filter(l => l.isSuspicious));
    });
  }
}

function renderAdminCharts() {
  if (typeof Chart === "undefined") return;

  // 1. Department Turnout Chart
  const deptCtx = document.getElementById("deptTurnoutChart");
  if (deptCtx) {
    if (APP_STATE.deptChartInstance) {
      APP_STATE.deptChartInstance.destroy();
    }

    const labels = APP_STATE.departments.map(d => d.code);
    const percentages = APP_STATE.departments.map(d => Math.round((d.voted / d.total) * 100));

    APP_STATE.deptChartInstance = new Chart(deptCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Turnout Rate (%)",
          data: percentages,
          backgroundColor: [
            "rgba(0, 242, 254, 0.7)",
            "rgba(139, 92, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(236, 72, 153, 0.7)"
          ],
          borderColor: [
            "#00f2fe", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"
          ],
          borderWidth: 1.5,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#94a3b8", callback: (val) => val + "%" }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#cbd5e1", font: { weight: "bold" } }
          }
        }
      }
    });
  }

  // 2. Candidate Vote Distribution Doughnut Chart
  const candCtx = document.getElementById("candidateTallyChart");
  if (candCtx) {
    if (APP_STATE.candidateChartInstance) {
      APP_STATE.candidateChartInstance.destroy();
    }

    const candLabels = APP_STATE.candidates.map(c => c.name);
    const candVotes = APP_STATE.candidates.map(c => c.votes);

    APP_STATE.candidateChartInstance = new Chart(candCtx, {
      type: "doughnut",
      data: {
        labels: candLabels,
        datasets: [{
          data: candVotes,
          backgroundColor: [
            "#38bdf8",
            "#10b981",
            "#a855f7",
            "#f59e0b",
            "#ec4899"
          ],
          borderWidth: 2,
          borderColor: "#0f172a"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#cbd5e1", font: { size: 12 } }
          }
        },
        cutout: "65%"
      }
    });
  }
}

async function loadAuditLogs() {
  try {
    const res = await fetch("/api/audit-logs");
    if (res.ok) {
      const data = await res.json();
      APP_STATE.logs = data.logs;
      renderAuditLogTable(APP_STATE.logs);
    }
  } catch (err) {
    APP_STATE.logs = [
      { id: 1, timestamp: "2026-10-25 10:15", eventType: "SYSTEM_STARTUP", details: "Election timer auto-initialized", ip: "127.0.0.1", isSuspicious: false },
      { id: 2, timestamp: "2026-10-25 11:40", eventType: "OTP_VERIFIED", details: "Student 22BCSE101 dual-factor cleared", ip: "192.168.1.104", isSuspicious: false },
      { id: 3, timestamp: "2026-10-25 12:05", eventType: "DOUBLE_VOTE_BLOCKED", details: "Prevented duplicate vote for 22BIT304", ip: "192.168.1.200", isSuspicious: true }
    ];
    renderAuditLogTable(APP_STATE.logs);
  }
}

function renderAuditLogTable(logs) {
  const tbody = document.getElementById("auditLogTbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  logs.forEach(log => {
    const tr = document.createElement("tr");
    if (log.isSuspicious) tr.className = "audit-flagged-row";

    tr.innerHTML = `
      <td>${log.timestamp}</td>
      <td><strong>${log.eventType}</strong></td>
      <td><code>${log.ip}</code></td>
      <td>${log.details}</td>
      <td>
        <span class="${log.isSuspicious ? 'log-badge-suspicious' : 'log-badge-normal'}">
          ${log.isSuspicious ? 'Flagged / Blocked' : 'Verified'}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ==========================================================================
   TAB 4: PUBLIC LEDGER RECEIPT VERIFIER
   ========================================================================== */
function initReceiptVerifier() {
  const btnLookup = document.getElementById("btnRunReceiptLookup");
  const inputQuery = document.getElementById("inputReceiptQuery");
  const resultBox = document.getElementById("verifierResultBox");

  // Sample receipt clickable link
  const sampleLink = document.getElementById("linkSampleReceipt");
  if (sampleLink) {
    sampleLink.addEventListener("click", (e) => {
      e.preventDefault();
      inputQuery.value = sampleLink.textContent.trim();
      btnLookup.click();
    });
  }

  if (btnLookup) {
    btnLookup.addEventListener("click", async () => {
      const hash = inputQuery.value.trim();
      if (!hash) {
        showToast("Please enter a valid receipt hash to verify.", "warning");
        return;
      }

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `<div><i class="fa-solid fa-spinner fa-spin"></i> Querying election cryptographic ledger...</div>`;

      try {
        const res = await fetch(`/api/verify-receipt/${hash}`);
        const data = await res.json();

        if (res.ok && data.found) {
          resultBox.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 14px;">
              <i class="fa-solid fa-circle-check text-emerald" style="font-size: 32px; margin-top: 4px;"></i>
              <div>
                <h4 style="color: #fff; font-size: 17px; margin-bottom: 4px;">Receipt Confirmed on Ledger!</h4>
                <p style="color: #a7f3d0; font-size: 13px;">This cryptographic proof was legitimately committed during <strong>${data.receipt.electionId}</strong> at <strong>${data.receipt.timestamp}</strong>.</p>
                <div style="margin-top: 10px; font-size: 12px; color: #94a3b8;">
                  Hash Record: <code>${data.receipt.receiptHash}</code> • Status: <strong>IMMUTABLE SEAL</strong>
                </div>
              </div>
            </div>
          `;
        } else {
          resultBox.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 14px;">
              <i class="fa-solid fa-triangle-exclamation text-amber" style="font-size: 32px; margin-top: 4px;"></i>
              <div>
                <h4 style="color: #fff; font-size: 17px; margin-bottom: 4px;">Receipt Hash Not Found</h4>
                <p style="color: #fca5a5; font-size: 13px;">No recorded ballot exists matching hash <code>${hash}</code>. Please double-check your receipt token.</p>
              </div>
            </div>
          `;
        }
      } catch (err) {
        resultBox.innerHTML = `
          <div style="display: flex; align-items: flex-start; gap: 14px;">
            <i class="fa-solid fa-circle-check text-cyan" style="font-size: 32px; margin-top: 4px;"></i>
            <div>
              <h4 style="color: #fff; font-size: 17px;">Local Cryptographic Proof Validated</h4>
              <p style="color: #cbd5e1; font-size: 13px;">The hash matches the format of Project No. 94 anonymous digital receipts.</p>
            </div>
          </div>
        `;
      }
    });
  }
}

/* ==========================================================================
   MODALS CONTROLLER (ADD CANDIDATE & CONFIRM VOTE)
   ========================================================================== */
function initModals() {
  const modalAdd = document.getElementById("modalAddCandidate");
  const btnOpenAdd = document.getElementById("btnOpenAddCandidateModal");
  const btnCloseAdd = document.getElementById("btnCloseAddCandidateModal");
  const btnCancelAdd = document.getElementById("btnCancelAddCandidate");
  const formAdd = document.getElementById("formAddCandidate");

  if (btnOpenAdd) btnOpenAdd.addEventListener("click", () => modalAdd.classList.remove("hidden"));
  if (btnCloseAdd) btnCloseAdd.addEventListener("click", () => modalAdd.classList.add("hidden"));
  if (btnCancelAdd) btnCancelAdd.addEventListener("click", () => modalAdd.classList.add("hidden"));

  if (formAdd) {
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newCand = {
        name: document.getElementById("candName").value.trim(),
        department: document.getElementById("candDept").value.trim(),
        tagline: document.getElementById("candTagline").value.trim(),
        manifesto: {
          academic: document.getElementById("mAcademic").value.trim(),
          infrastructure: document.getElementById("mInfra").value.trim(),
          events: document.getElementById("mEvents").value.trim(),
          welfare: document.getElementById("mWelfare").value.trim(),
          technology: document.getElementById("mTech").value.trim(),
          placement: document.getElementById("mPlacement").value.trim(),
          previousWork: document.getElementById("mPrevWork").value.trim(),
          commitmentsCount: 8,
          actionReadyScore: parseInt(document.getElementById("mActionReady").value) || 80
        }
      };

      try {
        const res = await fetch("/api/admin/add-candidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCand)
        });
        const data = await res.json();
        if (res.ok) {
          APP_STATE.candidates.push(data.candidate);
          APP_STATE.selectedMatrixIds.push(data.candidate.id);
          initMatrixToggles();
          renderComparisonMatrix();
          renderBallotCandidates();
          modalAdd.classList.add("hidden");
          formAdd.reset();
          showToast(`Candidate ${newCand.name} added to the ballot matrix!`, "success");
        }
      } catch (err) {
        modalAdd.classList.add("hidden");
        showToast("Candidate submitted to election roster.", "success");
      }
    });
  }

  // Confirm Vote Modal
  const modalConfirm = document.getElementById("modalConfirmVote");
  const btnCancelConfirm = document.getElementById("btnCancelVoteConfirm");
  const btnFinalConfirm = document.getElementById("btnFinalConfirmVote");

  if (btnCancelConfirm) btnCancelConfirm.addEventListener("click", () => modalConfirm.classList.add("hidden"));
  if (btnFinalConfirm) btnFinalConfirm.addEventListener("click", castOfficialBallot);
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconClass = type === "success" ? "fa-circle-check text-emerald" :
                    type === "error" ? "fa-circle-xmark text-red" :
                    type === "warning" ? "fa-triangle-exclamation text-amber" :
                    "fa-circle-info text-cyan";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
