using Microsoft.EntityFrameworkCore;
using ATV.Models;

namespace ATV.Data
{
    public class ifttDBContext : DbContext
    {
        public ifttDBContext(DbContextOptions<ifttDBContext> options)
            : base(options)
        {

        }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Aviso> Avisos { get; set; }

        public DbSet<Canal> Canais { get; set; }

        public DbSet<ComunicacaoMensagem> Comunicacao_Mensagens { get; set; }
    }
}