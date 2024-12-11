using Interface;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OtpService : IOtpService
    {
        private readonly IMemoryCache _cache;

        public OtpService(IMemoryCache cache)
        {
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        // Lưu OTP vào cache
        public async Task SaveOtpAsync(int userId, string otp, string newEmail)
        {
            var key = GetCacheKey(userId);
            var otpData = new OtpData
            {
                Otp = otp,
                NewEmail = newEmail,
                Expiry = DateTime.UtcNow.AddMinutes(5)
            };

            // Lưu OTP vào cache
            _cache.Set(key, otpData, TimeSpan.FromMinutes(30));

            Console.WriteLine($"Saving OTP: Key={key}, OTP={otp}, NewEmail={newEmail}");

            // Kiểm tra lại dữ liệu đã lưu vào cache
            var cachedValue = _cache.Get(key);
            if (cachedValue != null)
            {
                Console.WriteLine($"Saved value in cache: {cachedValue}");
            }
            else
            {
                Console.WriteLine($"Cache is empty for key: {key}");
            }

            await Task.CompletedTask;
        }
        public async Task SaveOtpAsync2(string email, string otp)
        {
            var otpData = new OtpData
            {
                Otp = otp,
                NewEmail = email,
                Expiry = DateTime.UtcNow.AddMinutes(5)
            };

            _cache.Set(email, otpData, TimeSpan.FromMinutes(5));

            Console.WriteLine($"Saving OTP for email: {email}, OTP: {otp}");
            await Task.CompletedTask;
        }
        // Xác thực OTP từ cache
        public async Task<bool> ValidateOtpAsync(int userId, string otp, string newEmail)
        {
            var key = GetCacheKey(userId);
            Console.WriteLine($"Validating OTP: Key={key}, OTP={otp}, NewEmail={newEmail}");

            if (_cache.TryGetValue(key, out object value))
            {
                Console.WriteLine($"Cache hit: Value from cache: {value}");

                if (value is OtpData otpData)
                {
                    Console.WriteLine($"Cached OTP: {otpData.Otp}, Cached Email: {otpData.NewEmail}, Expiry: {otpData.Expiry}");
                    Console.WriteLine($"Current Time: {DateTime.UtcNow}");

                    // So sánh các giá trị
                    if (otpData.Otp == otp && otpData.NewEmail == newEmail && otpData.Expiry > DateTime.UtcNow)
                    {
                        _cache.Remove(key);  // Xoá OTP sau khi xác thực thành công
                        Console.WriteLine("OTP Validated Successfully.");
                        return await Task.FromResult(true);
                    }
                }
            }
            else
            {
                Console.WriteLine($"Cache miss, no data found for key: {key}");
            }

            Console.WriteLine("OTP Validation Failed.");
            return await Task.FromResult(false);
        }
        public async Task<bool> ValidateOtpAsync2(string email, string otp)
        {
            if (_cache.TryGetValue(email, out var value))
            {
                var otpData = value as OtpData;
                if (otpData != null && otpData.Otp == otp && otpData.Expiry > DateTime.UtcNow)
                {
                    Console.WriteLine($"OTP valid for email: {email}");
                    _cache.Remove(email); // Xóa OTP sau khi xác thực thành công
                    return true;
                }
            }
            else
            {
                Console.WriteLine($"Cache miss for email: {email}");
            }

            return false;
        }
        private string GetCacheKey(int userId) => $"Otp_{userId}";
    }

}
