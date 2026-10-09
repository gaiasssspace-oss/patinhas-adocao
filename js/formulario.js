// Lógica do formulário de cadastro: máscaras, alertas e toast.

// ----- Máscaras de CPF, telefone e CEP -----
function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}

function mascaraCPF(valor) {
    const n = somenteNumeros(valor).slice(0, 11);
    return n
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function mascaraTelefone(valor) {
    const n = somenteNumeros(valor).slice(0, 11);
    if (n.length <= 10) {
        return n
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/^\((\d{2})\) (\d{4})(\d)/, "($1) $2-$3");
    }
    return n
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/^\((\d{2})\) (\d{5})(\d)/, "($1) $2-$3");
}

function mascaraCEP(valor) {
    const n = somenteNumeros(valor).slice(0, 8);
    return n.replace(/^(\d{5})(\d)/, "$1-$2");
}

function aplicarMascara(idCampo, funcaoMascara) {
    const campo = document.getElementById(idCampo);
    campo.addEventListener("input", function () {
        campo.value = funcaoMascara(campo.value);
    });
}

// ----- Toast (fica na casca da página, então é ligado uma vez só) -----
const toast = document.getElementById("toast");
const botaoFecharToast = toast.querySelector(".toast-fechar");
let temporizadorToast;

function esconderToast() {
    toast.hidden = true;
}

function mostrarToast() {
    toast.hidden = false;
    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(esconderToast, 8000);
}

botaoFecharToast.addEventListener("click", esconderToast);

// ----- Regras de validação -----
// Cada campo tem um teste (com RegEx quando o formato é fixo) e uma mensagem de erro.
function cpfValido(cpf) {
    const n = somenteNumeros(cpf);
    if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) {
        return false; // tamanho errado ou todos os dígitos iguais
    }
    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) {
            soma += Number(n[i]) * (t + 1 - i);
        }
        const digito = ((soma * 10) % 11) % 10;
        if (digito !== Number(n[t])) {
            return false; // dígito verificador não bate
        }
    }
    return true;
}

const regras = {
    nome: {
        teste: (v) => v.trim().length >= 3,
        mensagem: "Digite seu nome completo (mínimo de 3 letras)."
    },
    email: {
        teste: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
        mensagem: "Digite um e-mail válido, como nome@email.com."
    },
    cpf: {
        teste: (v) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) && cpfValido(v),
        mensagem: "CPF inválido. Confira os números (000.000.000-00)."
    },
    telefone: {
        teste: (v) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v),
        mensagem: "Digite o telefone no formato (00) 00000-0000."
    },
    nascimento: {
        teste: (v) => !isNaN(Date.parse(v)) && new Date(v) <= new Date(),
        mensagem: "Informe uma data de nascimento válida."
    },
    cep: {
        teste: (v) => /^\d{5}-\d{3}$/.test(v),
        mensagem: "Digite o CEP no formato 00000-000."
    },
    endereco: {
        teste: (v) => v.trim().length >= 5,
        mensagem: "Digite o endereço completo (rua e número)."
    },
    cidade: {
        teste: (v) => v.trim().length >= 2,
        mensagem: "Digite o nome da cidade."
    },
    estado: {
        teste: (v) => /^[A-Za-z]{2}$/.test(v),
        mensagem: "Digite a sigla do estado com 2 letras, como SP."
    }
};

// ----- Feedback visual no campo (manipulação condicional do DOM) -----
function mostrarErro(campo, texto) {
    const grupo = campo.closest(".campo");
    let aviso = grupo.querySelector(".campo-mensagem");

    if (!aviso) {
        aviso = document.createElement("small"); // cria a mensagem só quando precisa
        aviso.className = "campo-mensagem";
        aviso.id = "erro-" + campo.id;
        aviso.setAttribute("aria-live", "polite");
        grupo.appendChild(aviso);
    }

    aviso.textContent = texto;
    grupo.classList.remove("campo-ok");
    grupo.classList.add("campo-erro");
    campo.setAttribute("aria-invalid", "true");
    campo.setAttribute("aria-describedby", aviso.id);
}

function mostrarOk(campo) {
    const grupo = campo.closest(".campo");
    const aviso = grupo.querySelector(".campo-mensagem");

    if (aviso) {
        aviso.remove();
    }

    grupo.classList.remove("campo-erro");
    grupo.classList.add("campo-ok");
    campo.setAttribute("aria-invalid", "false");
    campo.removeAttribute("aria-describedby");
}

