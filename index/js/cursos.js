/* ======================= INÍCIO JS DA PÁGINA DE CURSOS [CURSOS.HTML] ======================= */
   // === LÓGICA TEMA ESCURO ===
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
            // === FIM TESTE TEMA ESCURO ===

            // === BUSCA E FILTROS ===

            // ===== PESQUISA E FILTRO DE CURSOS =====

            const inputPesquisa = document.getElementById("pesquisaCurso");
            const filtroCarga = document.getElementById("filtroCarga");
            const cursos = document.querySelectorAll(".card-curso");

            function filtrarCursos() {

                const textoBusca = inputPesquisa.value.toLowerCase();
                const cargaSelecionada = filtroCarga.value;

                cursos.forEach(curso => {

                    const titulo = curso.querySelector(".titulo-curso")
                        .innerText.toLowerCase();

                    const cargaTexto = curso.querySelector(".carga-horaria")
                        .innerText.replace("h", "");

                    const carga = parseInt(cargaTexto);

                    let correspondeBusca = titulo.includes(textoBusca);
                    let correspondeFiltro = true;

                    if (cargaSelecionada !== "todos") {
                        correspondeFiltro = carga <= parseInt(cargaSelecionada);
                    }

                    if (correspondeBusca && correspondeFiltro) {
                        curso.style.display = "flex";
                    } else {
                        curso.style.display = "none";
                    }
                });
            }

            // eventos
            inputPesquisa.addEventListener("input", filtrarCursos);
            filtroCarga.addEventListener("change", filtrarCursos);

            // === FIM BUSCA E FILTROS ===

            /*

            ========= VARIÁVEL GLOBAL =========
                    let cursos = [];
            ========= VARIÁVEL GLOBAL =========

            ========= RENDERIZAR OS CURSOS =========
                function renderizarCursos(lista) {
                    const grade = document.getElementById("gradeCursos");
                    grade.innerHTML = "";

                    lista.forEach(curso => {
                        grade.innerHTML += `
            <article class="card-curso">
                <div class="area-imagem-card">
                    <img src="${curso.imagem}" alt="${curso.titulo}">
                </div>
                <div class="conteudo-card">
                    <h3 class="titulo-curso">
                        ${curso.titulo}
                        <span class="carga-horaria">${curso.carga}h</span>
                    </h3>
                    <p class="descricao-curso">${curso.descricao}</p>
                    <button class="botao-acessar"
                        onclick="buscarCursoPorId(${curso.id})">
                        ACESSAR CURSO
                    </button>
                    <button onclick="deletarCurso(${curso.id})"
                        style="margin-top:8px; background:red; color:white; border:none; padding:6px; border-radius:4px;">
                        EXCLUIR
                    </button>
                </div>
            </article>
        `;
                    });
                }
            ========= RENDERIZAR OS CURSOS =========

            ========= GET =========
                    async function carregarCursos() {
                        try {
                            const response = await fetch(API_URL);
                            cursos = await response.json();
                            renderizarCursos(cursos);
                        } catch (error) {
                            console.error("Erro ao carregar cursos:", error);
                        }
                    }

            window.onload = carregarCursos;

            ========= GET =========

            ========= ID =========
                async function buscarCursoPorId(id) {
                    try {
                        const response = await fetch(`${API_URL}/${id}`);
                        const curso = await response.json();
                        alert(`Curso: ${curso.titulo}\nCarga horária: ${curso.carga}h`);
                    } catch (error) {
                        console.error("Erro ao buscar curso:", error);
                    }
                }
            ========= ID =========

            ========= POST =========
                async function criarCurso(novoCurso) {
                    try {
                        const response = await fetch(API_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(novoCurso)
                        });

                        const cursoCriado = await response.json();
                        cursos.push(cursoCriado);
                        renderizarCursos(cursos);
                    } catch (error) {
                        console.error("Erro ao criar curso:", error);
                    }
                }
            ========= POST =========

            ========= PUT =========
                async function atualizarCursoCompleto(id, dadosAtualizados) {
                    try {
                        const response = await fetch(`${API_URL}/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(dadosAtualizados)
                        });

                        await carregarCursos();
                    } catch (error) {
                        console.error("Erro no PUT:", error);
                    }
                }
            ========= PUT =========

            ========= PATCH =========
                async function atualizarCursoParcial(id, dadosParciais) {
                    try {
                        const response = await fetch(`${API_URL}/${id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(dadosParciais)
                        });

                        await carregarCursos();
                    } catch (error) {
                        console.error("Erro no PATCH:", error);
                    }
                }
            ========= PATCH =========

            ========= DELETE =========
                async function deletarCurso(id) {
                    try {
                        await fetch(`${API_URL}/${id}`, {
                            method: "DELETE"
                        });

                        cursos = cursos.filter(curso => curso.id !== id);
                        renderizarCursos(cursos);
                    } catch (error) {
                        console.error("Erro ao deletar curso:", error);
                    }
                }

            ========= DELETE =========

            ========= FILTRAR CURSOS USANDO A API =========
                function filtrarCursos() {
                    const textoBusca = inputPesquisa.value.toLowerCase();
                    const cargaSelecionada = filtroCarga.value;

                    const cursosFiltrados = cursos.filter(curso => {
                        const correspondeBusca =
                            curso.titulo.toLowerCase().includes(textoBusca);

                        let correspondeFiltro = true;

                        if (cargaSelecionada !== "todos") {
                            correspondeFiltro =
                                curso.carga <= parseInt(cargaSelecionada);
                        }

                        return correspondeBusca && correspondeFiltro;
                    });

                    renderizarCursos(cursosFiltrados);
                }
            ========= FILTRAR CURSOS USANDO A API =========

            */
/* ======================= FIM JS DA PÁGINA DE CURSOS [CURSOS.HTML] ======================= */