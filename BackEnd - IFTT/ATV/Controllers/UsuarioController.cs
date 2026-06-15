using ATV.Data;
using ATV.Models;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IFTTDBContext _context;

        public UsuarioController(IFTTDBContext context)
        {
            _context = context;
        }

        [HttpGet("usuario-logado")]
        public IActionResult UsuarioLogado()
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Usuário não logado");
            }

            var usuario = _context.Usuarios.Find(int.Parse(id));

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado");
            }

            return Ok(new
            {
                nome = usuario.Nome,
                cargo = usuario.Cargo,
                email = usuario.Email,
                avatar = usuario.Avatar
            });
        }

        // [HttpPost("cadastro")]
        // public IActionResult Cadastro(Usuario novoUsuario)
        //  {
        //    if (string.IsNullOrWhiteSpace(novoUsuario.Email) ||
        //       string.IsNullOrWhiteSpace(novoUsuario.Senha) ||
        //      string.IsNullOrWhiteSpace(novoUsuario.Nome))
        //  {
        //      return BadRequest("Preencha todos os campos");
        //  }

        // var usuarioExistente = _context.Usuarios
        //     .FirstOrDefault(u => u.Email == novoUsuario.Email);

        // if (usuarioExistente != null)
        // {
        //     return BadRequest("Email já cadastrado");
        //   }

        //   _context.Usuarios.Add(novoUsuario);

        //    _context.SaveChanges();

        //    return Ok(new
        //   {
        //      mensagem = "Usuário cadastrado com sucesso",
        //       novoUsuario.Nome,
        //       novoUsuario.Email
        //  });
        //  }

        [HttpPost("login")]
        public IActionResult Login(LoginC login)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u =>
                u.Email.Trim() == login.Email.Trim() &&
                u.Senha == login.Senha);

            if (usuario == null)
            {
                return Unauthorized("Email ou senha inválidos");
            }

            HttpContext.Session.SetString(
                "IdLogado",
                usuario.Id_Usuario.ToString()
            );

            Response.Cookies.Append(
                "IdLogado",
                usuario.Id_Usuario.ToString(),
                new CookieOptions
                {
                    HttpOnly = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None,
                    Secure = false
                }
            );

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