# 👽 OKYAK UNBOX — by Alien Okyak

Vitrine de produtos e unboxings com links de afiliados. **Não é uma loja:** não processa pagamentos, não administra estoque e não faz entregas. É um site estático (HTML, CSS e JavaScript) que pode ser publicado gratuitamente no GitHub Pages.

**Identidade visual:** preto espacial `#090713`, roxo neon `#8c59ff`, lilás `#be8cff`, rosa `#f26bd5`, azul-ciano `#57e9e5`. Canal: https://www.youtube.com/@Alien_Okyak

## Como abrir

Extraia o arquivo ZIP e abra `index.html` no navegador. O **primeiro cartão** já inclui o link real da Shopee fornecido por você (`https://s.shopee.com.br/LoTQQzcUs`), mas o nome e a foto ainda precisam ser confirmados. Os outros seis cartões são **somente exemplos**, com ilustrações criadas para o projeto.

## Cadastrar produtos sem programar (mais fácil)

1. Abra `editor.html` no navegador. Ele permite criar, alterar, excluir e organizar seus produtos.
2. Selecione o primeiro produto (Shopee), clique em **Tentar buscar título e foto pelo link**. Se a loja bloquear, adicione a foto no botão para selecionar um arquivo, ou cole uma URL pública da foto. Complete **nome**, **categoria**, **descrição**, **link de afiliado** e (se houver) **vídeo do YouTube**. Revise os dados importados antes de publicar.
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

- **Foto:** no editor você pode escolher uma foto JPG/PNG/WebP de seu computador. Ela será redimensionada e incorporada ao `produtos.js`, sem precisar enviar arquivo separado. Também aceita uma URL HTTPS pública ou `assets/nome-da-foto.jpg` (neste caso, publique a foto na pasta). A tentativa automática usa a prévia de um serviço externo (Microlink), cuja resposta pode falhar ou apontar a imagem errada, especialmente em anúncios da Shopee.
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

- Confirme o nome/foto do primeiro produto Shopee, que já tem link de afiliado, e remova ou substitua os outros seis produtos de exemplo, que **não têm links reais**.
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

## Anúncio da Shopee adicionado

- Link recebido: https://s.shopee.com.br/LoTQQzcUs
- Identificadores encontrados ao seguir o redirecionamento: loja `1078550946`, produto `58207406631`.
- Foto/nome **não foram confirmados**: a Shopee bloqueou a extração automática pelo ambiente desta edição. Por isso o cartão foi marcado como FOTO PENDENTE e usa uma imagem ilustrativa.
- Para confirmar no navegador, abra o anúncio da Shopee, selecione uma foto autorizada do produto e coloque-a no editor. O botão **Ver na loja** conserva o link curto original de afiliado.
- O editor pode consultar um serviço externo de metadados somente quando você apertar **Tentar buscar título e foto pelo link**. Não envie dados privados pelo link.
