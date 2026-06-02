/* ======================= INÍCIO JS DA PÁGINA DE INÍCIO [INICIO.HTML] ======================= */

/* ======================= API ======================= */

const API_AVISOS = "http://localhost:5140/Aviso";
const API_USUARIO = "http://localhost:5140/Usuario";

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

    const isDark =
        body.classList.contains('dark-mode');

    localStorage.setItem(
        'theme',
        isDark ? 'dark' : 'light'
    );

    themeIcon.setAttribute(
        'name',
        isDark
            ? 'sunny-outline'
            : 'moon-outline'
    );
});

/* ======================= VARIÁVEIS ======================= */

let currentSlide = 0;

let avisos = [];

/* ======================= INICIAR ======================= */

document.addEventListener("DOMContentLoaded", () => {

    carregarAvisos();
    carregarUsuarioLogado();

});

/* ======================= CRIAR AVISOS ======================= */

function criarAvisos() {

    const container = document.querySelector(".avisos-destaque");

    if (!container) {
        console.error("Container de avisos não encontrado");
        return;
    }

    container.innerHTML = "";

    avisos.forEach(aviso => {

        const card = document.createElement("div");

        card.classList.add("aviso");

        card.innerHTML = `
            <h3>${aviso.titulo}</h3>

            <p>${aviso.descricao}</p>

            <div class="aviso-info">
                <span>
                    <ion-icon name="calendar-outline"></ion-icon>
                    ${formatarData(aviso.data_Publicacao)}
                </span>
            </div>
        `;

        container.appendChild(card);
    });
}

/* ======================= CARREGAR AVISOS ======================= */

async function carregarAvisos() {
    try {

        const response = await fetch(API_AVISOS);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        avisos = await response.json();

        criarAvisos();

    } catch (error) {

        console.error("Erro ao carregar avisos:", error);
    }
}

/* ======================= FORMATAR DATA ======================= */

function formatarData(data) {

    const novaData = new Date(data);

    return novaData.toLocaleDateString(
        'pt-BR'
    );
}

/* ======================= DATA ATUAL ======================= */

const dataAtual =
    document.querySelector(".current-date");

const hoje = new Date();

dataAtual.textContent =
    hoje.toLocaleDateString(
        'pt-BR',
        {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }
    );

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
