const STAFF = [
  { id: "S001", name: "Dr. Amirul Hakim bin Zulkifli", ic: "850312-14-5021", entity: "CVSKL", department: "Cardiology", position: "Senior Consultant", salary: 18500, status: "Active", contract: "Permanent", joined: "2015-03-01", probation_end: null, gender: "Male" },
  { id: "S002", name: "Nur Aisyah binti Mohd Razif", ic: "920714-10-6032", entity: "CVSKL", department: "HR", position: "HR Manager", salary: 7200, status: "Active", contract: "Permanent", joined: "2018-06-15", probation_end: null, gender: "Female" },
  { id: "S003", name: "Tan Wei Liang", ic: "880901-08-4411", entity: "CVSKL", department: "Finance", position: "Finance Executive", salary: 5800, status: "Active", contract: "Permanent", joined: "2019-01-10", probation_end: null, gender: "Male" },
  { id: "S004", name: "Priya d/o Krishnamurthy", ic: "940202-07-5562", entity: "CVSKL", department: "Nursing", position: "Senior Nurse", salary: 4800, status: "Active", contract: "Permanent", joined: "2020-08-01", probation_end: null, gender: "Female" },
  { id: "S005", name: "Muhammad Hafiz bin Saiful", ic: "960415-11-7743", entity: "CVSKL", department: "Radiology", position: "Radiographer", salary: 4200, status: "Resigned", contract: "Permanent", joined: "2021-03-15", probation_end: null, gender: "Male" },
  { id: "S006", name: "Siti Rohani binti Abdullah", ic: "910820-06-3321", entity: "CVSKL", department: "Pharmacy", position: "Pharmacist", salary: 5500, status: "Active", contract: "Permanent", joined: "2017-11-01", probation_end: null, gender: "Female" },
  { id: "S007", name: "Dr. Lim Chee Keong", ic: "780605-10-2211", entity: "CVSKL", department: "Surgery", position: "Consultant Surgeon", salary: 22000, status: "Active", contract: "Permanent", joined: "2012-04-01", probation_end: null, gender: "Male" },
  { id: "S008", name: "Farah Nadia binti Roslan", ic: "980123-14-4432", entity: "CVSKL", department: "Admin", position: "Admin Executive", salary: 3200, status: "Probation", contract: "Permanent", joined: "2026-01-15", probation_end: "2026-07-15", gender: "Female" },
  { id: "S009", name: "Rajendran a/l Suppiah", ic: "870317-08-6651", entity: "CVSKL", department: "Maintenance", position: "Maintenance Supervisor", salary: 3800, status: "Active", contract: "Contract", joined: "2022-06-01", probation_end: null, gender: "Male" },
  { id: "S010", name: "Wong Mei Fong", ic: "930714-14-7892", entity: "CVSKL", department: "IT", position: "IT Executive", salary: 4500, status: "Active", contract: "Permanent", joined: "2020-02-10", probation_end: null, gender: "Female" },
  { id: "S011", name: "Dr. Nurul Hazwani binti Ismail", ic: "891005-03-6621", entity: "PICASO", department: "Paediatrics", position: "Consultant Paediatrician", salary: 17500, status: "Active", contract: "Permanent", joined: "2016-07-01", probation_end: null, gender: "Female" },
  { id: "S012", name: "Azman bin Othman", ic: "840612-05-3341", entity: "PICASO", department: "Operations", position: "Operations Manager", salary: 8500, status: "Active", contract: "Permanent", joined: "2014-09-15", probation_end: null, gender: "Male" },
  { id: "S013", name: "Chong Li Ying", ic: "950228-10-5512", entity: "PICASO", department: "Nursing", position: "Staff Nurse", salary: 3900, status: "Active", contract: "Permanent", joined: "2021-05-01", probation_end: null, gender: "Female" },
  { id: "S014", name: "Mohd Zulhilmi bin Zainudin", ic: "991130-11-4423", entity: "PICASO", department: "Admin", position: "Front Desk Officer", salary: 2800, status: "Resigned", contract: "Permanent", joined: "2023-03-01", probation_end: null, gender: "Male" },
  { id: "S015", name: "Kavitha d/o Balakrishnan", ic: "020514-08-3312", entity: "PICASO", department: "Lab", position: "Lab Technician", salary: 3500, status: "Probation", contract: "Permanent", joined: "2026-02-01", probation_end: "2026-08-01", gender: "Female" },
  { id: "S016", name: "Dr. Ahmad Fadzillah bin Nordin", ic: "820910-12-7741", entity: "PICASO", department: "Emergency", position: "Emergency Physician", salary: 16000, status: "Active", contract: "Permanent", joined: "2013-11-01", probation_end: null, gender: "Male" },
  { id: "S017", name: "Nurul Izzati binti Kamaruddin", ic: "970301-14-2231", entity: "PICASO", department: "Finance", position: "Accounts Executive", salary: 4100, status: "Active", contract: "Permanent", joined: "2022-01-10", probation_end: null, gender: "Female" },
  { id: "S018", name: "Lee Jian Wei", ic: "010808-10-5543", entity: "PICASO", department: "IT", position: "IT Support", salary: 3000, status: "Active", contract: "Contract", joined: "2025-08-01", probation_end: null, gender: "Male" },
  { id: "S019", name: "Salmah binti Hamid", ic: "760430-06-4421", entity: "CVSKL", department: "Nursing", position: "Head Nurse", salary: 6500, status: "Active", contract: "Permanent", joined: "2010-05-01", probation_end: null, gender: "Female" },
  { id: "S020", name: "Daniel Anak Jimbun", ic: "930615-13-3312", entity: "CVSKL", department: "Security", position: "Security Officer", salary: 2600, status: "Terminated", contract: "Contract", joined: "2023-07-01", probation_end: null, gender: "Male" },
];

