/* ======================= INÍCIO JS DA PÁGINA DE INÍCIO [INICIO.HTML] ======================= */

/* ======================= API ======================= */

const API_AVISOS = "https://localhost:5140/Aviso";
const API_USUARIO = "https://localhost:5140/Usuario";

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

/* ======================= ELEMENTOS ======================= */

const carouselTrack =
    document.getElementById("carouselTrack");

const carouselNav =
    document.getElementById("carouselNav");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const newsGrid =
    document.querySelector(".news-grid");

/* ======================= VARIÁVEIS ======================= */

let currentSlide = 0;

let avisos = [];

/* ======================= INICIAR ======================= */

document.addEventListener(
    'DOMContentLoaded',
    async () => {

        await carregarUsuario();

        await carregarAvisos();

        iniciarCarousel();
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

        criarCarousel();

        criarGridNoticias();

    } catch (error) {

        console.error(
            "Erro ao carregar avisos:",
            error
        );
    }
}

/* ======================= CRIAR CAROUSEL ======================= */

function criarCarousel() {

    carouselTrack.innerHTML = "";

    carouselNav.innerHTML = "";

    avisos.forEach((aviso, index) => {

        const slide =
            document.createElement("div");

        slide.className = "carousel-slide";

        slide.innerHTML = `

            <img
                src="${aviso.imagem}"
                alt="${aviso.titulo}"
            >

            <div class="carousel-caption">

                <h3>
                    ${aviso.titulo}
                </h3>

                <p>
                    ${aviso.descricao}
                </p>

            </div>
        `;

        carouselTrack.appendChild(slide);

        /* ======================= INDICADORES ======================= */

        const indicator =
            document.createElement("button");

        indicator.className =
            "carousel-indicator";

        if (index === 0) {

            indicator.classList.add("active");
        }

        indicator.addEventListener(
            "click",
            () => {

                irParaSlide(index);
            }
        );

        carouselNav.appendChild(indicator);
    });
}

/* ======================= GRID DE NOTÍCIAS ======================= */

function criarGridNoticias() {

    newsGrid.innerHTML = "";

    avisos.forEach(aviso => {

        const card =
            document.createElement("div");

        card.className = "news-card";

        card.innerHTML = `

            <img
                src="${aviso.imagem}"
                alt="${aviso.titulo}"
                class="news-image"
            >

            <div class="news-content">

                <h3>
                    ${aviso.titulo}
                </h3>

                <p>
                    ${aviso.descricao}
                </p>

                <span class="news-date">

                    <ion-icon
                        name="calendar-outline">
                    </ion-icon>

                    ${formatarData(
                        aviso.data_Publicacao
                    )}

                </span>

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

/* ======================= CAROUSEL ======================= */

function atualizarCarousel() {

    carouselTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    const indicators =
        document.querySelectorAll(
            ".carousel-indicator"
        );

    indicators.forEach((indicator, index) => {

        indicator.classList.toggle(
            "active",
            index === currentSlide
        );
    });
}

function irParaSlide(index) {

    currentSlide = index;

    atualizarCarousel();
}

function proximoSlide() {

    currentSlide++;

    if (currentSlide >= avisos.length) {

        currentSlide = 0;
    }

    atualizarCarousel();
}

function slideAnterior() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = avisos.length - 1;
    }

    atualizarCarousel();
}

/* ======================= BOTÕES ======================= */

nextBtn.addEventListener(
    "click",
    proximoSlide
);

prevBtn.addEventListener(
    "click",
    slideAnterior
);

/* ======================= AUTO PLAY ======================= */

function iniciarCarousel() {

    setInterval(() => {

        if (avisos.length > 0) {

            proximoSlide();
        }

    }, 5000);
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