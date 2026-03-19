/* ======================= INÍCIO JS DA PÁGINA DE MANUTENCAO [MANUTENCAO.HTML] ======================= */
const inputMensagem = document.getElementById('inputMensagem');
const containerMensagens = document.getElementById('containerMensagens');

// === CARREGAR AS MENSAGENS ===
document.addEventListener('DOMContentLoaded', carregarMensagens);

function enviarMensagem() {
    const texto = inputMensagem.value.trim();
    if (texto === "") return;

    const msgObj = {
        usuario: "Teste Usuário",
        conteudo: texto,
        horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tipo: 'minha'
    };

    adicionarMensagemDOM(msgObj);
    salvarMensagem(msgObj);
    inputMensagem.value = "";
}

function adicionarMensagemDOM(msg) {
    const div = document.createElement('div');
    div.className = `mensagem ${msg.tipo === 'minha' ? 'minha' : ''}`;
    const iniciais = msg.tipo === 'minha' ? 'TU' : msg.usuario.substring(0, 2).toUpperCase();

    div.innerHTML = `
                <div class="avatar-msg">${iniciais}</div>
                <div class="conteudo-msg">
                    <div class="cabecalho-msg">
                        <span class="nome-usuario-msg">${msg.usuario}</span>
                        <span class="horario-msg">${msg.horario}</span>
                    </div>
                    <p class="texto-msg">${msg.conteudo}</p>
                </div>
            `;

    containerMensagens.appendChild(div);
    containerMensagens.scrollTop = containerMensagens.scrollHeight;
}

function salvarMensagem(msg) {
    let historico = JSON.parse(localStorage.getItem('chat_historico_pt')) || [];
    historico.push(msg);
    localStorage.setItem('chat_historico_pt', JSON.stringify(historico));
}

function carregarMensagens() {
    let historico = JSON.parse(localStorage.getItem('chat_historico_pt')) || [];
    historico.forEach(msg => adicionarMensagemDOM(msg));
}

inputMensagem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
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
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.setAttribute('name', isDark ? 'sunny-outline' : 'moon-outline');
});
        // === FIM TEMA ESCURO ===

/*

========= BASE DA API =========
const API_BASE = "http://LINK";
========= BASE DA API =========

========= GET - CARREGAR E BUSCAR AS MENSAGENS =========
    async function carregarMensagens() {
        try {
            const response = await fetch(`${API_BASE}/mensagens`);
            const mensagens = await response.json();

            containerMensagens.innerHTML = "";

            mensagens.forEach(msg => adicionarMensagemDOM(msg));

        } catch (error) {
            console.error("Erro ao carregar mensagens:", error);
        }
    }

async function buscarMensagemPorId(id) {
    try {
        const response = await fetch(`${API_BASE}/mensagens/${id}`);
        const mensagem = await response.json();
        console.log("Mensagem encontrada:", mensagem);
    } catch (error) {
        console.error("Erro ao buscar mensagem:", error);
    }
}
========= GET - CARREGAR E BUSCAR AS MENSAGENS =========

========= POST =========
    async function salvarMensagem(msg) {
        try {
            const response = await fetch(`${API_BASE}/mensagens`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(msg)
            });

            const data = await response.json();
            console.log("Mensagem salva:", data);

        } catch (error) {
            console.error("Erro ao salvar mensagem:", error);
        }
    }
========= POST =========

========= PUT =========
    async function atualizarMensagem(id, novaMensagem) {
        try {
            const response = await fetch(`${API_BASE}/mensagens/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novaMensagem)
            });

            const data = await response.json();
            console.log("Mensagem atualizada (PUT):", data);

        } catch (error) {
            console.error("Erro ao atualizar mensagem:", error);
        }
    }
========= PUT =========

========= PATCH =========
    async function atualizarParcialMensagem(id, dadosParciais) {
        try {
            const response = await fetch(`${API_BASE}/mensagens/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosParciais)
            });

            const data = await response.json();
            console.log("Mensagem atualizada (PATCH):", data);

        } catch (error) {
            console.error("Erro ao atualizar parcialmente:", error);
        }
    }
========= PATCH =========

========= DELETE =========
    async function deletarMensagem(id) {
        try {
            await fetch(`${API_BASE}/mensagens/${id}`, {
                method: "DELETE"
            });

            console.log("Mensagem deletada com sucesso");

        } catch (error) {
            console.error("Erro ao deletar mensagem:", error);
        }
    }
========= DELETE =========

*/
/* ======================= FIM JS DA PÁGINA DE MANUTENCAO [MANUTENCAO.HTML] ======================= */