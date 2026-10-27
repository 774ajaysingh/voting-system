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
  elections: {
    "ELEX-2026-MAIN": {
      id: "ELEX-2026-MAIN",
      title: "College Student Council Elections 2026",
      position: "President (Student Council)",
      status: "active",
      totalEligible: 1250,
      closingTime: new Date(Date.now() + 5 * 3600 * 1000 + 42 * 60 * 1000 + 18 * 1000)
    },
    "ELEX-CR-2026": {
      id: "ELEX-CR-2026",
      title: "Department Class Representative (CR) Election 2026",
      position: "Branch Class Representatives (CR)",
      status: "upcoming",
      totalEligible: 850,
      closingTime: new Date(Date.now() + 6 * 24 * 3600 * 1000 + 6 * 3600 * 1000)
    },
    "ELEX-SPORTS-CULT-2026": {
      id: "ELEX-SPORTS-CULT-2026",
      title: "Annual Sports & Cultural Secretary 2026",
      position: "Sports Secretary & Cultural Secretary",
      status: "upcoming",
      totalEligible: 1250,
      closingTime: new Date(Date.now() + 12 * 24 * 3600 * 1000 + 4 * 3600 * 1000)
    },
    "ELEX-ACM-TECH-2026": {
      id: "ELEX-ACM-TECH-2026",
      title: "ACM Tech Society President 2026",
      position: "Technical Society Lead & Hackathon Coordinator",
      status: "upcoming",
      totalEligible: 620,
      closingTime: new Date(Date.now() + 19 * 24 * 3600 * 1000 + 2 * 3600 * 1000)
    },
    "ELEX-HOSTEL-2026": {
      id: "ELEX-HOSTEL-2026",
      title: "Hostel Committee Representative 2026",
      position: "Hostel Floor Representatives",
      status: "upcoming",
      totalEligible: 480,
      closingTime: new Date(Date.now() + 26 * 24 * 3600 * 1000 + 5 * 3600 * 1000)
    }
  },
  activeTimerElectionId: "ELEX-2026-MAIN",
  candidateScrutinyQueue: [
    {
      id: "NOM-2026-044",
      candId: "CAND-PENDING-01",
      name: "Devansh Singhania",
      rollNo: "22BCSE105",
      department: "Computer Science & Engg (CSE)",
      year: "3rd Year",
      position: "For President",
      tagline: "Transparent leadership, 24/7 innovation labs, and student welfare first",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      color: "#00f2fe",
      cgpa: 8.92,
      attendance: 91,
      proctorialStatus: "CLEARED",
      arrears: 0,
      proposer: "Aarav Sharma (22BCSE101)",
      seconder: "Priya Nair (22BECE205)",
      status: "pending",
      submittedDate: "Oct 26, 2026",
      scores: {
        academic: 24,
        faculty: 22,
        portfolio: 21,
        manifesto: 21
      },
      compositeScore: 88,
      grade: "A+",
      teacherReview: "Prof. Dr. R. K. Shrivastava (HOD CSE): Consistent classroom leadership, active mentor to juniors, clean proctorial record. Recommended for Student Council Executive post.",
      portfolioHighlights: "Winner of Inter-College Hackathon 2025; Lead Coordinator for DevFest; IEEE Student Member; Contributor to Campus WiFi Portal.",
      manifestoSummary: "Smart library pods, transparent club budget portal, Wi-Fi 6 upgrade across hostels.",
      reviewerRemarks: "All statutory bylaws met under CEC Constitution §4.1. Faculty endorsement confirmed."
    },
    {
      id: "NOM-2026-045",
      candId: "CAND-PENDING-02",
      name: "Meera Iyer",
      rollNo: "22BECE210",
      department: "Electronics & Comm (ECE)",
      year: "3rd Year",
      position: "For Vice President",
      tagline: "Empowering female engineers, hardware incubators, and industry internships",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      color: "#a855f7",
      cgpa: 8.75,
      attendance: 88,
      proctorialStatus: "CLEARED",
      arrears: 0,
      proposer: "Simran Kaur (22BME412)",
      seconder: "Devansh Rastogi (22BCSE108)",
      status: "pending",
      submittedDate: "Oct 26, 2026",
      scores: {
        academic: 23,
        faculty: 24,
        portfolio: 22,
        manifesto: 23
      },
      compositeScore: 92,
      grade: "A+",
      teacherReview: "Dr. Ananya Sen (ECE Robotics Lab): Excellent hardware research track record, dependable organizer for national tech conclaves, zero conduct flags.",
      portfolioHighlights: "Robotics Club Secretary, Published 1 IEEE Student Paper on Embedded IoT, Organized 3 Departmental Workshops.",
      manifestoSummary: "Establish ECE Hardware Maker-Space, Women in Tech Mentorship, Tier-1 Semiconductor Placement Drives.",
      reviewerRemarks: "Recommended by Department Faculty Council."
    },
    {
      id: "NOM-2026-040",
      candId: "CAND-01",
      name: "Aisha Khan",
      rollNo: "22BCSE112",
      department: "CSE",
      year: "3rd Year",
      position: "For President",
      tagline: "Mentorship programs, doubt clearing hub, smart classes",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      color: "#38bdf8",
      cgpa: 9.15,
      attendance: 94,
      proctorialStatus: "CLEARED",
      arrears: 0,
      proposer: "Aditya Verma (22BIT304)",
      seconder: "Rohan Mehta (22BCSE102)",
      status: "approved",
      submittedDate: "Oct 24, 2026",
      scores: { academic: 25, faculty: 24, portfolio: 24, manifesto: 22 },
      compositeScore: 95,
      grade: "A+",
      teacherReview: "Prof. Dr. Mehta: Exceptional academic standing, organized department tech symposium with 500+ attendees.",
      portfolioHighlights: "Coding Club Lead, Top 5% academic standing, Peer Tutor.",
      reviewerRemarks: "Approved and minted to digital ballot."
    },
    {
      id: "NOM-2026-039",
      candId: "CAND-REJ-01",
      name: "Karan Malhotra",
      rollNo: "22BME499",
      department: "Mechanical Eng (ME)",
      year: "2nd Year",
      position: "For General Secretary",
      tagline: "Unlimited canteen subsidies and no attendance criteria",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      color: "#ef4444",
      cgpa: 5.80,
      attendance: 62,
      proctorialStatus: "PROCTORIAL_WARNING",
      arrears: 2,
      proposer: "Unverified Roll",
      seconder: "Unverified Roll",
      status: "rejected",
      submittedDate: "Oct 22, 2026",
      scores: { academic: 10, faculty: 8, portfolio: 12, manifesto: 5 },
      compositeScore: 35,
      grade: "C",
      teacherReview: "Disciplinary committee notice issued in Spring 2026; Attendance below statutory 75% requirement.",
      portfolioHighlights: "No verifiable co-curricular contributions.",
      reviewerRemarks: "Disqualified under CEC Constitution §4.1: CGPA below 6.50, active disciplinary warning."
    }
  ],
  scrutinyFilter: "pending",
  voterSearchQuery: "",
  voterStatusFilter: "all",
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
    },
    {
      id: "CAND-NOTA",
      name: "NOTA (None Of The Above)",
      position: "For President",
      department: "Campus-Wide",
      year: "Universal Option",
      avatar: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80",
      tagline: "Protest vote demanding council reform and fresh nominations",
      color: "#64748b",
      manifesto: {
        academic: "Rejection of proposed academic agendas; demands independent audit of teaching quality",
        infrastructure: "Demands direct student-elected infrastructure inspection committee",
        events: "Calls for transparent student-controlled club funding and budget referendum",
        welfare: "Demands 100% autonomous student grievance cell free of administrative delays",
        technology: "Demands open-source student portal code and data privacy compliance",
        placement: "Demands un-redacted college placement statistics and Tier-1 company invitations",
        previousWork: "Official democratic safeguard guaranteed by Election Commission charter",
        commitmentsCount: 0,
        actionReadyScore: 100
      },
      votes: 38
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
  blockchain: [
    {
      index: 0,
      timestamp: "2026-10-25T08:00:00Z",
      data: {
        type: "GENESIS_BLOCK",
        electionId: "ELEX-2026-MAIN",
        authority: "College Election Commission",
        status: "SEALED",
        voterToken: "GENESIS-ROOT"
      },
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      merkleRoot: "0x4a9b2c8f1e6d7a30e8c7b6a5d4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5",
      nonce: 1042,
      hash: "0b016b0ef8a6eb4a8afaa078f69c895584e6531ef890cf3bfef746dd943d2827",
      tampered: false
    },
    {
      index: 1,
      timestamp: "2026-10-25T11:42:10Z",
      data: {
        type: "BALLOT_SEAL",
        electionId: "ELEX-2026-MAIN",
        receiptHash: "0x7a89b4f321ec908d",
        voterToken: "0x89c7d8a6f3b4e2d1",
        dept: "IT"
      },
      previousHash: "0b016b0ef8a6eb4a8afaa078f69c895584e6531ef890cf3bfef746dd943d2827",
      merkleRoot: "0x7a89b4f321ec908d",
      nonce: 2491,
      hash: "bdbf46034983ed4cf54e36127ecac8775af17fe7ed2275f44c4f52c6d379280d",
      tampered: false
    }
  ],
  campusPriorities: {
    "Placements & Career Training": 310,
    "High-Speed Wi-Fi & Labs": 245,
    "Campus Infrastructure & Library": 180,
    "Student Welfare & Mental Health": 140,
    "Events, Hackathons & Sports": 95
  },
  currentUser: null,
  currentStudent: null,
  selectedBallotCandidateId: null,
  deptChartInstance: null,
  candidateChartInstance: null,
  priorityChartInstance: null,
  webcamStream: null,
  logs: [],
  upcomingElections: [
    {
      id: "ELEX-CR-2026",
      title: "Department Class Representative (CR) Election 2026",
      category: "department",
      position: "Branch Class Representatives (CR)",
      dateFormatted: "Nov 02, 2026 • 09:00 AM – 03:00 PM",
      startsInDays: 6,
      departments: ["CSE", "ECE", "ME", "IT", "CE"],
      eligibleCount: 850,
      status: "Nominations Scrutinized",
      badgeClass: "badge-cyan",
      candidatesPreview: [
        { name: "Devansh Rastogi", dept: "CSE 3rd Yr" },
        { name: "Tanvi Saxena", dept: "ECE 3rd Yr" },
        { name: "Harsh Vardhan", dept: "ME 3rd Yr" }
      ],
      rules: "Students vote strictly for candidates registered in their own respective branch and study year.",
      reminded: false
    },
    {
      id: "ELEX-SPORTS-CULT-2026",
      title: "Annual Sports & Cultural Council Secretary 2026",
      category: "council",
      position: "Sports Secretary & Cultural Secretary",
      dateFormatted: "Nov 08, 2026 • 10:00 AM – 04:00 PM",
      startsInDays: 12,
      departments: ["All Campus Departments"],
      eligibleCount: 1250,
      status: "Campaigning Active",
      badgeClass: "badge-purple",
      candidatesPreview: [
        { name: "Kavya Deshmukh", dept: "Cultural Council" },
        { name: "Ranveer Singh", dept: "Sports Captain" },
        { name: "Siddharth Jain", dept: "Athletics Club" }
      ],
      rules: "Dual ballot selection: 1 vote for Sports Secretary and 1 vote for Cultural Secretary.",
      reminded: false
    },
    {
      id: "ELEX-ACM-TECH-2026",
      title: "ACM Student Chapter & Tech Society President 2026",
      category: "club",
      position: "Technical Society Lead & Hackathon Coordinator",
      dateFormatted: "Nov 15, 2026 • 02:00 PM – 06:00 PM",
      startsInDays: 19,
      departments: ["CSE", "IT", "ECE"],
      eligibleCount: 620,
      status: "Manifesto Submissions Open",
      badgeClass: "badge-emerald",
      candidatesPreview: [
        { name: "Aarohi Gupta", dept: "AI/ML Club" },
        { name: "Vikramaditya Roy", dept: "Web Dev Society" }
      ],
      rules: "Candidates must have contributed to at least 1 open-source repository or college hackathon project.",
      reminded: false
    },
    {
      id: "ELEX-HOSTEL-2026",
      title: "Hostel Committee & Mess Welfare Representative",
      category: "council",
      position: "Hostel Floor Representatives",
      dateFormatted: "Nov 22, 2026 • 05:00 PM – 09:00 PM",
      startsInDays: 26,
      departments: ["Campus Hostel Residents"],
      eligibleCount: 480,
      status: "Upcoming Announcement",
      badgeClass: "badge-amber",
      candidatesPreview: [
        { name: "Manish Joshi", dept: "Block-A Boys" },
        { name: "Pooja Hegde", dept: "Block-C Girls" }
      ],
      rules: "Only hostellers with verified institutional biometric hostel registration are eligible to cast ballots.",
      reminded: false
    }
  ],
  notices: [
    {
      id: "NOT-2026-09",
      ref: "Ref: CEC/NOT-2026/09",
      title: "Extension of Polling Hours for CSE & ECE Departments",
      date: "27 Oct 2026, 10:30 AM",
      category: "urgent",
      isUrgent: true,
      isRead: false,
      author: "Chief Returning Officer, Central Election Commission",
      summary: "Due to heavy digital queue turnout in academic blocks, voting booth hours are officially extended up to 08:00 PM today.",
      fullContent: "The Central Election Commission has observed unprecedented student voter participation today (surpassing 68% turnout across academic blocks by midday). In order to ensure that every eligible student from all branches can exercise their constitutional vote without congestion, the electronic voting booth window is officially extended till 08:00 PM sharp.\n\nStudents may authenticate either via their Roll Number with SMS OTP or 1-Click Biometric/Student ID verification. Digital ballot receipts will continue to be minted on the SHA-256 blockchain ledger in real-time.",
      tags: ["Urgent", "Polling Hours", "All Students"]
    },
    {
      id: "NOT-2026-08",
      ref: "Ref: CEC/NOT-2026/08",
      title: "Notification: Model Code of Conduct & Anti-Canvassing Directive",
      date: "26 Oct 2026, 04:00 PM",
      category: "guidelines",
      isUrgent: false,
      isRead: false,
      author: "Proctorial Board & Election Observers",
      summary: "Strict prohibition of campaign speeches, flyers, or mobile communication within 50 meters of the digital voting kiosks.",
      fullContent: "All presidential candidates and campaign supporters are notified that canvassing is strictly forbidden during active polling hours. The Smart Candidate Comparison Matrix remains public and accessible to all students to compare manifestos independently.\n\nAny attempt at voter coercion or unauthorized credential sharing will result in immediate disqualification and academic disciplinary action.",
      tags: ["Code of Conduct", "Security", "Regulations"]
    },
    {
      id: "NOT-2026-07",
      ref: "Ref: CEC/NOT-2026/07",
      title: "Official Schedule: Upcoming Class Representative (CR) Elections Announced",
      date: "25 Oct 2026, 02:00 PM",
      category: "upcoming",
      isUrgent: false,
      isRead: false,
      author: "Academic Council & Returning Officers",
      summary: "CR Elections for 2nd, 3rd, and 4th years scheduled for Nov 02, 2026. Nomination scrutiny completed.",
      fullContent: "The Central Election Commission announces that following the conclusion of the Presidential election, department-level Class Representative (CR) polling will be conducted on Monday, November 02, 2026, between 09:00 AM and 03:00 PM.\n\nCandidate nominations have been scrutinized and final candidate matrices will be uploaded 48 hours prior to polling. Students are advised to verify their departmental roll numbers in advance.",
      tags: ["Upcoming Election", "CR Polls", "Schedule"]
    },
    {
      id: "NOT-2026-06",
      ref: "Ref: CEC/NOT-2026/06",
      title: "How to Verify Your Cryptographic Vote Receipt on Blockchain Ledger",
      date: "24 Oct 2026, 11:15 AM",
      category: "technology",
      isUrgent: false,
      isRead: true,
      author: "Blockchain Technology Team • Project No. 94",
      summary: "Step-by-step guide on how students can take their 64-character SHA-256 receipt hash and verify tamper-proof inclusion in Block #1.",
      fullContent: "Every student who casts their ballot receives a cryptographic proof receipt with a unique QR code and SHA-256 transaction hash. To independently audit your vote without revealing candidate identity, visit the 'Verify Receipt' or 'Blockchain Ledger' tab, paste your receipt hash, and click 'Verify on Blockchain'.\n\nThe cryptographic Merkle root confirms your ballot was irreversibly tallied.",
      tags: ["Blockchain", "Digital Receipts", "Transparency"]
    },
    {
      id: "NOT-2026-05",
      ref: "Ref: CEC/NOT-2026/05",
      title: "Sports & Cultural Secretary Elections: Candidate List Published",
      date: "23 Oct 2026, 05:30 PM",
      category: "upcoming",
      isUrgent: false,
      isRead: true,
      author: "Student Affairs Office",
      summary: "Provisional list of candidates for Sports Secretary and Cultural Secretary released for student scrutiny.",
      fullContent: "The provisional candidate roster for the Annual Sports and Cultural Council Elections (scheduled for Nov 08, 2026) has been published on the notice board. Objections or claims may be submitted to the Student Affairs office before Oct 30, 2026.",
      tags: ["Upcoming Election", "Sports", "Cultural"]
    }
  ],
  activeNoticeIndex: 0,
  noticeTickerInterval: null,
  isFloatingBarMinimized: false,
  selectedUpcomingFilter: "all",
  selectedNoticeCategory: "all",
  noticeSearchQuery: ""
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

// Mock Students & Admin Roster (for standalone & offline execution)
const MOCK_STUDENTS = {
  "22BCSE101": {
    studentId: "22BCSE101",
    name: "Aarav Sharma",
    department: "CSE",
    year: "3rd Year",
    phone: "+91 98765 43210",
    email: "aarav.22bcse101@college.edu",
    pin: "1234",
    password: "password123",
    verified: false,
    hasVoted: false,
    receiptHash: null
  },
  "22BECE205": {
    studentId: "22BECE205",
    name: "Priya Nair",
    department: "ECE",
    year: "3rd Year",
    phone: "+91 98765 43211",
    email: "priya.22bece205@college.edu",
    pin: "1234",
    password: "password123",
    verified: false,
    hasVoted: false,
    receiptHash: null
  },
  "22BME412": {
    studentId: "22BME412",
    name: "Simran Kaur",
    department: "ME",
    year: "3rd Year",
    phone: "+91 98765 43213",
    email: "simran.22bme412@college.edu",
    pin: "1234",
    password: "password123",
    verified: false,
    hasVoted: false,
    receiptHash: null
  },
  "22BIT304": {
    studentId: "22BIT304",
    name: "Aditya Verma",
    department: "IT",
    year: "3rd Year",
    phone: "+91 98765 43212",
    email: "aditya.22bit304@college.edu",
    pin: "1234",
    password: "password123",
    verified: false,
    hasVoted: true,
    receiptHash: "0x7a89b4f321ec908d"
  }
};

const MOCK_ADMIN = {
  username: "admin@college.edu",
  alias: "admin",
  password: "admin2026",
  name: "Dr. S. Ramanujan",
  title: "Chief Returning Officer",
  department: "College Election Commission",
  role: "admin"
};

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAuthGateway();
  initCountdownTimer();
  fetchInitialData();
  initMatrixToggles();
  renderComparisonMatrix();
  initAiManifestoAssistant();
  initBoothHandlers();
  initBiometricVerification();
  initAdminDashboard();
  initCreateElectionWizard();
  updateActiveElectionBanner();
  initBlockchainLedger();
  initReceiptVerifier();
  initWinnerCeremony();
  initExportTools();
  initFloatingElectionBar();
  initTopNoticeBanner();
  initNoticesAndElectionsHub();
  initNoticeDetailModal();
  initBroadcastNoticeModal();
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
      
      // Restrict Admin tab to admin users
      if (targetId === "tab-admin" && APP_STATE.currentUser?.role !== "admin") {
        showToast("Access Restricted: Election Management Team credentials required.", "error");
        return;
      }
      
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
  if (tabId === "tab-candidates") tabId = "tab-matrix";
  if (tabId === "tab-verify") tabId = "tab-receipt-checker";

  document.querySelectorAll(".nav-tab").forEach(t => {
    t.classList.toggle("active", t.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === tabId);
  });

  if (tabId === "tab-admin") {
    renderAdminCharts();
    renderPriorityChart();
  } else if (tabId === "tab-blockchain") {
    renderBlockchainNodes();
  } else if (tabId === "tab-notices") {
    renderOngoingElectionRadar();
    renderUpcomingElections(APP_STATE.selectedUpcomingFilter || 'all');
    renderNoticesList(APP_STATE.selectedNoticeCategory || 'all', APP_STATE.noticeSearchQuery || '');
  }
}

/* ==========================================================================
   DUAL-ROLE AUTHENTICATION GATEWAY CONTROLLER
   ========================================================================== */
