using Domain.Entities;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Repositories
{
    public class AddressService : IAddressService
    {
        private readonly AppDbContext _context;

        public AddressService(AppDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách địa chỉ của người dùng
        public async Task<List<AddressViewModel>> GetAddressesAsync(int userId)
        {
            return await _context.Addresses
                                 .Where(a => a.UserId == userId)
                                 .Select(a => new AddressViewModel
                                 {
                                     AddressId = a.AddressId,
                                     Street = a.Street,
                                     City = a.City,
                                     State = a.State,
                                     AddressType = a.AddressType
                                 })
                                 .ToListAsync();
        }

        // Lấy địa chỉ theo ID
        public async Task<AddressViewModel> GetAddressByIdAsync(int addressId)
        {
            var address = await _context.Addresses
                                         .Where(a => a.AddressId == addressId)
                                         .Select(a => new AddressViewModel
                                         {
                                             AddressId = a.AddressId,
                                             Street = a.Street,
                                             City = a.City,
                                             State = a.State,
                                             AddressType = a.AddressType
                                         })
                                         .FirstOrDefaultAsync();

            return address;
        }

        // Thêm địa chỉ mới
        public async Task<bool> AddAddressAsync(int userId, AddressViewModel address)
        {
            var newAddress = new Address
            {
                UserId = userId,
                Street = address.Street,
                City = address.City,
                State = address.State,
                AddressType = address.AddressType
            };

            _context.Addresses.Add(newAddress);
            await _context.SaveChangesAsync();
            return true;
        }

        // Cập nhật địa chỉ
        public async Task<bool> UpdateAddressAsync(int addressId, AddressViewModel address)
        {
            var existingAddress = await _context.Addresses
                                                  .FirstOrDefaultAsync(a => a.AddressId == addressId);

            if (existingAddress == null)
                return false;

            existingAddress.Street = address.Street;
            existingAddress.City = address.City;
            existingAddress.State = address.State;
            existingAddress.AddressType = address.AddressType;

            _context.Addresses.Update(existingAddress);
            await _context.SaveChangesAsync();
            return true;
        }

        // Xoá địa chỉ
        public async Task<bool> DeleteAddressAsync(int addressId)
        {
            var address = await _context.Addresses
                                         .FirstOrDefaultAsync(a => a.AddressId == addressId);

            if (address == null)
                return false;

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
