namespace BancoIFTT.Models
{
    public class Aviso
    {
        public int Id_Aviso { get; set; }

        public string Titulo { get; set; }

        public string Descricao { get; set; }

        public string Imagem { get; set; }

        public DateTime Data_Publicacao { get; set; }

        public int Fk_Usuario_Id_Usuario { get; set; }
    }
}