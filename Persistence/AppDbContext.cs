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
                new Category { CategoryId = 5, CategoryName = "Đồ ăn vặt", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Category { CategoryId = 6, CategoryName = "Gạo", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, }
                );
            modelBuilder.Entity<Brand>().HasData(
                new Brand { BrandId = 1, BrandName = "Vượng CP", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 2, BrandName = "TONY Fruit", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 3, BrandName = "NYTO Fresh", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 4, BrandName = "Lavie", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 5, BrandName = "OneOne", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 6, BrandName = "FnV", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 7, BrandName = "Budweiser", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, },
                new Brand { BrandId = 8, BrandName = "Neptune", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, }
                );
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, ProductName = "Xương heo có thịt", Description = "null", Price = 39, Quantity = 100, ProductImage = "xuongheo.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 1, CategoryId = 1 },
 new Product { ProductId = 2, ProductName = "Cam sành", Description = "null", Price = 31, Quantity = 300, ProductImage = "camsanh.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 2, CategoryId = 2 },
 new Product { ProductId = 3, ProductName = "Rau dền", Description = "null", Price = 8, Quantity = 50, ProductImage = "rauden.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 3, CategoryId = 3 },
 new Product { ProductId = 4, ProductName = "Nước khoáng Lavie", Description = "null", Price = 6, Quantity = 200, ProductImage = "lavie.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 4, CategoryId = 4 },
 new Product { ProductId = 5, ProductName = "Bánh gạo OneOne", Description = "null", Price = 10, Quantity = 70, ProductImage = "banhgao.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 5, CategoryId = 5 },
 new Product { ProductId = 6, ProductName = "Tết rôm rả", Description = "null", Price = 40, Quantity = 30, ProductImage = "banhgaotet.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 6, CategoryId = 5 },
 new Product { ProductId = 7, ProductName = "Ức gà có xương", Description = "null", Price = 25, Quantity = 10, ProductImage = "ucgacoxuong.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 1, CategoryId = 1 },
 new Product { ProductId = 8, ProductName = "Cải bẹ xanh", Description = "null", Price = 10, Quantity = 40, ProductImage = "caibexanh.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 3, CategoryId = 3 },
 new Product { ProductId = 9, ProductName = "Thùng 20 lon", Description = "null", Price = 300, Quantity = 20, ProductImage = "bia.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 7, CategoryId = 4 },
 new Product { ProductId = 10, ProductName = "Gạo ST25 5kg", Description = "null", Price = 139, Quantity = 60, ProductImage = "gao.png", CreateAt = DateTime.Now, UpdateAt = DateTime.Now, IsDeleted = true, BrandId = 8, CategoryId = 6 });
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleID = 1, RoleName = "admin" },
                new Role { RoleID = 2, RoleName = "buyer" },
                new Role { RoleID = 3, RoleName = "supporter" }


            );
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Username = "admin", Password = "admin", FullName = "Vuong dep trai", Email = "vuongdeptrai@gmail.com", EmailVerified = true, PhoneNumber = "0123456789", Gender = "sigmaMale", RoleId = 1, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now },
                new User { UserId = 2, Username = "hai", Password = "hai", FullName = "Hai xinh gai", Email = "haixinhgai@gmail.com", EmailVerified = true, PhoneNumber = "0112233445", Gender = "Female", RoleId = 2, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now },
                new User { UserId = 3, Username = "tien", Password = "tien", FullName = "Tien thieu tien", Email = "tienthieutien@gmail.com", EmailVerified = true, PhoneNumber = "0987654321", Gender = "Male", RoleId = 2, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now }
                );
            modelBuilder.Entity<Address>().HasData(
                new Address { AddressId = 1, UserId = 2, Street = "duong 15", State = "tan quy", City = "ho chi minh", AddressType = "home" }
                );
            modelBuilder.Entity<Order>().HasData(
                new Order { OrderId = 1, BuyerId = 2, OrderStatus = "pending", TotalAmount = 123, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, AddressId = 1 },
                new Order { OrderId = 2, BuyerId = 3, OrderStatus = "pending", TotalAmount = 333, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, AddressId = 1 },
                new Order { OrderId = 3, BuyerId = 2, OrderStatus = "pending", TotalAmount = 444, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, AddressId = 1 },
                new Order { OrderId = 4, BuyerId = 3, OrderStatus = "pending", TotalAmount = 666, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, AddressId = 1 }
                );
            modelBuilder.Entity<OrderItem>().HasData(
                new OrderItem { OrderItemId = 1, OrderId = 4, ProductId = 3, Quantity = 2, Price = 22 },
                new OrderItem { OrderItemId = 2, OrderId = 3, ProductId = 5, Quantity = 4, Price = 11 },
                new OrderItem { OrderItemId = 3, OrderId = 2, ProductId = 1, Quantity = 3, Price = 33 },
                new OrderItem { OrderItemId = 4, OrderId = 1, ProductId = 2, Quantity = 5, Price = 44 }
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
