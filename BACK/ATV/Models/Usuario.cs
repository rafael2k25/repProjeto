using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ATV.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        public int Id_Usuario { get; set; }

        [Required]
        public string Nome { get; set; }
        
        public string? Cargo { get; set; }

        public string? Avatar { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }

        public string? Tema_Pag { get; set; }
    }
}