// ─── INIT ─────────────────────────────────────────────────────────────────────
const terminal  = document.getElementById('terminal');
const input     = document.getElementById('cmd-input');
const inputText = document.getElementById('input-text');

// Mirror typed text into visible span so cursor follows naturally
input.addEventListener('input', () => {
  inputText.textContent = input.value;
});

let history = [];
let histIdx  = -1;

// ─── ASCII ART ────────────────────────────────────────────────────────────────
const ASCII = ` █████╗ ██████╗ ███╗   ███╗ █████╗  █████╗ ███╗   ██╗
██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔══██╗████╗  ██║
███████║██████╔╝██╔████╔██║███████║███████║██╔██╗ ██║
██╔══██║██╔══██╗██║╚██╔╝██║██╔══██║██╔══██║██║╚██╗██║
██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝

 ██████╗ ██╗   ██╗██╗  ██╗ █████╗
██╔════╝ ██║   ██║██║  ██║██╔══██╗
██║  ███╗██║   ██║███████║███████║
██║   ██║██║   ██║██╔══██║██╔══██║
╚██████╔╝╚██████╔╝██║  ██║██║  ██║
 ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`.trim();

// ─── COMMAND REGISTRY ────────────────────────────────────────────────────────
const COMMANDS = {
  help:         cmdHelp,
  who:          cmdWho,   w:   cmdWho,
  skills:       cmdSkills, s:  cmdSkills,
  projects:     cmdProjects, pj: cmdProjects,
  education:    cmdEducation, edu: cmdEducation,
  contact:      cmdContact, c:  cmdContact,
  interests:    cmdInterests, i: cmdInterests,
  achievements: cmdAchievements, a: cmdAchievements,
  socials:      cmdSocials,
  quote:        cmdQuote,
  secret:       cmdSecret,
  clear:        cmdClear,
  ls:           cmdLs,
  whoami:       () => [line('armaan guha', 'success')],
  pwd:          () => [line('/home/armaan', 'muted')],
  date:         () => [line(new Date().toString(), 'muted')],
  uname:        () => [line('termaan OS v2.0.0 — built with ❤️ and way too much caffeine', 'muted')],
  echo:         (args) => [line(args.join(' '), 'white')],
  neofetch:     cmdNeofetch,
  matrix:       cmdMatrix,
  man:          cmdMan,
};

// ─── COMMAND IMPLEMENTATIONS ──────────────────────────────────────────────────

function cmdHelp() {
  return [
    sectionTitle('Available Commands'),
    blank(),
    row('who',          'or', 'w',    '→ about me'),
    row('skills',       'or', 's',    '→ technical skills'),
    row('projects',     'or', 'pj',   '→ my projects'),
    row('education',    'or', 'edu',  '→ academic background'),
    row('interests',    'or', 'i',    '→ what excites me'),
    row('achievements', 'or', 'a',    '→ competitions & awards'),
    row('contact',      'or', 'c',    '→ get in touch'),
    row('socials',      '',   '',     '→ my online presence'),
    row('neofetch',     '',   '',     '→ system info card'),
    row('quote',        '',   '',     '→ random quote'),
    row('secret',       '',   '',     '→ 🤫'),
    row('ls',           '',   '',     '→ list directory'),
    row('clear',        '',   '',     '→ clear terminal'),
    blank(),
    { html: `<div class="muted">Tip: use <span class="highlight">Tab</span> to autocomplete, <span class="highlight">↑↓</span> for history</div>` },
  ];
}

function cmdWho() {
  return [
    sectionTitle('whoami'),
    blank(),
    infoRow('Name',     'Armaan Guha'),
    infoRow('Location', 'Noida, India 🇮🇳'),
    infoRow('School',   'Delhi Public School, Noida', 'accent'),
    infoRow('Role',     'Student · Researcher · Builder'),
    infoRow('Passion',  'Deep Learning & Applied AI'),
    infoRow('Status',   '🟢 Open to collaborations', 'yellow'),
    blank(),
    { html: `<div class="white">I'm a high school student obsessed with making AI actually <em style="color:var(--cyan)">do things</em> in the real world — not just predict cats vs dogs. I build systems that solve infrastructure problems, compete in science olympiads, and probably drink too much chai.</div>` },
    blank(),
    { html: `<div class="muted">→ type <span class="tag" onclick="runCmd('projects')">projects</span> to see what I've built</div>` },
  ];
}

