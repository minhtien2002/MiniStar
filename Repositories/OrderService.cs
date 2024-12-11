
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
        public async Task<OrderDetailsViewModel> GetOrderDetailsByIdAsync(int orderId)
        {
            var order = await _context.Orders
         .Include(o => o.OrderItems)
         .ThenInclude(oi => oi.Product)  
         .Include(o => o.Address)
         .Include(o => o.User)
         .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                throw new InvalidOperationException("Order not found.");
            }

            return new OrderDetailsViewModel
            {
                OrderId = order.OrderId,
                BuyerName = $"{order.User.FullName}",
                PhoneNumber = order.User.PhoneNumber,
                ShippingAddress = $"{order.Address.Street}, {order.Address.City}, {order.Address.State}",
                TotalAmount = order.TotalAmount,
                PaymentMethod = "Cash On Delivery (COD)",
                CreatedAt = order.CreatedAt,
                OrderStatus = order.OrderStatus,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDetailsViewModel
                {
                    ProductName = oi.Product.ProductName,  
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            

        };
        }
        public async Task<CheckoutViewModel> GetCheckoutByUserIdAsync(int userId)
        {
            // Lấy thông tin người dùng
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null) return null;

            // Lấy danh sách địa chỉ của người dùng
            var addresses = await _context.Addresses
                .Where(a => a.UserId == userId)
                .ToListAsync();

            // Lấy thông tin giỏ hàng
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return null;

            // Tính tổng giá tiền
            var totalAmount = cart.CartItems
                .Where(item => item.IsActive)
                .Sum(item => item.Quantity * item.Price);

            return new CheckoutViewModel
            {
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Addresses = addresses.Select(addr => new AddressViewModel
                {
                    AddressId = addr.AddressId,
                    Street = addr.Street,
                    City = addr.City,
                    State = addr.State,
                    AddressType = addr.AddressType
                }).ToList(),
                CartItems = cart.CartItems
                    .Where(item => item.IsActive)
                    .Select(item => new CartItemViewModel
                    {
                        Price = item.Price,
                        CartItemId = item.CartItemId,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        ProductName = item.Product.ProductName,
                        ProductImage = item.Product.ProductImage
                    }).ToList(),
                TotalAmount = totalAmount
            };
        }
        public async Task<List<OrderSummaryViewModel>> GetAllOrderSummariesAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.User)       // Bao gồm thông tin người mua
                .Include(o => o.Address)   // Bao gồm thông tin địa chỉ
                .ToListAsync();

            if (orders == null || !orders.Any()) return new List<OrderSummaryViewModel>();

            var orderSummaries = orders.Select(order => new OrderSummaryViewModel
            {
                OrderId = order.OrderId,
                BuyerName = order.User.FullName,
                PhoneNumber = order.User.PhoneNumber,
                DeliveryAddress = $"{order.Address.Street}, {order.Address.City}, {order.Address.State}", // Lấy địa chỉ đầy đủ
                TotalMoney = _context.OrderItems
                    .Where(oi => oi.OrderId == order.OrderId)
                    .Sum(oi => oi.Quantity * oi.Price), // Tính tổng tiền
                CreatedAt = order.CreatedAt,
                OrderStatus = order.OrderStatus
            }).ToList();

            return orderSummaries;
        }
        public async Task<OrderViewModel> CreateOrderAsync(OrderCreateViewModel model)
        {
            // Kiểm tra xem địa chỉ có tồn tại không
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.AddressId == model.AddressId && a.UserId == model.BuyerId);
            if (address == null)
            {
                throw new InvalidOperationException("Invalid address for the user.");
            }

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
                AddressId = model.AddressId, // Gắn AddressId vào đơn hàng
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
                AddressId = order.AddressId, // Trả về AddressId
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
        public async Task<bool> DeleteOrder(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return false;
            }

            // Remove associated order items
            _context.OrderItems.RemoveRange(order.OrderItems);

            // Remove the order itself
            _context.Orders.Remove(order);

            await _context.SaveChangesAsync();

            return true;
        }

    }
}
