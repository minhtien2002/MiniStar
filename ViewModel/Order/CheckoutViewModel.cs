using ViewModel;

namespace ViewModel
{
    public class CheckoutViewModel
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<AddressViewModel> Addresses { get; set; }
        public List<CartItemViewModel> CartItems { get; set; }
        public decimal TotalAmount { get; set; } // Tổng giá tiền giỏ hàng
    }

}
