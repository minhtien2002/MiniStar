import React from "react";

export const Address = () => {
  return (
    <>
      {/* Address Section */}
      <div className="w-3/4 bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Address</h2>
          <label className="flex items-center space-x-2">
            
          </label>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Address 01 */}
          <div className="border p-4 bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Address-01</h3>
            <p className="mb-1">
              <span className="font-semibold">Name:</span> Abdullah Al Mamun
            </p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span> demoemail@gmail.com
            </p>
            <p className="mb-1">
              <span className="font-semibold">Phone:</span> 023 434 54354
            </p>
            <p className="mb-1">
              <span className="font-semibold">City:</span> Haydarabad, Rord 34
            </p>
            <p className="mb-1">
              <span className="font-semibold">Zip:</span> 3454
            </p>
          </div>

          {/* Address 02 */}
          <div className="border p-4 bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Address-02</h3>
            <p className="mb-1">
              <span className="font-semibold">Name:</span> Sajjad
            </p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span> demoemail@gmail.com
            </p>
            <p className="mb-1">
              <span className="font-semibold">Phone:</span> 023 434 54354
            </p>
            <p className="mb-1">
              <span className="font-semibold">City:</span> Haydarabad, Rord 34
            </p>
            <p className="mb-1">
              <span className="font-semibold">Zip:</span> 3454
            </p>
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add New Address
        </button>
      </div>
    </>
  );
};
