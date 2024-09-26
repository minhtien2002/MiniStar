using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductDataAccess.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ProductImage { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsDeleted { get; set; }
        public int? CategoryId {  get; set; }
        public Category Category { get; set; }
        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }

        public Product() { }
    }
}
