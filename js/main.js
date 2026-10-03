/* PACELINE – progressive enhancement. The pages work without JS; this adds behaviour. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Mobile navigation toggle
  const btn = $('.menu-btn'), nav = $('#nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); btn.focus(); }
  });

  // Hero slider: cycles the headline copy; pauses for reduced-motion users
  const hero = $('.hero');
  if (hero) {
    const slides = [
      ['Autumn / Winter \u201926 collection', 'Chase<br>Every Second.', 'Race-day gear, trail-tested essentials, and everyday kit \u2014 curated by runners, worn on every terrain.'],
      ['New in this week', 'Fresh Foam,<br>Fast Feet.', 'The season\u2019s new road and trail shoes have landed, hand-picked by our Glasgow team.'],
      ['Free every Saturday', 'Run Smarter.<br>Run Longer.', 'Book a free gait analysis and get laced into the right pair, first time.']
    ];
    const els = ['.hero .kicker', '.hero h1', '.hero .lead'].map(s => $(s));
    const dots = $$('.dots button');
    let i = 0, timer;
    const show = n => {
      i = n;
      els.forEach(e => e.classList.add('out'));
      setTimeout(() => {
        els.forEach((e, k) => { e.innerHTML = slides[n][k]; e.classList.remove('out'); });
        dots.forEach((d, k) => d.setAttribute('aria-current', k === n));
      }, 300);
    };
    const play = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => show((i + 1) % slides.length), 6000); };
    dots.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', play);
    play();
  }

  // Arrivals filter chips
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    $$('.product').forEach(p => { p.hidden = c.dataset.filter !== 'all' && !p.dataset.tags.split(' ').includes(c.dataset.filter); });
  }));

  // Sort products by price (shop pages)
  const sort = $('#sort');
  if (sort) {
    const grid = $('#grid');
    $$('.product', grid).forEach((p, i) => p.dataset.i = i);
    sort.addEventListener('change', () => {
      const d = sort.value === 'asc' ? 1 : -1;
      $$('.product', grid)
        .sort((a, b) => sort.value ? (a.dataset.price - b.dataset.price) * d : a.dataset.i - b.dataset.i)
        .forEach(p => grid.append(p));
    });
  }

  // Wishlist hearts also update the header badge-free state
  $$('.heart').forEach(h => h.addEventListener('click', () => {
    const on = h.getAttribute('aria-pressed') !== 'true';
    h.setAttribute('aria-pressed', on);
  }));

  // Newsletter validation
  const f = $('.news form');
  f.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('input', f), msg = $('.msg', f.parentElement);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    msg.classList.toggle('err', !ok);
    msg.textContent = ok ? 'Thanks! Check your inbox for your 10% code.' : 'Enter a valid email address, like name@example.com.';
    if (ok) f.reset(); else input.focus();
  });
})();
