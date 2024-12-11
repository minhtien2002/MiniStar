using Domain.Entities;
using Interface;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repositories;
using ViewModel;


namespace UserServices.Implementation
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IOtpService _otpService;
        private readonly IEmailService _emailService;


        public UserService(AppDbContext context, IOtpService otpService, IEmailService emailService)
        {
            _context = context;
            _otpService = otpService;
            _emailService = emailService;
        }

        public async Task<List<UserViewModel>> GetAllUsers()
        {
            var users = await _context.Users
                .Include(u => u.Role)  // Eager loading Role
                .ToListAsync();

            return users.Select(u => new UserViewModel
            {
                UserId = u.UserId,
                Username = u.Username,
                FullName = u.FullName,
                Email = u.Email,
                EmailVerified = u.EmailVerified,
                RoleName = u.Role.RoleName,  // Check null to avoid exception
                PhoneNumber = u.PhoneNumber,
                Gender = u.Gender,
                RoleId = u.RoleId
            }).ToList();
        }

        public async Task<UserViewModel> GetUserById(int id)
        {
            var user = await _context.Users
         .Include(u => u.Role) // Nếu muốn lấy thêm thông tin Role
         .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                throw new Exception("Khong co user nay");
            }

            return new UserViewModel
            {
                UserId = user.UserId,
                Username = user.Username,
                FullName = user.FullName,
                Email = user.Email,
                EmailVerified = user.EmailVerified,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                RoleId = user.RoleId,
                RoleName = user.Role.RoleName,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };

        }
        public async Task<bool> SendOtpAndRegister(string email)
        {
            // Kiểm tra xem email đã tồn tại chưa
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user != null)
            {
                throw new Exception("Email đã tồn tại trong hệ thống!");
            }

            // Tạo OTP ngẫu nhiên
            var otp = new Random().Next(100000, 999999).ToString();  // Tạo OTP 6 chữ số

            // Lưu OTP vào cache với thời gian hết hạn (5 phút)
            await _otpService.SaveOtpAsync2(email, otp);

            // Gửi OTP qua email
            await _emailService.SendEmailAsync(email, "Xác thực email của bạn", $"Mã OTP của bạn là: {otp}");
           

            return true;
        }

        public async Task<bool> VerifyOtpAndRegister(string email, string otp, UserRegisterViewModel newUser)
        {
            // Kiểm tra OTP có hợp lệ không
            var isValidOtp = await _otpService.ValidateOtpAsync2(email, otp);
            if (!isValidOtp)
            {
                throw new Exception("OTP không hợp lệ hoặc đã hết hạn.");
            }

            // Tạo tài khoản người dùng sau khi xác thực OTP
            var user = new User
            {
                Username = newUser.Username,
                Password = newUser.Password, // Hash password nếu cần
                FullName = newUser.FullName,
                Email = newUser.Email,
                EmailVerified = true,  // Đánh dấu là đã xác thực email
                PhoneNumber = newUser.PhoneNumber,
                Gender = newUser.Gender,
                RoleId = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<UserViewModel> RegisterUser(UserRegisterViewModel newUser)
        {
            // Kiểm tra xem email hoặc username đã tồn tại chưa
            if (await _context.Users.AnyAsync(u => u.Username == newUser.Username || u.Email == newUser.Email))
            {
                throw new Exception("Username hoặc Email đã tồn tại!");
            }

            // Hash password (nếu cần)
            var user = new User
            {
                Username = newUser.Username,
                Password = newUser.Password, 
                FullName = newUser.FullName,
                Email = newUser.Email,
                EmailVerified = true, 
                PhoneNumber = newUser.PhoneNumber,
                Gender = newUser.Gender,
                RoleId = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Tạo OTP ngẫu nhiên
            var otp = new Random().Next(100000, 999999).ToString();  // Tạo OTP 6 chữ số

            // Lưu OTP vào cache với thời gian hết hạn
            await _otpService.SaveOtpAsync(user.UserId, otp, user.Email);

            // Gửi OTP qua email
             await _emailService.SendEmailAsync(user.Email, "Xác thực email của bạn", $"Mã OTP của bạn là: {otp}");


            // Trả về thông tin người dùng
            return new UserViewModel
            {
                UserId = user.UserId,
                Username = user.Username,
                FullName = user.FullName,
                Email = user.Email,
                EmailVerified = user.EmailVerified,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                RoleId = user.RoleId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public async Task<bool> UpdateEmailAsync(int userId, string newEmail)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return false;
            }

            user.Email = newEmail;
            user.EmailVerified = true; // Reset trạng thái xác thực email
            user.UpdatedAt = DateTime.UtcNow;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<UserViewModel> Login(UserLoginViewModel loginInfo)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginInfo.Identifier || u.Email == loginInfo.Identifier);

            if (user == null || (loginInfo.Password != user.Password))
            {
                throw new Exception("Thông tin đăng nhập không chính xác!");
            }

            // Trả về thông tin người dùng nếu đăng nhập thành công
            return new UserViewModel
            {
                UserId = user.UserId,
                Username = user.Username,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                RoleId = user.RoleId
            };
        }


        public async Task<UserViewModel> UpdateUserInfoAsync(int id, UserUpdateViewModel updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new Exception("Người dùng không tồn tại!");
            }

            user.FullName = updatedUser.FullName;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Gender = updatedUser.Gender;
            user.UpdatedAt = DateTime.Now;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new UserViewModel
            {
                UserId = user.UserId,
                Username = user.Username,
                FullName = user.FullName,
                Email = user.Email, // Không thay đổi email
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                RoleId = user.RoleId
            };
        }

        private string HashPassword(string password)
        {
            return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return storedPassword == Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(enteredPassword));
        }

        public async Task<bool> VerifyEmail(int userId, string otp)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            // Kiểm tra OTP từ cache
            var isValidOtp = await _otpService.ValidateOtpAsync(userId, otp, user.Email);

            if (isValidOtp)
            {
                user.EmailVerified = true;
                user.UpdatedAt = DateTime.Now;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return true; // Xác thực thành công
            }

            return false; // OTP không hợp lệ
        }
        public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new Exception("Người dùng không tồn tại!");
            }

            // Kiểm tra mật khẩu cũ
            if (user.Password != oldPassword)
            {
                return false; // Mật khẩu cũ không đúng
            }

            // Cập nhật mật khẩu mới
            user.Password = newPassword; // Thay thế bằng hash password nếu cần
            user.UpdatedAt = DateTime.Now;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}



