using ProductDataAccess.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductViewModel
{
    public class ProductCreateViewModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ProductImage { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsDeleted { get; set; }
        public Category Category { get; set; }
        public Brand Brand { get; set; }
    }
}
