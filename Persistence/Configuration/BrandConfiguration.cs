using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Configuration
{
    public class BrandConfiguration : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder.ToTable("Brand");
            builder.HasKey(x => x.BrandId);
            builder.Property(x => x.BrandId).IsRequired();
            builder.Property(x => x.BrandName).HasMaxLength(60);
            builder.Property(x => x.CreateAt).HasDefaultValue(DateTime.Now);
            builder.Property(x => x.UpdateAt).HasDefaultValue(DateTime.Now);
            builder.Property(x => x.IsDeleted).HasDefaultValue(bool.FalseString);
        }
    }
}
