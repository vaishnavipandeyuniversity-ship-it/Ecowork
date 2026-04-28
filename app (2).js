/* ══════════════════════════════════════════════
   Ecowork — Community Action Network
   app.js
   ══════════════════════════════════════════════ */

// ─── STATE ───────────────────────────────────────────────────────────────────
let records      = JSON.parse(localStorage.getItem('ecoworkRecords')   || '[]');
let volunteers   = JSON.parse(localStorage.getItem('ecoworkVolunteers') || '[]');
let issueCounter = records.length;
let volCounter   = volunteers.length;
let currentUser  = JSON.parse(localStorage.getItem('ecoworkUser')      || 'null');
let idVerified   = false;
let currentLang  = localStorage.getItem('ecoworkLang') || 'en';

// ─── EMOJI MAP ────────────────────────────────────────────────────────────────
const typeEmoji = {
  Infrastructure: '🏗️',
  Sanitation:     '🗑️',
  Safety:         '🚨',
  Health:         '🏥',
  Environment:    '🌿',
  Water:          '🚰',
  Electricity:    '⚡',
  Other:          '📌',
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    login: 'Login / Sign Up',
    nav_home: 'Home', nav_issues: 'Issues', nav_volunteer: 'Volunteer', nav_register: 'Register as Volunteer',
    hero_tag: 'Community Action Network',
    hero_title_1: 'Connecting', hero_title_2: 'communities', hero_title_3: 'with', hero_title_4: 'urgent local needs',
    hero_desc: 'Ecowork gathers scattered community information into one clear picture — revealing the most pressing local needs and instantly matching them with available volunteers who can make a real difference.',
    stat_issues: 'Issues Reported', stat_volunteers: 'Active Volunteers', stat_areas: 'Areas Covered',
    btn_view_issues: 'View Active Issues',
    panel_title: 'Report an Issue', panel_sub: 'Flag urgent local needs so the right volunteers can respond fast.',
    submit_issue_btn: 'Submit Issue Report', live_feed_label: 'Live Community Feed',
    reg_title: 'Register as Volunteer',
    reg_desc: 'Join community heroes. Get matched to issues near you and track your real-world impact.',
    reg_btn: 'Register as Volunteer',
    dash_title: 'Submitted Issues', dash_sub: 'All reported issues — visible to matched volunteers in real-time.',
    lbl_name: 'Full Name', lbl_contact: 'Contact Number', lbl_gender: 'Gender',
    lbl_address: 'Address / Location', lbl_issue_type: 'Issue Type', lbl_desc: 'Description',
    submit_btn: 'Submit Issue Report',
    issue_modal_title: 'Submit a Community Issue', issue_modal_sub: 'Your report connects the right volunteer to the right place.',
    success_title: 'Issue Reported!', success_msg: 'Your issue has been logged. Volunteers in your area will be notified.',
    male: 'Male', female: 'Female', other: 'Other',
  },
  hi: {
    login: 'लॉगिन / साइन अप',
    nav_home: 'होम', nav_issues: 'समस्याएँ', nav_volunteer: 'स्वयंसेवक', nav_register: 'स्वयंसेवक के रूप में पंजीकरण करें',
    hero_tag: 'सामुदायिक कार्य नेटवर्क',
    hero_title_1: 'जोड़ना', hero_title_2: 'समुदायों', hero_title_3: 'को', hero_title_4: 'जरूरी स्थानीय जरूरतों से',
    hero_desc: 'Ecowork बिखरी हुई सामुदायिक जानकारी को एक स्पष्ट तस्वीर में इकट्ठा करता है — सबसे जरूरी स्थानीय जरूरतों को दर्शाता है और उन्हें उपलब्ध स्वयंसेवकों से जोड़ता है।',
    stat_issues: 'दर्ज समस्याएँ', stat_volunteers: 'सक्रिय स्वयंसेवक', stat_areas: 'क्षेत्र कवर किए',
    btn_view_issues: 'सक्रिय समस्याएँ देखें',
    panel_title: 'समस्या रिपोर्ट करें', panel_sub: 'अत्यावश्यक स्थानीय जरूरतों को चिन्हित करें।',
    submit_issue_btn: 'समस्या रिपोर्ट करें', live_feed_label: 'लाइव सामुदायिक फ़ीड',
    reg_title: 'स्वयंसेवक के रूप में पंजीकरण करें', reg_desc: 'हजारों सामुदायिक नायकों से जुड़ें।',
    reg_btn: 'स्वयंसेवक पंजीकरण',
    dash_title: 'दर्ज समस्याएँ', dash_sub: 'सभी रिपोर्ट की गई समस्याएँ — स्वयंसेवकों को रियल-टाइम में दिखती हैं।',
    lbl_name: 'पूरा नाम', lbl_contact: 'संपर्क नंबर', lbl_gender: 'लिंग',
    lbl_address: 'पता / स्थान', lbl_issue_type: 'समस्या का प्रकार', lbl_desc: 'विवरण',
    submit_btn: 'समस्या रिपोर्ट करें',
    issue_modal_title: 'सामुदायिक समस्या दर्ज करें', issue_modal_sub: 'आपकी रिपोर्ट सही स्वयंसेवक को सही स्थान से जोड़ती है।',
    success_title: 'समस्या दर्ज हो गई!', success_msg: 'आपकी समस्या दर्ज कर ली गई है। आपके क्षेत्र के स्वयंसेवकों को सूचित किया जाएगा।',
    male: 'पुरुष', female: 'महिला', other: 'अन्य',
  },
  ta: {
    login: 'உள்நுழை / பதிவு',
    nav_home: 'முகப்பு', nav_issues: 'சிக்கல்கள்', nav_volunteer: 'தன்னார்வலர்', nav_register: 'தன்னார்வலராக பதிவு செய்யுங்கள்',
    hero_tag: 'சமூக நடவடிக்கை நெட்வொர்க்',
    hero_title_1: 'இணைக்கிறோம்', hero_title_2: 'சமூகங்களை', hero_title_3: '', hero_title_4: 'உடனடி உள்ளூர் தேவைகளுடன்',
    hero_desc: 'Ecowork சிதறிய சமூக தகவல்களை ஒரு தெளிவான படமாக ஒன்றிணைக்கிறது.',
    stat_issues: 'பதிவு செய்யப்பட்ட சிக்கல்கள்', stat_volunteers: 'செயலில் உள்ள தன்னார்வலர்கள்', stat_areas: 'உள்ளடக்கிய பகுதிகள்',
    btn_view_issues: 'சிக்கல்களை பார்க்கவும்',
    panel_title: 'சிக்கலை புகாரளிக்கவும்', panel_sub: 'உடனடி உள்ளூர் தேவைகளை கொடியிடுங்கள்.',
    submit_issue_btn: 'சிக்கல் அறிக்கை சமர்ப்பிக்கவும்', live_feed_label: 'நேரடி சமூக ஊட்டம்',
    reg_title: 'தன்னார்வலராக பதிவு செய்யுங்கள்', reg_desc: 'ஆயிரக்கணக்கான சமூக வீரர்களுடன் சேருங்கள்.',
    reg_btn: 'தன்னார்வலராக பதிவு செய்யுங்கள்',
    dash_title: 'சமர்ப்பிக்கப்பட்ட சிக்கல்கள்', dash_sub: 'அனைத்து புகாரளிக்கப்பட்ட சிக்கல்களும் தன்னார்வலர்களுக்கு தெரியும்.',
    lbl_name: 'முழு பெயர்', lbl_contact: 'தொடர்பு எண்', lbl_gender: 'பாலினம்',
    lbl_address: 'முகவரி / இடம்', lbl_issue_type: 'சிக்கல் வகை', lbl_desc: 'விளக்கம்',
    submit_btn: 'சமர்ப்பிக்கவும்',
    issue_modal_title: 'சமூக சிக்கலை சமர்ப்பிக்கவும்', issue_modal_sub: 'உங்கள் அறிக்கை சரியான தன்னார்வலரை சரியான இடத்துடன் இணைக்கிறது.',
    success_title: 'சிக்கல் பதிவு செய்யப்பட்டது!', success_msg: 'உங்கள் சிக்கல் பதிவு செய்யப்பட்டது.',
    male: 'ஆண்', female: 'பெண்', other: 'மற்றவை',
  },
  ur: {
    login: 'لاگ ان / سائن اپ',
    nav_home: 'ہوم', nav_issues: 'مسائل', nav_volunteer: 'رضاکار', nav_register: 'رضاکار کے طور پر رجسٹر کریں',
    hero_tag: 'کمیونٹی ایکشن نیٹ ورک',
    hero_title_1: 'جوڑنا', hero_title_2: 'کمیونٹیز', hero_title_3: 'کو', hero_title_4: 'فوری مقامی ضروریات سے',
    hero_desc: 'Ecowork بکھری ہوئی کمیونٹی معلومات کو ایک واضح تصویر میں جمع کرتا ہے۔',
    stat_issues: 'درج مسائل', stat_volunteers: 'فعال رضاکار', stat_areas: 'علاقے',
    btn_view_issues: 'فعال مسائل دیکھیں',
    panel_title: 'مسئلہ رپورٹ کریں', panel_sub: 'فوری مقامی ضروریات کو نشان زد کریں۔',
    submit_issue_btn: 'مسئلہ رپورٹ جمع کریں', live_feed_label: 'لائیو کمیونٹی فیڈ',
    reg_title: 'رضاکار کے طور پر رجسٹر کریں', reg_desc: 'ہزاروں کمیونٹی ہیروز سے جڑیں۔',
    reg_btn: 'رضاکار رجسٹریشن',
    dash_title: 'جمع کردہ مسائل', dash_sub: 'تمام رپورٹ کردہ مسائل رضاکاروں کو دکھائی دیتے ہیں۔',
    lbl_name: 'پورا نام', lbl_contact: 'رابطہ نمبر', lbl_gender: 'جنس',
    lbl_address: 'پتہ / مقام', lbl_issue_type: 'مسئلے کی قسم', lbl_desc: 'تفصیل',
    submit_btn: 'مسئلہ رپورٹ جمع کریں',
    issue_modal_title: 'کمیونٹی مسئلہ جمع کریں', issue_modal_sub: 'آپ کی رپورٹ صحیح رضاکار کو صحیح جگہ سے جوڑتی ہے۔',
    success_title: 'مسئلہ رپورٹ ہو گیا!', success_msg: 'آپ کا مسئلہ درج ہو گیا ہے۔ علاقے کے رضاکاروں کو مطلع کیا جائے گا۔',
    male: 'مرد', female: 'عورت', other: 'دیگر',
  },
};

