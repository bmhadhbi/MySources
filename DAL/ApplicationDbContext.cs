using DAL.Models;
using Microsoft.EntityFrameworkCore;
namespace DAL
{
    public class ApplicationDbContext:DbContext
    {
        private string connectionString = "server=localhost;user=root;database=quickapp;password=aze123";
        public ApplicationDbContext()
        {
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
    }
}
