namespace MyEFApi.Dtos
{
    public class ChatMessageRequest
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Message { get; set; }
    }
}