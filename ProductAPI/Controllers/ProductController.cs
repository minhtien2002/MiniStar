using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductDataAccess.Entities;
using ProductServices.Implementation;
using ProductServices.Interface;
using ProductViewModel;

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

        [HttpGet]
        public async Task<ActionResult> Get() {
            var response = await productService.GetAll();
            return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var response = await productService.GetById(id);
            return Ok(response);
        }
        [HttpPost]
        public async Task<ActionResult> CreateProduct([FromBody] ProductCreateViewModel product)
        {
            var newProduct = await productService.Create(product);
            return Ok(newProduct);
        }
    }
}
