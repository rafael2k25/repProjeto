using ATV.Data;
using ATV.Models;
using ATV.Filters;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CanalController : ControllerBase
    {
        private readonly IFTTDBContext _context;

        public CanalController(IFTTDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult ListarCanais()
        {
            var canais = _context.Canais.ToList();
            return Ok(canais);
        }

        [HttpPost]
        [CargoAuthorize("Admin")]
        public IActionResult CriarCanal(Canal canal)
        {
            _context.Canais.Add(canal);
            _context.SaveChanges();

            return Ok("Canal criado com sucesso");
        }

        [HttpGet("{id}")]
        public IActionResult BuscarCanal(int id)
        {
            var canal = _context.Canais.Find(id);
            if (canal == null)
                return NotFound("Canal não encontrado");

            return Ok(canal);
        }

        [HttpPut("{id}")]
        [CargoAuthorize("Admin")]
        public IActionResult AtualizarCanal(int id, Canal canal)
        {
            var canalBanco = _context.Canais.Find(id);

            if (canalBanco == null)
            {
                return NotFound("Canal não encontrado");
            }

            canalBanco.Nome_Canal = canal.Nome_Canal;

            _context.SaveChanges();

            return Ok("Canal atualizado");
        }

        [HttpDelete("{id}")]
        [CargoAuthorize("Admin")]
        public IActionResult DeletarCanal(int id)
        {
            var canal = _context.Canais.Find(id);

            if (canal == null)
            {
                return NotFound("Canal não encontrado");
            }

            _context.Canais.Remove(canal);

            _context.SaveChanges();

            return Ok("Canal deletado");
        }

        [HttpGet("{id}/mensagens")]
        public IActionResult ListarMensagensCanal(int id)
        {
            // 1. Verifica sessão
            var userId = HttpContext.Session.GetString("IdLogado");
            if (userId == null)
                return Unauthorized("Não logado");

            var usuario = _context.Usuarios.Find(int.Parse(userId));
            if (usuario == null)
                return Unauthorized("Usuário não encontrado");

            // 2. Mapa de permissões por canal
            // Ajuste os IDs conforme seu banco de dados
            var permissoes = new Dictionary<int, string[]>
            {
                { 1, new[] { "Professor", "Secretaria", "T.I", "Admin" } }, // Geral
                { 2, new[] { "Professor", "Admin" } },                       // Professores
                { 3, new[] { "Secretaria", "Admin" } },                      // Secretaria
                { 4, new[] { "T.I", "Admin" } }                             // T.I
            };

            // 3. Canal existe no mapa?
            if (!permissoes.ContainsKey(id))
                return NotFound("Canal não encontrado");

            // 4. Cargo tem acesso?
            if (!permissoes[id].Contains(usuario.Cargo))
                return StatusCode(403, "Acesso negado para seu cargo");

            // 5. Retorna as mensagens
            var mensagens = _context.Comunicacao_Mensagens
                .Where(m => m.Fk_Canal_Id_Canal == id)
                .ToList();

            return Ok(mensagens);
        }
    }
}