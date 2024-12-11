using ViewModel;

namespace Interface
{
    public interface IUserService
    {
        Task<List<UserViewModel>> GetAllUsers();
        Task<UserViewModel> GetUserById(int id);
        Task<UserViewModel> RegisterUser(UserRegisterViewModel user);
        Task<UserViewModel> Login(UserLoginViewModel loginInfo);
        Task<UserViewModel> UpdateUserInfoAsync(int id, UserUpdateViewModel updatedUser);
        Task<bool> UpdateEmailAsync(int userId, string newEmail);
        Task<bool> SendOtpAndRegister(string email);
        Task<bool> VerifyOtpAndRegister(string email, string otp, UserRegisterViewModel user);
        Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);

    }
}
