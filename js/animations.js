/* ============================================================
   animations.js — Hero cards & scroll reveal animations
   ============================================================ */

  /* Cards data — 5 placeholder gradients */
  const CARDS = [
    { cat: 'Film Poster', title: 'Crimson Hour', grad: 'linear-gradient(135deg, #6B0F1A 0%, #1a1a1a 100%)' },
    { cat: 'Key Visual',  title: 'Northern Echo', grad: 'linear-gradient(135deg, #0a3d62 0%, #060f1a 100%)' },
    { cat: 'AI Concept',  title: 'Neon Verdant',  grad: 'linear-gradient(135deg, #0b6b3a 0%, #051f12 100%)' },
    { cat: 'Social Campaign', title: 'Velvet Pulse', grad: 'linear-gradient(135deg, #4a1d6b 0%, #110620 100%)' },
    { cat: 'Brand Identity', title: 'Solar Drift', grad: 'linear-gradient(135deg, #b8741a 0%, #1f1206 100%)' },
  ];

  /* Curved arrangement: x offset, y offset (curve), rotateY, z, base delay */
  const POSITIONS = [
    { x: -440, y: 70,  ry: 28,  z: -120, delay: 0.6 },
    { x: -220, y: 30,  ry: 14,  z: -40,  delay: 0.8 },
    { x: 0,    y: 0,   ry: 0,   z: 40,   delay: 1.0 },
    { x: 220,  y: 30,  ry: -14, z: -40,  delay: 1.2 },
    { x: 440,  y: 70,  ry: -28, z: -120, delay: 1.4 },
  ];

  const row = document.getElementById('cardsRow');
  const cardEls = [];

  CARDS.forEach((c, i) => {
    const p = POSITIONS[i];
    const el = document.createElement('a');
    el.href = '#work';
    el.className = 'card';
    el.setAttribute('data-hover', '');
    const rest = `translateX(calc(-50% + ${p.x}px)) translateY(${p.y}px) translateZ(${p.z}px) rotateY(${p.ry}deg)`;
    el.style.setProperty('--rest', rest);
    el.style.transform = rest;
    el.style.animationDelay = p.delay + 's';
    el.dataset.phase = (i * 1.1).toString();
    el.dataset.basex = p.x;
    el.dataset.basey = p.y;
    el.dataset.basez = p.z;
    el.dataset.ry   = p.ry;

    el.innerHTML = `
      <div class="img" style="background: ${c.grad}"></div>
      <div class="tint"></div>
      <div class="overlay"></div>
      <div class="meta">
        <div class="cat">${c.cat}</div>
        <div class="title">${c.title}</div>
      </div>
    `;
    row.appendChild(el);
    cardEls.push(el);
  });

  /* Float animation + mouse parallax */
  let parX = 0, parY = 0;
  let curParX = 0, curParY = 0;

  addEventListener('mousemove', e => {
    parX = (e.clientX / innerWidth - 0.5) * 2;   // -1 .. 1
    parY = (e.clientY / innerHeight - 0.5) * 2;
  });

  const start = performance.now();
  function animateCards(now) {
    const t = (now - start) / 1000;
    curParX += (parX - curParX) * 0.06;
    curParY += (parY - curParY) * 0.06;

    for (const el of cardEls) {
      const phase = parseFloat(el.dataset.phase);
      const bx = parseFloat(el.dataset.basex);
      const by = parseFloat(el.dataset.basey);
      const bz = parseFloat(el.dataset.basez);
      const ry = parseFloat(el.dataset.ry);

      const floatY = Math.sin(t * 0.9 + phase) * 14;
      const floatX = Math.cos(t * 0.6 + phase) * 6;
      const px = curParX * 28;
      const py = curParY * 18;

      const rest = `translateX(calc(-50% + ${bx + floatX + px}px)) translateY(${by + floatY + py}px) translateZ(${bz}px) rotateY(${ry - curParX * 4}deg) rotateX(${-curParY * 3}deg)`;
      el.style.setProperty('--rest', rest);
      if (!el.matches(':hover')) {
        el.style.transform = rest;
      }
    }
    requestAnimationFrame(animateCards);
  }
  requestAnimationFrame(animateCards);


  /* Scroll reveal sections */
  const sections = document.querySelectorAll('.reveal-section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // trigger count-up on stats inside
        e.target.querySelectorAll('.count').forEach(startCount);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  sections.forEach(s => io.observe(s));

  function startCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const v = Math.floor(ease(p) * target);
      el.textContent = target >= 1000
        ? v.toLocaleString()
        : (v < 10 ? '0' + v : v);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target >= 1000 ? target.toLocaleString() : (target < 10 ? '0' + target : target);
    }
    requestAnimationFrame(step);
  }

