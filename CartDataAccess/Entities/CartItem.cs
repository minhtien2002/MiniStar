namespace CartDataAccess.Entities
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

        public Cart Cart { get; set; }
    }
}