// Fallback remaining languages to English
['te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or'].forEach(l => { T[l] = T.en; });

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ecoworkLang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    el.textContent = (T[lang] && T[lang][key]) ? T[lang][key] : (T.en[key] || '');
  });
  document.getElementById('langSelect').value  = lang;
  document.getElementById('loginLang').value   = lang;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function openLogin() { openModal('loginModal'); }

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const errEl = document.getElementById('loginError');
  if (!email || !email.includes('@') || !email.toLowerCase().includes('gmail')) {
    errEl.textContent  = '⚠️ Please enter a valid Gmail address.';
    errEl.style.display = 'block';
    return;
  }
  currentUser = { email, name: email.split('@')[0], lang: currentLang };
  localStorage.setItem('ecoworkUser', JSON.stringify(currentUser));
  closeModal('loginModal');
  updateUserUI();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('ecoworkUser');
  updateUserUI();
}

function updateUserUI() {
  const badge    = document.getElementById('userBadge');
  const loginBtn = document.getElementById('loginBtnTop');
  if (currentUser) {
    badge.style.display    = 'flex';
    loginBtn.style.display = 'none';
    document.getElementById('userNameDisplay').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent      = currentUser.name[0].toUpperCase();
  } else {
    badge.style.display    = 'none';
    loginBtn.style.display = 'flex';
  }
}

