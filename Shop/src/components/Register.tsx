import React, { useState } from 'react';
import API_ENDPOINTS from '../services/apiConfig'; // Chứa URL endpoint của API
import Cookies from 'js-cookie'; // Sử dụng để lưu cookie nếu cần thiết

export const Register = () => {
    // State để quản lý các giá trị nhập vào
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('male'); // Default value
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Hàm gửi OTP
    const sendOtp = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.sendOtp2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email), // Gửi email để nhận OTP
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send OTP');
            }

            setIsOtpSent(true); // Đánh dấu OTP đã được gửi
            setError('');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Hiển thị lỗi nếu có
            } else {
                setError('An unknown error occurred');
            }
        }
        setIsLoading(false);
    };

    // Hàm xử lý form submit
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và retype password
    if (password !== retypePassword) {
        setError('Passwords do not match');
        return;
    }

    // Chuẩn bị dữ liệu đăng ký cùng OTP
    const registerData = {
        email,  // Email của người dùng
        otp,    // OTP mà người dùng nhập
        user: {
            username,       // Tên đăng nhập
            password,       // Mật khẩu
            fullName,       // Họ tên
            email,          // Email (sử dụng lại email ở trên)
            phoneNumber,    // Số điện thoại
            gender,         // Giới tính
        }
    };

    try {
        const response = await fetch(API_ENDPOINTS.verifyOtp2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData), // Gửi dữ liệu đăng ký cùng OTP
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        // Đăng ký thành công
        setSuccess(true);
        setError(''); // Xóa thông báo lỗi nếu có

        // Chuyển hướng hoặc lưu token vào cookie nếu cần
        const data = await response.text();
        //Cookies.set('token', data.token, { expires: 7, secure: true }); // Ví dụ lưu token vào cookie

        // Chuyển hướng về trang đăng nhập hoặc trang chủ
        window.location.href = '/login'; // Chuyển hướng tới trang đăng nhập

    } catch (error) {
        if (error instanceof Error) {
            setError(error.message); // Hiển thị lỗi
        } else {
            setError('An unknown error occurred');
        }
        setSuccess(false);
    }
};

    return (
        <div className="w-full flex flex-row justify-center gap-32">
            <div className="shadow-xl p-10 w-4/10">
                <div className="flex flex-col justify-center items-center mb-4">
                    <h1 className="font-bold text-3xl">Create Account</h1>
                    <img src="./src/assets/images/vector-line.png" alt="vector-line" />
                </div>

                {/* Form đăng ký */}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div>
                            <label className="text-[#797979] mb-1">Full Name*</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="text-[#797979] mb-1">Phone Number*</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="text-[#797979] mb-1">User Name*</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="User Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="text-[#797979] mb-1">Email*</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        {/* Hiển thị nút gửi OTP nếu chưa gửi OTP */}
                    {!isOtpSent && (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={sendOtp}
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </div>
                    )}

                    {/* Chỉ hiển thị khi OTP đã được gửi */}
                    {isOtpSent && (
                        <div>
                            <label className="text-[#797979] mb-1">Enter OTP*</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    )}

                        <div>
                            <label className="block text-[#797979] mb-1">Gender*</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="text-[#797979] mb-1">Password*</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*****"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="text-[#797979] mb-1">Retype Password*</label>
                            <input
                                type="password"
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
                                placeholder="*****"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 border-gray-300 rounded focus:ring-green-400"
                        />
                        <label className="text-[#797979] mb-1">
                            <span>&nbsp; I agree to all terms and conditions in </span>
                            <span className="font-bold text-green-600">EcoShop</span>.<br />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200"
                    >
                        Create an Account
                    </button>

                    {<p className="mt-4 text-red-500 text-center">{error}</p>}
                    {success && <p className="mt-4 text-green-500 text-center">Registration successful!</p>}

                    <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <a href="login" className="text-green-600 font-bold">
                            Log In
                        </a>
                    </p>
                </form>
            </div>

            <div className="w-6/10">
                <img src="./src/assets/images/account-img.webp" alt="account-img" />
            </div>
        </div>
    );
};
