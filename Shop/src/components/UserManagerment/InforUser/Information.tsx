import React from 'react'

export const Information = () => {
    return (

        <div className="w-3/4 bg-white p-6">
          <h2 className="text-2xl font-bold mb-6">Person Infor</h2>
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">First Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Last Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email*</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="user@gmail.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Phone*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="+880388**0899"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Gender</label>
              <select
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option>Choose...</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Address*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your Address"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Town / City*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="London"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Postcode / ZIP*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="0000"
              />
            </div>
            <div className="col-span-2 flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
  
  
    )
}
