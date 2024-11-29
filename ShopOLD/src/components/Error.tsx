import React from 'react';

const Error = () => {
    return (
        <div className="w-full flex flex-row justify-between items-center">
            <div className="w-2/5 px-4 flex justify-start items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                    <h1 className="text-[#3D5DFF] text-8xl mb-2 font-bold">Error</h1>
                    <h3 className="text-3xl mb-7 font-bold">Oops! Page Not Found.</h3>
                    <a href="/" className="text-lg px-6 py-2 bg-[#3D5DFF] text-white font-bold rounded-lg hover:bg-white border border-[#3D5DFF] hover:text-[#3D5DFF]">Go Home</a>
                </div>
            </div>
            <div className="w-3/5 px-4">
                <img src="../src/assets/images/404.png" alt="Error illustrations" />
            </div>
        </div>
    );
};

export default Error;