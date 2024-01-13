using AutoMapper;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyEFApi.Helpers;
using MyEFApi.ViewModels;
using System.Text.Encodings.Web;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyEFApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;
        private readonly IAccountManager _accountManager;

        public AccountController(IEmailSender emailSender, IMapper mapper, IAccountManager accountManager)
        {
            _emailSender = emailSender;
            _mapper = mapper;
            _accountManager = accountManager;
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
                try
                {
                    ApplicationUser appUser = null;

                    if (recoveryInfo.UsernameOrEmail.Contains("@"))
                        appUser = await _accountManager.GetUserByEmailAsync(recoveryInfo.UsernameOrEmail);

                    appUser ??= await _accountManager.GetUserByUserNameAsync(recoveryInfo.UsernameOrEmail);

                    if (appUser == null || !await _accountManager.IsEmailConfirmedAsync(appUser))
                    {
                        // Don't reveal that the user does not exist or is not confirmed
                        return Accepted();
                    }

                    var code = await _accountManager.GeneratePasswordResetTokenAsync(appUser);
                    var callbackUrl = $"http://localhost:4200/authentication/reset?code={code}";
                    //var callbackUrl = $"{Request.Scheme}://{Request.Host}/authentication/reset?code={code}";

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
                catch (Exception ex)
                {
                    throw;
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register([FromBody] UserEditRequest user)
        {
            //if (!(await _authorizationService.AuthorizeAsync(User, (user.Roles, new string[] { }), Policies.AssignAllowedRolesPolicy)).Succeeded)
            //    return new ChallengeResult();

            if (ModelState.IsValid)
            {
                if (user == null)
                    return BadRequest($"{nameof(user)} cannot be null");

                var appUser = _mapper.Map<ApplicationUser>(user);

                var result = await _accountManager.CreateUserAsync(appUser, user.Roles, user.NewPassword);
                if (result.Succeeded)
                {
                    await SendVerificationEmail(appUser);

                    //var userVM = await GetUserViewModelHelper(appUser.Id);
                    //return CreatedAtAction("GetUserById", new { id = userVM.Id }, userVM);
                    return Ok();
                }

                AddError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        private async Task SendVerificationEmail(ApplicationUser appUser)
        {
            var code = await _accountManager.GenerateEmailConfirmationTokenAsync(appUser);
            var callbackUrl = EmailTemplates.GetConfirmEmailCallbackUrl(Request, appUser.Id, code);
            var message = EmailTemplates.GetConfirmAccountEmail(appUser.UserName, callbackUrl);

            await _emailSender.SendEmailAsync(appUser.UserName, appUser.Email, "Confirm your email", message);
        }

        private async Task<UserRequest> GetUserViewModelHelper(string userId)
        {
            var userAndRoles = await _accountManager.GetUserAndRolesAsync(userId);
            if (userAndRoles == null)
                return null;

            var userVM = _mapper.Map<UserRequest>(userAndRoles.Value.User);
            userVM.Roles = userAndRoles.Value.Roles;

            return userVM;
        }

        [HttpPost("public/resetpassword")]
        [AllowAnonymous]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ResetPassword([FromBody] UserPasswordReset resetInfo)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = null;

                if (resetInfo.UsernameOrEmail.Contains("@"))
                    appUser = await _accountManager.GetUserByEmailAsync(resetInfo.UsernameOrEmail);

                appUser ??= await _accountManager.GetUserByUserNameAsync(resetInfo.UsernameOrEmail);

                if (appUser == null)
                {
                    // Don't reveal that the user does not exist
                    return NoContent();
                }

                var result = await _accountManager.ResetPasswordAsync(appUser, resetInfo.ResetCode, resetInfo.Password);
                if (!result.Succeeded)
                    return BadRequest($"Resetting password failed for user \"{appUser.UserName}\". Errors: {string.Join(", ", result.Errors)}");

                return NoContent();
            }

            return BadRequest(ModelState);
        }

        private void AddError(IEnumerable<string> errors, string key = "")
        {
            foreach (var error in errors)
            {
                AddError(error, key);
            }
        }

        private void AddError(string error, string key = "")
        {
            ModelState.AddModelError(key, error);
        }
    }
}