using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Interfaces
{
    public interface IAddressService
    {
        Task<List<AddressViewModel>> GetAddressesAsync(int userId);
        Task<AddressViewModel> GetAddressByIdAsync(int addressId); 
        Task<bool> AddAddressAsync(int userId, AddressViewModel address);
        Task<bool> UpdateAddressAsync(int addressId, AddressViewModel address);
        Task<bool> DeleteAddressAsync(int addressId);
    }
}
