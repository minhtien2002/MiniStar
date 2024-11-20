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

        public ProductController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult> GetAll() {
            List<Product> result = await unitOfWork.Products.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("GetById={id}")]
        public async Task<ActionResult> GetById(int id)
        {
            Product result = await unitOfWork.Products.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> Create([FromBody] ProductViewModel product)
        {
            try
            {
                Product p = new Product()
                {
                    ProductName = product.ProductName,
                    Description = product.Description,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    ProductImage = product.ProductImage,
                    CreateAt = product.CreateAt,
                    UpdateAt = DateTime.Now,
                    IsDeleted = product.IsDeleted,
                    CategoryId = product.Categories.CategoryId,
                    BrandId = product.Brands.BrandId,
                };
                await unitOfWork.Products.AddAsync(p);
                await unitOfWork.CompleteAsync();
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] ProductViewModel request)
        {
            Product product = await unitOfWork.Products.GetByIdAsync(request.ProductId);
            if (product == null) return BadRequest("NOT FOUND!");
            product.ProductName = request.ProductName;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Quantity = request.Quantity;
            product.ProductImage = request.ProductImage;
            product.UpdateAt = request.UpdateAt;
            product.IsDeleted = request.IsDeleted;
            product.CategoryId = request.Categories.CategoryId;
            product.BrandId = request.Brands.BrandId;
            unitOfWork.Products.Update(product);
            await unitOfWork.CompleteAsync();
            return Ok("Edit Success!");
        }

        [HttpDelete("DeleteById={id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Product result = await unitOfWork.Products.GetByIdAsync(id);
            if (result != null) {
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
