import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from '../apiConfig';
import Cookies from 'js-cookie'; // Thêm import cho js-cookie
import { Button, message, Popconfirm } from "antd";


const Login: React.FC = () => {
    const [identifier, setIdentifier] = useState(''); // Đây có thể là email hoặc username
    const [password, setPassword] = useState('');
    const [loginResult, setLoginResult] = useState(null);
    const [error, setError] = useState(''); // Trạng thái lỗi
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Kiểm tra cookie để xác định trạng thái đăng nhập
        const token = Cookies.get('token');
        if (token) {
        message.success('You Are Alrealy Logged');
            setTimeout(() => {
            window.location.href = '/'; // Hoặc sử dụng React Router để chuyển hướng
            }, 500);        }
    }, []);

    // Hàm xử lý form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginData = {
            identifier, // Sử dụng chung cho cả email hoặc username
            password
        };

        try {
            const response = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                
            });

            if (!response.ok) {
                throw new Error( 'Login failed, wrong Email, Username Or Assword');
            }

            const data = await response.json();
            setLoginResult(data);
            setError(''); // Xóa thông báo lỗi nếu đăng nhập thành công

            // Lưu token vào cookie
            Cookies.set('token', data.token, { expires: 7, secure: true });
            Cookies.set('userId', data.userId, { expires: 7, secure: true });
            Cookies.set('RoleId', data.roleId, { expires: 7, secure: true });
            message.success('Login Successfully');
            setTimeout(() => {
            window.location.href = '/'; // Hoặc sử dụng React Router để chuyển hướng
            }, 1000);
            // Chuyển hướng về trang chủ sau khi đăng nhập thành công

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Cập nhật thông báo lỗi
            } else {
                setError('An unknown error occurred');
            }
            setLoginResult(null); // Reset kết quả đăng nhập
            console.error('Error:', error);
        }
    };


    return (
        <div className='w-full flex flex-row justify-center gap-32'>
            <div className="shadow-xl p-10 w-4/10">
                <div className="flex flex-col justify-center items-center mb-4">
                    <h1 className="font-bold text-3xl">Log In</h1>
                    <img src="./src/assets/images/vector-line.png" alt="vector-line" />
                </div>
                <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-5">
                        <label htmlFor="identifier" className='text-[#797979] mb-1'>
                            Username or Email**
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder='Username or Email'
                            className='w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none'
                        />
                    </div>
                    <div className="flex flex-col mb-5">
                        <label htmlFor="password" className='text-[#797979] mb-1'>Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='password'
                            className='w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none'
                        />
                    </div>
                    <div className="flex flex-row justify-between mb-5">
                        <div className="flex gap-2">
                            <input type="checkbox" id="checkbox" name="checkbox" />
                            <label htmlFor="checkbox">Remember Me</label>
                        </div>
                        <a href="" className='text-[#34A853]'>Forgot Password?</a>
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="submit"
                            value="Log In"
                            className='py-3 mb-5 text-white bg-[#34A853] rounded-md font-medium cursor-pointer'
                        />
                        <div className="flex flex-row justify-center text-[14px]">
                            <p className='text-[#797979] mr-1'>Don't have an account?</p>
                            <a href="register">Sign Up Free</a>
                        </div>
                    </div>
                </form>
                {loginResult && <div className="text-green-500">Login Success</div>}
                {error && <div className="text-red-500">{error}</div>} {/* Hiển thị thông báo lỗi */}
            </div>

            <div className="w-6/10">
                <img src="./src/assets/images/account-img.webp" alt="account-img" />
            </div>
        </div>
    );
};

export default Login;
