using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Persistence.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("orders");
            builder.HasKey(o => o.OrderId);
            builder.Property(o => o.OrderStatus)
                   .IsRequired()
                   .HasMaxLength(50);
            builder.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
        }
    }
}
