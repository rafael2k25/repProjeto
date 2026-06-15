using ATV.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Filters
{
    // Filters/CargoAuthorizeAttribute.cs
    public class CargoAuthorizeAttribute : ActionFilterAttribute
    {
        private readonly string[] _cargosPermitidos;

        public CargoAuthorizeAttribute(params string[] cargos)
        {
            _cargosPermitidos = cargos;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var session = context.HttpContext.Session;
            var id = session.GetString("IdLogado");

            if (id == null)
            {
                context.Result = new UnauthorizedObjectResult("Não logado");
                return;
            }

            var db = context.HttpContext.RequestServices
                            .GetRequiredService<IFTTDBContext>();

            var usuario = db.Usuarios.Find(int.Parse(id));

            if (usuario == null || !_cargosPermitidos.Contains(usuario.Cargo))
            {
                context.Result = new ObjectResult("Acesso negado para seu cargo")
                {
                    StatusCode = 403
                };
                return;
            }

            base.OnActionExecuting(context);
        }
    }
}
