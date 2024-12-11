using Interfaces;
using Microsoft.AspNetCore.Mvc;
using ViewModel;

namespace BackEndApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        // Lấy danh sách địa chỉ của người dùng
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAddresses(int userId)
        {
            var addresses = await _addressService.GetAddressesAsync(userId);
            return Ok(addresses);
        }

        // Lấy địa chỉ theo ID
        [HttpGet("{addressId}")]
        public async Task<IActionResult> GetAddress(int addressId)
        {
            var address = await _addressService.GetAddressByIdAsync(addressId);
            if (address == null)
                return NotFound("Address not found");

            return Ok(address);
        }

        // Thêm địa chỉ mới
        [HttpPost("user/{userId}")]
        public async Task<IActionResult> AddAddress(int userId, [FromBody] AddressViewModel address)
        {
            if (ModelState.IsValid)
            {
                var result = await _addressService.AddAddressAsync(userId, address);
                if (result)
                    return Ok("Address added successfully");

                return BadRequest("Failed to add address");
            }

            return BadRequest("Invalid data");
        }

        // Cập nhật địa chỉ
        [HttpPut("{addressId}")]
        public async Task<IActionResult> UpdateAddress(int addressId, [FromBody] AddressViewModel address)
        {
            if (ModelState.IsValid)
            {
                var result = await _addressService.UpdateAddressAsync(addressId, address);
                if (result)
                    return Ok("Address updated successfully");

                return NotFound("Address not found");
            }

            return BadRequest("Invalid data");
        }

        // Xoá địa chỉ
        [HttpDelete("{addressId}")]
        public async Task<IActionResult> DeleteAddress(int addressId)
        {
            var result = await _addressService.DeleteAddressAsync(addressId);
            if (result)
                return Ok("Address deleted successfully");

            return NotFound("Address not found");
        }
    }
}