const MOVEMENTS = [
  { date: "2026-04-10", staff_id: "S015", name: "Kavitha d/o Balakrishnan", entity: "PICASO", type: "Hired", from: "—", to: "Lab Technician", note: "New hire, on probation" },
  { date: "2026-04-08", staff_id: "S005", name: "Muhammad Hafiz bin Saiful", entity: "CVSKL", type: "Resigned", from: "Radiographer", to: "—", note: "Personal reasons" },
  { date: "2026-04-03", staff_id: "S014", name: "Mohd Zulhilmi bin Zainudin", entity: "PICASO", type: "Resigned", from: "Front Desk Officer", to: "—", note: "Better offer" },
  { date: "2026-03-20", staff_id: "S008", name: "Farah Nadia binti Roslan", entity: "CVSKL", type: "Hired", from: "—", to: "Admin Executive", note: "New hire, on probation" },
  { date: "2026-03-15", staff_id: "S020", name: "Daniel Anak Jimbun", entity: "CVSKL", type: "Terminated", from: "Security Officer", to: "—", note: "Contract breach" },
  { date: "2026-02-01", staff_id: "S015", name: "Kavitha d/o Balakrishnan", entity: "PICASO", type: "Hired", from: "—", to: "Lab Technician", note: "Joined Feb 2026" },
  { date: "2026-01-15", staff_id: "S008", name: "Farah Nadia binti Roslan", entity: "CVSKL", type: "Hired", from: "—", to: "Admin Executive", note: "Joined Jan 2026" },
  { date: "2025-11-01", staff_id: "S004", name: "Priya d/o Krishnamurthy", entity: "CVSKL", type: "Promoted", from: "Staff Nurse", to: "Senior Nurse", note: "Performance-based promotion" },
  { date: "2025-09-01", staff_id: "S012", name: "Azman bin Othman", entity: "PICASO", type: "Transferred", from: "CVSKL — Operations", to: "PICASO — Operations Manager", note: "Internal transfer" },
  { date: "2025-07-01", staff_id: "S006", name: "Siti Rohani binti Abdullah", entity: "CVSKL", type: "Promoted", from: "Assistant Pharmacist", to: "Pharmacist", note: "Confirmed after probation + promotion" },
];

const LEAVE = {
  "S001": { al_entitled: 18, al_taken: 6, al_balance: 12, mc_taken: 2, mc_balance: 14, hl_taken: 0 },
  "S002": { al_entitled: 16, al_taken: 8, al_balance: 8, mc_taken: 5, mc_balance: 9, hl_taken: 0 },
  "S003": { al_entitled: 16, al_taken: 10, al_balance: 6, mc_taken: 3, mc_balance: 11, hl_taken: 0 },
  "S004": { al_entitled: 16, al_taken: 4, al_balance: 12, mc_taken: 7, mc_balance: 7, hl_taken: 3 },
  "S005": { al_entitled: 14, al_taken: 12, al_balance: 2, mc_taken: 9, mc_balance: 5, hl_taken: 0 },
  "S006": { al_entitled: 16, al_taken: 5, al_balance: 11, mc_taken: 1, mc_balance: 13, hl_taken: 0 },
  "S007": { al_entitled: 18, al_taken: 3, al_balance: 15, mc_taken: 0, mc_balance: 14, hl_taken: 0 },
  "S008": { al_entitled: 8,  al_taken: 1, al_balance: 7,  mc_taken: 2, mc_balance: 12, hl_taken: 0 },
  "S009": { al_entitled: 14, al_taken: 7, al_balance: 7,  mc_taken: 4, mc_balance: 10, hl_taken: 0 },
  "S010": { al_entitled: 16, al_taken: 6, al_balance: 10, mc_taken: 2, mc_balance: 12, hl_taken: 0 },
  "S011": { al_entitled: 18, al_taken: 9, al_balance: 9,  mc_taken: 1, mc_balance: 13, hl_taken: 5 },
  "S012": { al_entitled: 18, al_taken: 11, al_balance: 7, mc_taken: 3, mc_balance: 11, hl_taken: 0 },
  "S013": { al_entitled: 14, al_taken: 3, al_balance: 11, mc_taken: 6, mc_balance: 8,  hl_taken: 0 },
  "S014": { al_entitled: 14, al_taken: 13, al_balance: 1, mc_taken: 8, mc_balance: 6,  hl_taken: 0 },
  "S015": { al_entitled: 8,  al_taken: 0, al_balance: 8,  mc_taken: 1, mc_balance: 13, hl_taken: 0 },
  "S016": { al_entitled: 18, al_taken: 7, al_balance: 11, mc_taken: 2, mc_balance: 12, hl_taken: 0 },
  "S017": { al_entitled: 14, al_taken: 4, al_balance: 10, mc_taken: 3, mc_balance: 11, hl_taken: 0 },
  "S018": { al_entitled: 12, al_taken: 2, al_balance: 10, mc_taken: 1, mc_balance: 13, hl_taken: 0 },
  "S019": { al_entitled: 18, al_taken: 5, al_balance: 13, mc_taken: 4, mc_balance: 10, hl_taken: 2 },
  "S020": { al_entitled: 12, al_taken: 11, al_balance: 1, mc_taken: 10, mc_balance: 4, hl_taken: 0 },
};

const SALARY_HISTORY = {
  "S001": [
    { year: 2015, salary: 14000, increment: null, note: "Joined" },
    { year: 2016, salary: 14800, increment: 800, note: "Annual increment" },
    { year: 2018, salary: 16000, increment: 1200, note: "Promotion to Senior Consultant" },
    { year: 2020, salary: 17000, increment: 1000, note: "Annual increment" },
    { year: 2023, salary: 18500, increment: 1500, note: "Performance-based increment" },
  ],
  "S002": [
    { year: 2018, salary: 5500, increment: null, note: "Joined" },
    { year: 2019, salary: 6000, increment: 500, note: "Annual increment" },
    { year: 2021, salary: 6500, increment: 500, note: "Annual increment" },
    { year: 2023, salary: 7000, increment: 500, note: "Annual increment" },
    { year: 2025, salary: 7200, increment: 200, note: "Mid-year adjustment" },
  ],
  "S004": [
    { year: 2020, salary: 3800, increment: null, note: "Joined" },
    { year: 2021, salary: 4000, increment: 200, note: "Annual increment" },
    { year: 2025, salary: 4500, increment: 500, note: "Promotion to Senior Nurse" },
    { year: 2026, salary: 4800, increment: 300, note: "Annual increment" },
  ],
  "S007": [
    { year: 2012, salary: 16000, increment: null, note: "Joined" },
    { year: 2015, salary: 18000, increment: 2000, note: "Specialist recognition" },
    { year: 2019, salary: 20000, increment: 2000, note: "Senior specialist" },
    { year: 2023, salary: 22000, increment: 2000, note: "Performance-based" },
  ],
  "S019": [
    { year: 2010, salary: 3200, increment: null, note: "Joined" },
    { year: 2013, salary: 3800, increment: 600, note: "Annual increment" },
    { year: 2016, salary: 4500, increment: 700, note: "Promotion to Head Nurse" },
    { year: 2020, salary: 5500, increment: 1000, note: "Annual increment" },
    { year: 2024, salary: 6500, increment: 1000, note: "Long service increment" },
  ],
};