function cmdSkills() {
  return [
    sectionTitle('Skills'),
    blank(),
    { html: `<div class="green-dim" style="font-size:11px;letter-spacing:0.08em;margin-bottom:6px">── LANGUAGES ──</div>` },
    ...([
      ['Python',                  92],
      ['JavaScript',              75],
      ['HTML / CSS',              78],
      ['C / C++',                 65],
      ['SQL / JSON',              70],
    ]).map(([n,p]) => skillBar(n, p)),
    blank(),
    { html: `<div class="green-dim" style="font-size:11px;letter-spacing:0.08em;margin-bottom:6px">── AI & ML ──</div>` },
    ...([
      ['Deep Learning',           90],
      ['PyTorch / TensorFlow',    88],
      ['Data Science / pandas',   82],
      ['Signal Processing',       78],
      ['Simulation-based Training',80],
      ['EPANET Hydraulic Sim',    72],
    ]).map(([n,p]) => skillBar(n, p)),
    blank(),
    { html: `<div class="green-dim" style="font-size:11px;letter-spacing:0.08em;margin-bottom:6px">── WEB & TOOLS ──</div>` },
    ...([
      ['Git / GitHub',            85],
      ['Tailwind CSS',            72],
      ['Chart.js / QuickChart',   68],
      ['GitHub Pages / Hosting',  80],
      ['LaTeX / Research Writing',80],
    ]).map(([n,p]) => skillBar(n, p)),
    blank(),
    { html: `<div class="muted">Also fluent in: caffeine, Stack Overflow, and reading papers at 2am.</div>` },
  ];
}

function cmdProjects() {
  return [
    sectionTitle('Projects'),
    blank(),
    project(
      'AcousticLeakNet',
      'Simulation-trained deep learning system for acoustic water pipe leak detection. Trained on 100.5M simulation rows across 8 named networks. Achieves AUROC 1.0000 & F1 1.0000 on 3 unseen test networks (L-TOWN, KY15, Richmond). Hardware cost is 10–42× cheaper than commercial alternatives.',
      'PyTorch · Signal Processing · EPANET · AdamW · Python · pandas',
      '★ GENIUS Olympiad 2026 — AI category · Co-authored with Aarav Gupta',
      'https://github.com/ogshrug'
    ),
    project(
      'KrishiMitra',
      'Digital assistant for Indian farmers with an interactive dashboard, soil health analysis, AI-powered crop recommendations, real-time weather forecasts, and market price tracking. Multilingual support for Indian languages. Built for the Inter DPS Digital Project Showcase.',
      'HTML5 · CSS3 · JavaScript · Tailwind CSS · Chart.js · GitHub Pages',
      '🌾 Live at ogshrug.github.io/interdpsDPSN',
      'https://github.com/ogshrug/interdpsDPSN'
    ),
    project(
      'kubectl.dev — Kubernetes Cheat Sheet',
      'Full kubectl command reference site with 130+ commands across 12 categories. Instant search, syntax highlighting, one-click copy, category filters, and danger/tip badges.',
      'Vanilla JS · HTML · CSS · JetBrains Mono',
      null,
      'https://github.com/ogshrug'
    ),
    project(
      'termaan',
      'This very terminal portfolio. Browser-based interactive terminal with cyberpunk purple CRT aesthetic, full command system, tab autocomplete, history navigation, and boot sequence.',
      'Vanilla JS · CSS · HTML · JetBrains Mono',
      null,
      'https://github.com/ogshrug'
    ),
    blank(),
    { html: `<div class="muted">→ 17 repos on GitHub · <span class="tag" onclick="window.open('https://github.com/ogshrug','_blank')">github.com/ogshrug ↗</span></div>` },
  ];
}

