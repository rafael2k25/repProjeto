<<<<<<< Updated upstream
/* ======================= TEMA ESCURO ======================= */
=======
/* ======================= INÍCIO JS DA PÁGINA DE INÍCIO [INICIO.HTML] ======================= */
// === TEMA ESCURO ===
>>>>>>> Stashed changes
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
    themeIcon.setAttribute('name', isDark ? 'sunny-outline' : 'moon-outline');
});
<<<<<<< Updated upstream

/* ======================= CONFIGURAÇÕES DA API ======================= */
const API_URL = "http://SEU_LINK_AQUI"; // Substitua pela URL da sua API de avisos
let avisos = [];
let carouselInterval; 

// Inicia o carregamento ao abrir a página
document.addEventListener("DOMContentLoaded", carregarAvisos);

async function carregarAvisos() {
    try {
        const response = await fetch(API_URL);
        avisos = await response.json();
        renderizarAvisos(avisos);
    } catch (error) {
        console.error("Erro ao carregar avisos:", error);
    }
}

/* ======================= RENDERIZAR AVISOS ======================= */
function renderizarAvisos(lista) {
    const carouselTrack = document.getElementById("carouselTrack");
    const carouselNav = document.getElementById("carouselNav");
    const newsGrid = document.querySelector(".news-grid"); // Pode manter a classe HTML ou renomear depois

    // Limpa os containers antes de preencher
    if (carouselTrack) carouselTrack.innerHTML = "";
    if (carouselNav) carouselNav.innerHTML = "";
    if (newsGrid) newsGrid.innerHTML = "";

    if (lista.length === 0) {
        if(newsGrid) newsGrid.innerHTML = "<p>Nenhum aviso no momento.</p>";
        return;
    }

    // Pega os 3 primeiros avisos para o carrossel (Urgentes/Destaques)
    const destaques = lista.slice(0, 3);
    
    // Pega o resto para o grid inferior (Avisos Gerais)
    const gerais = lista.slice(3);

    // 1. Preenchendo o Carrossel (Avisos Importantes)
    destaques.forEach((aviso, index) => {
        // Usa uma imagem padrão caso o aviso não tenha imagem
        const imagemAviso = aviso.imagem ? aviso.imagem : 'img/aviso-padrao.avif';
        const setor = aviso.categoria || aviso.setor || 'Aviso Geral';

        carouselTrack.innerHTML += `
            <div class="carousel-slide">
                <img src="${imagemAviso}" alt="Aviso">
                <div class="carousel-caption">
                    <span style="background: var(--accent-color, #e63946); color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 8px; display: inline-block; font-weight: bold;">
                        <ion-icon name="alert-circle-outline" style="vertical-align: middle;"></ion-icon> ${setor}
                    </span>
                    <h3>${aviso.titulo}</h3>
                    <p>${aviso.descricao}</p>
                    
                    <button onclick="deletarAviso(${aviso.id})"
                        style="position: absolute; top: 20px; right: 20px; background: rgba(255,0,0,0.8); color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; z-index: 20;">
                        <ion-icon name="trash-outline" style="vertical-align: middle;"></ion-icon> Excluir
                    </button>
                </div>
            </div>
        `;

        carouselNav.innerHTML += `
            <button class="carousel-indicator ${index === 0 ? 'active' : ''}"></button>
        `;
    });

    // 2. Preenchendo os avisos gerais abaixo do carrossel
    gerais.forEach(aviso => {
        const imagemAviso = aviso.imagem ? aviso.imagem : 'img/aviso-padrao-pequeno.avif';

        newsGrid.innerHTML += `
            <article class="side-item" style="display:flex; background: var(--bg-card, #fff); margin-bottom: 15px; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); align-items: center;">
                <img src="${imagemAviso}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; margin-right: 15px;">
                <div class="side-content" style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; font-size: 16px;">${aviso.titulo}</h4>
                    <div style="font-size: 12px; color: gray; margin-bottom: 8px;">Publicado em: ${aviso.data || 'Data indisponível'}</div>
                </div>
                <button onclick="deletarAviso(${aviso.id})"
                    style="background: #ff4d4d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; display:flex; align-items:center; gap: 5px;">
                    <ion-icon name="trash-outline"></ion-icon> Excluir
                </button>
            </article>
        `;
    });

    // 3. Inicia o carrossel se houver destaques
    if (destaques.length > 0) {
        iniciarLogicaDoCarrossel();
    }
}