const PERFORMANCE = {
  "S001": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 92, bonus: 5550, kpi: ["Patient satisfaction 96%", "Zero critical incidents", "Mentored 2 junior doctors"] },
  "S002": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 89, bonus: 2160, kpi: ["HR policy rollout completed", "Reduced onboarding time by 30%", "Zero compliance issues"] },
  "S003": { year: 2025, tier: "Tier 2", rating: "Good", score: 76, bonus: 870, kpi: ["Monthly reports on time", "Audit passed", "Pending process automation"] },
  "S004": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 88, bonus: 1440, kpi: ["Patient care score 94%", "Zero medication errors", "Promoted mid-year"] },
  "S006": { year: 2025, tier: "Tier 2", rating: "Good", score: 78, bonus: 825, kpi: ["Dispensary accuracy 99.1%", "Stock management improved", "Training pending"] },
  "S007": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 95, bonus: 6600, kpi: ["Top revenue-generating surgeon", "Patient outcome 98%", "0 complications reported"] },
  "S009": { year: 2025, tier: "Tier 2", rating: "Good", score: 74, bonus: 570, kpi: ["Preventive maintenance on schedule", "1 minor incident resolved", "Cost saving RM 8,000"] },
  "S010": { year: 2025, tier: "Tier 2", rating: "Good", score: 80, bonus: 675, kpi: ["Uptime 99.5%", "All tickets resolved <24h", "Network upgrade completed"] },
  "S011": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 91, bonus: 5250, kpi: ["Paediatric satisfaction 97%", "Research paper published", "Zero adverse events"] },
  "S012": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 87, bonus: 2550, kpi: ["Operations efficiency +18%", "Budget variance <2%", "New vendor deals closed"] },
  "S016": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 90, bonus: 4800, kpi: ["A&E response time <8min", "Resuscitation success rate 88%", "Team lead for 3 emergencies"] },
  "S019": { year: 2025, tier: "Tier 1", rating: "Excellent", score: 93, bonus: 1950, kpi: ["Ward management score 98%", "Zero complaint escalations", "16 years exemplary service"] },
};

