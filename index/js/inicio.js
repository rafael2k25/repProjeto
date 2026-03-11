/* ======================= INÍCIO JS DA PÁGINA DE INÍCIO [INICIO.HTML] ======================= */
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
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.setAttribute('name', isDark ? 'sunny-outline' : 'moon-outline');
});

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