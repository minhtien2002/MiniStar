﻿using ViewModel;

namespace Interface
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}
