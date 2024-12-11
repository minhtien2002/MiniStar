import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import API_ENDPOINTS from '../../../services/apiConfig';

export const Information = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = Cookies.get("userId"); 
            const response = await fetch(API_ENDPOINTS.GetUserById(userId));
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
    }

    return (
        <div className="w-3/4 bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">User Name</label>
                    <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-lg font-semibold text-gray-900">{user.fullName}</p>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="text-lg font-semibold text-gray-900">{user.phoneNumber}</p>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Gender</label>
                    <p className="text-lg font-semibold text-gray-900">{user.gender}</p>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Account Created</label>
                    <p className="text-lg font-semibold text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};
