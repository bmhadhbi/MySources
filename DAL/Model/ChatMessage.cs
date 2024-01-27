namespace DAL.Models
{
    public class ChatMessage
    {
        public string Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Message { get; set; }
        public DateTime SendDate { get; set; }
    }
}