// ─── MODAL HELPERS ────────────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }

function openIssueModal() {
  document.getElementById('issueFormView').style.display = 'block';
  document.getElementById('issueSuccess').style.display  = 'none';
  openModal('issueModal');
}

function openVolModal() {
  document.getElementById('volFormView').style.display = 'block';
  document.getElementById('volSuccess').style.display  = 'none';
  idVerified = false;
  openModal('volModal');
}

function openVolDashboard() {
  renderVolDashboard('all');
  openModal('volDashModal');
}

function closeIfOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ─── ISSUE SUBMIT ─────────────────────────────────────────────────────────────
function submitIssue() {
  const name      = document.getElementById('iName').value.trim();
  const contact   = document.getElementById('iContact').value.trim();
  const gender    = document.querySelector('input[name="igender"]:checked');
  const address   = document.getElementById('iAddress').value.trim();
  const issueType = document.getElementById('iType').value;
  const desc      = document.getElementById('iDesc').value.trim();
  const errEl     = document.getElementById('issueError');

  if (!name || !contact || !gender || !address || !issueType || !desc) {
    errEl.textContent  = '⚠️ Please fill in all required fields.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  issueCounter++;
  const refId = 'ECO-' + String(issueCounter).padStart(4, '0');
  const now   = new Date();
  const record = {
    id:            refId,
    name,
    contact,
    gender:        gender.value,
    address,
    issueType,
    desc,
    date:          now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    timestamp:     now.getTime(),
    status:        'pending',
    volunteerNote: '',
    assignedVol:   '',
  };

  records.unshift(record);
  saveRecords();
  renderRecords();
  updateCounts();

  document.getElementById('issueRef').textContent       = 'Reference: ' + refId;
  document.getElementById('issueFormView').style.display = 'none';
  document.getElementById('issueSuccess').style.display  = 'flex';

  addToFeed(record);

  // Reset form
  ['iName', 'iContact', 'iAddress', 'iDesc'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('iType').value = '';
  document.querySelectorAll('input[name="igender"]').forEach(r => { r.checked = false; });
}

// ─── FILE UPLOAD & AI VERIFY ──────────────────────────────────────────────────
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById('uploadPreview');
  const img     = document.getElementById('previewImg');
  preview.style.display = 'flex';
  document.getElementById('previewName').textContent = file.name;
  document.getElementById('previewSize').textContent = (file.size / 1024).toFixed(1) + ' KB';

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = ev => { img.src = ev.target.result; img.style.display = 'block'; };
    reader.readAsDataURL(file);
  } else {
    img.style.display = 'none';
  }

  runAIVerification(file);
}