const AI_QA = [
  { q: "how many staff do we have?", a: "Total active staff across both entities: <strong>15</strong> — CVSKL: 10 active, PICASO: 5 active. Excludes resigned and terminated." },
  { q: "who resigned this month?", a: "2 staff resigned in April 2026:<br>• Muhammad Hafiz bin Saiful (CVSKL, Radiology) — 8 Apr<br>• Mohd Zulhilmi bin Zainudin (PICASO, Admin) — 3 Apr" },
  { q: "who is on probation?", a: "2 staff currently on probation:<br>• Farah Nadia binti Roslan — CVSKL, Admin Executive (ends 15 Jul 2026)<br>• Kavitha d/o Balakrishnan — PICASO, Lab Technician (ends 1 Aug 2026)" },
  { q: "who has the longest service?", a: "Longest serving staff: <strong>Salmah binti Hamid</strong> — Head Nurse, CVSKL. Joined 1 May 2010. <strong>16 years of service.</strong>" },
  { q: "show me cvskl staff only", a: "CVSKL currently has <strong>12 staff records</strong> — 10 active, 1 resigned, 1 terminated. Departments: Cardiology, HR, Finance, Nursing, Radiology, Pharmacy, Surgery, Admin, Maintenance, IT, Security." },
  { q: "any recent promotions?", a: "2 promotions in the last 6 months:<br>• Priya d/o Krishnamurthy — Promoted to Senior Nurse, CVSKL (Nov 2025)<br>• Siti Rohani binti Abdullah — Promoted to Pharmacist, CVSKL (Jul 2025)" },
  { q: "who was transferred between entities?", a: "1 inter-entity transfer recorded:<br>• Azman bin Othman — Transferred from CVSKL Operations to PICASO Operations Manager (Sep 2025)" },
  { q: "what is the total salary cost?", a: "Estimated monthly salary cost (active staff only):<br>• CVSKL: <strong>RM 76,800</strong><br>• PICASO: <strong>RM 53,800</strong><br>• Combined: <strong>RM 130,600/month</strong>" },
  { q: "who got tier 1 performance?", a: "Tier 1 (Excellent) staff in 2025:<br>• Dr. Amirul Hakim — Score 92, Bonus RM 5,550<br>• Dr. Lim Chee Keong — Score 95, Bonus RM 6,600<br>• Salmah binti Hamid — Score 93, Bonus RM 1,950<br>• Nur Aisyah binti Mohd Razif — Score 89, Bonus RM 2,160<br>• Dr. Nurul Hazwani (PICASO) — Score 91, Bonus RM 5,250<br>• Dr. Ahmad Fadzillah (PICASO) — Score 90, Bonus RM 4,800" },
  { q: "what is the total bonus payout?", a: "Total performance bonus payout for 2025:<br>• Tier 1 staff: <strong>RM 29,860</strong><br>• Tier 2 staff: <strong>RM 3,540</strong><br>• Grand total: <strong>RM 33,400</strong>" },
  { q: "who has low leave balance?", a: "Staff with low Annual Leave balance (≤3 days):<br>• Muhammad Hafiz bin Saiful — 2 days AL left (CVSKL, Resigned)<br>• Mohd Zulhilmi bin Zainudin — 1 day AL left (PICASO, Resigned)<br>• Daniel Anak Jimbun — 1 day AL left (CVSKL, Terminated)" },
  { q: "show me salary increments this year?", a: "Salary increments processed in 2026:<br>• Priya d/o Krishnamurthy — +RM 300 (Senior Nurse, CVSKL)<br>• Salmah binti Hamid — +RM 1,000 (Head Nurse, CVSKL, long service)<br>Note: Annual increment cycle runs Jan–Mar 2026." },
  { q: "who has the highest salary?", a: "Top 3 highest paid staff:<br>1. Dr. Lim Chee Keong — <strong>RM 22,000</strong>/month (Surgery, CVSKL)<br>2. Dr. Amirul Hakim — <strong>RM 18,500</strong>/month (Cardiology, CVSKL)<br>3. Dr. Nurul Hazwani — <strong>RM 17,500</strong>/month (Paediatrics, PICASO)" },
  { q: "who is taking the most mc?", a: "Staff with highest MC taken (2026 YTD):<br>• Muhammad Hafiz bin Saiful — 9 days (CVSKL, Radiology)<br>• Mohd Zulhilmi bin Zainudin — 8 days (PICASO, Admin)<br>• Daniel Anak Jimbun — 10 days (CVSKL, Security — Terminated)" },
  { q: "who is tier 2?", a: "Tier 2 (Good) staff in 2025:<br>• Tan Wei Liang — Score 76, Bonus RM 870 (Finance, CVSKL)<br>• Siti Rohani — Score 78, Bonus RM 825 (Pharmacy, CVSKL)<br>• Rajendran — Score 74, Bonus RM 570 (Maintenance, CVSKL)<br>• Wong Mei Fong — Score 80, Bonus RM 675 (IT, CVSKL)" },

  // --- HIRING Q&A ---
  { q: "how many open positions do we have?", a: "Currently <strong>6 active job requisitions</strong> across CVSKL and PICASO, covering a total of <strong>12 open headcount</strong>:<br>• JR-001 — Senior Nurse, CVSKL (3 pax)<br>• JR-002 — IT Executive, CVSKL (1 pax)<br>• JR-003 — Front Desk Officer, PICASO (2 pax)<br>• JR-004 — Finance Executive, CVSKL (1 pax)<br>• JR-005 — Radiographer, CVSKL (1 pax)<br>• JR-008 — Staff Nurse, PICASO (4 pax)" },
  { q: "how many candidates do we have?", a: "Total candidates in the system: <strong>21 candidates</strong> across 8 job requisitions.<br><br>Breakdown by stage:<br>• Applied: 4<br>• Screening: 5<br>• Interview 1: 5<br>• Interview 2: 2<br>• Offer: 1<br>• Hired: 4<br>• Rejected: 3" },
  { q: "who got hired?", a: "4 candidates have been successfully hired:<br>• <strong>Siti Aishah binti Hamdan</strong> — Senior Nurse, CVSKL (via JobStreet, starts 1 May)<br>• <strong>Haslinda binti Zahari</strong> — Front Desk Officer, PICASO (via JobStreet, started 1 April)<br>• <strong>Kavitha d/o Balakrishnan</strong> — Lab Technician, PICASO (via Referral, started Feb 2026)<br>• <strong>Nurul Syahirah binti Murad</strong> — Lab Technician, PICASO (via JobStreet, started Feb 2026)" },
  { q: "who was rejected?", a: "3 candidates have been rejected so far:<br>• <strong>Rozita binti Mahmud</strong> — applied for Senior Nurse, CVSKL. Reason: salary expectation too high.<br>• <strong>Tan Jun Hong</strong> — applied for IT Executive, CVSKL. Reason: insufficient experience.<br>• Both were screened before rejection — no wasted interview slots." },
  { q: "which positions are urgent?", a: "3 positions flagged as <strong>High Urgency</strong>:<br>• <strong>Senior Nurse</strong> — CVSKL, Nursing (3 pax needed — 1 hired, 2 still open)<br>• <strong>Radiographer</strong> — CVSKL, Radiology (1 pax, all 3 candidates still early stage)<br>• <strong>Staff Nurse</strong> — PICASO, Nursing (4 pax needed, hiring just started)<br><br>Recommend prioritising Radiographer — currently no offer or late-stage candidates." },
  { q: "which position has the most candidates?", a: "JR-001 <strong>Senior Nurse (CVSKL)</strong> has the most candidates — <strong>4 total</strong>:<br>• 1 Hired (Siti Aishah)<br>• 1 in Interview 2 (Nur Hanis)<br>• 1 Screening (Norfazilah)<br>• 1 Rejected (Rozita)<br><br>JR-008 Staff Nurse (PICASO) follows with 4 candidates, all in early stages." },
  { q: "what is the hiring progress for nurses?", a: "Nursing hiring across both entities:<br><br><strong>CVSKL — Senior Nurse (JR-001, 3 pax)</strong><br>• 1 hired ✅ (Siti Aishah, starts 1 May)<br>• 1 in Interview 2 (Nur Hanis)<br>• 1 in Screening (Norfazilah)<br>• Still need 2 more to fill headcount<br><br><strong>PICASO — Staff Nurse (JR-008, 4 pax)</strong><br>• 3 candidates active (Applied/Screening/Interview 1)<br>• No hires yet — still early stage" },
  { q: "who is in the offer stage?", a: "1 candidate currently in Offer stage:<br><br><strong>Ahmad Syafiq bin Nordin</strong><br>• Position: IT Executive, CVSKL (JR-002)<br>• Source: LinkedIn<br>• Verbal offer made: <strong>RM 4,800/month</strong><br>• Status: Awaiting acceptance<br><br>Recommend following up — offer has been pending since March." },
  { q: "where are most candidates coming from?", a: "Candidate source breakdown (21 total):<br>• <strong>JobStreet</strong>: 8 candidates (38%) — highest volume<br>• <strong>LinkedIn</strong>: 7 candidates (33%) — highest quality-to-hire ratio<br>• <strong>Referral</strong>: 4 candidates (19%) — 2 referrals resulted in hires<br>• <strong>Walk-in</strong>: 3 candidates (14%)<br><br>💡 Referral has the best conversion rate — consider formalising a staff referral incentive." },
  { q: "which source gives the best hires?", a: "Best hiring source by conversion:<br><br><strong>Referral — Best ROI</strong><br>• 4 candidates referred → 2 hired (50% conversion)<br>• Hired: Kavitha (Lab Tech, PICASO) and Siti Aishah (Senior Nurse, CVSKL)<br><br><strong>JobStreet</strong><br>• 8 candidates → 2 hired (25% conversion)<br><br><strong>LinkedIn</strong><br>• 7 candidates → 0 hired yet (1 in Offer stage)<br><br>💡 Referrals convert 2x better than job boards." },
  { q: "who is interviewing soon?", a: "Upcoming interviews scheduled:<br><br>• <strong>Mohamad Irfan bin Rashid</strong> — IT Executive (JR-002), Interview 1 on <strong>22 April</strong> with Wong Mei Fong<br>• <strong>Ng Siew Ling</strong> — Staff Nurse PICASO (JR-008), Interview 1 on <strong>23 April</strong> with Dr. Nurul Hazwani<br>• <strong>Kelvin Ong Wei Jie</strong> — Radiographer (JR-005), Interview 1 on <strong>24 April</strong> with Nur Aisyah<br>• <strong>Nurul Izzah binti Othman</strong> — Front Desk PICASO (JR-003), Interview 1 on <strong>25 April</strong> with Azman<br><br>4 interviews this week." },
  { q: "how many candidates are in screening?", a: "Currently <strong>5 candidates in Screening</strong>:<br>• Norfazilah binti Saad — Senior Nurse, CVSKL<br>• Farhana binti Jalil — Front Desk Officer, PICASO<br>• Sharmila d/o Rajan — Finance Executive, CVSKL<br>• Zuraidah binti Ismail — Radiographer, CVSKL<br>• Putri Aisyah binti Ariffin — Staff Nurse, PICASO<br><br>These candidates need to be moved to Interview 1 or rejected to clear the pipeline." },
  { q: "who applied most recently?", a: "Most recent applications (last 7 days):<br>• <strong>Roslinda binti Wahid</strong> — Staff Nurse PICASO, applied 15 April (Walk-in)<br>• <strong>Nurul Izzah binti Othman</strong> — Front Desk PICASO, applied 12 April (Walk-in)<br>• <strong>Farhana binti Jalil</strong> — Front Desk PICASO, applied 14 April (LinkedIn)<br>• <strong>Ng Siew Ling</strong> — Staff Nurse PICASO, applied 10 April (LinkedIn)" },
  { q: "what positions are on hold?", a: "1 position currently <strong>On Hold</strong>:<br><br><strong>JR-007 — Security Officer, CVSKL</strong><br>• Headcount: 1 pax<br>• Salary: RM 2,400 – 3,000<br>• Created: 10 April 2026<br>• Reason: Pending budget approval<br><br>No candidates assigned yet. Will activate once hold is lifted." },
  { q: "which positions are closed?", a: "1 position <strong>Closed</strong> (fully filled):<br><br><strong>JR-006 — Lab Technician, PICASO</strong><br>• Headcount: 2 pax — both filled ✅<br>• Hired: Kavitha d/o Balakrishnan (Referral) + Nurul Syahirah binti Murad (JobStreet)<br>• Both started February 2026<br><br>This is the only fully closed requisition this cycle." },
  { q: "how many picaso candidates?", a: "PICASO hiring activity:<br><br><strong>Open Positions: 2</strong><br>• JR-003 — Front Desk Officer (2 pax, Active)<br>• JR-008 — Staff Nurse (4 pax, Active)<br><br><strong>Candidates: 9 active</strong><br>• Hired: 1 (Haslinda — Front Desk)<br>• Interview 1: 2<br>• Screening: 2<br>• Applied: 3<br><br><strong>Closed: 1</strong> — JR-006 Lab Technician fully filled." },
  { q: "how many cvskl candidates?", a: "CVSKL hiring activity:<br><br><strong>Open Positions: 4</strong><br>• JR-001 — Senior Nurse (3 pax)<br>• JR-002 — IT Executive (1 pax)<br>• JR-004 — Finance Executive (1 pax)<br>• JR-005 — Radiographer (1 pax)<br><br><strong>Candidates: 12 active</strong><br>• Hired: 1 (Siti Aishah — Senior Nurse)<br>• Offer: 1 (Syafiq — IT Executive)<br>• Interview: 3<br>• Screening: 2<br>• Applied: 2<br>• Rejected: 3" },
  { q: "what is the total salary budget for open positions?", a: "Estimated salary budget for all open headcount (midpoint of ranges):<br><br>• Senior Nurse × 3 — RM 5,250 avg × 3 = <strong>RM 15,750/month</strong><br>• IT Executive × 1 — RM 4,750 avg = <strong>RM 4,750/month</strong><br>• Front Desk × 2 — RM 2,850 avg × 2 = <strong>RM 5,700/month</strong><br>• Finance Executive × 1 — RM 5,250 avg = <strong>RM 5,250/month</strong><br>• Radiographer × 1 — RM 4,400 avg = <strong>RM 4,400/month</strong><br>• Staff Nurse × 4 — RM 4,150 avg × 4 = <strong>RM 16,600/month</strong><br><br><strong>Total committed headcount budget: RM 52,450/month</strong>" },
  { q: "who is in interview 2?", a: "2 candidates currently in <strong>Interview 2</strong> (final round):<br><br>• <strong>Nur Hanis binti Zulkepli</strong> — Senior Nurse, CVSKL (JR-001)<br>&nbsp;&nbsp;Source: LinkedIn · Interviewer: Nur Aisyah · Note: Good candidate, pending final interview<br><br>• <strong>Lee Hui Min</strong> — Finance Executive, CVSKL (JR-004)<br>&nbsp;&nbsp;Source: LinkedIn · Interviewer: Tan Wei Liang · Note: Strong Excel + accounting background<br><br>Both are close to offer stage — recommend closing within this week." },
  { q: "show me it executive hiring status", a: "<strong>JR-002 — IT Executive, CVSKL</strong><br>Headcount: 1 pax · Salary: RM 4,000 – 5,500 · Urgency: Medium<br><br>Candidates (3):<br>• Ahmad Syafiq bin Nordin — <strong>Offer stage</strong> (RM 4,800 offered, awaiting reply)<br>• Mohamad Irfan bin Rashid — Interview 1 on 22 April<br>• Tan Jun Hong — Rejected (insufficient experience)<br><br>Outlook: Close to filled. If Syafiq accepts, position will be filled next week." },
  { q: "show me radiographer hiring status", a: "<strong>JR-005 — Radiographer, CVSKL</strong><br>Headcount: 1 pax · Salary: RM 3,800 – 5,000 · Urgency: <strong>HIGH</strong><br><br>Candidates (3):<br>• Hafizuddin bin Hamid — Applied (not yet screened)<br>• Zuraidah binti Ismail — Screening<br>• Kelvin Ong Wei Jie — Interview 1 on 24 April (Referral)<br><br>⚠️ No candidate past Interview 1 yet despite High urgency. This is the slowest-moving urgent position — needs attention." },
  { q: "which hiring is behind schedule?", a: "Positions at risk based on urgency vs pipeline progress:<br><br><strong>⚠️ JR-005 Radiographer (CVSKL)</strong><br>Urgency: HIGH · No candidate beyond Interview 1 yet · Position has been open since 1 April<br><br><strong>⚠️ JR-008 Staff Nurse PICASO (4 pax)</strong><br>Urgency: HIGH · All 4 candidates in Applied/Screening/Interview 1 · No offer yet · Opened 5 April<br><br><strong>JR-001 Senior Nurse CVSKL</strong> — partially on track (1 hired, 1 in Interview 2)" },
  { q: "how many interviews happened this month?", a: "April 2026 interview activity:<br><br><strong>Completed interviews:</strong><br>• Mohamad Irfan (IT Exec) — Interview 1, 22 April<br>• Ng Siew Ling (Staff Nurse) — Interview 1, 23 April<br>• Kelvin Ong (Radiographer) — Interview 1, 24 April<br>• Nurul Izzah (Front Desk) — Interview 1, 25 April<br>• Nur Hanis (Senior Nurse) — Interview 2, in progress<br>• Lee Hui Min (Finance Exec) — Interview 2, in progress<br><br><strong>Total: 6 interviews in April</strong>" },
  { q: "what is the average salary offered?", a: "Offers made this cycle:<br><br>• <strong>Ahmad Syafiq bin Nordin</strong> — IT Executive: <strong>RM 4,800/month</strong> (within JR-002 range of RM 4,000–5,500)<br>• Siti Aishah (Senior Nurse, hired) — confirmed within RM 4,500–6,000 range<br>• Haslinda (Front Desk, hired) — within RM 2,500–3,200 range<br><br><strong>Average offer: ~RM 3,800/month</strong> across confirmed hires this cycle." },
  { q: "any referral candidates?", a: "4 candidates came through <strong>staff referrals</strong>:<br><br>• <strong>Siti Aishah binti Hamdan</strong> — Senior Nurse CVSKL → <strong>Hired ✅</strong><br>• <strong>Kavitha d/o Balakrishnan</strong> — Lab Tech PICASO → <strong>Hired ✅</strong><br>• <strong>Mohamad Irfan bin Rashid</strong> — IT Executive CVSKL → Interview 1 (22 April)<br>• <strong>Kelvin Ong Wei Jie</strong> — Radiographer CVSKL → Interview 1 (24 April)<br><br>Referral conversion: <strong>2 out of 4 hired (50%)</strong> — best performing source." },

  // --- CROSS-ENTITY DETECTION Q&A ---
  { q: "any flagged candidates?", a: "⚠️ <strong>2 cross-entity risk alerts active</strong>:<br><br><strong>1. Fadzlan bin Mamat</strong> (IC: 880420-10-6612)<br>→ Applying for Front Desk Officer at <strong>PICASO</strong> (Screening stage)<br>→ Previously flagged by <strong>CVSKL</strong> on 20 Nov 2025: Submitted falsified academic certificate. Do Not Rehire.<br><br><strong>2. Mohamad Khairul Aziz</strong> (IC: 950310-05-4432)<br>→ Applying for Staff Nurse at <strong>PICASO</strong> (Applied stage)<br>→ Previously flagged by <strong>CVSKL</strong> on 15 Aug 2024: Aggressive and threatening behaviour toward interview panel. Do Not Rehire.<br><br>⛔ <strong>Both candidates must be rejected immediately.</strong> Do not proceed to interview without HR Director approval." },
  { q: "who is in the watchlist?", a: "Do-Not-Rehire Watchlist — <strong>2 entries</strong>:<br><br><strong>1. Fadzlan bin Mamat</strong> · IC: 880420-10-6612<br>Flagged by CVSKL · 20 Nov 2025<br>Reason: Falsified degree certificate (Computer Science). Fraud confirmed.<br><br><strong>2. Khairul Aziz bin Hamdan</strong> · IC: 950310-05-4432<br>Flagged by CVSKL · 15 Aug 2024<br>Reason: Aggressive behaviour toward interview panel. Police report filed.<br><br>Both are currently attempting to reapply at PICASO." },
  { q: "cross entity risk", a: "Cross-entity detection is active. <strong>2 flagged candidates</strong> have been detected reapplying at PICASO after being blacklisted by CVSKL:<br><br>• Fadzlan bin Mamat — fraud, applying to Front Desk (PICASO)<br>• Mohamad Khairul Aziz — misconduct, applying to Staff Nurse (PICASO)<br><br>Without this system, PICASO HR would have no way of knowing these candidates were already flagged by CVSKL. <strong>This is the exact pain point this system solves.</strong>" },
  { q: "how does duplicate detection work?", a: "The system cross-references every new candidate's <strong>IC number</strong> against the Do-Not-Rehire watchlist that is shared across CVSKL and PICASO.<br><br>When a match is found:<br>• 🔴 Red alert banner appears on the Candidates page<br>• Candidate card is flagged with ⚠ FLAGGED badge<br>• HR is shown the full rejection record from the sister entity<br>• HR must approve or reject before any action is taken<br><br>This prevents bad candidates from slipping through the cracks between entities." },
];

