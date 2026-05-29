using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ATV.Models
{
    [Table("Aviso")]
    public class Aviso
    {
        [Key]
        public int Id_Aviso { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public string Imagem { get; set; } = string.Empty;

        public DateTime Data_Publicacao { get; set; }

        public int Fk_Usuario_Id_Usuario { get; set; }
    }
}