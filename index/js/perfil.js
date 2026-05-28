/* ======================= INÍCIO JS DA PÁGINA DE PERFIL [PERFIL.HTML] ======================= */

// === BASE DA API ===
const API_URL = "https://localhost:7030/Usuario";

// === NOTIFICAÇÃO ===
function showToast(message, type = 'sucesso') {

    const toast = document.getElementById("notificacao");

    if (!toast) return;

    toast.textContent = message;

    toast.className = "visivel " + type;

    setTimeout(() => {
        toast.classList.remove("visivel");
    }, 3000);
}

// === MOSTRAR / ESCONDER SENHA ===
function togglePassword(id) {

    const input = document.getElementById(id);

    if (!input) return;

    input.type =
        input.type === "password"
            ? "text"
            : "password";
}

// === LOGOUT ===
async function sair() {

    try {

        const response = await fetch(
            `${API_URL}/logout`,
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao sair");
        }

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        showToast("Erro ao sair", "erro");
    }
}

// === CARREGAR PERFIL ===
async function carregarPerfil() {

    try {

        const response = await fetch(
            `${API_URL}/usuario-logado`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Usuário não logado");
        }

        const usuario = await response.json();

        // === PREENCHER CAMPOS ===
        document.getElementById("nome").value =
            usuario.nome || "";

        document.getElementById("email").value =
            usuario.email || "";

        document.getElementById("senha").value =
            usuario.senha || "";

        // === FOTO ===
        if (usuario.avatar) {

            document.getElementById("fotoPerfil").src =
                usuario.avatar;
        }

    } catch (error) {

        console.error(error);

        showToast(
            "Erro ao carregar perfil",
            "erro"
        );
    }
}

// === SALVAR PERFIL ===
document
    .getElementById("formPerfil")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const dados = {

            nome:
                document.getElementById("nome").value,

            email:
                document.getElementById("email").value,

            senha:
                document.getElementById("senha").value,

            avatar:
                document.getElementById("fotoPerfil").src
        };

        try {

            const response = await fetch(
                `${API_URL}/atualizar`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(dados)
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao atualizar");
            }

            showToast(
                "Perfil atualizado com sucesso!",
                "sucesso"
            );

        } catch (error) {

            console.error(error);

            showToast(
                "Erro ao atualizar perfil",
                "erro"
            );
        }
    });

// === FOTO PERFIL ===
document
    .getElementById("inputFoto")
    .addEventListener("change", function (e) {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function () {

            document.getElementById(
                "fotoPerfil"
            ).src = reader.result;

            showToast(
                "Foto atualizada!",
                "sucesso"
            );
        };

        reader.readAsDataURL(file);
    });

// === INICIAR ===
document.addEventListener(
    "DOMContentLoaded",
    carregarPerfil
);

/* ======================= FIM JS DA PÁGINA DE PERFIL [PERFIL.HTML] ======================= */