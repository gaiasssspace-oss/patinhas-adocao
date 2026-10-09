// Templates (modelos de página) da SPA.
// Cada função devolve um pedaço de HTML que o roteador injeta na div #app.

// ----- Componentes reutilizáveis -----
function criarBadges(badges) {
    const itens = badges
        .map((badge) => `<span class="badge badge-${badge.tipo}">${badge.texto}</span>`)
        .join("");
    return `<div class="badges">${itens}</div>`;
}

function criarCartaoProjeto(projeto) {
    const acoes = projeto.acoes.map((acao) => `<li>${acao}</li>`).join("");
    return `
        <article id="${projeto.id}" class="col-12 col-md-6 col-xl-3">
            ${criarBadges(projeto.badges)}
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <h4>Como participar</h4>
            <ul>${acoes}</ul>
        </article>`;
}

// ----- Páginas -----
function templateInicio() {
    return `
        <div class="pagina">
            <div class="grid">
            <section class="col-12 col-lg-7">
                <h2>Quem são os animais que esperam por você</h2>
                <p>Nas ruas de São Paulo, <abbr title="São Paulo">SP</abbr>, cães e gatos são deixados à própria sorte todos os dias. Muitos chegam até nós machucados, com medo e sem confiar em ninguém. A <strong>Patinhas Adoção</strong> acolhe cada um deles, garantindo abrigo seguro, alimentação e atendimento veterinário até que encontrem uma família.</p>
                <p>Por trás de cada resgate existe uma história de superação.<br>Você pode ser quem vai escrever o próximo capítulo.</p>
            </section>

            <section class="col-12 col-lg-5">
                <h2>Como acolhemos cada animal</h2>
                <figure>
                    <img src="../images/acolhimento.jpg" alt="Animal resgatado sendo acolhido no abrigo da Patinhas Adoção">
                    <figcaption>Um novo começo para cada patinha resgatada.</figcaption>
                </figure>
            </section>

            <section class="chamada col-12 col-lg-7">
                <h2>Venha fazer parte dessa causa</h2>
                <p>Adote, seja voluntário ou contribua com uma doação. Cada gesto, por menor que pareça, transforma a vida de um animal.</p>
                <p><a class="botao" href="#/cadastro">Quero me cadastrar</a></p>
            </section>

            <section class="col-12 col-lg-5">
                <h2>Fale com a gente</h2>
                <address>
                    <p><strong>Patinhas Adoção</strong></p>
                    <p>Endereço: Rua das Palmeiras, 120 – São Paulo, SP</p>
                    <p>Telefone: <a href="tel:+5511912345678">(11) 91234-5678</a></p>
                    <p>E-mail: <a href="mailto:contato@patinhasadocao.org.br">contato@patinhasadocao.org.br</a></p>
                </address>
            </section>
            </div>
        </div>`;
}

function templateProjetos() {
    const cartoes = projetos.map(criarCartaoProjeto).join("");
    return `
        <div class="pagina">
            <section>
                <h2>Nossos projetos</h2>
                <p>Cada iniciativa da Patinhas Adoção nasce de uma necessidade real dos animais e da comunidade. Conheça o que fazemos e descubra como participar.</p>

                <div class="alerta alerta-sucesso">
                    <strong>Inscrições abertas!</strong> Estamos recebendo novos voluntários para todos os projetos.
                </div>

                <div class="alerta alerta-aviso">
                    <strong>Atenção:</strong> as vagas de lar temporário são limitadas. Faça o seu cadastro para entrar na lista de espera.
                </div>

                <div class="projetos grid">${cartoes}</div>
            </section>

            <section class="chamada">
                <h2>Quer ajudar?</h2>
                <p>Escolha como participar e preencha o cadastro. Entraremos em contato.</p>
                <p><a class="botao" href="#/cadastro">Ir para o cadastro</a></p>
            </section>
        </div>`;
}

