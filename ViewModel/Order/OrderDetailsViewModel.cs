using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class OrderDetailsViewModel
    {
        public int OrderId { get; set; }
        public string BuyerName { get; set; }
        public string PhoneNumber { get; set; }
        public string ShippingAddress { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime CreatedAt { get; set; }
        public string OrderStatus { get; set; }
        public List<OrderItemDetailsViewModel> OrderItems { get; set; }
    }

}
