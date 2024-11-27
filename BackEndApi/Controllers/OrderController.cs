using Interface;
using Microsoft.AspNetCore.Mvc;
using ViewModel;

namespace BackEndApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("{buyerId}")]
        public async Task<IActionResult> GetOrdersByBuyerId(int buyerId)
        {
            var orders = await _orderService.GetOrdersByBuyerIdAsync(buyerId);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderCreateViewModel model)
        {
            try
            {
                var order = await _orderService.CreateOrderAsync(model);
                return CreatedAtAction(nameof(GetOrdersByBuyerId), new { buyerId = order.BuyerId }, order);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message); 
            }
        }


        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] string status)
        {
            var success = await _orderService.UpdateOrderStatusAsync(orderId, status);
            return success ? NoContent() : NotFound();
        }
    }
}