function cmdEducation() {
  return [
    sectionTitle('Education'),
    blank(),
    infoRow('School',   'Delhi Public School, Noida', 'accent'),
    infoRow('Grade',    'Class 11 · Science Stream'),
    infoRow('Subjects', 'Physics, Chemistry, Math, CS, English'),
    blank(),
    sectionTitle('Coursework & Self-Study'),
    { html: `<div style="color:var(--white);margin-top:4px">• Deep Learning Specialization — deeplearning.ai<br>• CS229: Machine Learning — Stanford (audit)<br>• Fast.ai Practical Deep Learning<br>• EPANET Hydraulic Simulation<br>• Signal Processing fundamentals</div>` },
    blank(),
    infoRow('Co-author', 'Aarav Gupta — AcousticLeakNet paper'),
  ];
}

function cmdInterests() {
  return [
    sectionTitle('Interests & Obsessions'),
    blank(),
    { html: `
      <div class="white">
        <span class="highlight">🧠 Deep Learning</span> — particularly simulation-based training and infrastructure AI<br>
        <span class="highlight">🔬 Applied Research</span> — bridging paper → prototype → real world<br>
        <span class="highlight">🌊 Fluid Simulation</span> — EPANET, hydraulics, pipe networks<br>
        <span class="highlight">⚡ Signal Processing</span> — acoustic sensing, FFT, time-series analysis<br>
        <span class="highlight">📖 Reading</span> — sci-fi, philosophy of mind, anything Feynman wrote<br>
        <span class="highlight">🎮 Games</span> — strategy games that feel like debugging a system<br>
        <span class="highlight">☕ Chai</span> — a non-negotiable life dependency<br>
      </div>` },
  ];
}

function cmdAchievements() {
  return [
    sectionTitle('Achievements & Competitions'),
    blank(),
    { html: `<div class="white">
      <div style="margin-bottom:8px">
        <span class="cyan">★ GENIUS Olympiad 2026</span><br>
        <span style="color:var(--dim)">  Category: Artificial Intelligence</span><br>
        <span style="color:var(--white)">  Submitting AcousticLeakNet — simulation-trained DL for pipe leak detection</span>
      </div>
      <div style="margin-bottom:8px">
        <span class="cyan">📐 Science & Research</span><br>
        <span style="color:var(--white)">  Co-authored technical research paper on acoustic leak detection with novel simulation dataset (100M+ rows)</span>
      </div>
      <div style="margin-bottom:8px">
        <span class="cyan">🏫 DPS Noida</span><br>
        <span style="color:var(--white)">  Active in science and technology clubs, competitive academics</span>
      </div>
    </div>` },
  ];
}

function cmdContact() {
  return [
    sectionTitle('Contact'),
    blank(),
    { html: `<div class="white">
      The best way to reach me is a DM or an email. I'm pretty responsive.<br><br>
      <span class="cmd-link" onclick="window.open('mailto:armaan@example.com')">[email]</span> &nbsp; armaan@example.com<br>
      <span class="cmd-link" onclick="window.open('https://github.com/armaanguha','_blank')">[github]</span> &nbsp; github.com/armaanguha<br>
      <span class="cmd-link" onclick="window.open('https://linkedin.com','_blank')">[linkedin]</span> &nbsp; linkedin.com/in/armaanguha<br>
      <span class="cmd-link" onclick="window.open('https://twitter.com','_blank')">[twitter]</span> &nbsp; @armaanguha<br>
    </div>` },
    blank(),
    { html: `<div class="muted">Response time: usually within 24h. Faster if it's about AI or chai.</div>` },
  ];
}