function templateCadastro() {
    return `
        <div class="pagina">
            <section>
                <h2>Cadastro de voluntários e doadores</h2>
                <p>Preencha os dados abaixo para fazer parte da Patinhas Adoção. Os campos marcados com <span class="obrigatorio" aria-hidden="true">*</span> são obrigatórios.</p>

                <div class="alerta alerta-info">
                    <strong>Seus dados estão protegidos.</strong> Usamos as informações apenas para entrar em contato sobre voluntariado e doações.
                </div>

                <form id="form-cadastro" action="#" method="post">
                    <div class="grid">
                    <fieldset class="col-12 col-lg-6">
                        <legend>Dados pessoais</legend>

                        <div class="campo">
                            <label for="nome">Nome completo <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="text" id="nome" name="nome" required minlength="3" maxlength="100" autocomplete="name" placeholder="Digite seu nome completo">
                        </div>

                        <div class="campo">
                            <label for="email">E-mail <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="email" id="email" name="email" required autocomplete="email" placeholder="exemplo@email.com">
                        </div>

                        <div class="campo">
                            <label for="cpf">CPF <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="text" id="cpf" name="cpf" required inputmode="numeric" maxlength="14" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" title="Digite o CPF no formato 000.000.000-00" placeholder="000.000.000-00">
                        </div>

                        <div class="campo">
                            <label for="telefone">Telefone <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="tel" id="telefone" name="telefone" required inputmode="numeric" maxlength="15" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" title="Digite o telefone no formato (00) 00000-0000" autocomplete="tel" placeholder="(00) 00000-0000">
                        </div>

                        <div class="campo">
                            <label for="nascimento">Data de nascimento <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="date" id="nascimento" name="nascimento" required max="2008-12-31">
                        </div>
                    </fieldset>

                    <fieldset class="col-12 col-lg-6">
                        <legend>Endereço</legend>

                        <div class="campo">
                            <label for="cep">CEP <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="text" id="cep" name="cep" required inputmode="numeric" maxlength="9" pattern="\\d{5}-\\d{3}" title="Digite o CEP no formato 00000-000" autocomplete="postal-code" placeholder="00000-000">
                        </div>

                        <div class="campo">
                            <label for="endereco">Endereço <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="text" id="endereco" name="endereco" required maxlength="120" autocomplete="address-line1" placeholder="Rua, número e complemento">
                        </div>

                        <div class="campo">
                            <label for="cidade">Cidade <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="text" id="cidade" name="cidade" required maxlength="60" value="São Paulo">
                        </div>
                        <div class="campo">
                            <label for="estado">Estado (UF) <span class="obrigatorio" aria-hidden="true">*</span></label>
                            <input type="text" id="estado" name="estado" required maxlength="2" pattern="[A-Za-z]{2}" title="Digite a sigla do estado com 2 letras, por exemplo: SP" value="SP">
                        </div>
                    </fieldset>

                    <fieldset class="col-12">
                        <legend>Como você quer ajudar?</legend>

                        <div class="opcoes">
                            <label><input type="radio" name="tipo" value="voluntario" required> Quero ser voluntário(a)</label>
                            <label><input type="radio" name="tipo" value="doador"> Quero ser doador(a)</label>
                        </div>

                        <div class="campo">
                            <label for="interesse">Projeto de interesse</label>
                            <select id="interesse" name="interesse">
                                <option value="">Selecione uma opção</option>
                                <option value="resgate">Resgate de animais</option>
                                <option value="feira">Feira de adoção</option>
                                <option value="castracao">Castração solidária</option>
                                <option value="lar-temporario">Lar temporário</option>
                            </select>
                        </div>

                        <div class="campo">
                            <label for="mensagem">Mensagem</label>
                            <textarea id="mensagem" name="mensagem" rows="4" maxlength="500" placeholder="Conte um pouco sobre você e como gostaria de ajudar"></textarea>
                        </div>
                    </fieldset>
                    </div>

                    <div class="opcoes">
                        <label><input type="checkbox" id="termos" name="termos" required> Concordo em receber contato da Patinhas Adoção <span class="obrigatorio" aria-hidden="true">*</span></label>
                    </div>

                    <div id="alerta-erro" class="alerta alerta-erro" role="alert" hidden>
                        <strong>Faltou algo.</strong> Revise os campos destacados em vermelho e tente de novo.
                    </div>

                    <button type="submit" class="botao">Enviar cadastro</button>
                    <p id="mensagem-sucesso" class="sucesso" role="status" hidden>Cadastro enviado! Obrigado por fazer parte da Patinhas Adoção.</p>
                </form>
            </section>
            <section id="cadastros-salvos" class="chamada"></section>
        </div>`;
}

function templateNaoEncontrada() {
    return `
        <div class="pagina">
            <section>
                <h2>Página não encontrada</h2>
                <p>Não achamos o endereço que você tentou abrir.</p>
                <p><a class="botao" href="#/">Voltar para o início</a></p>
            </section>
        </div>`;
}
