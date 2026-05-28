/* ======================= INÍCIO JS LOGIN/CADASTRO ======================= */

/* ======================= API ======================= */

const API_USUARIO = "https://localhost:5140/Usuario";

/* ======================= VARIÁVEIS ======================= */

let codigoGerado = "";

/* ======================= MOSTRAR SENHA ======================= */

function alternarVisibilidadeSenha(inputId) {

    const input = document.getElementById(inputId);

    input.type =
        input.type === "password"
            ? "text"
            : "password";
}

/* ======================= NOTIFICAÇÃO ======================= */

function exibirNotificacao(mensagem, tipo = 'sucesso') {

    const notificacao =
        document.getElementById("notificacao");

    notificacao.textContent = mensagem;

    notificacao.className = "visivel";

    notificacao.classList.add(tipo);

    setTimeout(() => {

        notificacao.className =
            notificacao.className.replace("visivel", "");

        setTimeout(() => {

            notificacao.classList.remove(tipo);

        }, 300);

    }, 3000);
}

/* ======================= CADASTRO ======================= */

const formularioCadastro =
    document.querySelector('.formulario-cadastro');

formularioCadastro.addEventListener(
    'submit',
    async function (event) {

        event.preventDefault();

        const usuario = {

            nome:
                document.getElementById('cadastro-nome').value,

            email:
                document.getElementById('cadastro-email').value,

            senha:
                document.getElementById('cadastro-senha').value,

            cargo: "Usuário",

            avatar: "default.png",

            tema_Pag: "claro"
        };

        try {

            const response = await fetch(
                `${API_USUARIO}/cadastro`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(usuario)
                }
            );

            const mensagem = await response.text();

            if (response.ok) {

                exibirNotificacao(
                    "Cadastro realizado com sucesso!",
                    "sucesso"
                );

                formularioCadastro.reset();

            } else {

                exibirNotificacao(mensagem, "erro");
            }

        } catch (error) {

            console.error(error);

            exibirNotificacao(
                "Erro ao cadastrar usuário",
                "erro"
            );
        }
    }
);

/* ======================= LOGIN ======================= */

const formularioLogin =
    document.querySelector('.formulario-login');

formularioLogin.addEventListener(
    'submit',
    async function (event) {

        event.preventDefault();

        const login = {

            email:
                document.getElementById('login-email').value,

            senha:
                document.getElementById('login-senha').value
        };

        try {

            const response = await fetch(
                `${API_USUARIO}/login`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify(login)
                }
            );

            const dados = await response.json();

            if (response.ok) {

                codigoGerado =
                    Math.floor(
                        100000 + Math.random() * 900000
                    ).toString();

                console.log(
                    "CÓDIGO LOGIN:",
                    codigoGerado
                );

                exibirNotificacao(
                    "Senha correta! Código enviado.",
                    "sucesso"
                );

                abrirModal();

            } else {

                exibirNotificacao(
                    dados,
                    "erro"
                );
            }

        } catch (error) {

            console.error(error);

            exibirNotificacao(
                "Erro ao fazer login",
                "erro"
            );
        }
    }
);

/* ======================= MODAL ======================= */

function abrirModal() {

    document.getElementById(
        'modal-verificacao'
    ).style.display = 'flex';

    document.getElementById(
        'codigo-verificacao'
    ).focus();
}

function fecharModal() {

    document.getElementById(
        'modal-verificacao'
    ).style.display = 'none';

    document.getElementById(
        'codigo-verificacao'
    ).value = '';
}

/* ======================= VERIFICAR CÓDIGO ======================= */

function verificarCodigoLogin() {

    const codigoInserido =
        document.getElementById(
            'codigo-verificacao'
        ).value;

    if (codigoInserido === codigoGerado) {

        exibirNotificacao(
            "Login efetuado com sucesso!",
            "sucesso"
        );

        fecharModal();

        setTimeout(() => {

            window.location.href =
                "inicio.html";

        }, 1500);

    } else {

        exibirNotificacao(
            "Código inválido",
            "erro"
        );
    }
}

/* ======================= SELECT DIA ======================= */

const selectDia =
    document.getElementById("dia");

for (let i = 1; i <= 31; i++) {

    let opt = document.createElement("option");

    opt.value = i;

    opt.text = i;

    selectDia.appendChild(opt);
}

/* ======================= SELECT ANO ======================= */

const selectAno =
    document.getElementById("ano");

for (let i = 2026; i >= 1950; i--) {

    let opt = document.createElement("option");

    opt.value = i;

    opt.text = i;

    selectAno.appendChild(opt);
}

/* ======================= FIM JS LOGIN/CADASTRO ======================= */