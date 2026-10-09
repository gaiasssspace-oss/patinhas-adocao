# Patinhas Adoção

Site de uma ONG fictícia de resgate e adoção de cães e gatos, feito como SPA (página única) com HTML, CSS e JavaScript puro.

## Sobre o projeto

A Patinhas Adoção apresenta a ONG, seus projetos solidários (resgate, feira de adoção, castração solidária e lar temporário) e um formulário de cadastro de voluntários e doadores.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (Grid de 12 colunas, Flexbox, variáveis e media queries)
- JavaScript puro: roteamento por hash, templates dinâmicos, validação de formulário e localStorage
- Google Fonts, carregado por CDN
- Git e GitHub

## Estrutura de pastas

- index.html (na raiz): redireciona para html/index.html
- html/index.html: casca da aplicação (cabeçalho, menu, rodapé e a div #app)
- css/style.css: todo o visual do site
- js/dados.js: lista de projetos
- js/templates.js: funções que geram o HTML das páginas
- js/formulario.js: máscaras, validação, toast e localStorage
- js/router.js: roteamento da SPA
- images/: imagens do site

## Como executar localmente

Pré-requisitos: um navegador atualizado. Opcional: VS Code com a extensão Live Server.

1. Baixe o projeto em Code > Download ZIP, ou clone com git clone.
2. Extraia o zip e abra a pasta no VS Code (File > Open Folder).
3. Abra o arquivo html/index.html com o Live Server (botão Go Live) ou com dois cliques no navegador.
4. Navegue pelo menu para testar as páginas.

Não há dependências para instalar, nem etapa de build, nem testes automatizados. Os testes foram feitos manualmente no navegador.

## Versionamento

- Branches (GitFlow): main (versão estável), develop (desenvolvimento) e feature/validacao-formulario
- Mensagens de commit no padrão Conventional Commits (docs:, feat:, fix:)
- Versionamento semântico (MAJOR.MINOR.PATCH): versão atual v1.0.0, com a milestone v1.1.0 planejada
