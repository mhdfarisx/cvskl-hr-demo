// --- ROUTING ---
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  const nav = document.querySelector(`[data-page="${id}"]`);
  if (nav) nav.classList.add('active');
}

// --- UTILS ---
function serviceYears(dateStr) {
  const start = new Date(dateStr);
  const now = new Date('2026-04-19');
  const diff = (now - start) / (1000 * 60 * 60 * 24 * 365.25);
  return diff.toFixed(1);
}

function initials(name) {
  return name.split(' ').filter(w => !['bin','binti','a/l','d/o','anak','dr.'].includes(w.toLowerCase())).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function statusBadge(s) {
  const map = { Active: 'badge-active', Resigned: 'badge-resigned', Terminated: 'badge-terminated', Probation: 'badge-probation' };
  return `<span class="badge ${map[s] || ''}">${s}</span>`;
}

function entityBadge(e) {
  return `<span class="badge ${e === 'CVSKL' ? 'badge-cvskl' : 'badge-picaso'}">${e}</span>`;
}

function movementBadge(t) {
  const map = { Hired: '#d1fae5|#065f46', Resigned: '#fee2e2|#991b1b', Terminated: '#f3f4f6|#374151', Promoted: '#dbeafe|#1e40af', Transferred: '#fef3c7|#92400e' };
  const [bg, color] = (map[t] || '#f3f4f6|#374151').split('|');
  return `<span class="badge-movement" style="background:${bg};color:${color}">${t}</span>`;
}

// --- DASHBOARD ---
const CHARTS = {};

function getFiltered() {
  const entity = document.getElementById('dash-entity')?.value || 'all';
  const contract = document.getElementById('dash-contract')?.value || 'all';
  const dept = document.getElementById('dash-dept')?.value || 'all';
  const gender = document.getElementById('dash-gender')?.value || 'all';
  return STAFF.filter(s =>
    (entity === 'all' || s.entity === entity) &&
    (contract === 'all' || s.contract === contract) &&
    (dept === 'all' || s.department === dept) &&
    (gender === 'all' || s.gender === gender)
  );
}

function count(arr, key) {
  return arr.reduce((acc, s) => { acc[s[key]] = (acc[s[key]] || 0) + 1; return acc; }, {});
}

function makeChart(id, type, labels, data, colors, opts = {}) {
  if (CHARTS[id]) CHARTS[id].destroy();
  const ctx = document.getElementById(id)?.getContext('2d');
  if (!ctx) return;
  CHARTS[id] = new Chart(ctx, {
    type,
    data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: type === 'bar' ? colors : '#fff', borderWidth: type === 'bar' ? 0 : 2, borderRadius: type === 'bar' ? 6 : 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: type === 'bar' ? 'none' : 'bottom', labels: { font: { size: 11 }, padding: 12, boxWidth: 12 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} staff` } }
      },
      scales: type === 'bar' ? {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, stepSize: 1 }, beginAtZero: true }
      } : {},
      ...opts
    }
  });
}

function refreshDashboard() {
  const data = getFiltered();
  const active = data.filter(s => s.status === 'Active').length;
  const probation = data.filter(s => s.status === 'Probation').length;
  const resigned = data.filter(s => s.status === 'Resigned').length;
  const terminated = data.filter(s => s.status === 'Terminated').length;
  const attrition = data.length > 0 ? (((resigned + terminated) / data.length) * 100).toFixed(1) : '0.0';
  const activeTenure = data.filter(s => s.status === 'Active' || s.status === 'Probation');
  const avgTenure = activeTenure.length > 0
    ? (activeTenure.reduce((sum, s) => sum + parseFloat(serviceYears(s.joined)), 0) / activeTenure.length).toFixed(1)
    : '0.0';

  document.getElementById('stat-total').textContent = data.length;
  document.getElementById('stat-active-sub').textContent = `${active + probation} active`;
  document.getElementById('stat-resigned').textContent = resigned;
  document.getElementById('stat-terminated-sub').textContent = `${terminated} terminated`;
  document.getElementById('stat-attrition').textContent = attrition + '%';
  document.getElementById('stat-tenure').textContent = avgTenure + ' yrs';

  // Pie — contract type
  const contractData = count(data, 'contract');
  makeChart('chart-contract', 'doughnut',
    Object.keys(contractData), Object.values(contractData),
    ['#097099', '#0aa3d6', '#10b981']
  );

  // Pie — gender
  const genderData = count(data, 'gender');
  makeChart('chart-gender', 'doughnut',
    Object.keys(genderData), Object.values(genderData),
    ['#097099', '#f472b6']
  );

  // Pie — status
  const statusData = count(data, 'status');
  const statusColors = { Active: '#10b981', Probation: '#f59e0b', Resigned: '#ef4444', Terminated: '#6b7280' };
  makeChart('chart-status', 'doughnut',
    Object.keys(statusData), Object.values(statusData),
    Object.keys(statusData).map(k => statusColors[k] || '#ccc')
  );

  // Bar — department
  const deptData = count(data, 'department');
  const sortedDepts = Object.entries(deptData).sort((a, b) => b[1] - a[1]);
  const deptColors = ['#097099','#0aa3d6','#10b981','#7c3aed','#f59e0b','#ef4444','#f472b6','#64748b','#06b6d4','#84cc16','#fb923c','#a78bfa'];
  makeChart('chart-dept', 'bar',
    sortedDepts.map(([k]) => k), sortedDepts.map(([, v]) => v),
    sortedDepts.map((_, i) => deptColors[i % deptColors.length])
  );

  // Recent movements
  document.getElementById('recent-movements').innerHTML = MOVEMENTS.slice(0, 6).map(m => `
    <tr>
      <td style="font-size:11px;color:var(--muted)">${m.date}</td>
      <td><div style="font-size:12px;font-weight:500">${m.name.split(' ').slice(0,2).join(' ')}</div><div style="font-size:11px;color:var(--muted)">${m.entity}</div></td>
      <td>${movementBadge(m.type)}</td>
    </tr>
  `).join('');
}

function resetDashboardFilters() {
  ['dash-entity','dash-contract','dash-dept','dash-gender'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = 'all';
  });
  refreshDashboard();
}

function renderDashboard() {
  // Populate dept slicer
  const depts = [...new Set(STAFF.map(s => s.department))].sort();
  const deptSel = document.getElementById('dash-dept');
  depts.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    deptSel.appendChild(opt);
  });
  refreshDashboard();
}

// --- STAFF LIST ---
let staffFilter = { entity: 'all', status: 'all', search: '' };

function renderStaffList() {
  let data = STAFF.filter(s => {
    if (staffFilter.entity !== 'all' && s.entity !== staffFilter.entity) return false;
    if (staffFilter.status !== 'all' && s.status !== staffFilter.status) return false;
    if (staffFilter.search && !s.name.toLowerCase().includes(staffFilter.search.toLowerCase()) &&
        !s.department.toLowerCase().includes(staffFilter.search.toLowerCase()) &&
        !s.position.toLowerCase().includes(staffFilter.search.toLowerCase())) return false;
    return true;
  });

  const tbody = document.getElementById('staff-tbody');
  tbody.innerHTML = data.map(s => `
    <tr style="cursor:pointer" onclick="openProfile('${s.id}')">
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="avatar" style="width:32px;height:32px;font-size:11px;flex-shrink:0">${initials(s.name)}</div>
          <div>
            <div class="staff-name">${s.name}</div>
            <div class="staff-id">${s.id}</div>
          </div>
        </div>
      </td>
      <td>${entityBadge(s.entity)}</td>
      <td>${s.department}</td>
      <td style="font-size:12px">${s.position}</td>
      <td>${statusBadge(s.status)}</td>
      <td style="font-size:12px">${serviceYears(s.joined)} yrs</td>
      <td style="font-size:12px;color:var(--muted)">${s.contract}</td>
    </tr>
  `).join('');

  document.getElementById('staff-count-label').textContent = `${data.length} records`;
}

function openProfile(id) {
  const s = STAFF.find(x => x.id === id);
  if (!s) return;

  const yrs = serviceYears(s.joined);
  const maxYrs = 20;
  const pct = Math.min((yrs / maxYrs) * 100, 100);
  const leave = LEAVE[s.id] || null;
  const perf = PERFORMANCE[s.id] || null;
  const salHist = SALARY_HISTORY[s.id] || null;

  const tierColor = perf ? (perf.tier === 'Tier 1' ? '#065f46|#d1fae5' : '#1e40af|#dbeafe') : '';
  const [tc, tb] = tierColor ? tierColor.split('|') : ['#374151','#f3f4f6'];

  document.getElementById('profile-content').innerHTML = `
    <a class="back-btn" onclick="showPage('staff-list')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to Staff List
    </a>
    <div class="profile-header">
      <div class="profile-avatar">${initials(s.name)}</div>
      <div>
        <div class="profile-name">${s.name}</div>
        <div class="profile-pos">${s.position} — ${s.department}</div>
        <div class="profile-meta">${s.id} &nbsp;•&nbsp; ${s.entity} &nbsp;•&nbsp; ${s.status} &nbsp;•&nbsp; ${yrs} yrs service</div>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex;gap:4px;margin-bottom:20px;border-bottom:2px solid var(--border);">
      ${['overview','leave','salary','performance'].map((t,i) => `
        <div onclick="switchTab('${t}')" id="tab-${t}" style="padding:10px 18px;font-size:13px;font-weight:600;cursor:pointer;border-bottom:2px solid ${i===0?'var(--primary)':'transparent'};margin-bottom:-2px;color:${i===0?'var(--primary)':'var(--muted)'};transition:all 0.15s">
          ${{overview:'Overview',leave:'Leave',salary:'Salary & Increments',performance:'Performance'}[t]}
        </div>
      `).join('')}
    </div>

    <!-- OVERVIEW TAB -->
    <div id="tabcontent-overview">
      <div class="info-grid">
        <div class="info-card">
          <div class="info-card-title">Personal Info</div>
          <div class="info-row"><span class="info-key">IC Number</span><span class="info-val">${s.ic}</span></div>
          <div class="info-row"><span class="info-key">Entity</span><span class="info-val">${entityBadge(s.entity)}</span></div>
          <div class="info-row"><span class="info-key">Department</span><span class="info-val">${s.department}</span></div>
          <div class="info-row"><span class="info-key">Position</span><span class="info-val">${s.position}</span></div>
        </div>
        <div class="info-card">
          <div class="info-card-title">Employment Details</div>
          <div class="info-row"><span class="info-key">Status</span><span class="info-val">${statusBadge(s.status)}</span></div>
          <div class="info-row"><span class="info-key">Contract</span><span class="info-val">${s.contract}</span></div>
          <div class="info-row"><span class="info-key">Date Joined</span><span class="info-val">${s.joined}</span></div>
          <div class="info-row"><span class="info-key">Monthly Salary</span><span class="info-val" style="font-weight:700;color:var(--primary)">RM ${s.salary.toLocaleString()}</span></div>
          ${s.probation_end ? `<div class="info-row"><span class="info-key">Probation Ends</span><span class="info-val">${s.probation_end}</span></div>` : ''}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">Length of Service</div></div>
        <div class="panel-body">
          <div style="font-size:28px;font-weight:700;color:var(--primary)">${yrs} years</div>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">Since ${s.joined}</div>
          <div class="service-bar" style="margin-top:12px"><div class="service-fill" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="panel" style="margin-top:16px">
        <div class="panel-header"><div class="panel-title">Movement History</div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Type</th><th>From</th><th>To</th><th>Note</th></tr></thead>
            <tbody>
              ${MOVEMENTS.filter(m => m.staff_id === s.id).map(m => `
                <tr>
                  <td>${m.date}</td>
                  <td>${movementBadge(m.type)}</td>
                  <td style="font-size:12px;color:var(--muted)">${m.from}</td>
                  <td style="font-size:12px">${m.to}</td>
                  <td style="font-size:12px;color:var(--muted)">${m.note}</td>
                </tr>
              `).join('') || '<tr><td colspan="5" style="color:var(--muted);font-size:12px;padding:16px">No movement records</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- LEAVE TAB -->
    <div id="tabcontent-leave" style="display:none">
      ${leave ? `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px">
          ${[
            { label:'Annual Leave', entitled: leave.al_entitled, taken: leave.al_taken, balance: leave.al_balance, color:'var(--primary)' },
            { label:'Medical Leave', entitled: 14, taken: leave.mc_taken, balance: leave.mc_balance, color:'var(--success)' },
            { label:'Hospitalisation', entitled: 60, taken: leave.hl_taken, balance: 60 - leave.hl_taken, color:'var(--warning)' },
          ].map(l => `
            <div class="info-card">
              <div class="info-card-title">${l.label}</div>
              <div style="font-size:32px;font-weight:700;color:${l.color};margin:8px 0">${l.balance}</div>
              <div style="font-size:12px;color:var(--muted)">days remaining</div>
              <div class="service-bar" style="margin:10px 0"><div class="service-fill" style="width:${Math.round((l.balance/l.entitled)*100)}%;background:${l.color}"></div></div>
              <div style="font-size:11px;color:var(--muted)">${l.taken} taken / ${l.entitled} entitled</div>
            </div>
          `).join('')}
        </div>
        <div class="panel">
          <div class="panel-header"><div class="panel-title">Leave Summary 2026</div></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Leave Type</th><th>Entitled</th><th>Taken</th><th>Balance</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Annual Leave (AL)</td><td>${leave.al_entitled}</td><td>${leave.al_taken}</td><td><strong>${leave.al_balance}</strong></td><td>${leave.al_balance <= 3 ? '<span class="badge badge-resigned">Low</span>' : '<span class="badge badge-active">OK</span>'}</td></tr>
                <tr><td>Medical Leave (MC)</td><td>14</td><td>${leave.mc_taken}</td><td><strong>${leave.mc_balance}</strong></td><td>${leave.mc_balance <= 3 ? '<span class="badge badge-resigned">Low</span>' : '<span class="badge badge-active">OK</span>'}</td></tr>
                <tr><td>Hospitalisation Leave (HL)</td><td>60</td><td>${leave.hl_taken}</td><td><strong>${60 - leave.hl_taken}</strong></td><td><span class="badge badge-active">OK</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : '<div style="color:var(--muted);padding:20px;font-size:13px">No leave data available for this staff.</div>'}
    </div>

    <!-- SALARY TAB -->
    <div id="tabcontent-salary" style="display:none">
      <div class="info-card" style="margin-bottom:16px">
        <div class="info-card-title">Current Salary</div>
        <div style="font-size:36px;font-weight:700;color:var(--primary);margin:8px 0">RM ${s.salary.toLocaleString()}</div>
        <div style="font-size:12px;color:var(--muted)">per month &nbsp;•&nbsp; RM ${(s.salary * 12).toLocaleString()} per year</div>
      </div>
      ${salHist ? `
        <div class="panel">
          <div class="panel-header"><div class="panel-title">Salary History &amp; Increments</div></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Year</th><th>Salary</th><th>Increment</th><th>Note</th></tr></thead>
              <tbody>
                ${salHist.map(h => `
                  <tr>
                    <td>${h.year}</td>
                    <td><strong>RM ${h.salary.toLocaleString()}</strong></td>
                    <td>${h.increment ? `<span style="color:var(--success);font-weight:600">+RM ${h.increment.toLocaleString()}</span>` : '<span style="color:var(--muted)">—</span>'}</td>
                    <td style="font-size:12px;color:var(--muted)">${h.note}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : '<div style="color:var(--muted);padding:20px;font-size:13px">No salary history on record.</div>'}
    </div>

    <!-- PERFORMANCE TAB -->
    <div id="tabcontent-performance" style="display:none">
      ${perf ? `
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px">
          <div class="info-card">
            <div class="info-card-title">Performance Tier</div>
            <div style="margin-top:10px"><span class="badge" style="color:${tc};background:${tb};font-size:14px;padding:6px 16px">${perf.tier}</span></div>
            <div style="font-size:12px;color:var(--muted);margin-top:8px">${perf.rating}</div>
          </div>
          <div class="info-card">
            <div class="info-card-title">Score</div>
            <div style="font-size:36px;font-weight:700;color:var(--primary);margin:8px 0">${perf.score}<span style="font-size:16px;color:var(--muted)">/100</span></div>
            <div class="service-bar"><div class="service-fill" style="width:${perf.score}%"></div></div>
          </div>
          <div class="info-card">
            <div class="info-card-title">Bonus (${perf.year})</div>
            <div style="font-size:28px;font-weight:700;color:var(--success);margin:8px 0">RM ${perf.bonus.toLocaleString()}</div>
            <div style="font-size:12px;color:var(--muted)">Performance bonus</div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header"><div class="panel-title">KPI Achievements — ${perf.year}</div></div>
          <div class="panel-body">
            ${perf.kpi.map(k => `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" style="width:16px;height:16px;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>
                ${k}
              </div>
            `).join('')}
          </div>
        </div>
      ` : '<div style="color:var(--muted);padding:20px;font-size:13px">No performance review on record for this staff.</div>'}
    </div>
  `;

  showPage('staff-profile');
}

function switchTab(tab) {
  ['overview','leave','salary','performance'].forEach(t => {
    document.getElementById(`tabcontent-${t}`).style.display = t === tab ? 'block' : 'none';
    const el = document.getElementById(`tab-${t}`);
    el.style.borderBottomColor = t === tab ? 'var(--primary)' : 'transparent';
    el.style.color = t === tab ? 'var(--primary)' : 'var(--muted)';
  });
}

// --- MOVEMENT LOG ---
function renderMovements() {
  const tbody = document.getElementById('movement-tbody');
  tbody.innerHTML = MOVEMENTS.map(m => `
    <tr>
      <td style="font-size:12px">${m.date}</td>
      <td>
        <div class="staff-name">${m.name}</div>
        <div class="staff-id">${m.staff_id}</div>
      </td>
      <td>${entityBadge(m.entity)}</td>
      <td>${movementBadge(m.type)}</td>
      <td style="font-size:12px;color:var(--muted)">${m.from}</td>
      <td style="font-size:12px">${m.to}</td>
      <td style="font-size:12px;color:var(--muted)">${m.note}</td>
    </tr>
  `).join('');
}

// --- AI CHAT ---
const suggestions = [
  "Any flagged candidates?",
  "Who is in the watchlist?",
  "How does duplicate detection work?",
  "How many open positions do we have?",
  "Who got hired?",
  "Which positions are urgent?",
  "Who is interviewing soon?",
  "Who is in the offer stage?",
  "Which hiring is behind schedule?",
  "Where are most candidates coming from?",
  "Which source gives the best hires?",
  "Show me IT Executive hiring status",
  "Show me Radiographer hiring status",
  "How many candidates are in screening?",
  "Who is in Interview 2?",
  "Any referral candidates?",
  "How many staff do we have?",
  "Who resigned this month?",
  "Who has the highest salary?",
  "Who is on probation?",
];

function normalise(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

const STOPWORDS = new Set(['this','that','with','from','have','does','what','when','where','which','there','their','them','they','been','more','also','were','some','than','then','into','will','your','most','only','each','such','both','many','much','very','just','over','same','take','come','come','make','made','well','back','even','time','year','month','week','show','give','tell','know']);

function findAnswer(q) {
  const nq = normalise(q);
  let bestAnswer = null, bestScore = 0;
  for (const qa of AI_QA) {
    const keywords = normalise(qa.q).split(' ').filter(w => w.length > 3 && !STOPWORDS.has(w));
    if (keywords.length === 0) continue;
    const matches = keywords.filter(k => nq.includes(k));
    const score = matches.length / keywords.length;
    if (score >= 0.4 && score > bestScore) {
      bestAnswer = qa.a;
      bestScore = score;
    }
  }
  return bestAnswer || "I don't have specific data on that. Try clicking one of the suggestion chips below, or ask about staff, hiring pipeline, candidates, or performance.";
}

function appendMsg(text, type) {
  const msgs = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = `msg msg-${type}`;
  div.innerHTML = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendMessage(q) {
  const input = document.getElementById('ai-input');
  const question = q || input.value.trim();
  if (!question) return;
  input.value = '';

  appendMsg(question, 'user');

  const typing = document.createElement('div');
  typing.className = 'msg msg-typing';
  typing.textContent = 'Thinking...';
  document.getElementById('ai-messages').appendChild(typing);

  setTimeout(() => {
    typing.remove();
    appendMsg(findAnswer(question), 'bot');
  }, 900);
}

function toggleChat() {
  const panel = document.getElementById('ai-chat-panel');
  panel.classList.toggle('hidden');
}

function initChat() {
  const chips = document.getElementById('ai-suggestions');
  suggestions.forEach(s => {
    const chip = document.createElement('div');
    chip.className = 'suggestion-chip';
    chip.textContent = s;
    chip.onclick = () => sendMessage(s);
    chips.appendChild(chip);
  });

  document.getElementById('ai-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
  });

  appendMsg('Hi! I\'m the CVSKL HR Assistant. Ask me anything about your staff or hiring pipeline across CVSKL and PICASO.', 'bot');
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderStaffList();
  renderMovements();
  initChat();
  initHiringFilters();
  showPage('dashboard');

  // Nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      showPage(page);
      if (page === 'hiring-requisitions') renderRequisitions();
      if (page === 'hiring-pipeline') renderPipeline();
      if (page === 'hiring-candidates') renderCandidates();
    });
  });

  // Staff filters
  document.getElementById('filter-entity').addEventListener('change', e => {
    staffFilter.entity = e.target.value;
    renderStaffList();
  });

  document.getElementById('filter-status').addEventListener('change', e => {
    staffFilter.status = e.target.value;
    renderStaffList();
  });

  document.getElementById('staff-search').addEventListener('input', e => {
    staffFilter.search = e.target.value;
    renderStaffList();
  });
});

// --- CROSS-ENTITY DETECTION ---
function getWatchlistEntry(ic) {
  if (!ic || !WATCHLIST) return null;
  return WATCHLIST.find(w => w.ic === ic) || null;
}

function isCrossEntityFlag(candidate) {
  return !!getWatchlistEntry(candidate.ic);
}

function getCrossEntityFlaggedCandidates() {
  return CANDIDATES.filter(c => c.stage !== 'Rejected' && isCrossEntityFlag(c));
}

// Detect candidates actively applying at both entities simultaneously (no bad record, just concurrent duplicate)
function getConcurrentDuplicateEntry(candidate) {
  if (!candidate.ic) return null;
  const jr = JOB_REQUISITIONS.find(j => j.id === candidate.jr_id);
  if (!jr) return null;
  const twin = CANDIDATES.find(c =>
    c.ic === candidate.ic &&
    c.id !== candidate.id &&
    !['Hired', 'Rejected'].includes(c.stage) &&
    !getWatchlistEntry(c.ic)
  );
  if (!twin) return null;
  const twinJr = JOB_REQUISITIONS.find(j => j.id === twin.jr_id);
  if (!twinJr || twinJr.entity === jr.entity) return null;
  return { twin, twinJr };
}

// --- HIRING TRACKER ---

function hiringStageBadge(s) {
  const map = { 'Applied':'#f3f4f6|#374151', 'Screening':'#dbeafe|#1e40af', 'Interview 1':'#fef3c7|#92400e', 'Interview 2':'#fde68a|#78350f', 'Offer':'#ede9fe|#5b21b6', 'Hired':'#d1fae5|#065f46', 'Rejected':'#fee2e2|#991b1b' };
  const [bg, color] = (map[s] || '#f3f4f6|#374151').split('|');
  return `<span class="badge" style="background:${bg};color:${color}">${s}</span>`;
}

function hiringUrgencyBadge(u) {
  const map = { High:'#fee2e2|#991b1b', Medium:'#fef3c7|#92400e', Low:'#d1fae5|#065f46' };
  const [bg, color] = (map[u] || '#f3f4f6|#374151').split('|');
  return `<span class="badge" style="background:${bg};color:${color}">${u}</span>`;
}

function hiringStatusBadge(s) {
  const map = { Active:'#d1fae5|#065f46', Closed:'#f3f4f6|#374151', 'On Hold':'#fef3c7|#92400e' };
  const [bg, color] = (map[s] || '#f3f4f6|#374151').split('|');
  return `<span class="badge" style="background:${bg};color:${color}">${s}</span>`;
}

function renderRequisitions() {
  const entity = document.getElementById('jr-entity')?.value || 'all';
  const status = document.getElementById('jr-status')?.value || 'all';
  const urgency = document.getElementById('jr-urgency')?.value || 'all';
  const filtered = JOB_REQUISITIONS.filter(j =>
    (entity === 'all' || j.entity === entity) &&
    (status === 'all' || j.status === status) &&
    (urgency === 'all' || j.urgency === urgency)
  );
  const tbody = document.getElementById('jr-tbody');
  tbody.innerHTML = filtered.map(j => {
    const cands = CANDIDATES.filter(c => c.jr_id === j.id);
    const hired = cands.filter(c => c.stage === 'Hired').length;
    const inProg = cands.filter(c => !['Hired','Rejected'].includes(c.stage)).length;
    return `<tr>
      <td><strong style="color:var(--primary)">${j.id}</strong></td>
      <td><strong>${j.title}</strong><div class="staff-id">${j.department}</div></td>
      <td>${entityBadge(j.entity)}</td>
      <td>${j.headcount} pax</td>
      <td style="font-size:12px">RM ${j.salary_min.toLocaleString()} – ${j.salary_max.toLocaleString()}</td>
      <td>${hiringUrgencyBadge(j.urgency)}</td>
      <td>${hiringStatusBadge(j.status)}</td>
      <td><span style="color:var(--success);font-weight:700">${hired}</span> hired &nbsp;·&nbsp; <span style="color:var(--primary);font-weight:700">${inProg}</span> active</td>
      <td><a class="panel-action" onclick="openJRDetail('${j.id}')">View</a></td>
    </tr>`;
  }).join('');
}

function openJRDetail(jrId) {
  const jr = JOB_REQUISITIONS.find(j => j.id === jrId);
  if (!jr) return;
  const cands = CANDIDATES.filter(c => c.jr_id === jrId);
  document.getElementById('modal-jr-title').textContent = jr.title;
  document.getElementById('modal-jr-sub').textContent = `${jr.id} · ${jr.department} · ${jr.entity}`;
  document.getElementById('modal-jr-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;font-size:13px">
      <div><span style="color:var(--muted)">Status</span><div style="margin-top:4px">${hiringStatusBadge(jr.status)}</div></div>
      <div><span style="color:var(--muted)">Urgency</span><div style="margin-top:4px">${hiringUrgencyBadge(jr.urgency)}</div></div>
      <div><span style="color:var(--muted)">Headcount</span><div style="font-weight:600;margin-top:4px">${jr.headcount} pax</div></div>
      <div><span style="color:var(--muted)">Salary</span><div style="font-weight:600;margin-top:4px">RM ${jr.salary_min.toLocaleString()} – ${jr.salary_max.toLocaleString()}</div></div>
      <div><span style="color:var(--muted)">Created</span><div style="margin-top:4px">${jr.created}</div></div>
      <div><span style="color:var(--muted)">Created By</span><div style="margin-top:4px">${jr.created_by}</div></div>
    </div>
    <div style="font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Candidates (${cands.length})</div>
    ${cands.length === 0 ? '<p style="font-size:13px;color:var(--muted)">No candidates yet.</p>' : `
    <table>
      <thead><tr><th>Name</th><th>Source</th><th>Stage</th></tr></thead>
      <tbody>${cands.map(c => `<tr><td>${c.name}</td><td style="font-size:12px;color:var(--muted)">${c.source}</td><td>${hiringStageBadge(c.stage)}</td></tr>`).join('')}</tbody>
    </table>`}
  `;
  document.getElementById('jr-modal').classList.add('open');
}

function renderPipeline() {
  const jrFilter = document.getElementById('pipe-jr')?.value || 'all';
  const entityFilter = document.getElementById('pipe-entity')?.value || 'all';
  const deptFilter = document.getElementById('pipe-dept')?.value || 'all';
  const showDone = document.getElementById('pipe-show-done')?.checked || false;

  // toggle hired/rejected columns
  document.querySelectorAll('.kanban-col-done').forEach(col => {
    col.style.display = showDone ? '' : 'none';
  });

  // filter candidates
  let matchingJrIds = JOB_REQUISITIONS
    .filter(j =>
      (entityFilter === 'all' || j.entity === entityFilter) &&
      (deptFilter === 'all' || j.department === deptFilter) &&
      (jrFilter === 'all' || j.id === jrFilter)
    ).map(j => j.id);

  let cands = CANDIDATES.filter(c => matchingJrIds.includes(c.jr_id));

  // render each column
  HIRING_STAGES.forEach(stage => {
    const colId = 'col-' + stage.replace(/ /g, '');
    const col = document.getElementById(colId);
    if (!col) return;
    const stageCands = cands.filter(c => c.stage === stage);
    col.querySelector('.kanban-count').textContent = stageCands.length;
    const body = col.querySelector('.kanban-body');
    body.innerHTML = stageCands.map(c => {
      const jr = JOB_REQUISITIONS.find(j => j.id === c.jr_id);
      const badRecord = isCrossEntityFlag(c);
      const dupEntry = !badRecord ? getConcurrentDuplicateEntry(c) : null;
      const cardClass = badRecord ? ' kanban-card-flagged' : dupEntry ? ' kanban-card-duplicate' : '';
      return `<div class="kanban-card${cardClass}" onclick="openCandDetail('${c.id}')">
        ${badRecord ? `<div style="display:flex;align-items:center;gap:5px;background:#fee2e2;color:#991b1b;font-size:10px;font-weight:700;padding:3px 7px;border-radius:4px;margin-bottom:5px">⚠ BAD RECORD</div>` : ''}
        ${dupEntry ? `<div style="display:flex;align-items:center;gap:5px;background:#fef3c7;color:#92400e;font-size:10px;font-weight:700;padding:3px 7px;border-radius:4px;margin-bottom:5px">⚡ ALSO AT ${dupEntry.twinJr.entity}</div>` : ''}
        <div style="font-weight:600;font-size:12px;color:${badRecord ? '#991b1b' : dupEntry ? '#78350f' : 'var(--text)'};margin-bottom:3px">${c.name.split(' ').slice(0,2).join(' ')}</div>
        <div style="font-size:11px;color:var(--muted)">${jr ? jr.title : '—'} · ${jr ? jr.entity : ''}</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px">
          <span style="font-size:10px;background:var(--primary-light);color:var(--primary-dark);border-radius:4px;padding:1px 6px">${c.source}</span>
          ${jr ? `<span style="font-size:10px;background:#f3f4f6;color:#374151;border-radius:4px;padding:1px 6px">${jr.department}</span>` : ''}
        </div>
      </div>`;
    }).join('') || '<div style="font-size:11px;color:var(--muted);text-align:center;padding:8px 0">—</div>';
  });

  // summary bar
  const active = cands.filter(c => !['Hired','Rejected'].includes(c.stage)).length;
  const hired = cands.filter(c => c.stage === 'Hired').length;
  const rejected = cands.filter(c => c.stage === 'Rejected').length;
  const summary = document.getElementById('kanban-summary');
  if (summary) summary.innerHTML = `Showing <strong>${cands.length}</strong> candidates &nbsp;·&nbsp; <span style="color:var(--primary)">${active} active</span> &nbsp;·&nbsp; <span style="color:var(--success)">${hired} hired</span> &nbsp;·&nbsp; <span style="color:var(--danger)">${rejected} rejected</span>`;
}

function renderCandidates() {
  const jrFilter = document.getElementById('cand-jr')?.value || 'all';
  const stageFilter = document.getElementById('cand-stage')?.value || 'all';
  const sourceFilter = document.getElementById('cand-source')?.value || 'all';
  const filtered = CANDIDATES.filter(c =>
    (jrFilter === 'all' || c.jr_id === jrFilter) &&
    (stageFilter === 'all' || c.stage === stageFilter) &&
    (sourceFilter === 'all' || c.source === sourceFilter)
  );

  // Cross-entity alert banner
  const alertBox = document.getElementById('cross-entity-alert');
  const activeFlagged = getCrossEntityFlaggedCandidates();
  // Concurrent duplicates: one entry per IC pair (avoid showing both twins)
  const seenDupIcs = new Set();
  const concurrentDups = CANDIDATES.filter(c => {
    if (['Hired','Rejected'].includes(c.stage) || getWatchlistEntry(c.ic)) return false;
    const d = getConcurrentDuplicateEntry(c);
    if (!d) return false;
    if (seenDupIcs.has(c.ic)) return false;
    seenDupIcs.add(c.ic);
    return true;
  });

  if (alertBox) {
    const total = activeFlagged.length + concurrentDups.length;
    if (total > 0) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:14px">
          <div style="font-size:22px;flex-shrink:0">🚨</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px;color:#7f1d1d;margin-bottom:2px">Cross-Entity Intelligence — ${total} Alert${total > 1 ? 's' : ''} Detected</div>
            <div style="font-size:12px;color:#991b1b;margin-bottom:12px">${activeFlagged.length} bad record${activeFlagged.length !== 1 ? 's' : ''} · ${concurrentDups.length} concurrent duplicate${concurrentDups.length !== 1 ? 's' : ''}</div>
            ${activeFlagged.map(c => {
              const jr = JOB_REQUISITIONS.find(j => j.id === c.jr_id);
              const w = getWatchlistEntry(c.ic);
              return `<div style="background:white;border:1px solid #fca5a5;border-radius:8px;padding:10px 14px;margin-bottom:8px;cursor:pointer" onclick="openCandDetail('${c.id}')">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
                  <div><span style="font-weight:700;font-size:13px;color:#7f1d1d">${c.name}</span><span style="font-size:12px;color:#991b1b;margin-left:8px">IC: ${c.ic}</span></div>
                  <span style="background:#991b1b;color:white;font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px">⚠ BAD RECORD</span>
                </div>
                <div style="font-size:12px;color:#374151;margin-top:5px">Applying: <strong>${jr ? jr.title : '—'}</strong> at <strong>${jr ? jr.entity : '—'}</strong> · ${hiringStageBadge(c.stage)}</div>
                <div style="font-size:12px;color:#991b1b;margin-top:3px">Flagged by <strong>${w ? w.flagged_by_entity : '—'}</strong>: "${w ? w.reason.substring(0, 80) + '...' : ''}"</div>
              </div>`;
            }).join('')}
            ${concurrentDups.map(c => {
              const jr = JOB_REQUISITIONS.find(j => j.id === c.jr_id);
              const d = getConcurrentDuplicateEntry(c);
              if (!d) return '';
              return `<div style="background:white;border:1px solid #fcd34d;border-radius:8px;padding:10px 14px;margin-bottom:8px;cursor:pointer" onclick="openCandDetail('${c.id}')">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
                  <div><span style="font-weight:700;font-size:13px;color:#78350f">${c.name}</span><span style="font-size:12px;color:#92400e;margin-left:8px">IC: ${c.ic}</span></div>
                  <span style="background:#92400e;color:white;font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px">⚡ CONCURRENT</span>
                </div>
                <div style="font-size:12px;color:#374151;margin-top:5px">
                  Active at <strong>${jr ? jr.entity : '—'}</strong> (${jr ? jr.title : '—'} · ${hiringStageBadge(c.stage)})
                  and simultaneously at <strong>${d.twinJr.entity}</strong> (${d.twinJr.title} · ${hiringStageBadge(d.twin.stage)})
                </div>
                <div style="font-size:12px;color:#92400e;margin-top:3px">HR teams should coordinate — candidate may be playing both pipelines.</div>
              </div>`;
            }).join('')}
          </div>
        </div>`;
    } else {
      alertBox.style.display = 'none';
    }
  }

  const tbody = document.getElementById('cand-tbody');
  tbody.innerHTML = filtered.map(c => {
    const jr = JOB_REQUISITIONS.find(j => j.id === c.jr_id);
    const badRecord = isCrossEntityFlag(c);
    const dup = !badRecord ? getConcurrentDuplicateEntry(c) : null;
    const rowBg = badRecord ? 'background:#fff5f5;' : dup ? 'background:#fffbeb;' : '';
    const nameColor = badRecord ? 'color:#991b1b;' : dup ? 'color:#78350f;' : '';
    const stageBadge = badRecord
      ? '<span style="background:#fee2e2;color:#991b1b;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px">⚠ BAD RECORD</span>'
      : dup
      ? '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px">⚡ CONCURRENT</span>'
      : hiringStageBadge(c.stage);
    return `<tr style="${rowBg}">
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          ${badRecord ? '<span style="font-size:14px">⚠️</span>' : dup ? '<span style="font-size:14px">⚡</span>' : ''}
          <div>
            <div class="staff-name" style="${nameColor}">${c.name}</div>
            <div class="staff-id">${c.phone}${c.ic ? ' · IC: ' + c.ic : ''}</div>
          </div>
        </div>
      </td>
      <td>${jr ? jr.title : '—'}<div class="staff-id">${c.jr_id}</div></td>
      <td>${jr ? entityBadge(jr.entity) : '—'}</td>
      <td style="font-size:12px;color:var(--muted)">${c.source}</td>
      <td>${stageBadge}</td>
      <td style="font-size:12px;color:var(--muted)">${c.applied}</td>
      <td style="font-size:12px">${c.interviewer || '<span style="color:var(--muted)">—</span>'}</td>
      <td><a class="panel-action" onclick="openCandDetail('${c.id}')" style="${badRecord ? 'color:#991b1b;font-weight:700' : dup ? 'color:#92400e;font-weight:700' : ''}">View</a></td>
    </tr>`;
  }).join('');
}

function openCandDetail(candId) {
  const c = CANDIDATES.find(x => x.id === candId);
  if (!c) return;
  const jr = JOB_REQUISITIONS.find(j => j.id === c.jr_id);
  const stageOrder = ['Applied','Screening','Interview 1','Interview 2','Offer','Hired'];
  const isRejected = c.stage === 'Rejected';
  const currentIdx = stageOrder.indexOf(c.stage);
  const steps = stageOrder.map((s, i) => {
    const done = !isRejected && i < currentIdx;
    const current = !isRejected && i === currentIdx;
    const dotBg = done ? 'var(--success)' : current ? 'var(--primary)' : '#e2e8f0';
    const dotColor = (done || current) ? 'white' : 'var(--muted)';
    const lineBg = done ? 'var(--success)' : '#e2e8f0';
    return `${i > 0 ? `<div style="height:2px;flex:1;background:${lineBg};margin-top:-14px"></div>` : ''}
    <div style="display:flex;flex-direction:column;align-items:center;min-width:60px">
      <div style="width:28px;height:28px;border-radius:50%;background:${dotBg};color:${dotColor};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;position:relative;z-index:1">${i+1}</div>
      <div style="font-size:9px;color:${current?'var(--primary)':done?'var(--success)':'var(--muted)'};margin-top:4px;text-align:center;font-weight:${(done||current)?'700':'400'}">${s}</div>
    </div>`;
  }).join('');
  const watchlistEntry = getWatchlistEntry(c.ic);
  const dupEntry = !watchlistEntry ? getConcurrentDuplicateEntry(c) : null;
  const titleBadge = watchlistEntry
    ? ' <span style="background:#7f1d1d;color:white;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;vertical-align:middle">⚠ BAD RECORD</span>'
    : dupEntry
    ? ' <span style="background:#92400e;color:white;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;vertical-align:middle">⚡ DUPLICATE APPLICATION</span>'
    : '';
  document.getElementById('modal-cand-title').innerHTML = `${c.name}${titleBadge}`;
  document.getElementById('modal-cand-sub').textContent = `${jr ? jr.title : '—'} · ${c.jr_id} · IC: ${c.ic}`;
  document.getElementById('modal-cand-body').innerHTML = `
    ${watchlistEntry ? `
    <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="font-weight:800;font-size:13px;color:#7f1d1d;margin-bottom:8px">⚠️ CROSS-ENTITY RISK — DO NOT PROCEED WITHOUT HR APPROVAL</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;margin-bottom:10px">
        <div><span style="color:#991b1b;font-weight:600">Flagged By:</span><div style="margin-top:2px">${watchlistEntry.flagged_by}</div></div>
        <div><span style="color:#991b1b;font-weight:600">Date Flagged:</span><div style="margin-top:2px">${watchlistEntry.flagged_date}</div></div>
        <div><span style="color:#991b1b;font-weight:600">Entity:</span><div style="margin-top:2px">${watchlistEntry.flagged_by_entity}</div></div>
        <div><span style="color:#991b1b;font-weight:600">Prior Role Applied:</span><div style="margin-top:2px">${watchlistEntry.position_applied}</div></div>
      </div>
      <div style="font-size:12px;color:#991b1b;font-weight:600;margin-bottom:4px">Reason for Flag:</div>
      <div style="font-size:12px;background:white;border:1px solid #fca5a5;border-radius:6px;padding:10px;line-height:1.6;color:#374151">${watchlistEntry.reason}</div>
      <div style="margin-top:10px;font-size:12px;font-weight:700;color:#7f1d1d;background:#fee2e2;padding:6px 10px;border-radius:6px">${watchlistEntry.action}</div>
    </div>` : ''}
    ${dupEntry ? `
    <div style="background:#fffbeb;border:2px solid #fcd34d;border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="font-weight:800;font-size:13px;color:#78350f;margin-bottom:8px">⚡ CONCURRENT APPLICATION DETECTED — Same candidate is active at another entity</div>
      <div style="font-size:13px;color:#374151;line-height:1.6">
        <strong>${dupEntry.twin.name}</strong> (IC: ${dupEntry.twin.ic}) is currently at <strong>${hiringStageBadge(dupEntry.twin.stage)}</strong> stage
        for <strong>${dupEntry.twinJr.title}</strong> at <strong>${dupEntry.twinJr.entity}</strong>.<br><br>
        This candidate applied to both entities within days of each other. HR teams should coordinate before proceeding independently.
      </div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <div style="flex:1;background:white;border:1px solid #fcd34d;border-radius:6px;padding:8px 12px;font-size:12px">
          <div style="font-weight:600;color:#92400e;margin-bottom:2px">This Application</div>
          <div>${jr ? jr.title : '—'} · ${jr ? jr.entity : '—'}</div>
          <div style="color:var(--muted)">Applied: ${c.applied}</div>
        </div>
        <div style="flex:1;background:white;border:1px solid #fcd34d;border-radius:6px;padding:8px 12px;font-size:12px">
          <div style="font-weight:600;color:#92400e;margin-bottom:2px">Other Application</div>
          <div>${dupEntry.twinJr.title} · ${dupEntry.twinJr.entity}</div>
          <div style="color:var(--muted)">Applied: ${dupEntry.twin.applied}</div>
        </div>
      </div>
    </div>` : ''}
    ${isRejected ? `<div style="background:#fee2e2;color:#991b1b;padding:8px 12px;border-radius:6px;font-size:12px;font-weight:600;margin-bottom:16px">Candidate Rejected</div>` : ''}
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">Hiring Stage</div>
      <div style="display:flex;align-items:center;overflow-x:auto;padding-bottom:4px">${steps}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;margin-bottom:16px">
      <div><span style="color:var(--muted)">Phone</span><div style="font-weight:600;margin-top:2px">${c.phone}</div></div>
      <div><span style="color:var(--muted)">Email</span><div style="font-weight:600;margin-top:2px">${c.email}</div></div>
      <div><span style="color:var(--muted)">Applied</span><div style="font-weight:600;margin-top:2px">${c.applied}</div></div>
      <div><span style="color:var(--muted)">Source</span><div style="font-weight:600;margin-top:2px">${c.source}</div></div>
      <div><span style="color:var(--muted)">Interviewer</span><div style="font-weight:600;margin-top:2px">${c.interviewer || '—'}</div></div>
      ${jr ? `<div><span style="color:var(--muted)">Salary Range</span><div style="font-weight:600;margin-top:2px">RM ${jr.salary_min.toLocaleString()} – ${jr.salary_max.toLocaleString()}</div></div>` : ''}
    </div>
    ${c.notes ? `<div style="font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;margin-top:4px">Notes</div><p style="font-size:13px;line-height:1.6;margin-bottom:16px">${c.notes}</p>` : ''}
    <div style="border-top:1px solid var(--border);padding-top:16px;margin-top:4px">
      <div style="font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">Move to Stage</div>
      <div style="display:flex;gap:8px;align-items:center">
        <select id="stage-select" class="filter-select" style="flex:1">
          ${HIRING_STAGES.map(s => `<option value="${s}" ${s === c.stage ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        <button onclick="moveStage('${c.id}')" style="padding:8px 18px;background:var(--primary);color:white;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">Move</button>
      </div>
    </div>
  `;
  document.getElementById('cand-modal').classList.add('open');
}

function moveStage(candId) {
  const c = CANDIDATES.find(x => x.id === candId);
  if (!c) return;
  const newStage = document.getElementById('stage-select').value;
  if (newStage === c.stage) return;
  c.stage = newStage;
  document.getElementById('cand-modal').classList.remove('open');
  renderPipeline();
  renderCandidates();
}

function openAddCandidateForm() {
  // Populate JR select
  const jrSel = document.getElementById('ac-jr');
  jrSel.innerHTML = '<option value="">Select position</option>' +
    JOB_REQUISITIONS.filter(j => j.status === 'Active').map(j =>
      `<option value="${j.id}">${j.title} — ${j.entity} (${j.id})</option>`
    ).join('');

  // Clear fields
  ['ac-name','ac-ic','ac-phone','ac-email','ac-interviewer','ac-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('ac-source').value = '';
  document.getElementById('ac-stage').value = 'Applied';
  document.getElementById('ac-date').value = '2026-04-27';
  document.getElementById('add-cand-ic-alert').style.display = 'none';

  document.getElementById('add-cand-modal').classList.add('open');
}

function checkCandidateIC(ic) {
  const alertBox = document.getElementById('add-cand-ic-alert');
  const clean = ic.replace(/\s/g, '');
  if (clean.length < 12) { alertBox.style.display = 'none'; return; }

  const watchEntry = getWatchlistEntry(clean);
  if (watchEntry) {
    alertBox.style.display = 'block';
    alertBox.innerHTML = `
      <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:8px;padding:12px 14px">
        <div style="font-weight:700;font-size:13px;color:#991b1b;margin-bottom:4px">⚠️ WATCHLIST MATCH — Bad Record on File</div>
        <div style="font-size:12px;color:#374151;line-height:1.6">
          <strong>${watchEntry.name}</strong> was flagged by <strong>${watchEntry.flagged_by_entity}</strong> on ${watchEntry.flagged_date}.<br>
          Reason: ${watchEntry.reason}<br><br>
          <strong style="color:#991b1b">${watchEntry.action}</strong>
        </div>
      </div>`;
    return;
  }

  // Check concurrent duplicate at another entity
  const jrId = document.getElementById('ac-jr').value;
  const jr = JOB_REQUISITIONS.find(j => j.id === jrId);
  if (jr) {
    const twin = CANDIDATES.find(c =>
      c.ic === clean &&
      !['Hired','Rejected'].includes(c.stage)
    );
    if (twin) {
      const twinJr = JOB_REQUISITIONS.find(j => j.id === twin.jr_id);
      if (twinJr && twinJr.entity !== jr.entity) {
        alertBox.style.display = 'block';
        alertBox.innerHTML = `
          <div style="background:#fffbeb;border:2px solid #fcd34d;border-radius:8px;padding:12px 14px">
            <div style="font-weight:700;font-size:13px;color:#92400e;margin-bottom:4px">⚡ Concurrent Application Detected</div>
            <div style="font-size:12px;color:#374151;line-height:1.6">
              This IC is already active as <strong>${twin.name}</strong> at <strong>${twinJr.entity}</strong>
              — ${twinJr.title} (${twin.stage}).<br>
              Candidate is applying to both entities simultaneously.
            </div>
          </div>`;
        return;
      }
    }
  }

  alertBox.style.display = 'none';
}

function submitAddCandidate() {
  const name = document.getElementById('ac-name').value.trim();
  const ic = document.getElementById('ac-ic').value.trim();
  const jrId = document.getElementById('ac-jr').value;
  const source = document.getElementById('ac-source').value;

  if (!name || !ic || !jrId || !source) {
    alert('Please fill in all required fields: Name, IC Number, Position, and Source.');
    return;
  }

  const nextId = 'C' + String(CANDIDATES.length + 1).padStart(3, '0');
  const newCand = {
    id: nextId,
    ic: ic,
    jr_id: jrId,
    name: name,
    phone: document.getElementById('ac-phone').value.trim() || '—',
    email: document.getElementById('ac-email').value.trim() || '—',
    source: source,
    stage: document.getElementById('ac-stage').value,
    applied: document.getElementById('ac-date').value,
    interviewer: document.getElementById('ac-interviewer').value.trim() || null,
    notes: document.getElementById('ac-notes').value.trim(),
  };

  CANDIDATES.push(newCand);
  document.getElementById('add-cand-modal').classList.remove('open');
  renderCandidates();
  renderPipeline();

  // If it's a flagged candidate, navigate to candidates page so they see the alert
  if (getWatchlistEntry(ic) || getConcurrentDuplicateEntry(newCand)) {
    showPage('hiring-candidates');
  }
}

function initHiringFilters() {
  const pipeJr = document.getElementById('pipe-jr');
  const candJr = document.getElementById('cand-jr');
  const pipeDept = document.getElementById('pipe-dept');

  const allOpts = '<option value="all">All Positions</option>' + JOB_REQUISITIONS.map(j => `<option value="${j.id}">${j.title} (${j.entity})</option>`).join('');
  if (pipeJr) pipeJr.innerHTML = allOpts;
  if (candJr) candJr.innerHTML = '<option value="all">All Positions</option>' + JOB_REQUISITIONS.map(j => `<option value="${j.id}">${j.title} (${j.entity})</option>`).join('');

  // populate dept filter from JRs
  if (pipeDept) {
    const depts = [...new Set(JOB_REQUISITIONS.map(j => j.department))].sort();
    pipeDept.innerHTML = '<option value="all">All Departments</option>' + depts.map(d => `<option value="${d}">${d}</option>`).join('');
  }
}

function onPipeEntityChange() {
  const entity = document.getElementById('pipe-entity')?.value || 'all';
  const pipeDept = document.getElementById('pipe-dept');
  const pipeJr = document.getElementById('pipe-jr');

  // re-filter dept options based on entity
  const depts = [...new Set(JOB_REQUISITIONS
    .filter(j => entity === 'all' || j.entity === entity)
    .map(j => j.department))].sort();
  if (pipeDept) pipeDept.innerHTML = '<option value="all">All Departments</option>' + depts.map(d => `<option value="${d}">${d}</option>`).join('');

  // re-filter position options based on entity
  const jrs = JOB_REQUISITIONS.filter(j => entity === 'all' || j.entity === entity);
  if (pipeJr) pipeJr.innerHTML = '<option value="all">All Positions</option>' + jrs.map(j => `<option value="${j.id}">${j.title} (${j.entity})</option>`).join('');

  renderPipeline();
}
