import React from 'react'

export const DashBoardUser = () => {
  const stats = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3.75h18M3 7.5h18M3 11.25h18M7.5 15H21M3 18.75h18"
          />
        </svg>
      ),
      label: "New Orders",
      value: "656",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12H3M21 16.5H9m-6-9H21"
          />
        </svg>
      ),
      label: "Delivery Completed",
      value: "99,783",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6.75L6 21l1.5-3h9l1.5 3-4.5-14.25H10.5zm0 0L9 11.25m0 0L7.5 15M15 12.75l1.5 4.5m-7.5-1.5h6"
          />
        </svg>
      ),
      label: "Support Tickets",
      value: "09",
    },
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3.75h18M3 7.5h18M3 11.25h18M7.5 15H21M3 18.75h18"
          />
        </svg>
      ),
      label: "New Orders",
      value: "656",
    },
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3.75h18M3 7.5h18M3 11.25h18M7.5 15H21M3 18.75h18"
          />
        </svg>
      ),
      label: "New Orders",
      value: "656",
    },
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3.75h18M3 7.5h18M3 11.25h18M7.5 15H21M3 18.75h18"
          />
        </svg>
      ),
      label: "New Orders",
      value: "656",
    },  
    
  ];
  return (

     <div className='w-full'>
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-black text-white p-6 rounded-lg flex items-center space-x-4"
          >
            <div>{stat.icon}</div>
            <div>
              <p className="text-base">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  
 
    </div>
  )
}
