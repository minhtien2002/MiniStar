import React from 'react';

const Login: React.FC = () => {


    return (
        <div className='w-full flex flex-row justify-center gap-32'>
            <div className="shadow-xl p-10 w-4/10">
                <div className="flex flex-col justify-center items-center mb-4">
                    <h1 className="font-bold text-3xl">Log In</h1>
                    <img src="./src/assets/images/vector-line.png" alt="vector-line" />
                </div>
                <form className="flex flex-col justify-center">
                    <div className="flex flex-col mb-5">
                        <label htmlFor="email" className='text-[#797979] mb-1'>Email Address**</label>
                        <input type="email" id="email" name="email" placeholder='Email' className='w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none' />
                    </div>
                    <div className="flex flex-col mb-5">
                        <label htmlFor="password" className='text-[#797979] mb-1'>Password*</label>
                        <input type="password" id="password" name="password" placeholder='password' className='w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none' />
                    </div>
                    <div className="flex flex-row justify-between mb-5">
                        <div className="flex gap-2">
                            <input type="checkbox" id="checkbox" name="checkbox" />
                            <label htmlFor="checkbox">Remember Me</label>
                        </div>
                        <a href="" className='text-[#34A853]'>Forgot Password?</a>
                    </div>
                    <div className="flex flex-col">
                        <input type="submit" value="Log In" className='py-3 mb-5 text-white bg-[#34A853] rounded-md font-medium cursor-pointer' />
                        <div className="flex flex-row justify-center text-[14px]">
                            <p className='text-[#797979] mr-1'>Don't have an account?</p>
                            <a href="Regiter">Sign Up Free</a>
                        </div>
                    </div>
                </form>

            </div>

            <div className="w-6/10">
                <img src="./src/assets/images/account-img.webp" alt="account-img" />
            </div>
        </div>
    );
};

export default Login;