// --- HIRING TRACKER DATA ---
const JOB_REQUISITIONS = [
  { id: "JR-001", title: "Senior Nurse", department: "Nursing", entity: "CVSKL", headcount: 3, salary_min: 4500, salary_max: 6000, urgency: "High", status: "Active", created: "2026-03-01", created_by: "Nur Aisyah" },
  { id: "JR-002", title: "IT Executive", department: "IT", entity: "CVSKL", headcount: 1, salary_min: 4000, salary_max: 5500, urgency: "Medium", status: "Active", created: "2026-03-10", created_by: "Nur Aisyah" },
  { id: "JR-003", title: "Front Desk Officer", department: "Admin", entity: "PICASO", headcount: 2, salary_min: 2500, salary_max: 3200, urgency: "High", status: "Active", created: "2026-03-15", created_by: "Siti Rohani" },
  { id: "JR-004", title: "Finance Executive", department: "Finance", entity: "CVSKL", headcount: 1, salary_min: 4500, salary_max: 6000, urgency: "Low", status: "Active", created: "2026-03-20", created_by: "Nur Aisyah" },
  { id: "JR-005", title: "Radiographer", department: "Radiology", entity: "CVSKL", headcount: 1, salary_min: 3800, salary_max: 5000, urgency: "High", status: "Active", created: "2026-04-01", created_by: "Nur Aisyah" },
  { id: "JR-006", title: "Lab Technician", department: "Lab", entity: "PICASO", headcount: 2, salary_min: 3200, salary_max: 4200, urgency: "Medium", status: "Closed", created: "2026-02-01", created_by: "Siti Rohani" },
  { id: "JR-007", title: "Security Officer", department: "Security", entity: "CVSKL", headcount: 1, salary_min: 2400, salary_max: 3000, urgency: "Medium", status: "On Hold", created: "2026-04-10", created_by: "Nur Aisyah" },
  { id: "JR-008", title: "Staff Nurse", department: "Nursing", entity: "PICASO", headcount: 4, salary_min: 3500, salary_max: 4800, urgency: "High", status: "Active", created: "2026-04-05", created_by: "Siti Rohani" },
];

