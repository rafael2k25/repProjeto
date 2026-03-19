/* ======================= INÍCIO JS DA PÁGINA DE VALIDAÇÃO DE CERTIFICADO [VALIDACAOCERT.HTML] ======================= */
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

// === VALIDAÇÃO ===
function validarCertificado() {
    const codigo = document.getElementById('certInput').value.trim().toUpperCase();
    const resValido = document.getElementById('resultadoValido');
    const resInvalido = document.getElementById('resultadoInvalido');

    // === RESET DA VISUALIZAÇÃO ===
    resValido.style.display = 'none';
    resInvalido.style.display = 'none';

    if (codigo === "") {
        alert("Por favor, digite um código.");
        return;
    }

    // === LOADING ===
    const btn = document.querySelector('.btn-validate');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<ion-icon name="refresh-outline" class="spin"></ion-icon> VERIFICANDO...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';

    // === SE O CÓDIGO TIVER IFTT, É VÁLIDO ===
        if (codigo.includes('IFTT')) {
            resValido.style.display = 'block';
        } else {
            resInvalido.style.display = 'block';
        }
    }, 800);
}

/*

========= BASE DA API =========
const API_BASE = "http://LINK";
========= BASE DA API =========

========= GET - VALIDAR E BUSCAR CERTIFICADO =========
    async function validarCertificado() {
        const codigo = document.getElementById('certInput').value.trim().toUpperCase();
        const resValido = document.getElementById('resultadoValido');
        const resInvalido = document.getElementById('resultadoInvalido');

        resValido.style.display = 'none';
        resInvalido.style.display = 'none';

        if (codigo === "") {
            alert("Por favor, digite um código.");
            return;
        }

        const btn = document.querySelector('.btn-validate');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<ion-icon name="refresh-outline"></ion-icon> VERIFICANDO...';
        btn.style.opacity = '0.7';

        try {
            const response = await fetch(`${API_BASE}/certificados/codigo/${codigo}`);

            if (!response.ok) {
                throw new Error("Certificado não encontrado");
            }

            const certificado = await response.json();

            // Atualiza os dados na tela dinamicamente
            document.querySelectorAll('.info-value')[0].textContent = certificado.aluno;
            document.querySelectorAll('.info-value')[1].textContent = certificado.conclusao;
            document.querySelectorAll('.info-value')[2].textContent = certificado.curso;

            resValido.style.display = 'block';

        } catch (error) {
            resInvalido.style.display = 'block';
        } finally {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
        }
    }

async function buscarCertificadoPorId(id) {
    try {
        const response = await fetch(`${API_BASE}/certificados/${id}`);
        const certificado = await response.json();
        console.log(certificado);
    } catch (error) {
        console.error("Erro ao buscar certificado:", error);
    }
}
========= GET - VALIDAR E BUSCAR CERTIFICADO =========

========= POST =========
    async function criarCertificado(dados) {
        try {
            const response = await fetch(`${API_BASE}/certificados`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const novoCertificado = await response.json();
            console.log("Certificado criado:", novoCertificado);

        } catch (error) {
            console.error("Erro ao criar certificado:", error);
        }
    }
========= POST =========

========= PUT =========
    async function atualizarCertificado(id, dadosAtualizados) {
        try {
            const response = await fetch(`${API_BASE}/certificados/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosAtualizados)
            });

            const atualizado = await response.json();
            console.log("Certificado atualizado:", atualizado);

        } catch (error) {
            console.error("Erro no PUT:", error);
        }
    }
========= PUT =========

========= PATCH =========
    async function atualizarParcialCertificado(id, dadosParciais) {
        try {
            const response = await fetch(`${API_BASE}/certificados/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosParciais)
            });

            const atualizado = await response.json();
            console.log("Atualização parcial:", atualizado);

        } catch (error) {
            console.error("Erro no PATCH:", error);
        }
    }
========= PATCH =========

========= DELETE =========
    async function deletarCertificado(id) {
        try {
            await fetch(`${API_BASE}/certificados/${id}`, {
                method: "DELETE"
            });

            console.log("Certificado deletado");

        } catch (error) {
            console.error("Erro ao deletar certificado:", error);
        }
    }
========= DELETE =========

*/
/* ======================= FIM JS DA PÁGINA DE VALIDAÇÃO [VALIDACAOCERT.HTML] ======================= */