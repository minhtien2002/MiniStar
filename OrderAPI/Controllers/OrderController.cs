using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderServices.Implementation;
using OrderServices.Interface;

namespace OrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var response = await orderService.GetAll();
            return Ok(response);
        }
    }
   
}
