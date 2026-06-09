/* ======================= INÍCIO JS PROFESSORES [PROFESSORES.HTML] ======================= */

/* ======================= API ======================= */

const API_USUARIO = "http://localhost:5140/Usuario";
const API_CANAIS = "http://localhost:5140/Canal";
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

        const response = await fetch(`${API_USUARIO}/usuario-logado`, {
            credentials: "include"
        });

        // Não logado → volta pro login
        if (!response.ok) {
            window.location.href = "index.html";
            return;
        }

        const usuario = await response.json();

        // Apenas professores e admin acessam esta página
        const permitidos = ["Professor", "Admin"];

        if (!permitidos.includes(usuario.cargo)) {
            window.location.href = "canais.html";
            return;
        }

        // Salva o usuário logado para usar no DOM das mensagens
        usuarioLogado = usuario;

        document.getElementById("nomeUsuario").textContent = usuario.nome;
        document.getElementById("cargoUsuario").textContent = usuario.cargo;
        document.getElementById("avatarUsuario").textContent =
            usuario.nome.charAt(0).toUpperCase();

        aplicarRestricoesPorCargo(usuario.cargo);

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
}

/* ======================= GET MENSAGENS ======================= */

async function carregarMensagens() {

    try {

        const response = await fetch(`${API_CANAIS}/${CANAL_ID}/mensagens`, {
            credentials: "include"
        });

        if (!response.ok) throw new Error("Erro ao carregar mensagens");

        const mensagens = await response.json();

        containerMensagens.innerHTML = "";

        mensagens.forEach(msg => adicionarMensagemDOM(msg));

    } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
        showToast("Erro ao carregar mensagens", "erro");
    }
}

/* ======================= POST MENSAGEM ======================= */

async function enviarMensagem() {

    const texto = inputMensagem.value.trim();

    if (!texto) return;

    try {

        const response = await fetch(API_MENSAGENS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                texto: texto,
                fk_Canal_Id_Canal: CANAL_ID
            })
        });

        if (!response.ok) throw new Error("Erro ao enviar mensagem");

        inputMensagem.value = "";

        carregarMensagens();

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        showToast("Erro ao enviar mensagem", "erro");
    }
}

/* ======================= RENDERIZAR MENSAGEM ======================= */

function adicionarMensagemDOM(msg) {

    const div = document.createElement("div");

    const minhaMensagem = usuarioLogado && msg.usuario === usuarioLogado.nome;

    div.className = `mensagem ${minhaMensagem ? "minha" : ""}`;

    const iniciais = msg.usuario.substring(0, 2).toUpperCase();

    div.innerHTML = `
        <div class="avatar-msg">${iniciais}</div>
        <div class="conteudo-msg">
            <div class="cabecalho-msg">
                <span class="nome-usuario-msg">${msg.usuario}</span>
                <span class="horario-msg">${formatarHorario(msg.dataEnvio)}</span>
            </div>
            <p class="texto-msg">${msg.conteudo}</p>
        </div>
    `;

    containerMensagens.appendChild(div);
    containerMensagens.scrollTop = containerMensagens.scrollHeight;
}

/* ======================= FORMATAR HORÁRIO ======================= */

function formatarHorario(data) {
    return new Date(data).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

/* ======================= NOTIFICAÇÃO ======================= */

function showToast(message, type = "sucesso", duration = 3000) {

    const toast = document.getElementById("notificacao");

    if (!toast) return;

    toast.className = "";
    toast.innerHTML = `<div>${message}</div>`;
    toast.classList.add("visivel", type);

    setTimeout(() => toast.classList.remove("visivel"), duration);
}

/* ======================= ENTER ======================= */

inputMensagem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagem();
});

/* ======================= RESTRIÇÕES POR CARGO ======================= */

function aplicarRestricoesPorCargo(cargo) {

    const regras = [
        {
            seletor: 'a[href="secretaria.html"]',
            permitidos: ["Secretaria", "Admin"]
        },
        {
            seletor: 'a[href="professores.html"]',
            permitidos: ["Professor", "Admin"]
        },
        {
            seletor: 'a[href="T.I.html"]',
            permitidos: ["T.I", "Admin"]
        }
    ];

    regras.forEach(({ seletor, permitidos }) => {
        const el = document.querySelector(seletor);
        if (!el) return;
        if (!permitidos.includes(cargo)) el.style.display = "none";
    });
}

/* ======================= TEMA ESCURO ======================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeIcon.setAttribute("name", "sunny-outline");
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeIcon.setAttribute("name", isDark ? "sunny-outline" : "moon-outline");
});

/* ======================= FIM JS PROFESSORES [PROFESSORES.HTML] ======================= */