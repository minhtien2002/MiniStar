using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CartDataAccess.Entities;

namespace CartDataAccess.Configuration
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.ToTable("cart_items"); 
            builder.HasKey(ci => ci.CartItemId); 

            // Thiết lập quan hệ n-1 giữa CartItem và Cart
            builder.HasOne(ci => ci.Cart)
                   .WithMany(c => c.CartItems)
                   .HasForeignKey(ci => ci.CartId);

            // Thiết lập các cột cần thiết
            builder.Property(ci => ci.CreatedAt).IsRequired();
            builder.Property(ci => ci.UpdatedAt).IsRequired();
            builder.Property(ci => ci.IsActive).HasDefaultValue(true); 
        }
    }
}
