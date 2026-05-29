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

document.addEventListener(
    'DOMContentLoaded',
    async () => {

        await carregarUsuario();

        await carregarAvisos();

       
    }
);

/* ======================= CARREGAR USUÁRIO ======================= */

async function carregarUsuario() {

    try {

        const response = await fetch(
            `${API_USUARIO}/usuario-logado`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) return;

        const usuario = await response.json();

        document.querySelector(".nome-usuario")
            .textContent = usuario.nome;

        document.querySelector(".cargo-usuario")
            .textContent = usuario.cargo;

        document.querySelector(".avatar")
            .textContent =
                usuario.nome.substring(0, 2).toUpperCase();

    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );
    }
}

/* ======================= CARREGAR AVISOS ======================= */

async function carregarAvisos() {

    try {

        const response = await fetch(API_AVISOS);

        avisos = await response.json();

       

        criarGridNoticias();

    } catch (error) {

        console.error(
            "Erro ao carregar avisos:",
            error
        );
    }
}

/* ======================= GRID DE NOTÍCIAS ======================= */

function criarGridNoticias() {

    newsGrid.innerHTML = "";

    avisos.forEach(aviso => {

        const card =
            document.createElement("div");

        card.className = "side-item";

        card.innerHTML = `

            <img
                src="${aviso.imagem}"
                alt="${aviso.titulo}"
                class="side-img"
            >

            <div class="side-content">

                <div>

                    <h3 class="side-title">
                        ${aviso.titulo}
                    </h3>

                    <p class="side-description">
                        ${aviso.descricao}
                    </p>

                </div>

                <div class="side-date">

                    <ion-icon
                        name="calendar-outline">
                    </ion-icon>

                    <span>
                        ${formatarData(
                            aviso.data_Publicacao
                        )}
                    </span>

                </div>

            </div>
        `;

        newsGrid.appendChild(card);
    });
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

/* ======================= FIM JS DA PÁGINA DE INÍCIO ======================= */