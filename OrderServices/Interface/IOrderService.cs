using OrderViewModel;

namespace OrderServices.Interface
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderViewModel.OrderViewModel>> GetOrdersByBuyerIdAsync(int buyerId);
        Task<OrderViewModel.OrderViewModel> CreateOrderAsync(OrderCreateViewModel model);
        Task<bool> UpdateOrderStatusAsync(int orderId, string status);
    }
}
