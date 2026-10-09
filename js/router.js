// Roteador da SPA (Single Page Application) com hash (#/rota).
// Os links do menu mudam só o que vem depois do "#", então a página não recarrega.
// O evento "hashchange" avisa o roteador, que troca o conteúdo da div #app.

const rotas = {
    "/": { titulo: "Início", template: templateInicio },
    "/projetos": { titulo: "Projetos", template: templateProjetos },
    "/cadastro": { titulo: "Cadastro", template: templateCadastro, aoCarregar: iniciarFormulario }
};

const rotaNaoEncontrada = { titulo: "Página não encontrada", template: templateNaoEncontrada };

// "#/projetos/resgate" vira { caminho: "/projetos", ancora: "resgate" }
function lerRota() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const partes = hash.split("/");
    return { caminho: "/" + (partes[1] || ""), ancora: partes[2] };
}

function marcarLinkAtivo(caminho) {
    document.querySelectorAll("nav a[data-rota]").forEach(function (link) {
        if (link.dataset.rota === caminho) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function fecharMenuMobile() {
    document.getElementById("menu-toggle").checked = false;
}

function renderizar() {
    const { caminho, ancora } = lerRota();
    const rota = rotas[caminho] || rotaNaoEncontrada;
    const app = document.getElementById("app");

    app.innerHTML = "";                                   // limpa o contêiner
    app.insertAdjacentHTML("beforeend", rota.template()); // injeta o novo fragmento

    if (rota.aoCarregar) {
        rota.aoCarregar();                                // liga a lógica da página (ex.: formulário)
    }

    document.title = "Patinhas Adoção | " + rota.titulo;
    marcarLinkAtivo(caminho);
    fecharMenuMobile();

    const alvo = ancora ? document.getElementById(ancora) : null;
    if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth" });
    } else {
        window.scrollTo(0, 0);
        app.focus({ preventScroll: true });               // leitores de tela percebem a troca de página
    }
}

// Clicar no link da página atual não muda o hash, mas o menu do celular deve fechar.
document.querySelector("nav").addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
        fecharMenuMobile();
    }
});

window.addEventListener("hashchange", renderizar);
renderizar();
