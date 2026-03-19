/* ======================= INÍCIO JS DA PÁGINA DE AVISOS [AVISOS.HTML] ======================= */
// === NOTIFICAÇÃO ===
function showToast(message, type = "sucesso", duration = 3000) {

    const toast = document.getElementById("notificacao");

    toast.className = "";
    toast.innerHTML = `<div>${message}</div>`;

    toast.classList.add("visivel", type);

    setTimeout(() => {
        toast.classList.remove("visivel");
    }, duration);
}

function showConfirmToast(message, onConfirm) {

    const toast = document.getElementById("notificacao");

    toast.innerHTML = `
    <div>${message}</div>
    <div class="toast-actions">
        <button class="toast-btn toast-confirm">Confirmar</button>
        <button class="toast-btn toast-cancel">Cancelar</button>
    </div>
`;

    toast.className = "visivel";

    toast.querySelector(".toast-confirm").onclick = () => {
        toast.classList.remove("visivel");
        onConfirm();
        showToast("Aviso excluído com sucesso!");
    };

    toast.querySelector(".toast-cancel").onclick = () => {
        toast.classList.remove("visivel");
        showToast("Exclusão cancelada.");
    };
}
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

// === GESTÃO DE AVISOS ===
const form = document.getElementById('avisoForm');
const noticeList = document.getElementById('noticeList');
const btnSubmit = document.getElementById('btnSubmit');
const btnCancel = document.getElementById('btnCancel');
const formTitle = document.getElementById('formTitle');

// === DADOS SIMULADOS ===
let avisos = [
    {
        id: 1,
        titulo: "Juros punitivos e baixa demanda seguraram crescimento da indústria em 2025",
        descricao: "Análise detalhada sobre o impacto econômico no setor industrial de Sergipe e as expectativas para o próximo semestre, com dados exclusivos da CNI.",
        imagem: "",
        prioridade: "alta",
        data: "06/02/2026"
    },

    {
        id: 2,
        titulo: "Programador Full-Stack Duração: 670h Presencial",
        descricao: "As inscrições para o curso estão abertas.",
        imagem: "",
        prioridade: "baixa",
        data: "05/02/2026"
    },

    {
        id: 3,
        titulo: "Programador Front-End Duração: 348h Presencial",
        descricao: "As inscrições para o curso estão abertas.",
        imagem: "",
        prioridade: "baixa",
        data: "15/02/2026"
    },

    {
        id: 4,
        titulo: "Introdução a IoT para Manutenção Industrial Duração: 40h Presencial",
        descricao: "As inscrições para o curso estão abertas.",
        imagem: "",
        prioridade: "baixa",
        data: "21/02/2026"
    },

    {
        id: 5,
        titulo: "Inspetor de Qualidade Duração: 160h Presencial",
        descricao: "As inscrições para o curso estão abertas.",
        imagem: "",
        prioridade: "baixa",
        data: "01/03/2026"
    },
];

// === RENDERIZAR A LISTA ===
function renderizarAvisos() {
    noticeList.innerHTML = '';

    if (avisos.length === 0) {
        noticeList.innerHTML = '<li class="empty-message">Nenhum aviso publicado no momento.</li>';
        return;
    }

    avisos.forEach(aviso => {
        const li = document.createElement('li');
        li.className = 'notice-item';
        li.innerHTML = `
                    <div class="notice-info">
                        <span class="notice-title">${aviso.titulo}</span>
                        <div class="notice-meta">
                            <span class="badge ${aviso.prioridade}">${aviso.prioridade}</span>
                           <span><ion-icon name="calendar-outline"></ion-icon> ${aviso.data}</span>
                        </div>
                    </div>
                    <div class="notice-actions">
                        <button class="btn-action btn-edit" onclick="editarAviso(${aviso.id})">
                            <ion-icon name="create-outline"></ion-icon> Editar
                        </button>
                        <button class="btn-action btn-delete" onclick="excluirAviso(${aviso.id})">
                            <ion-icon name="trash-outline"></ion-icon> Excluir
                        </button>
                    </div>
                `;
        noticeList.appendChild(li);
    });
}

// === ADICIONAR OU ATUALIZAR AVISO ===
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const idAtual = document.getElementById('avisoId').value;
    const novoAviso = {
        id: idAtual ? parseInt(idAtual) : Date.now(),
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        imagem: document.getElementById('imagem').value,
        prioridade: document.getElementById('prioridade').value,
        data: document.getElementById('dataPub').value
    };

    if (idAtual) {
        // === ATUALIZAR EXISTENTE ===
        avisos = avisos.map(aviso => aviso.id === novoAviso.id ? novoAviso : aviso);
        resetarFormulario();
    } else {
        // === CRIAR NOVO ===
        avisos.unshift(novoAviso);
    }

    form.reset();
    renderizarAvisos();
});

// === EXCLUIR AVISO ===
window.excluirAviso = function (id) {

    showConfirmToast(
        "Deseja realmente excluir este aviso?",
        () => {
            avisos = avisos.filter(aviso => aviso.id !== id);
            renderizarAvisos();
        }
    );

}
// === EDITAR AVISO ===
window.editarAviso = function (id) {
    const aviso = avisos.find(a => a.id === id);
    if (!aviso) return;

    document.getElementById('avisoId').value = aviso.id;
    document.getElementById('titulo').value = aviso.titulo;
    document.getElementById('descricao').value = aviso.descricao;
    document.getElementById('imagem').value = aviso.imagem;
    document.getElementById('prioridade').value = aviso.prioridade;
    document.getElementById('dataPub').value = aviso.data;

    // === ALTERAR FORMULÁRIO ===
    formTitle.innerHTML = '<ion-icon name="create-outline"></ion-icon> Editar Aviso';
    btnSubmit.innerHTML = '<ion-icon name="save-outline"></ion-icon> Atualizar Aviso';
    btnSubmit.classList.add('editing');
    btnCancel.style.display = 'block';

    // === FOCAR NO TÍTULO ===
    document.getElementById('titulo').focus();
}

// === CANCELAR EDIÇÃO ===
btnCancel.addEventListener('click', resetarFormulario);

function resetarFormulario() {
    form.reset();
    document.getElementById('avisoId').value = '';
    formTitle.innerHTML = '<ion-icon name="add-circle-outline"></ion-icon> Criar Novo Aviso';
    btnSubmit.innerHTML = '<ion-icon name="send-outline"></ion-icon> Publicar Aviso';
    btnSubmit.classList.remove('editing');
    btnCancel.style.display = 'none';
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {

    // === DEFINE A DATA DE HOJE COMO PADRÃO NO INPUT ===
    document.getElementById('dataPub').valueAsDate = new Date();
    renderizarAvisos();
});
/* ======================= FIM JS DA PÁGINA DE AVISOS [AVISOS.HTML] ======================= */