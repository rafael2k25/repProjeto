/* ======================= INÍCIO JS CANAIS [CANAIS.HTML] ======================= */

/* ======================= API ======================= */

const API_USUARIO = "http://localhost:5140/Usuario";
const API_CANAIS = "http://localhost:5140/Canal";
const API_MENSAGENS = "http://localhost:5140/Mensagem";

/* ======================= ELEMENTOS ======================= */

const inputMensagem = document.getElementById('inputMensagem');

const containerMensagens =
    document.getElementById('containerMensagens');

/* ======================= ID DO CANAL ======================= */

const params = new URLSearchParams(window.location.search);

const canalId = params.get("id") || 1;

const canais = {
    1: "Canal Geral",
    2: "Professores",
    3: "Secretaria",
    4: "T.I"
};

/* ======================= INICIAR ======================= */

document.addEventListener("DOMContentLoaded", () => {

    carregarUsuarioLogado();
    carregarMensagens();
    document.getElementById("tituloCanalAtivo").textContent =
        canais[canalId];

    const avatarCanal = {
        1: "G",
        2: "PR",
        3: "S",
        4: "TI"
    };

    document.getElementById("avatarCanalAtivo").textContent =
        avatarCanal[canalId];

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

        // Preenche o DOM com os dados do usuário
        document.getElementById("nomeUsuario").textContent = usuario.nome;
        document.getElementById("cargoUsuario").textContent = usuario.cargo;
        document.getElementById("avatarUsuario").textContent =
            usuario.nome.charAt(0).toUpperCase();

        // Aplica restrições no menu lateral
        aplicarRestricoesPorCargo(usuario.cargo);

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
}

/* ======================= RESTRIÇÕES ======================= */

function aplicarRestricoesPorCargo(cargo) {

    const regras = [
        {
            seletor: 'a[href="canais.html?id=2"]',
            permitidos: [
                "Professor",
                "Administrador",
                "Diretor",
                "Coordenadora"
            ]
        },
        {
            seletor: 'a[href="canais.html?id=3"]',
            permitidos: [
                "Secretaria",
                "Administrador",
                "Diretor",
                "Coordenadora"
            ]
        },
        {
            seletor: 'a[href="canais.html?id=4"]',
            permitidos: [
                "Administrador",
                "Técnico de TI"
            ]
        }
    ];

    regras.forEach(({ seletor, permitidos }) => {
        const el = document.querySelector(seletor);

        if (!el) return;

        if (!permitidos.includes(cargo)) {
            el.style.display = "none";
        }
    });
}

/* ======================= GET ======================= */

async function carregarMensagens() {

    try {

        const response = await fetch(
            `${API_CANAIS}/${canalId}/mensagens`,
            {
                credentials: "include"
            }
        );

        if (response.status === 403) {

            showToast(
                "Você não possui acesso a este canal",
                "erro"
            );

            window.location.href = "canais.html?id=1";

            return;
        }

        const mensagens = await response.json();

        containerMensagens.innerHTML = "";
            console.log(mensagens);
        mensagens.forEach(msg => {

            adicionarMensagemDOM(msg);

        });

    } catch (error) {

        console.error(
            "Erro ao carregar mensagens:",
            error
        );

        showToast(
            "Erro ao carregar mensagens",
            "erro"
        );
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

    const nome = msg.nome || "Usuário";
    const cargo = msg.cargo || "";

    div.innerHTML = `

    <div class="avatar-msg">
        ${nome.charAt(0).toUpperCase()}
    </div>

        <div class="conteudo-msg">

            <div class="cabecalho-msg">

                <span class="nome-usuario-msg">
                    ${cargo}
                </span>

                <span class="nome-cargo-msg">
                    ${nome}
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

/* ======================= NOTIFICAÇÃO ======================= */

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



/* ======================= FIM JS CANAIS [CANAIS.HTML] ======================= */