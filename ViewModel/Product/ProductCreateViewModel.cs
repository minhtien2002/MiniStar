using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Product
{
    public class ProductCreateViewModel
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ProductImage { get; set; }
        public bool IsDeleted { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
    }
}
