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
from datetime import datetime, timezone

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
            "verified": False,
            "hasVoted": False,
            "otp": None,
            "otpExpires": 0,
            "receiptHash": None
        }
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

        if path == "/api/auth/send-otp":
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
                    "verificationStatus": "VALIDATED & SEALED"
                }
            })
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
            self._send_json({"success": True, "message": "Demo voter states reset for fresh test."})
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
