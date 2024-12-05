using Azure.Core;
using Domain.Entities;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewModel.Product;


namespace BackEndApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IProductService productService;

        public ProductController(IUnitOfWork unitOfWork, IProductService productService)
        {
            this.unitOfWork = unitOfWork;
            this.productService = productService;
        }

        [HttpGet("GetAll")]
        public ActionResult GetAll() 
        {
            List<ProductViewModel> result = productService.getProductAllFK();
            //List<Product> result = await unitOfWork.Products.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("GetById={id}")]
        public async Task<ActionResult> GetById(int id)
        {
            Product result = await unitOfWork.Products.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> Create([FromBody] ProductCreateViewModel product)
        {
            var cate = await unitOfWork.Categories.GetByIdAsync(product.CategoryId);
            if (cate == null) return BadRequest("Not Found category");

            var b = await unitOfWork.Brands.GetByIdAsync(product.BrandId);
            if (b == null) return BadRequest("Not Found brand");

            
                Product p = new Product()
                {
                    ProductName = product.ProductName,
                    Description = product.Description,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    ProductImage = product.ProductImage,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                    IsDeleted = true,
                    CategoryId = cate.CategoryId,
                    BrandId = b.BrandId,
                };
            await unitOfWork.Products.AddAsync(p);
            int response = await unitOfWork.CompleteAsync();
                
            return Ok(response);
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] ProductEditViewModel request)
        {
            Product product = await unitOfWork.Products.GetByIdAsync(request.ProductId);
            if (product == null) return BadRequest("NOT FOUND!");
            product.ProductName = request.ProductName;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Quantity = request.Quantity;
            product.ProductImage = request.ProductImage;
            product.UpdateAt = DateTime.Now;
            product.IsDeleted = request.IsDeleted;
            product.CategoryId = request.CategoryId;
            product.BrandId = request.BrandId;
            unitOfWork.Products.Update(product);
            int response = await unitOfWork.CompleteAsync();
            return Ok(response);
        }

        [HttpDelete("DeleteById={id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Product result = await unitOfWork.Products.GetByIdAsync(id);
            if (result == null) {
                return BadRequest("NOT FOUND!");    
            }
            unitOfWork.Products.Remove(result);
            await unitOfWork.CompleteAsync();
            return Ok("Remove Success!");
        }
        [HttpGet("GetCount")]
        public async Task<IActionResult> GetCount()
        {
            int result = await unitOfWork.Products.GetCountAsync();
            return Ok(result);
        }
    }
}