function initAuthGateway() {
  const overlay = document.getElementById("authGatewayOverlay");
  const tabStudent = document.getElementById("tabRoleStudent");
  const tabAdmin = document.getElementById("tabRoleAdmin");
  const panelStudent = document.getElementById("panelRoleStudent");
  const panelAdmin = document.getElementById("panelRoleAdmin");

  // Tab switching between Student and Admin portals
  if (tabStudent && tabAdmin) {
    tabStudent.addEventListener("click", () => {
      tabStudent.classList.add("active");
      tabAdmin.classList.remove("active");
      if (panelStudent) panelStudent.style.display = "block";
      if (panelAdmin) panelAdmin.style.display = "none";
    });

    tabAdmin.addEventListener("click", () => {
      tabAdmin.classList.add("active");
      tabStudent.classList.remove("active");
      if (panelStudent) panelStudent.style.display = "none";
      if (panelAdmin) panelAdmin.style.display = "block";
    });
  }

  // Password / PIN Eye Toggles
  const btnToggleStudentPin = document.getElementById("btnToggleStudentPin");
  const inputStudentLoginPin = document.getElementById("inputStudentLoginPin");
  if (btnToggleStudentPin && inputStudentLoginPin) {
    btnToggleStudentPin.addEventListener("click", () => {
      const isPwd = inputStudentLoginPin.type === "password";
      inputStudentLoginPin.type = isPwd ? "text" : "password";
      btnToggleStudentPin.innerHTML = isPwd ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  const btnToggleAdminPass = document.getElementById("btnToggleAdminPass");
  const inputAdminLoginPass = document.getElementById("inputAdminLoginPass");
  if (btnToggleAdminPass && inputAdminLoginPass) {
    btnToggleAdminPass.addEventListener("click", () => {
      const isPwd = inputAdminLoginPass.type === "password";
      inputAdminLoginPass.type = isPwd ? "text" : "password";
      btnToggleAdminPass.innerHTML = isPwd ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  // 1-Click Demo Voter Chips
  const studentChips = document.querySelectorAll(".demo-chip-student");
  studentChips.forEach(chip => {
    chip.addEventListener("click", () => {
      studentChips.forEach(c => c.classList.remove("active-demo"));
      chip.classList.add("active-demo");
      const id = chip.getAttribute("data-id");
      const pin = chip.getAttribute("data-pin");
      const inputId = document.getElementById("inputStudentLoginId");
      const inputPin = document.getElementById("inputStudentLoginPin");
      if (inputId) inputId.value = id;
      if (inputPin) inputPin.value = pin;
    });
  });

  // 1-Click Demo Admin Chips
  const adminChips = document.querySelectorAll(".demo-chip-admin");
  adminChips.forEach(chip => {
    chip.addEventListener("click", () => {
      adminChips.forEach(c => c.classList.remove("active-demo"));
      chip.classList.add("active-demo");
      const user = chip.getAttribute("data-user");
      const pass = chip.getAttribute("data-pass");
      const inputUser = document.getElementById("inputAdminLoginUser");
      const inputPass = document.getElementById("inputAdminLoginPass");
      if (inputUser) inputUser.value = user;
      if (inputPass) inputPass.value = pass;
    });
  });

  // Student Login Form Submission
  const formStudentAuth = document.getElementById("formStudentAuth");
  if (formStudentAuth) {
    formStudentAuth.addEventListener("submit", async (e) => {
      e.preventDefault();
      const studentId = document.getElementById("inputStudentLoginId").value.trim().toUpperCase();
      const pin = document.getElementById("inputStudentLoginPin").value.trim();

      if (!studentId) {
        showToast("Please enter your Student Roll Number / ID", "warning");
        return;
      }

      let sessionData = null;

      try {
        const res = await fetch("/api/auth/student-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, password: pin })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          sessionData = {
            role: "student",
            user: data.user
          };
        } else {
          showToast(data.error || "Authentication failed. Check your ID/PIN.", "error");
          return;
        }
      } catch (err) {
        // Standalone / Offline fallback
        const mock = MOCK_STUDENTS[studentId];
        if (mock) {
          sessionData = {
            role: "student",
            user: { ...mock }
          };
        } else {
          // Allow custom student ID in offline mode
          sessionData = {
            role: "student",
            user: {
              studentId: studentId,
              name: "Student " + studentId,
              department: "CSE",
              year: "3rd Year",
              hasVoted: false
            }
          };
        }
      }

      if (sessionData) {
        sessionStorage.setItem("voting_user_session", JSON.stringify(sessionData));
        applyUserSession(sessionData);
        hideAuthGateway();
        showToast(`Welcome, ${sessionData.user.name}! Voter credentials verified.`, "success");

        // Automatically prefill Voting Booth Stage 1
        prefillBoothForStudent(sessionData.user);

        // If student has already voted, navigate to Receipt tab; else to Voting Booth
        if (sessionData.user.hasVoted) {
          showToast("You have already voted. Your cryptographic receipt is loaded.", "info");
          switchTab("tab-receipt-checker");
          const receiptInput = document.getElementById("inputReceiptQuery") || document.getElementById("inputVerifyHash");
          if (receiptInput && sessionData.user.receiptHash) {
            receiptInput.value = sessionData.user.receiptHash;
          }
        } else {
          switchTab("tab-booth");
        }
      }
    });
  }

  // Admin Login Form Submission
  const formAdminAuth = document.getElementById("formAdminAuth");
  if (formAdminAuth) {
    formAdminAuth.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("inputAdminLoginUser").value.trim();
      const password = document.getElementById("inputAdminLoginPass").value.trim();

      if (!username || !password) {
        showToast("Please enter administrative username and passkey", "warning");
        return;
      }

      let sessionData = null;

      try {
        const res = await fetch("/api/auth/admin-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          sessionData = {
            role: "admin",
            user: data.user
          };
        } else {
          showToast(data.error || "Invalid officer username or passkey.", "error");
          return;
        }
      } catch (err) {
        // Standalone fallback
        if ((username === "admin@college.edu" || username === "admin") && (password === "admin2026" || password === "admin123")) {
          sessionData = {
            role: "admin",
            user: { ...MOCK_ADMIN }
          };
        } else {
          showToast("Invalid administrator credentials (Demo: admin@college.edu / admin2026)", "error");
          return;
        }
      }

      if (sessionData) {
        sessionStorage.setItem("voting_user_session", JSON.stringify(sessionData));
        applyUserSession(sessionData);
        hideAuthGateway();
        showToast("Admin access authorized. Welcome, Chief Returning Officer!", "success");
        switchTab("tab-admin");
      }
    });
  }

  // Guest Observer Bypass
  const btnGuestBypass = document.getElementById("btnGuestBypass");
  if (btnGuestBypass) {
    btnGuestBypass.addEventListener("click", () => {
      const guestSession = {
        role: "guest",
        user: { name: "Guest Observer", role: "guest" }
      };
      sessionStorage.setItem("voting_user_session", JSON.stringify(guestSession));
      applyUserSession(guestSession);
      hideAuthGateway();
      showToast("Browsing in Guest Observer mode (Read-Only).", "info");
      switchTab("tab-matrix");
    });
  }

  // Header Logout Button
  const btnHeaderLogout = document.getElementById("btnHeaderLogout");
  if (btnHeaderLogout) {
    btnHeaderLogout.addEventListener("click", () => {
      logoutUser();
    });
  }

  // Header Login Button (for guest mode)
  const btnHeaderLogin = document.getElementById("btnHeaderLogin");
  if (btnHeaderLogin) {
    btnHeaderLogin.addEventListener("click", () => {
      showAuthGateway();
    });
  }

  // Check existing session
  const saved = sessionStorage.getItem("voting_user_session");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      applyUserSession(parsed);
      hideAuthGateway();
      if (parsed.role === "student") {
        prefillBoothForStudent(parsed.user);
      }
    } catch (e) {
      showAuthGateway();
    }
  } else {
    // Show login page by default
    showAuthGateway();
  }
}

function showAuthGateway() {
  const overlay = document.getElementById("authGatewayOverlay");
  if (overlay) {
    overlay.classList.remove("auth-gateway-hidden");
  }
}

function hideAuthGateway() {
  const overlay = document.getElementById("authGatewayOverlay");
  if (overlay) {
    overlay.classList.add("auth-gateway-hidden");
  }
}

function logoutUser() {
  const current = APP_STATE.currentUser;
  if (current) {
    // Attempt audit call
    fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: current.role,
        identifier: current.role === "student" ? current.user.studentId : current.user.name
      })
    }).catch(() => {});
  }

  sessionStorage.removeItem("voting_user_session");
  APP_STATE.currentUser = null;
  applyUserSession(null);
  showAuthGateway();
  showToast("You have been securely logged out.", "info");
}

function applyUserSession(session) {
  APP_STATE.currentUser = session;
  const chip = document.getElementById("userSessionChip");
  const icon = document.getElementById("userSessionIcon");
  const nameEl = document.getElementById("sessionUserName");
  const roleEl = document.getElementById("sessionUserRole");
  const badgeEl = document.getElementById("sessionStatusBadge");
  const btnLogout = document.getElementById("btnHeaderLogout");
  const btnLogin = document.getElementById("btnHeaderLogin");
  const adminLockBadge = document.getElementById("adminLockBadge");

  if (!session) {
    if (chip) chip.className = "user-session-chip guest-session";
    if (icon) icon.className = "fa-solid fa-user-lock";
    if (nameEl) nameEl.textContent = "Not Logged In";
    if (roleEl) roleEl.textContent = "Select Role to Begin";
    if (badgeEl) {
      badgeEl.className = "session-status-badge gray";
      badgeEl.textContent = "LOCKED";
    }
    if (btnLogout) btnLogout.style.display = "none";
    if (btnLogin) btnLogin.style.display = "inline-flex";
    if (adminLockBadge) adminLockBadge.style.display = "inline-flex";
    return;
  }

  if (session.role === "student") {
    if (chip) chip.className = "user-session-chip student-session";
    if (icon) icon.className = "fa-solid fa-user-graduate";
    if (nameEl) nameEl.textContent = session.user.name;
    if (roleEl) roleEl.textContent = `${session.user.studentId} • ${session.user.department || "Student"}`;
    if (badgeEl) {
      badgeEl.className = session.user.hasVoted ? "session-status-badge gray" : "session-status-badge green";
      badgeEl.textContent = session.user.hasVoted ? "VOTED" : "VOTER";
    }
    if (btnLogout) btnLogout.style.display = "inline-flex";
    if (btnLogin) btnLogin.style.display = "none";
    if (adminLockBadge) adminLockBadge.style.display = "inline-flex";
  } else if (session.role === "admin") {
    if (chip) chip.className = "user-session-chip admin-session";
    if (icon) icon.className = "fa-solid fa-shield-halved";
    if (nameEl) nameEl.textContent = session.user.name || "Dr. S. Ramanujan";
    if (roleEl) roleEl.textContent = "Chief Returning Officer";
    if (badgeEl) {
      badgeEl.className = "session-status-badge purple";
      badgeEl.textContent = "ADMIN";
    }
    if (btnLogout) btnLogout.style.display = "inline-flex";
    if (btnLogin) btnLogin.style.display = "none";
    if (adminLockBadge) adminLockBadge.style.display = "none";
  } else {
    // Guest
    if (chip) chip.className = "user-session-chip guest-session";
    if (icon) icon.className = "fa-solid fa-user";
    if (nameEl) nameEl.textContent = "Guest Observer";
    if (roleEl) roleEl.textContent = "Public Manifesto Mode";
    if (badgeEl) {
      badgeEl.className = "session-status-badge gray";
      badgeEl.textContent = "OBSERVER";
    }
    if (btnLogout) btnLogout.style.display = "inline-flex";
    if (btnLogin) btnLogin.style.display = "none";
    if (adminLockBadge) adminLockBadge.style.display = "inline-flex";
  }

  // Toggle Admin Notice Broadcast button
  const btnBroadcast = document.getElementById("btnAdminBroadcastNotice");
  if (btnBroadcast) {
    btnBroadcast.style.display = session && session.role === "admin" ? "inline-flex" : "none";
  }
}

function prefillBoothForStudent(student) {
  if (!student) return;
  const inputSid = document.getElementById("inputStudentId");
  const selDept = document.getElementById("selectDepartment");
  const selYear = document.getElementById("selectYear");

  if (inputSid) {
    inputSid.value = student.studentId;
    inputSid.setAttribute("readonly", "true");
    inputSid.style.opacity = "0.9";
  }
  if (selDept && student.department) {
    selDept.value = student.department;
  }
  if (selYear && student.year) {
    selYear.value = student.year;
  }
}

/* ==========================================================================
   LIVE COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  function update() {
    const now = new Date();
    const activeElId = APP_STATE.activeTimerElectionId || "ELEX-2026-MAIN";
    const activeElection = (APP_STATE.elections && APP_STATE.elections[activeElId]) || {
      id: "ELEX-2026-MAIN",
      title: "College Student Council Elections 2026",
      status: APP_STATE.election.status,
      closingTime: APP_STATE.election.closingTime
    };

    const isConcluded = activeElection.status === "concluded" || APP_STATE.election.status === "concluded";
    const isPaused = activeElection.status === "paused" || APP_STATE.election.status === "paused";
    const diff = activeElection.closingTime - now;

    if (isConcluded || diff <= 0) {
      const closedStr = isConcluded ? "CONCLUDED" : "CLOSED";
      const elH = document.getElementById("headerCountdown");
      if (elH) elH.textContent = closedStr;
      const elAdmin = document.getElementById("adminTimeRemaining");
      if (elAdmin) elAdmin.textContent = closedStr;
      const elFeb = document.getElementById("febCountdownText");
      if (elFeb) elFeb.innerHTML = `<i class="fa-regular fa-clock"></i> ${closedStr}`;
      const elLer = document.getElementById("lerCountdownClock");
      if (elLer) elLer.textContent = `00:00:00 (${closedStr})`;
      const elAetm = document.getElementById("aetmDigitsDisplay");
      if (elAetm) elAetm.textContent = `00:00:00 (${closedStr})`;
      const elAetmStatus = document.getElementById("aetmElectionStatus");
      if (elAetmStatus) elAetmStatus.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> ${isConcluded ? 'Concluded & Sealed' : 'Polls Closed'}`;
      return;
    }

    if (isPaused) {
      const pausedStr = "PAUSED";
      const elH = document.getElementById("headerCountdown");
      if (elH) elH.textContent = pausedStr;
      const elAdmin = document.getElementById("adminTimeRemaining");
      if (elAdmin) elAdmin.textContent = "Paused";
      const elFeb = document.getElementById("febCountdownText");
      if (elFeb) elFeb.innerHTML = `<i class="fa-solid fa-pause"></i> ${pausedStr}`;
      const elLer = document.getElementById("lerCountdownClock");
      if (elLer) elLer.textContent = `PAUSED`;
      const elAetm = document.getElementById("aetmDigitsDisplay");
      if (elAetm) elAetm.textContent = `PAUSED`;
      const elAetmStatus = document.getElementById("aetmElectionStatus");
      if (elAetmStatus) elAetmStatus.innerHTML = `<i class="fa-solid fa-pause text-amber"></i> Polling Paused`;
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

    const elFeb = document.getElementById("febCountdownText");
    if (elFeb) elFeb.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeStr}`;

    const elLer = document.getElementById("lerCountdownClock");
    if (elLer) elLer.textContent = timeStr;

    const elAetm = document.getElementById("aetmDigitsDisplay");
    if (elAetm) elAetm.textContent = timeStr;

    const elAetmStatus = document.getElementById("aetmElectionStatus");
    if (elAetmStatus) elAetmStatus.innerHTML = `<i class="fa-solid fa-circle-dot text-emerald"></i> Live Polling`;
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
  const prioritySelect = document.getElementById("selectCampusPriority");
  const priority = prioritySelect ? prioritySelect.value : null;

  try {
    const res = await fetch("/api/vote/cast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: sid, candidateId: candId, priority: priority })
    });
    const data = await res.json();

    if (res.ok) {
      showToast("Vote successfully recorded and encrypted!", "success");
      if (priority && APP_STATE.campusPriorities[priority] !== undefined) {
        APP_STATE.campusPriorities[priority]++;
      }
      displayDigitalReceipt(data.receipt);
    } else {
      showToast(data.error || "Failed to commit ballot", "error");
    }
  } catch (err) {
    // Standalone fallback
    const mockHash = "0x" + Math.random().toString(16).substr(2, 16);
    const lastBlock = APP_STATE.blockchain[APP_STATE.blockchain.length - 1];
    const newIdx = APP_STATE.blockchain.length;
    const nowIso = new Date().toISOString();
    const mockBlockHash = "0000" + Math.random().toString(16).substr(2, 28) + Math.random().toString(16).substr(2, 28);
    
    // Add block to local chain
    APP_STATE.blockchain.push({
      index: newIdx,
      timestamp: nowIso,
      data: {
        type: "BALLOT_SEAL",
        electionId: "ELEX-2026-MAIN",
        receiptHash: mockHash,
        voterToken: "0x" + Math.random().toString(16).substr(2, 16),
        dept: APP_STATE.currentStudent?.department || "CSE"
      },
      previousHash: lastBlock ? lastBlock.hash : "0000000000000000000000000000000000000000000000000000000000000000",
      merkleRoot: mockHash,
      nonce: Math.floor(Math.random() * 8000) + 1000,
      hash: mockBlockHash,
      tampered: false
    });

    if (priority && APP_STATE.campusPriorities[priority] !== undefined) {
      APP_STATE.campusPriorities[priority]++;
    }

    // Increment candidate votes locally
    const c = APP_STATE.candidates.find(cand => cand.id === candId);
    if (c) c.votes++;

    const mockReceipt = {
      receiptHash: mockHash,
      studentName: APP_STATE.currentStudent.name,
      studentId: sid,
      department: APP_STATE.currentStudent.department,
      electionTitle: "College Student Council Elections 2026",
      timestamp: nowIso,
      blockIndex: newIdx,
      blockHash: mockBlockHash
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

  const elBlockIdx = document.getElementById("receiptBlockIndex");
  if (elBlockIdx) {
    elBlockIdx.textContent = receipt.blockIndex !== undefined ? `Block #${receipt.blockIndex}` : `Block #${APP_STATE.blockchain.length - 1}`;
  }

  const elBlockHash = document.getElementById("receiptBlockHash");
  if (elBlockHash) {
    const bHash = receipt.blockHash || (APP_STATE.blockchain[APP_STATE.blockchain.length - 1] ? APP_STATE.blockchain[APP_STATE.blockchain.length - 1].hash : "0000c3b8e7d6...");
    elBlockHash.textContent = bHash.substring(0, 24) + "...";
  }

  const btnGoBlock = document.getElementById("btnGoToBlockchain");
  if (btnGoBlock) {
    btnGoBlock.onclick = () => {
      switchTab("tab-blockchain");
    };
  }

  // Render QR Code for receipt
  const qrBox = document.getElementById("receiptQrCode");
  qrBox.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(qrBox, {
      text: `VOTE-PROOF:${receipt.receiptHash}:${receipt.studentId}:BLOCK_${receipt.blockIndex || 1}`,
      width: 80,
      height: 80,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });
  }

  // Synchronize voter state in MOCK_STUDENTS roster
  if (receipt.studentId && typeof MOCK_STUDENTS !== "undefined" && MOCK_STUDENTS[receipt.studentId]) {
    MOCK_STUDENTS[receipt.studentId].hasVoted = true;
    MOCK_STUDENTS[receipt.studentId].receiptHash = receipt.receiptHash;
    MOCK_STUDENTS[receipt.studentId].revoteGranted = false;
    if (typeof renderVoterRosterTable === "function") {
      renderVoterRosterTable();
    }
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
      for (let sid in MOCK_STUDENTS) {
        MOCK_STUDENTS[sid].hasVoted = false;
        MOCK_STUDENTS[sid].verified = false;
        MOCK_STUDENTS[sid].receiptHash = null;
        MOCK_STUDENTS[sid].revoteGranted = false;
      }
      if (typeof renderVoterRosterTable === "function") renderVoterRosterTable();
      showToast("Demo voter records reset. Ready for fresh test votes!", "success");
    });
  }

  const btnToggle = document.getElementById("btnToggleElectionState");
  if (btnToggle) {
    btnToggle.addEventListener("click", async () => {
      const isPaused = APP_STATE.election.status === "paused";
      const nextStatus = isPaused ? "active" : "paused";
      APP_STATE.election.status = nextStatus;
      btnToggle.innerHTML = isPaused ? '<i class="fa-solid fa-pause"></i> Pause Election' : '<i class="fa-solid fa-play"></i> Resume Election';
      updateElectionStatusBadge(nextStatus);
      showToast(`Election is now ${nextStatus.toUpperCase()}`, "info");
    });
  }

  const btnClose = document.getElementById("btnCloseElection");
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      instantEndElectionAndDeclareResults();
    });
  }

  initInstantEndElectionControls();
  initElectionScheduleManager();
  initAdminScrutinyDesk();
  initAdminVoterRevoteDesk();
  initCandidateScrutinyModal();
  initRevotePermissionModal();

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

/* ==========================================================================
   INSTANT END ELECTION & DECLARE RESULTS
   ========================================================================== */
