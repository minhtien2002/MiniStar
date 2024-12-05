using Domain.Entities;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.Product;

namespace Repositories
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _appDbContext;

        public ProductService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<ProductViewModel> getProductAllFK()
        {
            var product = from p in _appDbContext.Products
                              join c in _appDbContext.Categories on p.CategoryId equals c.CategoryId
                              join b in _appDbContext.Brands on p.BrandId equals b.BrandId
                              select new { p, c, b };
            var data = product.Select(x => new ProductViewModel()
            {
                ProductId = x.p.ProductId,
                ProductName = x.p.ProductName,
                Description = x.p.Description,
                Price = x.p.Price,
                Quantity = x.p.Quantity,
                ProductImage = x.p.ProductImage,
                CreateAt = x.p.CreateAt,
                UpdateAt = x.p.UpdateAt,
                IsDeleted = x.p.IsDeleted,
                Categories = x.c,
                Brands = x.b,
            }).ToList();

            return data;
        }
    }
}
