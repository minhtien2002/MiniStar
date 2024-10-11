using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductDataAccess.Entities;
using ProductServices.Implementation;
using ProductServices.Interface;
using ProductViewModel;
using ProductViewModels;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet("AllProduct")]
        public async Task<ActionResult> GetAll() {
            List<Product> result = await productService.GetAll();
            return Ok(result);
        }

        [HttpGet("Product={id}")]
        public async Task<ActionResult> GetProductById(int id)
        {
            Product result = await productService.GetById(id);
            return Ok(result);
        }

        [HttpPost("CreateNewProduct")]
        public async Task<ActionResult> CreateNewProduct([FromBody] ProductCreateViewModel product)
        {
            int result = await productService.Create(product);
            return Ok(result);
        }

        [HttpPut("EditProduct")]
        public async Task<IActionResult> EditProduct([FromBody] ProductEditViewModel product)
        {
            int result = await productService.Update(product);
            return Ok(result);
        }

        [HttpDelete("DeleteProductBy{id}")]
        public async Task<IActionResult> DeleteProductById(int id)
        {
            int result = await productService.DeleteById(id);
            return Ok(result);
        }
    }
}