function cmdSocials() {
  return [
    sectionTitle('Socials'),
    blank(),
    { html: `<div>
      <span class="tag" onclick="window.open('https://github.com/armaanguha','_blank')">[ github ]</span>&nbsp;&nbsp;
      <span class="tag" onclick="window.open('https://linkedin.com','_blank')">[ linkedin ]</span>&nbsp;&nbsp;
      <span class="tag" onclick="window.open('https://twitter.com','_blank')">[ twitter ]</span>
    </div>` },
  ];
}

function cmdNeofetch() {
  return [{ html: `<div style="display:flex;gap:24px;align-items:flex-start;margin:4px 0">
    <pre class="ascii" style="font-size:10px;line-height:1.3;flex-shrink:0">   ___
  /   \\
 | A G |
  \\___/
   | |
  /   \\
</pre>
    <div class="white" style="font-size:13px">
      <span class="green" style="font-weight:700">armaan</span><span class="dim">@</span><span class="green" style="font-weight:700">termaan</span><br>
      <span class="dim">───────────────────</span><br>
      <span class="green-dim">OS:</span>        termaan OS v2.0.0<br>
      <span class="green-dim">Host:</span>      DPS Noida, India<br>
      <span class="green-dim">Uptime:</span>    16 years, still going<br>
      <span class="green-dim">Shell:</span>     curiosity 3.14<br>
      <span class="green-dim">Editor:</span>    VS Code (vim sometimes)<br>
      <span class="green-dim">Language:</span>  Python, English, Hindi<br>
      <span class="green-dim">CPU:</span>       Overclocked on chai<br>
      <span class="green-dim">Memory:</span>    Too many paper PDFs<br>
      <span class="green-dim">GPU:</span>       Training AcousticLeakNet<br>
      <span class="green-dim">Theme:</span>     CRT Green (obviously)<br>
      <span style="margin-top:8px;display:block">
        <span style="background:#1a001a;color:#1a001a">███</span>
        <span style="background:#6600aa;color:#6600aa">███</span>
        <span style="background:#9900cc;color:#9900cc">███</span>
        <span style="background:#bf00ff;color:#bf00ff">███</span>
        <span style="background:#cc66ff;color:#cc66ff">███</span>
        <span style="background:#e8d0f0;color:#e8d0f0">███</span>
      </span>
    </div>
  </div>`}];
}

const quotes = [
  ["The best way to predict the future is to invent it.", "Alan Kay"],
  ["Programs must be written for people to read, and only incidentally for machines to execute.", "Harold Abelson"],
  ["It's not that I'm so smart, it's just that I stay with problems longer.", "Einstein"],
  ["Simplicity is the ultimate sophistication.", "Leonardo da Vinci"],
  ["Research is what I'm doing when I don't know what I'm doing.", "Wernher von Braun"],
  ["The people who are crazy enough to think they can change the world are the ones who do.", "Steve Jobs"],
  ["In theory, theory and practice are the same. In practice, they are not.", "Yogi Berra"],
  ["Move fast and understand things.", "Armaan Guha (aspiring)"],
];

function cmdQuote() {
  const [q, a] = quotes[Math.floor(Math.random() * quotes.length)];
  return [
    blank(),
    { html: `<div style="border-left:2px solid rgba(191,0,255,0.35);padding-left:14px"><div class="white" style="font-style:italic">"${q}"</div><div class="muted" style="margin-top:4px">— ${a}</div></div>` },
    blank(),
  ];
}

function cmdSecret() {
  return [
    blank(),
    { html: `<div class="yellow">🤫 SECRET UNLOCKED</div>` },
    blank(),
    { html: `<div class="white">You actually typed 'secret'. I respect the curiosity.<br><br>
    Fun facts about Armaan:<br>
    <span class="muted">→</span> Has definitely debugged code at 2am while drinking chai<br>
    <span class="muted">→</span> Names variables things like <span class="green">leak_hunter</span> and <span class="green">pipe_whisperer</span><br>
    <span class="muted">→</span> Genuinely gets excited when a loss curve goes down<br>
    <span class="muted">→</span> Dreams in <span class="cyan">PyTorch</span> sometimes<br>
    <span class="muted">→</span> Would 100% live in a terminal if he could<br>
    </div>` },
    blank(),
    { html: `<div class="muted">Now you know. 👁️</div>` },
  ];
}

