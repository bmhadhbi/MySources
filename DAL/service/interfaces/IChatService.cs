using DAL.Models;

namespace DAL.service.interfaces
{
    public interface IChatService
    {
        Task AddChatMessage(string from, string to, string message, DateTime sendDate);

        Task<List<ChatMessage>> LoadConversation(string from, string to);
    }
}