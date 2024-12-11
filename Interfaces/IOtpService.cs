using ViewModel;

namespace Interface
{
    public interface IOtpService
    {
        Task SaveOtpAsync(int userId, string otp, string newEmail);
        Task SaveOtpAsync2(string email, string otp);

        Task<bool> ValidateOtpAsync(int userId, string otp, string newEmail);
        Task<bool> ValidateOtpAsync2(string email, string otp);

    }
}