using Azure;
using Microsoft.EntityFrameworkCore;
using ProductDataAccess;
using ProductDataAccess.Entities;
using ProductServices.Interface;
using ProductViewModel;
using ProductViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductServices.Implementation
{
    public class ProductService : IProductService
    {
        private readonly PMDbContext _context;

        public ProductService(PMDbContext context) {
            _context = context;
        }

        public async Task<int> Create(ProductCreateViewModel product)
        {

            Product p = new Product()
            {
                ProductName = product.ProductName,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                ProductImage = product.ProductImage,
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now,
                IsDeleted = product.IsDeleted,
                CategoryId = product.Category.CategoryId,
                BrandId = product.Brand.BrandId,
            };
            _context.Products.Add(p);
            await _context.SaveChangesAsync();
            return Convert.ToInt32(p.ProductId);
        }

        public async Task<int> DeleteById(int id)
        {
            Product product = await _context.Products.FindAsync(id);
            if (product == null) {
                return -1;
            }
            _context.Products.Remove(product);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAll()
        {
            List<Product> response = await _context.Set<Product>().ToListAsync();
            return response;
        }

        public Task<Product> GetById(int id)
        {
            var a = from pr in _context.Products
                    join px in _context.Categories on pr.CategoryId equals px.CategoryId
                    join pc in _context.Brands on pr.BrandId equals pc.BrandId
                    where pr.ProductId == id
                    select new Product
                    {
                        ProductId = pr.ProductId,
                        ProductName = pr.ProductName,
                        Brand = pc,
                        Category = px,
                    };

            return a.FirstOrDefaultAsync();
        }

        public async Task<int> Update(ProductEditViewModel request)
        {
            Product product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return 0;
            product.ProductName = request.ProductName;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Quantity = request.Quantity;
            product.ProductImage = request.ProductImage;
            product.UpdateAt = request.UpdateAt;
            product.IsDeleted = request.IsDeleted;
            product.CategoryId = request.Category.CategoryId;
            product.BrandId = request.Brand.BrandId;
            _context.Products.Update(product);
            return await _context.SaveChangesAsync();
        }
    }
}
