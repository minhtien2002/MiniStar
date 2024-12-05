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
            modelBuilder.Entity<Order>()
       .HasOne(o => o.User) 
       .WithMany() 
       .HasForeignKey(o => o.BuyerId)
       .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new BrandConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new OrderItemConfiguration());
            modelBuilder.ApplyConfiguration(new CartConfiguration());
            modelBuilder.ApplyConfiguration(new CartItemConfiguration());
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Thịt heo", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Category { CategoryId = 2, CategoryName = "Hoa quả", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Category { CategoryId = 3, CategoryName = "Rau củ", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Category { CategoryId = 4, CategoryName = "Nước giải khát", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Category { CategoryId = 5, CategoryName = "Đồ ăn vặt", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, }
                );
            modelBuilder.Entity<Brand>().HasData(
                new Brand { BrandId = 1, BrandName = "Vượng CP", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 2, BrandName = "TONY Fruit", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 3, BrandName = "NYTO Fresh", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 4, BrandName = "Lavie", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 5, BrandName = "OneOne", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, }

                );
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, ProductName = "Xương heo có thịt", Description = "null", Price = 39, Quantity = 100, ProductImage = "xuongheo", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = false, BrandId = 1, CategoryId = 1 },
                new Product { ProductId = 2, ProductName = "Cam sành", Description = "null", Price = 31, Quantity = 300, ProductImage = "camsanh", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = false, BrandId = 2, CategoryId = 2 },
                new Product { ProductId = 3, ProductName = "Rau dền", Description = "null", Price = 8, Quantity = 50, ProductImage = "rauden", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = false, BrandId = 3, CategoryId = 3 },
                new Product { ProductId = 4, ProductName = "Nước khoáng Lavie", Description = "null", Price = 6, Quantity = 200, ProductImage = "lavie", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = false, BrandId = 4, CategoryId = 4 },
                new Product { ProductId = 5, ProductName = "Bánh gạo OneOne", Description = "null", Price = 10, Quantity = 70, ProductImage = "banhgao", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = false, BrandId = 5, CategoryId = 5 }
                );
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleID = 1, RoleName = "admin" },
                new Role { RoleID = 2, RoleName = "buyer" },
                new Role { RoleID = 3, RoleName = "supporter" }


            ); base.OnModelCreating(modelBuilder);
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