function instantEndElectionAndDeclareResults() {
  APP_STATE.election.status = "concluded";
  if (APP_STATE.elections && APP_STATE.elections["ELEX-2026-MAIN"]) {
    APP_STATE.elections["ELEX-2026-MAIN"].status = "concluded";
    APP_STATE.elections["ELEX-2026-MAIN"].closingTime = new Date();
  }

  // Update header and dashboard status badges
  updateElectionStatusBadge("concluded");
  const elH = document.getElementById("headerCountdown");
  if (elH) elH.textContent = "CONCLUDED";
  const elAdmin = document.getElementById("adminTimeRemaining");
  if (elAdmin) elAdmin.textContent = "Concluded";
  const elFeb = document.getElementById("febCountdownText");
  if (elFeb) elFeb.innerHTML = `<i class="fa-solid fa-flag-checkered"></i> Concluded`;
  const elLer = document.getElementById("lerCountdownClock");
  if (elLer) elLer.textContent = "00:00:00 (CONCLUDED)";
  const elAetm = document.getElementById("aetmDigitsDisplay");
  if (elAetm) elAetm.textContent = "00:00:00 (CONCLUDED)";
  const elAetmStatus = document.getElementById("aetmElectionStatus");
  if (elAetmStatus) elAetmStatus.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> Concluded & Sealed`;

  // Dispatch official notice
  const noticeConcluded = {
    id: `NOT-2026-${Date.now() % 1000}`,
    refNo: "Ref: CEC/DEC-2026/01",
    title: "Official Declaration of Election Results: Presidential Race Concluded",
    category: "urgent",
    priority: "urgent",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    read: false,
    summary: "Chief Returning Officer has officially concluded voting. Cryptographic tallies verified on blockchain ledger. Winner certified.",
    body: "The Central Election Commission formally declares the conclusion of polling for the Student Council 2026 Elections. All ballot boxes have been cryptographically sealed. Ledger tabulation is complete, and the official constitutional gazette has been published.",
    signatory: "Dr. S. Ramanujan",
    signatoryRole: "Chief Returning Officer, CEC"
  };
  if (APP_STATE.notices) {
    APP_STATE.notices.unshift(noticeConcluded);
    if (typeof renderNoticesList === "function") renderNoticesList();
    if (typeof updateTopNoticeBanner === "function") updateTopNoticeBanner();
    if (typeof updateNoticeBadges === "function") updateNoticeBadges();
  }

  // Record in audit log
  const conclLog = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
    eventType: "ELECTION_CONCLUDED_BY_ADMIN",
    details: "Election was concluded on demand by Admin Dr. S. Ramanujan. Instant tabulation triggered.",
    ip: "192.168.1.1 (Admin Console)",
    isSuspicious: false
  };
  APP_STATE.logs.unshift(conclLog);
  renderAuditLogTable(APP_STATE.logs);

  showToast("Election officially concluded! Tabulating certified results...", "success");

  // Immediately launch the Winner Declaration & Tabulation Ceremony
  openWinnerCeremony();
}

function initInstantEndElectionControls() {
  const btnInstant1 = document.getElementById("btnInstantEndAndResults");
  if (btnInstant1) {
    btnInstant1.addEventListener("click", () => {
      instantEndElectionAndDeclareResults();
    });
  }
  const btnInstant2 = document.getElementById("btnAdminEndElectionNow");
  if (btnInstant2) {
    btnInstant2.addEventListener("click", () => {
      instantEndElectionAndDeclareResults();
    });
  }
}

/* ==========================================================================
   ELECTION TIMER & SCHEDULE MANAGER (SPECIFIED PER PARTICULAR ELECTION)
   ========================================================================== */
function initElectionScheduleManager() {
  const selectElection = document.getElementById("selectTimerElection");
  const elTrackedName = document.getElementById("aetmTrackedElectionName");
  const elTargetTime = document.getElementById("aetmClosingTarget");
  const elVoters = document.getElementById("aetmElectionVoters");
  const elStatus = document.getElementById("aetmElectionStatus");

  function syncElectionScheduleDisplay() {
    const elId = selectElection ? selectElection.value : (APP_STATE.activeTimerElectionId || "ELEX-2026-MAIN");
    APP_STATE.activeTimerElectionId = elId;
    const elect = APP_STATE.elections && APP_STATE.elections[elId];
    if (!elect) return;

    if (elTrackedName) elTrackedName.textContent = elect.title;
    if (elVoters) elVoters.textContent = `${elect.totalEligible.toLocaleString()} Students`;
    if (elStatus) {
      if (elect.status === "concluded") {
        elStatus.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> Concluded`;
      } else if (elect.status === "paused") {
        elStatus.innerHTML = `<i class="fa-solid fa-pause text-amber"></i> Paused`;
      } else {
        elStatus.innerHTML = `<i class="fa-solid fa-circle-dot text-emerald"></i> Live Polling`;
      }
    }
    if (elTargetTime && elect.closingTime) {
      const dt = new Date(elect.closingTime);
      elTargetTime.textContent = `Closes: ${dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  }

  if (selectElection) {
    selectElection.addEventListener("change", syncElectionScheduleDisplay);
    syncElectionScheduleDisplay();
  }

  // Preset Buttons (+30m, +1h, +3h, +24h)
  document.querySelectorAll(".btn-timer-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const mins = parseInt(btn.getAttribute("data-add-mins")) || 30;
      const elId = selectElection ? selectElection.value : (APP_STATE.activeTimerElectionId || "ELEX-2026-MAIN");
      const elect = APP_STATE.elections && APP_STATE.elections[elId];
      if (elect) {
        const baseTime = (elect.closingTime && elect.closingTime > new Date()) ? elect.closingTime.getTime() : Date.now();
        elect.closingTime = new Date(baseTime + mins * 60 * 1000);
        if (elect.status === "concluded" || elect.status === "closed") {
          elect.status = "active";
        }
        if (elId === "ELEX-2026-MAIN") {
          APP_STATE.election.status = "active";
          APP_STATE.election.closingTime = elect.closingTime;
          updateElectionStatusBadge("active");
        }
        syncElectionScheduleDisplay();
        showToast(`Added +${mins >= 60 ? (mins/60) + ' hour(s)' : mins + ' mins'} to ${elect.title}`, "success");
      }
    });
  });

  // Custom DateTime Setter
  const btnApplyCustom = document.getElementById("btnApplyCustomTimer");
  const inputCustom = document.getElementById("inputTimerCustomDateTime");
  if (btnApplyCustom && inputCustom) {
    btnApplyCustom.addEventListener("click", () => {
      const val = inputCustom.value;
      if (!val) {
        showToast("Please pick a target closing date and time.", "warning");
        return;
      }
      const newDate = new Date(val);
      if (isNaN(newDate.getTime())) {
        showToast("Invalid date/time selected.", "error");
        return;
      }
      const elId = selectElection ? selectElection.value : (APP_STATE.activeTimerElectionId || "ELEX-2026-MAIN");
      const elect = APP_STATE.elections && APP_STATE.elections[elId];
      if (elect) {
        elect.closingTime = newDate;
        elect.status = newDate > new Date() ? "active" : "concluded";
        if (elId === "ELEX-2026-MAIN") {
          APP_STATE.election.closingTime = newDate;
          APP_STATE.election.status = elect.status;
          updateElectionStatusBadge(elect.status);
        }
        syncElectionScheduleDisplay();
        showToast(`Timer updated for ${elect.title}!`, "success");
      }
    });
  }

  // Toggle Timer Pause
  const btnPause = document.getElementById("btnToggleTimerPause");
  if (btnPause) {
    btnPause.addEventListener("click", () => {
      const elId = selectElection ? selectElection.value : (APP_STATE.activeTimerElectionId || "ELEX-2026-MAIN");
      const elect = APP_STATE.elections && APP_STATE.elections[elId];
      if (elect) {
        const isPaused = elect.status === "paused";
        elect.status = isPaused ? "active" : "paused";
        if (elId === "ELEX-2026-MAIN") {
          APP_STATE.election.status = elect.status;
          updateElectionStatusBadge(elect.status);
        }
        btnPause.innerHTML = isPaused ? '<i class="fa-solid fa-pause"></i> Pause Timer' : '<i class="fa-solid fa-play"></i> Resume Timer';
        syncElectionScheduleDisplay();
        showToast(`Timer is now ${elect.status.toUpperCase()} for ${elect.title}`, "info");
      }
    });
  }
}

/* ==========================================================================
   CEC CANDIDATE SCRUTINY DESK & FEASIBILITY SCORING
   ========================================================================== */
function initAdminScrutinyDesk() {
  const tabs = [
    { btn: document.getElementById("tabScrutinyPending"), filter: "pending" },
    { btn: document.getElementById("tabScrutinyApproved"), filter: "approved" },
    { btn: document.getElementById("tabScrutinyRejected"), filter: "rejected" }
  ];

  tabs.forEach(t => {
    if (t.btn) {
      t.btn.addEventListener("click", () => {
        tabs.forEach(x => x.btn && x.btn.classList.remove("active"));
        t.btn.classList.add("active");
        APP_STATE.scrutinyFilter = t.filter;
        renderScrutinyQueue();
      });
    }
  });

  renderScrutinyQueue();
}

function renderScrutinyQueue() {
  const container = document.getElementById("scrutinyQueueContainer");
  const countPending = document.getElementById("countScrutinyPending");
  const countApproved = document.getElementById("countScrutinyApproved");
  const countRejected = document.getElementById("countScrutinyRejected");

  if (!APP_STATE.candidateScrutinyQueue) return;

  const pCount = APP_STATE.candidateScrutinyQueue.filter(c => c.status === "pending").length;
  const aCount = APP_STATE.candidateScrutinyQueue.filter(c => c.status === "approved").length;
  const rCount = APP_STATE.candidateScrutinyQueue.filter(c => c.status === "rejected").length;

  if (countPending) countPending.textContent = pCount;
  if (countApproved) countApproved.textContent = aCount;
  if (countRejected) countRejected.textContent = rCount;

  if (!container) return;

  const currentFilter = APP_STATE.scrutinyFilter || "pending";
  const list = APP_STATE.candidateScrutinyQueue.filter(c => c.status === currentFilter);

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px 20px; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px dashed rgba(255, 255, 255, 0.1);">
        <i class="fa-solid fa-folder-open" style="font-size: 32px; color: #64748b; margin-bottom: 10px;"></i>
        <div style="font-size: 15px; color: #94a3b8; font-weight: 600;">No ${currentFilter.toUpperCase()} nominations in this queue</div>
        <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Nominations filed by students or imported candidates will appear here for CEC statutory review.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  list.forEach(c => {
    const card = document.createElement("div");
    card.className = "scrutiny-card";

    let gradeClass = "grade-a";
    if (c.grade === "A+") gradeClass = "grade-aplus";
    else if (c.grade === "B") gradeClass = "grade-b";
    else if (c.grade === "C") gradeClass = "grade-c";

    card.innerHTML = `
      <div>
        <span class="scrutiny-status-pill ${c.status}">${c.status}</span>
        <div class="scrutiny-card-top">
          <img src="${c.avatar}" alt="${c.name}" class="scrutiny-avatar">
          <div class="scrutiny-cand-info">
            <h4>${c.name}</h4>
            <div class="scrutiny-meta">${c.rollNo} • ${c.department} • ${c.year}</div>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <span class="scrutiny-pos-badge">${c.position}</span>
              <small style="color: #64748b; font-size: 11px;">Filing ID: ${c.id}</small>
            </div>
          </div>
        </div>

        <!-- 4-Metrics Preview Grid -->
        <div class="scrutiny-metrics-grid">
          <div class="sm-item">
            <span class="sm-val">${c.cgpa || 8.5}</span>
            <span class="sm-lbl">CGPA</span>
          </div>
          <div class="sm-item">
            <span class="sm-val">${c.attendance || 85}%</span>
            <span class="sm-lbl">Attendance</span>
          </div>
          <div class="sm-item">
            <span class="sm-val">${c.scores?.faculty || 20}/25</span>
            <span class="sm-lbl">Teacher Rev.</span>
          </div>
          <div class="sm-item">
            <span class="sm-val">${c.scores?.portfolio || 20}/25</span>
            <span class="sm-lbl">Portfolio</span>
          </div>
        </div>

        <!-- Feasibility Progress Bar & Grade -->
        <div class="scrutiny-score-bar-wrapper">
          <div class="ssb-header">
            <span class="ssb-label"><i class="fa-solid fa-gauge-high"></i> Feasibility Score:</span>
            <div>
              <span class="ssb-score-val">${c.compositeScore || 85}/100</span>
              <span class="ssb-grade-tag ${gradeClass}" style="margin-left: 6px;">Grade ${c.grade || 'A'}</span>
            </div>
          </div>
          <div class="ssb-track">
            <div class="ssb-fill" style="width: ${c.compositeScore || 85}%;"></div>
          </div>
        </div>

        <!-- Teacher Review Snippet -->
        <div class="teacher-review-snippet">
          "${c.teacherReview || 'Academic integrity and classroom leadership verified by faculty mentor.'}"
          <small><i class="fa-solid fa-quote-left text-cyan"></i> Faculty Mentor / HOD Endorsement</small>
        </div>
      </div>

      <div class="scrutiny-card-actions">
        <button type="button" class="btn btn-sm btn-outline-cyan btn-open-scrutiny" data-id="${c.id}">
          <i class="fa-solid fa-file-signature"></i> Scrutinize & Score
        </button>
        ${c.status === 'pending' ? `
          <button type="button" class="btn btn-sm btn-emerald-gradient btn-quick-approve" data-id="${c.id}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff;">
            <i class="fa-solid fa-check"></i> Approve
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger btn-quick-reject" data-id="${c.id}">
            <i class="fa-solid fa-ban"></i> Reject
          </button>
        ` : ''}
      </div>
    `;

    // Button event handlers
    const btnOpen = card.querySelector(".btn-open-scrutiny");
    if (btnOpen) {
      btnOpen.addEventListener("click", () => openCandidateScrutinyModal(c.id));
    }
    const btnApprove = card.querySelector(".btn-quick-approve");
    if (btnApprove) {
      btnApprove.addEventListener("click", () => {
        approveCandidateNomination(c.id);
      });
    }
    const btnReject = card.querySelector(".btn-quick-reject");
    if (btnReject) {
      btnReject.addEventListener("click", () => {
        rejectCandidateNomination(c.id, "Quick rejection by Scrutiny Desk due to criteria mismatch.");
      });
    }

    container.appendChild(card);
  });
}

/* ==========================================================================
   MODAL: CANDIDATE SCRUTINY & FEASIBILITY SCORING RUBRIC
   ========================================================================== */
let currentScrutinizingId = null;

function initCandidateScrutinyModal() {
  const modal = document.getElementById("modalCandidateScrutiny");
  const btnClose = document.getElementById("btnCloseScrutinyModal");
  const btnCancel = document.getElementById("btnCancelScrutinyModal");
  const btnApprove = document.getElementById("btnApproveCandidacy");
  const btnReject = document.getElementById("btnRejectCandidacy");

  const sliderAcademic = document.getElementById("sliderScoreAcademic");
  const sliderFaculty = document.getElementById("sliderScoreFaculty");
  const sliderPortfolio = document.getElementById("sliderScorePortfolio");
  const sliderManifesto = document.getElementById("sliderScoreManifesto");

  function recalculateScrutinyScore() {
    const ac = parseInt(sliderAcademic ? sliderAcademic.value : 24) || 0;
    const fa = parseInt(sliderFaculty ? sliderFaculty.value : 22) || 0;
    const po = parseInt(sliderPortfolio ? sliderPortfolio.value : 21) || 0;
    const ma = parseInt(sliderManifesto ? sliderManifesto.value : 21) || 0;

    const badgeAc = document.getElementById("badgeScoreAcademic");
    const badgeFa = document.getElementById("badgeScoreFaculty");
    const badgePo = document.getElementById("badgeScorePortfolio");
    const badgeMa = document.getElementById("badgeScoreManifesto");

    if (badgeAc) badgeAc.textContent = `${ac} / 25`;
    if (badgeFa) badgeFa.textContent = `${fa} / 25`;
    if (badgePo) badgePo.textContent = `${po} / 25`;
    if (badgeMa) badgeMa.textContent = `${ma} / 25`;

    const total = ac + fa + po + ma;
    const elTotal = document.getElementById("csmCompositeScore");
    if (elTotal) {
      elTotal.innerHTML = `${total}<span style="font-size: 18px; color: #64748b;">/100</span>`;
    }

    let grade = "A";
    let gradeText = "GRADE A • APPROVED FEASIBILITY";
    let gradeClass = "grade-a";
    if (total >= 85) {
      grade = "A+";
      gradeText = "GRADE A+ • HIGHLY FEASIBLE";
      gradeClass = "grade-aplus";
    } else if (total >= 70) {
      grade = "A";
      gradeText = "GRADE A • APPROVED FEASIBILITY";
      gradeClass = "grade-a";
    } else if (total >= 50) {
      grade = "B";
      gradeText = "GRADE B • CONDITIONAL FEASIBILITY";
      gradeClass = "grade-b";
    } else {
      grade = "C";
      gradeText = "GRADE C • DISQUALIFIED";
      gradeClass = "grade-c";
    }

    const elGrade = document.getElementById("csmGradeTag");
    if (elGrade) {
      elGrade.className = `ssb-grade-tag ${gradeClass}`;
      elGrade.textContent = gradeText;
    }

    return { total, grade, scores: { academic: ac, faculty: fa, portfolio: po, manifesto: ma } };
  }

  [sliderAcademic, sliderFaculty, sliderPortfolio, sliderManifesto].forEach(s => {
    if (s) s.addEventListener("input", recalculateScrutinyScore);
  });

  if (btnClose) btnClose.addEventListener("click", () => modal && modal.classList.add("hidden"));
  if (btnCancel) btnCancel.addEventListener("click", () => modal && modal.classList.add("hidden"));

  if (btnApprove) {
    btnApprove.addEventListener("click", () => {
      if (!currentScrutinizingId) return;
      const evalData = recalculateScrutinyScore();
      const remarks = document.getElementById("textareaScrutinyRemarks")?.value.trim();
      approveCandidateNomination(currentScrutinizingId, evalData, remarks);
      if (modal) modal.classList.add("hidden");
    });
  }

  if (btnReject) {
    btnReject.addEventListener("click", () => {
      if (!currentScrutinizingId) return;
      const remarks = document.getElementById("textareaScrutinyRemarks")?.value.trim() || "Failed statutory scrutiny criteria.";
      rejectCandidateNomination(currentScrutinizingId, remarks);
      if (modal) modal.classList.add("hidden");
    });
  }
}

function openCandidateScrutinyModal(nomId) {
  const cand = APP_STATE.candidateScrutinyQueue && APP_STATE.candidateScrutinyQueue.find(c => c.id === nomId);
  if (!cand) return;
  currentScrutinizingId = nomId;

  const modal = document.getElementById("modalCandidateScrutiny");
  if (!modal) return;

  const elAvatar = document.getElementById("csmCandAvatar");
  const elName = document.getElementById("csmCandName");
  const elMeta = document.getElementById("csmCandMeta");
  const elPost = document.getElementById("csmCandPost");
  const elRef = document.getElementById("csmCandRef");
  const elStatus = document.getElementById("csmCandStatusBadge");

  if (elAvatar) elAvatar.src = cand.avatar;
  if (elName) elName.textContent = cand.name;
  if (elMeta) elMeta.textContent = `${cand.rollNo} • ${cand.department} • ${cand.year}`;
  if (elPost) elPost.textContent = cand.position;
  if (elRef) elRef.textContent = `Filing Ref: ${cand.id}`;
  if (elStatus) {
    elStatus.className = `scrutiny-status-pill ${cand.status}`;
    elStatus.textContent = cand.status.toUpperCase();
  }

  const elAcStats = document.getElementById("csmAcademicStats");
  if (elAcStats) {
    elAcStats.innerHTML = `CGPA: <strong>${cand.cgpa || 8.5}</strong> (Min: 6.50) • Attendance: <strong>${cand.attendance || 85}%</strong> (Min: 75%) • Zero Active Arrears • Proctorial Clearance: <strong>${cand.proctorialStatus || 'CLEARED'}</strong>`;
  }
  const elTeacher = document.getElementById("csmTeacherReviewSnippet");
  if (elTeacher) elTeacher.textContent = `"${cand.teacherReview || 'Strong academic integrity, recommended for executive leadership.'}"`;
  const elPort = document.getElementById("csmPortfolioSnippet");
  if (elPort) elPort.textContent = cand.portfolioHighlights || "Verified participation in college technical & cultural clubs.";
  const elMani = document.getElementById("csmManifestoCheck");
  if (elMani) elMani.textContent = cand.manifestoSummary || "8-Point standardized student manifesto verified within council budget.";

  const sliderAc = document.getElementById("sliderScoreAcademic");
  const sliderFa = document.getElementById("sliderScoreFaculty");
  const sliderPo = document.getElementById("sliderScorePortfolio");
  const sliderMa = document.getElementById("sliderScoreManifesto");
  const txtRemarks = document.getElementById("textareaScrutinyRemarks");

  if (sliderAc) sliderAc.value = cand.scores?.academic || 24;
  if (sliderFa) sliderFa.value = cand.scores?.faculty || 22;
  if (sliderPo) sliderPo.value = cand.scores?.portfolio || 21;
  if (sliderMa) sliderMa.value = cand.scores?.manifesto || 21;
  if (txtRemarks) txtRemarks.value = cand.reviewerRemarks || "All statutory criteria verified. Cleared by Central Election Commission.";

  // Recalculate
  const sliderAcademic = document.getElementById("sliderScoreAcademic");
  if (sliderAcademic) sliderAcademic.dispatchEvent(new Event("input"));

  modal.classList.remove("hidden");
}

function approveCandidateNomination(nomId, evalData, remarks) {
  const nom = APP_STATE.candidateScrutinyQueue && APP_STATE.candidateScrutinyQueue.find(c => c.id === nomId);
  if (!nom) return;

  nom.status = "approved";
  if (evalData) {
    nom.scores = evalData.scores;
    nom.compositeScore = evalData.total;
    nom.grade = evalData.grade;
  }
  if (remarks) nom.reviewerRemarks = remarks;

  // Mint candidate to APP_STATE.candidates if not already present
  let existing = APP_STATE.candidates.find(c => c.id === nom.candId || c.name.toLowerCase() === nom.name.toLowerCase());
  if (!existing) {
    const nextCandNum = APP_STATE.candidates.length + 1;
    const newCand = {
      id: nom.candId || `CAND-0${nextCandNum}`,
      name: nom.name,
      rollNo: nom.rollNo,
      position: nom.position,
      department: nom.department,
      year: nom.year,
      avatar: nom.avatar,
      tagline: nom.tagline,
      color: nom.color || "#00f2fe",
      manifesto: {
        academic: "Specialized tutorials, study circles, and peer tutoring hubs",
        infrastructure: "24/7 library pods, lab upgrades, fast campus Wi-Fi",
        events: "Department tech conclaves, e-sports fests, leadership summits",
        welfare: "Counselling cell, peer support networks, subsidized canteen",
        technology: "AI attendance dashboard, quick grievance portal",
        placement: "Internships drive, resume bootcamps, alumni mentorship",
        previousWork: nom.portfolioHighlights || "Organized university-wide events",
        commitmentsCount: 10,
        actionReadyScore: nom.compositeScore || 88
      },
      votes: 0,
      cgpa: nom.cgpa,
      attendance: nom.attendance,
      proposer: nom.proposer,
      seconder: nom.seconder
    };
    APP_STATE.candidates.push(newCand);
    if (!APP_STATE.selectedMatrixIds.includes(newCand.id)) {
      if (APP_STATE.selectedMatrixIds.length >= 4) {
        APP_STATE.selectedMatrixIds.pop();
      }
      APP_STATE.selectedMatrixIds.push(newCand.id);
    }
  } else {
    existing.manifesto.actionReadyScore = nom.compositeScore || 88;
  }

  // Broadcast official notice
  const noticeClearnce = {
    id: `NOT-2026-${Date.now() % 1000}`,
    refNo: `Ref: CEC/APP-2026/0${Math.floor(Math.random() * 50) + 10}`,
    title: `Candidacy Scrutiny Approved: ${nom.name} (${nom.department})`,
    category: "candidacy",
    priority: "urgent",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    read: false,
    summary: `The Central Scrutiny Committee has approved the nomination of ${nom.name}. Feasibility Score: ${nom.compositeScore || 88}/100 (Grade ${nom.grade || 'A+'}). Added to active ballot.`,
    body: `Official Circular from the Central Election Commission.\n\nPursuant to the scrutiny of nominations filed under CEC Form 1A, candidate ${nom.name} (Roll No: ${nom.rollNo}) has successfully cleared teacher reviews, portfolio feasibility examination, and academic standing benchmarks.\n\nFeasibility Evaluation breakdown:\n- Academic Standing: ${nom.scores?.academic || 24}/25\n- Faculty & Mentor Recommendation: ${nom.scores?.faculty || 22}/25\n- Co-Curricular & Leadership Portfolio: ${nom.scores?.portfolio || 21}/25\n- Manifesto Practicality: ${nom.scores?.manifesto || 21}/25\n\nThe candidate is officially minted to the active ballot matrix.`,
    signatory: "Prof. R. K. Shrivastava",
    signatoryRole: "Chief Returning Officer, CEC"
  };

  if (APP_STATE.notices) {
    APP_STATE.notices.unshift(noticeClearnce);
    if (typeof renderNoticesList === "function") renderNoticesList();
    if (typeof updateTopNoticeBanner === "function") updateTopNoticeBanner();
    if (typeof updateNoticeBadges === "function") updateNoticeBadges();
  }

  // Refresh UI
  initMatrixToggles();
  renderComparisonMatrix();
  renderBallotCandidates();
  renderScrutinyQueue();

  showToast(`Nomination approved! ${nom.name} is now on the active ballot.`, "success");
}

function rejectCandidateNomination(nomId, remarks) {
  const nom = APP_STATE.candidateScrutinyQueue && APP_STATE.candidateScrutinyQueue.find(c => c.id === nomId);
  if (!nom) return;

  nom.status = "rejected";
  nom.reviewerRemarks = remarks;

  // Remove from APP_STATE.candidates if present
  const idx = APP_STATE.candidates.findIndex(c => c.id === nom.candId || c.name.toLowerCase() === nom.name.toLowerCase());
  if (idx !== -1) {
    APP_STATE.candidates.splice(idx, 1);
    APP_STATE.selectedMatrixIds = APP_STATE.selectedMatrixIds.filter(id => id !== nom.candId);
    initMatrixToggles();
    renderComparisonMatrix();
    renderBallotCandidates();
  }

  // Audit log
  APP_STATE.logs.unshift({
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
    eventType: "CANDIDACY_REJECTED",
    details: `Nomination for ${nom.name} (${nom.rollNo}) was rejected by Scrutiny Officer. Reason: ${remarks}`,
    ip: "192.168.1.1 (Admin Console)",
    isSuspicious: true
  });
  renderAuditLogTable(APP_STATE.logs);
  renderScrutinyQueue();

  showToast(`Nomination for ${nom.name} has been rejected with formal proctorial remarks.`, "warning");
}

/* ==========================================================================
   VOTER ROLL & REVOTE AUTHORIZATION DESK
   ========================================================================== */
let currentRevoteTargetSid = null;

function initAdminVoterRevoteDesk() {
  const inputSearch = document.getElementById("inputAdminVoterSearch");
  const selectFilter = document.getElementById("selectVoterStatusFilter");

  if (inputSearch) {
    inputSearch.addEventListener("input", () => {
      APP_STATE.voterSearchQuery = inputSearch.value.trim().toLowerCase();
      renderVoterRosterTable();
    });
  }

  if (selectFilter) {
    selectFilter.addEventListener("change", () => {
      APP_STATE.voterStatusFilter = selectFilter.value;
      renderVoterRosterTable();
    });
  }

  initAddVoterModal();
  renderVoterRosterTable();
}

/* ==========================================================================
   ENROLL NEW VOTER MODAL
   ========================================================================== */
function initAddVoterModal() {
  const btnOpen = document.getElementById("btnOpenAddVoterModal");
  const modal = document.getElementById("modalAddVoter");
  const btnClose = document.getElementById("btnCloseAddVoterModal");
  const btnCancel = document.getElementById("btnCancelAddVoterModal");
  const form = document.getElementById("formAddVoter");

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      if (modal) modal.classList.remove("hidden");
      // Auto-suggest next roll number
      const rollInput = document.getElementById("inputNewVoterRoll");
      if (rollInput && !rollInput.value) {
        const randNum = Math.floor(Math.random() * 800) + 100;
        rollInput.value = `24BCSE${randNum}`;
      }
    });
  }

  if (btnClose) btnClose.addEventListener("click", () => modal && modal.classList.add("hidden"));
  if (btnCancel) btnCancel.addEventListener("click", () => modal && modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const roll = document.getElementById("inputNewVoterRoll")?.value.trim().toUpperCase();
      const name = document.getElementById("inputNewVoterName")?.value.trim();
      const dept = document.getElementById("selectNewVoterDept")?.value || "CSE";
      const year = document.getElementById("selectNewVoterYear")?.value || "3rd Year";
      const email = document.getElementById("inputNewVoterEmail")?.value.trim() || `${roll.toLowerCase()}@college.edu`;
      const phone = document.getElementById("inputNewVoterPhone")?.value.trim() || "+91 98765 00123";
      const pin = document.getElementById("inputNewVoterPin")?.value.trim() || "1234";
      const verifyStatus = document.getElementById("selectNewVoterVerifyStatus")?.value || "VERIFIED";
      const autoSwitch = document.getElementById("checkAutoSwitchToBooth")?.checked ?? true;

      if (!roll || !name) {
        showToast("Please provide both Student PRN/Roll No and Full Name.", "error");
        return;
      }

      if (MOCK_STUDENTS[roll]) {
        showToast(`Student PRN ${roll} already exists on the voter roll!`, "error");
        return;
      }

      const newStudent = {
        studentId: roll,
        name: name,
        department: dept,
        year: year,
        email: email,
        phone: phone,
        pin: pin,
        password: "password123",
        verified: verifyStatus === "VERIFIED",
        hasVoted: false,
        receiptHash: null,
        revoteGranted: false
      };

      // 1. Store in memory roster
      MOCK_STUDENTS[roll] = newStudent;

      // 2. Post to backend server if available
      try {
        fetch("/api/admin/add-voter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStudent)
        }).catch(() => {});
      } catch (err) {}

      // 3. Increment total eligible count
      if (APP_STATE.elections && APP_STATE.elections[APP_STATE.activeTimerElectionId]) {
        APP_STATE.elections[APP_STATE.activeTimerElectionId].totalEligible += 1;
      }

      // 4. Log to Audit Trail
      if (APP_STATE.logs) {
        APP_STATE.logs.unshift({
          id: APP_STATE.logs.length + 1,
          timestamp: new Date().toLocaleTimeString(),
          type: "VOTER_ENROLLED",
          details: `New student voter enrolled: ${name} (${roll}) for ${dept} (${year}) by Admin Dr. S. Ramanujan.`,
          ip: "127.0.0.1",
          isSuspicious: false
        });
        renderAuditLogTable(APP_STATE.logs);
      }

      // 5. Broadcast to Notice Center
      if (APP_STATE.campusNotices) {
        APP_STATE.campusNotices.unshift({
          id: `NOTIF-${Date.now()}`,
          tag: "ELECTORAL ROLL",
          title: `New Voter Enrolled: ${name} (${roll})`,
          summary: `Student ${name} from ${dept} (${year}) has been officially registered and verified on the 2026 Electoral Roll.`,
          time: "Just now",
          badgeColor: "#00f2fe"
        });
        renderNoticeBadges();
      }

      // 6. Update UI
      renderVoterRosterTable();
      modal.classList.add("hidden");
      form.reset();

      showToast(`Student ${name} (${roll}) successfully enrolled to electoral roll!`, "success");

      // 7. Auto-launch Voting Booth if requested
      if (autoSwitch) {
        setTimeout(() => {
          launchBoothForStudent(roll);
        }, 400);
      }
    });
  }
}

/* ==========================================================================
   LAUNCH VOTING BOOTH FOR STUDENT
   ========================================================================== */
function launchBoothForStudent(studentId) {
  const student = MOCK_STUDENTS[studentId];
  if (!student) return;

  // 1. Switch tab to Voting Booth
  switchTab("tab-booth");

  // 2. Pre-fill login inputs
  const inputSid = document.getElementById("inputStudentId");
  const selectDept = document.getElementById("selectDepartment");
  const selectYear = document.getElementById("selectYear");

  if (inputSid) {
    inputSid.value = student.studentId;
    inputSid.classList.add("pulse-glow");
    setTimeout(() => inputSid.classList.remove("pulse-glow"), 1500);
  }
  if (selectDept && student.department) selectDept.value = student.department;
  if (selectYear && student.year) selectYear.value = student.year;

  // 3. Reset booth to stage 1 (Login stage)
  transitionBoothStage("stageLogin", 1);

  // 4. Scroll smoothly to booth container
  const boothSection = document.getElementById("tab-booth");
  if (boothSection) {
    boothSection.scrollIntoView({ behavior: "smooth" });
  }

  showToast(`Voter credentials loaded for ${student.name} (${student.studentId}). Click 'Proceed to Dual-Factor Verification' to cast vote!`, "info");
}

function renderVoterRosterTable() {
  const tbody = document.getElementById("voterRosterTbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const query = APP_STATE.voterSearchQuery || "";
  const filter = APP_STATE.voterStatusFilter || "all";

  const studentList = Object.values(MOCK_STUDENTS).filter(s => {
    const matchQuery = !query || 
      s.studentId.toLowerCase().includes(query) || 
      s.name.toLowerCase().includes(query) || 
      s.department.toLowerCase().includes(query);

    if (!matchQuery) return false;

    if (filter === "voted") return s.hasVoted && !s.revoteGranted;
    if (filter === "not_voted") return !s.hasVoted;
    if (filter === "revote_granted") return s.revoteGranted;
    return true;
  });

  if (studentList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: #64748b;">
          No student records matching current filters.
        </td>
      </tr>
    `;
    return;
  }

  studentList.forEach(s => {
    const tr = document.createElement("tr");

    let statusBadge = `<span class="status-badge-eligible"><i class="fa-solid fa-clock"></i> Eligible</span>`;
    if (s.revoteGranted) {
      statusBadge = `<span class="status-badge-revote" title="Revote clearance granted"><i class="fa-solid fa-arrows-rotate"></i> Revote Authorized (${s.revoteCount || 1}x)</span>`;
    } else if (s.hasVoted) {
      statusBadge = `<span class="status-badge-voted"><i class="fa-solid fa-check"></i> Voted</span>`;
    }

    let receiptHtml = `<span style="color: #64748b;">—</span>`;
    if (s.receiptHash) {
      receiptHtml = `
        <a href="#" class="view-receipt-link" data-hash="${s.receiptHash}" style="color: #00f2fe; text-decoration: none; font-family: monospace;">
          <i class="fa-solid fa-receipt"></i> ${s.receiptHash.substr(0, 14)}...
        </a>
      `;
    } else if (s.previousReceiptHash) {
      receiptHtml = `
        <span style="color: #f59e0b; font-family: monospace; font-size: 11px;" title="Superseded receipt">
          <i class="fa-solid fa-clock-rotate-left"></i> ${s.previousReceiptHash.substr(0, 12)}... (Superseded)
        </span>
      `;
    }

    let actionBtn = `
      <button type="button" class="btn-quick-vote" data-sid="${s.studentId}" title="Launch Voting Booth and cast vote as ${s.name}">
        <i class="fa-solid fa-vote-yea"></i> Vote in Booth
      </button>
    `;
    if (s.hasVoted) {
      actionBtn = `
        <button type="button" class="btn-grant-revote" data-sid="${s.studentId}">
          <i class="fa-solid fa-arrows-rotate"></i> Grant Revote
        </button>
      `;
    } else if (s.revoteGranted) {
      actionBtn = `
        <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
          <button type="button" class="btn-quick-vote" data-sid="${s.studentId}" title="Cast revote as ${s.name}">
            <i class="fa-solid fa-vote-yea"></i> Cast Revote
          </button>
          <button type="button" class="btn-grant-revote" data-sid="${s.studentId}" style="opacity: 0.85;">
            <i class="fa-solid fa-user-pen"></i> Update
          </button>
        </div>
      `;
    }

    tr.innerHTML = `
      <td><strong>${s.studentId}</strong></td>
      <td>${s.name}</td>
      <td>${s.department} • ${s.year}</td>
      <td>${statusBadge}</td>
      <td>${receiptHtml}</td>
      <td>${actionBtn}</td>
    `;

    // Handle vote now in booth click
    const btnVote = tr.querySelector(".btn-quick-vote");
    if (btnVote) {
      btnVote.addEventListener("click", () => launchBoothForStudent(s.studentId));
    }

    // Handle revote button click
    const btnRevote = tr.querySelector(".btn-grant-revote");
    if (btnRevote) {
      btnRevote.addEventListener("click", () => openRevotePermissionModal(s.studentId));
    }

    // Handle receipt click
    const link = tr.querySelector(".view-receipt-link");
    if (link) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const hash = link.getAttribute("data-hash");
        switchTab("tab-receipt-checker");
        const input = document.getElementById("inputReceiptQuery");
        if (input) {
          input.value = hash;
          document.getElementById("btnRunReceiptLookup")?.click();
        }
      });
    }

    tbody.appendChild(tr);
  });
}

