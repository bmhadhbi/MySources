using DAL.Models;
using DAL.service.interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.service
{
    public class ChatDbService : IChatService
    {
        private readonly ApplicationDbContext _context;

        public ChatDbService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddChatMessage(string from, string to, string message, DateTime sendDate)
        {
            await _context.ChatMessage.AddAsync(new ChatMessage()
            {
                From = from,
                To = to,
                SendDate = sendDate,
                Message = message,
                Id = Guid.NewGuid().ToString(),
            });
            _context.SaveChanges();
        }

        public async Task<List<ChatMessage>> LoadConversation(string from, string to)
        {
            return await _context.ChatMessage.Where(x => (x.From.ToLower() == from.ToLower() && x.To.ToLower() == to.ToLower())
                                            || (x.From.ToLower() == to.ToLower() && x.To.ToLower() == from.ToLower()))
                                .OrderBy(x => x.SendDate).ToListAsync();
        }
    }
}