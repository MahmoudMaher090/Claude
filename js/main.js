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

  /* Portfolio grid */
  const WORKS = [
    { cat: 'key',    catLabel: 'Key Visuals',   name: 'Project 01', grad: 'linear-gradient(135deg, #1a1a2e, #16213e)', ratio: '2/3' },
    { cat: 'social', catLabel: 'Social Media',  name: 'Project 02', grad: 'linear-gradient(135deg, #0f3460, #533483)', ratio: '2/3' },
    { cat: 'film',   catLabel: 'Film Posters',  name: 'Project 03', grad: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', ratio: '2/3' },
    { cat: 'info',   catLabel: 'Infographics',  name: 'Project 04', grad: 'linear-gradient(135deg, #0d1b2a, #1b2838)', ratio: '2/3' },
    { cat: 'key',    catLabel: 'Key Visuals',   name: 'Project 05', grad: 'linear-gradient(135deg, #1a0a0a, #2d1515)', ratio: '2/3' },
    { cat: 'social', catLabel: 'Social Media',  name: 'Project 06', grad: 'linear-gradient(135deg, #0a1a0a, #152d15)', ratio: '2/3' },
    { cat: 'film',   catLabel: 'Film Posters',  name: 'Project 07', grad: 'linear-gradient(135deg, #1a1500, #2d2500)', ratio: '2/3' },
    { cat: 'social', catLabel: 'Social Media',  name: 'Project 08', grad: 'linear-gradient(135deg, #0a0a1a, #15152d)', ratio: '2/3' },
    { cat: 'info',   catLabel: 'Infographics',  name: 'Project 09', grad: 'linear-gradient(135deg, #1a0a1a, #2d152d)', ratio: '2/3' },
  ];

  const grid = document.getElementById('grid');
  WORKS.forEach((w, i) => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'work';
    a.dataset.cat = w.cat;
    a.style.setProperty('--i', i);
    a.style.setProperty('--ratio', w.ratio);
    a.style.setProperty('--grad', w.grad);
    a.setAttribute('data-hover', '');
    a.innerHTML = `
      <div class="thumb"></div>
      <div class="label">
        <div class="cat">${w.catLabel}</div>
        <div class="name">${w.name}</div>
        <div class="view">View Project</div>
      </div>
    `;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(w);
    });
    grid.appendChild(a);
  });

  /* Filters */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      const works = document.querySelectorAll('.work');
      works.forEach(w => w.classList.add('filter-out'));
      setTimeout(() => {
        works.forEach(w => {
          const show = f === 'all' || w.dataset.cat === f;
          w.classList.toggle('hidden', !show);
        });
        requestAnimationFrame(() => {
          works.forEach(w => w.classList.remove('filter-out'));
        });
      }, 280);
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
    lbThumb.style.aspectRatio = w.ratio;
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
  document.querySelectorAll('.tag, .about a, .work, .filter-btn, .nav a, .hamburger, .lightbox-close').forEach(el => {
    el.addEventListener('mouseenter', () => circle.classList.add('hover'));
    el.addEventListener('mouseleave', () => circle.classList.remove('hover'));
  });
