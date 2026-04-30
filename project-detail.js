/* ============================================================
   project-detail.js — JS for project-detail.html
   ============================================================ */

  /* Custom cursor */
  const dot    = document.querySelector('.cursor-dot');
  const circle = document.querySelector('.cursor-circle');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  (function tick() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    circle.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  })();
  function addHover(els) {
    els.forEach(el => {
      el.addEventListener('mouseenter', () => circle.classList.add('hover'));
      el.addEventListener('mouseleave', () => circle.classList.remove('hover'));
    });
  }
  addHover(document.querySelectorAll('a, button, [data-hover]'));

  /* Navbar */
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  /* Load project from URL ?id= */
  const params  = new URLSearchParams(location.search);
  const id      = params.get('id');
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  const nextPrj = PROJECTS.find(p => p.id === project.next) || PROJECTS[0];

  document.title = `${project.title} — Mahmoud Maher`;

  /* Hero background */
  const heroImg = document.getElementById('heroImg');
  heroImg.style.background = project.coverGrad;
  if (project.cover) {
    const img = new Image();
    img.onload = () => {
      heroImg.style.backgroundImage    = `url(${project.cover})`;
      heroImg.style.backgroundSize     = 'cover';
      heroImg.style.backgroundPosition = 'center';
      heroImg.classList.add('loaded');
    };
    img.src = project.cover;
  }

  /* Populate text fields */
  document.getElementById('detailCat').textContent      = project.categoryLabel;
  document.getElementById('detailTitle').textContent    = project.title;
  document.getElementById('metaClient').textContent     = project.client;
  document.getElementById('metaCat').textContent        = project.categoryLabel;
  document.getElementById('metaYear').textContent       = project.year;
  document.getElementById('metaTool').textContent       = project.tools[0];
  document.getElementById('detailChallenge').textContent = project.challenge;
  document.getElementById('detailSolution').textContent  = project.solution;

  /* Solutions list */
  const sg = document.getElementById('solutionsGrid');
  project.solutions.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'solution-item';
    div.innerHTML = `<span class="solution-num">0${i + 1}</span><span class="solution-text">${s}</span>`;
    sg.appendChild(div);
  });

  /* Tools */
  const tt = document.getElementById('toolsTags');
  project.tools.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tool-tag';
    span.textContent = t;
    tt.appendChild(span);
  });

  /* Gallery */
  const gg = document.getElementById('galleryGrid');
  const galleryShades = [
    project.coverGrad,
    project.coverGrad.replace('135deg', '160deg'),
    project.coverGrad.replace('135deg', '110deg'),
    project.coverGrad.replace('135deg', '180deg'),
  ];
  const galleryCount = Math.min((project.gallery || []).length || 4, 4);

  for (let i = 0; i < galleryCount; i++) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-hover', '');
    item.dataset.index = i;

    const bg = document.createElement('div');
    bg.className = 'gallery-bg';
    bg.style.background = galleryShades[i] || galleryShades[0];

    if (project.gallery && project.gallery[i]) {
      const img = new Image();
      img.onload = () => {
        bg.style.backgroundImage    = `url(${project.gallery[i]})`;
        bg.style.backgroundSize     = 'cover';
        bg.style.backgroundPosition = 'center';
      };
      img.src = project.gallery[i];
    }

    const num = document.createElement('div');
    num.className = 'gallery-num';
    num.textContent = String(i + 1).padStart(2, '0');

    item.appendChild(bg);
    item.appendChild(num);
    item.addEventListener('click', () => openLb(i, galleryShades[i], project.gallery?.[i]));
    gg.appendChild(item);
  }

  /* Next project */
  document.getElementById('nextTitle').textContent = nextPrj.title;
  document.getElementById('nextLink').href = `project-detail.html?id=${nextPrj.id}`;

  /* Lightbox */
  const lb      = document.getElementById('lb');
  const lbImg   = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');

  function openLb(idx, grad, src) {
    lbImg.style.background = grad || project.coverGrad;
    if (src) {
      lbImg.style.backgroundImage    = `url(${src})`;
      lbImg.style.backgroundSize     = 'cover';
      lbImg.style.backgroundPosition = 'center';
    }
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.style.backgroundImage = '';
  }
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

  addHover(document.querySelectorAll('.gallery-item, .solution-item, .tool-tag'));
