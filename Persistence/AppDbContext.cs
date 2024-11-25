using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Persistence.Configuration;

namespace Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new BrandConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new OrderItemConfiguration());
            modelBuilder.ApplyConfiguration(new Configuration.CartConfiguration());
            modelBuilder.ApplyConfiguration(new Configuration.CartItemConfiguration());
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId=1,CategoryName="tiemgu",CreateAt=DateTime.Now,UpdateAt=DateTime.Now,IsDeleted=true,  }
                
                );
            modelBuilder.Entity<Brand>().HasData(
                new Brand {BrandId=1,BrandName="asas", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, }

                );
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
    }
}