const CANDIDATES = [
  { id: "C001", ic: "900512-14-5521", jr_id: "JR-001", name: "Siti Aishah binti Hamdan", phone: "012-3456789", email: "siti.aishah@gmail.com", source: "JobStreet", stage: "Hired", applied: "2026-03-05", interviewer: "Dr. Amirul", notes: "Strong clinical background, confirmed start 1 May" },
  { id: "C002", ic: "920308-14-6632", jr_id: "JR-001", name: "Nur Hanis binti Zulkepli", phone: "019-2345678", email: "nurhanis@gmail.com", source: "LinkedIn", stage: "Interview 2", applied: "2026-03-08", interviewer: "Nur Aisyah", notes: "Good candidate, pending final interview" },
  { id: "C003", ic: "860710-11-4411", jr_id: "JR-001", name: "Rozita binti Mahmud", phone: "011-8765432", email: "rozita.m@gmail.com", source: "Referral", stage: "Rejected", applied: "2026-03-06", interviewer: "Nur Aisyah", notes: "Salary expectation too high" },
  { id: "C004", ic: "950220-06-3321", jr_id: "JR-001", name: "Norfazilah binti Saad", phone: "017-3344556", email: "fazilah.saad@gmail.com", source: "Walk-in", stage: "Screening", applied: "2026-04-10", interviewer: null, notes: "" },
  { id: "C005", ic: "940815-14-5543", jr_id: "JR-002", name: "Ahmad Syafiq bin Nordin", phone: "013-6677889", email: "syafiq.nordin@gmail.com", source: "LinkedIn", stage: "Offer", applied: "2026-03-12", interviewer: "Nur Aisyah", notes: "Verbal offer made RM 4,800 — awaiting acceptance" },
  { id: "C006", ic: "920401-10-7712", jr_id: "JR-002", name: "Tan Jun Hong", phone: "016-5544332", email: "junhong.t@gmail.com", source: "JobStreet", stage: "Rejected", applied: "2026-03-14", interviewer: "Nur Aisyah", notes: "Insufficient experience" },
  { id: "C007", ic: "970615-14-4432", jr_id: "JR-002", name: "Mohamad Irfan bin Rashid", phone: "018-9988776", email: "irfan.rashid@gmail.com", source: "Referral", stage: "Interview 1", applied: "2026-04-08", interviewer: "Wong Mei Fong", notes: "Scheduled 22 April" },
  { id: "C008", ic: "880930-07-3311", jr_id: "JR-003", name: "Haslinda binti Zahari", phone: "012-7788990", email: "haslinda.z@gmail.com", source: "JobStreet", stage: "Hired", applied: "2026-03-18", interviewer: "Azman", notes: "Started 1 April" },
  { id: "C009", ic: "001210-14-2231", jr_id: "JR-003", name: "Nurul Izzah binti Othman", phone: "011-3322110", email: "izzah.o@gmail.com", source: "Walk-in", stage: "Interview 1", applied: "2026-04-12", interviewer: "Azman", notes: "Scheduled 25 April" },
  { id: "C010", ic: "961025-07-5512", jr_id: "JR-003", name: "Farhana binti Jalil", phone: "019-6655443", email: "farhana.j@gmail.com", source: "LinkedIn", stage: "Screening", applied: "2026-04-14", interviewer: null, notes: "" },
  { id: "C011", ic: "930520-10-4421", jr_id: "JR-004", name: "Lee Hui Min", phone: "013-2211334", email: "huimin.l@gmail.com", source: "LinkedIn", stage: "Interview 2", applied: "2026-03-22", interviewer: "Tan Wei Liang", notes: "Strong Excel + accounting background" },
  { id: "C012", ic: "941108-08-6601", jr_id: "JR-004", name: "Sharmila d/o Rajan", phone: "017-8877665", email: "sharmila.r@gmail.com", source: "JobStreet", stage: "Screening", applied: "2026-04-05", interviewer: null, notes: "" },
  { id: "C013", ic: "900415-10-5531", jr_id: "JR-005", name: "Hafizuddin bin Hamid", phone: "016-4433221", email: "hafiz.h@gmail.com", source: "JobStreet", stage: "Applied", applied: "2026-04-03", interviewer: null, notes: "" },
  { id: "C014", ic: "920715-06-4412", jr_id: "JR-005", name: "Zuraidah binti Ismail", phone: "012-9988765", email: "zuraidah.i@gmail.com", source: "LinkedIn", stage: "Screening", applied: "2026-04-07", interviewer: null, notes: "" },
  { id: "C015", ic: "930820-12-3321", jr_id: "JR-005", name: "Kelvin Ong Wei Jie", phone: "011-7766554", email: "kelvin.ong@gmail.com", source: "Referral", stage: "Interview 1", applied: "2026-04-09", interviewer: "Nur Aisyah", notes: "Scheduled 24 April" },
  { id: "C016", ic: "940202-08-5562", jr_id: "JR-006", name: "Kavitha d/o Balakrishnan", phone: "014-5544332", email: "kavitha.b@gmail.com", source: "Referral", stage: "Hired", applied: "2026-02-05", interviewer: "Azman", notes: "Started Feb 2026" },
  { id: "C017", ic: "000310-14-3312", jr_id: "JR-006", name: "Nurul Syahirah binti Murad", phone: "018-2233445", email: "syahirah.m@gmail.com", source: "JobStreet", stage: "Hired", applied: "2026-02-08", interviewer: "Azman", notes: "Started Feb 2026" },
  { id: "C018", ic: "880605-07-5521", jr_id: "JR-008", name: "Noraini binti Daud", phone: "013-5566778", email: "noraini.d@gmail.com", source: "JobStreet", stage: "Applied", applied: "2026-04-06", interviewer: null, notes: "" },
  { id: "C019", ic: "990215-14-7741", jr_id: "JR-008", name: "Putri Aisyah binti Ariffin", phone: "019-8877665", email: "putri.a@gmail.com", source: "LinkedIn", stage: "Screening", applied: "2026-04-08", interviewer: null, notes: "" },
  { id: "C020", ic: "950410-10-2231", jr_id: "JR-008", name: "Ng Siew Ling", phone: "016-3344556", email: "ng.siewling@gmail.com", source: "LinkedIn", stage: "Interview 1", applied: "2026-04-10", interviewer: "Dr. Nurul Hazwani", notes: "Scheduled 23 April" },
  { id: "C021", ic: "870715-06-4411", jr_id: "JR-008", name: "Roslinda binti Wahid", phone: "012-6677889", email: "roslinda.w@gmail.com", source: "Walk-in", stage: "Applied", applied: "2026-04-15", interviewer: null, notes: "" },

  // --- FLAGGED CROSS-ENTITY CANDIDATES ---
  // Scenario 1: Fadzlan — falsified credentials at CVSKL, now reapplied to PICASO
  { id: "C022", ic: "880420-10-6612", jr_id: "JR-002", name: "Fadzlan bin Mamat", phone: "016-7788990", email: "fadzlan.m@gmail.com", source: "JobStreet", stage: "Rejected", applied: "2025-11-10", interviewer: "Wong Mei Fong", notes: "Submitted falsified degree certificate (Computer Science). Fraud confirmed during background check. Added to Do-Not-Rehire list. — CVSKL, Nov 2025" },
  { id: "C023", ic: "880420-10-6612", jr_id: "JR-003", name: "Fadzlan Mamat", phone: "016-7788990", email: "fadzlan.m88@gmail.com", source: "Walk-in", stage: "Screening", applied: "2026-04-20", interviewer: null, notes: "" },

  // Scenario 2: Khairul — aggressive misconduct at CVSKL, reapplied to PICASO
  { id: "C024", ic: "950310-05-4432", jr_id: "JR-005", name: "Khairul Aziz bin Hamdan", phone: "013-4455667", email: "khairul.aziz@gmail.com", source: "LinkedIn", stage: "Rejected", applied: "2024-08-01", interviewer: "Nur Aisyah", notes: "Aggressive and threatening behaviour toward supervisor during interview. Formal HR complaint filed. Blacklisted — Do Not Rehire. — CVSKL, Aug 2024" },
  { id: "C025", ic: "950310-05-4432", jr_id: "JR-008", name: "Mohamad Khairul Aziz", phone: "013-4455667", email: "khairul.aziz88@gmail.com", source: "LinkedIn", stage: "Applied", applied: "2026-04-22", interviewer: null, notes: "" },

  // Scenario 3: Concurrent duplicate — same person actively applying to both entities at the same time
  { id: "C026", ic: "980115-14-2234", jr_id: "JR-004", name: "Izzatul Izzati binti Idris", phone: "011-5566778", email: "izzatul.idris@gmail.com", source: "LinkedIn", stage: "Applied", applied: "2026-04-23", interviewer: null, notes: "" },
  { id: "C027", ic: "980115-14-2234", jr_id: "JR-003", name: "Izzatul Idris", phone: "011-5566778", email: "izzatul.idris@gmail.com", source: "LinkedIn", stage: "Screening", applied: "2026-04-21", interviewer: null, notes: "" },
];

