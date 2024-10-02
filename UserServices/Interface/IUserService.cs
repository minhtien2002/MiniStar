using UserViewModel;

namespace UserServices.Interface
{
    public interface IUserService
    {
        Task<List<UserViewModel.UserViewModel>> GetAllUsers();
        Task<UserViewModel.UserViewModel> GetUserById(int id);
        Task<UserViewModel.UserViewModel> RegisterUser(UserRegisterViewModel user);
        Task<UserViewModel.UserViewModel> Login(UserLoginViewModel loginInfo);
        Task<UserViewModel.UserViewModel> UpdateUser(int id, UserUpdateViewModel updatedUser);
        Task<bool> VerifyEmail(int userId);

    }
}
