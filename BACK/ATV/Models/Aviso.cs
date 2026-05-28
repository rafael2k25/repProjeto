namespace ATV.Models
{
    public class Aviso
    {
        public int Id_Aviso { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public string Imagem { get; set; } = string.Empty;

        public DateTime Data_Publicacao { get; set; }

        public int Fk_Usuario_Id_Usuario { get; set; }
    }
}