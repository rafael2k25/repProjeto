/* ======================= INÍCIO JS DA PÁGINA DE CANAIS [CANAIS.HTML] ======================= */

/* ======================= API ======================= */

const API_CANAIS = "http://localhost:5140/Canal";
const API_MENSAGENS = "http://localhost:5140/Mensagem";

/* ======================= ELEMENTOS ======================= */

const inputMensagem = document.getElementById('inputMensagem');

const containerMensagens =
    document.getElementById('containerMensagens');

/* ======================= ID DO CANAL ======================= */

const params = new URLSearchParams(window.location.search);

const canalId = params.get("id") || 1;

/* ======================= CARREGAR MENSAGENS ======================= */

document.addEventListener('DOMContentLoaded', () => {

    carregarMensagens();
});

/* ======================= GET ======================= */

async function carregarMensagens() {

    try {

        const response =
            await fetch(`${API_CANAIS}/${canalId}/mensagens`);

        const mensagens = await response.json();

        containerMensagens.innerHTML = "";

        mensagens.forEach(msg => {

            adicionarMensagemDOM(msg);
        });

    } catch (error) {

        console.error("Erro ao carregar mensagens:", error);

        showToast("Erro ao carregar mensagens", "erro");
    }
}

/* ======================= POST ======================= */

async function enviarMensagem() {

    const texto = inputMensagem.value.trim();

    if (texto === "") return;

    const novaMensagem = {

        texto: texto,

        id_Hora: new Date().toISOString(),

        fk_Canal_Id_Canal: parseInt(canalId)
    };

    try {

        const response = await fetch(API_MENSAGENS, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(novaMensagem)
        });

        const mensagem = await response.text();

        showToast(mensagem);

        inputMensagem.value = "";

        carregarMensagens();

    } catch (error) {

        console.error("Erro ao enviar mensagem:", error);

        showToast("Erro ao enviar mensagem", "erro");
    }
}

/* ======================= RENDERIZAR ======================= */

function adicionarMensagemDOM(msg) {

    const div = document.createElement('div');

    div.className = 'mensagem minha';

    div.innerHTML = `

        <div class="avatar-msg">

            MSG

        </div>

        <div class="conteudo-msg">

            <div class="cabecalho-msg">

                <span class="nome-usuario-msg">
                    Usuário
                </span>

                <span class="horario-msg">
                    ${formatarData(msg.id_Hora)}
                </span>

            </div>

            <p class="texto-msg">

                ${msg.texto}

            </p>

        </div>
    `;

    containerMensagens.appendChild(div);

    containerMensagens.scrollTop =
        containerMensagens.scrollHeight;
}

/* ======================= FORMATAR DATA ======================= */

function formatarData(data) {

    const novaData = new Date(data);

    return novaData.toLocaleTimeString([], {

        hour: '2-digit',

        minute: '2-digit'
    });
}

/* ======================= ENTER ======================= */

inputMensagem.addEventListener('keypress', (e) => {

    if (e.key === 'Enter') {

        enviarMensagem();
    }
});

/* ======================= TOAST ======================= */

function showToast(message, type = "sucesso", duration = 3000) {

    const toast = document.getElementById("notificacao");

    if (!toast) return;

    toast.className = "";

    toast.innerHTML = `<div>${message}</div>`;

    toast.classList.add("visivel", type);

    setTimeout(() => {

        toast.classList.remove("visivel");

    }, duration);
}

/* ======================= TEMA ESCURO ======================= */

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

    const isDark = body.classList.contains('dark-mode');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeIcon.setAttribute(
        'name',
        isDark ? 'sunny-outline' : 'moon-outline'
    );
});

/* ======================= FIM JS DA PÁGINA DE CANAIS ======================= */