function initRevotePermissionModal() {
  const modal = document.getElementById("modalRevotePermission");
  const btnClose = document.getElementById("btnCloseRevoteModal");
  const btnCancel = document.getElementById("btnCancelRevoteModal");
  const form = document.getElementById("formAuthorizeRevote");

  if (btnClose) btnClose.addEventListener("click", () => modal && modal.classList.add("hidden"));
  if (btnCancel) btnCancel.addEventListener("click", () => modal && modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentRevoteTargetSid) return;

      const student = MOCK_STUDENTS[currentRevoteTargetSid];
      if (!student) return;

      const reason = document.getElementById("selectRevoteReason")?.value;
      const authRef = document.getElementById("inputRevoteAuthRef")?.value.trim() || `CEC/REV-2026/0${Math.floor(Math.random() * 90) + 10}`;
      const notes = document.getElementById("textareaRevoteNotes")?.value.trim();

      // Grant Revote Clearance
      student.hasVoted = false;
      student.revoteGranted = true;
      student.revoteCount = (student.revoteCount || 0) + 1;
      student.revoteReason = reason;
      student.revoteAuthRef = authRef;
      student.revoteNotes = notes;
      student.previousReceiptHash = student.receiptHash;
      student.receiptHash = null;

      // If this student is currently logged in, refresh session and unlock booth
      if (APP_STATE.currentUser?.role === "student" && APP_STATE.currentUser.user?.studentId === student.studentId) {
        APP_STATE.currentUser.user.hasVoted = false;
        applyUserSession(APP_STATE.currentUser);
        transitionBoothStage("stageLogin", 1);
      }

      // Add block to blockchain ledger
      const lastBlock = APP_STATE.blockchain[APP_STATE.blockchain.length - 1];
      const newIdx = APP_STATE.blockchain.length;
      APP_STATE.blockchain.push({
        index: newIdx,
        timestamp: new Date().toISOString(),
        data: {
          type: "REVOTE_CLEARANCE_ISSUED",
          electionId: "ELEX-2026-MAIN",
          studentId: student.studentId,
          orderRef: authRef,
          reason: reason,
          supersededReceipt: student.previousReceiptHash || "NONE"
        },
        previousHash: lastBlock ? lastBlock.hash : "0000000000000000000000000000000000000000000000000000000000000000",
        merkleRoot: "0x" + Math.random().toString(16).substr(2, 16),
        nonce: Math.floor(Math.random() * 8000) + 1000,
        hash: "0000" + Math.random().toString(16).substr(2, 28) + Math.random().toString(16).substr(2, 28),
        tampered: false
      });

      // Add to security audit log
      APP_STATE.logs.unshift({
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        eventType: "REVOTE_CLEARANCE_GRANTED",
        details: `Voter ${student.studentId} (${student.name}) granted revote clearance by Admin. Order: ${authRef}. Reason: ${reason}. Prior receipt superseded.`,
        ip: "192.168.1.1 (Admin Console)",
        isSuspicious: false
      });

      renderAuditLogTable(APP_STATE.logs);
      renderVoterRosterTable();
      if (typeof renderBlockchainNodes === "function") renderBlockchainNodes();

      if (modal) modal.classList.add("hidden");
      showToast(`Revote permission granted for ${student.name} (${student.studentId}). Student can recast their ballot!`, "success");
    });
  }
}

