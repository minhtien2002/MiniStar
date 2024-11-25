using ViewModel;

namespace Interface
{
    public interface IUserService
    {
        Task<List<UserViewModel>> GetAllUsers();
        Task<UserViewModel> GetUserById(int id);
        Task<UserViewModel> RegisterUser(UserRegisterViewModel user);
        Task<UserViewModel> Login(UserLoginViewModel loginInfo);
        Task<UserViewModel> UpdateUser(int id, UserUpdateViewModel updatedUser);
        Task<bool> VerifyEmail(int userId);

    }
}
