# OKYAK UNBOX — vídeos do YouTube escolhidos aleatoriamente

Esta versão usa o HTML atualizado enviado por você (5 produtos reais e 1 modelo oculto), preservando fotos, categorias, os links de afiliado da Shopee, galerias e correções do zoom.

## Como funciona

A seção **Unboxings**, que antes mostrava “Seu próximo unboxing pode aparecer aqui”, agora sorteia um vídeo da lista `okyak-videos-list` no **final do `index.html`** sempre que a página abre. O player do YouTube tenta começar **automaticamente sem áudio**; alguns navegadores podem exigir o clique em Play. O visitante pode ativar som nos controles do player, clicar em **Outro vídeo** para sortear outro (sem repetição consecutiva) ou abrir o vídeo no YouTube.

## Como cadastrar vídeos do canal

Procure no final do `index.html` a seção **VÍDEOS DO CANAL PARA SORTEIO** e edite a lista:

```html
<script type="application/json" id="okyak-videos-list">
[
  {"url":"https://youtu.be/SEU_VIDEO_REAL_1","titulo":"Meu vídeo 1"},
  {"url":"https://www.youtube.com/watch?v=SEU_VIDEO_REAL_2","titulo":"Meu vídeo 2"}
]
</script>
```

Use links completos de vídeos **públicos com incorporação permitida**. Se a lista estiver vazia, o site tentará os vídeos de unboxing `data-youtube` cadastrados nos produtos. Para buscar automaticamente **todos os vídeos do canal, inclusive os novos**, sem manutenção de lista, seria necessária uma integração com a YouTube Data API e configuração adicional (ou backend). Este site estático não faz isso.

### Links iniciais

Os 3 links iniciais aparecem em publicações do perfil público @Alien_Okyak, que aponta para o canal `youtube.com/@Alien_Okyak`. Não foi possível verificar no YouTube se cada vídeo é um upload desse canal ou permite incorporação; **confira os links antes de publicar** e substitua se necessário.

### Publicação no GitHub

Envie `index.html`, `style.css` e `app.js` atualizados para o repositório. Não é necessário substituir sua pasta `assets` — mantenha todas as fotografias originais e arquivos `.webp`. O ZIP inclui os SVGs de exemplo, mas **não inclui as fotos reais dos produtos** (não foram enviadas aqui). Pressione Ctrl+F5 após atualizar o GitHub Pages.
