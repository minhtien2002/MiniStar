import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import API_ENDPOINTS from '../../../services/apiConfig';

const EditUserProfile = () => {
    const [newEmail, setNewEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState({
        fullName: "",
        phoneNumber: "",
        gender: "",
        email: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const userId = Cookies.get("userId");
            const response = await fetch(API_ENDPOINTS.EditUserById(userId));
            const data = await response.json();
            setUser({
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                email: data.email,
            });
        };

        fetchUser();
    }, []);
    const userId = Cookies.get("userId");

    const handleSendOtp = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.SendOtp, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newEmail }),
            });
            if (response.ok) {
                setIsOtpSent(true);
                setMessage("OTP sent to your new email.");
            } else {
                const error = await response.text();
                setMessage(`Failed to send OTP`);
            }
        } catch (error) {
            setMessage("An error occurred while sending OTP.");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.VerifyOtp, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, otp, newEmail }),
            });
            if (response.ok) {
                setMessage("Email updated successfully.");
                setIsOtpSent(false);
                setNewEmail("");
                setOtp("");
                window.location.reload();
            } else {
                const error = await response.text();
                setMessage(`Failed to update email: ${error}`);
            }
        } catch (error) {
            setMessage("An error occurred while verifying OTP.");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = Cookies.get("userId");

        const response = await fetch(API_ENDPOINTS.EditUserById(userId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert("User updated successfully!");
        } else {
            alert("Failed to update user.");
        }
    };

      return (
        <div className="w-3/4 bg-white p-6" >
          <h2 className="text-2xl font-bold mb-6">Person Info</h2>
        <form className="grid grid-cols-2 gap-4"  onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium">
                Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"                     
                    value={user.fullName}
                    onChange={handleChange}
                />
            
            <label className="block mb-2 text-sm font-medium">
                Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"                     
                    value={user.phoneNumber}
                    onChange={handleChange}
                />
            
            <label className="block mb-2 text-sm font-medium">
                Gender: </label>
                <select name="gender" value={user.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
           <label className="block mb-2 text-sm font-medium">
                Email:</label>
                <p                   value={user.email}>
                    {user.email}
                    
                </p>
                <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              > 
                Update Profile
              </button>        
              </form>
                <div className="w-full bg-white p-6 rounded shadow-md">
            {message && <p className="text-red-500">{message}</p>}
            {!isOtpSent ? (
                <>
                    <label className="block mb-2 text-sm font-medium text-gray-600">New Email</label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Enter your new email"
                    />
                    <button
                        onClick={handleSendOtp}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Send OTP
                    </button>
                </>
            ) : (
                <>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Enter OTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Enter the OTP"
                    />
                    <button
                        onClick={handleVerifyOtp}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Verify OTP
                    </button>
                </>
            )}
        </div>
         </div>



    );
};

export default EditUserProfile;


         