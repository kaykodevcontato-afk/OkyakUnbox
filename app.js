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

  // Visor de fotos em tamanho maior: preserva proporção, sem cortes.
  const photoDialog = document.querySelector('#photo-dialog');
  const photoDialogImg = document.querySelector('#photo-dialog-img');
  const photoDialogTitle = document.querySelector('#photo-dialog-title');
  const photoDialogCount = document.querySelector('#photo-dialog-count');
  const photoPrev = document.querySelector('#photo-prev');
  const photoNext = document.querySelector('#photo-next');
  let photoList = [];
  let photoIndex = 0;

  function showPhoto() {
    const item = photoList[photoIndex];
    if (!item || !photoDialogImg) return;
    photoDialogImg.src = item.src;
    photoDialogImg.alt = item.alt || 'Foto do produto';
    if (photoDialogCount) photoDialogCount.textContent = `FOTO ${photoIndex + 1} / ${photoList.length}`;
    if (photoPrev) photoPrev.disabled = photoList.length <= 1;
    if (photoNext) photoNext.disabled = photoList.length <= 1;
  }
  function shiftPhoto(direction) {
    if (photoList.length < 2) return;
    photoIndex = (photoIndex + direction + photoList.length) % photoList.length;
    showPhoto();
  }
  function openPhoto(card, currentImg) {
    if (!photoDialog || !photoDialogImg || typeof photoDialog.showModal !== 'function') return;
    const images = [...card.querySelectorAll('.gallery-slide:not(.gallery-video) img')];
    photoList = images.map(img => ({src:img.currentSrc || img.src, alt:img.alt}));
    photoIndex = Math.max(0, images.indexOf(currentImg));
    if (photoDialogTitle) photoDialogTitle.textContent = card.querySelector('h3')?.textContent?.trim() || 'Foto do produto';
    showPhoto();
    photoDialog.showModal();
  }
  photoPrev?.addEventListener('click', () => shiftPhoto(-1));
  photoNext?.addEventListener('click', () => shiftPhoto(1));
  document.querySelector('#close-photo')?.addEventListener('click', () => photoDialog?.close());
  photoDialog?.addEventListener('click', e => { if (e.target === photoDialog) photoDialog.close(); });
  photoDialog?.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); shiftPhoto(e.key === 'ArrowRight' ? 1 : -1);
    }
  });

  function addSwipe(el, onSwipe) {
    let start = null;
    el.addEventListener('touchstart', e => {
      if (e.touches.length !== 1 || e.target.closest('button')) { start = null; return; }
      start = {x:e.touches[0].clientX, y:e.touches[0].clientY};
    }, {passive:true});
    el.addEventListener('touchend', e => {
      if (!start || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - start.x;
      const dy = e.changedTouches[0].clientY - start.y;
      start = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) onSwipe(dx < 0 ? 1 : -1);
    }, {passive:true});
  }
  if (photoDialog) addSwipe(photoDialog.querySelector('.photo-dialog-main'), shiftPhoto);

  // Cada foto é uma .gallery-slide definida no próprio HTML.
  // O vídeo é adicionado automaticamente como último slide (quando data-youtube é válido).
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

    const id = youtubeId(card.dataset.youtube?.trim());
    card.dataset.videoId = id;
    const watch = card.querySelector('.watch-link');
    const status = card.querySelector('.product-video-status');
    if (id && watch) {
      watch.hidden = false;
      watch.setAttribute('aria-label', `Assistir unboxing de ${title}`);
      watch.addEventListener('click', () => openVideo(id, title));
      if (status) status.textContent = '▶ Vídeo disponível na galeria';
    } else if (watch) {
      watch.hidden = true;
    }

    const gallery = card.querySelector('.product-gallery');
    const stage = gallery?.querySelector('.product-image');
    const slideHost = gallery?.querySelector('.gallery-slides');
    if (!gallery || !stage || !slideHost) continue;

    // Espaços de fotos extras que ainda estão com src="" são ignorados.
    // Assim você já tem campos prontos no HTML sem gerar imagens quebradas.
    for (const slide of slideHost.querySelectorAll('.gallery-slide')) {
      const img = slide.querySelector('img');
      if (!img || !img.getAttribute('src')?.trim()) slide.remove();
    }
    gallery.setAttribute('role', 'group');
    gallery.setAttribute('aria-label', `Fotos e vídeo: ${title}`);

    // Corrige as fotos faltantes, sem entrar em ciclo de erro.
    for (const img of slideHost.querySelectorAll('.gallery-slide img')) {
      img.addEventListener('error', () => {
        if (!img.src.endsWith('/assets/produto.svg')) img.src = 'assets/produto.svg';
      });
    }

    if (id) {
      const videoSlide = document.createElement('div');
      videoSlide.className = 'gallery-slide gallery-video';
      const cover = document.createElement('button');
      cover.type = 'button';
      cover.className = 'gallery-video-cover';
      cover.setAttribute('aria-label', `Reproduzir vídeo de ${title}`);
      const thumbnail = document.createElement('img');
      thumbnail.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      const icon = document.createElement('span');
      icon.className = 'gallery-play';
      icon.textContent = '▶';
      const label = document.createElement('strong');
      label.textContent = 'ASSISTIR AO VÍDEO';
      cover.append(thumbnail, icon, label);
      cover.addEventListener('click', () => openVideo(id, title));
      videoSlide.append(cover);
      slideHost.append(videoSlide);
    }

    const slides = [...slideHost.querySelectorAll('.gallery-slide')];
    if (!slides.length) continue;
    const thumbnails = document.createElement('div');
    thumbnails.className = 'gallery-strip';
    thumbnails.setAttribute('aria-label', `Selecionar fotos de ${title}`);
    const arrowPrev = document.createElement('button');
    arrowPrev.type = 'button'; arrowPrev.className = 'gallery-arrow prev';
    arrowPrev.textContent = '‹'; arrowPrev.setAttribute('aria-label', `Imagem anterior de ${title}`);
    const arrowNext = document.createElement('button');
    arrowNext.type = 'button'; arrowNext.className = 'gallery-arrow next';
    arrowNext.textContent = '›'; arrowNext.setAttribute('aria-label', `Próxima imagem de ${title}`);
    const counter = document.createElement('span');
    counter.className = 'gallery-counter'; counter.setAttribute('aria-live', 'polite');
    const zoom = document.createElement('button');
    zoom.type = 'button'; zoom.className = 'photo-zoom'; zoom.textContent = '⤢ Ampliar';
    zoom.setAttribute('aria-label', `Ampliar foto de ${title}`);
    stage.append(arrowPrev, arrowNext, counter, zoom);
    gallery.append(thumbnails);

    const buttons = slides.map((slide, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'gallery-thumb';
      button.setAttribute('aria-label', `Ver ${slide.classList.contains('gallery-video') ? 'vídeo' : 'foto ' + (i + 1)} de ${title}`);
      if (slide.classList.contains('gallery-video')) {
        button.classList.add('video-thumb-mini');
        const icon = document.createElement('span'); icon.textContent = '▶';
        const text = document.createElement('small'); text.textContent = 'VÍDEO';
        button.append(icon, text);
      } else {
        const srcImg = slide.querySelector('img');
        const mini = document.createElement('img');
        mini.src = srcImg?.getAttribute('src') || 'assets/produto.svg';
        mini.alt = '';
        mini.loading = 'lazy';
        mini.addEventListener('error', () => {
          if (!mini.src.endsWith('/assets/produto.svg')) mini.src = 'assets/produto.svg';
        });
        button.append(mini);
      }
      button.addEventListener('click', () => show(i));
      thumbnails.append(button);
      return button;
    });
    let current = 0;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== current; });
      buttons.forEach((button, i) => {
        button.setAttribute('aria-current', String(i === current));
      });
      counter.textContent = `${current + 1} / ${slides.length}`;
      zoom.hidden = slides[current].classList.contains('gallery-video');
    }
    arrowPrev.addEventListener('click', () => show(current - 1));
    arrowNext.addEventListener('click', () => show(current + 1));
    zoom.addEventListener('click', () => {
      const img = slides[current].querySelector('img');
      if (img && !slides[current].classList.contains('gallery-video')) openPhoto(card, img);
    });
    gallery.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault(); show(current + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });
    addSwipe(stage, direction => show(current + direction));
    if (slides.length < 2) {
      arrowPrev.hidden = true; arrowNext.hidden = true;
      thumbnails.hidden = true; counter.hidden = true;
    }
    show(0);
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
