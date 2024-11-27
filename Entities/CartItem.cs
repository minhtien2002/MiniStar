namespace Domain.Entities
{
    public class CartItem
    {
        public int CartItemId { get; set; } 
        public int CartId { get; set; } 
        public int ProductId { get; set; } 
        public int Quantity { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public bool IsActive { get; set; }
        public decimal Price { get; set; }
        public string ProductImage { get; set; }
        public string ProductName { get; set; }

        public Cart Cart { get; set; }
        public Product Product { get; set; }

    }
}
