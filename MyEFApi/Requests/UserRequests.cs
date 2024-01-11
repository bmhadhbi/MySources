using System.ComponentModel.DataAnnotations;

namespace MyEFApi.Requests
{
    public class UserRequests
    {
    }

    public class UserPasswordRecovery
    {
        [Required(ErrorMessage = "Username or email address is required")]
        public string UsernameOrEmail { get; set; }
    }
}
