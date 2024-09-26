using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductDataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductDataAccess.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    { 
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Category");
            builder.HasKey(x => x.CategoryId);
            builder.Property(x => x.CategoryId).IsRequired();
            builder.Property(x => x.CategoryName).HasMaxLength(60);
            builder.Property(x => x.CreateAt).HasDefaultValue(DateTime.Now);
            builder.Property(x => x.UpdateAt).HasDefaultValue(DateTime.Now);
            builder.Property(x => x.IsDeleted).HasDefaultValue(bool.FalseString);
        }
    }
}
