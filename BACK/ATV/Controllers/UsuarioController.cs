using BancoIFTT.Data;
using BancoIFTT.Models;
using Microsoft.AspNetCore.Mvc;

namespace BancoIFTT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ifttDBContext _context;

        public UsuarioController(ifttDBContext context)
        {
            _context = context;
        }

        [HttpPost("cadastro")]
        public IActionResult Cadastro(Usuario novoUsuario)
        {
            // VERIFICA SE O EMAIL JÁ EXISTE
            var usuarioExistente = _context.Usuarios
                .FirstOrDefault(u => u.Email == novoUsuario.Email);

            if (usuarioExistente != null)
            {
                return BadRequest("Email já cadastrado");
            }

            // ADICIONA O NOVO USUÁRIO
            _context.Usuarios.Add(novoUsuario);

            // SALVA NO BANCO
            _context.SaveChanges();

            return Ok(new
            {
                mensagem = "Usuário cadastrado com sucesso",
                novoUsuario.Nome,
                novoUsuario.Email
            });
        }

        [HttpPost("login")]
        public IActionResult Login(Usuario login)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Email == login.Email &&
                    u.Senha == login.Senha);

            if (usuario == null)
            {
                return Unauthorized("Email ou senha inválidos");
            }

            HttpContext.Session.SetString("IdLogado", usuario.Id_Usuario.ToString());

            Response.Cookies.Append("IdLogado", usuario.Id_Usuario.ToString());

            return Ok(new
            {
                mensagem = "Login realizado",
                usuario.Nome,
                usuario.Email
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();

            Response.Cookies.Delete("IdLogado");

            return Ok("Logout realizado");
        }
    }
}