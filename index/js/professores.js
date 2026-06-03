/* ======================= INÍCIO JS PROFESSORES [PROFESSORES.HTML] ======================= */

/* ======================= API ======================= */

const API_USUARIO = "http://localhost:5140/Usuario";
const API_MENSAGENS = "http://localhost:5140/Mensagem";
const CANAL_ID = 2; // Canal dos Professores

/* ======================= ELEMENTOS ======================= */

const inputMensagem = document.getElementById("inputMensagem");
const containerMensagens = document.getElementById("containerMensagens");

let usuarioLogado = null;

/* ======================= INICIAR ======================= */

document.addEventListener("DOMContentLoaded", () => {

    carregarUsuarioLogado();
    carregarMensagens();

});

/* ======================= USUÁRIO LOGADO ======================= */

async function carregarUsuarioLogado() {

    try {

        const response = await fetch(
            `${API_USUARIO}/usuario-logado`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }

        const usuario = await response.json();

        document.getElementById(
            "nomeUsuario"
        ).textContent = usuario.nome;

        document.getElementById(
            "cargoUsuario"
        ).textContent = usuario.cargo;

        document.getElementById(
            "avatarUsuario"
        ).textContent =
            usuario.nome.charAt(0).toUpperCase();

    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );
    }
}

/* ======================= FIM JS DA PÁGINA DE INÍCIO ======================= */

/* ======================= CARREGAR MENSAGENS ======================= */

async function enviarMensagem() {

    const texto = inputMensagem.value.trim();

    if (!texto) return;

    try {

        const response = await fetch(
            API_MENSAGENS,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    texto: texto,
                    fk_Canal_Id_Canal: CANAL_ID
                })
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao enviar mensagem");
        }

        inputMensagem.value = "";

        carregarMensagens();

    } catch (error) {

        console.error(
            "Erro ao enviar mensagem:",
            error
        );
    }
}

/* ======================= ENVIAR MENSAGEM ======================= */

async function enviarMensagem() {

    const texto = inputMensagem.value.trim();

    if (!texto) return;

    try {

        const response = await fetch(API_MENSAGENS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                texto: texto,
                fk_Canal_Id_Canal: CANAL_ID
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar mensagem");
        }

        inputMensagem.value = "";

        carregarMensagens();

    } catch (error) {

        console.error(
            "Erro ao enviar mensagem:",
            error
        );
    }
}

/* ======================= CRIAR MENSAGEM ======================= */

function adicionarMensagemDOM(msg) {

    const div =
        document.createElement("div");

    const minhaMensagem =
        usuarioLogado &&
        msg.usuario === usuarioLogado.nome;

    div.className =
        `mensagem ${minhaMensagem ? "minha" : ""}`;

    const iniciais =
        msg.usuario
            .substring(0, 2)
            .toUpperCase();

    div.innerHTML = `
        <div class="avatar-msg">
            ${iniciais}
        </div>

        <div class="conteudo-msg">

            <div class="cabecalho-msg">

                <span class="nome-usuario-msg">
                    ${msg.usuario}
                </span>

                <span class="horario-msg">
                    ${formatarHorario(msg.dataEnvio)}
                </span>

            </div>

            <p class="texto-msg">
                ${msg.conteudo}
            </p>

        </div>
    `;

    containerMensagens.appendChild(div);

    containerMensagens.scrollTop =
        containerMensagens.scrollHeight;
}

/* ======================= FORMATAR HORÁRIO ======================= */

function formatarHorario(data) {

    return new Date(data)
        .toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
}

/* ======================= ENTER ======================= */

inputMensagem.addEventListener(
    "keypress",
    (e) => {

        if (e.key === "Enter") {

            enviarMensagem();

        }
    }
);

/* ======================= TEMA ESCURO ======================= */

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    document.getElementById("theme-icon");

const body =
    document.body;

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    body.classList.add("dark-mode");

    themeIcon.setAttribute(
        "name",
        "sunny-outline"
    );
}

themeToggle.addEventListener(
    "click",
    () => {

        body.classList.toggle(
            "dark-mode"
        );

        const isDark =
            body.classList.contains(
                "dark-mode"
            );

        localStorage.setItem(
            "theme",
            isDark
                ? "dark"
                : "light"
        );

        themeIcon.setAttribute(
            "name",
            isDark
                ? "sunny-outline"
                : "moon-outline"
        );
    }
);

/* ======================= FIM JS PROFESSORES [PROFESSORES.HTML] ======================= */