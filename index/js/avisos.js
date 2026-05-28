/* ======================= API ======================= */

const API = "https://localhost:5140/Aviso";

/* ======================= NOTIFICAÇÃO ======================= */

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
    };

    toast.querySelector(".toast-cancel").onclick = () => {
        toast.classList.remove("visivel");
    };
}

/* ======================= TEMA ======================= */

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

/* ======================= ELEMENTOS ======================= */

const form = document.getElementById('avisoForm');
const noticeList = document.getElementById('noticeList');
const btnSubmit = document.getElementById('btnSubmit');
const btnCancel = document.getElementById('btnCancel');
const formTitle = document.getElementById('formTitle');

/* ======================= LISTAR AVISOS ======================= */

async function carregarAvisos() {

    try {

        const response = await fetch(API);

        const avisos = await response.json();

        renderizarAvisos(avisos);

    } catch (error) {

        showToast("Erro ao carregar avisos", "erro");
    }
}

/* ======================= RENDERIZAR ======================= */

function renderizarAvisos(avisos) {

    noticeList.innerHTML = '';

    if (avisos.length === 0) {

        noticeList.innerHTML =
            '<li class="empty-message">Nenhum aviso publicado.</li>';

        return;
    }

    avisos.forEach(aviso => {

        const li = document.createElement('li');

        li.className = 'notice-item';

        li.innerHTML = `
            <div class="notice-info">

                <span class="notice-title">
                    ${aviso.titulo}
                </span>

                <div class="notice-meta">

                    <span>
                        <ion-icon name="calendar-outline"></ion-icon>
                        ${aviso.data_Publicacao}
                    </span>

                </div>

                <p>${aviso.descricao}</p>

            </div>

            <div class="notice-actions">

                <button 
                    class="btn-action btn-edit"
                    onclick="editarAviso(${aviso.id_Aviso})">

                    <ion-icon name="create-outline"></ion-icon>
                    Editar

                </button>

                <button 
                    class="btn-action btn-delete"
                    onclick="excluirAviso(${aviso.id_Aviso})">

                    <ion-icon name="trash-outline"></ion-icon>
                    Excluir

                </button>

            </div>
        `;

        noticeList.appendChild(li);
    });
}

/* ======================= CADASTRAR / ATUALIZAR ======================= */

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const id = document.getElementById('avisoId').value;

    const aviso = {

        titulo: document.getElementById('titulo').value,

        descricao: document.getElementById('descricao').value,

        imagem: document.getElementById('imagem').value,

        data_Publicacao: document.getElementById('dataPub').value
    };

    try {

        // ===================== ATUALIZAR =====================

        if (id) {

            const response = await fetch(`${API}/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(aviso)
            });

            const mensagem = await response.text();

            showToast(mensagem);

        }

        // ===================== CRIAR =====================

        else {

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify(aviso)
            });

            const mensagem = await response.text();

            showToast(mensagem);
        }

        form.reset();

        resetarFormulario();

        carregarAvisos();

    } catch (error) {

        showToast("Erro ao salvar aviso", "erro");
    }
});

/* ======================= EXCLUIR ======================= */

window.excluirAviso = function (id) {

    showConfirmToast(
        "Deseja excluir este aviso?",
        async () => {

            try {

                const response = await fetch(`${API}/${id}`, {

                    method: "DELETE"
                });

                const mensagem = await response.text();

                showToast(mensagem);

                carregarAvisos();

            } catch (error) {

                showToast("Erro ao excluir", "erro");
            }
        }
    );
}

/* ======================= EDITAR ======================= */

window.editarAviso = async function (id) {

    try {

        const response = await fetch(API);

        const avisos = await response.json();

        const aviso = avisos.find(a => a.id_Aviso === id);

        if (!aviso) return;

        document.getElementById('avisoId').value = aviso.id_Aviso;

        document.getElementById('titulo').value = aviso.titulo;

        document.getElementById('descricao').value = aviso.descricao;

        document.getElementById('imagem').value = aviso.imagem;

        document.getElementById('dataPub').value =
            aviso.data_Publicacao.split('T')[0];

        formTitle.innerHTML =
            '<ion-icon name="create-outline"></ion-icon> Editar Aviso';

        btnSubmit.innerHTML =
            '<ion-icon name="save-outline"></ion-icon> Atualizar Aviso';

        btnSubmit.classList.add('editing');

        btnCancel.style.display = 'block';

    } catch (error) {

        showToast("Erro ao carregar aviso", "erro");
    }
}

/* ======================= RESET ======================= */

btnCancel.addEventListener('click', resetarFormulario);

function resetarFormulario() {

    form.reset();

    document.getElementById('avisoId').value = '';

    formTitle.innerHTML =
        '<ion-icon name="add-circle-outline"></ion-icon> Criar Novo Aviso';

    btnSubmit.innerHTML =
        '<ion-icon name="send-outline"></ion-icon> Publicar Aviso';

    btnSubmit.classList.remove('editing');

    btnCancel.style.display = 'none';
}

/* ======================= INICIAR ======================= */

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('dataPub').valueAsDate = new Date();

    carregarAvisos();
});