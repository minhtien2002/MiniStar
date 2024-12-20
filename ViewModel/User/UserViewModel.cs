﻿namespace ViewModel;

public class UserViewModel
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public int RoleId { get; set; }
    public bool EmailVerified { get; set; }
    public string PhoneNumber { get; set; }
    public string Gender { get; set; }
    public string RoleName { get; set; } 
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