function clearFile() {
  document.getElementById('vIdFile').value           = '';
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('aiCheck').style.display       = 'none';
  document.getElementById('aiResult').style.display      = 'none';
  idVerified = false;
}

function runAIVerification(file) {
  const aiCheck  = document.getElementById('aiCheck');
  const aiResult = document.getElementById('aiResult');
  aiCheck.style.display  = 'flex';
  aiResult.style.display = 'none';
  idVerified = false;

  // Simulate AI verification (2.5 s)
  const fname        = file.name.toLowerCase();
  const isLikelyValid =
    file.size > 10000 &&
    (file.type.startsWith('image/') || file.type === 'application/pdf') &&
    !fname.includes('fake') &&
    !fname.includes('test123');

  setTimeout(() => {
    aiCheck.style.display  = 'none';
    aiResult.style.display = 'flex';
    if (isLikelyValid) {
      aiResult.className = 'ai-result valid';
      aiResult.innerHTML = '✅ <span><strong>ID Verified.</strong> The document appears to be a genuine government-issued ID. You are cleared to register.</span>';
      idVerified = true;
    } else {
      aiResult.className = 'ai-result invalid';
      aiResult.innerHTML = '❌ <span><strong>Verification Failed.</strong> The document could not be verified as a genuine ID. Please upload a clear photo of your Aadhaar, Voter ID, or other government-issued document.</span>';
      idVerified = false;
    }
  }, 2500);
}

// ─── VOLUNTEER SUBMIT ─────────────────────────────────────────────────────────
let volIdCounter = volunteers.length;

