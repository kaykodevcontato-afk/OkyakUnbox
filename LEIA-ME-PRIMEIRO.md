# OKYAK UNBOX — CATALOGO EDITÁVEL DIRETAMENTE NO HTML

Versão com foto inteira sem zoom, galerias de várias fotos, vídeos opcionais,
links de afiliados, menu fixo de categorias e 5 blocos prontos para novos produtos.

## OPÇÃO A — MAIS SIMPLES: editar o index.html

Abra `index.html` no VS Code, Bloco de Notas ou outro editor e procure
`PRODUTO 01`, `PRODUTO 02` etc. Há 6 produtos no arquivo: 1 com
link real da Shopee (8BitDo) e 5 espaços EXEMPLO para preencher.

**Dentro de cada `<article class="product-card">` você encontra:**

1. **Categoria:** `data-category="Gamer"`. Altere também o texto `<span class="product-category">Gamer</span>`. Escolha apenas: **Gamer, Tecnologia, Setup, Acessórios ou Moda**.
2. **Vídeo do YouTube (opcional):** `data-youtube=""`. Preencha com `https://www.youtube.com/watch?v=ID_DO_VIDEO` para mostrar um slide de vídeo na galeria e o botão Ver vídeo.
3. **Foto principal:** `<img src="assets/minha-foto.webp" ...>` — a imagem deve existir em `assets/`.
4. **Foto extra 2:** `<img src="" ...>` — substitua `""` por `"assets/minha-foto-2.webp"`.
5. **Foto extra 3 e 4:** faça o mesmo. Deixe vazias as que não tiver. Fotos não preenchidas não aparecem. Para mais fotos, copie outra linha `<div class="gallery-slide">...</div>`.
6. **Título:** `<h3>Nome do produto</h3>`.
7. **Descrição:** `<p>Descrição ...</p>` dentro de `<div class="product-body">`.
8. **Link de afiliado:** coloque seu link em `href="https://..."` no `<a class="buy-link">`. Se deixar `href=""`, o botão fica indisponível.
9. **Selo:** altere `<span class="card-badge">SHOPEE</span>` e remova o marcador `<span class="card-demo">EXEMPLO — EDITE AQUI</span>` depois de cadastrar o produto real.

**PARA ADICIONAR O PRODUTO 07, 08...** Copie desde `<article class="product-card" ...>` até o `</article>` correspondente e cole logo antes do fechamento `</div>` da seção `id="product-grid"`. Também incluí `MODELO-PRODUTO-PARA-COPIAR.html` com um bloco completo.

## OPÇÃO B — USAR EDITOR.html (sem editar código)

1. Abra `editor.html` no navegador.
2. Escolha `index.html` clicando em **Carregar index.html** (o navegador não pode ler o arquivo local sem você selecionar).
3. Selecione um produto para alterar ou clique em **Novo produto**.
4. Preencha título, descrição, categoria, foto principal, fotos extras (uma por linha), vídeo e afiliado.
5. Clique em **Salvar alterações no catálogo** e depois **Baixar index.html atualizado**.
6. Substitua o `index.html` original pelo novo arquivo baixado.

O editor não publica no GitHub automaticamente; seu catálogo é salvo dentro do HTML exportado.

## IMPORTANTE: IMAGEM DO CONTROLE 8BITDO

A foto original NÃO estava nos anexos. O HTML aponta para:
`assets/controle 8bitdo ultimate2.webp`.
Se o arquivo não existir, o navegador mostra um desenho de reserva.
Coloque a foto com esse nome em `assets/` ou altere o `src` para o nome correto.

## GitHub Pages

No seu repositório `OkyakUnbox23`, substitua **index.html, style.css, app.js** e envie a pasta **assets** com as fotos. O arquivo `editor.html` é opcional e pode ser mantido apenas no seu computador. Não precisa de `produtos.js`: os produtos desta versão ficam no HTML (não misture sistemas de catálogo diferentes).

A vitrine não vende diretamente nem controla estoque. Ao publicar fotos/links, verifique as permissões e regras dos programas de afiliados. O preço e a entrega pertencem às lojas.

## MENU DE CATEGORIAS (ATUALIZADO)

O catálogo agora exibe sempre nesta ordem: **Todos | Gamer | Tecnologia | Setup | Acessórios | Moda**.
A categoria **Moda** aparece mesmo que ainda não tenha produtos. Quando estiver vazia, o site mostra a mensagem de nenhum produto encontrado.
Os produtos que antes estavam como **Games** foram convertidos para **Gamer**; o espaço de **Áudio** foi colocado em **Tecnologia**.

**Importante:** ao criar produtos, use exatamente um desses cinco nomes no atributo `data-category` e no texto `.product-category`. O botão **Todos** é automático, não deve ser utilizado como categoria de um produto. O editor `editor.html` agora oferece as categorias em um seletor.
