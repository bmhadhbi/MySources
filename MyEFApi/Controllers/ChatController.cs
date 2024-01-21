using Microsoft.AspNetCore.Mvc;
using MyEFApi.Services;

namespace MyEFApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("register-user/{name}")]
        public IActionResult RegisterUser([FromRoute] string name)
        {
            if (_chatService.AddUserToList(name))
            {
                return NoContent();
            }
            return BadRequest("this name is taken");
        }

    }
}