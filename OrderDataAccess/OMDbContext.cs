using Microsoft.EntityFrameworkCore;
using OrderDataAccess.Configuration;
using OrderDataAccess.Entities;

namespace OrderDataAccess
{
    public class OMDbContext : DbContext
    {
        public OMDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new OrderDetailsConfiguration());
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetailss { get; set; }
    }
}

