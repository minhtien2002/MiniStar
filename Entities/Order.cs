namespace Domain.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public int BuyerId { get; set; }
        public string OrderStatus { get; set; } // pending, completed, shipped
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public User User { get; set; }
    }
}
