using CartDataAccess;
using CartDataAccess.Entities;
using CartServices.Interfaces;
using CartViewModel;
using Microsoft.EntityFrameworkCore;

namespace CartServices.Implementations
{
    public class CartService : ICartService
    {
        private readonly CartDbContext _dbContext;

        public CartService(CartDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CartViewModel.CartViewModel> GetCartByUserIdAsync(int userId)
        {
            var cart = await _dbContext.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return null;

            return new CartViewModel.CartViewModel
            {
                CartId = cart.CartId,
                UserId = cart.UserId,
                CartItems = cart.CartItems.Select(item => new CartItemViewModel
                {
                    CartItemId = item.CartItemId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    CreatedAt = item.CreatedAt,
                    UpdatedAt = item.UpdatedAt,
                    IsActive = item.IsActive
                }).ToList()
            };
        }

        public async Task<bool> AddToCartAsync(int userId, int productId, int quantity)
        {
            var cart = await _dbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                await _dbContext.Carts.AddAsync(cart);
                await _dbContext.SaveChangesAsync();
            }

            var cartItem = new CartItem
            {
                CartId = cart.CartId,
                ProductId = productId,
                Quantity = quantity,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _dbContext.CartItems.AddAsync(cartItem);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveFromCartAsync(int userId, int cartItemId)
        {
            var cartItem = await _dbContext.CartItems.FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId);
            if (cartItem == null) return false;

            _dbContext.CartItems.Remove(cartItem);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> ClearCartAsync(int userId)
        {
            var cart = await _dbContext.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return false;

            _dbContext.CartItems.RemoveRange(cart.CartItems);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
