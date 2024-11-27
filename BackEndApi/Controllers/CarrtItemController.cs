using Interface;
using ViewModel;
using Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _cartItemService;

        public CartItemController(ICartItemService cartItemService)
        {
            _cartItemService = cartItemService;
        }

        [HttpGet("{cartItemId}")]
        public async Task<IActionResult> GetCartItemById(int cartItemId)
        {
            var cartItem = await _cartItemService.GetCartItemByIdAsync(cartItemId);
            if (cartItem == null) return NotFound();

            return Ok(cartItem);
        }

        [HttpPut("{cartItemId}/quantity")]
        public async Task<IActionResult> UpdateCartItemQuantity(int cartItemId, [FromBody] UpdateQuantityRequest request)
        {
            if (request.Delta == 0) return BadRequest("Delta must not be zero.");

            var success = await _cartItemService.UpdateCartItemQuantityAsync(cartItemId, request.Delta);
            if (!success) return BadRequest("Failed to update quantity.");

            return NoContent();
        }

    }
}
