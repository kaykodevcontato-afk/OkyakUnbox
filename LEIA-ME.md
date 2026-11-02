# OKYAK UNBOX — Adicionar produtos diretamente no HTML

Esta versão permite cadastrar e alterar **foto, título, descrição, link de afiliado e vídeo** diretamente no arquivo **`index.html`**, sem precisar do editor ou do arquivo `produtos.js`.

## Onde editar

1. Extraia o ZIP.
2. Abra **`index.html`** no VS Code, Bloco de Notas ou outro editor de código.
3. Procure por `id="product-grid"` ou `PRODUTO 01`.
4. Cada bloco que começa com `<article class="product-card"` e termina com `</article>` é **um produto**. Para criar outro, copie um bloco inteiro e cole antes de `<!-- COLE AQUI ... -->`.
5. Dentro do bloco, altere:
   - **Foto:** `<img src="assets/minha-foto.jpg" ...>` (ponha o arquivo na pasta `assets`) ou uma URL de imagem autorizada (`https://.../foto.jpg`).
   - **Título:** `<h3>Nome do produto</h3>`.
   - **Descrição:** `<p>Descrição do produto</p>`.
   - **Link:** `<a class="buy-link" href="https://SEU-LINK-DE-AFILIADO" ...>`.
   - **Categoria:** altere **os dois** campos `data-category="Tecnologia"` e `<span class="product-category">Tecnologia</span>`.
   - **Vídeo opcional:** no começo do bloco use `data-youtube="https://www.youtube.com/watch?v=SEU_ID"`. Sem vídeo, deixe `data-youtube=""`.
   - **Etiqueta:** troque o texto em `<span class="card-badge">SHOPEE</span>`.
6. Salve e abra `index.html` no navegador para ver o resultado. Atualize a página com Ctrl+F5 se necessário.

## Primeiro produto da Shopee

O primeiro card já contém seu link `https://s.shopee.com.br/LoTQQzcUs`. **Ainda não foi possível confirmar foto nem nome automaticamente**; por isso há um ícone temporário e a indicação `FOTO PENDENTE`. Substitua essas informações depois de conferi-las no anúncio. Você também pode remover a etiqueta `FOTO PENDENTE` apagando `<span class="card-demo">FOTO PENDENTE</span>`.

Os cards 2 e 3 são **apenas exemplos**, sem link de compra. Depois de cadastrar produtos verdadeiros, substitua ou apague os exemplos. Para remover o aviso `EXEMPLO`, apague `<span class="card-demo">EXEMPLO</span>`.

## Vídeo do YouTube

O site aceita `https://www.youtube.com/watch?v=...`, `https://youtu.be/...`, links de **Shorts** e de **live**, desde que o ID do vídeo seja válido. Ao preencher o atributo `data-youtube`, aparece automaticamente o botão **▶ Ver vídeo**; o primeiro vídeo também passa a aparecer em destaque na seção de unboxing. O autor do vídeo pode desautorizar incorporação, então confira o resultado.

## Publicar no GitHub Pages

Envie `index.html`, `style.css`, `app.js` e **toda a pasta** `assets/` para o repositório. Se usar uma foto nova, envie esse arquivo para `assets/` também. Para atualizar o catálogo, basta enviar a nova versão do `index.html` (e fotos novas, se houver). Nenhum banco de dados ou estoque é necessário.

## Avisos importantes

- O site não vende diretamente nem processa pagamento. O botão abre o site da loja.
- Os preços e a disponibilidade são verificados na loja.
- Confira as permissões de uso das fotos, as regras de afiliados e a precisão das descrições.
- O link é **manual** nesta versão; o HTML não tenta extrair automaticamente fotos ou dados da Shopee.
- Só indique como testado ou unboxing próprio aquilo que realmente filmou/testou.
