/* ======================= INÍCIO JS DA PÁGINA DE LOGIN [INDEX.HTML] ======================= */
// === VARIÁVEIS GLOBAIS DO CÓDIGO DE LOGIN ===
let codigoGerado = "";

// === MOSTRAR/ESCONDER SENHA ===
function alternarVisibilidadeSenha(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// === NOTIFICAÇÃO ===
function exibirNotificacao(mensagem, tipo = 'sucesso') {
    const notificacao = document.getElementById("notificacao");
    notificacao.textContent = mensagem;

    notificacao.className = "visivel";
    notificacao.classList.add(tipo);

    setTimeout(function () {
        notificacao.className = notificacao.className.replace("visivel", "");
        setTimeout(() => notificacao.classList.remove(tipo), 300);
    }, 3000);
}

// === CADASTRO ===
const formularioCadastro = document.querySelector('.formulario-cadastro');
formularioCadastro.addEventListener('submit', function (event) {
    event.preventDefault();

    // === SALVA LOGIN ===
    const email = document.getElementById('cadastro-email').value.trim();
    const senha = document.getElementById('cadastro-senha').value;

    localStorage.setItem('emailUsuario', email);
    localStorage.setItem('senhaUsuario', senha);

    exibirNotificacao("Cadastro realizado com sucesso!", "sucesso");
    formularioCadastro.reset();

    // === RESET INTERFACE ===
    const paisSelect = document.getElementById('pais');
    if (paisSelect) {
        paisSelect.innerHTML = '<option value="" disabled selected>País</option>';
        paisSelect.disabled = true;
    }
});

// === VERIFICAÇÃO DE 2 FATORES ===
document.querySelector('.formulario-login').addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('login-email');
    const senhaInput = document.getElementById('login-senha');

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    const emailValido = "teste@gmail.com";
    const senhaValida = "123456";

    const emailArmazenado = localStorage.getItem('emailUsuario');
    const senhaArmazenada = localStorage.getItem('senhaUsuario');

    // === VERIFICAÇÃO DA SENHA ===
    let loginValido = false;

    if (email === emailValido && senha === senhaValida) {
        // === USUÁRIO PADRÃO DE TESTE ===
        loginValido = true;
    } else if (emailArmazenado && email === emailArmazenado) {
        // === USUÁRIO CADASTRADO NO LOCALSTORAGE ===
        if (senha === senhaArmazenada) {
            loginValido = true;
        } else {
            // === SE A SENHA FOR INCORRETA ===
            loginValido = false;
        }
    }

    if (loginValido) {
        // === SENHA CORRETA ===
        codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("CÓDIGO DE LOGIN: " + codigoGerado); // (F12)

        exibirNotificacao("Senha correta! Código enviado ao e-mail.", "sucesso");
        abrirModal();
    } else {
        // === SENHA INCORRETA === 
        exibirNotificacao("E-mail ou senha incorretos!", "erro");
    }
});

// === VERIFICAÇÃO ===
function abrirModal() {
    document.getElementById('modal-verificacao').style.display = 'flex';
    document.getElementById('codigo-verificacao').focus();
}

function fecharModal() {
    document.getElementById('modal-verificacao').style.display = 'none';
    document.getElementById('codigo-verificacao').value = '';
}

function verificarCodigoLogin() {
    const codigoInserido = document.getElementById('codigo-verificacao').value;

    if (codigoInserido === codigoGerado) {
        exibirNotificacao("Login efetuado com sucesso! Redirecionando...", "sucesso");
        fecharModal();

        // === DEPOIS DE 1,5 SEGUNDOS E REDIRECIONA O USUÁRIO PARA A TELA INICIAL ===
        setTimeout(() => {
            window.location.href = "inicio.html";
        }, 1500);
    } else {
        exibirNotificacao("Código inválido. Tente novamente.", "erro");
    }
}

const selectDia = document.getElementById("dia");
for (let i = 1; i <= 31; i++) {
    let opt = document.createElement("option");
    opt.value = i; opt.text = i;
    selectDia.appendChild(opt);
}

const selectAno = document.getElementById("ano");
for (let i = 2026; i >= 1950; i--) {
    let opt = document.createElement("option");
    opt.value = i; opt.text = i;
    selectAno.appendChild(opt);
}
/* ======================= FIM JS DA PÁGINA DE LOGIN [INDEX.HTML] ======================= */