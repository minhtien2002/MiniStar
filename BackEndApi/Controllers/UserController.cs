using Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repositories;
using System.Text.RegularExpressions;
using ViewModel;

namespace BackEndApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOtpService _otpService;
        private readonly IEmailService _emailService;
        private readonly AppDbContext _context;


        public UserController(IOtpService otpService,IUserService userService, IEmailService emailService, AppDbContext context)
        {
            _userService = userService;
            _otpService = otpService;
            _emailService = emailService;
               _context = context;
        }

        [HttpGet("users/summary")]
        public async Task<ActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            var response = await _userService.GetUserById(id);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody] UserRegisterViewModel user)
        {
            var newUser = await _userService.RegisterUser(user);
            return Ok(newUser);
        }
        [HttpPost("send-otp2")]
        public async Task<IActionResult> SendOtp2([FromBody] string email)
        {
            try
            {
                var result = await _userService.SendOtpAndRegister(email);

                if (result)
                {
                    // Trả về đối tượng JSON với thông báo thành công
                    return Ok(new { message = "OTP đã được gửi đến email của bạn." });
                }
                else
                {
                    // Trả về đối tượng JSON với thông báo lỗi
                    return BadRequest(new { message = "Đã có lỗi xảy ra khi gửi OTP." });
                }
            }
            catch (Exception ex)
            {
                // Trả về đối tượng JSON với thông báo lỗi khi gặp exception
                return BadRequest(new { message = "Đã có lỗi xảy ra khi gửi OTP." });
            }
        }
        [HttpPost("verify-otp2")]
        public async Task<IActionResult> VerifyOtpAndRegister([FromBody] VerifyEmailRequest request)
        {
            try
            {
                var result = await _userService.VerifyOtpAndRegister(request.Email, request.Otp, request.User);
                if (result)
                {
                    return Ok("Đăng ký thành công!");
                }
                else
                {
                    return BadRequest("OTP không hợp lệ hoặc đã hết hạn.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã có lỗi xảy ra:");
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginViewModel loginInfo)
        {
            var user = await _userService.Login(loginInfo);
            Response.Cookies.Append("RoleId", "1", new CookieOptions
            {
                HttpOnly = true,               // Chỉ cho phép backend đọc cookie
                SameSite = SameSiteMode.None,  // Cho phép gửi cookie trong cross-origin requests
                Secure = false,                // Nếu không chạy HTTPS, đặt thành false
                Expires = DateTime.UtcNow.AddHours(1) // Cookie hết hạn sau 1 giờ
            });
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] UserUpdateViewModel updatedUser)
        {
            var user = await _userService.UpdateUserInfoAsync(id, updatedUser);
            return Ok(user);
        }
        
       
        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] EmailChangeRequest request)
        {
            // Kiểm tra UserId có tồn tại
            var user = await _userService.GetUserById(request.UserId);
            if (user == null)
            {
                return NotFound("Người dùng không tồn tại.");
            }

            // Tạo OTP ngẫu nhiên
            var otp = new Random().Next(100000, 999999).ToString();

            // Lưu OTP vào cache
            await _otpService.SaveOtpAsync(request.UserId, otp, request.NewEmail);

            // Gửi OTP qua email
            await _emailService.SendEmailAsync(request.NewEmail, "Xác thực email mới", $"Mã OTP của bạn là: {otp}");

            return Ok("OTP đã được gửi thành công.");
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerificationRequest request)
        {
            // Kiểm tra UserId có tồn tại
            var user = await _userService.GetUserById(request.UserId);
            if (user == null)
            {
                return NotFound("Người dùng không tồn tại.");
            }

            var isValid = await _otpService.ValidateOtpAsync(request.UserId, request.Otp, request.NewEmail);
            Console.WriteLine($"Validation result: {isValid}");

            if (!isValid)
            {
                return BadRequest("OTP không hợp lệ hoặc đã hết hạn.");
            }
            // Cập nhật email
            var success = await _userService.UpdateEmailAsync(request.UserId, request.NewEmail);
            if (!success)
            {
                return StatusCode(500, "Cập nhật email thất bại.");
            }

            return Ok("Email đã được cập nhật thành công.");
        }
        [HttpPost("test-email")]
        public async Task<IActionResult> SendTestEmail()
        {
            try
            {
                await _emailService.SendEmailAsync("soaidzpro@gmail.com", "Test Email", "This is a test email from ASP.NET!");
                return Ok("Email sent successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email:");
            }
        }
        private string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString(); // Tạo OTP 6 chữ số
        }
        
        private bool IsValidEmail(string email) =>
        Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                var result = await _userService.ChangePasswordAsync(request.UserId, request.OldPassword, request.NewPassword);
                if (!result)
                {
                    return BadRequest("Mật khẩu cũ không đúng.");
                }
                return Ok("Đổi mật khẩu thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi xảy ra: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Xóa user khỏi database
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}