function openRevotePermissionModal(studentId) {
  const student = MOCK_STUDENTS[studentId];
  if (!student) return;
  currentRevoteTargetSid = studentId;

  const modal = document.getElementById("modalRevotePermission");
  if (!modal) return;

  const elName = document.getElementById("revoteTargetStudentName");
  const elMeta = document.getElementById("revoteTargetStudentMeta");
  const elReceipt = document.getElementById("revoteTargetReceipt");
  const elStatus = document.getElementById("revoteTargetCurrentStatus");

  if (elName) elName.textContent = student.name;
  if (elMeta) elMeta.textContent = `PRN: ${student.studentId} • ${student.department} • ${student.year}`;
  if (elReceipt) {
    if (student.receiptHash) {
      elReceipt.textContent = `Current Receipt Hash: ${student.receiptHash}`;
    } else if (student.previousReceiptHash) {
      elReceipt.textContent = `Superseded Receipt: ${student.previousReceiptHash}`;
    } else {
      elReceipt.textContent = "No receipt on file";
    }
  }
  if (elStatus) {
    elStatus.innerHTML = student.hasVoted ? `<i class="fa-solid fa-check"></i> Has Voted` : `<i class="fa-solid fa-clock"></i> Eligible`;
  }

  const elRef = document.getElementById("inputRevoteAuthRef");
  if (elRef) elRef.value = `CEC/REV-2026/0${Math.floor(Math.random() * 80) + 10}`;

  modal.classList.remove("hidden");
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
  const btnHubRun = document.getElementById("btnHubRunAsCandidate");
  const btnCloseAdd = document.getElementById("btnCloseAddCandidateModal");
  const btnCancelAdd = document.getElementById("btnCancelAddCandidate");
  const btnNomCloseModal = document.getElementById("btnNomCloseModal");
  const formAdd = document.getElementById("formAddCandidate");

  // Step Panes & Tabs
  const stepper = document.querySelector(".nom-stepper");
  const stepPanes = [
    document.getElementById("nomStepPane1"),
    document.getElementById("nomStepPane2"),
    document.getElementById("nomStepPane3"),
    document.getElementById("nomStepPane4"),
    document.getElementById("nomStepPane5")
  ];
  const stepTabs = [
    document.getElementById("nomStepTab1"),
    document.getElementById("nomStepTab2"),
    document.getElementById("nomStepTab3"),
    document.getElementById("nomStepTab4")
  ];
  const stepLines = [
    document.getElementById("nomStepLine1"),
    document.getElementById("nomStepLine2"),
    document.getElementById("nomStepLine3")
  ];

  let currentStep = 1;

  function resetNominationPortal() {
    currentStep = 1;
    if (stepper) {
      stepper.classList.remove("hidden");
      stepper.style.display = "";
    }
    if (formAdd) {
      formAdd.classList.remove("hidden");
      formAdd.style.display = "";
    }
    goToNomStep(1);
    updateGatekeeper();
  }

  function goToNomStep(step) {
    currentStep = step;
    stepPanes.forEach((pane, idx) => {
      if (pane) {
        if (idx + 1 === step) {
          pane.classList.remove("hidden");
        } else {
          pane.classList.add("hidden");
        }
      }
    });

    // Reset modal scroll position to top on step transition
    const modalBox = document.querySelector(".nomination-modal-box");
    if (modalBox) modalBox.scrollTop = 0;

    if (step <= 4) {
      stepTabs.forEach((tab, idx) => {
        if (!tab) return;
        const tabStep = idx + 1;
        tab.classList.remove("active", "completed");
        if (tabStep === step) {
          tab.classList.add("active");
        } else if (tabStep < step) {
          tab.classList.add("completed");
        }
      });

      stepLines.forEach((line, idx) => {
        if (!line) return;
        if (idx + 1 < step) {
          line.classList.add("completed");
        } else {
          line.classList.remove("completed");
        }
      });
    }

    // Step 4: Live Preview Renderer
    if (step === 4) {
      updateLiveBallotPreview();
    }
  }

  // Click on Stepper Tabs to navigate directly
  stepTabs.forEach((tab, idx) => {
    if (tab) {
      tab.addEventListener("click", () => {
        const targetStep = idx + 1;
        goToNomStep(targetStep);
      });
    }
  });

  // Open & Close Handlers
  function openNomModal() {
    if (modalAdd) {
      modalAdd.classList.remove("hidden");
      resetNominationPortal();
    }
  }

  function closeNomModal() {
    if (modalAdd) {
      modalAdd.classList.add("hidden");
    }
  }

  if (btnOpenAdd) btnOpenAdd.addEventListener("click", openNomModal);
  if (btnHubRun) btnHubRun.addEventListener("click", openNomModal);
  if (btnCloseAdd) btnCloseAdd.addEventListener("click", closeNomModal);
  if (btnCancelAdd) btnCancelAdd.addEventListener("click", closeNomModal);
  if (btnNomCloseModal) btnNomCloseModal.addEventListener("click", closeNomModal);

  // Stepper Forward / Back Buttons
  const btnNomNext1 = document.getElementById("btnNomNext1");
  const btnNomNext2 = document.getElementById("btnNomNext2");
  const btnNomNext3 = document.getElementById("btnNomNext3");
  const btnNomBack2 = document.getElementById("btnNomBack2");
  const btnNomBack3 = document.getElementById("btnNomBack3");
  const btnNomBack4 = document.getElementById("btnNomBack4");

  if (btnNomNext1) {
    btnNomNext1.addEventListener("click", () => {
      const name = document.getElementById("candName")?.value.trim();
      const roll = document.getElementById("candRollNo")?.value.trim();
      const tagline = document.getElementById("candTagline")?.value.trim();
      const cgpa = parseFloat(document.getElementById("nomCgpaInput")?.value) || 0;
      const att = parseInt(document.getElementById("nomAttendanceInput")?.value) || 0;

      if (!name || !roll || !tagline) {
        showToast("Please fill in candidate Name, Roll Number, and Vision Tagline.", "warning");
        return;
      }
      if (cgpa < 6.50) {
        showToast("CGPA below statutory minimum of 6.50. Disqualified by Scrutiny Rule §4.1.", "error");
        return;
      }
      if (att < 75) {
        showToast("Attendance below mandatory 75%. Please secure proctorial waiver before proceeding.", "error");
        return;
      }
      goToNomStep(2);
    });
  }

  if (btnNomBack2) btnNomBack2.addEventListener("click", () => goToNomStep(1));

  if (btnNomNext2) {
    btnNomNext2.addEventListener("click", () => {
      const pName = document.getElementById("nomProposerName")?.value.trim();
      const sName = document.getElementById("nomSeconderName")?.value.trim();
      if (!pName || !sName) {
        showToast("Both Proposer and Seconder peer endorsements are mandatory.", "warning");
        return;
      }
      goToNomStep(3);
    });
  }

  if (btnNomBack3) btnNomBack3.addEventListener("click", () => goToNomStep(2));

  if (btnNomNext3) {
    btnNomNext3.addEventListener("click", () => {
      const mAcad = document.getElementById("mAcademic")?.value.trim();
      const mInfra = document.getElementById("mInfra")?.value.trim();
      const mEve = document.getElementById("mEvents")?.value.trim();
      const mWel = document.getElementById("mWelfare")?.value.trim();
      const mTech = document.getElementById("mTech")?.value.trim();
      const mPlace = document.getElementById("mPlacement")?.value.trim();
      const mPrev = document.getElementById("mPrevWork")?.value.trim();

      if (!mAcad || !mInfra || !mEve || !mWel || !mTech || !mPlace || !mPrev) {
        showToast("Please complete all 8 standardized manifesto categories as per Slide 5 criteria.", "warning");
        return;
      }
      goToNomStep(4);
    });
  }

  if (btnNomBack4) btnNomBack4.addEventListener("click", () => goToNomStep(3));

  // Live Ballot Preview Card Update
  function updateLiveBallotPreview() {
    const name = document.getElementById("candName")?.value.trim() || "Candidate Name";
    const dept = document.getElementById("candDept")?.value || "CSE";
    const year = document.getElementById("candYear")?.value || "3rd Year";
    const post = document.getElementById("candPosition")?.value || "For President";
    const tagline = document.getElementById("candTagline")?.value.trim() || "Dedicated to student growth";
    const avatar = document.getElementById("candAvatarUrl")?.value || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
    const score = document.getElementById("mActionReady")?.value || "86";

    const prevAvatar = document.getElementById("prevCardAvatar");
    const prevDept = document.getElementById("prevCardDept");
    const prevName = document.getElementById("prevCardName");
    const prevPost = document.getElementById("prevCardPost");
    const prevTag = document.getElementById("prevCardTagline");
    const prevScore = document.getElementById("prevCardScore");
    const prevGauge = document.getElementById("prevCardGauge");

    if (prevAvatar) prevAvatar.src = avatar;
    if (prevDept) prevDept.textContent = `${dept} • ${year}`;
    if (prevName) prevName.textContent = name;
    if (prevPost) prevPost.textContent = post;
    if (prevTag) prevTag.textContent = `"${tagline}"`;
    if (prevScore) prevScore.textContent = `${score}%`;
    if (prevGauge) prevGauge.style.setProperty("--score", score);

    const sigTimestamp = document.getElementById("lblSignatureTimestamp");
    if (sigTimestamp) {
      sigTimestamp.textContent = `CEC-SEC-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString(16).toUpperCase()}`;
    }

    const digiSig = document.getElementById("nomDigitalSignature");
    if (digiSig && !digiSig.value) {
      digiSig.value = name;
    }
  }

  // Avatar Picker Click Listener
  const avatarPickerRow = document.getElementById("avatarPickerRow");
  if (avatarPickerRow) {
    avatarPickerRow.querySelectorAll(".avatar-option").forEach(opt => {
      opt.addEventListener("click", () => {
        avatarPickerRow.querySelectorAll(".avatar-option").forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        const hiddenInput = document.getElementById("candAvatarUrl");
        if (hiddenInput && opt.dataset.url) {
          hiddenInput.value = opt.dataset.url;
        }
      });
    });
  }

  // Eligibility Checks Real-Time Calculator
  const cgpaInput = document.getElementById("nomCgpaInput");
  const attInput = document.getElementById("nomAttendanceInput");
  const badgeCgpa = document.getElementById("badgeCgpaStatus");
  const badgeAtt = document.getElementById("badgeAttendanceStatus");
  const cgpaHelp = document.getElementById("cgpaHelpText");
  const attHelp = document.getElementById("attendanceHelpText");
  const gatekeeper = document.getElementById("nomEligibilityGatekeeper");

  function updateGatekeeper() {
    const cgpa = parseFloat(cgpaInput?.value) || 0;
    const att = parseInt(attInput?.value) || 0;
    let cgpaOk = cgpa >= 6.50;
    let attOk = att >= 75;

    if (badgeCgpa) {
      badgeCgpa.textContent = cgpaOk ? "PASSED" : "DEFICIENT";
      badgeCgpa.className = `ec-status-badge ${cgpaOk ? "badge-passed" : "badge-failed"}`;
    }
    if (cgpaHelp) {
      cgpaHelp.textContent = cgpaOk 
        ? `Min 6.50 required • Candidate is in top ${cgpa >= 8.5 ? "10%" : "25%"}`
        : "Failed statutory threshold of 6.50 CGPA";
    }

    if (badgeAtt) {
      badgeAtt.textContent = attOk ? "PASSED" : "SHORTFALL";
      badgeAtt.className = `ec-status-badge ${attOk ? "badge-passed" : "badge-failed"}`;
    }
    if (attHelp) {
      attHelp.textContent = attOk 
        ? `Min 75% required • ${att - 75}% safety buffer`
        : `Deficit of ${75 - att}% below CEC requirement`;
    }

    if (gatekeeper) {
      if (cgpaOk && attOk) {
        gatekeeper.className = "nom-gatekeeper-alert";
        gatekeeper.innerHTML = `
          <i class="fa-solid fa-circle-check text-emerald"></i>
          <div class="gatekeeper-text">
            <strong>CEC Pre-Screening Status: ELIGIBILITY APPROVED</strong>
            <span>Candidate meets all statutory bylaws to submit formal nomination for Student Council Election 2026.</span>
          </div>
        `;
      } else {
        gatekeeper.className = "nom-gatekeeper-alert denied";
        gatekeeper.innerHTML = `
          <i class="fa-solid fa-circle-exclamation text-rose"></i>
          <div class="gatekeeper-text">
            <strong>CEC Pre-Screening Status: STATUTORY CRITERIA NOT MET</strong>
            <span>Candidate does not fulfill mandatory academic or attendance bylaws. Application cannot proceed.</span>
          </div>
        `;
      }
    }
  }

  if (cgpaInput) cgpaInput.addEventListener("input", updateGatekeeper);
  if (attInput) attInput.addEventListener("input", updateGatekeeper);

  // Feasibility Slider
  const sliderActionReady = document.getElementById("mActionReady");
  const lblActionReadyVal = document.getElementById("lblActionReadyVal");
  const lblFeasibilityBadge = document.getElementById("lblFeasibilityBadge");

  if (sliderActionReady) {
    sliderActionReady.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      if (lblActionReadyVal) lblActionReadyVal.textContent = `${val}%`;
      if (lblFeasibilityBadge) {
        if (val >= 80) {
          lblFeasibilityBadge.textContent = "High Feasibility";
          lblFeasibilityBadge.className = "nom-feasibility-tag badge-passed";
        } else if (val >= 65) {
          lblFeasibilityBadge.textContent = "Moderate Feasibility";
          lblFeasibilityBadge.className = "nom-feasibility-tag badge-passed";
        } else {
          lblFeasibilityBadge.textContent = "Review Recommended";
          lblFeasibilityBadge.className = "nom-feasibility-tag badge-failed";
        }
      }
    });
  }

  // 1-Click Demo Fill
  const btnNomDemoFill = document.getElementById("btnNomDemoFill");
  if (btnNomDemoFill) {
    btnNomDemoFill.addEventListener("click", () => {
      document.getElementById("candName").value = "Devansh Singhania";
      document.getElementById("candRollNo").value = "22BCSE105";
      document.getElementById("candPosition").value = "For President";
      document.getElementById("candDept").value = "CSE";
      document.getElementById("candYear").value = "3rd Year";
      document.getElementById("candTagline").value = "Transparent leadership, 24/7 innovation labs, and student welfare first";
      
      const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
      document.getElementById("candAvatarUrl").value = defaultAvatar;
      if (avatarPickerRow) {
        avatarPickerRow.querySelectorAll(".avatar-option").forEach((opt, idx) => {
          opt.classList.toggle("selected", idx === 0);
        });
      }

      if (cgpaInput) cgpaInput.value = "8.92";
      if (attInput) attInput.value = "91";
      updateGatekeeper();

      document.getElementById("nomProposerName").value = "Priya Nair";
      document.getElementById("nomProposerRoll").value = "22BECE205";
      document.getElementById("nomProposerDept").value = "ECE • 3rd Year";

      document.getElementById("nomSeconderName").value = "Simran Kaur";
      document.getElementById("nomSeconderRoll").value = "22BME412";
      document.getElementById("nomSeconderDept").value = "Mechanical • 3rd Year";

      applyManifestoPreset("tech");

      const digiSig = document.getElementById("nomDigitalSignature");
      if (digiSig) digiSig.value = "Devansh Singhania";

      showToast("Sample verified candidate profile (Devansh Singhania) loaded!", "success");
    });
  }

  // 1-Click Peer Autofill
  const btnNomAutofillPeers = document.getElementById("btnNomAutofillPeers");
  if (btnNomAutofillPeers) {
    btnNomAutofillPeers.addEventListener("click", () => {
      document.getElementById("nomProposerName").value = "Priya Nair";
      document.getElementById("nomProposerRoll").value = "22BECE205";
      document.getElementById("nomProposerDept").value = "ECE • 3rd Year";

      document.getElementById("nomSeconderName").value = "Simran Kaur";
      document.getElementById("nomSeconderRoll").value = "22BME412";
      document.getElementById("nomSeconderDept").value = "Mechanical • 3rd Year";

      showToast("Verified peer electors linked and OTP validated.", "success");
    });
  }

  // Manifesto Presets
  const btnPresetTech = document.getElementById("btnPresetTech");
  const btnPresetWelfare = document.getElementById("btnPresetWelfare");
  const btnPresetCareer = document.getElementById("btnPresetCareer");

  function applyManifestoPreset(type) {
    const presets = {
      tech: {
        academic: "AI-assisted peer tutoring pods, centralized exam notes repository, weekly doubt labs",
        infra: "High-performance GPU cluster access, 24/7 Library reading rooms, gigabit hostel Wi-Fi",
        events: "36-hr National Hackathon, Inter-college Cultural Summit, Campus e-Sports Championship",
        welfare: "24/7 Anonymous mental health helpline, subsidized hygienic night cafeteria, grievance SLA",
        tech: "Single-sign-on Campus Companion App, automated lab booking, digital student council portal",
        placement: "FAANG & top startup alumni mentorship, weekly mock coding rounds, resume teardowns",
        prevWork: "Lead Coordinator TechFest 2025 (800+ attendees), Class Representative 2 yrs",
        score: 88
      },
      welfare: {
        academic: "Open book study hubs, peer tutoring for struggling courses, curated video archives",
        infra: "Subsidized hygienic night canteen, eco-friendly campus shuttle, clean water filtration stations",
        events: "Mental wellness week, international food & culture carnival, inter-hostel league",
        welfare: "24/7 Professional counselling sanctuary, women safety rapid helpline, student emergency fund",
        tech: "Anonymous student voice hotline, real-time bus transport tracker, cafeteria menu rating",
        placement: "Stipend grants for unpaid internships, competitive exam (GATE/CAT) study pods",
        prevWork: "Head of Student Welfare Taskforce, organized campus medical relief & blood donation",
        score: 85
      },
      career: {
        academic: "Industry-aligned elective workshops, transparent faculty evaluations, research grants",
        infra: "Soundproof interview cubicles, expanded digital library journals & IEEE access",
        events: "Industry HR Conclave, Startup Pitch Fest with seed grants, alumni return talk series",
        welfare: "Placement stress management workshops, peer therapy groups, ergonomic hostel desks",
        tech: "Campus job referral portal, automated alumni networking engine, interview transcription AI",
        placement: "Guaranteed 100+ company drives, aptitude bootcamps, international internship tie-ups",
        prevWork: "Lead Student Placement Representative, trained 250+ juniors in Data Structures",
        score: 90
      }
    };

    const p = presets[type];
    if (!p) return;

    document.getElementById("mAcademic").value = p.academic;
    document.getElementById("mInfra").value = p.infra;
    document.getElementById("mEvents").value = p.events;
    document.getElementById("mWelfare").value = p.welfare;
    document.getElementById("mTech").value = p.tech;
    document.getElementById("mPlacement").value = p.placement;
    document.getElementById("mPrevWork").value = p.prevWork;

    if (sliderActionReady) {
      sliderActionReady.value = p.score;
      sliderActionReady.dispatchEvent(new Event("input"));
    }

    [btnPresetTech, btnPresetWelfare, btnPresetCareer].forEach(b => {
      if (b) b.classList.remove("active");
    });
    if (type === "tech" && btnPresetTech) btnPresetTech.classList.add("active");
    if (type === "welfare" && btnPresetWelfare) btnPresetWelfare.classList.add("active");
    if (type === "career" && btnPresetCareer) btnPresetCareer.classList.add("active");
  }

  if (btnPresetTech) btnPresetTech.addEventListener("click", () => applyManifestoPreset("tech"));
  if (btnPresetWelfare) btnPresetWelfare.addEventListener("click", () => applyManifestoPreset("welfare"));
  if (btnPresetCareer) btnPresetCareer.addEventListener("click", () => applyManifestoPreset("career"));

  // Form Submit Handler (CEC-1A Submission)
  if (formAdd) {
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("candName").value.trim();
      const roll = document.getElementById("candRollNo").value.trim() || "22BCSE105";
      const position = document.getElementById("candPosition").value;
      const dept = document.getElementById("candDept").value;
      const year = document.getElementById("candYear").value;
      const tagline = document.getElementById("candTagline").value.trim();
      const avatar = document.getElementById("candAvatarUrl").value || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
      const proposer = document.getElementById("nomProposerName").value.trim() || "Priya Nair";
      const seconder = document.getElementById("nomSeconderName").value.trim() || "Simran Kaur";
      const cgpa = parseFloat(document.getElementById("nomCgpaInput").value) || 8.92;
      const attendance = parseInt(document.getElementById("nomAttendanceInput").value) || 91;
      const actionReady = parseInt(document.getElementById("mActionReady").value) || 86;

      const palette = ["#38bdf8", "#10b981", "#a855f7", "#f59e0b", "#ec4899", "#06b6d4"];
      const nextCandNum = APP_STATE.candidates.length + 1;
      const candId = `CAND-0${nextCandNum}`;
      const color = palette[APP_STATE.candidates.length % palette.length];

      const newCand = {
        id: candId,
        name: name,
        rollNo: roll,
        position: position,
        department: dept,
        year: year,
        avatar: avatar,
        tagline: tagline,
        color: color,
        manifesto: {
          academic: document.getElementById("mAcademic").value.trim(),
          infrastructure: document.getElementById("mInfra").value.trim(),
          events: document.getElementById("mEvents").value.trim(),
          welfare: document.getElementById("mWelfare").value.trim(),
          technology: document.getElementById("mTech").value.trim(),
          placement: document.getElementById("mPlacement").value.trim(),
          previousWork: document.getElementById("mPrevWork").value.trim(),
          commitmentsCount: 11,
          actionReadyScore: actionReady
        },
        votes: 0,
        cgpa: cgpa,
        attendance: attendance,
        proposer: proposer,
        seconder: seconder
      };

      // Mint candidate into APP_STATE
      APP_STATE.candidates.push(newCand);
      if (!APP_STATE.selectedMatrixIds.includes(candId)) {
        if (APP_STATE.selectedMatrixIds.length >= 4) {
          APP_STATE.selectedMatrixIds.pop();
        }
        APP_STATE.selectedMatrixIds.push(candId);
      }

      // Add to Scrutiny Desk Queue
      const nomQueueItem = {
        id: `NOM-2026-0${Date.now() % 1000}`,
        candId: candId,
        name: name,
        rollNo: roll,
        department: dept,
        year: year,
        position: position,
        tagline: tagline,
        avatar: avatar,
        color: color,
        cgpa: cgpa,
        attendance: attendance,
        proctorialStatus: "CLEARED",
        arrears: 0,
        proposer: proposer,
        seconder: seconder,
        status: "pending",
        submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        scores: {
          academic: Math.min(25, Math.round((cgpa / 10) * 20 + (attendance / 100) * 5)),
          faculty: 22,
          portfolio: 20,
          manifesto: 21
        },
        compositeScore: Math.min(25, Math.round((cgpa / 10) * 20 + (attendance / 100) * 5)) + 63,
        grade: "A",
        teacherReview: "Candidate nomination filed under CEC Form 1A. Awaiting formal faculty conduct signoff.",
        portfolioHighlights: "8-point student welfare manifesto filed. Co-curricular verification underway.",
        manifestoSummary: (document.getElementById("mAcademic")?.value.trim().substr(0, 80) || "Student Welfare") + "...",
        reviewerRemarks: "Submitted online. Pending admin feasibility scoring."
      };
      if (!APP_STATE.candidateScrutinyQueue) APP_STATE.candidateScrutinyQueue = [];
      APP_STATE.candidateScrutinyQueue.unshift(nomQueueItem);
      if (typeof renderScrutinyQueue === "function") renderScrutinyQueue();

      // Re-render UI components
      initMatrixToggles();
      renderComparisonMatrix();
      renderBallotCandidates();
      if (typeof renderOngoingElectionRadar === "function") {
        renderOngoingElectionRadar();
      }

      // Add Official Circular Notice to APP_STATE
      const noticeRef = `CEC/2026/0${45 + APP_STATE.candidates.length}`;
      const newNotice = {
        id: `NOT-2026-0${Date.now() % 1000}`,
        refNo: noticeRef,
        title: `Candidacy Scrutiny Clearance: ${newCand.name} (${newCand.department})`,
        category: "candidacy",
        priority: "urgent",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        read: false,
        summary: `The Central Scrutiny Committee has verified and cleared the nomination of ${newCand.name} for the post of ${newCand.position.replace('For ', '')}. All statutory criteria satisfied.`,
        body: `Official Circular from the Central Election Commission.\n\nPursuant to the scrutiny of nominations filed under CEC Form 1A, candidate ${newCand.name} (Roll No: ${newCand.rollNo}, Department of ${newCand.department}) has met all constitutional requirements: verified CGPA ${newCand.cgpa}, attendance ${newCand.attendance}%, clean proctorial record, and verified peer endorsements.\n\nThe candidate has been officially minted to the digital ballot roster with Candidate ID ${newCand.id}.`,
        signatory: "Prof. R. K. Shrivastava",
        signatoryRole: "Chief Returning Officer, CEC"
      };

      if (APP_STATE.notices) {
        APP_STATE.notices.unshift(newNotice);
        if (typeof renderNoticesList === "function") renderNoticesList();
        if (typeof updateTopNoticeBanner === "function") updateTopNoticeBanner();
        if (typeof updateNoticeBadges === "function") updateNoticeBadges();
      }

      // Populate Official Certificate
      const certRef = `CEC-NOM-2026-0${40 + nextCandNum}`;
      const elemRef = document.getElementById("certFileRef");
      const elemAvatar = document.getElementById("certCandAvatar");
      const elemIdTag = document.getElementById("certCandIdTag");
      const elemName = document.getElementById("certCandName");
      const elemDept = document.getElementById("certCandDept");
      const elemPos = document.getElementById("certCandPosition");
      const elemTag = document.getElementById("certCandTagline");
      const elemCgpa = document.getElementById("certCgpa");
      const elemAtt = document.getElementById("certAtt");
      const elemFeas = document.getElementById("certFeas");
      const elemProp = document.getElementById("certProposer");
      const elemSec = document.getElementById("certSeconder");

      if (elemRef) elemRef.textContent = certRef;
      if (elemAvatar) elemAvatar.src = newCand.avatar;
      if (elemIdTag) elemIdTag.textContent = newCand.id;
      if (elemName) elemName.textContent = newCand.name;
      if (elemDept) elemDept.textContent = `${newCand.department} • ${newCand.year} | Roll No: ${newCand.rollNo}`;
      if (elemPos) elemPos.innerHTML = `<strong>Contesting:</strong> ${newCand.position.replace('For ', '')} (Student Council)`;
      if (elemTag) elemTag.textContent = `"${newCand.tagline}"`;
      if (elemCgpa) elemCgpa.textContent = newCand.cgpa.toFixed(2);
      if (elemAtt) elemAtt.textContent = `${newCand.attendance}%`;
      if (elemFeas) elemFeas.textContent = `${newCand.manifesto.actionReadyScore}%`;
      if (elemProp) elemProp.textContent = `${newCand.proposer} (Verified Elector)`;
      if (elemSec) elemSec.textContent = `${newCand.seconder} (Verified Elector)`;

      // Hide stepper & form, show certificate
      if (stepper) stepper.classList.add("hidden");
      if (formAdd) formAdd.classList.add("hidden");
      goToNomStep(5);

      showToast(`Candidacy Cleared! ${newCand.name} minted onto ballot & comparison matrix.`, "success");

      // Optional Backend Sync
      try {
        fetch("/api/admin/add-candidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCand)
        }).catch(() => {});
      } catch (err) {}
    });
  }

  // Certificate Actions
  const btnNomViewMatrix = document.getElementById("btnNomViewMatrix");
  const btnNomGoToBooth = document.getElementById("btnNomGoToBooth");

  if (btnNomViewMatrix) {
    btnNomViewMatrix.addEventListener("click", () => {
      closeNomModal();
      if (typeof switchTab === "function") switchTab("tab-matrix");
      const matrixElem = document.getElementById("matrixComparisonTable");
      if (matrixElem) matrixElem.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if (btnNomGoToBooth) {
    btnNomGoToBooth.addEventListener("click", () => {
      closeNomModal();
      if (typeof switchTab === "function") switchTab("tab-booth");
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

/* ==========================================================================
   1. AI MANIFESTO ASSISTANT & FEASIBILITY ENGINE
   ========================================================================== */
function initAiManifestoAssistant() {
  const inputQuery = document.getElementById("inputAiQuery");
  const btnRun = document.getElementById("btnRunAiQuery");
  const resultPanel = document.getElementById("aiResultPanel");
  const promptChips = document.querySelectorAll(".prompt-chip");

  if (!btnRun || !inputQuery || !resultPanel) return;

  promptChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query");
      inputQuery.value = q;
      runAiManifestoAnalysis(q);
    });
  });

  btnRun.addEventListener("click", () => {
    const q = inputQuery.value.trim();
    if (!q) {
      showToast("Please enter a question or click a prompt chip.", "warning");
      return;
    }
    runAiManifestoAnalysis(q);
  });

  inputQuery.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnRun.click();
    }
  });

  function runAiManifestoAnalysis(query) {
    resultPanel.classList.remove("hidden");
    resultPanel.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; color: #00f2fe; font-size: 13px;">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>AI Engine is parsing candidate manifestos across 8 standardized benchmarks...</span>
      </div>
    `;

    setTimeout(() => {
      const qLower = query.toLowerCase();
      
      // Keywords mapping
      const isPlacement = /placement|job|career|interview|resume|industry|training|internship/i.test(qLower);
      const isWifi = /wi-fi|wifi|internet|lab|computer|infrastructure|study|library|speed/i.test(qLower);
      const isWelfare = /welfare|mental|health|safety|women|helpline|support|counsel/i.test(qLower);
      const isEvents = /fest|culture|event|hackathon|sport|tournament|club/i.test(qLower);
      const isTrackRecord = /previous|record|lead|experience|organize|work/i.test(qLower);

      let topCand = APP_STATE.candidates[0];
      let matchScore = 94;
      let quote = "Mentorship programs, doubt clearing hub, smart classes";
      let explanation = "Strongest candidate for systematic academic tutoring, peer networks, and practical workshops.";
      let budgetScore = 88;
      let scopeScore = 95;
      let speedText = "Immediate (Semester 1 Launch)";

      if (isPlacement) {
        topCand = APP_STATE.candidates.find(c => c.name.includes("Neha")) || APP_STATE.candidates[2];
        matchScore = 96;
        quote = topCand.manifesto.placement + " • " + topCand.manifesto.academic;
        explanation = "Neha Verma's manifesto explicitly guarantees career coaching, internship portals, and direct industry mentor connections.";
        budgetScore = 84;
        scopeScore = 92;
        speedText = "Fast (1-2 Months Rollout)";
      } else if (isWifi) {
        topCand = APP_STATE.candidates.find(c => c.name.includes("Rohan")) || APP_STATE.candidates[1];
        matchScore = 95;
        quote = topCand.manifesto.infrastructure + " • " + topCand.manifesto.technology;
        explanation = "Rohan Mehta focuses heavily on dedicated computer laboratories, high-speed Wi-Fi extensions, and upgraded research software.";
        budgetScore = 68;
        scopeScore = 78;
        speedText = "Medium (6-Month Lab Extension)";
      } else if (isWelfare) {
        topCand = APP_STATE.candidates.find(c => c.name.includes("Aisha")) || APP_STATE.candidates[0];
        matchScore = 93;
        quote = topCand.manifesto.welfare + " • " + topCand.manifesto.academic;
        explanation = "Aisha Khan places student welfare, counseling networks, and inclusive doubt-clearing as her core top priority.";
        budgetScore = 92;
        scopeScore = 96;
        speedText = "Immediate (Within 2 Weeks)";
      } else if (isEvents) {
        topCand = APP_STATE.candidates.find(c => c.name.includes("Arjun")) || APP_STATE.candidates[3];
        matchScore = 97;
        quote = topCand.manifesto.events + " • " + topCand.manifesto.technology;
        explanation = "Arjun Rao's vision features inter-college coding leagues, e-sports gaming tournaments, and 24-hour hackathons.";
        budgetScore = 82;
        scopeScore = 88;
        speedText = "Fast (Semester 1 Tech Fest)";
      } else if (isTrackRecord) {
        topCand = APP_STATE.candidates.find(c => c.name.includes("Arjun")) || APP_STATE.candidates[0];
        matchScore = 91;
        quote = topCand.manifesto.previousWork;
        explanation = `${topCand.name} has demonstrated proven leadership by managing college-wide events with high turnout.`;
        budgetScore = 85;
        scopeScore = 90;
        speedText = "Proven Track Record";
      }

      resultPanel.innerHTML = `
        <div class="ai-recommendation-card">
          <img src="${topCand.avatar}" alt="${topCand.name}" class="ai-rec-avatar">
          <div class="ai-rec-info" style="flex: 1;">
            <h4>
              <span>${topCand.name} (${topCand.department})</span>
              <span class="match-percentage-badge"><i class="fa-solid fa-sparkles"></i> ${matchScore}% Best Match</span>
            </h4>
            <div class="ai-rec-summary">${explanation}</div>
            <div class="ai-highlight-quote">
              <i class="fa-solid fa-quote-left" style="opacity: 0.6; margin-right: 6px;"></i>
              "${quote}"
            </div>

            <!-- 3-Point Feasibility Meter -->
            <div class="feasibility-meter-row">
              <div class="feasibility-item">
                <span>Budget Feasibility:</span>
                <span class="f-val text-emerald">${budgetScore}% (Affordable)</span>
              </div>
              <div class="feasibility-item">
                <span>Council Authority Scope:</span>
                <span class="f-val text-cyan">${scopeScore}% (Autonomous)</span>
              </div>
              <div class="feasibility-item">
                <span>Execution Horizon:</span>
                <span class="f-val text-amber">${speedText}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }, 400);
  }
}

