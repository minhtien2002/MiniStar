using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderDataAccess.Entities;

namespace OrderDataAccess.Configuration
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.ToTable("order_items");
            builder.HasKey(oi => oi.OrderItemId);
            builder.Property(oi => oi.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(oi => oi.Order)
                   .WithMany(o => o.OrderItems)
                   .HasForeignKey(oi => oi.OrderId);
        }
    }
}
