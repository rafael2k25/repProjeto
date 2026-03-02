/* ======================= INÍCIO JS DA PÁGINA DE PERFIL [PERFIL.HTML] ======================= */
 // === DADOS E UTILITÁRIOS ===

        function showToast(message, type = 'sucesso') {
            const toast = document.getElementById("notificacao");
            if (!toast) return;

            // Transforma chamadas 'success' e 'error' para bater com as classes CSS em português
            let tipoClasse = type === 'success' ? 'sucesso' : (type === 'error' ? 'erro' : type);

            toast.textContent = message;
            toast.className = "visivel " + tipoClasse;
            
            setTimeout(() => {
                toast.className = toast.className.replace("visivel", "").trim();
            }, 3000);
        }

        function togglePassword(id) {
            const input = document.getElementById(id);
            if(input) input.type = input.type === "password" ? "text" : "password";
        }

        function sair() {
            window.location.href = "inicio.html";
        }

        // === INICIALIZAÇÃO DOS CAMPOS ===
        function initDropdowns() {
            // === DATAS ===
            const selectDia = document.getElementById("dia");
            if (selectDia) {
                for (let i = 1; i <= 31; i++) {
                    let opt = document.createElement("option");
                    opt.value = i; opt.text = i;
                    selectDia.appendChild(opt);
                }
            }

            const selectAno = document.getElementById("ano");
            if (selectAno) {
                for (let i = 2026; i >= 1950; i--) {
                    let opt = document.createElement("option");
                    opt.value = i; opt.text = i;
                    selectAno.appendChild(opt);
                }
            }
        }

        function updateCountries(continent, selectedCountry = null) {
            const selectPais = document.getElementById('pais');
            if (!selectPais) return; // Proteção para caso o campo país não exista no HTML
            
            selectPais.innerHTML = '<option value="" disabled selected>País</option>';

            if (continent && typeof locationData !== 'undefined' && locationData[continent]) {
                selectPais.disabled = false;
                locationData[continent].forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    if (selectedCountry === country) option.selected = true;
                    selectPais.appendChild(option);
                });
            } else {
                selectPais.disabled = true;
            }
        }

        // === CARREGAR DADOS DO LOCALSTORAGE ===
        function loadProfile() {
            // === PEGAR DADOS DO LOGIN E DO PERFIL ===
            const loginEmail = localStorage.getItem('userEmail');
            const loginPass = localStorage.getItem('userPass');

            if (loginEmail && document.getElementById('email')) document.getElementById('email').value = loginEmail;
            if (loginPass && document.getElementById('senha')) document.getElementById('senha').value = loginPass;

            const savedData = JSON.parse(localStorage.getItem('userProfileData')) || {};

            if (savedData.nome && document.getElementById('nome')) document.getElementById('nome').value = savedData.nome;
            if (savedData.email && document.getElementById('email')) document.getElementById('email').value = savedData.email;
            if (savedData.senha && document.getElementById('senha')) document.getElementById('senha').value = savedData.senha;
            if (savedData.dia && document.getElementById('dia')) document.getElementById('dia').value = savedData.dia;
            if (savedData.mes && document.getElementById('mes')) document.getElementById('mes').value = savedData.mes;
            if (savedData.ano && document.getElementById('ano')) document.getElementById('ano').value = savedData.ano;

            if (savedData.continente) {
                const continenteEl = document.getElementById('continente');
                if (continenteEl) continenteEl.value = savedData.continente;
                updateCountries(savedData.continente, savedData.pais);
            }

            if (savedData.genero) {
                const radio = document.querySelector(`input[name="gender"][value="${savedData.genero}"]`);
                if (radio) radio.checked = true;
            }

            // === CARREGAR FOTO ===
            const foto = localStorage.getItem("fotoPerfil");
            if (foto && document.getElementById("fotoPerfil")) document.getElementById("fotoPerfil").src = foto;
        }

        // === SALVAR DADOS ===
        document.getElementById('formPerfil').addEventListener('submit', function (e) {
            e.preventDefault();

            // Adicionado "?" antes do .value para não quebrar o código caso o campo falte no HTML
            const data = {
                nome: document.getElementById('nome')?.value || "",
                email: document.getElementById('email')?.value || "",
                senha: document.getElementById('senha')?.value || "",
                continente: document.getElementById('continente')?.value || "",
                pais: document.getElementById('pais')?.value || "",
                dia: document.getElementById('dia')?.value || "",
                mes: document.getElementById('mes')?.value || "",
                ano: document.getElementById('ano')?.value || "",
                genero: document.querySelector('input[name="gender"]:checked')?.value || ""
            };

            localStorage.setItem('userProfileData', JSON.stringify(data));
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userPass', data.senha);

            showToast("Perfil atualizado com sucesso!", "success");
        });

        // === FOTO UPLOAD ===
        document.getElementById('inputFoto').addEventListener("change", e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById('fotoPerfil').src = reader.result;
                localStorage.setItem("fotoPerfil", reader.result);
                showToast("Foto atualizada!", "success");
            };
            reader.readAsDataURL(file);
        });

        initDropdowns();
        loadProfile();

         /*

        ========= BASE DA API =========
        const API_BASE = "http://LINK";
        ========= BASE DA API =========

        ========= GET =========
            async function loadProfile() {
                try {
                    const userId = 1; // LOGIN/TOKEN

                    const response = await fetch(`${API_BASE}/usuarios/${userId}`);
                    const data = await response.json();

                    document.getElementById('nome').value = data.nome || "";
                    document.getElementById('email').value = data.email || "";
                    document.getElementById('senha').value = data.senha || "";
                    document.getElementById('dia').value = data.dia || "";
                    document.getElementById('mes').value = data.mes || "";
                    document.getElementById('ano').value = data.ano || "";

                    if (data.continente) {
                        document.getElementById('continente').value = data.continente;
                        updateCountries(data.continente, data.pais);
                    }

                    if (data.genero) {
                        const radio = document.querySelector(`input[name="gender"][value="${data.genero}"]`);
                        if (radio) radio.checked = true;
                    }

                    if (data.foto) {
                        document.getElementById("fotoPerfil").src = data.foto;
                    }

                } catch (error) {
                    console.error("Erro ao carregar perfil:", error);
                }
            }
        ========= GET =========

        ========= ID =========
            async function buscarUsuarioPorId(id) {
                try {
                    const response = await fetch(`${API_BASE}/usuarios/${id}`);
                    const usuario = await response.json();
                    console.log("Usuário encontrado:", usuario);
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                }
            }
        ========= ID =========

        ========= POST =========
            async function criarPerfil(data) {
                try {
                    const response = await fetch(`${API_BASE}/usuarios`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });

                    const novoUsuario = await response.json();
                    console.log("Usuário criado:", novoUsuario);

                } catch (error) {
                    console.error("Erro ao criar perfil:", error);
                }
            }
        ========= POST =========

        ========= PUT =========
            document.getElementById('formPerfil').addEventListener('submit', async function (e) {
                e.preventDefault();

                const userId = 1; // futuramente virá do login

                const data = {
                    nome: document.getElementById('nome').value,
                    email: document.getElementById('email').value,
                    senha: document.getElementById('senha').value,
                    continente: document.getElementById('continente').value,
                    pais: document.getElementById('pais').value,
                    dia: document.getElementById('dia').value,
                    mes: document.getElementById('mes').value,
                    ano: document.getElementById('ano').value,
                    genero: document.querySelector('input[name="gender"]:checked')?.value
                };

                try {
                    const response = await fetch(`${API_BASE}/usuarios/${userId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });

                    const updatedUser = await response.json();
                    console.log("Perfil atualizado:", updatedUser);

                    showToast("Perfil atualizado com sucesso!", "success");

                } catch (error) {
                    console.error("Erro ao atualizar perfil:", error);
                    showToast("Erro ao atualizar perfil", "error");
                }
            });
        ========= PUT =========

        ========= PATCH - ATUALIZAR E FAZER UPLOAD DE USUÁRIO =========
            async function atualizarParcialUsuario(id, dadosParciais) {
                try {
                    const response = await fetch(`${API_BASE}/usuarios/${id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dadosParciais)
                    });

                    const usuarioAtualizado = await response.json();
                    console.log("Atualização parcial:", usuarioAtualizado);

                } catch (error) {
                    console.error("Erro no PATCH:", error);
                }
            }

        document.getElementById('inputFoto').addEventListener("change", async e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = reader.result;

                document.getElementById('fotoPerfil').src = base64;

                await atualizarParcialUsuario(1, { foto: base64 });

                showToast("Foto atualizada!", "success");
            };
            reader.readAsDataURL(file);
        });
        ========= PATCH - ATUALIZAR E FAZER UPLOAD DE USUÁRIO =========

        ========= DELETE =========
            async function deletarUsuario(id) {
                try {
                    await fetch(`${API_BASE}/usuarios/${id}`, {
                        method: "DELETE"
                    });

                    showToast("Conta excluída com sucesso!", "success");

                } catch (error) {
                    console.error("Erro ao deletar usuário:", error);
                }
            }
        ========= DELETE =========

        */
/* ======================= FIM JS DA PÁGINA DE PERFIL [PERFIL.HTML] ======================= */