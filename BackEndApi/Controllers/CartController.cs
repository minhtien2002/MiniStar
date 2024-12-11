
using Interfaces;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace CartAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{userId}")]

        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _cartService.GetCartByUserIdAsync(userId);
            if (cart == null) return NotFound();
            return Ok(cart);
        }
        [HttpGet("item-count/{userId}")]
        public async Task<IActionResult> GetCartItemCount(int userId)
        {
         

            var cart = await _cartService.GetCartByUserIdAsync(userId);

            if (cart == null)
            {
                return Ok(0); 
            }
            var totalItemCount = cart.CartItems.Count;
            // var totalItemCount = cart.CartItems.Sum(item => item.Quantity);

            return Ok(totalItemCount);
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromQuery] int userId, [FromQuery] int productId, [FromQuery] int quantity)
        {
            //var roleId = HttpContext.Items["RoleId"] as int?;
            //if (roleId != 1) // 1 là admin
            //{
            //return Forbid("You are not authorized to access this endpoint.");
            //}
            var success = await _cartService.AddToCartAsync(userId, productId, quantity);
            if (!success) return BadRequest("Could not add to cart.");
            return Ok("Added to cart.");
        }

        [HttpDelete("remove/{userId}/{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(int userId, int cartItemId)
        {

            var success = await _cartService.RemoveFromCartAsync(userId, cartItemId);
            if (!success) return NotFound("Cart item not found.");
            return Ok("Removed from cart.");
        }

        [HttpDelete("clear/{userId}")]
        public async Task<IActionResult> ClearCart(int userId)
        {
            var success = await _cartService.ClearCartAsync(userId);
            if (!success) return BadRequest("Failed to clear cart");
            return Ok("Cart cleared.");
        }
    }
}
