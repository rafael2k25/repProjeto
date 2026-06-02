using ATV.Data;
using ATV.Models;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MensagemController : ControllerBase
    {
        private readonly ifttDBContext _context;

        public MensagemController(ifttDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult ListarMensagens()
        {
            var mensagens = _context.Comunicacao_Mensagens
                .OrderBy(m => m.Id_Hora)
                .ToList();

            return Ok(mensagens);
        }

        [HttpGet("canal/{idCanal}")]
        public IActionResult BuscarPorCanal(int idCanal)
        {
            var mensagens = _context.Comunicacao_Mensagens
                .Where(m => m.Fk_Canal_Id_Canal == idCanal)
                .OrderBy(m => m.Id_Hora)
                .ToList();

            return Ok(mensagens);
        }

        [HttpPost]
        public IActionResult EnviarMensagem([FromBody] ComunicacaoMensagem mensagem)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Faça login");
            }

            mensagem.Fk_Usuario_Id_Usuario = int.Parse(id);

            mensagem.Id_Hora = DateTime.Now;

            _context.Comunicacao_Mensagens.Add(mensagem);

            _context.SaveChanges();

            return Ok(mensagem);
        }
    }
}