function cmdLs() {
  return [{ html: `<div class="white" style="display:flex;gap:24px;flex-wrap:wrap">
    <span class="tag" onclick="runCmd('who')">about/</span>
    <span class="tag" onclick="runCmd('skills')">skills/</span>
    <span class="tag" onclick="runCmd('projects')">projects/</span>
    <span class="tag" onclick="runCmd('education')">education/</span>
    <span class="tag" onclick="runCmd('interests')">interests/</span>
    <span class="tag" onclick="runCmd('achievements')">achievements/</span>
    <span class="tag" onclick="runCmd('contact')">contact/</span>
    <span style="color:var(--dim)">secret.txt</span>
  </div>`}];
}

function cmdMatrix() {
  return [{ html: `<div id="matrix-container" style="font-size:11px;line-height:1.2;height:80px;overflow:hidden;position:relative"><div id="matrix-text" class="green" style="white-space:pre;opacity:0.7"></div></div>` }];
}

function cmdMan(args) {
  const cmd = args[0];
  if (!cmd) return [line('Usage: man <command>', 'err')];
  if (!COMMANDS[cmd]) return [line(`No manual entry for ${cmd}`, 'err')];
  return [
    { html: `<div><span class="section-title">MANUAL: ${cmd.toUpperCase()}</span><br><span class="muted">→ Run <span class="tag" onclick="runCmd('${cmd}')">${cmd}</span> to execute, or type 'help' for all commands.</span></div>` }
  ];
}

