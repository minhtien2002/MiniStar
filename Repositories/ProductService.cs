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

        public async Task<List<ProductViewModel>> getProductByCategoryOrBrand(int? categoryId, int? brandId)
        {
            var query = from p in _appDbContext.Products
                        join c in _appDbContext.Categories on p.CategoryId equals c.CategoryId
                        join b in _appDbContext.Brands on p.BrandId equals b.BrandId
                        select new { p, c, b };
            if (categoryId != null && brandId != null)
            {
                query = query.Where(x => x.p.CategoryId.Equals(categoryId) && x.p.BrandId.Equals(brandId));
            }
            else if (categoryId != null || brandId != null)
            {
                query = query.Where(x => x.p.CategoryId.Equals(categoryId) || x.p.BrandId.Equals(brandId));
            }
            /*else 
            {
                query = query.Where(x => x.p.CategoryId == 0 || x.p.BrandId == 0);
            }*/

            List<ProductViewModel> products = await query.Select(x => new ProductViewModel()
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
            }).ToListAsync();
            return products;
        }

        public async Task<List<ProductViewModel>> sortProductAscendingOrDecreasing(string? sort)
        {
            var query = from p in _appDbContext.Products
                             join c in _appDbContext.Categories on p.CategoryId equals c.CategoryId
                             join b in _appDbContext.Brands on p.BrandId equals b.BrandId
                             select new { p, c, b };
            if (sort!=null && sort.Equals("ascending"))
            {
                query = query.OrderBy(x => x.p.Price);
            }
            else if (sort!=null && sort.Equals("decreasing"))
            {
                query = query.OrderByDescending(x => x.p.Price);
            }
            List<ProductViewModel> products = await query.Select(x => new ProductViewModel()
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
            }).ToListAsync();
            return products;
        }

        public async Task<List<ProductViewModel>> filterByCategoryOrBrand(List<int> category, List<int> brand)
        {
            var query = from p in _appDbContext.Products
                        join c in _appDbContext.Categories on p.CategoryId equals c.CategoryId
                        join b in _appDbContext.Brands on p.BrandId equals b.BrandId
                        select new { p, c, b };
            if (category != null || brand != null)
            {
                query = query.Where(x => category.Contains(x.c.CategoryId) || brand.Contains(x.b.BrandId));
            }
            List<ProductViewModel> products = await query.Select(x => new ProductViewModel()
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
            }).ToListAsync();
            return products;
        }
    }
}
