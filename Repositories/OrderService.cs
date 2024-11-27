
using Microsoft.EntityFrameworkCore;
using Interface;
using Persistence;
using ViewModel;
using Domain.Entities;

namespace Repositories
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderViewModel>> GetOrdersByBuyerIdAsync(int buyerId)
        {
            return await _context.Orders
                .Where(o => o.BuyerId == buyerId)
                .Select(o => new OrderViewModel
                {
                    OrderId = o.OrderId,
                    BuyerId = o.BuyerId,
                    OrderStatus = o.OrderStatus,
                    TotalAmount = o.TotalAmount,
                    CreatedAt = o.CreatedAt,
                    UpdatedAt = o.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<OrderViewModel> CreateOrderAsync(OrderCreateViewModel model)
        {
            // Lấy danh sách các CartItem của người dùng
            var cartItems = await _context.CartItems
                .Where(ci => ci.Cart.UserId == model.BuyerId && ci.IsActive)
                .ToListAsync();

            if (cartItems == null || !cartItems.Any())
            {
                throw new InvalidOperationException("No active cart items found for this user.");
            }

            // Tạo đơn hàng
            var order = new Order
            {
                BuyerId = model.BuyerId,
                OrderStatus = "pending",
                TotalAmount = cartItems.Sum(ci => ci.Price * ci.Quantity), // Tổng tiền từ giỏ hàng
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                OrderItems = cartItems.Select(ci => new OrderItem
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Price
                }).ToList()
            };

            _context.Orders.Add(order);

            // Đánh dấu các mục trong giỏ hàng là không hoạt động
            foreach (var cartItem in cartItems)
            {
                cartItem.IsActive = false;
            }

            // Lưu thay đổi
            await _context.SaveChangesAsync();

            return new OrderViewModel
            {
                OrderId = order.OrderId,
                BuyerId = order.BuyerId,
                OrderStatus = order.OrderStatus,
                TotalAmount = order.TotalAmount,
                CreatedAt = order.CreatedAt,
                UpdatedAt = order.UpdatedAt
            };
        }


        public async Task<bool> UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;

            order.OrderStatus = status;
            order.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
