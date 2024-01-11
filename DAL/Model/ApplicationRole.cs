using Microsoft.AspNetCore.Identity;

namespace DAL.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole()
        { }

        public ApplicationRole(string roleName)
            : base(roleName) { }

        public ICollection<IdentityRoleClaim<string>> Claims { get; set; }

        /// <summary>
        /// Navigation property for the users in this role.
        /// </summary>
        public virtual ICollection<IdentityUserRole<string>> Users { get; set; }
    }
}