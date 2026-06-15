using ATV.Data;
using ATV.Models;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MensagemController : ControllerBase
    {
        private readonly IFTTDBContext _context;

        public MensagemController(IFTTDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult EnviarMensagem([FromBody] ComunicacaoMensagem mensagem)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Faça login");
            }

            var usuario = _context.Usuarios.Find(int.Parse(id));

            if (usuario == null)
            {
                return Unauthorized("Usuário não encontrado");
            }

            // Permissões por canal
            var permissoes = new Dictionary<int, string[]>
{
    { 1, new[] { "Professor", "Secretária", "Administrador", "Diretor", "Coordenadora" } },

    { 2, new[] { "Professor", "Administrador", "Diretor", "Coordenadora" } },

    { 3, new[] { "Secretária", "Administrador", "Diretor", "Coordenadora" } },

    { 4, new[] { "Administrador" } }
};

            if (!permissoes.ContainsKey(mensagem.Fk_Canal_Id_Canal))
            {
                return NotFound("Canal não encontrado");
            }

            if (!permissoes[mensagem.Fk_Canal_Id_Canal]
                .Contains(usuario.Cargo))
            {
                return StatusCode(403, "Acesso negado para seu cargo");
            }

            mensagem.Fk_Usuario_Id_Usuario = int.Parse(id);
            mensagem.Id_Hora = DateTime.Now;

            _context.Comunicacao_Mensagens.Add(mensagem);
            _context.SaveChanges();

            return Ok(mensagem);
        }
    }
}