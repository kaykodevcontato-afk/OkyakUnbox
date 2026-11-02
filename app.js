(()=>{'use strict';
const products=Array.isArray(window.OKYAK_PRODUCTS)?window.OKYAK_PRODUCTS:[];
const grid=document.querySelector('#product-grid');const categoryHost=document.querySelector('#categories');const search=document.querySelector('#search');const count=document.querySelector('#result-count');const empty=document.querySelector('#empty-state');
let category='Todos';let query='';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=s=>{try{const u=new URL(String(s));return ['http:','https:'].includes(u.protocol)?u.href:''}catch{return ''}};
const safeImage=s=>{const t=String(s||'').trim();if(/^(?:\.\/)?(?:assets|images)\/[\w./% -]+$/i.test(t)&&!t.includes('..'))return t;if(/^data:image\/(?:svg\+xml|png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(t))return t;return safeUrl(t)};
const youtubeId=s=>{const url=safeUrl(s);if(!url)return '';try{const u=new URL(url),host=u.hostname.toLowerCase().replace(/^www\./,'');let id='';if(host==='youtu.be')id=u.pathname.slice(1).split('/')[0];else if(['youtube.com','m.youtube.com','youtube-nocookie.com','music.youtube.com'].includes(host)){if(u.pathname==='/watch')id=u.searchParams.get('v')||'';else if(/^\/(shorts|embed|live)\//.test(u.pathname))id=u.pathname.split('/')[2]||''}return /^[a-zA-Z0-9_-]{11}$/.test(id)?id:''}catch{return ''}};
const categories=['Todos',...new Set(products.map(p=>p.categoria||'Outros'))];
function renderCategories(){categoryHost.innerHTML=categories.map(c=>`<button type="button" class="category-btn ${c===category?'active':''}" data-category="${esc(c)}" aria-pressed="${c===category}">${esc(c)}</button>`).join('');}
function mediaOf(p){
  const photos=[p.imagem,...(Array.isArray(p.imagens)?p.imagens:[])].map(safeImage).filter(Boolean);
  const unique=[...new Set(photos)];
  if(!unique.length)unique.push('assets/produto.svg');
  const items=unique.map((src,i)=>({type:'photo',src,alt:`${p.nome} — foto ${i+1}`}));
  const video=youtubeId(p.youtube);
  if(video)items.push({type:'video',id:video,src:`https://img.youtube.com/vi/${video}/hqdefault.jpg`,alt:`Vídeo de ${p.nome}`});
  return items;
}
function card(p){
  const backup=safeImage(p.fallback)||'assets/produto.svg';
  const link=safeUrl(p.afiliado);
  const video=youtubeId(p.youtube);
  const media=mediaOf(p);
  const slides=media.map((m,i)=>m.type==='video'
    ? `<div class="gallery-slide ${i===0?'is-active':''}" data-index="${i}"><button type="button" class="gallery-video-preview" data-video="${esc(m.id)}" data-title="${esc(p.nome)}" aria-label="Assistir vídeo de ${esc(p.nome)}"><img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy"><span class="gallery-video-caption">▶ Assistir ao unboxing</span></button></div>`
    : `<div class="gallery-slide ${i===0?'is-active':''}" data-index="${i}"><img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy" data-backup="${esc(backup)}"><button class="gallery-expand" type="button" data-open-photo aria-label="Ampliar ${esc(m.alt)}">⤢ Ampliar</button></div>`
  ).join('');
  const thumbs=media.length>1?`<div class="gallery-thumbs" role="group" aria-label="Fotos e vídeo de ${esc(p.nome)}">${media.map((m,i)=>
    `<button type="button" class="gallery-thumb ${m.type==='video'?'gallery-thumb-video':''}" data-gallery-index="${i}" aria-pressed="${i===0}" aria-label="${m.type==='video'?'Vídeo':'Foto '+(i+1)} de ${esc(p.nome)}">${m.type==='video'?'<span>▶</span> VÍDEO':`<img src="${esc(m.src)}" alt="" loading="lazy" data-backup="${esc(backup)}">`}</button>`
  ).join('')}</div>`:'';
  const badge=p.selo?`<span class="card-badge">${esc(p.selo)}</span>`:'<span></span>';
  const buy=link?`<a class="buy-link" href="${esc(link)}" target="_blank" rel="noopener noreferrer sponsored" aria-label="Abrir ${esc(p.nome)} na loja parceira">Ver na loja <span class="external-arrow">↗</span></a>`:`<span class="buy-link disabled" title="Cadastre o link de afiliado deste produto">Link em breve <span>↗</span></span>`;
  const watch=video?`<button type="button" class="watch-link" data-video="${esc(video)}" data-title="${esc(p.nome)}" aria-label="Assistir unboxing de ${esc(p.nome)}">▶ Ver vídeo</button>`:'';
  return `<article class="product-card"><div class="product-image"><div class="gallery-track">${slides}</div><div class="card-overlays">${badge}${p.demo?'<span class="card-demo">EXEMPLO</span>':''}</div>${media.length>1?'<button class="gallery-arrow prev" type="button" data-gallery-step="-1" aria-label="Anterior">‹</button><button class="gallery-arrow next" type="button" data-gallery-step="1" aria-label="Próxima">›</button><span class="gallery-counter">1 / '+media.length+'</span>':''}</div>${thumbs}<div class="product-body"><span class="product-category">${esc(p.categoria||'Produtos')}</span><h3>${esc(p.nome)}</h3><p>${esc(p.descricao||'Confira os detalhes na loja parceira.')}</p><div class="product-details"><span>${video?'▶ Vídeo disponível':'◈ Confira o produto'}</span><span>Preço na loja ↗</span></div><div class="product-actions">${buy}${watch}</div></div></article>`;
}

function render(){const filtered=products.filter(p=>(category==='Todos'||p.categoria===category)&&[p.nome,p.categoria,p.descricao].join(' ').toLocaleLowerCase('pt-BR').includes(query));grid.innerHTML=filtered.map(card).join('');count.textContent=`${filtered.length} ${filtered.length===1?'PRODUTO ENCONTRADO':'PRODUTOS ENCONTRADOS'}`;empty.hidden=filtered.length>0;renderCategories();}
categoryHost?.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;render();}});
search?.addEventListener('input',e=>{query=e.target.value.trim().toLocaleLowerCase('pt-BR');render();});
document.querySelector('#clear-filters')?.addEventListener('click',()=>{category='Todos';query='';search.value='';render();search.focus()});
const dialog=document.querySelector('#video-dialog');const dialogHost=document.querySelector('#dialog-video');
function openVideo(id,name){if(!id||!dialog)return;document.querySelector('#dialog-title').textContent=name;const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;iframe.title='Vídeo do YouTube: '+name;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;dialogHost.replaceChildren(iframe);dialog.showModal();}
function gallerySet(card,index){
  const slides=[...card.querySelectorAll('.gallery-slide')];if(!slides.length)return;
  const next=((index%slides.length)+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===next));
  card.dataset.photoIndex=String(next);
  card.querySelectorAll('.gallery-thumb').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===next)));
  const counter=card.querySelector('.gallery-counter');if(counter)counter.textContent=`${next+1} / ${slides.length}`;
}
const photoDialog=document.querySelector('#photo-dialog');
const photoFull=document.querySelector('#photo-full');
let modalPhotos=[],modalIndex=0;
function showModalPhoto(){const item=modalPhotos[modalIndex];if(!item)return;
  photoFull.src=item.src;photoFull.alt=item.alt;
  document.querySelector('#photo-count').textContent=`FOTO ${modalIndex+1} DE ${modalPhotos.length}`;
  document.querySelector('#photo-prev').disabled=modalPhotos.length<2;
  document.querySelector('#photo-next').disabled=modalPhotos.length<2;
}
function shiftModal(n){if(!modalPhotos.length)return;modalIndex=(modalIndex+n+modalPhotos.length)%modalPhotos.length;showModalPhoto()}
function openPhoto(card,button){
  modalPhotos=[...card.querySelectorAll('.gallery-slide:not(:has(.gallery-video-preview)) > img')].map(img=>({src:img.currentSrc||img.src,alt:img.alt}));
  const src=button.closest('.gallery-slide')?.querySelector('img')?.src;
  modalIndex=Math.max(0,modalPhotos.findIndex(x=>x.src===src));
  document.querySelector('#photo-title').textContent=card.querySelector('h3')?.textContent||'Produto';
  showModalPhoto();photoDialog?.showModal();
}
grid?.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const card=b.closest('.product-card');
  if(b.hasAttribute('data-gallery-index'))return gallerySet(card,Number(b.dataset.galleryIndex));
  if(b.hasAttribute('data-gallery-step'))return gallerySet(card,Number(card.dataset.photoIndex||'0')+Number(b.dataset.galleryStep));
  if(b.hasAttribute('data-open-photo'))return openPhoto(card,b);
  if(b.dataset.video)return openVideo(b.dataset.video,b.dataset.title);
});
// Swipe sideways on touchscreen to move between product images.
let touchStart=null;
grid?.addEventListener('touchstart',e=>{
  const stage=e.target.closest('.product-image');
  if(stage&&e.touches.length===1&&!e.target.closest('button'))touchStart={stage,x:e.touches[0].clientX,y:e.touches[0].clientY};
  else touchStart=null;
},{passive:true});
grid?.addEventListener('touchend',e=>{
  if(!touchStart||!e.changedTouches.length)return;
  const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;
  if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3){const card=touchStart.stage.closest('.product-card');gallerySet(card,Number(card.dataset.photoIndex||'0')+(dx<0?1:-1));}
  touchStart=null;
},{passive:true});
grid?.addEventListener('error',e=>{
  const img=e.target;
  if(img.tagName==='IMG'&&img.dataset.backup&&img.src!==new URL(img.dataset.backup,location.href).href){img.src=img.dataset.backup;delete img.dataset.backup;}
},true);
document.querySelector('#photo-close')?.addEventListener('click',()=>photoDialog?.close());
document.querySelector('#photo-prev')?.addEventListener('click',()=>shiftModal(-1));
document.querySelector('#photo-next')?.addEventListener('click',()=>shiftModal(1));
photoDialog?.addEventListener('click',e=>{if(e.target===photoDialog)photoDialog.close()});
photoDialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();shiftModal(e.key==='ArrowRight'?1:-1)}});

function closeVideo(){dialog?.close();dialogHost.replaceChildren();}document.querySelector('#close-dialog')?.addEventListener('click',closeVideo);dialog?.addEventListener('close',()=>dialogHost.replaceChildren());dialog?.addEventListener('click',e=>{if(e.target===dialog)closeVideo()});
const firstWithVideo=products.find(p=>youtubeId(p.youtube));const featured=document.querySelector('#featured-video');if(firstWithVideo&&featured){const id=youtubeId(firstWithVideo.youtube);featured.innerHTML=`<button class="video-thumb" type="button" aria-label="Assistir ${esc(firstWithVideo.nome)}"><img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="Miniatura do vídeo ${esc(firstWithVideo.nome)}" loading="lazy"></button>`;featured.querySelector('button').addEventListener('click',()=>openVideo(id,firstWithVideo.nome));}
const menuButton=document.querySelector('.menu-toggle');const mobileMenu=document.querySelector('#mobile-menu');menuButton?.addEventListener('click',()=>{const expand=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(expand));mobileMenu.hidden=!expand});mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false')}));
document.querySelector('#year').textContent=new Date().getFullYear();render();
})();
