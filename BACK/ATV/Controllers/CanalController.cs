using BancoIFTT.Data;
using BancoIFTT.Models;
using Microsoft.AspNetCore.Mvc;

namespace BancoIFTT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CanalController : ControllerBase
    {
        private readonly ifttDBContext _context;

        public CanalController(ifttDBContext context)
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
            {
                return NotFound("Canal não encontrado");
            }

            return Ok(canal);
        }

        [HttpPut("{id}")]
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
            var mensagens = _context.Comunicacao_Mensagens
                .Where(m => m.Fk_Canal_Id_Canal == id)
                .ToList();

            return Ok(mensagens);
        }
    }
}