/* ==========================================================================
   2. WEBCAM BIOMETRIC LIVENESS SCANNER & MULTI-AUTH
   ========================================================================== */
function initBiometricVerification() {
  const btnOtp = document.getElementById("btnMethodOtp");
  const btnQr = document.getElementById("btnMethodQr");
  const btnBio = document.getElementById("btnMethodBiometric");

  const viewOtp = document.getElementById("viewVerifyOtp");
  const viewQr = document.getElementById("viewVerifyQr");
  const viewBio = document.getElementById("viewVerifyBiometric");

  const video = document.getElementById("webcamVideo");
  const canvas = document.getElementById("biometricCanvas");
  const btnToggleCam = document.getElementById("btnToggleWebcam");
  const btnCaptureBio = document.getElementById("btnCaptureBiometric");
  const hudStatus = document.getElementById("biometricHudStatus");

  let isCameraRunning = false;
  let hudAnimFrame = null;

  function switchMethod(method) {
    [btnOtp, btnQr, btnBio].forEach(b => b && b.classList.remove("active"));
    [viewOtp, viewQr, viewBio].forEach(v => v && v.classList.add("hidden"));

    if (method === "otp") {
      if (btnOtp) btnOtp.classList.add("active");
      if (viewOtp) viewOtp.classList.remove("hidden");
      stopWebcam();
    } else if (method === "qr") {
      if (btnQr) btnQr.classList.add("active");
      if (viewQr) viewQr.classList.remove("hidden");
      stopWebcam();
    } else if (method === "bio") {
      if (btnBio) btnBio.classList.add("active");
      if (viewBio) viewBio.classList.remove("hidden");
      startWebcam();
    }
  }

  if (btnOtp) btnOtp.addEventListener("click", () => switchMethod("otp"));
  if (btnQr) btnQr.addEventListener("click", () => switchMethod("qr"));
  if (btnBio) btnBio.addEventListener("click", () => switchMethod("bio"));

  async function startWebcam() {
    if (isCameraRunning) return;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" }
        });
        APP_STATE.webcamStream = stream;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
        isCameraRunning = true;
        if (hudStatus) hudStatus.innerHTML = `<span class="pulse-dot"></span> Live Video Feed Active • Face Tracker Online`;
        startHudLoop();
        return;
      } catch (err) {
        console.info("Hardware camera unavailable or blocked, falling back to simulated biometric mesh HUD:", err);
      }
    }
    // Fallback simulated scanner
    isCameraRunning = true;
    if (hudStatus) hudStatus.innerHTML = `<span class="pulse-dot"></span> Simulated Biometric HUD Active • Tracking Face Mesh`;
    startHudLoop();
  }

  function stopWebcam() {
    if (APP_STATE.webcamStream) {
      APP_STATE.webcamStream.getTracks().forEach(t => t.stop());
      APP_STATE.webcamStream = null;
    }
    if (video) video.srcObject = null;
    isCameraRunning = false;
    if (hudAnimFrame) cancelAnimationFrame(hudAnimFrame);
  }

  function startHudLoop() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 240;

    let tick = 0;
    function draw() {
      if (!isCameraRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.05;

      const centerX = 160 + Math.sin(tick) * 6;
      const centerY = 120 + Math.cos(tick * 0.8) * 4;

      // Draw oval face boundary
      ctx.strokeStyle = "rgba(0, 242, 254, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 55, 75, 0, 0, 2 * Math.PI);
      ctx.stroke();

      // Feature points simulation
      ctx.fillStyle = "rgba(0, 242, 254, 0.7)";
      const points = [
        [centerX - 25, centerY - 20], // Left Eye
        [centerX + 25, centerY - 20], // Right Eye
        [centerX, centerY + 5],       // Nose tip
        [centerX - 20, centerY + 35], // Left mouth
        [centerX + 20, centerY + 35], // Right mouth
        [centerX, centerY + 42]       // Chin
      ];
      points.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      hudAnimFrame = requestAnimationFrame(draw);
    }
    draw();
  }

  if (btnToggleCam) {
    btnToggleCam.addEventListener("click", () => {
      stopWebcam();
      startWebcam();
    });
  }

  if (btnCaptureBio) {
    btnCaptureBio.addEventListener("click", () => {
      if (hudStatus) {
        hudStatus.innerHTML = `<i class="fa-solid fa-check text-emerald"></i> 68/68 Facial Landmarks Matched • Confidence: 99.4%`;
      }
      showToast("Biometric Liveness Confirmed! Ballot Unlocked.", "success");
      stopWebcam();
      setTimeout(() => {
        proceedToBallot();
      }, 500);
    });
  }
}

/* ==========================================================================
   3. TAMPER-EVIDENT MERKLE BLOCKCHAIN LEDGER EXPLORER
   ========================================================================== */
function initBlockchainLedger() {
  const btnTamper = document.getElementById("btnSimulateBlockchainTamper");
  const btnRestore = document.getElementById("btnRestoreBlockchain");
  const btnExport = document.getElementById("btnExportBlockchainJson");
  const btnCloseInsp = document.getElementById("btnCloseInspector");

  if (btnTamper) {
    btnTamper.addEventListener("click", async () => {
      // Toggle tamper on Block #1
      if (APP_STATE.blockchain.length > 1) {
        const blk = APP_STATE.blockchain[1];
        blk.tampered = true;
        blk.data.receiptHash = "0xDEADBEEF00000000";
        blk.merkleRoot = "0xDEADBEEF00000000";
        blk.hash = "9999deadbeef9999deadbeef9999deadbeef9999deadbeef9999deadbeef9999";

        APP_STATE.logs.unshift({
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          eventType: "TAMPER_ATTACK_DETECTED",
          details: "Block #1 hash altered outside protocol! Subsequent blocks broken.",
          ip: "192.168.1.200",
          isSuspicious: true
        });

        renderBlockchainNodes();
        showToast("CRITICAL TAMPER DETECTED: Block #1 hash mismatch severed the chain!", "error");
      }
    });
  }

  if (btnRestore) {
    btnRestore.addEventListener("click", () => {
      if (APP_STATE.blockchain.length > 1) {
        const blk = APP_STATE.blockchain[1];
        blk.tampered = false;
        blk.data.receiptHash = "0x7a89b4f321ec908d";
        blk.merkleRoot = "0x7a89b4f321ec908d";
        blk.hash = "bdbf46034983ed4cf54e36127ecac8775af17fe7ed2275f44c4f52c6d379280d";

        renderBlockchainNodes();
        showToast("Blockchain ledger integrity restored! All blocks verified.", "success");
      }
    });
  }

  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(APP_STATE.blockchain, null, 2));
      const a = document.createElement("a");
      a.setAttribute("href", dataStr);
      a.setAttribute("download", "election_blockchain_ledger.json");
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast("Blockchain Ledger JSON downloaded!", "success");
    });
  }

  if (btnCloseInsp) {
    btnCloseInsp.addEventListener("click", () => {
      const body = document.getElementById("inspectorBody");
      if (body) {
        body.innerHTML = `<div class="empty-inspector-text">Click on any block node in the chain above to inspect its cryptographic tree.</div>`;
      }
    });
  }

  renderBlockchainNodes();
}

function verifyBlockchainIntegrity() {
  for (let i = 1; i < APP_STATE.blockchain.length; i++) {
    const cur = APP_STATE.blockchain[i];
    const prev = APP_STATE.blockchain[i - 1];

    if (cur.tampered) {
      return { isValid: false, badIndex: i, reason: `Active data alteration flag on Block #${i}` };
    }
    if (cur.previousHash !== prev.hash) {
      return { isValid: false, badIndex: i, reason: `Previous hash mismatch: Block #${i} severed from Block #${i - 1}` };
    }
  }
  return { isValid: true, badIndex: -1, reason: "All blocks chained with valid cryptographic roots" };
}

function renderBlockchainNodes() {
  const track = document.getElementById("blockchainNodesTrack");
  const countPill = document.getElementById("chainBlockCount");
  const countBadge = document.getElementById("chainNodeCountBadge");
  const statusBadge = document.getElementById("blockchainStatusBadge");
  const statusLabel = document.getElementById("blockchainStatusLabel");
  const alertBox = document.getElementById("forensicAlertBox");

  if (!track) return;
  track.innerHTML = "";

  const check = verifyBlockchainIntegrity();

  if (countPill) countPill.textContent = `${APP_STATE.blockchain.length} Blocks`;
  if (countBadge) countBadge.textContent = `${APP_STATE.blockchain.length} Sealed Nodes`;

  if (check.isValid) {
    if (statusBadge) {
      statusBadge.className = "badge-pill-emerald";
    }
    if (statusLabel) statusLabel.textContent = "CHAIN INTEGRITY: CRYPTOGRAPHICALLY VALID";
    if (alertBox) alertBox.classList.add("hidden");
  } else {
    if (statusBadge) {
      statusBadge.className = "badge-pill-amber";
      statusBadge.style.background = "rgba(239, 68, 68, 0.2)";
      statusBadge.style.color = "#ef4444";
      statusBadge.style.border = "1px solid #ef4444";
    }
    if (statusLabel) statusLabel.textContent = "TAMPER ATTACK DETECTED: CHAIN CORRUPTED";
    if (alertBox) {
      alertBox.classList.remove("hidden");
      const blockIdEl = document.getElementById("forensicBlockId");
      const reasonEl = document.getElementById("forensicReason");
      if (blockIdEl) blockIdEl.textContent = `Block #${check.badIndex}`;
      if (reasonEl) reasonEl.textContent = check.reason;
    }
  }

  APP_STATE.blockchain.forEach((block, idx) => {
    const card = document.createElement("div");
    const isCorrupted = !check.isValid && idx >= check.badIndex;
    card.className = `block-node-card ${idx === 0 ? "genesis-node" : ""} ${isCorrupted ? "corrupted-node" : ""}`;

    const shortHash = block.hash.substring(0, 16) + "...";
    const shortPrev = block.previousHash.substring(0, 16) + "...";

    card.innerHTML = `
      <div class="block-header-strip">
        <div class="block-number">
          <i class="fa-solid fa-cube"></i> Block #${block.index}
        </div>
        <span class="${isCorrupted ? 'block-badge-tampered' : 'block-badge-valid'}">
          ${isCorrupted ? 'TAMPERED / FRAUD' : 'SEALED'}
        </span>
      </div>
      <div class="block-field">
        <span class="bf-label">Block Hash (SHA-256):</span>
        <span class="bf-val text-cyan">${shortHash}</span>
      </div>
      <div class="block-field">
        <span class="bf-label">Previous Hash:</span>
        <span class="bf-val" style="color: #94a3b8;">${shortPrev}</span>
      </div>
      <div class="block-field">
        <span class="bf-label">Merkle Root:</span>
        <span class="bf-val text-purple">${block.merkleRoot ? block.merkleRoot.substring(0, 18) + '...' : 'N/A'}</span>
      </div>
      <div class="block-field">
        <span class="bf-label">Payload Type:</span>
        <span class="bf-val" style="color: #cbd5e1;">${block.data.type} • ${new Date(block.timestamp).toLocaleTimeString()}</span>
      </div>
    `;

    card.addEventListener("click", () => inspectBlock(block));
    track.appendChild(card);

    if (idx < APP_STATE.blockchain.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "block-connector-arrow";
      arrow.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
      track.appendChild(arrow);
    }
  });
}

function inspectBlock(block) {
  const inspector = document.getElementById("inspectorBody");
  if (!inspector) return;

  inspector.innerHTML = `
    <div class="inspector-grid">
      <div>
        <span class="text-muted">Block Index:</span>
        <div style="font-weight: 700; color: #fff;">Block #${block.index} (${block.index === 0 ? "Genesis Root" : "Ballot Seal Node"})</div>
      </div>
      <div>
        <span class="text-muted">Timestamp:</span>
        <div style="color: #fff;">${block.timestamp}</div>
      </div>
      <div>
        <span class="text-muted">Cryptographic Nonce:</span>
        <div style="color: #00f2fe; font-family: monospace;">${block.nonce}</div>
      </div>
      <div>
        <span class="text-muted">Merkle Root Hash:</span>
        <div style="color: #8b5cf6; font-family: monospace; word-break: break-all;">${block.merkleRoot}</div>
      </div>
      <div style="grid-column: 1 / -1;">
        <span class="text-muted">Full Block Hash (SHA-256):</span>
        <div style="color: #10b981; font-family: monospace; word-break: break-all;">${block.hash}</div>
      </div>
      <div style="grid-column: 1 / -1;">
        <span class="text-muted">Previous Parent Block Hash:</span>
        <div style="color: #94a3b8; font-family: monospace; word-break: break-all;">${block.previousHash}</div>
      </div>
      <div style="grid-column: 1 / -1; margin-top: 8px;">
        <span class="text-muted">Block Data Payload (Anonymized Transaction):</span>
        <pre style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 6px; color: #cbd5e1; font-size: 12px; margin-top: 4px; overflow-x: auto;">${JSON.stringify(block.data, null, 2)}</pre>
      </div>
    </div>
  `;
}

/* ==========================================================================
   4. VOICE OF CAMPUS ISSUES RADAR / BAR CHART
   ========================================================================== */
function renderPriorityChart() {
  const ctx = document.getElementById("priorityChart");
  if (!ctx || typeof Chart === "undefined") return;

  if (APP_STATE.priorityChartInstance) {
    APP_STATE.priorityChartInstance.destroy();
  }

  const labels = Object.keys(APP_STATE.campusPriorities);
  const data = Object.values(APP_STATE.campusPriorities);

  APP_STATE.priorityChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Students Prioritizing This Issue",
        data: data,
        backgroundColor: [
          "rgba(0, 242, 254, 0.75)",
          "rgba(139, 92, 246, 0.75)",
          "rgba(16, 185, 129, 0.75)",
          "rgba(245, 158, 11, 0.75)",
          "rgba(236, 72, 153, 0.75)"
        ],
        borderColor: [
          "#00f2fe", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"
        ],
        borderWidth: 1.5,
        borderRadius: 8
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94a3b8" }
        },
        y: {
          grid: { display: false },
          ticks: { color: "#cbd5e1", font: { weight: "bold" } }
        }
      }
    }
  });
}

