using DAL.service.interfaces;
using Microsoft.AspNetCore.Mvc;
using MyEFApi.Dtos;
using MyEFApi.Services;

namespace MyEFApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        private readonly IChatService _chatDbService;

        public ChatController(ChatService chatService, IChatService chatDbService)
        {
            _chatService = chatService;
            _chatDbService = chatDbService;
        }

        [HttpPost("register-user/{name}")]
        public IActionResult RegisterUser([FromRoute] string name)
        {
            if (_chatService.AddUserToList(name))
            {
                return NoContent();
            }
            return NoContent();
        }

        [HttpPost("save-chat-message")]
        public async Task<IActionResult> AddChatMessage([FromBody] ChatMessageRequest request)
        {
            await _chatDbService.AddChatMessage(request.From, request.To, request.Message, DateTime.Now);
            return Ok();
        }

        [HttpGet("load-conversation/{from}/{to}")]
        public async Task<IActionResult> loadConversation([FromRoute] string from, string to)
        {
            var conversation = await _chatDbService.LoadConversation(from, to);
            return Ok(conversation);
        }
    }
}