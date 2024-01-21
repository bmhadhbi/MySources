using MyEFApi.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MyEFApi.ViewModels
{
    public class UserRequest : UserBaseRequest
    {
        public bool IsLockedOut { get; set; }
        public bool EmailConfirmed { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
    }

    public class UserEditRequest : UserBaseRequest
    {
        public string CurrentPassword { get; set; }

        [MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        public string NewPassword { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
    }

    public class UserPublicRegisterRequest : UserBaseRequest
    {
        public UserPublicRegisterRequest()
        {
            IsEnabled = true;
        }

        [MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        public string NewPassword { get; set; }
    }

    public class UserPasswordRecovery
    {
        [Required(ErrorMessage = "Username or email address is required")]
        public string UsernameOrEmail { get; set; }
    }

    public class UserPasswordReset
    {
        [Required(ErrorMessage = "Username or email address is required")]
        public string UsernameOrEmail { get; set; }

        [Required(ErrorMessage = "Password is required"), MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Password reset code is required")]
        public string ResetCode { get; set; }
    }

    public class UserPatchViewModel
    {
        public string FullName { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }
    }

    public class UserCredentials
    {
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }
    }

    public abstract class UserBaseRequest
    {
        public virtual void SanitizeModel()
        {
            Id = Id.NullIfWhiteSpace();
            UserName = UserName.NullIfWhiteSpace();
            FullName = FullName.NullIfWhiteSpace();
            Email = Email.NullIfWhiteSpace();
            JobTitle = JobTitle.NullIfWhiteSpace();
            PhoneNumber = PhoneNumber.NullIfWhiteSpace();
            Configuration = Configuration.NullIfWhiteSpace();
        }

        public string Id { get; set; }

        [Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
        public string UserName { get; set; }

        public string FullName { get; set; }

        [Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }

        public bool IsEnabled { get; set; }
    }
}