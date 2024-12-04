import React from 'react'

export const Contact = () => {
  
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start p-10 lg:space-x-10">
          {/* Left Section */}
          <div className="flex flex-col space-y-6 lg:w-1/2">
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <p className="text-gray-600">
                Fill the form below or write to us. We will help you as soon as possible.
              </p>
            </div>
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="border border-green-600 rounded-lg p-4 flex flex-col items-center text-center">
                <span className="text-green-600 text-2xl mb-2">📞</span>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600">+84-369-996-9650</p>
              </div>
              {/* Email */}
              <div className="border border-green-600 rounded-lg p-4 flex flex-col items-center text-center">
                <span className="text-green-600 text-2xl mb-2">✉️</span>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">TunaHari86@gmail.com</p>
              </div>
            </div>
            {/* Address */}
            <div className="border  rounded-lg p-4">
              <h3 className="font-semibold text-lg flex items-center">
                <span className="text-green-600 text-2xl mr-2">📍</span> Address
              </h3>
              <p className="text-gray-600 mb-4">
                169 Đường Số 15. Phường Tân Quy. Quận 7. Tp Hồ Chí Minh
              </p>
              <iframe
                title="Google Map"
                className="w-full h-48 rounded-lg border"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.7557126701317!2d106.70337536296488!3d10.745693495679014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9e1ea50f25%3A0x96161c2ce5d3cee3!2zUGjhu58gSG_DoG5nIFPDoGkgR8Oybi4gQ2hpIG5ow6FuaCBUw6JuIFF1eQ!5e0!3m2!1svi!2sus!4v1733241589156!5m2!1svi!2sus"
                loading="lazy"
              ></iframe>
            </div>
          </div>
    
          {/* Right Section */}
          <div className="lg:w-1/2 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name*</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject*</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message*</label>
                <textarea
                  placeholder="Write Message..."
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700"
              >
                Send Now
              </button>
            </form>
          </div>
        </div>
      );
  
}
