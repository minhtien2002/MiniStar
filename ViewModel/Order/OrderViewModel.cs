namespace ViewModel
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public int BuyerId { get; set; }
        public string OrderStatus { get; set; }
        public int AddressId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
