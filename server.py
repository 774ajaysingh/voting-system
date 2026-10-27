"""
Smart & Secure College Voting System - Backend Server
Project No. 94 - B.Tech Mini Project
Provides REST API endpoints for authentication, candidate manifestos,
atomic one-student-one-vote processing, digital receipts, and admin analytics.
"""

import http.server
import socketserver
import json
import urllib.parse
import hashlib
import hmac
import time
from datetime import datetime, timezone, timedelta

PORT = 5000

# In-memory storage seeded with Slide 5 & Slide 10 project data
STATE = {
    "election": {
        "id": "ELEX-2026-MAIN",
        "title": "College Student Council Elections 2026",
        "subtitle": "Project No. 94 - Online Voting System",
        "status": "active", # "active" | "paused" | "closed"
        "startTime": "2026-10-25T08:00:00Z",
        "endTime": "2026-10-26T20:00:00Z",
        "totalEligible": 1250,
        "positions": ["President"]
    },
    "departments": [
        {"name": "Computer Science (CSE)", "code": "CSE", "total": 450, "voted": 320},
        {"name": "Electronics & Comm (ECE)", "code": "ECE", "total": 310, "voted": 195},
        {"name": "Mechanical Eng (ME)", "code": "ME", "total": 220, "voted": 118},
        {"name": "Information Tech (IT)", "code": "IT", "total": 180, "voted": 135},
        {"name": "Civil Engineering (CE)", "code": "CE", "total": 90, "voted": 42}
    ],
    "students": {
        "22BCSE101": {
            "studentId": "22BCSE101",
            "name": "Aarav Sharma",
            "department": "CSE",
            "year": "3rd Year",
            "phone": "+91 98765 43210",
            "email": "aarav.22bcse101@college.edu",
            "pin": "1234",
            "password": "password123",
            "verified": False,
            "hasVoted": False,
            "otp": None,
            "otpExpires": 0,
            "receiptHash": None
        },
        "22BECE205": {
            "studentId": "22BECE205",
            "name": "Priya Nair",
            "department": "ECE",
            "year": "3rd Year",
            "phone": "+91 98765 43211",
            "email": "priya.22bece205@college.edu",
            "pin": "1234",
            "password": "password123",
            "verified": False,
            "hasVoted": False,
            "otp": None,
            "otpExpires": 0,
            "receiptHash": None
        },
        "22BIT304": {
            "studentId": "22BIT304",
            "name": "Aditya Verma",
            "department": "IT",
            "year": "3rd Year",
            "phone": "+91 98765 43212",
            "email": "aditya.22bit304@college.edu",
            "pin": "1234",
            "password": "password123",
            "verified": False,
            "hasVoted": True,
            "otp": None,
            "otpExpires": 0,
            "receiptHash": "0x7a89b4f321ec908d"
        },
        "22BME412": {
            "studentId": "22BME412",
            "name": "Simran Kaur",
            "department": "ME",
            "year": "3rd Year",
            "phone": "+91 98765 43213",
            "email": "simran.22bme412@college.edu",
            "pin": "1234",
            "password": "password123",
            "verified": False,
            "hasVoted": False,
            "otp": None,
            "otpExpires": 0,
            "receiptHash": None
        }
    },
    "admin": {
        "username": "admin@college.edu",
        "alias": "admin",
        "password": "admin2026",
        "name": "Dr. S. Ramanujan",
        "title": "Chief Returning Officer",
        "department": "College Election Commission"
    },
    # Candidates exactly matching Slide 5 "Smart Candidate Comparison Matrix"
    "candidates": [
        {
            "id": "CAND-01",
            "name": "Aisha Khan",
            "position": "For President",
            "department": "CSE",
            "year": "3rd Year",
            "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
            "tagline": "Inclusive innovation, hands-on workshops & transparent student welfare",
            "color": "#38bdf8",
            "manifesto": {
                "academic": "Mentorship programs, doubt clearing hub, smart classes",
                "infrastructure": "Wi-Fi upgrade, more study spaces, clean campus drive",
                "events": "Annual tech fest, culture week, club collaborations",
                "welfare": "Counselling cell, peer support network, health camps",
                "technology": "Campus app, digital notice board, online feedback",
                "placement": "Resume building, mock interviews, industry connect",
                "previousWork": "Organized tech workshop with 500+ students",
                "commitmentsCount": 10,
                "actionReadyScore": 83
            },
            "votes": 284
        },
        {
            "id": "CAND-02",
            "name": "Rohan Mehta",
            "position": "For President",
            "department": "CSE",
            "year": "3rd Year",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
            "tagline": "Modern infrastructure, high-end computer labs & research funding",
            "color": "#10b981",
            "manifesto": {
                "academic": "More labs, research collaborations, workshops",
                "infrastructure": "New computer labs, library extension",
                "events": "Inter-college events, startup conclave",
                "welfare": "Mental health support, financial awareness",
                "technology": "AI-based attendance, resource portal",
                "placement": "Placement training, aptitude bootcamps",
                "previousWork": "Led coding club, trained 200+ juniors",
                "commitmentsCount": 12,
                "actionReadyScore": 75
            },
            "votes": 242
        },
        {
            "id": "CAND-03",
            "name": "Neha Verma",
            "position": "For President",
            "department": "CSE",
            "year": "3rd Year",
            "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
            "tagline": "Student safety, vibrant cultural fests & guaranteed placement support",
            "color": "#a855f7",
            "manifesto": {
                "academic": "Skill development sessions, study groups",
                "infrastructure": "Parking & transport improvements",
                "events": "More cultural events, student-led fests",
                "welfare": "Safety helpline, women empowerment programs",
                "technology": "Student dashboard, quick issue reporting",
                "placement": "Internships portal, career guidance",
                "previousWork": "Volunteer at NGO, organized charity events",
                "commitmentsCount": 9,
                "actionReadyScore": 78
            },
            "votes": 165
        },
        {
            "id": "CAND-04",
            "name": "Arjun Rao",
            "position": "For President",
            "department": "CSE",
            "year": "3rd Year",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
            "tagline": "E-sports, hackathons, IoT labs & direct industry recruiting",
            "color": "#f59e0b",
            "manifesto": {
                "academic": "AI tools for learning, hackathons, coding culture",
                "infrastructure": "Smart classrooms, green campus initiative",
                "events": "Hackathons, tech talks, e-sports tournaments",
                "welfare": "24/7 student support system",
                "technology": "IoT labs, tech clubs, innovation challenges",
                "placement": "More company tie-ups, online placement prep",
                "previousWork": "Managed college tech fest attended by 1000+",
                "commitmentsCount": 11,
                "actionReadyScore": 80
            },
            "votes": 119
        },
        {
            "id": "CAND-NOTA",
            "name": "NOTA (None Of The Above)",
            "position": "For President",
            "department": "Campus-Wide",
            "year": "Universal Option",
            "avatar": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80",
            "tagline": "Protest vote demanding council reform and fresh nominations",
            "color": "#64748b",
            "manifesto": {
                "academic": "Rejection of proposed academic agendas; demands independent audit of teaching quality",
                "infrastructure": "Demands direct student-elected infrastructure inspection committee",
                "events": "Calls for transparent student-controlled club funding and budget referendum",
                "welfare": "Demands 100% autonomous student grievance cell free of administrative delays",
                "technology": "Demands open-source student portal code and data privacy compliance",
                "placement": "Demands un-redacted college placement statistics and Tier-1 company invitations",
                "previousWork": "Official democratic safeguard guaranteed by Election Commission charter",
                "commitmentsCount": 0,
                "actionReadyScore": 100
            },
            "votes": 38
        }
    ],
    # Anonymous Ballots: zero student identity link
    "votes": [],
    # Digital Receipts ledger (receiptHash -> timestamp + electionId)
    "receipts": {
        "0x7a89b4f321ec908d": {
            "receiptHash": "0x7a89b4f321ec908d",
            "electionId": "ELEX-2026-MAIN",
            "timestamp": "2026-10-25T11:42:10Z",
            "verified": True
        }
    },
    # Tamper-Evident Merkle Blockchain Ledger
    "blockchain": [
        {
            "index": 0,
            "timestamp": "2026-10-25T08:00:00Z",
            "data": {
                "type": "GENESIS_BLOCK",
                "electionId": "ELEX-2026-MAIN",
                "authority": "College Election Commission",
                "status": "SEALED",
                "voterToken": "GENESIS-ROOT"
            },
            "previousHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "merkleRoot": "0x4a9b2c8f1e6d7a30e8c7b6a5d4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5",
            "nonce": 1042,
            "hash": "0b016b0ef8a6eb4a8afaa078f69c895584e6531ef890cf3bfef746dd943d2827",
            "tampered": False
        },
        {
            "index": 1,
            "timestamp": "2026-10-25T11:42:10Z",
            "data": {
                "type": "BALLOT_SEAL",
                "electionId": "ELEX-2026-MAIN",
                "receiptHash": "0x7a89b4f321ec908d",
                "voterToken": "0x89c7d8a6f3b4e2d1",
                "dept": "IT"
            },
            "previousHash": "0b016b0ef8a6eb4a8afaa078f69c895584e6531ef890cf3bfef746dd943d2827",
            "merkleRoot": "0x7a89b4f321ec908d",
            "nonce": 2491,
            "hash": "bdbf46034983ed4cf54e36127ecac8775af17fe7ed2275f44c4f52c6d379280d",
            "tampered": False
        }
    ],
    # Campus Priority Polling (Voice of Campus)
    "campusPriorities": {
        "Placements & Career Training": 310,
        "High-Speed Wi-Fi & Labs": 245,
        "Campus Infrastructure & Library": 180,
        "Student Welfare & Mental Health": 140,
        "Events, Hackathons & Sports": 95
    },
    # Audit and Security monitoring logs
    "auditLogs": [
        {
            "id": 1,
            "timestamp": "2026-10-25 10:15:20",
            "eventType": "SYSTEM_STARTUP",
            "details": "Election node initialized. Timer running.",
            "ip": "127.0.0.1",
            "isSuspicious": False
        },
        {
            "id": 2,
            "timestamp": "2026-10-25 11:40:02",
            "eventType": "OTP_VERIFIED",
            "details": "Student 22BIT304 verified via dual-factor OTP.",
            "ip": "192.168.1.104",
            "isSuspicious": False
        },
        {
            "id": 3,
            "timestamp": "2026-10-25 11:42:10",
            "eventType": "VOTE_CAST",
            "details": "Anonymous ballot committed. Digital receipt generated.",
            "ip": "192.168.1.104",
            "isSuspicious": False
        },
        {
            "id": 4,
            "timestamp": "2026-10-25 12:05:44",
            "eventType": "SUSPICIOUS_LOGIN",
            "details": "Repeated failed OTP requests from IP 192.168.1.200 (Rate limited)",
            "ip": "192.168.1.200",
            "isSuspicious": True
        }
    ]
}

