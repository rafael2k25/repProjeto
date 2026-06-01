using ATV.Data;
using ATV.Models;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AvisoController : ControllerBase
    {
        private readonly ifttDBContext _context;

        public AvisoController(ifttDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult ListarAvisos()
        {
            var avisos = _context.Avisos.ToList();

            return Ok(avisos);
        }

        [HttpPost]
        public IActionResult CriarAviso(Aviso aviso)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Faça login");
            }

            aviso.Fk_Usuario_Id_Usuario = int.Parse(id);

            _context.Avisos.Add(aviso);

            _context.SaveChanges();

            return Ok("Aviso criado");
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarAviso(int id, Aviso aviso)
        {
            var avisoBanco = _context.Avisos.Find(id);

            if (avisoBanco == null)
            {
                return NotFound("Aviso não encontrado");
            }

            avisoBanco.Titulo = aviso.Titulo;
            avisoBanco.Descricao = aviso.Descricao;
           

            _context.SaveChanges();

            return Ok("Aviso atualizado");
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarAviso(int id)
        {
            var aviso = _context.Avisos.Find(id);

            if (aviso == null)
            {
                return NotFound("Aviso não encontrado");
            }

            _context.Avisos.Remove(aviso);

            _context.SaveChanges();

            return Ok("Aviso deletado");
        }
    }
}