using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyEFApi.Helpers;
using MyEFApi.Requests;
using System.Text.Encodings.Web;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyEFApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IEmailSender _emailSender;

        public AccountController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        // GET: api/<AccountController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AccountController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AccountController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AccountController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AccountController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost("public/recoverpassword")]
        [AllowAnonymous]
        [ProducesResponseType(202)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> RecoverPassword([FromBody] UserPasswordRecovery recoveryInfo)
        {
            if (ModelState.IsValid)
            {
                //ApplicationUser appUser = null;

                //if (recoveryInfo.UsernameOrEmail.Contains("@"))
                //    appUser = await _accountManager.GetUserByEmailAsync(recoveryInfo.UsernameOrEmail);

                //appUser ??= await _accountManager.GetUserByUserNameAsync(recoveryInfo.UsernameOrEmail);

                //if (appUser == null || !await _accountManager.IsEmailConfirmedAsync(appUser))
                //{
                //    // Don't reveal that the user does not exist or is not confirmed
                //    return Accepted();
                //}

                //var code = await _accountManager.GeneratePasswordResetTokenAsync(appUser);
                var callbackUrl = "http://localhost:4200/dashboards/dashboard1"; // $"{Request.Scheme}://{Request.Host}/ResetPassword?code={code}";

                try
                {
                    var message = EmailTemplates.GetResetPasswordEmail("bechir", HtmlEncoder.Default.Encode(callbackUrl));

                    await _emailSender.SendEmailAsync("bechir", recoveryInfo.UsernameOrEmail, "Reset Password", message);

                    return Accepted();
                }
                catch (Exception ex)
                {
                    throw;
                }
            }

            return BadRequest(ModelState);
        }
    }
}