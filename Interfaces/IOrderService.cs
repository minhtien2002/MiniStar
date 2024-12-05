using ViewModel;

namespace Interface
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderViewModel>> GetOrdersByBuyerIdAsync(int buyerId);
        Task<OrderViewModel> CreateOrderAsync(OrderCreateViewModel model);
        Task<bool> UpdateOrderStatusAsync(int orderId, string status);
        Task<CheckoutViewModel> GetCheckoutByUserIdAsync(int userId);
        Task<OrderDetailsViewModel> GetOrderDetailsByIdAsync(int orderId);

    }
}
