using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CartDataAccess.Entities;

namespace CartDataAccess.Configuration
{
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.ToTable("carts"); // Tên bảng là carts
            builder.HasKey(c => c.CartId); // Khóa chính

            // Thiết lập quan hệ 1-n giữa Cart và CartItem
            builder.HasMany(c => c.CartItems)
                   .WithOne(ci => ci.Cart)
                   .HasForeignKey(ci => ci.CartId);
        }
    }
}
