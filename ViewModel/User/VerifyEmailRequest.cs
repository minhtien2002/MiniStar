using ViewModel;

public class VerifyEmailRequest
{
    public string Email { get; set; }
    public string Otp { get; set; }
    public UserRegisterViewModel User { get; set; }  // Thông tin người dùng cần đăng ký
}