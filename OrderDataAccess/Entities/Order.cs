using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderDataAccess.Entities
{
    public class Order
    {
        public Order()
        {
        }

        public int OrderID { get; set; }
        public int CustomerID { get; set; }
        public int TotalQuantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        public Status Status { get; set; } //
        public string Note { get; set; }
        public int PaymentID { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; } //

        public List<OrderDetails>? OrderDetails { get; } //

    }
}
