namespace BancoIFTT.Models
{
    public class ComunicacaoMensagem
    {
        public int Id_Mensagem { get; set; }

        public string Texto { get; set; }

        public DateTime Id_Hora { get; set; }

        public int Fk_Usuario_Id_Usuario { get; set; }

        public int Fk_Canal_Id_Canal { get; set; }
    }
}