/* ======================= LÓGICA DE FUNCIONAMENTO DO CARROSSEL ======================= */
function iniciarLogicaDoCarrossel() {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const navIndicators = Array.from(document.getElementById('carouselNav').children);

    if (slides.length <= 1) {
        // Se só tiver um aviso, esconde os controles
        if(nextButton) nextButton.style.display = 'none';
        if(prevButton) prevButton.style.display = 'none';
        if(document.getElementById('carouselNav')) document.getElementById('carouselNav').style.display = 'none';
        return;
    }

    let currentIndex = 0;

    function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        navIndicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        currentIndex = index;
    }

    nextButton.replaceWith(nextButton.cloneNode(true));
    prevButton.replaceWith(prevButton.cloneNode(true));
    
    const newNextBtn = document.getElementById('nextBtn');
    const newPrevBtn = document.getElementById('prevBtn');

    newNextBtn.addEventListener('click', () => {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0;
        updateCarousel(index);
    });

    newPrevBtn.addEventListener('click', () => {
        let index = currentIndex - 1;
        if (index < 0) index = slides.length - 1;
        updateCarousel(index);
    });

    navIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => updateCarousel(index));
    });

    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0;
        updateCarousel(index);
    }, 6000); // 6 segundos para dar tempo de ler o aviso
}

/* ======================= REQUISIÇÕES CRUD DA API ======================= */
async function criarAviso(novoAviso) {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAviso)
        });
        await carregarAvisos();
    } catch (error) {
        console.error("Erro ao criar aviso:", error);
    }
}

async function deletarAviso(id) {
    if (confirm("Tem certeza que deseja excluir este aviso?")) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            await carregarAvisos(); 
        } catch (error) {
            console.error("Erro ao deletar aviso:", error);
        }
    }
}

async function atualizarAviso(id, dadosAtualizados) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        });
        await carregarAvisos();
    } catch (error) {
        console.error("Erro no PUT:", error);
    }
}
=======

/*

========= BASE DA API =========
let noticias = [];
const API_URL = "http://LINK";
========= BASE DA API =========

========= CARREGAR E RENDERIZAR NOTICIAS =========
    function renderizarNoticias(lista) {

        const featuredContainer = document.getElementById("featuredContainer");
        const sideList = document.getElementById("sideList");

        featuredContainer.innerHTML = "";
        sideList.innerHTML = "";

        if (lista.length === 0) return;

        // Primeira notícia = destaque
        const destaque = lista[0];

        featuredContainer.innerHTML = `
<article class="featured-card">
    <div class="featured-img-container">
        <img src="${destaque.imagem}" class="featured-img">
    </div>
    <div class="featured-content">
        <span class="tag">${destaque.categoria}</span>
        <h3 class="featured-title">${destaque.titulo}</h3>
        <p class="featured-desc">${destaque.descricao}</p>
        <div class="meta-info">
            ${destaque.data}
        </div>
        <button onclick="deletarNoticia(${destaque.id})"
            style="margin-top:10px; background:red; color:white; border:none; padding:6px 10px; border-radius:4px;">
            EXCLUIR
        </button>
    </div>
</article>
`;

        lista.slice(1).forEach(noticia => {
            sideList.innerHTML += `
    <div class="side-item">
        <img src="${noticia.imagem}" class="side-img">
        <div class="side-content">
            <h4 class="side-title">${noticia.titulo}</h4>
            <div class="meta-info">${noticia.data}</div>
            <button onclick="deletarNoticia(${noticia.id})"
                style="margin-top:5px; background:red; color:white; border:none; padding:4px 8px; border-radius:4px;">
                EXCLUIR
            </button>
        </div>
    </div>
`;
        });
    }

const API_URL = "http://";
let noticias = [];

document.addEventListener("DOMContentLoaded", carregarNoticias);

async function carregarNoticias() {
    try {
        const response = await fetch(API_URL);
        noticias = await response.json();
        renderizarNoticias(noticias);
    } catch (error) {
        console.error("Erro ao carregar notícias:", error);
    }
}
========= CARREGAR E RENDERIZAR NOTICIAS =========

========= POST =========
    async function criarNoticia(novaNoticia) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaNoticia)
            });

            await carregarNoticias();
        } catch (error) {
            console.error("Erro ao criar notícia:", error);
        }
    }
========= POST =========

========= ID =========
    async function buscarNoticiaPorId(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const noticia = await response.json();
            console.log(noticia);
        } catch (error) {
            console.error("Erro ao buscar notícia:", error);
        }
    }
========= ID =========

========= PUT =========
    async function atualizarNoticiaCompleta(id, dadosAtualizados) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados)
            });

            await carregarNoticias();
        } catch (error) {
            console.error("Erro no PUT:", error);
        }
    }
========= PUT =========

========= PATCH =========
    async function atualizarNoticiaParcial(id, dadosParciais) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosParciais)
            });

            await carregarNoticias();
        } catch (error) {
            console.error("Erro no PATCH:", error);
        }
    }
========= PATCH =========

========= DELETE =========
    async function deletarNoticia(id) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            noticias = noticias.filter(n => n.id !== id);
            renderizarNoticias(noticias);
        } catch (error) {
            console.error("Erro ao deletar notícia:", error);
        }
    }
========= DELETE =========

*/
/* ======================= FIM JS DA PÁGINA DE INÍCIO [INICIO.HTML] ======================= */
>>>>>>> Stashed changes
