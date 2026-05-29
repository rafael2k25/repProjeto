using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ATV.Models
{
    [Table("Canal")]
    public class Canal
    {
        [Key]
        public int Id_Canal { get; set; }

        public string Nome_Canal { get; set; }
    }
}