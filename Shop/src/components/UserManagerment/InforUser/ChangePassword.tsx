import React, { useState } from 'react';
import Cookies from 'js-cookie';
import API_ENDPOINTS from '../../../services/apiConfig';



function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const userId2 = Cookies.get("userId");


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra mật khẩu mới và mật khẩu xác nhận
    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu mới và xác nhận không khớp!');
      return;
    }

    try {
      // Gửi yêu cầu đến API
      const response = await fetch(API_ENDPOINTS.changepass, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId2,
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setMessage('Đổi mật khẩu thành công!');
      } else {
        const error = await response.text();
        setMessage(`Lỗi: ${error}`);
      }
    } catch (err) {
      setMessage('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  };

  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu hiện tại*
          </label>
          <input
            type="password"
            id="currentPassword"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"                     
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu mới*
          </label>
          <input
            type="password"
            id="newPassword"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"                     
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Nhập lại mật khẩu mới*
          </label>
          <input
            type="password"
            id="confirmPassword"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"                     
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
            type="submit"
          >
            Cập nhật mật khẩu
          </button>
          <button
            className="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setMessage('');
            }}
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
