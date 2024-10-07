using Microsoft.EntityFrameworkCore;
using OrderDataAccess;
using OrderDataAccess.Entities;
using OrderServices.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServices.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly OMDbContext _dbContext;

        public OrderService(OMDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> AddOder(Order order)
        {
            Order orders = new Order()
            {
                CustomerID = order.CustomerID,
                TotalQuantity = order.TotalQuantity,
                TotalAmount = order.TotalAmount,
                Note = order.Note,
                PaymentID = order.PaymentID,
                CreateAt = order.CreateAt
            };
            _dbContext.Orders.Add(orders);
            await _dbContext.SaveChangesAsync();
            return orders.OrderID;
        }

        public async Task<int> DeleteOder(int id)
        {
            var orders = await _dbContext.Orders.FindAsync(id);
            if (orders == null) {
                return 0;
            }
            _dbContext.Orders.Remove(orders);
            await _dbContext.SaveChangesAsync();
            return orders.OrderID;
        }

        public async Task<List<Order>> GetAll()
        {
         List<Order> ListOrder = await _dbContext.Set<Order>().ToListAsync();
            return ListOrder;
        }

        public async Task<Order> GetById(int id)
        {
            Order orders = await _dbContext.Orders.FindAsync(id);
            return orders;
            
        }

        public async Task<int> UpdateOder(Order order)
        {
            Order orders = await _dbContext.Orders.FindAsync(order.OrderID);
            if (orders == null) 
            { 
            return 0;
            }

            {
                orders.CustomerID = order.CustomerID;
                orders.TotalQuantity = order.TotalQuantity;
                orders.TotalAmount = order.TotalAmount;
                orders.Status = order.Status;
                orders.Note = order.Note;
                orders.PaymentID = order.PaymentID;
                orders.UpdateAt = order.UpdateAt;
            };
            _dbContext.Orders.Update(orders);
            await _dbContext.SaveChangesAsync();
            return orders.OrderID;
        }
    }
}