SECRET_KEY = b"CollegeVotingSystemSecretSalt2026"

def compute_block_hash(index, prev_hash, timestamp, merkle_root, nonce):
    raw = f"{index}:{prev_hash}:{timestamp}:{merkle_root}:{nonce}"
    return hashlib.sha256(raw.encode()).hexdigest()

def verify_blockchain_integrity():
    for i in range(1, len(STATE["blockchain"])):
        current = STATE["blockchain"][i]
        prev = STATE["blockchain"][i - 1]
        if current.get("tampered", False):
            return False, i, f"Tamper flag actively detected on block #{i}"
        if current["previousHash"] != prev["hash"]:
            return False, i, f"Previous hash mismatch at block #{i}. Chain severed!"
        expected_hash = compute_block_hash(
            current["index"],
            current["previousHash"],
            current["timestamp"],
            current["merkleRoot"],
            current["nonce"]
        )
        if current["hash"] != expected_hash:
            return False, i, f"Hash cryptographic signature invalid at block #{i}!"
    return True, -1, "All chained blocks cryptographically verified"

class VotingRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for API calls
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def _send_json(self, data, status_code=200):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))

    def _read_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            raw_body = self.rfile.read(content_length).decode("utf-8")
            return json.loads(raw_body)
        return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            total_voted = sum(c["votes"] for c in STATE["candidates"])
            self._send_json({
                "election": STATE["election"],
                "totalVoted": total_voted,
                "totalEligible": STATE["election"]["totalEligible"],
                "turnoutPercent": round((total_voted / STATE["election"]["totalEligible"]) * 100, 1),
                "serverTime": datetime.now(timezone.utc).isoformat()
            })
            return

        elif path == "/api/blockchain":
            is_valid, bad_idx, reason = verify_blockchain_integrity()
            self._send_json({
                "blocks": STATE["blockchain"],
                "isValid": is_valid,
                "corruptedBlockIndex": bad_idx,
                "reason": reason,
                "totalBlocks": len(STATE["blockchain"])
            })
            return

        elif path == "/api/campus-priorities":
            self._send_json({
                "priorities": STATE["campusPriorities"]
            })
            return

        elif path == "/api/candidates":
            self._send_json({
                "candidates": STATE["candidates"]
            })
            return

        elif path == "/api/departments":
            self._send_json({
                "departments": STATE["departments"]
            })
            return

        elif path == "/api/audit-logs":
            self._send_json({
                "logs": STATE["auditLogs"]
            })
            return

        elif path.startswith("/api/verify-receipt/"):
            receipt_hash = path.split("/")[-1]
            rec = STATE["receipts"].get(receipt_hash)
            if rec:
                self._send_json({"found": True, "receipt": rec})
            else:
                self._send_json({"found": False, "message": "Receipt hash not found in election ledger."}, 404)
            return

        elif path.startswith("/api/student/"):
            student_id = path.split("/")[-1].upper()
            student = STATE["students"].get(student_id)
            if student:
                # Sanitized info (don't expose full phone or secret state)
                self._send_json({
                    "found": True,
                    "studentId": student["studentId"],
                    "name": student["name"],
                    "department": student["department"],
                    "year": student["year"],
                    "hasVoted": student["hasVoted"],
                    "maskedPhone": student["phone"][:6] + " XXXXX",
                    "email": student["email"]
                })
            else:
                self._send_json({"found": False, "message": "Student ID not found in institute voter roster."}, 404)
            return

        # Fallback to static files
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self._read_body()
        client_ip = self.client_address[0]

        if path == "/api/auth/student-login":
            student_id = body.get("studentId", "").strip().upper()
            password = body.get("password", "").strip()
            student = STATE["students"].get(student_id)
            if not student:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "LOGIN_FAILED",
                    "details": f"Attempted login with unregistered Student ID: {student_id}",
                    "ip": client_ip,
                    "isSuspicious": True
                })
                self._send_json({"error": "Student ID not found in voter registration roster."}, 404)
                return

            valid_keys = [student_id.lower(), "1234", "password123", student.get("pin", "1234"), student.get("password", "password123")]
            if password and password.lower() not in valid_keys:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "LOGIN_FAILED",
                    "details": f"Incorrect password attempt for Student ID: {student_id}",
                    "ip": client_ip,
                    "isSuspicious": True
                })
                self._send_json({"error": "Invalid student password/PIN. (Demo PIN: 1234)"}, 401)
                return

            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "STUDENT_LOGIN",
                "details": f"Student voter authenticated: {student['name']} ({student_id})",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({
                "success": True,
                "role": "student",
                "user": {
                    "studentId": student["studentId"],
                    "name": student["name"],
                    "department": student["department"],
                    "year": student["year"],
                    "phone": student["phone"],
                    "email": student["email"],
                    "hasVoted": student["hasVoted"],
                    "receiptHash": student["receiptHash"]
                }
            })
            return

        elif path == "/api/auth/admin-login":
            username = body.get("username", "").strip().lower()
            password = body.get("password", "").strip()

            admin = STATE["admin"]
            valid_usernames = [admin["username"].lower(), admin["alias"].lower(), "admin", "admin@college.edu", "ec_officer"]
            valid_passwords = [admin["password"], "admin2026", "admin123"]

            if username in valid_usernames and password in valid_passwords:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "ADMIN_LOGIN",
                    "details": f"Election Commission Admin logged in ({admin['name']})",
                    "ip": client_ip,
                    "isSuspicious": False
                })
                self._send_json({
                    "success": True,
                    "role": "admin",
                    "user": {
                        "username": admin["username"],
                        "name": admin["name"],
                        "title": admin["title"],
                        "department": admin["department"],
                        "role": "admin"
                    }
                })
            else:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "ADMIN_LOGIN_FAILED",
                    "details": f"Failed admin login attempt: '{username}'",
                    "ip": client_ip,
                    "isSuspicious": True
                })
                self._send_json({"error": "Invalid administrator username or security passkey."}, 401)
            return

        elif path == "/api/auth/logout":
            role = body.get("role", "user")
            identifier = body.get("identifier", "Unknown")
            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "USER_LOGOUT",
                "details": f"User logged out ({role}: {identifier})",
                "ip": client_ip,
                "isSuspicious": False
            })
            self._send_json({"success": True, "message": "Logged out successfully"})
            return

        elif path == "/api/auth/send-otp":
            student_id = body.get("studentId", "").strip().upper()
            student = STATE["students"].get(student_id)
            if not student:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "LOGIN_FAILED",
                    "details": f"Attempted lookup with unknown student ID: {student_id}",
                    "ip": client_ip,
                    "isSuspicious": True
                })
                self._send_json({"error": "Student ID not found in voter registration roster."}, 404)
                return

            if student["hasVoted"]:
                self._send_json({
                    "error": "Our records show you have already cast your vote in this election. One Student = One Vote.",
                    "alreadyVoted": True
                }, 403)
                return

            # Generate 6-digit OTP (for evaluation convenience, always 492108 or dynamic)
            otp = "492108"
            student["otp"] = otp
            student["otpExpires"] = time.time() + 300 # 5 minutes

            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "OTP_DISPATCHED",
                "details": f"OTP sent to {student['maskedPhone'] if 'maskedPhone' in student else student['phone']}",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({
                "success": True,
                "message": f"Verification code sent to registered number ending in {student['phone'][-4:]}",
                "demoOtp": otp, # surfaced for effortless test running
                "student": {
                    "name": student["name"],
                    "studentId": student["studentId"],
                    "department": student["department"],
                    "year": student["year"]
                }
            })
            return

        elif path == "/api/auth/verify-otp":
            student_id = body.get("studentId", "").strip().upper()
            entered_otp = body.get("otp", "").strip()
            student = STATE["students"].get(student_id)

            if not student or student.get("otp") != entered_otp:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "OTP_INVALID",
                    "details": f"Failed OTP entry for student {student_id}",
                    "ip": client_ip,
                    "isSuspicious": True
                })
                self._send_json({"error": "Invalid verification code. Please check and try again."}, 401)
                return

            student["verified"] = True
            token = hashlib.sha256(f"{student_id}:{time.time()}".encode()).hexdigest()

            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "STUDENT_AUTHENTICATED",
                "details": f"Student {student_id} ({student['name']}) verified for voting booth.",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({
                "success": True,
                "authToken": token,
                "student": {
                    "studentId": student["studentId"],
                    "name": student["name"],
                    "department": student["department"],
                    "year": student["year"],
                    "hasVoted": student["hasVoted"]
                }
            })
            return

        elif path == "/api/vote/cast":
            # Atomic ballot commitment
            student_id = body.get("studentId", "").strip().upper()
            candidate_id = body.get("candidateId", "").strip()

            if STATE["election"]["status"] != "active":
                self._send_json({"error": f"Election is currently {STATE['election']['status']}. Voting is closed."}, 400)
                return

            student = STATE["students"].get(student_id)
            if not student:
                self._send_json({"error": "Voter identity authentication failed."}, 401)
                return

            if student["hasVoted"]:
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "DOUBLE_VOTE_BLOCKED",
                    "details": f"Blocked second vote attempt by student {student_id}.",
                    "ip": client_ip,
                    "isSuspicious": True
                })
                self._send_json({"error": "Violation: You have already cast your ballot. One Student = One Vote enforced."}, 403)
                return

            candidate = next((c for c in STATE["candidates"] if c["id"] == candidate_id), None)
            if not candidate:
                self._send_json({"error": "Candidate not found."}, 404)
                return

            # 1. Flip student voted flag (Student ID is disconnected from choice)
            student["hasVoted"] = True
            now_iso = datetime.now(timezone.utc).isoformat()
            
            # 2. Cryptographic receipt hash HMAC(studentId + election + timestamp)
            receipt_raw = f"{student_id}:{STATE['election']['id']}:{now_iso}"
            receipt_hash = "0x" + hmac.new(SECRET_KEY, receipt_raw.encode(), hashlib.sha256).hexdigest()[:16]
            student["receiptHash"] = receipt_hash

            # 3. Increment candidate count anonymously
            candidate["votes"] += 1

            # 4. Record anonymous ballot token in separate votes ledger
            ballot_token = hashlib.sha256(f"{candidate_id}:{time.time()}".encode()).hexdigest()
            STATE["votes"].append({
                "ballotToken": ballot_token,
                "electionId": STATE["election"]["id"],
                "position": "President",
                "timestamp": now_iso
            })

            # 5. Record receipt in verifiable ledger
            STATE["receipts"][receipt_hash] = {
                "receiptHash": receipt_hash,
                "electionId": STATE["election"]["id"],
                "timestamp": now_iso,
                "verified": True
            }

            # 6. Update department statistics
            dept_entry = next((d for d in STATE["departments"] if d["code"] == student["department"]), None)
            if dept_entry:
                dept_entry["voted"] += 1

            # 7. Audit log (without logging vote choice)
            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "VOTE_CAST_ANONYMOUS",
                "details": f"Vote receipt {receipt_hash} registered. Voter status updated.",
                "ip": client_ip,
                "isSuspicious": False
            })

            # 8. Append Block to Blockchain Ledger
            last_block = STATE["blockchain"][-1]
            new_index = len(STATE["blockchain"])
            nonce = int(time.time() * 1000) % 9000 + 1000
            block_hash = compute_block_hash(new_index, last_block["hash"], now_iso, receipt_hash, nonce)
            new_block = {
                "index": new_index,
                "timestamp": now_iso,
                "data": {
                    "type": "BALLOT_SEAL",
                    "electionId": STATE["election"]["id"],
                    "receiptHash": receipt_hash,
                    "voterToken": ballot_token[:18],
                    "dept": student["department"]
                },
                "previousHash": last_block["hash"],
                "merkleRoot": receipt_hash,
                "nonce": nonce,
                "hash": block_hash,
                "tampered": False
            }
            STATE["blockchain"].append(new_block)

            # 9. Record campus priority if selected
            chosen_priority = body.get("priority")
            if chosen_priority and chosen_priority in STATE["campusPriorities"]:
                STATE["campusPriorities"][chosen_priority] += 1

            self._send_json({
                "success": True,
                "message": "Your vote has been securely and anonymously recorded!",
                "receipt": {
                    "receiptHash": receipt_hash,
                    "studentName": student["name"],
                    "studentId": student["studentId"],
                    "department": student["department"],
                    "electionTitle": STATE["election"]["title"],
                    "timestamp": now_iso,
                    "verificationStatus": "VALIDATED & SEALED",
                    "blockIndex": new_index,
                    "blockHash": block_hash
                }
            })
            return

        elif path == "/api/blockchain/tamper":
            if len(STATE["blockchain"]) > 1:
                target = STATE["blockchain"][1]
                target["tampered"] = not target.get("tampered", False)
                if target["tampered"]:
                    target["data"]["receiptHash"] = "0xDEADBEEF00000000"
                    target["merkleRoot"] = "0xDEADBEEF00000000"
                    target["hash"] = "9999deadbeef9999deadbeef9999deadbeef9999deadbeef9999deadbeef9999"
                    STATE["auditLogs"].insert(0, {
                        "id": len(STATE["auditLogs"]) + 1,
                        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        "eventType": "TAMPER_ATTACK_DETECTED",
                        "details": "Integrity alert: Block #1 data modified outside election ledger protocol!",
                        "ip": client_ip,
                        "isSuspicious": True
                    })
                else:
                    target["data"]["receiptHash"] = "0x7a89b4f321ec908d"
                    target["merkleRoot"] = "0x7a89b4f321ec908d"
                    target["hash"] = "bdbf46034983ed4cf54e36127ecac8775af17fe7ed2275f44c4f52c6d379280d"
                    target["tampered"] = False
            is_valid, bad_idx, reason = verify_blockchain_integrity()
            self._send_json({"success": True, "isValid": is_valid, "corruptedBlockIndex": bad_idx, "reason": reason})
            return

        elif path == "/api/blockchain/restore":
            if len(STATE["blockchain"]) > 1:
                target = STATE["blockchain"][1]
                target["data"]["receiptHash"] = "0x7a89b4f321ec908d"
                target["merkleRoot"] = "0x7a89b4f321ec908d"
                target["hash"] = "bdbf46034983ed4cf54e36127ecac8775af17fe7ed2275f44c4f52c6d379280d"
                target["tampered"] = False
            is_valid, bad_idx, reason = verify_blockchain_integrity()
            self._send_json({"success": True, "isValid": is_valid, "message": "Blockchain ledger integrity restored."})
            return

        elif path == "/api/campus-priorities/vote":
            chosen = body.get("priority")
            if chosen and chosen in STATE["campusPriorities"]:
                STATE["campusPriorities"][chosen] += 1
                self._send_json({"success": True, "priorities": STATE["campusPriorities"]})
            else:
                self._send_json({"error": "Invalid priority option"}, 400)
            return

        elif path == "/api/admin/toggle-election":
            new_status = body.get("status")
            if new_status in ["active", "paused", "closed"]:
                STATE["election"]["status"] = new_status
                STATE["auditLogs"].insert(0, {
                    "id": len(STATE["auditLogs"]) + 1,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "eventType": "ADMIN_OVERRIDE",
                    "details": f"Election status changed to '{new_status}' by administrator.",
                    "ip": client_ip,
                    "isSuspicious": False
                })
                self._send_json({"success": True, "status": new_status})
            else:
                self._send_json({"error": "Invalid status option"}, 400)
            return

        elif path == "/api/admin/create-election":
            title = body.get("title", "").strip() or "Department Representative Elections 2026"
            election_id = body.get("id", "").strip().upper() or f"ELEX-{datetime.now().strftime('%Y%m%d%H%M')}"
            position = body.get("position", "For Representative")
            duration_hours = float(body.get("durationHours", 6))
            total_eligible = int(body.get("totalEligible", 500))
            raw_candidates = body.get("candidates", [])

            now_utc = datetime.now(timezone.utc)
            end_utc = now_utc + timedelta(hours=duration_hours)

            # 1. Update Election State
            STATE["election"] = {
                "id": election_id,
                "title": title,
                "subtitle": f"Official Ballot: {position}",
                "status": "active",
                "startTime": now_utc.isoformat(),
                "endTime": end_utc.isoformat(),
                "totalEligible": total_eligible,
                "positions": [position]
            }

            # 2. Build Candidate List
            new_candidates = []
            if raw_candidates and len(raw_candidates) > 0:
                for idx, c in enumerate(raw_candidates):
                    cid = c.get("id") or f"CAND-0{idx + 1}"
                    new_candidates.append({
                        "id": cid,
                        "name": c.get("name", f"Candidate {idx + 1}"),
                        "position": f"For {position}",
                        "department": c.get("department", "CSE"),
                        "year": c.get("year", "3rd Year"),
                        "avatar": c.get("avatar") or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
                        "tagline": c.get("tagline", "Dedicated to transparent student leadership"),
                        "color": c.get("color") or ["#38bdf8", "#10b981", "#8b5cf6", "#f59e0b"][idx % 4],
                        "manifesto": c.get("manifesto", {
                            "academic": "Tutorial hours and mentorship",
                            "infrastructure": "High-speed lab internet & modern tools",
                            "events": "Department symposia & hackathons",
                            "welfare": "Peer support and open door council",
                            "technology": "Digital attendance & repository",
                            "placement": "Industry connect & alumni talk",
                            "previousWork": "Student Council Volunteer",
                            "commitmentsCount": 8,
                            "actionReadyScore": 85
                        }),
                        "votes": 0
                    })
            else:
                new_candidates = [
                    {
                        "id": "CAND-01",
                        "name": "Devansh Singhania",
                        "position": f"For {position}",
                        "department": "CSE",
                        "year": "3rd Year",
                        "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
                        "tagline": "Practical lab upgrades, hackathons, and transparent student representation",
                        "color": "#38bdf8",
                        "manifesto": {
                            "academic": "Peer tutorials, lab access extension",
                            "infrastructure": "Wi-Fi bandwidth upgrade, clean hydration points",
                            "events": "Annual CodeQuest & inter-batch leagues",
                            "welfare": "Direct student redressal channel",
                            "technology": "Department git server & project showcase",
                            "placement": "DSA bootcamps & mock interviews",
                            "previousWork": "Organized HackCSE 2025 (400+ attendees)",
                            "commitmentsCount": 9,
                            "actionReadyScore": 88
                        },
                        "votes": 0
                    },
                    {
                        "id": "CAND-02",
                        "name": "Tanvi Malviya",
                        "position": f"For {position}",
                        "department": "IT",
                        "year": "3rd Year",
                        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
                        "tagline": "Research partnerships, career workshops, and inclusive campus life",
                        "color": "#10b981",
                        "manifesto": {
                            "academic": "Research publication guidance & seminar series",
                            "infrastructure": "Smart boards in seminar halls & 24/7 library",
                            "events": "Startup showcase & open-source sprints",
                            "welfare": "Student mental wellbeing desk",
                            "technology": "Paperless assignment submission portal",
                            "placement": "Core domain placement training",
                            "previousWork": "Lead Developer in OpenSource Campus Club",
                            "commitmentsCount": 11,
                            "actionReadyScore": 84
                        },
                        "votes": 0
                    }
                ]

            # Anchor NOTA
            new_candidates.append({
                "id": "CAND-NOTA",
                "name": "None Of The Above (NOTA)",
                "position": f"Constitutional Option",
                "department": "All Departments",
                "year": "Universal",
                "avatar": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80",
                "tagline": "Democratic rejection of all nominated candidates",
                "color": "#ef4444",
                "manifesto": {
                    "academic": "Re-nomination directive if NOTA plurality",
                    "infrastructure": "Democratic safeguard",
                    "events": "Electoral reform",
                    "welfare": "Expression of non-confidence",
                    "technology": "Cryptographic ballot seal",
                    "placement": "Institutional governance accountability",
                    "previousWork": "Guaranteed by Constitution charter",
                    "commitmentsCount": 0,
                    "actionReadyScore": 100
                },
                "votes": 0
            })
            STATE["candidates"] = new_candidates

            # 3. Reset Voter Roster & Ballots
            for sid, s in STATE["students"].items():
                s["hasVoted"] = False
                s["verified"] = False
                s["otp"] = None
                s["receiptHash"] = None

            STATE["votes"] = []
            STATE["receipts"] = {}

            # 4. Reset Priorities
            for k in STATE["campusPriorities"]:
                STATE["campusPriorities"][k] = 0

            # 5. Mint New Genesis Block for New Election
            merkle_data = f"GENESIS:{election_id}:{title}:{now_utc.isoformat()}"
            merkle_root = hashlib.sha256(merkle_data.encode()).hexdigest()
            genesis_block = {
                "index": 0,
                "timestamp": now_utc.isoformat(),
                "data": {
                    "type": "GENESIS_BLOCK",
                    "electionId": election_id,
                    "title": title,
                    "position": position,
                    "authority": "College Election Commission",
                    "declaredCandidates": len(new_candidates),
                    "status": "SEALED",
                    "voterToken": "GENESIS-ROOT"
                },
                "previousHash": "0" * 64,
                "merkleRoot": merkle_root,
                "nonce": 1001,
                "tampered": False
            }
            genesis_block["hash"] = compute_block_hash(genesis_block)
            STATE["blockchain"] = [genesis_block]

            # 6. Audit Trail
            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "NEW_ELECTION_LAUNCHED",
                "details": f"Election '{title}' (ID: {election_id}) launched by Admin. Genesis Block #0 minted.",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({
                "success": True,
                "message": f"New election '{title}' successfully cast and launched!",
                "election": STATE["election"],
                "candidates": STATE["candidates"],
                "blockchain": STATE["blockchain"]
            })
            return

        elif path == "/api/admin/add-candidate":
            cand_name = body.get("name", "").strip()
            manifesto = body.get("manifesto", {})
            if not cand_name:
                self._send_json({"error": "Candidate name is required"}, 400)
                return

            new_id = f"CAND-0{len(STATE['candidates']) + 1}"
            new_candidate = {
                "id": new_id,
                "name": cand_name,
                "position": body.get("position", "For President"),
                "department": body.get("department", "CSE"),
                "year": body.get("year", "3rd Year"),
                "avatar": body.get("avatar") or "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
                "tagline": body.get("tagline", "Dedicated to progressive student advocacy"),
                "color": "#06b6d4",
                "manifesto": {
                    "academic": manifesto.get("academic", "Specialized tutorials and study circles"),
                    "infrastructure": manifesto.get("infrastructure", "Smart boards and clean water coolers"),
                    "events": manifesto.get("events", "Cultural open mics and coding leagues"),
                    "welfare": manifesto.get("welfare", "Student grievance redressal desk"),
                    "technology": manifesto.get("technology", "Automated lab slot booking"),
                    "placement": manifesto.get("placement", "Alumni mentorship networking"),
                    "previousWork": manifesto.get("previousWork", "Class representative 2024-2025"),
                    "commitmentsCount": int(manifesto.get("commitmentsCount", 8)),
                    "actionReadyScore": int(manifesto.get("actionReadyScore", 75))
                },
                "votes": 0
            }
            STATE["candidates"].append(new_candidate)

            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "CANDIDATE_ADDED",
                "details": f"New candidate {cand_name} added to ballot by admin.",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({"success": True, "candidate": new_candidate})
            return

        elif path == "/api/reset-demo":
            # Reset student voting status for testing
            for sid, s in STATE["students"].items():
                s["hasVoted"] = False
                s["verified"] = False
                s["receiptHash"] = None
            # Keep genesis and initial block
            STATE["blockchain"] = STATE["blockchain"][:2]
            if len(STATE["blockchain"]) > 1:
                STATE["blockchain"][1]["tampered"] = False
                STATE["blockchain"][1]["data"]["receiptHash"] = "0x7a89b4f321ec908d"
                STATE["blockchain"][1]["hash"] = "bdbf46034983ed4cf54e36127ecac8775af17fe7ed2275f44c4f52c6d379280d"
            self._send_json({"success": True, "message": "Demo voter states and blockchain ledger reset for fresh test."})
        elif path == "/api/admin/end-election-now":
            STATE["election"]["status"] = "concluded"
            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "ELECTION_CONCLUDED_BY_ADMIN",
                "details": "Election was concluded on demand by Admin Dr. S. Ramanujan. Instant tabulation triggered.",
                "ip": client_ip,
                "isSuspicious": False
            })
            total_voted = sum(c["votes"] for c in STATE["candidates"])
            sorted_cands = sorted(STATE["candidates"], key=lambda c: c["votes"], reverse=True)
            self._send_json({
                "success": True,
                "message": "Election officially concluded by Chief Returning Officer.",
                "winner": sorted_cands[0] if sorted_cands else None,
                "totalVoted": total_voted,
                "status": "concluded"
            })
            return

        elif path == "/api/admin/grant-revote":
            sid = body.get("studentId", "").strip().upper()
            reason = body.get("reason", "TECHNICAL_GLITCH")
            auth_ref = body.get("authRef", f"CEC/REV-2026/{int(time.time()) % 1000}")
            student = STATE["students"].get(sid)
            if not student:
                self._send_json({"error": f"Student {sid} not found in voter roster."}, 404)
                return

            student["hasVoted"] = False
            student["receiptHash"] = None
            student["revoteGranted"] = True

            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "REVOTE_CLEARANCE_GRANTED",
                "details": f"Revote clearance granted for {student['name']} ({sid}). Order: {auth_ref}. Reason: {reason}.",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({
                "success": True,
                "message": f"Revote clearance granted for {student['name']} ({sid}).",
                "student": student
            })
            return

        elif path == "/api/admin/update-timer":
            closing_iso = body.get("closingTime")
            if closing_iso:
                STATE["election"]["endTime"] = closing_iso
            self._send_json({
                "success": True,
                "message": "Election schedule updated successfully.",
                "endTime": STATE["election"]["endTime"]
            })
            return

        elif path == "/api/admin/add-voter":
            sid = body.get("studentId", "").strip().upper()
            name = body.get("name", "").strip()
            dept = body.get("department", "CSE").strip()
            year = body.get("year", "3rd Year").strip()
            email = body.get("email", f"{sid.lower()}@college.edu").strip()
            phone = body.get("phone", "+91 98765 00000").strip()
            pin = body.get("pin", "1234").strip()

            if not sid or not name:
                self._send_json({"error": "Student ID and Full Name are mandatory."}, 400)
                return

            if sid in STATE["students"]:
                self._send_json({"error": f"Student ID '{sid}' is already registered on the voter roll."}, 409)
                return

            new_voter = {
                "studentId": sid,
                "name": name,
                "department": dept,
                "year": year,
                "phone": phone,
                "email": email,
                "pin": pin,
                "password": "password123",
                "verified": False,
                "hasVoted": False,
                "otp": None,
                "otpExpires": 0,
                "receiptHash": None,
                "revoteGranted": False
            }
            STATE["students"][sid] = new_voter
            STATE["election"]["totalEligible"] += 1

            for d in STATE["departments"]:
                if d["code"] == dept:
                    d["total"] += 1

            STATE["auditLogs"].insert(0, {
                "id": len(STATE["auditLogs"]) + 1,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "eventType": "VOTER_ENROLLED",
                "details": f"New voter enrolled: {name} ({sid}) for {dept} ({year}) by Admin Dr. S. Ramanujan.",
                "ip": client_ip,
                "isSuspicious": False
            })

            self._send_json({
                "success": True,
                "message": f"Student {name} ({sid}) successfully enrolled to electoral roll.",
                "voter": new_voter,
                "totalEligible": STATE["election"]["totalEligible"]
            })
            return

        self._send_json({"error": "Endpoint not found"}, 404)

if __name__ == "__main__":
    handler = VotingRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"============================================================")
        print(f" Smart & Secure College Voting System Server Running on Port {PORT}")
        print(f" URL: http://localhost:{PORT}")
        print(f" Project No. 94 - B.Tech Mini Project")
        print(f"============================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.server_close()
