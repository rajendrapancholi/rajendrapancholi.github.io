/* TYPED TEXT (HERO ROLES) */
const roles = [
  'MERN Stack Developer',
  'React Native Engineer',
  'Cybersecurity Researcher',
  'Full Stack Builder',
  'Bug Hunter',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
setTimeout(typeLoop, 1600);


/* TERMINAL ANIMATION */
const termLines = [
  { type: 'cmd',  text: 'nmap -sV --script=vuln 192.168.1.0/24', delay: 1400 },
  { type: 'out',  text: 'Starting Nmap scan...', delay: 2200 },
  { type: 'hi',   text: '[+] Host is up (0.00034s latency)', delay: 2900 },
  { type: 'ok',   text: 'PORT   STATE SERVICE   VERSION', delay: 3500 },
  { type: 'out',  text: '80/tcp open  http      nginx 1.24', delay: 3700 },
  { type: 'out',  text: '443/tcp open  ssl/http  nginx 1.24', delay: 3900 },
  { type: 'cmd',  text: 'git push origin main --force', delay: 5000 },
  { type: 'ok',   text: '✓ Deployed to production', delay: 5800 },
  { type: 'cmd',  text: 'raje --build --secure --ship', delay: 7000 },
  { type: 'hi',   text: '>> RAJE v2.0 online 🚀', delay: 7700 },
];

const termBody = document.getElementById('terminalBody');
termLines.forEach(({ type, text, delay }) => {
  setTimeout(() => {
    const span = document.createElement('span');
    span.className = 't-line';
    const isCmd = type === 'cmd';
    span.innerHTML = isCmd
      ? `<span class="prompt">~/raje $</span> <span class="cmd">${text}</span>`
      : `<span class="${type}">${text}</span>`;
    termBody.appendChild(span);
    termBody.scrollTop = termBody.scrollHeight;
    // Loop terminal after last line
    if (delay === 7700) {
      setTimeout(() => {
        termBody.innerHTML = '';
        termLines.forEach(({ type: t2, text: tx, delay: dl }) => {
          setTimeout(() => {
            const s2 = document.createElement('span');
            s2.className = 't-line';
            const ic = t2 === 'cmd';
            s2.innerHTML = ic
              ? `<span class="prompt">~/raje $</span> <span class="cmd">${tx}</span>`
              : `<span class="${t2}">${tx}</span>`;
            termBody.appendChild(s2);
            termBody.scrollTop = termBody.scrollHeight;
          }, dl);
        });
      }, 4000);
    }
  }, delay);
});


/* PARTICLE CANVAS */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

const DOTS = 60;
const dots = Array.from({ length: DOTS }, () => ({
  x:  Math.random() * W,
  y:  Math.random() * H,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  r:  Math.random() * 1.5 + 0.5,
}));

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,204,0.4)';
    ctx.fill();
  });

  // Connecting lines between nearby dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(0,255,204,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});


/* SCROLL REVEAL */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));


/* NAV SCROLL SHRINK */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* MOBILE NAV TOGGLE */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* MAGNETIC BUTTONS */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


/* GLITCH ON HERO NAME HOVER */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.animation = 'glitch 0.4s steps(2) 3';
  });
  heroName.addEventListener('animationend', () => {
    heroName.style.animation = '';
  });
}

const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
@keyframes glitch {
  0%   { text-shadow: 2px 0 #00FFCC, -2px 0 #6B00FF; filter: none; }
  25%  { text-shadow: -2px 0 #00FFCC, 2px 0 #6B00FF; filter: hue-rotate(20deg); }
  50%  { text-shadow: 3px 0 #00FFCC, -3px 0 #6B00FF; letter-spacing: -0.05em; }
  75%  { text-shadow: -2px 0 #00FFCC, 2px 0 #6B00FF; }
  100% { text-shadow: none; letter-spacing: -0.03em; }
}`;
document.head.appendChild(glitchStyle);


/* SMOOTH ACTIVE NAV */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--cyan)' : '';
  });
});
document.querySelector('.footer-copy').textContent = `© ${new Date().getFullYear()} — Built with intent`;