function limparEstados(formulario) {
    formulario.querySelectorAll(".campo").forEach(function (grupo) {
        grupo.classList.remove("campo-erro", "campo-ok");
        const aviso = grupo.querySelector(".campo-mensagem");
        if (aviso) {
            aviso.remove();
        }
    });
    formulario.querySelectorAll("[aria-invalid]").forEach(function (campo) {
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");
        delete campo.dataset.tocado;
    });
}

// Valida um campo e atualiza a tela. Devolve true se estiver tudo certo.
function validarCampo(campo) {
    const regra = regras[campo.id];
    if (!regra) {
        return true; // campos sem regra própria (radio, checkbox...) ficam com a validação nativa
    }

    let mensagem = "";
    if (campo.value.trim() === "") {
        mensagem = "Preencha este campo.";
    } else if (!regra.teste(campo.value)) {
        mensagem = regra.mensagem;
    } else if (!campo.validity.valid) {
        mensagem = campo.validationMessage; // ex.: data acima do limite máximo
    }

    if (mensagem) {
        mostrarErro(campo, mensagem);
        return false;
    }
    mostrarOk(campo);
    return true;
}

// ----- localStorage: cadastros guardados neste navegador -----
const CHAVE_CADASTROS = "patinhas:cadastros";

function lerCadastros() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_CADASTROS)) || []; // texto -> lista
    } catch (erro) {
        return []; // se o texto salvo estiver quebrado, começa do zero
    }
}

function salvarCadastro(cadastro) {
    const lista = lerCadastros();
    lista.push(cadastro);
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(lista)); // lista -> texto
}

function mostrarCadastrosSalvos() {
    const area = document.getElementById("cadastros-salvos");
    const lista = lerCadastros();
    area.innerHTML = "";
    if (lista.length === 0) {
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "Cadastros salvos neste navegador (" + lista.length + ")";

    const ul = document.createElement("ul");
    lista.forEach(function (cadastro) {
        const item = document.createElement("li");
        item.textContent = cadastro.nome + " (" + cadastro.tipo + ") - " + cadastro.data;
        ul.appendChild(item);
    });

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao";
    botao.textContent = "Apagar lista";
    botao.addEventListener("click", function () {
        localStorage.removeItem(CHAVE_CADASTROS);
        mostrarCadastrosSalvos();
    });

    area.append(titulo, ul, botao);
}

// ----- Formulário -----
// Os campos são criados dinamicamente quando a página "Cadastro" é aberta,
// por isso o roteador chama esta função depois de injetar o template.
function iniciarFormulario() {
    aplicarMascara("cpf", mascaraCPF);
    aplicarMascara("telefone", mascaraTelefone);
    aplicarMascara("cep", mascaraCEP);
    mostrarCadastrosSalvos(); // recupera o que ficou guardado, mesmo depois de fechar a aba

    const formulario = document.getElementById("form-cadastro");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");
    const alertaErro = document.getElementById("alerta-erro");

    // Delegação de eventos: um listener só no formulário atende todos os campos.
    // focusout: quando a pessoa sai do campo, validamos e marcamos como "já visitado".
    formulario.addEventListener("focusout", function (evento) {
        if (evento.target.matches("input, select, textarea")) {
            evento.target.dataset.tocado = "sim";
            validarCampo(evento.target);
        }
    });

    // input: depois que o campo foi visitado, a validação acompanha cada tecla (tempo real).
    formulario.addEventListener("input", function (evento) {
        if (evento.target.dataset.tocado) {
            validarCampo(evento.target);
        }
        if (formulario.checkValidity()) {
            alertaErro.hidden = true;
        }
    });

    // O evento "invalid" não "sobe" na página, por isso usamos a fase de captura (true).
    formulario.addEventListener("invalid", function (evento) {
        mensagemSucesso.hidden = true;
        alertaErro.hidden = false;
        validarCampo(evento.target);
    }, true);

    // Sem servidor: se estiver tudo certo, o envio só mostra a confirmação e limpa o formulário.
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let primeiroInvalido = null;
        formulario.querySelectorAll("input, select, textarea").forEach(function (campo) {
            if (!validarCampo(campo) && !primeiroInvalido) {
                primeiroInvalido = campo;
            }
        });

        if (primeiroInvalido) {
            mensagemSucesso.hidden = true;
            alertaErro.hidden = false;
            primeiroInvalido.focus();
            return;
        }

        const tipo = formulario.querySelector('input[name="tipo"]:checked').value;
        salvarCadastro({
            nome: document.getElementById("nome").value,
            tipo: tipo,
            data: new Date().toLocaleDateString("pt-BR")
        });

        alertaErro.hidden = true;
        mensagemSucesso.hidden = false;
        mostrarToast();
        formulario.reset();
        limparEstados(formulario);
        mostrarCadastrosSalvos();
        mensagemSucesso.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}
