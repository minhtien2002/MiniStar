namespace OrderViewModel
{
    public class OrderCreateViewModel
    {
        public int BuyerId { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderItemCreateViewModel> OrderItems { get; set; }
    }

    public class OrderItemCreateViewModel
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
