using Domain.Entities;
using Interface;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ViewModel;


namespace UserServices.Implementation
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserViewModel>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(u => new UserViewModel
            {
                UserId = u.UserId,
                Username = u.Username,
                FullName = u.FullName,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                Gender = u.Gender,
                RoleId = u.RoleId
            }).ToList();
        }

        public async Task<UserViewModel> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

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

        public async Task<UserViewModel> RegisterUser(UserRegisterViewModel newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Username == newUser.Username || u.Email == newUser.Email))
            {
                throw new Exception("Username hoặc Email đã tồn tại!");
            }
            //HashPassword()
            var user = new User
            {
                Username = newUser.Username,
                Password = newUser.Password,
                FullName = newUser.FullName,
                Email = newUser.Email,
                EmailVerified = false,
                PhoneNumber = newUser.PhoneNumber,
                Gender = newUser.Gender,
                RoleId = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserViewModel
            {
                UserId = user.UserId,
                Username = user.Username,
                Password = user.Password,
                FullName = user.FullName,
                Email = user.Email,
                EmailVerified = user.EmailVerified,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender,
                RoleId = user.RoleId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
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

      
        public async Task<UserViewModel> UpdateUser(int id, UserUpdateViewModel updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new Exception("Người dùng không tồn tại!");
            }

            user.FullName = updatedUser.FullName;
            user.Email = updatedUser.Email;
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
                Email = user.Email,
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

        public async Task<bool> VerifyEmail(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.EmailVerified = true;
            user.UpdatedAt = DateTime.Now;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}



