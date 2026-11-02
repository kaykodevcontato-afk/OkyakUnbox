# 👽 OKYAK UNBOX — by Alien Okyak

Vitrine de produtos e unboxings com links de afiliados. **Não é uma loja:** não processa pagamentos, não administra estoque e não faz entregas. É um site estático (HTML, CSS e JavaScript) que pode ser publicado gratuitamente no GitHub Pages.

**Identidade visual:** preto espacial `#090713`, roxo neon `#8c59ff`, lilás `#be8cff`, rosa `#f26bd5`, azul-ciano `#57e9e5`. Canal: https://www.youtube.com/@Alien_Okyak

## Como abrir

Extraia o arquivo ZIP e abra `index.html` no navegador. Os seis cartões iniciais são **somente exemplos**, com ilustrações criadas para o projeto; links de compras e vídeos estão vazios por segurança. Quando você cadastrar um produto real, substitua o conteúdo e a imagem.

## Cadastrar produtos sem programar (mais fácil)

1. Abra `editor.html` no navegador. Ele permite criar, alterar, excluir e organizar seus produtos.
2. Preencha **nome**, **categoria**, **descrição**, **link da foto**, **fotos extras (uma por linha)**, **link de afiliado** e, se existir, **link do vídeo no YouTube**.
3. Clique em **Baixar produtos.js**.
4. **Substitua** o arquivo `produtos.js` da pasta principal pelo arquivo que você baixou.
5. Abra `index.html` novamente para ver os novos cartões.
6. Ao publicar no GitHub Pages, atualize também o `produtos.js` no repositório e aguarde o GitHub publicar a nova versão.

**Importante:** o editor salva rascunhos apenas *no navegador onde foi usado*. Não cria um painel on-line, não atualiza automaticamente o site dos visitantes e não armazena dados na nuvem. O site público não mostra esse editor e você pode deixar `editor.html` fora do repositório de publicação.

## Cadastrar manualmente

Abra `produtos.js` e altere um item no array `window.OKYAK_PRODUCTS`. Exemplo:

```js
{
  id: "fone-01",
  nome: "Fone Bluetooth Modelo XYZ",
  categoria: "Áudio",
  descricao: "Breve explicação do produto.",
  imagem: "assets/meu-fone.jpg", // ou URL https://... de foto autorizada
  fallback: "assets/produto.svg",
  afiliado: "https://LINK-REAL-DO-SEU-PROGRAMA-DE-AFILIADOS",
  youtube: "https://www.youtube.com/watch?v=SEU_VIDEO", // opcional
  selo: "UNBOXING",
  destaque: true,
  demo: false
}
```

- **Foto:** use uma URL pública HTTPS ou salve uma imagem `.jpg/.png/.webp` em `assets/` e escreva `assets/nome-da-foto.jpg`. Ao publicar no GitHub, envie a foto junto.
- **Vídeo:** aceita `youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/shorts/...` e `/live/...`; com o link válido aparece o botão **▶ Ver vídeo**. Um vídeo também passa a aparecer em destaque na seção Unboxings.
- **Afiliado:** sem link, o botão fica **Link em breve**. Com URL HTTPS válida, abre a loja em outra aba.
- **Preço:** não é exibido, para evitar valores desatualizados. O cliente consulta o preço real na loja.
- **Categoria:** as opções de filtro são criadas automaticamente a partir dos produtos.

## Publicar no GitHub Pages (gratuito)

1. Crie um repositório público no GitHub, por exemplo `okyak-unbox`.
2. Envie `index.html`, `style.css`, `app.js`, `produtos.js` e a pasta `assets/` (com fotos utilizadas).
3. No repositório, entre em **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Selecione `main` e `/ (root)`, depois salve. Seu endereço deve seguir o formato `https://SEU-USUARIO.github.io/okyak-unbox/`.
5. Compartilhe a página na descrição do canal, no perfil e nos vídeos. Confirme o endereço exato na tela do GitHub Pages.

## Recomendações antes de divulgar

- Remova ou substitua os seis produtos de exemplo, que **não têm links reais**.
- Só use fotos de fornecedores, catálogos ou materiais para os quais você tem autorização de uso. Verifique as regras do programa de afiliados escolhido.
- Não diga que testou um produto sem ter testado. Quando não houver vídeo próprio, deixe o campo YouTube vazio.
- Se você participa de programas de afiliados, mantenha visível a informação sobre comissões e cumpra os termos das plataformas.
- Confira os links e os preços finais nas lojas. Frete, estoque, pagamento e suporte da compra não pertencem ao Okyak Unbox.
- Se quiser adicionar um domínio próprio, configure-o no GitHub Pages e no provedor do domínio.

## Arquivos

- `index.html` — landing page
- `style.css` — identidade visual e responsividade
- `app.js` — filtros, busca, vídeos e links de afiliados
- `produtos.js` — catálogo publicado
- `editor.html` — editor de produtos local (opcional; não precisa publicar)
- `assets/` — ícones e ilustrações de demonstração

---
Site demonstrativo criado para o universo **Alien Okyak**. Atualize os links de produtos antes de divulgar ao público.


## Correção do zoom e galeria (versão atualizada)

- Corrigimos `style.css`: todas as imagens dos produtos usam **object-fit: contain** e não aumentam ao passar o mouse. O card pode levantar suavemente, mas a fotografia nunca é ampliada.
- A galeria tem setas, miniaturas e visualização ampliada (também sem cortes). No celular, deslize para trocar de foto.
- Para adicionar imagens, edite `produtos.js`: `imagem` é a foto principal e `imagens` é um array com fotos extras. O editor `editor.html` também tem o campo **Fotos extras**, uma URL/caminho por linha.
- Quando `youtube` tiver URL válida, a última miniatura da galeria abre o unboxing no mesmo site.
- O produto **Controle 8BitDo Ultimate 2** já foi incluído com o link de afiliado compartilhado anteriormente. **Sua fotografia real não foi enviada**; adicione `assets/controle 8bitdo ultimate2.webp` na pasta `assets/` para ela aparecer. Enquanto isso, será exibido o desenho reserva `assets/controle.svg` (não uma foto do produto).
- Para subir no GitHub Pages, substitua **index.html, style.css, app.js, produtos.js e assets/** no repositório. O `editor.html` é opcional, útil apenas para você.
- **Atenção:** seu site publicado pode usar uma versão do `index.html` diferente da versão enviada aqui. Se quiser manter exatamente os cartões cadastrados diretamente no HTML público e corrigir apenas o zoom, **envie somente o novo `style.css`** ao GitHub; as regras finais também funcionam nessa versão. Para ativar a galeria neste pacote, use os arquivos completos e migre/adapte o catálogo para `produtos.js`.
