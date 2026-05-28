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
            var mensagens = _context.Comunicacao_Mensagens.ToList();

            return Ok(mensagens);
        }

        [HttpPost]
        public IActionResult EnviarMensagem(ComunicacaoMensagem mensagem)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Faça login");
            }

            mensagem.Fk_Usuario_Id_Usuario = int.Parse(id);

            _context.Comunicacao_Mensagens.Add(mensagem);

            _context.SaveChanges();

            return Ok("Mensagem enviada");
        }
    }
}