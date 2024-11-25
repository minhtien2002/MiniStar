using OrderServices.Interface;
using OrderDataAccess;
using OrderDataAccess.Entities;
using OrderViewModel;
using Microsoft.EntityFrameworkCore;

namespace OrderServices.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly OrderDbContext _context;

        public OrderService(OrderDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderViewModel.OrderViewModel>> GetOrdersByBuyerIdAsync(int buyerId)
        {
            return await _context.Orders
                .Where(o => o.BuyerId == buyerId)
                .Select(o => new OrderViewModel.OrderViewModel
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

        public async Task<OrderViewModel.OrderViewModel> CreateOrderAsync(OrderCreateViewModel model)
        {
            var order = new Order
            {
                BuyerId = model.BuyerId,
                OrderStatus = "pending",
                TotalAmount = model.TotalAmount,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                OrderItems = model.OrderItems.Select(oi => new OrderItem
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return new OrderViewModel.OrderViewModel
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
