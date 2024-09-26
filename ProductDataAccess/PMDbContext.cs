using Microsoft.EntityFrameworkCore;
using ProductDataAccess.Configuration;
using ProductDataAccess.Entities;

namespace ProductDataAccess
{
    public class PMDbContext : DbContext
    {
        public PMDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new BrandConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
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
    }
}
