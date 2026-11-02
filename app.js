/* OKYAK UNBOX — Os produtos ficam no index.html, dentro de #product-grid. */
(() => {
  'use strict';
  const grid = document.querySelector('#product-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.product-card')];
  const categoryHost = document.querySelector('#categories');
  const search = document.querySelector('#search');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const featured = document.querySelector('#featured-video');
  const dialog = document.querySelector('#video-dialog');
  const dialogHost = document.querySelector('#dialog-video');
  let category = 'Todos';
  let query = '';

  const validHttpUrl = (raw) => {
    try {
      const url = new URL(String(raw || '').trim());
      return ['https:', 'http:'].includes(url.protocol) && !!url.hostname;
    } catch { return false; }
  };
  const youtubeId = (raw) => {
    if (!validHttpUrl(raw)) return '';
    try {
      const url = new URL(raw);
      const host = url.hostname.toLowerCase().replace(/^www\./, '');
      let id = '';
      if (host === 'youtu.be') id = url.pathname.split('/')[1] || '';
      else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'music.youtube.com'].includes(host)) {
        if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
        else if (/^\/(shorts|embed|live)\//.test(url.pathname)) id = url.pathname.split('/')[2] || '';
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : '';
    } catch { return ''; }
  };

  function openVideo(id, title) {
    if (!id || !dialog || !dialogHost) return;
    document.querySelector('#dialog-title').textContent = title;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = `Vídeo do YouTube: ${title}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    dialogHost.replaceChildren(iframe);
    dialog.showModal();
  }
  function closeVideo() { dialog?.close(); dialogHost?.replaceChildren(); }
  document.querySelector('#close-dialog')?.addEventListener('click', closeVideo);
  dialog?.addEventListener('close', () => dialogHost?.replaceChildren());
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) closeVideo(); });

  // Ajusta automaticamente links, miniaturas, botões de vídeo e categorias.
  for (const card of cards) {
    const title = card.querySelector('h3')?.textContent?.trim() || 'Produto';
    const buy = card.querySelector('.buy-link');
    const affiliateUrl = buy?.getAttribute('href')?.trim() || '';
    if (buy) {
      if (!validHttpUrl(affiliateUrl)) {
        buy.removeAttribute('href');
        buy.setAttribute('aria-disabled', 'true');
        buy.classList.add('disabled');
        buy.innerHTML = 'Link em breve <span class="external-arrow">↗</span>';
      } else {
        buy.target = '_blank';
        buy.rel = 'noopener noreferrer sponsored';
        buy.setAttribute('aria-label', `Abrir ${title} na loja parceira`);
      }
    }
    const img = card.querySelector('.product-image img');
    img?.addEventListener('error', () => {
      if (img.getAttribute('src') !== 'assets/produto.svg') img.src = 'assets/produto.svg';
    });
    const id = youtubeId(card.dataset.youtube?.trim());
    card.dataset.videoId = id;
    const watch = card.querySelector('.watch-link');
    const status = card.querySelector('.product-video-status');
    if (id && watch) {
      watch.hidden = false;
      watch.setAttribute('aria-label', `Assistir unboxing de ${title}`);
      watch.addEventListener('click', () => openVideo(id, title));
      if (status) status.textContent = '▶ Vídeo disponível';
    } else if (watch) {
      watch.hidden = true;
    }
  }

  const categories = ['Todos', ...new Set(cards.map(c => c.dataset.category || 'Outros'))];
  function renderCategories() {
    if (!categoryHost) return;
    categoryHost.replaceChildren();
    for (const name of categories) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category-btn' + (name === category ? ' active' : '');
      button.textContent = name;
      button.setAttribute('aria-pressed', String(name === category));
      button.addEventListener('click', () => { category = name; render(); });
      categoryHost.append(button);
    }
  }
  function render() {
    let shown = 0;
    for (const card of cards) {
      const data = (card.querySelector('.product-body')?.textContent || '').toLocaleLowerCase('pt-BR');
      const match = (category === 'Todos' || card.dataset.category === category) && data.includes(query);
      card.hidden = !match;
      if (match) shown++;
    }
    if (count) count.textContent = `${shown} ${shown === 1 ? 'PRODUTO ENCONTRADO' : 'PRODUTOS ENCONTRADOS'}`;
    if (empty) empty.hidden = shown > 0;
    renderCategories();
  }
  search?.addEventListener('input', (event) => { query = event.target.value.trim().toLocaleLowerCase('pt-BR'); render(); });
  document.querySelector('#clear-filters')?.addEventListener('click', () => {
    category = 'Todos'; query = '';
    if (search) { search.value = ''; search.focus(); }
    render();
  });

  const firstWithVideo = cards.find(c => c.dataset.videoId);
  if (firstWithVideo && featured) {
    const id = firstWithVideo.dataset.videoId;
    const title = firstWithVideo.querySelector('h3')?.textContent?.trim() || 'Unboxing';
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'video-thumb';
    thumb.setAttribute('aria-label', `Assistir ${title}`);
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    img.alt = `Miniatura do vídeo ${title}`;
    img.loading = 'lazy';
    thumb.append(img);
    thumb.addEventListener('click', () => openVideo(id, title));
    featured.replaceChildren(thumb);
  }
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  menuButton?.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    if (mobileMenu) mobileMenu.hidden = !expanded;
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  render();
})();
