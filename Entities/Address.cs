using System;

namespace Domain.Entities
{
    public class Address
    {
        public int AddressId { get; set; }
        public int UserId { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string AddressType { get; set; } // home, company
        public User User { get; set; }
    }
}
