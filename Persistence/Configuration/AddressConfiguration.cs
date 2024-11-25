using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Persistence.Configuration
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("addresses");

            builder.HasKey(a => a.AddressId);
            builder.Property(a => a.Street).IsRequired().HasMaxLength(100);
            builder.Property(a => a.City).IsRequired().HasMaxLength(50);
            builder.Property(a => a.State).IsRequired().HasMaxLength(50);
            builder.Property(a => a.AddressType).IsRequired().HasMaxLength(10);

            builder.HasOne(a => a.User)
                   .WithMany()
                   .HasForeignKey(a => a.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
