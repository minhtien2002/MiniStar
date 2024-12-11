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

        [HttpGet("orders/{buyerId}")]
        public async Task<IActionResult> GetOrdersByBuyerId(int buyerId)
        {
            var orders = await _orderService.GetOrdersByBuyerIdAsync(buyerId);
            return Ok(orders);
        }
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            try
            {
                var orderDetails = await _orderService.GetOrderDetailsByIdAsync(orderId);
                return Ok(orderDetails);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }
        [HttpGet("orders/summary")]
        public async Task<IActionResult> GetOrderSummaries()
        {
            var orderSummaries = await _orderService.GetAllOrderSummariesAsync();
            return Ok(orderSummaries);
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
        [HttpGet("checkout/{userId}")]
        public async Task<IActionResult> GetCheckoutByUserId(int userId)
        {
            var checkoutData = await _orderService.GetCheckoutByUserIdAsync(userId);
            if (checkoutData == null) return NotFound();

            return Ok(checkoutData);
        }


        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] string status)
        {
            var success = await _orderService.UpdateOrderStatusAsync(orderId, status);
            return success ? NoContent() : NotFound();
        }
        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            var success = await _orderService.DeleteOrder(orderId);
            return success ? Ok(new { message = "Order deleted successfully." }) :  NotFound(new { message = "Order not found." });

        }
    }
}
