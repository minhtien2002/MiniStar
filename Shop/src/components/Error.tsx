import React from 'react';
import { Button, notification, Space } from 'antd';

// type NotificationType = 'success' | 'info' | 'warning' | 'error';
type TypeSuccess = 'success';
type TypeInfor = 'success' | 'info' | 'warning' | 'error';
type TypeWarning = 'success' | 'info' | 'warning' | 'error';
type TypeError = 'error'

const Error = () => {
    const [api, contextHolder] = notification.useNotification();
//Success
    const SuccessIcon = (type: TypeSuccess) => {
      api[type]({
        message: 'Success',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    };
//Info
const InfoIcon = (type: TypeInfor) => {
    api[type]({
      message: 'Info',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  //Warning
  const WarningIcon = (type: TypeWarning) => {
    api[type]({
      message: 'Warning',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  //Error
  const ErrorIcon = (type: TypeError) => {
    api[type]({
      message: 'Error',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

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
            {/* testboton */}
            <>
      {contextHolder}
      <Space>
        <Button onClick={() => SuccessIcon('success')}>Success</Button>
        <Button onClick={() => InfoIcon('info')}>Info</Button>
        <Button onClick={() => WarningIcon('warning')}>Warning</Button>
        <Button onClick={() => ErrorIcon('error')}>Error</Button>
      </Space>
    </>
        </div>
        
    );
};

export default Error;