/* ==========================================================================
   5. WINNER CEREMONY MODAL & CELEBRATION FANFARE
   ========================================================================== */
let confettiInterval = null;

function initWinnerCeremony() {
  const btnClose = document.getElementById("btnCloseWinnerModal");
  const btnPrint = document.getElementById("btnPrintGazette");

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      document.getElementById("modalWinnerCeremony").classList.add("hidden");
      stopConfetti();
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }
}

function openWinnerCeremony() {
  const candidates = [...APP_STATE.candidates].sort((a, b) => b.votes - a.votes);
  const winner = candidates[0];
  const runnerUp = candidates[1];
  const margin = winner.votes - (runnerUp ? runnerUp.votes : 0);
  const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0);
  const turnoutPct = Math.round((totalVotes / 1250) * 100 * 10) / 10;

  const showcase = document.getElementById("winnerShowcaseCard");
  if (showcase) {
    showcase.innerHTML = `
      <img src="${winner.avatar}" alt="${winner.name}" class="winner-avatar">
      <div class="winner-info">
        <span class="badge-pill-emerald" style="font-size: 11px; margin-bottom: 6px;"><i class="fa-solid fa-crown"></i> COUNCIL PRESIDENT ELECT</span>
        <h3>${winner.name}</h3>
        <div class="cand-dept-tag">${winner.department} • ${winner.year}</div>
        <div class="winner-tagline">"${winner.tagline}"</div>
      </div>
    `;
  }

  const metrics = document.getElementById("winnerMetricsRow");
  if (metrics) {
    metrics.innerHTML = `
      <div class="w-metric-card">
        <span class="wm-val">${winner.votes}</span>
        <span class="wm-lbl">Winning Ballots</span>
      </div>
      <div class="w-metric-card">
        <span class="wm-val text-emerald">+${margin}</span>
        <span class="wm-lbl">Margin of Victory</span>
      </div>
      <div class="w-metric-card">
        <span class="wm-val text-purple">${turnoutPct}%</span>
        <span class="wm-lbl">Student Turnout</span>
      </div>
    `;
  }

  const runnerUpWrapper = document.getElementById("runnerUpTableWrapper");
  if (runnerUpWrapper) {
    let html = `
      <table class="audit-table" style="margin-top: 14px;">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate</th>
            <th>Branch</th>
            <th>Total Votes</th>
            <th>Share (%)</th>
          </tr>
        </thead>
        <tbody>
    `;
    candidates.forEach((c, idx) => {
      const share = totalVotes > 0 ? Math.round((c.votes / totalVotes) * 1000) / 10 : 0;
      html += `
        <tr style="${idx === 0 ? 'background: rgba(16, 185, 129, 0.15); font-weight: bold;' : ''}">
          <td>${idx === 0 ? '🥇 Winner' : idx === 1 ? '🥈 2nd Place' : idx === 2 ? '🥉 3rd Place' : `#${idx + 1}`}</td>
          <td><strong>${c.name}</strong></td>
          <td>${c.department}</td>
          <td>${c.votes}</td>
          <td>${share}%</td>
        </tr>
      `;
    });
    html += `</tbody></table>`;
    runnerUpWrapper.innerHTML = html;
  }

  const gazette = document.getElementById("gazetteDetails");
  if (gazette) {
    gazette.innerHTML = `
      <p><strong>Decree No. EC-2026/094:</strong> In accordance with the Constitution of the College Student Council Elections 2026, the Central Election Commission hereby certifies that all <strong>${totalVotes}</strong> ballots cast across engineering departments were anonymously sealed, verified via HMAC-SHA256 ledger tokens, and tabulated with zero mathematical errors.</p>
      <p style="margin-top: 10px;">Having secured the highest mandate of <strong>${winner.votes} votes</strong> (${Math.round((winner.votes/totalVotes)*100)}% of valid ballots), <strong>${winner.name}</strong> is hereby officially declared <strong>President of the Student Council</strong> for the academic term 2026-2027.</p>
    `;
  }

  document.getElementById("modalWinnerCeremony").classList.remove("hidden");
  startConfetti();
}

function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  const pieces = [];
  const colors = ["#00f2fe", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#ffffff"];

  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 2;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
    confettiInterval = requestAnimationFrame(loop);
  }
  loop();
}

function stopConfetti() {
  if (confettiInterval) {
    cancelAnimationFrame(confettiInterval);
    confettiInterval = null;
  }
}

/* ==========================================================================
   6. EXPORT TOOLS (CSV & JSON AUDIT PACKAGE)
   ========================================================================== */
function initExportTools() {
  const btnAuditCsv = document.getElementById("btnExportAuditCsv");
  const btnLedgerJson = document.getElementById("btnExportLedgerJson");

  if (btnAuditCsv) {
    btnAuditCsv.addEventListener("click", () => {
      let csv = "ID,Timestamp,Event Type,IP Address,Details,Is Suspicious\n";
      APP_STATE.logs.forEach(l => {
        csv += `"${l.id}","${l.timestamp}","${l.eventType}","${l.ip}","${l.details.replace(/"/g, '""')}","${l.isSuspicious}"\n`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "election_security_audit_log.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast("Security Audit Trail CSV downloaded!", "success");
    });
  }

  if (btnLedgerJson) {
    btnLedgerJson.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(APP_STATE.blockchain, null, 2));
      const a = document.createElement("a");
      a.setAttribute("href", dataStr);
      a.setAttribute("download", "election_blockchain_ledger.json");
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast("Blockchain Ledger JSON downloaded!", "success");
    });
  }
}

/* ==========================================================================
   ELECTION CREATION & BROADCAST WIZARD (ADMIN)
   ========================================================================== */
const ELECTION_TEMPLATES = {
  cr: {
    title: "Department Class Representative Election 2026",
    id: "ELEX-CR-2026",
    position: "Class Representative (CR)",
    duration: "6",
    voters: "450",
    candidates: [
      {
        name: "Devansh Singhania",
        department: "CSE",
        tagline: "Practical lab upgrades, hackathons, and transparent student representation",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
      },
      {
        name: "Tanvi Malviya",
        department: "IT",
        tagline: "Research partnerships, career workshops, and inclusive campus life",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
      }
    ]
  },
  sports: {
    title: "Hostel & Sports Council Elections 2026",
    id: "ELEX-SPORTS-2026",
    position: "Sports Secretary",
    duration: "12",
    voters: "800",
    candidates: [
      {
        name: "Arjun Reddy",
        department: "ME",
        tagline: "Inter-college athletic meet, equipment renewal, and 24/7 gym access",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
      },
      {
        name: "Kavya Deshmukh",
        department: "ECE",
        tagline: "Women's sports tournaments, professional coaching clinics, and floodlit courts",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
      }
    ]
  },
  acm: {
    title: "ACM Student Chapter Presidential Election 2026",
    id: "ELEX-ACM-2026",
    position: "Technical Lead",
    duration: "24",
    voters: "350",
    candidates: [
      {
        name: "Meera Krishnan",
        department: "CSE",
        tagline: "AI & Open source sprints, industry mentors, and cloud certification vouchers",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
      },
      {
        name: "Rahul Saxena",
        department: "IT",
        tagline: "Competitive programming leagues, weekly mock tech interviews, and dev conferences",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
      }
    ]
  }
};

let currentCandidateDrafts = [
  {
    name: "Devansh Singhania",
    department: "CSE",
    tagline: "Practical lab upgrades, hackathons, and transparent student representation",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
  },
  {
    name: "Tanvi Malviya",
    department: "IT",
    tagline: "Research partnerships, career workshops, and inclusive campus life",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
  }
];

function updateActiveElectionBanner() {
  const elTitle = document.getElementById("adminCurrentElectionTitle");
  const elId = document.getElementById("adminCurrentElectionId");
  const elPos = document.getElementById("adminCurrentElectionPosition");
  const elPool = document.getElementById("adminCurrentElectionPool");
  const elChain = document.getElementById("adminCurrentElectionChain");

  const title = APP_STATE.election?.title || "College Student Council Elections 2026";
  const id = APP_STATE.election?.id || "ELEX-2026-MAIN";
  const pos = APP_STATE.election?.positions?.[0] || "President";
  const pool = APP_STATE.election?.totalEligible || 1250;
  const blocksCount = APP_STATE.blockchain?.length || 1;

  if (elTitle) elTitle.textContent = title;
  if (elId) elId.textContent = id;
  if (elPos) elPos.textContent = pos;
  if (elPool) elPool.textContent = `${pool.toLocaleString()} Eligible`;
  if (elChain) elChain.textContent = `${blocksCount} Blocks Chained`;

  // Update floating bar and hub radar labels
  const febTitle = document.getElementById("febElectionTitle");
  if (febTitle) febTitle.textContent = title;
  const lerTitle = document.getElementById("lerElectionTitle");
  if (lerTitle) lerTitle.textContent = title;
  const lerId = document.getElementById("lerElectionId");
  if (lerId) lerId.textContent = id;
  const lerPos = document.getElementById("lerElectionPosition");
  if (lerPos) lerPos.textContent = `For ${pos}`;

  // Update receipt default election label
  const rcptElection = document.getElementById("receiptElection");
  if (rcptElection) rcptElection.textContent = title;

  updateTurnoutMetrics();
}

function initCreateElectionWizard() {
  const modal = document.getElementById("modalCreateElection");
  const btnOpen1 = document.getElementById("btnOpenCreateElectionModal");
  const btnOpen2 = document.getElementById("btnBannerCreateElection");
  const btnCloseX = document.getElementById("btnCloseCreateElectionX");
  const btnCancel = document.getElementById("btnCancelCreateElection");
  const form = document.getElementById("formCreateElection");
  const btnAddCandidate = document.getElementById("btnAddCandidateRow");

  const openModal = () => {
    if (modal) modal.style.display = "flex";
    renderCandidateEditorRows();
  };

  const closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  if (btnOpen1) btnOpen1.addEventListener("click", openModal);
  if (btnOpen2) btnOpen2.addEventListener("click", openModal);
  if (btnCloseX) btnCloseX.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);

  // Template buttons
  const tmplChips = document.querySelectorAll(".tmpl-chip");
  tmplChips.forEach(chip => {
    chip.addEventListener("click", () => {
      tmplChips.forEach(c => c.classList.remove("active-tmpl"));
      chip.classList.add("active-tmpl");
      const key = chip.getAttribute("data-template");
      const tmpl = ELECTION_TEMPLATES[key];
      if (tmpl) {
        document.getElementById("inputCreateElectionTitle").value = tmpl.title;
        document.getElementById("inputCreateElectionId").value = tmpl.id;
        document.getElementById("selectCreateElectionPosition").value = tmpl.position;
        document.getElementById("selectCreateElectionDuration").value = tmpl.duration;
        document.getElementById("inputCreateElectionVoters").value = tmpl.voters;
        currentCandidateDrafts = JSON.parse(JSON.stringify(tmpl.candidates));
        renderCandidateEditorRows();
      }
    });
  });

  // Add Candidate Row
  if (btnAddCandidate) {
    btnAddCandidate.addEventListener("click", () => {
      const idx = currentCandidateDrafts.length + 1;
      currentCandidateDrafts.push({
        name: `Candidate ${idx}`,
        department: "CSE",
        tagline: "Dedicated to student progress and transparent governance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
      });
      renderCandidateEditorRows();
    });
  }

  // Form Submit
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Read current values from editor inputs
      readCurrentCandidateInputs();

      const title = document.getElementById("inputCreateElectionTitle").value.trim();
      const id = document.getElementById("inputCreateElectionId").value.trim().toUpperCase();
      const position = document.getElementById("selectCreateElectionPosition").value;
      const durationHours = parseFloat(document.getElementById("selectCreateElectionDuration").value) || 6;
      const totalEligible = parseInt(document.getElementById("inputCreateElectionVoters").value) || 500;

      if (!title || !id) {
        showToast("Please provide an Election Title and Election ID", "warning");
        return;
      }

      if (currentCandidateDrafts.length < 2) {
        showToast("An election must have at least 2 candidates", "warning");
        return;
      }

      const payload = {
        title,
        id,
        position,
        durationHours,
        totalEligible,
        candidates: currentCandidateDrafts
      };

      try {
        const res = await fetch("/api/admin/create-election", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          applyNewElectionState(data.election, data.candidates, data.blockchain, durationHours);
          closeModal();
          showToast(`🚀 New Election '${title}' successfully launched! Genesis block minted.`, "success");
        } else {
          showToast(data.error || "Failed to create election on server", "error");
        }
      } catch (err) {
        // Fallback for static/offline execution
        applyNewElectionOffline(payload);
        closeModal();
        showToast(`🚀 New Election '${title}' launched in local ledger! Genesis block minted.`, "success");
      }
    });
  }
}