function submitVolunteer() {
  const name      = document.getElementById('vName').value.trim();
  const contact   = document.getElementById('vContact').value.trim();
  const gender    = document.querySelector('input[name="vgender"]:checked');
  const community = document.getElementById('vCommunity').value.trim();
  const work      = document.getElementById('vWork').value.trim();
  const avail     = document.getElementById('vAvail').value;
  const errEl     = document.getElementById('volError');
  const file      = document.getElementById('vIdFile').files[0];
  const aiCheck   = document.getElementById('aiCheck');

  if (!name || !contact || !gender || !community || !work) {
    errEl.textContent  = '⚠️ Please fill in all required fields.';
    errEl.style.display = 'block';
    return;
  }
  if (!file) {
    errEl.textContent  = '⚠️ Please upload your ID card.';
    errEl.style.display = 'block';
    return;
  }
  if (aiCheck.style.display === 'flex') {
    errEl.textContent  = '⏳ Please wait for ID verification to complete.';
    errEl.style.display = 'block';
    return;
  }
  if (!idVerified) {
    errEl.textContent  = '❌ Your ID card could not be verified. Please upload a valid government-issued ID.';
    errEl.style.display = 'block';
    return;
  }

  errEl.style.display = 'none';
  volIdCounter++;
  const volId = 'VOL-' + String(volIdCounter).padStart(4, '0');
  const now   = new Date();
  const vol   = {
    id:        volId,
    name,
    contact,
    gender:    gender.value,
    community,
    work,
    avail,
    date:      now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  };

  volunteers.push(vol);
  localStorage.setItem('ecoworkVolunteers', JSON.stringify(volunteers));
  updateCounts();

  document.getElementById('volRef').textContent       = 'Volunteer ID: ' + volId;
  document.getElementById('volFormView').style.display = 'none';
  document.getElementById('volSuccess').style.display  = 'flex';

  // Reset form
  ['vName', 'vContact', 'vCommunity', 'vWork'].forEach(id => { document.getElementById(id).value = ''; });
  document.querySelectorAll('input[name="vgender"]').forEach(r => { r.checked = false; });
  clearFile();
}

