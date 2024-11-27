
using Domain.Entities;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Diagnostics;
using ViewModel;

namespace Repositories
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _dbContext;

        public CartService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CartViewModel> GetCartByUserIdAsync(int userId)
        {
            var cart = await _dbContext.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return null;

            return new CartViewModel
            {
                CartId = cart.CartId,
                UserId = cart.UserId,
                CartItems = cart.CartItems
                    .Where(item => item.IsActive) // Lọc các CartItem có IsActive = true
                    .Select(item => new CartItemViewModel
                    {
                        Price = item.Price,
                        CartItemId = item.CartItemId,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        CreatedAt = item.CreatedAt,
                        UpdatedAt = item.UpdatedAt,
                        IsActive = item.IsActive,
                        // Lấy thêm thông tin từ Product
                        ProductName = item.Product.ProductName,
                        ProductImage = item.Product.ProductImage,
                    })
                    .ToList()
            };
        }



        public async Task<bool> AddToCartAsync(int userId, int productId, int quantity)
        {
            // Lấy sản phẩm từ database
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null || product.Quantity < quantity)
                return false; // Không thể thêm nếu không đủ hàng hoặc sản phẩm không tồn tại

            // Lấy giỏ hàng của user
            var cart = await _dbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId
                };
                await _dbContext.Carts.AddAsync(cart);
                await _dbContext.SaveChangesAsync(); // Lưu để lấy CartId
            }

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            var existingCartItem = await _dbContext.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cart.CartId && ci.ProductId == productId && ci.IsActive !=false);
         
            if (existingCartItem != null)
            {
                // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
                existingCartItem.Quantity += quantity;
                existingCartItem.Price = product.Price; // Cập nhật giá nếu cần
                existingCartItem.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                // Thêm sản phẩm mới vào giỏ hàng
                var cartItem = new CartItem
                {
                    CartId = cart.CartId,
                    ProductId = productId,
                    Quantity = quantity,
                    Price = product.Price, // Lấy giá từ sản phẩm
                    ProductName = product.ProductName, // Lấy tên từ sản phẩm
                    ProductImage = product.ProductImage, // Lấy ảnh từ sản phẩm
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                };
                await _dbContext.CartItems.AddAsync(cartItem);
            }

            // Trừ số lượng sản phẩm trong kho
            product.Quantity -= quantity;

            // Lưu thay đổi
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveFromCartAsync(int userId, int cartItemId)
        {
            // Kiểm tra mục giỏ hàng thuộc về người dùng
            var cartItem = await _dbContext.CartItems
                .Include(ci => ci.Cart)
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.Cart.UserId == userId);

            if (cartItem == null) return false;

            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == cartItem.ProductId);
            if (product != null)
            {
                product.Quantity += cartItem.Quantity;
            }

            _dbContext.CartItems.Remove(cartItem);

            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> ClearCartAsync(int userId)
        {
            // Lấy giỏ hàng của user
            var cart = await _dbContext.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return false;

            // Phục hồi số lượng cho từng sản phẩm
            foreach (var cartItem in cart.CartItems)
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == cartItem.ProductId);
                if (product != null)
                {
                    product.Quantity += cartItem.Quantity;
                }
            }

            // Xóa tất cả các mục trong giỏ hàng
            _dbContext.CartItems.RemoveRange(cart.CartItems);

            // Lưu thay đổi
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
