/* ============================================================
   main.js — Cursor, navigation, marquee, portfolio, lightbox
   ============================================================ */

  /* Custom cursor */
  const dot = document.querySelector('.cursor-dot');
  const circle = document.querySelector('.cursor-circle');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let cx = mx, cy = my;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  (function tick() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    circle.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => circle.classList.add('hover'));
    el.addEventListener('mouseleave', () => circle.classList.remove('hover'));
  });

  /* Cycling phrase crossfade */
  const phrases = document.querySelectorAll('#cyclePhrase .phrase');
  let pIdx = 0;
  setInterval(() => {
    phrases[pIdx].classList.remove('active');
    pIdx = (pIdx + 1) % phrases.length;
    phrases[pIdx].classList.add('active');
  }, 2500);


  /* Marquee builder */
  const ROW1 = ['GAC Motor','Royal Commission Makkah','Al Matar','Chevrolet','Flamingo Pets','ABAZA Auto','Neauvia','ServMoi','Souvlaki','Bronx'];
  const ROW2 = ['King Merryland','Loogle','Elevado Tower','alBaraka Foods','Alfred & Mina','Sports For All','Türk Fabrikası','Wothoq Technologies','فقيه Medical','Bahy Center'];

  function buildMarquee(trackEl, names) {
    function makeSet() {
      const frag = document.createDocumentFragment();
      names.forEach(name => {
        const item = document.createElement('span');
        item.className = 'marquee-item';
        item.innerHTML = `<span class="marquee-name">${name}</span><span class="marquee-dot"></span>`;
        frag.appendChild(item);
      });
      return frag;
    }
    trackEl.appendChild(makeSet());
    trackEl.appendChild(makeSet());
  }

  buildMarquee(document.getElementById('marqueeTrack1'), ROW1);
  buildMarquee(document.getElementById('marqueeTrack2'), ROW2);


  /* Navbar scroll + hamburger */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  addEventListener('scroll', () => {
    if (scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  /* Netflix Carousel */
  const CATEGORIES = [
    { key: 'key',    label: 'Key Visuals'  },
    { key: 'social', label: 'Social Media' },
    { key: 'film',   label: 'Film Posters' },
    { key: 'info',   label: 'Infographics' },
  ];

  const WORKS = [
    { cat: 'key',    catLabel: 'Key Visuals',  name: 'Solar Campaign',  grad: 'linear-gradient(135deg,#1a1a2e,#16213e)' },
    { cat: 'key',    catLabel: 'Key Visuals',  name: 'Urban Pulse',     grad: 'linear-gradient(135deg,#1a0a0a,#2d1515)' },
    { cat: 'key',    catLabel: 'Key Visuals',  name: 'Crimson Peak',    grad: 'linear-gradient(135deg,#2e1a1a,#3d1616)' },
    { cat: 'key',    catLabel: 'Key Visuals',  name: 'Azure Drift',     grad: 'linear-gradient(135deg,#0a1a2e,#112233)' },
    { cat: 'key',    catLabel: 'Key Visuals',  name: 'Emerald City',    grad: 'linear-gradient(135deg,#0a1f0a,#153015)' },
    { cat: 'key',    catLabel: 'Key Visuals',  name: 'Gold Rush',       grad: 'linear-gradient(135deg,#2e2a0a,#3d3510)' },
    { cat: 'social', catLabel: 'Social Media', name: 'Velvet Pulse',    grad: 'linear-gradient(135deg,#0f3460,#533483)' },
    { cat: 'social', catLabel: 'Social Media', name: 'Neon Markets',    grad: 'linear-gradient(135deg,#0a1a0a,#152d15)' },
    { cat: 'social', catLabel: 'Social Media', name: 'Blue Wave',       grad: 'linear-gradient(135deg,#0a0a1a,#15152d)' },
    { cat: 'social', catLabel: 'Social Media', name: 'Pink Neon',       grad: 'linear-gradient(135deg,#2a0a1a,#3d1525)' },
    { cat: 'social', catLabel: 'Social Media', name: 'Cyber Glow',      grad: 'linear-gradient(135deg,#0a1a2a,#102030)' },
    { cat: 'social', catLabel: 'Social Media', name: 'Sunset Vibes',    grad: 'linear-gradient(135deg,#2a1a0a,#3d2510)' },
    { cat: 'film',   catLabel: 'Film Posters', name: 'Crimson Hour',    grad: 'linear-gradient(135deg,#1a1a1a,#2d2d2d)' },
    { cat: 'film',   catLabel: 'Film Posters', name: 'Black Tide',      grad: 'linear-gradient(135deg,#1a1500,#2d2500)' },
    { cat: 'film',   catLabel: 'Film Posters', name: 'Dark Matter',     grad: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)' },
    { cat: 'film',   catLabel: 'Film Posters', name: 'Quiet Storm',     grad: 'linear-gradient(135deg,#1a0a2e,#250a3d)' },
    { cat: 'film',   catLabel: 'Film Posters', name: 'Blood Moon',      grad: 'linear-gradient(135deg,#2e0a0a,#3d1010)' },
    { cat: 'film',   catLabel: 'Film Posters', name: 'Silver Screen',   grad: 'linear-gradient(135deg,#1a1a2e,#25253d)' },
    { cat: 'info',   catLabel: 'Infographics', name: 'Data Bloom',      grad: 'linear-gradient(135deg,#0d1b2a,#1b2838)' },
    { cat: 'info',   catLabel: 'Infographics', name: 'Flow States',     grad: 'linear-gradient(135deg,#1a0a1a,#2d152d)' },
    { cat: 'info',   catLabel: 'Infographics', name: 'Market Pulse',    grad: 'linear-gradient(135deg,#0a2a1a,#103020)' },
    { cat: 'info',   catLabel: 'Infographics', name: 'Tech Trends',     grad: 'linear-gradient(135deg,#0a0a2a,#101030)' },
    { cat: 'info',   catLabel: 'Infographics', name: 'Growth Chart',    grad: 'linear-gradient(135deg,#1a2a0a,#203010)' },
    { cat: 'info',   catLabel: 'Infographics', name: 'Stats Visual',    grad: 'linear-gradient(135deg,#2a1a0a,#301a08)' },
  ];

  const nfSection = document.getElementById('netflixSection');
  const rowEls = {};

  CATEGORIES.forEach(({ key, label }) => {
    const row = document.createElement('div');
    row.className = 'nf-row';
    row.id = 'nf-' + key;

    const header = document.createElement('div');
    header.className = 'nf-row-header';
    header.innerHTML = `
      <span class="nf-row-title">${label}</span>
      <div class="nf-arrows">
        <button class="nf-arrow nf-arrow--prev" aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button class="nf-arrow nf-arrow--next" aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    `;

    const wrap = document.createElement('div');
    wrap.className = 'nf-track-wrap';

    const track = document.createElement('div');
    track.className = 'nf-track';

    WORKS.filter(w => w.cat === key).forEach(w => {
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'nf-card';
      card.style.setProperty('--grad', w.grad);
      card.setAttribute('data-hover', '');
      card.innerHTML = `
        <div class="nf-thumb" style="background:${w.grad}"></div>
        <div class="nf-overlay">
          <div class="nf-cat">${w.catLabel}</div>
          <div class="nf-name">${w.name}</div>
          <div class="nf-view">View Project</div>
        </div>
      `;
      card.addEventListener('click', e => { e.preventDefault(); openLightbox(w); });
      track.appendChild(card);
    });

    /* Drag to scroll */
    let isDragging = false, dragStartX = 0, scrollStart = 0;
    track.addEventListener('mousedown', e => {
      isDragging = true; dragStartX = e.clientX; scrollStart = track.scrollLeft;
      track.style.scrollBehavior = 'auto';
    });
    addEventListener('mousemove', e => {
      if (!isDragging) return;
      track.scrollLeft = scrollStart - (e.clientX - dragStartX);
    });
    addEventListener('mouseup', () => {
      isDragging = false;
      track.style.scrollBehavior = 'smooth';
    });

    /* Arrow buttons */
    const scrollAmt = 640;
    header.querySelector('.nf-arrow--prev').addEventListener('click', () => {
      track.scrollLeft -= scrollAmt;
    });
    header.querySelector('.nf-arrow--next').addEventListener('click', () => {
      track.scrollLeft += scrollAmt;
    });

    wrap.appendChild(track);
    row.appendChild(header);
    row.appendChild(wrap);
    nfSection.appendChild(row);
    rowEls[key] = row;
  });

  /* Filters — highlight + scroll to row */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      Object.values(rowEls).forEach(r => r.classList.remove('highlighted'));
      if (f === 'all') return;
      const target = rowEls[f];
      if (!target) return;
      target.classList.add('highlighted');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* Lightbox */
  const lightbox = document.getElementById('lightbox');
  const lbThumb = document.getElementById('lightboxThumb');
  const lbCat = document.getElementById('lightboxCat');
  const lbName = document.getElementById('lightboxName');
  const lbClose = document.getElementById('lightboxClose');

  function openLightbox(w) {
    lbThumb.style.background = w.grad;
    lbThumb.style.aspectRatio = '2/3';
    lbCat.textContent = w.catLabel;
    lbName.textContent = w.name;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* Re-bind cursor hover for all interactive elements */
  document.querySelectorAll('.tag, .about a, .nf-card, .nf-arrow, .filter-btn, .nav a, .hamburger, .lightbox-close').forEach(el => {
    el.addEventListener('mouseenter', () => circle.classList.add('hover'));
    el.addEventListener('mouseleave', () => circle.classList.remove('hover'));
  });
