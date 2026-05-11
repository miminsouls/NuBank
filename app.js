const flowers = [
  { img:'flores/semilla.png',    level:'Nivel 1 — Semilla',    msg:'Tu dinero está listo para crecer',  pct:15,  next:'Próximo: Germinando', mini:'flores/semilla.png' },
  { img:'flores/germinando.png', level:'Nivel 2 — Germinando', msg:'Tu dinero empezó a crecer',         pct:40,  next:'Próximo: Planta',     mini:'flores/germinando.png' },
  { img:'flores/planta.png',     level:'Nivel 3 — Planta',     msg:'Vas muy bien. Sigue cultivando',   pct:70,  next:'Próximo: Flor',       mini:'flores/planta.png' },
  { img:'flores/flor.png',       level:'Nivel 4 — Flor',       msg:'¡Tu siembra florece!',              pct:100, next:'¡Meta cumplida!',     mini:'flores/flor.png' },
  { img:'flores/marchita.png',   level:'Alerta — Marchita',    msg:'Tu dinero necesita atención',       pct:5,   next:'Retoma tu siembra',   mini:'flores/marchita.png' },
];

let currentState = 1;

function setFlower(i) {
  currentState = i;
  const f = flowers[i];
  document.getElementById('flower-main').src = f.img;
  document.getElementById('flower-level-label').textContent = f.level;
  document.getElementById('flower-msg').textContent = f.msg;
  document.getElementById('progress-fill').style.width = f.pct + '%';
  document.getElementById('progress-pct').textContent = f.pct + '% → ' + f.next;
  document.getElementById('mini-flower').src = f.mini;
  document.getElementById('home-level').textContent = f.level;

  // Glow effect based on state
  const flowerEl = document.getElementById('flower-main');
  if (i === 3) flowerEl.style.filter = 'drop-shadow(0 0 24px #C084FC88)';
  else if (i === 4) flowerEl.style.filter = 'grayscale(0.4) drop-shadow(0 0 12px #FFB02044)';
  else flowerEl.style.filter = 'drop-shadow(0 0 16px #2EE59D66)';

  // Disable sembrar on marchita
  document.getElementById('btn-sembrar').disabled = (i === 4);

  document.querySelectorAll('.tab').forEach((c, j) => c.classList.toggle('active', j === i));
}

function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 's-feedback') {
    const f = flowers[Math.min(currentState, 3)];
    document.getElementById('feedback-img').src = f.img;
    document.getElementById('feedback-sub').textContent =
      currentState >= 3 ? '¡Alcanzaste el nivel Flor! 🌸' : 'Estás más cerca de tu primera flor';
    spawnParticles();
  }
}

function setNav(activeId) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(activeId).classList.add('active');
}

function selectDest(el) {
  document.querySelectorAll('.destino-opt').forEach(d => {
    d.classList.remove('selected');
    d.querySelector('.opt-radio').classList.remove('on');
  });
  el.classList.add('selected');
  el.querySelector('.opt-radio').classList.add('on');
}

function updatePreview() {
  const v = parseInt(document.getElementById('monto-input').value) || 0;
  const box = document.getElementById('preview-box');
  if (v >= 50000) box.textContent = '¡Tu flor crecerá al siguiente nivel!';
  else if (v > 0) box.textContent = 'Tu siembra está creciendo poco a poco';
  else box.textContent = 'Tu flor crecerá al siguiente nivel';
}

function sembrar() {
  const next = Math.min(currentState + 1, 3);
  setFlower(next);
  if (next === 3) setTimeout(showLogro, 2000);
  goTo('s-feedback');
}

function spawnParticles() {
  const c = document.getElementById('particles');
  c.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (40 + Math.random() * 40) + '%';
    p.style.animationDelay = Math.random() * 1 + 's';
    p.style.width = p.style.height = (6 + Math.random() * 8) + 'px';
    p.style.background = Math.random() > 0.5 ? '#2EE59D' : '#C084FC';
    c.appendChild(p);
  }
}

function showLogro() {
  document.getElementById('modal-logro').classList.add('show');
}

function closeLogro() {
  document.getElementById('modal-logro').classList.remove('show');
}
