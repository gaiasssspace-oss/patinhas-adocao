// Máscaras de entrada para CPF, telefone e CEP.
// A cada digitação, mantém só os números e reaplica o formato.

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

aplicarMascara("cpf", mascaraCPF);
aplicarMascara("telefone", mascaraTelefone);
aplicarMascara("cep", mascaraCEP);

// Como o site não tem servidor, o envio só mostra uma mensagem de confirmação.
const formulario = document.getElementById("form-cadastro");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensagemSucesso.hidden = false;
    formulario.reset();
    mensagemSucesso.scrollIntoView({ behavior: "smooth", block: "center" });
});
