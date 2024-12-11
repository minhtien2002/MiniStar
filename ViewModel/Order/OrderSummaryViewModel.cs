using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class OrderSummaryViewModel
    {
        public int OrderId { get; set; }
        public string BuyerName { get; set; }
        public string PhoneNumber { get; set; }
        public string DeliveryAddress { get; set; } // Hiển thị địa chỉ lấy từ Address
        public decimal TotalMoney { get; set; }
        public DateTime CreatedAt { get; set; }
        public string OrderStatus { get; set; }
    }

}
