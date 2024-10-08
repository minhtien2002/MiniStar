import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <div className='flex justify-center'>

            <div className="w-10/12 mb-11 mt-10">
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;