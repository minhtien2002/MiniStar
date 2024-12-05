using Domain.Entities;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ViewModel;

namespace CartServices.Implementation
{
    public class CartItemService : ICartItemService
    {
        private readonly AppDbContext _context;

        public CartItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CartItemViewModel> GetCartItemByIdAsync(int cartItemId)
        {
            var cartItem = await _context.CartItems
                .Where(ci => ci.CartItemId == cartItemId)
                .Select(ci => new CartItemViewModel
                {
                    CartItemId = ci.CartItemId,
                    CartId = ci.CartId,
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Price,
                    CreatedAt = ci.CreatedAt,
                    UpdatedAt = ci.UpdatedAt,
                    IsActive = ci.IsActive
                })
                .FirstOrDefaultAsync();

            return cartItem;
        }

        public async Task<bool> UpdateCartItemQuantityAsync(int cartItemId, int delta)
        {
            // Lấy mục giỏ hàng cần cập nhật
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId);
            if (cartItem == null) return false;

            // Lấy sản phẩm tương ứng
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == cartItem.ProductId);
            if (product == null) return false;

            // Tính số lượng mới
            var newQuantity = cartItem.Quantity + delta;

            // Kiểm tra số lượng mới
            if (newQuantity <= 0 || (delta > 0 && product.Quantity < delta))
            {
                return false; // Không thể giảm xuống dưới 1 hoặc vượt quá tồn kho
            }

            // Điều chỉnh số lượng trong kho
            product.Quantity -= delta;

            // Cập nhật số lượng trong giỏ hàng
            cartItem.Quantity = newQuantity;
            cartItem.UpdatedAt = DateTime.UtcNow;

            // Lưu thay đổi
            return await _context.SaveChangesAsync() > 0;
        }


    }
}