// Watchlist: candidates flagged for bad record — system cross-checks IC against all new applicants
const WATCHLIST = [
  {
    ic: "880420-10-6612",
    name: "Fadzlan bin Mamat",
    flagged_by_entity: "CVSKL",
    flagged_date: "2025-11-20",
    position_applied: "IT Executive",
    severity: "high",
    reason: "Submitted falsified academic certificate (Degree in Computer Science, UiTM). Document verified fake by background check vendor. Fraud confirmed. Terminated from selection process.",
    action: "Do Not Rehire — Any Position, Any Entity",
    flagged_by: "Nur Aisyah binti Mohd Razif (HR Manager, CVSKL)"
  },
  {
    ic: "950310-05-4432",
    name: "Khairul Aziz bin Hamdan",
    flagged_by_entity: "CVSKL",
    flagged_date: "2024-08-15",
    position_applied: "Radiographer",
    severity: "high",
    reason: "Displayed aggressive and threatening behaviour toward the interviewing panel. Raised voice, made verbal threats when informed of next steps. Formal HR complaint lodged. Security escorted off premises.",
    action: "Do Not Rehire — Any Position, Any Entity",
    flagged_by: "Nur Aisyah binti Mohd Razif (HR Manager, CVSKL)"
  }
];

const HIRING_STAGES = ["Applied", "Screening", "Interview 1", "Interview 2", "Offer", "Hired", "Rejected"];
