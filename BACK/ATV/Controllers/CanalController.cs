using ATV.Data;
using ATV.Models;
using ATV.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [CargoAuthorize("Administrador")]
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
        [CargoAuthorize("Administrador")]
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
        [CargoAuthorize("Administrador")]
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
    { 1, new[] { "Professor", "Secretária", "Administrador", "Diretor", "Coordenadora" } },

    { 2, new[] { "Professor", "Administrador", "Diretor", "Coordenadora" } },

    { 3, new[] { "Secretária", "Administrador", "Diretor", "Coordenadora" } },

    { 4, new[] { "Administrador" } }
};

            // 3. Canal existe no mapa?
            if (!permissoes.ContainsKey(id))
                return NotFound("Canal não encontrado");

            // 4. Cargo tem acesso?
            if (!permissoes[id].Contains(usuario.Cargo))
                return StatusCode(403, "Acesso negado para seu cargo");





            // 5. Retorna as mensagens
            var mensagens = _context.Comunicacao_Mensagens
     .Include(m => m.Usuario)
     .Where(m => m.Fk_Canal_Id_Canal == id)
     .Select(m => new
     {
         texto = m.Texto,
         id_Hora = m.Id_Hora,
         nome = m.Usuario.Nome,
         cargo = m.Usuario.Cargo
     })
     .ToList();

            return Ok(mensagens);
        }
    }
}