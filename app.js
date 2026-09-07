const desktop = document.querySelector('#desktop');
const input = document.querySelector('#terminal-input');
const output = document.querySelector('#terminal-output');
const form = document.querySelector('#terminal-form');
let zIndex = 10;
let commandHistory = JSON.parse(localStorage.getItem('aurora-history') || '[]');
let historyIndex = commandHistory.length;
let cwd = '/home/aurora/projects';
const files = {
  '/home/aurora': ['Desktop', 'Documents', 'Downloads', 'projects', '.bashrc'],
  '/home/aurora/projects': ['README.md', 'devlog.md', 'aurora.config', 'assets'],
  '/etc': ['hostname', 'hosts', 'os-release'],
  '/tmp': []
};

function escapeHtml(value) { return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char])); }
function currentPrompt() { return `aurora@webos <b>${cwd.replace('/home/aurora', '~')}</b> %`; }
function print(text, type = 'command-output') { const block = document.createElement('pre'); block.className = type; block.innerHTML = text; output.append(block); output.scrollTop = output.scrollHeight; }
function printCommand(command) { print(`<span class="prompt">${currentPrompt()}</span> ${escapeHtml(command)}`, 'line'); }
function toast(message) { const node = document.querySelector('#toast'); node.textContent = message; node.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => node.classList.remove('show'), 1800); }
function normalPath(path = '') { if (!path || path === '~') return '/home/aurora'; let full = path.startsWith('/') ? path : `${cwd}/${path}`; const result = []; full.split('/').forEach(part => { if (!part || part === '.') return; if (part === '..') result.pop(); else result.push(part); }); return `/${result.join('/')}`; }
function simulateNmap(target) { const host = target || 'scanme.nmap.org'; return `Starting Nmap 7.95 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}
Nmap scan report for ${host} (45.33.32.156)
Host is up (0.041s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https

Nmap done: 1 IP address (1 host up) scanned in 1.24 seconds`; }
function simulateDig(domain) { const name = domain || 'example.com'; return `; <<>> DiG 9.18.24 <<>> ${name}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 42107
;; flags: qr rd ra; QUERY: 1, ANSWER: 1

;; QUESTION SECTION:
;${name}.\t\t\tIN\tA

;; ANSWER SECTION:
${name}.\t\t60\tIN\tA\t93.184.216.34

;; Query time: 22 msec
;; SERVER: Browser DNS emulator`; }
async function clientFetch(url, ping = false) {
  let target = url || 'https://example.com'; if (!/^https?:\/\//i.test(target)) target = `https://${target}`;
  print(`Connecting to ${escapeHtml(target)} ...`);
  try { const start = performance.now(); const response = await fetch(target, { method: 'GET', mode: 'cors' }); const elapsed = Math.round(performance.now() - start); if (ping) print(`64 bytes from ${new URL(target).hostname}: icmp_seq=1 ttl=57 time=${elapsed}.0 ms\n--- ${new URL(target).hostname} ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss`); else print(`HTTP/1.1 ${response.status} ${response.statusText}\ncontent-type: ${response.headers.get('content-type') || 'not exposed by CORS'}\n\n[Response received client-side. Body preview intentionally omitted.]`); } catch { print(`curl: (6) Could not resolve host or CORS policy blocked response\nThis browser-only terminal makes GET requests directly from your device; no Aurora server request was made.`); } }
async function run(command) {
  const [bin, ...args] = command.trim().split(/\s+/); const arg = args.join(' '); if (!bin) return;
  const help = `Aurora shell commands:\n  ls [dir]       list files        cd [dir]       change directory\n  pwd            show directory   cat [file]      read a file\n  echo [text]    print text       date            show time\n  whoami         current user     uname [-a]      system info\n  clear          clear terminal   history         command history\n  neofetch       system summary   help            this guide\n\nNetwork learning tools:\n  curl URL       client-side GET request only\n  ping URL       client-side GET reachability check\n  nmap [host]    simulated port scan output\n  dig [domain]   simulated DNS lookup output\n\nNothing here sends POST requests or talks to an Aurora backend.`;
  if (bin === 'help') print(help); else if (bin === 'clear') output.innerHTML = ''; else if (bin === 'pwd') print(cwd); else if (bin === 'whoami') print('aurora'); else if (bin === 'date') print(new Date().toString()); else if (bin === 'uname') print(args.includes('-a') ? 'Linux webos 6.8.0-aurora #1 SMP PREEMPT_DYNAMIC browser x86_64 WebOS' : 'Linux'); else if (bin === 'echo') print(escapeHtml(arg)); else if (bin === 'history') print(commandHistory.map((item, index) => `${String(index + 1).padStart(4)}  ${item}`).join('\n')); else if (bin === 'neofetch') print('          .--.                 aurora@webos\n       .-(    ).              ---------------\n      (___.__)__)             OS: Aurora OS (Web)\n       /  /                   Shell: aurora-sh\n      /__/                    Runtime: your browser\n                              Server processes: 0'); else if (bin === 'ls') { const path = normalPath(arg); print((files[path] || []).join('  ') || (files[path] ? '' : `ls: cannot access '${escapeHtml(arg)}': No such file or directory`)); } else if (bin === 'cd') { const path = normalPath(arg); if (files[path]) { cwd = path; document.querySelector('.terminal-input-row label').innerHTML = currentPrompt(); } else print(`cd: ${escapeHtml(arg)}: No such file or directory`); } else if (bin === 'cat') { const lookup = normalPath(arg); const content = {'/home/aurora/projects/README.md':'# Aurora OS\nA client-first desktop, served as static files.','/home/aurora/projects/devlog.md':'Open the Devlog app for the build record.','/etc/hostname':'webos','/etc/os-release':'NAME="Aurora OS"\nID=aurora'}[lookup]; print(content ? escapeHtml(content) : `cat: ${escapeHtml(arg)}: No such file or directory`); } else if (bin === 'nmap') print(simulateNmap(arg)); else if (bin === 'dig') print(simulateDig(arg)); else if (bin === 'curl') await clientFetch(arg); else if (bin === 'ping') await clientFetch(arg, true); else if (bin === 'mkdir' || bin === 'touch' || bin === 'rm' || bin === 'sudo') print(`${bin}: operation not permitted in the browser filesystem`); else print(`${escapeHtml(bin)}: command not found`);
}
form.addEventListener('submit', async event => { event.preventDefault(); const command = input.value.trim(); if (!command) return; printCommand(command); commandHistory.push(command); commandHistory = commandHistory.slice(-100); localStorage.setItem('aurora-history', JSON.stringify(commandHistory)); historyIndex = commandHistory.length; input.value = ''; await run(command); });
input.addEventListener('keydown', event => { if (event.key === 'ArrowUp') { event.preventDefault(); historyIndex = Math.max(0, historyIndex - 1); input.value = commandHistory[historyIndex] || ''; } if (event.key === 'ArrowDown') { event.preventDefault(); historyIndex = Math.min(commandHistory.length, historyIndex + 1); input.value = commandHistory[historyIndex] || ''; } });

function focusWindow(win) { document.querySelectorAll('.window').forEach(item => item.classList.remove('active')); win.classList.remove('hidden'); win.classList.add('active'); win.style.zIndex = ++zIndex; if (win.id === 'terminal') setTimeout(() => input.focus(), 0); }
function openApp(id) { const win = document.getElementById(id); if (win) focusWindow(win); }
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); openApp(button.dataset.open); }));
document.querySelectorAll('.window').forEach(win => { win.addEventListener('pointerdown', () => focusWindow(win)); const bar = win.querySelector('.titlebar'); bar.addEventListener('pointerdown', event => { if (event.target.closest('.traffic')) return; focusWindow(win); const rect = win.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top; const move = moveEvent => { win.style.left = `${Math.max(0, Math.min(moveEvent.clientX - x, innerWidth - 80))}px`; win.style.top = `${Math.max(31, Math.min(moveEvent.clientY - y, innerHeight - 80))}px`; }; const end = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', end); }; document.addEventListener('pointermove', move); document.addEventListener('pointerup', end); }); win.querySelector('.close').addEventListener('click', () => win.classList.add('hidden')); win.querySelector('.minimize').addEventListener('click', () => { win.classList.add('hidden'); toast(`${win.querySelector('.titlebar span').textContent} minimized`); }); win.querySelector('.maximize').addEventListener('click', () => win.classList.toggle('maximized')); const handle = win.querySelector('.resize-handle'); handle.addEventListener('pointerdown', event => { event.preventDefault(); const rect = win.getBoundingClientRect(), startX = event.clientX, startY = event.clientY; const move = moveEvent => { win.style.width = `${Math.max(320, rect.width + moveEvent.clientX - startX)}px`; win.style.height = `${Math.max(220, rect.height + moveEvent.clientY - startY)}px`; }; const end = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', end); }; document.addEventListener('pointermove', move); document.addEventListener('pointerup', end); }); });
function updateClock() { document.querySelector('#clock').textContent = new Intl.DateTimeFormat(undefined, { weekday:'short', hour:'numeric', minute:'2-digit' }).format(new Date()); } updateClock(); setInterval(updateClock, 30000); desktop.addEventListener('pointerdown', event => { if (event.target === desktop) input.blur(); });