// ─── RENDER RECORDS ───────────────────────────────────────────────────────────
function renderRecords() {
  const grid = document.getElementById('recordsGrid');
  if (records.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><p>No issues submitted yet. Be the first to report a community need.</p></div>`;
    return;
  }
  grid.innerHTML = records.map((r, i) => {
    const barClass = `bar-${r.status || 'pending'}`;
    const stClass  = `st-${r.status || 'pending'}`;
    const stLabel  =
      r.status === 'resolved' ? '🟢 Resolved' :
      r.status === 'working'  ? '🔵 Working'  : '🟠 Pending';
    const volNote  = r.volunteerNote
      ? `<div style="font-size:12px;color:var(--leaf);margin-top:6px;padding:6px 10px;background:rgba(74,140,92,0.08);border-radius:6px">💬 ${esc(r.volunteerNote)}</div>`
      : '';
    return `
      <div class="record-card" style="animation-delay:${i * 0.04}s">
        <div class="card-header">
          <span class="card-type ct-${r.issueType}">${typeEmoji[r.issueType] || '📌'} ${r.issueType}</span>
          <span class="card-id">${r.id}</span>
        </div>
        <div class="card-name">${esc(r.name)}</div>
        <div class="card-address">📍 ${esc(r.address)}</div>
        <div class="card-desc">${esc(r.desc)}</div>
        ${volNote}
        <div class="progress-track">
          <div class="progress-label">
            <span>Progress</span>
            <span class="status-badge ${stClass}">${stLabel}</span>
          </div>
          <div class="progress-bar-bg"><div class="progress-bar-fill ${barClass}"></div></div>
        </div>
        <div class="card-footer" style="margin-top:12px">
          <span class="card-date">🕐 ${r.date}</span>
          <button class="update-progress-btn" onclick="openProgress('${r.id}','${esc(r.issueType)} — ${esc(r.address)}')">Update Progress</button>
        </div>
      </div>`;
  }).join('');
}

// ─── VOLUNTEER DASHBOARD ──────────────────────────────────────────────────────
let volFilterActive = 'all';

function filterIssues(filter, btn) {
  volFilterActive = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderVolDashboard(filter);
}

function renderVolDashboard(filter) {
  const container = document.getElementById('volIssuesList');
  const filtered  = filter === 'all' ? records : records.filter(r => (r.status || 'pending') === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--muted)"><div style="font-size:40px;margin-bottom:12px">✅</div><p>No issues in this category.</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(r => {
    const stClass = `st-${r.status || 'pending'}`;
    const stLabel =
      r.status === 'resolved' ? '🟢 Resolved' :
      r.status === 'working'  ? '🔵 Working'  : '🟠 Pending';
    return `
      <div class="vol-issue-card">
        <div class="vol-card-top">
          <div class="vol-card-info">
            <div class="vol-card-title">${typeEmoji[r.issueType] || '📌'} ${esc(r.issueType)} — ${esc(r.address)}</div>
            <div class="vol-card-meta">
              <span>👤 ${esc(r.name)}</span>
              <span>📞 ${esc(r.contact)}</span>
              <span>🕐 ${r.date}</span>
              <span>${r.id}</span>
            </div>
          </div>
          <span class="status-badge ${stClass}">${stLabel}</span>
        </div>
        <div class="vol-card-desc">${esc(r.desc)}</div>
        ${r.volunteerNote ? `<div style="font-size:12px;color:var(--leaf);margin-bottom:12px;padding:8px 12px;background:rgba(74,140,92,0.08);border-radius:8px">💬 Last note: ${esc(r.volunteerNote)}</div>` : ''}
        <div class="vol-card-actions">
          <button class="contact-btn" onclick="window.open('tel:${esc(r.contact)}')">📞 Call Reporter</button>
          <button class="contact-btn" style="background:linear-gradient(135deg,#2563eb,#1d4ed8)"
            onclick="openProgress('${r.id}','${esc(r.issueType)} — ${esc(r.address)}')">📊 Update Progress</button>
        </div>
      </div>`;
  }).join('');
}

// ─── PROGRESS UPDATE ──────────────────────────────────────────────────────────
function openProgress(issueId, title) {
  document.getElementById('progressIssueId').value           = issueId;
  document.getElementById('progressIssueTitle').textContent  = title;
  const rec = records.find(r => r.id === issueId);
  if (rec) {
    const radio = document.querySelector(`input[name="pstatus"][value="${rec.status || 'pending'}"]`);
    if (radio) radio.checked = true;
    document.getElementById('progressNote').value = rec.volunteerNote || '';
  }
  openModal('progressModal');
}

function saveProgress() {
  const issueId = document.getElementById('progressIssueId').value;
  const status  = document.querySelector('input[name="pstatus"]:checked');
  const note    = document.getElementById('progressNote').value.trim();
  if (!status) return;

  const idx = records.findIndex(r => r.id === issueId);
  if (idx > -1) {
    records[idx].status        = status.value;
    records[idx].volunteerNote = note;
    saveRecords();
    renderRecords();
    renderVolDashboard(volFilterActive);
  }
  closeModal('progressModal');
}

// ─── LIVE FEED ────────────────────────────────────────────────────────────────
function addToFeed(record) {
  const feed    = document.getElementById('liveFeed');
  const iconMap = { Safety: 'icon-red', Infrastructure: 'icon-orange', Water: 'icon-red', Health: 'icon-red' };
  const ic      = iconMap[record.issueType] || 'icon-yellow';
  const d       = document.createElement('div');
  d.className   = 'feed-card';
  d.style.animation = 'fadeUp 0.4s ease both';
  d.innerHTML = `
    <div class="feed-icon ${ic}">${typeEmoji[record.issueType] || '📌'}</div>
    <div class="feed-info">
      <div class="feed-title">${esc(record.issueType)}: ${esc(record.address.slice(0, 30))}</div>
      <div class="feed-meta">Just now · ${record.id}</div>
    </div>
    <div class="urgency-badge badge-new">NEW</div>`;
  feed.insertBefore(d, feed.firstChild);
  if (feed.children.length > 4) feed.removeChild(feed.lastChild);
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s || '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

function saveRecords() {
  localStorage.setItem('ecoworkRecords', JSON.stringify(records));
}

function updateCounts() {
  document.getElementById('totalCount').textContent = records.length;
  document.getElementById('volCount').textContent   = volunteers.length;
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
setLanguage(currentLang);
updateUserUI();
renderRecords();
updateCounts();
