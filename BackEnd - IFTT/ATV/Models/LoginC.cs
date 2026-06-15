using System.ComponentModel.DataAnnotations;

namespace ATV.Models
{
    public class LoginC
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}