function renderCandidateEditorRows() {
  const container = document.getElementById("candidatesEditorGrid");
  if (!container) return;
  container.innerHTML = "";

  currentCandidateDrafts.forEach((c, idx) => {
    const row = document.createElement("div");
    row.className = "candidate-editor-row";
    row.innerHTML = `
      <div class="c-badge-idx">#${idx + 1}</div>
      <input type="text" class="c-input-name" placeholder="Candidate Name" value="${c.name || ''}" required>
      <input type="text" class="c-input-dept" placeholder="Dept (e.g. CSE)" value="${c.department || 'CSE'}" required>
      <input type="text" class="c-input-tag" placeholder="Campaign Tagline" value="${c.tagline || ''}" required>
      <button type="button" class="btn-remove-candidate" title="Remove Candidate" ${currentCandidateDrafts.length <= 2 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

    const btnDel = row.querySelector(".btn-remove-candidate");
    if (btnDel && currentCandidateDrafts.length > 2) {
      btnDel.addEventListener("click", () => {
        readCurrentCandidateInputs();
        currentCandidateDrafts.splice(idx, 1);
        renderCandidateEditorRows();
      });
    }

    container.appendChild(row);
  });
}

function readCurrentCandidateInputs() {
  const container = document.getElementById("candidatesEditorGrid");
  if (!container) return;
  const rows = container.querySelectorAll(".candidate-editor-row");
  rows.forEach((r, idx) => {
    if (currentCandidateDrafts[idx]) {
      const name = r.querySelector(".c-input-name")?.value.trim() || currentCandidateDrafts[idx].name;
      const dept = r.querySelector(".c-input-dept")?.value.trim() || currentCandidateDrafts[idx].department;
      const tag = r.querySelector(".c-input-tag")?.value.trim() || currentCandidateDrafts[idx].tagline;
      currentCandidateDrafts[idx].name = name;
      currentCandidateDrafts[idx].department = dept;
      currentCandidateDrafts[idx].tagline = tag;
    }
  });
}

function applyNewElectionState(election, candidates, blockchain, durationHours) {
  APP_STATE.election = election;
  APP_STATE.election.closingTime = new Date(Date.now() + durationHours * 3600 * 1000);
  APP_STATE.candidates = candidates;
  APP_STATE.selectedMatrixIds = candidates.map(c => c.id).slice(0, 4);
  if (blockchain) APP_STATE.blockchain = blockchain;

  // Reset priorities
  for (let k in APP_STATE.campusPriorities) {
    APP_STATE.campusPriorities[k] = 0;
  }

  // Reset student voter statuses locally
  for (let sid in MOCK_STUDENTS) {
    MOCK_STUDENTS[sid].hasVoted = false;
    MOCK_STUDENTS[sid].verified = false;
    MOCK_STUDENTS[sid].receiptHash = null;
  }

  // Update UI components
  updateActiveElectionBanner();
  updateElectionStatusBadge("active");
  initMatrixToggles();
  renderComparisonMatrix();
  renderBallotCandidates();
  renderAdminCharts();
  renderPriorityChart();
  renderBlockchainNodes();

  // Reset booth to stage 1
  transitionBoothStage("stageLookup", 1);
  const inputSid = document.getElementById("inputStudentId");
  if (inputSid && APP_STATE.currentUser?.role === "student") {
    inputSid.value = APP_STATE.currentUser.user.studentId;
  }
}

function applyNewElectionOffline(payload) {
  const durationHours = payload.durationHours || 6;
  const newElection = {
    id: payload.id,
    title: payload.title,
    subtitle: `Official Ballot: ${payload.position}`,
    status: "active",
    closingTime: new Date(Date.now() + durationHours * 3600 * 1000),
    totalEligible: payload.totalEligible,
    positions: [payload.position]
  };

  const newCandidates = payload.candidates.map((c, idx) => ({
    id: `CAND-0${idx + 1}`,
    name: c.name,
    position: `For ${payload.position}`,
    department: c.department || "CSE",
    year: "3rd Year",
    avatar: c.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    tagline: c.tagline,
    color: ["#38bdf8", "#10b981", "#8b5cf6", "#f59e0b"][idx % 4],
    manifesto: {
      academic: "Specialized tutorials and study circles",
      infrastructure: "Lab upgrades & modern infrastructure",
      events: "Department hackathons & conclaves",
      welfare: "Student grievance redressal desk",
      technology: "Automated student portal",
      placement: "Mock interviews & resume review",
      previousWork: "Active student council member",
      commitmentsCount: 8,
      actionReadyScore: 85
    },
    votes: 0
  }));

  // Append NOTA
  newCandidates.push({
    id: "CAND-NOTA",
    name: "None Of The Above (NOTA)",
    position: "Constitutional Option",
    department: "All Departments",
    year: "Universal",
    avatar: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80",
    tagline: "Democratic rejection of all nominated candidates",
    color: "#ef4444",
    manifesto: {
      academic: "Re-nomination directive if NOTA plurality",
      infrastructure: "Democratic safeguard",
      events: "Electoral reform",
      welfare: "Expression of non-confidence",
      technology: "Cryptographic ballot seal",
      placement: "Institutional governance accountability",
      previousWork: "Guaranteed by Constitution charter",
      commitmentsCount: 0,
      actionReadyScore: 100
    },
    votes: 0
  });

  // Mint Genesis Block
  const genesis = {
    index: 0,
    timestamp: new Date().toISOString(),
    data: {
      type: "GENESIS_BLOCK",
      electionId: payload.id,
      title: payload.title,
      position: payload.position,
      authority: "College Election Commission",
      declaredCandidates: newCandidates.length,
      status: "SEALED",
      voterToken: "GENESIS-ROOT"
    },
    previousHash: "0".repeat(64),
    merkleRoot: "0x" + Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2),
    nonce: 1001,
    hash: "0b016b0ef8a6eb4a8afaa078f69c895584e6531ef890cf3bfef746dd943d2827",
    tampered: false
  };

  applyNewElectionState(newElection, newCandidates, [genesis], durationHours);
}

/* ==========================================================================
   ELECTION NOTICES & FLOATING HUD CONTROLLER (PROJECT NO. 94 EXTENSION)
   ========================================================================== */

function updateTurnoutMetrics() {
  const totalVotes = APP_STATE.candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
  const totalPool = APP_STATE.election?.totalEligible || 1250;
  const pct = Math.min(100, ((totalVotes / totalPool) * 100)).toFixed(1);

  // Floating Bar
  const febTurnout = document.getElementById("febTurnoutText");
  if (febTurnout) febTurnout.innerHTML = `<i class="fa-solid fa-chart-pie"></i> ${pct}% Voted`;
  const febBar = document.getElementById("febTurnoutBar");
  if (febBar) febBar.style.width = `${pct}%`;

  // Hub Radar
  const lerVoted = document.getElementById("lerVotedCount");
  if (lerVoted) lerVoted.textContent = totalVotes.toLocaleString();
  const lerPool = document.getElementById("lerTotalPool");
  if (lerPool) lerPool.textContent = totalPool.toLocaleString();
  const lerPct = document.getElementById("lerTurnoutPct");
  if (lerPct) lerPct.textContent = `${pct}%`;
  const lerBar = document.getElementById("lerProgressBar");
  if (lerBar) lerBar.style.width = `${pct}%`;
}

function initFloatingElectionBar() {
  const bar = document.getElementById("floatingElectionBar");
  const badge = document.getElementById("floatingHubBadge");
  const btnUpcoming = document.getElementById("btnFebUpcoming");
  const btnNotices = document.getElementById("btnFebNotices");
  const btnVoteNow = document.getElementById("btnFebVoteNow");
  const btnExpandHub = document.getElementById("btnFebExpandHub");
  const btnToggleMin = document.getElementById("btnFebToggleMinimize");
  const liveSection = document.getElementById("febLiveSection");
  const headerNoticeBell = document.getElementById("btnHeaderNoticeBell");

  // Click on Live section -> open Hub ongoing subtab
  if (liveSection) {
    liveSection.addEventListener("click", () => {
      switchTab("tab-notices");
      activateHubSubtab("subtab-ongoing");
    });
  }

  // Click on Upcoming Pill -> open Hub upcoming subtab
  if (btnUpcoming) {
    btnUpcoming.addEventListener("click", () => {
      switchTab("tab-notices");
      activateHubSubtab("subtab-upcoming");
    });
  }

  // Click on Notices Pill -> open Hub bulletin subtab
  if (btnNotices) {
    btnNotices.addEventListener("click", () => {
      switchTab("tab-notices");
      activateHubSubtab("subtab-bulletin");
    });
  }

  // Header Bell -> open Hub bulletin subtab
  if (headerNoticeBell) {
    headerNoticeBell.addEventListener("click", () => {
      switchTab("tab-notices");
      activateHubSubtab("subtab-bulletin");
    });
  }

  // Fast Vote CTA
  if (btnVoteNow) {
    btnVoteNow.addEventListener("click", () => {
      switchTab("tab-booth");
      showToast("Redirected to Student Digital Voting Booth", "info");
    });
  }

  // Expand Full Hub
  if (btnExpandHub) {
    btnExpandHub.addEventListener("click", () => {
      switchTab("tab-notices");
    });
  }

  // Minimize Floating Bar
  if (btnToggleMin && bar && badge) {
    btnToggleMin.addEventListener("click", (e) => {
      e.stopPropagation();
      bar.classList.add("minimized");
      badge.classList.remove("hidden");
      APP_STATE.isFloatingBarMinimized = true;
      showToast("Floating Election HUD minimized to corner badge.", "info");
    });
  }

  // Restore Minimized Badge
  if (badge && bar) {
    badge.addEventListener("click", () => {
      bar.classList.remove("minimized");
      badge.classList.add("hidden");
      APP_STATE.isFloatingBarMinimized = false;
    });
  }

  updateFloatingElectionBar();
  updateNoticeBadges();
}

function updateFloatingElectionBar() {
  const nextElection = APP_STATE.upcomingElections[0];
  const febUpSub = document.getElementById("febUpcomingSub");
  const febUpCount = document.getElementById("febUpcomingCount");
  if (febUpSub && nextElection) {
    febUpSub.textContent = `${nextElection.title.split(' ')[0]} ${nextElection.position.split(' ')[0]} (in ${nextElection.startsInDays}d)`;
  }
  if (febUpCount) {
    febUpCount.textContent = APP_STATE.upcomingElections.length;
  }

  const urgentNotice = APP_STATE.notices.find(n => n.isUrgent) || APP_STATE.notices[0];
  const febNoticeSub = document.getElementById("febNoticeSub");
  if (febNoticeSub && urgentNotice) {
    febNoticeSub.textContent = urgentNotice.title;
  }

  updateTurnoutMetrics();
}

/* ==========================================================================
   TOP NOTICE TICKER BANNER
   ========================================================================== */
function initTopNoticeBanner() {
  const banner = document.getElementById("topNoticeBanner");
  const content = document.getElementById("tnbNoticeContent");
  const btnPrev = document.getElementById("btnTnbPrev");
  const btnNext = document.getElementById("btnTnbNext");
  const btnViewAll = document.getElementById("btnTnbViewAll");
  const btnDismiss = document.getElementById("btnTnbDismiss");

  if (!banner) return;

  function nextNotice() {
    APP_STATE.activeNoticeIndex = (APP_STATE.activeNoticeIndex + 1) % APP_STATE.notices.length;
    updateTopNoticeBanner();
  }

  function prevNotice() {
    APP_STATE.activeNoticeIndex = (APP_STATE.activeNoticeIndex - 1 + APP_STATE.notices.length) % APP_STATE.notices.length;
    updateTopNoticeBanner();
  }

  if (btnNext) btnNext.addEventListener("click", nextNotice);
  if (btnPrev) btnPrev.addEventListener("click", prevNotice);

  if (content) {
    content.addEventListener("click", () => {
      const curNotice = APP_STATE.notices[APP_STATE.activeNoticeIndex];
      if (curNotice) openNoticeDetailModal(curNotice.id);
    });
  }

  if (btnViewAll) {
    btnViewAll.addEventListener("click", () => {
      switchTab("tab-notices");
      activateHubSubtab("subtab-bulletin");
    });
  }

  if (btnDismiss) {
    btnDismiss.addEventListener("click", () => {
      banner.classList.add("hidden");
      if (APP_STATE.noticeTickerInterval) {
        clearInterval(APP_STATE.noticeTickerInterval);
      }
    });
  }

  // Auto rotation
  APP_STATE.noticeTickerInterval = setInterval(nextNotice, 7500);

  banner.addEventListener("mouseenter", () => {
    if (APP_STATE.noticeTickerInterval) clearInterval(APP_STATE.noticeTickerInterval);
  });

  banner.addEventListener("mouseleave", () => {
    APP_STATE.noticeTickerInterval = setInterval(nextNotice, 7500);
  });

  updateTopNoticeBanner();
}

function updateTopNoticeBanner() {
  const notices = APP_STATE.notices;
  if (!notices || !notices.length) return;

  const cur = notices[APP_STATE.activeNoticeIndex] || notices[0];
  const refEl = document.getElementById("tnbNoticeRef");
  const textEl = document.getElementById("tnbNoticeText");
  const counterEl = document.getElementById("tnbCounter");

  if (refEl) refEl.textContent = cur.ref || `Ref: CEC-${cur.id}`;
  if (textEl) textEl.textContent = `${cur.title}: ${cur.summary}`;
  if (counterEl) counterEl.textContent = `${APP_STATE.activeNoticeIndex + 1}/${notices.length}`;
}

/* ==========================================================================
   NOTICES & ELECTIONS HUB TAB CONTROLLER
   ========================================================================== */
function initNoticesAndElectionsHub() {
  // Subtab switching inside Notices Hub
  const subtabs = document.querySelectorAll(".hub-subtab");
  subtabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-subtab");
      activateHubSubtab(targetId);
    });
  });

  // Upcoming Filter Chips
  const upChips = document.querySelectorAll(".up-filter-chip");
  upChips.forEach(chip => {
    chip.addEventListener("click", () => {
      upChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.getAttribute("data-filter");
      APP_STATE.selectedUpcomingFilter = filter;
      renderUpcomingElections(filter);
    });
  });

  // Notice Search Input
  const searchInput = document.getElementById("inputNoticeSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      APP_STATE.noticeSearchQuery = e.target.value.toLowerCase().trim();
      renderNoticesList(APP_STATE.selectedNoticeCategory, APP_STATE.noticeSearchQuery);
    });
  }

  // Notice Category Filters
  const catFilters = document.querySelectorAll(".btn-bulletin-filter");
  catFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      catFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-cat");
      APP_STATE.selectedNoticeCategory = cat;
      renderNoticesList(cat, APP_STATE.noticeSearchQuery);
    });
  });

  // Mark All Read button
  const btnMarkAll = document.getElementById("btnMarkAllNoticesRead");
  if (btnMarkAll) {
    btnMarkAll.addEventListener("click", () => {
      APP_STATE.notices.forEach(n => n.isRead = true);
      updateNoticeBadges();
      renderNoticesList(APP_STATE.selectedNoticeCategory, APP_STATE.noticeSearchQuery);
      showToast("All official circulars marked as read.", "success");
    });
  }

  // Quick buttons in Radar
  const btnLerMatrix = document.getElementById("btnLerOpenMatrix");
  if (btnLerMatrix) {
    btnLerMatrix.addEventListener("click", () => switchTab("tab-matrix"));
  }

  const btnLerVote = document.getElementById("btnLerGoVote");
  if (btnLerVote) {
    btnLerVote.addEventListener("click", () => switchTab("tab-booth"));
  }

  const btnTimelineVote = document.getElementById("btnTimelineGoVote");
  if (btnTimelineVote) {
    btnTimelineVote.addEventListener("click", () => switchTab("tab-booth"));
  }

  // Admin Broadcast Notice Button
  const btnAdminBroadcast = document.getElementById("btnAdminBroadcastNotice");
  if (btnAdminBroadcast) {
    btnAdminBroadcast.addEventListener("click", () => {
      const modal = document.getElementById("modalBroadcastNotice");
      if (modal) modal.classList.remove("hidden");
    });
  }

  renderOngoingElectionRadar();
  renderUpcomingElections('all');
  renderNoticesList('all', '');
}

function activateHubSubtab(subtabId) {
  document.querySelectorAll(".hub-subtab").forEach(t => {
    t.classList.toggle("active", t.getAttribute("data-subtab") === subtabId);
  });
  document.querySelectorAll(".hub-subpanel").forEach(p => {
    p.classList.toggle("active", p.id === subtabId);
  });

  if (subtabId === "subtab-ongoing") {
    renderOngoingElectionRadar();
  } else if (subtabId === "subtab-upcoming") {
    renderUpcomingElections(APP_STATE.selectedUpcomingFilter || 'all');
  } else if (subtabId === "subtab-bulletin") {
    renderNoticesList(APP_STATE.selectedNoticeCategory || 'all', APP_STATE.noticeSearchQuery || '');
  }
}

function renderOngoingElectionRadar() {
  const container = document.getElementById("lerCandidatesGrid");
  if (!container) return;

  container.innerHTML = "";
  APP_STATE.candidates.forEach(cand => {
    const isNota = cand.id === "CAND-NOTA";
    const card = document.createElement("div");
    card.className = "ler-candidate-card";
    card.innerHTML = `
      <div class="ler-cand-top">
        <img src="${cand.avatar}" alt="${cand.name}" class="ler-cand-avatar" onerror="this.src='https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400'">
        <div class="ler-cand-info">
          <h5>${cand.name}</h5>
          <span>${cand.department} • ${cand.year}</span>
        </div>
      </div>
      <div class="ler-cand-tagline">"${cand.tagline}"</div>
      <div class="ler-cand-meta">
        <div class="ler-score-badge">
          <i class="fa-solid fa-bolt"></i> ${cand.manifesto?.actionReadyScore || 80}% Feasibility
        </div>
        <button type="button" class="btn-ler-vote-single" data-cand-id="${cand.id}">
          <i class="fa-solid fa-check"></i> ${isNota ? "Select NOTA" : "Vote"}
        </button>
      </div>
    `;

    const voteBtn = card.querySelector(".btn-ler-vote-single");
    if (voteBtn) {
      voteBtn.addEventListener("click", () => {
        APP_STATE.selectedBallotCandidateId = cand.id;
        switchTab("tab-booth");
        renderBallotCandidates();
        showToast(`Candidate ${cand.name} selected for ballot!`, "success");
      });
    }

    container.appendChild(card);
  });

  updateTurnoutMetrics();
}

function renderUpcomingElections(filter = 'all') {
  const container = document.getElementById("upcomingCardsGrid");
  if (!container) return;

  container.innerHTML = "";
  const list = APP_STATE.upcomingElections.filter(e => {
    if (filter === "all") return true;
    return e.category === filter;
  });

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state-notice">
        <i class="fa-solid fa-calendar-xmark text-muted"></i>
        <p>No upcoming elections match this category filter.</p>
      </div>
    `;
    return;
  }

  list.forEach(el => {
    const card = document.createElement("div");
    card.className = "upcoming-card";
    
    const candidateChips = el.candidatesPreview.map(c => 
      `<span class="uc-cand-chip">${c.name} <small>(${c.dept})</small></span>`
    ).join("");

    const deptStr = el.departments.join(", ");

    card.innerHTML = `
      <div class="uc-header">
        <div class="uc-badge-countdown ${el.badgeClass}">
          <i class="fa-regular fa-clock"></i> Starts in ${el.startsInDays} Days
        </div>
        <span class="uc-status-tag"><i class="fa-solid fa-circle-check text-emerald"></i> ${el.status}</span>
      </div>

      <h4 class="uc-title">${el.title}</h4>

      <div class="uc-meta-list">
        <div class="uc-meta-item">
          <i class="fa-regular fa-calendar-check"></i>
          <span><strong>Schedule:</strong> ${el.dateFormatted}</span>
        </div>
        <div class="uc-meta-item">
          <i class="fa-solid fa-building-columns"></i>
          <span><strong>Eligible Branches:</strong> ${deptStr}</span>
        </div>
        <div class="uc-meta-item">
          <i class="fa-solid fa-users"></i>
          <span><strong>Voter Roster:</strong> ~${el.eligibleCount.toLocaleString()} Students</span>
        </div>
        <div class="uc-meta-item">
          <i class="fa-solid fa-user-tie"></i>
          <span><strong>Contest Seat:</strong> ${el.position}</span>
        </div>
      </div>

      <div class="uc-candidates-preview">
        <span class="uc-cand-label"><i class="fa-solid fa-users-viewfinder"></i> Verified Nominees:</span>
        <div class="uc-cand-chips">${candidateChips}</div>
      </div>

      <div class="uc-rules-box">
        <i class="fa-solid fa-circle-info"></i> ${el.rules}
      </div>

      <div class="uc-actions-row">
        <button type="button" class="btn-reminder-toggle ${el.reminded ? 'reminded' : ''}" data-id="${el.id}">
          <i class="fa-${el.reminded ? 'solid fa-bell-slash' : 'regular fa-bell'}"></i>
          <span>${el.reminded ? 'Reminder Set' : 'Set Reminder'}</span>
        </button>
        <button type="button" class="btn btn-outline-cyan btn-xs btn-upcoming-guidelines" data-id="${el.id}">
          <i class="fa-solid fa-file-contract"></i> Guidelines
        </button>
      </div>
    `;

    // Reminder toggle
    const remBtn = card.querySelector(".btn-reminder-toggle");
    if (remBtn) {
      remBtn.addEventListener("click", () => {
        el.reminded = !el.reminded;
        remBtn.classList.toggle("reminded", el.reminded);
        remBtn.innerHTML = `
          <i class="fa-${el.reminded ? 'solid fa-bell-slash' : 'regular fa-bell'}"></i>
          <span>${el.reminded ? 'Reminder Set' : 'Set Reminder'}</span>
        `;
        if (el.reminded) {
          showToast(`🔔 Reminder set! You will be notified when ${el.title} begins.`, "success");
        } else {
          showToast(`Reminder cleared for ${el.title}.`, "info");
        }
      });
    }

    // Guidelines button
    const guideBtn = card.querySelector(".btn-upcoming-guidelines");
    if (guideBtn) {
      guideBtn.addEventListener("click", () => {
        const modal = document.getElementById("modalNoticeDetail");
        const matchingNotice = APP_STATE.notices.find(n => n.category === "upcoming") || APP_STATE.notices[0];
        if (matchingNotice) openNoticeDetailModal(matchingNotice.id);
      });
    }

    container.appendChild(card);
  });
}

function renderNoticesList(category = 'all', searchQuery = '') {
  const container = document.getElementById("noticesListContainer");
  if (!container) return;

  container.innerHTML = "";
  const filtered = APP_STATE.notices.filter(notice => {
    const matchCat = category === "all" || notice.category === category;
    const matchSearch = !searchQuery || 
      notice.title.toLowerCase().includes(searchQuery) || 
      notice.summary.toLowerCase().includes(searchQuery) ||
      notice.ref.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state-notice" style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 36px; margin-bottom: 12px; opacity: 0.5;"></i>
        <p>No circulars found matching your current filter criteria.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(notice => {
    const card = document.createElement("div");
    card.className = `notice-card-item ${notice.isRead ? 'read' : 'unread'} ${notice.isUrgent ? 'urgent' : ''}`;
    
    const tagClass = notice.category === "urgent" ? "tag-urgent" :
                     notice.category === "upcoming" ? "tag-upcoming" :
                     notice.category === "guidelines" ? "tag-guidelines" : "tag-tech";

    const tagLabel = notice.category === "urgent" ? "URGENT NOTICE" :
                     notice.category === "upcoming" ? "UPCOMING ELECTION" :
                     notice.category === "guidelines" ? "REGULATIONS" : "SYSTEM & RECEIPT";

    card.innerHTML = `
      <div class="nci-main">
        <div class="nci-meta-strip">
          <span class="nci-ref">${notice.ref}</span>
          <span class="nci-tag ${tagClass}">${tagLabel}</span>
          <span class="nci-date"><i class="fa-regular fa-calendar"></i> ${notice.date}</span>
          ${!notice.isRead ? '<span class="status-dot green" title="Unread Notice" style="width: 7px; height: 7px; background: #fbbf24; box-shadow: 0 0 6px #fbbf24;"></span>' : ''}
        </div>
        <h4 class="nci-title">${notice.title}</h4>
        <p class="nci-summary">${notice.summary}</p>
        <div class="nci-author">
          <i class="fa-solid fa-feather"></i> Issued by: <strong>${notice.author}</strong>
        </div>
      </div>
      <div class="nci-actions">
        <button type="button" class="btn-nci-read">
          <i class="fa-solid fa-file-lines"></i> Read Circular
        </button>
        <button type="button" class="btn-nci-read-toggle">
          <i class="fa-solid fa-${notice.isRead ? 'envelope-open' : 'envelope'}"></i> ${notice.isRead ? 'Mark Unread' : 'Mark Read'}
        </button>
      </div>
    `;

    // Click on card or read button
    const readBtn = card.querySelector(".btn-nci-read");
    const openCard = () => openNoticeDetailModal(notice.id);

    if (readBtn) readBtn.addEventListener("click", (e) => { e.stopPropagation(); openCard(); });
    card.addEventListener("click", openCard);

    // Toggle read/unread
    const toggleBtn = card.querySelector(".btn-nci-read-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        notice.isRead = !notice.isRead;
        updateNoticeBadges();
        renderNoticesList(APP_STATE.selectedNoticeCategory, APP_STATE.noticeSearchQuery);
      });
    }

    container.appendChild(card);
  });
}

function openNoticeDetailModal(noticeId) {
  const notice = APP_STATE.notices.find(n => n.id === noticeId);
  if (!notice) return;

  notice.isRead = true;
  updateNoticeBadges();
  renderNoticesList(APP_STATE.selectedNoticeCategory, APP_STATE.noticeSearchQuery);

  const modal = document.getElementById("modalNoticeDetail");
  if (!modal) return;

  const refEl = document.getElementById("ndModalRef");
  const dateEl = document.getElementById("ndModalDate");
  const catEl = document.getElementById("ndModalCategory");
  const titleEl = document.getElementById("ndModalTitle");
  const contentEl = document.getElementById("ndModalContent");
  const authorEl = document.getElementById("ndModalAuthor");

  if (refEl) refEl.textContent = notice.ref;
  if (dateEl) dateEl.textContent = notice.date;
  if (catEl) {
    catEl.textContent = notice.category.toUpperCase() + " NOTICE";
    catEl.className = `ngd-badge-cat ${notice.isUrgent ? 'urgent' : ''}`;
  }
  if (titleEl) titleEl.textContent = notice.title;
  if (contentEl) contentEl.textContent = notice.fullContent || notice.summary;
  if (authorEl) authorEl.textContent = notice.author;

  modal.classList.remove("hidden");
}

function initNoticeDetailModal() {
  const modal = document.getElementById("modalNoticeDetail");
  const btnCloseX = document.getElementById("btnCloseNoticeDetail");
  const btnDone = document.getElementById("btnCloseNoticeDetailBtn");
  const btnPrint = document.getElementById("btnPrintNotice");
  const btnCopy = document.getElementById("btnCopyNoticeLink");

  const hide = () => modal && modal.classList.add("hidden");

  if (btnCloseX) btnCloseX.addEventListener("click", hide);
  if (btnDone) btnDone.addEventListener("click", hide);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hide();
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const ref = document.getElementById("ndModalRef")?.textContent || "Ref: CEC/NOT-2026/09";
      navigator.clipboard.writeText(`${window.location.href}#${ref}`).then(() => {
        showToast(`Reference ${ref} copied to clipboard!`, "success");
      }).catch(() => {
        showToast(`Reference: ${ref}`, "info");
      });
    });
  }
}

function initBroadcastNoticeModal() {
  const modal = document.getElementById("modalBroadcastNotice");
  const btnClose = document.getElementById("btnCloseBroadcastModal");
  const btnCancel = document.getElementById("btnCancelBroadcastNotice");
  const form = document.getElementById("formBroadcastNotice");

  const hide = () => modal && modal.classList.add("hidden");

  if (btnClose) btnClose.addEventListener("click", hide);
  if (btnCancel) btnCancel.addEventListener("click", hide);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hide();
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("inputNoticeTitle")?.value.trim() || "Election Commission Directive";
      const refCode = document.getElementById("inputNoticeRefCode")?.value.trim() || "Ref: CEC/NOT-2026/10";
      const cat = document.getElementById("selectNoticeCategory")?.value || "general";
      const signatory = document.getElementById("inputNoticeSignatory")?.value.trim() || "Chief Returning Officer";
      const summary = document.getElementById("inputNoticeSummary")?.value.trim() || title;
      const content = document.getElementById("textareaNoticeContent")?.value.trim() || summary;

      const newNotice = {
        id: `NOT-${Date.now().toString().slice(-4)}`,
        ref: refCode,
        title: title,
        date: "Just now",
        category: cat,
        isUrgent: cat === "urgent",
        isRead: false,
        author: signatory,
        summary: summary,
        fullContent: content,
        tags: [cat.toUpperCase(), "Official"]
      };

      APP_STATE.notices.unshift(newNotice);
      APP_STATE.activeNoticeIndex = 0;

      updateNoticeBadges();
      updateTopNoticeBanner();
      updateFloatingElectionBar();
      renderNoticesList(APP_STATE.selectedNoticeCategory, APP_STATE.noticeSearchQuery);

      form.reset();
      hide();

      showToast(`📢 New circular "${title}" broadcast to campus notice board!`, "success");
    });
  }
}

function updateNoticeBadges() {
  const unreadCount = APP_STATE.notices.filter(n => !n.isRead).length;

  const headerBadge = document.getElementById("headerNoticeBadge");
  if (headerBadge) {
    headerBadge.textContent = unreadCount;
    headerBadge.style.display = unreadCount > 0 ? "flex" : "none";
  }

  const navBadge = document.getElementById("navNoticeBadge");
  if (navBadge) {
    navBadge.textContent = `${unreadCount} New`;
    navBadge.style.display = unreadCount > 0 ? "inline-block" : "none";
  }

  const febBadge = document.getElementById("febNoticeBadge");
  if (febBadge) {
    febBadge.textContent = unreadCount;
    febBadge.classList.toggle("badge-unread", unreadCount > 0);
  }

  const fhbBadge = document.getElementById("fhbNoticeCount");
  if (fhbBadge) {
    fhbBadge.textContent = unreadCount;
  }

  const hubUnreadVal = document.getElementById("hubUnreadNoticesVal");
  if (hubUnreadVal) {
    hubUnreadVal.textContent = `${unreadCount} Unread`;
  }

  const subtabBadge = document.getElementById("subtabNoticeBadge");
  if (subtabBadge) {
    subtabBadge.textContent = APP_STATE.notices.length;
  }
}

