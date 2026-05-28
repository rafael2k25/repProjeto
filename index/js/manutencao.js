/* ======================= INÍCIO JS DA PÁGINA DE MANUTENÇÃO [MANUTENCAO.HTML] ======================= */

// === BASE DA API ===
const API_URL = "https://localhost:5140/Mensagem";
const CANAL_ID = 1;

// === ELEMENTOS ===
const inputMensagem = document.getElementById('inputMensagem');
const containerMensagens = document.getElementById('containerMensagens');

// === CARREGAR MENSAGENS ===
document.addEventListener('DOMContentLoaded', carregarMensagens);

async function carregarMensagens() {
    try {

        const response = await fetch(
            `https://localhost:5140/Canal/${CANAL_ID}/mensagens`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao carregar mensagens");
        }

        const mensagens = await response.json();

        containerMensagens.innerHTML = "";

        mensagens.forEach(msg => {
            adicionarMensagemDOM({
                usuario: "Usuário",
                conteudo: msg.texto,
                horario: new Date(msg.id_Hora).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                tipo: "minha"
            });
        });

    } catch (error) {
        console.error("Erro:", error);
    }
}

// === ENVIAR MENSAGEM ===
async function enviarMensagem() {

    const texto = inputMensagem.value.trim();

    if (texto === "") return;

    const novaMensagem = {
        texto: texto,
        id_Hora: new Date().toISOString(),
        fk_Canal_Id_Canal: CANAL_ID
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(novaMensagem)
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar mensagem");
        }

        inputMensagem.value = "";

        carregarMensagens();

    } catch (error) {
        console.error("Erro:", error);
    }
}

// === ADICIONAR MENSAGEM NO HTML ===
function adicionarMensagemDOM(msg) {

    const div = document.createElement('div');

    div.className = `mensagem ${msg.tipo === 'minha' ? 'minha' : ''}`;

    const iniciais = msg.usuario.substring(0, 2).toUpperCase();

    div.innerHTML = `
        <div class="avatar-msg">${iniciais}</div>

        <div class="conteudo-msg">

            <div class="cabecalho-msg">
                <span class="nome-usuario-msg">${msg.usuario}</span>

                <span class="horario-msg">
                    ${msg.horario}
                </span>
            </div>

            <p class="texto-msg">${msg.conteudo}</p>

        </div>
    `;

    containerMensagens.appendChild(div);

    containerMensagens.scrollTop =
        containerMensagens.scrollHeight;
}

// === ENTER PARA ENVIAR ===
inputMensagem.addEventListener('keypress', (e) => {

    if (e.key === 'Enter') {
        enviarMensagem();
    }
});

// === TEMA ESCURO ===
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {

    body.classList.add('dark-mode');

    themeIcon.setAttribute('name', 'sunny-outline');
}

themeToggle.addEventListener('click', () => {

    body.classList.toggle('dark-mode');

    const isDark =
        body.classList.contains('dark-mode');

    localStorage.setItem(
        'theme',
        isDark ? 'dark' : 'light'
    );

    themeIcon.setAttribute(
        'name',
        isDark ? 'sunny-outline' : 'moon-outline'
    );
});

/* ======================= FIM JS DA PÁGINA DE MANUTENÇÃO [MANUTENCAO.HTML] ======================= */