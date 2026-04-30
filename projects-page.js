/* ============================================================
   projects-page.js — JS for projects.html
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

  /* Build project grid */
  const grid = document.getElementById('projGrid');

  PROJECTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'proj-card' + (p.featured ? ' featured' : '');
    card.dataset.category = p.category;
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="proj-card-wrap">
        <div class="proj-cover">
          <div class="proj-cover-bg" style="background:${p.coverGrad}"></div>
          <div class="proj-cover-text">${p.title}</div>
          <div class="proj-hover">
            <span class="proj-view-btn">View Project &rarr;</span>
          </div>
        </div>
        <div class="proj-info">
          <span class="proj-cat-tag">${p.categoryLabel}</span>
          <div class="proj-title-text">${p.title}</div>
          <div class="proj-client-text">${p.client}</div>
        </div>
      </div>`;
    card.addEventListener('click', () => {
      window.location.href = `project-detail.html?id=${p.id}`;
    });
    grid.appendChild(card);
  });

  /* Stagger reveal */
  requestAnimationFrame(() => {
    document.querySelectorAll('.proj-card').forEach(c => c.classList.add('visible'));
  });

  /* Filters */
  const filterBtns = document.querySelectorAll('#projFilters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.proj-card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f);
      });
    });
  });

  addHover(document.querySelectorAll('.proj-card, .proj-view-btn'));