function cmdClear() {
  terminal.innerHTML = '';
  return [];
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function line(text, cls = '') {
  return { html: `<div class="output ${cls}">${escHtml(text)}</div>` };
}

function blank() {
  return { html: `<div class="output blank"></div>` };
}

function sectionTitle(t) {
  return { html: `<div class="section-title" style="margin-top:2px">── ${t} ──────────────────────────────────</div>` };
}

function row(a, sep, b, desc) {
  return { html: `<div class="output"><span class="tag" onclick="runCmd('${a}')">[${a}]</span>${b ? ` <span class="muted">${sep}</span> <span class="tag" onclick="runCmd('${b}')">[${b}]</span>` : ''} <span class="muted">${desc}</span></div>` };
}

function infoRow(label, value, cls = '') {
  return { html: `<div class="info-row"><span class="label">${label}</span><span class="value ${cls}">${value}</span></div>` };
}

function skillBar(name, pct) {
  const filled = Math.round(pct / 100 * 20);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
  return { html: `<div class="skill-row"><span class="skill-name">${name}</span><span class="green" style="font-size:12px;letter-spacing:1px;opacity:0.9">${bar}</span><span class="skill-pct"> ${pct}%</span></div>` };
}

function project(name, desc, tech, note, link) {
  return { html: `<div class="project-block">
    <div class="project-name">${name}</div>
    <div class="project-desc">${desc}</div>
    <div class="project-tech">[ ${tech} ]</div>
    ${note ? `<div class="yellow" style="font-size:12px;margin-top:2px">${note}</div>` : ''}
    ${link ? `<div class="project-link" onclick="window.open('${link}','_blank')">↗ view on github</div>` : ''}
  </div>` };
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─── RENDER ───────────────────────────────────────────────────────────────────

function renderLines(lines) {
  lines.forEach((item, i) => {
    const div = document.createElement('div');
    div.innerHTML = item.html;
    div.style.opacity = '0';
    div.style.transform = 'translateY(3px)';
    terminal.appendChild(div);
    setTimeout(() => {
      div.style.transition = 'opacity 0.05s, transform 0.05s';
      div.style.opacity = '1';
      div.style.transform = 'none';
    }, i * 18);
  });
  setTimeout(() => terminal.scrollTop = terminal.scrollHeight, lines.length * 18 + 50);
}

function printCmd(cmdStr) {
  const echo = document.createElement('div');
  echo.className = 'output cmd-echo animate-in';
  echo.textContent = cmdStr;
  terminal.appendChild(echo);
}

function runCmd(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;

  history.unshift(trimmed);
  histIdx = -1;
  input.value = '';
  inputText.textContent = '';

  printCmd(trimmed);

  const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
  const fn = COMMANDS[cmd];

  if (fn) {
    const result = fn(args);
    if (result && result.length) renderLines(result);
  } else {
    renderLines([
      { html: `<div class="err">command not found: ${escHtml(cmd)} — type <span class="tag" onclick="runCmd('help')">help</span> for available commands</div>` }
    ]);
  }

  setTimeout(() => terminal.scrollTop = terminal.scrollHeight, 50);
}

// ─── BOOT SEQUENCE ────────────────────────────────────────────────────────────

async function boot() {
  const asciiEl = document.createElement('pre');
  asciiEl.className = 'ascii';
  asciiEl.textContent = ASCII;
  terminal.appendChild(asciiEl);

  await delay(300);

  const bootLines = [
    { html: `<div class="muted" style="font-size:12px">termaan v2.0.0 — personal terminal of armaan guha</div>` },
    { html: `<div class="muted" style="font-size:12px">booted in ${(Math.random() * 0.4 + 0.1).toFixed(3)}s — all systems go ✓</div>` },
    blank(),
    { html: `<div class="white">Welcome! Type <span class="tag" onclick="runCmd('help')">help</span> to see available commands.</div>` },
    { html: `<div class="muted">Or try: <span class="tag" onclick="runCmd('who')">who</span> · <span class="tag" onclick="runCmd('projects')">projects</span> · <span class="tag" onclick="runCmd('skills')">skills</span> · <span class="tag" onclick="runCmd('neofetch')">neofetch</span></div>` },
    blank(),
  ];

  renderLines(bootLines);
  setTimeout(() => input.focus(), 200);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── INPUT HANDLING ───────────────────────────────────────────────────────────

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    runCmd(input.value);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < history.length - 1) histIdx++;
    input.value = history[histIdx] || '';
    inputText.textContent = input.value;
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) histIdx--;
    else { histIdx = -1; input.value = ''; }
    input.value = history[histIdx] || '';
    inputText.textContent = input.value;
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const val = input.value.trim().toLowerCase();
    const match = Object.keys(COMMANDS).find(k => k.startsWith(val) && k !== val);
    if (match) { input.value = match; inputText.textContent = match; }
  } else if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault();
    cmdClear();
  }
});

// Keep hidden input always focused — any click or keypress anywhere refocuses it
document.addEventListener('click', () => input.focus());
document.addEventListener('keydown', e => {
  if (!e.ctrlKey && !e.metaKey) input.focus();
});

// ─── MATRIX EASTER EGG ───────────────────────────────────────────────────────

let matrixActive = false;

function startMatrix() {
  if (matrixActive) return;
  matrixActive = true;
  const el = document.getElementById('matrix-text');
  if (!el) return;
  const chars = 'アイウエオカキクケコABCDEF01234567890101011100110';
  let t = 0;
  const iv = setInterval(() => {
    if (!document.getElementById('matrix-text')) { clearInterval(iv); return; }
    let row = '';
    for (let i = 0; i < 80; i++) row += chars[Math.floor(Math.random() * chars.length)];
    el.textContent = (el.textContent + '\n' + row).split('\n').slice(-6).join('\n');
    if (++t > 30) clearInterval(iv);
  }, 80);
}

// Wrap matrix command to trigger animation after render
const _origMatrix = cmdMatrix;
COMMANDS.matrix = function () {
  const res = _origMatrix();
  setTimeout(startMatrix, 100);
  return res;
};

// ─── GO ───────────────────────────────────────────────────────────────────────
boot();