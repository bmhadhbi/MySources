using System.ComponentModel.DataAnnotations;

namespace MyEFApi.Dtos
{
    public class MessageDto
    {
        [Required]
        public string From { get; set; }
        public string To { get; set; }

        [Required]
        public string Message { get; set; }
    }
}
