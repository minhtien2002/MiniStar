using Microsoft.EntityFrameworkCore;
using UserDataAccess.Entities;
using UserServices.Interface;
using UserViewModel; 
using UserDataAccess;

namespace UserServices.Implementation
{
    public class UserService : IUserService
    {
        private readonly UserDbContext _context;

        public UserService(UserDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserViewModel.UserViewModel>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(u => new UserViewModel.UserViewModel
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

        public async Task<UserViewModel.UserViewModel> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            return new UserViewModel.UserViewModel
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

        public async Task<UserViewModel.UserViewModel> RegisterUser(UserRegisterViewModel newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Username == newUser.Username || u.Email == newUser.Email))
            {
                throw new Exception("Username hoặc Email đã tồn tại!");
            }

            var user = new User
            {
                Username = newUser.Username,
                Password = HashPassword(newUser.Password),
                FullName = newUser.FullName,
                Email = newUser.Email,
                PhoneNumber = newUser.PhoneNumber,
                Gender = newUser.Gender,
                RoleId = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserViewModel.UserViewModel
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

        public async Task<UserViewModel.UserViewModel> Login(UserLoginViewModel loginInfo)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginInfo.Username);
            if (user == null || !VerifyPassword(loginInfo.Password, user.Password))
            {
                throw new Exception("Thông tin đăng nhập không chính xác!");
            }

            return new UserViewModel.UserViewModel
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

        public async Task<UserViewModel.UserViewModel> UpdateUser(int id, UserUpdateViewModel updatedUser)
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

            return new UserViewModel.UserViewModel
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
