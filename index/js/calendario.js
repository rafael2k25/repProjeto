/* ======================= INÍCIO JS DA PÁGINA DE CALENDÁRIO [CALENDARIO.HTML] ======================= */
// === CONTROLE DO TEMA ===
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.setAttribute('name', 'sunny-outline');
    } else {
        themeIcon.setAttribute('name', 'moon-outline');
    }
});

// === CONTROLES EVENTO ===
function mostrarModalNovoEvento() {
    document.getElementById('modalNovoEvento').classList.add('ativo');
}

function fecharModalNovo() {
    document.getElementById('modalNovoEvento').classList.remove('ativo');
}

function mostrarDetalheEvento(id) {
    document.getElementById('modalEvento').classList.add('ativo');

}

function fecharModal() {
    document.getElementById('modalEvento').classList.remove('ativo');
}

function participarEvento() {
    mostrarNotificacao("Presença confirmada com sucesso!", "sucesso");
    fecharModal();
}

function salvarNovoEvento(event) {
    event.preventDefault();
    mostrarNotificacao("Evento salvo com sucesso!", "sucesso");
    fecharModalNovo();
}

function gerarCalendario() {
    const diasMesContainer = document.getElementById('diasMes');
    diasMesContainer.innerHTML = '';

    // DIAS DO MÊS
    for (let i = 1; i <= 35; i++) {
        let divDia = document.createElement('div');
        divDia.className = 'dia';

        if (i <= 3) {
            divDia.classList.add('outro-mes');
            divDia.innerHTML = `<span class="numero-dia">${28 + i}</span>`;
        } else if (i > 31) {
            divDia.classList.add('outro-mes');
            divDia.innerHTML = `<span class="numero-dia">${i - 31}</span>`;
        } else {
            let diaAtual = i - 3;
            divDia.innerHTML = `<span class="numero-dia">${diaAtual}</span>`;

            if (diaAtual === 19) {
                divDia.classList.add('tem-evento');
                divDia.innerHTML += `
                            <div class="eventos-dia">
                                <div class="evento-mini" style="background: var(--evento-1)">Apresentação de Projetos</div>
                            </div>
                        `;
            }
        }
        diasMesContainer.appendChild(divDia);

    }
}

window.onload = gerarCalendario;

window.addEventListener("DOMContentLoaded", () => {
    const btnExcluir = document.getElementById("btnExcluirEvento");

    if (btnExcluir) {
        btnExcluir.addEventListener("click", function (event) {
            event.stopPropagation(); // impede abrir o modal

            const eventoItem = this.closest(".evento-item");
            if (eventoItem) {
                eventoItem.remove();
            }

            mostrarNotificacao("Evento excluído com sucesso!", "sucesso");
        });
    }
});

/* === SISTEMA DE NOTIFICAÇÕES === */

function mostrarNotificacao(mensagem, tipo = "sucesso") {
    const container = document.getElementById("notificacao");
    const notif = document.createElement("div");
    notif.className = `notificacao ${tipo}`;
    const icones = {
        sucesso: "checkmark-circle-outline",
        erro: "close-circle-outline"
    };
    notif.innerHTML = `
        <ion-icon name="${icones[tipo]}"></ion-icon>
        <span>${mensagem}</span>
    `;
    container.appendChild(notif);
    setTimeout(() => {
        notif.classList.add("visivel");
    }, 10);
    setTimeout(() => {
        notif.classList.remove("visivel");
        setTimeout(() => {
            notif.remove();
        }, 300);
    }, 3000);
}

/*

    ========= GET =========
    async function carregarEventos() {
        try {
            const response = await fetch(API_URL);
            eventos = await response.json();
            gerarCalendario();
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    }
    ========= GET =========

    ========= ID =========
    async function buscarEventoPorId(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
        }
    }
    ========= ID =========

    ====== POST ======
    async function salvarNovoEvento(event) {
        event.preventDefault();

        const form = event.target;
        const inputs = form.querySelectorAll("input, textarea");

        const novoEvento = {
            titulo: inputs[0].value,
            data: inputs[1].value,
            horario: inputs[2].value,
            local: inputs[3].value,
            descricao: inputs[4].value,
            organizador: "Usuário Logado",
            cor: "#3498db"
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoEvento)
            });

            const eventoCriado = await response.json();
            eventos.push(eventoCriado);

            gerarCalendario();
            fecharModalNovo();
        } catch (error) {
            console.error("Erro ao criar evento:", error);
        }
    }
    ========= POST =========

    ========= PUT =========
    async function atualizarEventoCompleto(id, dadosAtualizados) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosAtualizados)
            });

            return await response.json();
        } catch (error) {
            console.error("Erro ao atualizar evento (PUT):", error);
        }
    }
    ========= PUT =========

    ========= PATCH =========
    async function atualizarEventoParcial(id, dadosParciais) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosParciais)
            });

            return await response.json();
        } catch (error) {
            console.error("Erro ao atualizar evento (PATCH):", error);
        }
    }
    ========= PATCH =========

    ========= DELETE =========
    async function deletarEvento(id) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            eventos = eventos.filter(evento => evento.id !== id);
            gerarCalendario();

            mostrarNotificacao("Evento excluído com sucesso!", "sucesso");
        } catch (error) {
            console.error("Erro ao deletar evento:", error);
            mostrarNotificacao("Erro ao excluir evento!", "erro");
    }
    ========= DELETE =========

*/
/* ======================= FIM JS DA PÁGINA DE AVISOS [CALENDARIO.HTML] ======================= */