using Microsoft.EntityFrameworkCore;
using CartDataAccess.Entities;

namespace CartDataAccess
{
    public class CartDbContext : DbContext
    {
        public CartDbContext(DbContextOptions<CartDbContext> options) : base(options)
        {
        }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new Configuration.CartConfiguration());
            modelBuilder.ApplyConfiguration(new Configuration.CartItemConfiguration());
        }
    }
}
