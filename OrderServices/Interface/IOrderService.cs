using OrderDataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServices.Interface
{
    public interface IOrderService
    {
        Task<List<Order>> GetAll();
        Task<Order> GetById(int id);
        Task<int> AddOder(Order order);
        Task<int> UpdateOder(Order order);
        Task<int> DeleteOder(int id);
         //Task Search(Order order);
        
    }
}
