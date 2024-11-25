using ViewModel.Order;

namespace ViewModel
{
    public class OrderCreateViewModel
    {
        public int BuyerId { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderItemCreateViewModel> OrderItems { get; set; }
    }

}
