import React, { useState } from "react";
const feedbacks = [
  {
    rating: 4.7,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    name: "Abdullah Al Mamun",
    role: "Designer OF DesginCode",
  },
  {
    rating: 4.9,
    text: "Build the perfect online store using our high-converting Brandstore website template. Totam ipsum autem.",
    name: "Mohammad Rashed Khan",
    role: "CEO OF DesginLab",
  },
  {
    rating: 5.0,
    text: "The lightweight and fully responsive eCommerce website templates make it easy to sell more with little extra effort.",
    name: "Shuvo Raihan",
    role: "Developer OF DesginUX",
  },
  {
    rating: 4.8,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolor impedit quasi aspernatur labore.",
    name: "Jane Doe",
    role: "Manager OF BrandBuild",
  },
  {
    rating: 4.5,
    text: "Excellence in design and structure. This is an extraordinary example of a modern website template.",
    name: "John Smith",
    role: "UI/UX Designer OF WebTech",
  },
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 2 : prevIndex - 1
    );
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Left Section - Images */}
        <div className="relative flex-shrink-0">
          <img
            src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/about-img-1.webp" // Hình lớn
            alt="Grocery Shopping"
            className="w-full h-96 object-cover rounded-lg "
          />
          {/* <img
          src="img2.img" // Hình nhỏ
          alt="Delivery Person"
          className="w-48 h-60 object-cover rounded-lg shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white"
        />  */}
        </div>

        {/* Right Section - Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Know More About Us?
          </h2>
          <p className="text-gray-600 mb-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. It is a
            long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout.
          </p>
          <ul className="space-y-4 pb-8">
            <li className="flex items-center">
              <span className="text-green-600 text-2xl mr-4">✔</span>
              <p className="text-gray-700">
                Complete Sanitization and cleaning of bathroom
              </p>
            </li>
            <li className="flex items-center">
              <span className="text-green-600 text-2xl mr-4">✔</span>
              <p className="text-gray-700">
                When looking at its layout. It is a long established fact
              </p>
            </li>
            <li className="flex items-center">
              <span className="text-green-600 text-2xl mr-4">✔</span>
              <p className="text-gray-700">
                Complete Sanitization and cleaning of bathroom
              </p>
            </li>
          </ul>
          <a
            href="Contact"
            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
          >
            Contact us →
          </a>
        </div>
      </div>
      {/* Feddback */}
      <div>
        <div className="w-full  bg-gray-50 py-12 px-4 lg:px-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
            Customers Feedback
          </h2>
          <div className="flex items-center">
            {/* Nút Prev */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
            >
              &#8249;
            </button>

            {/* Feedback Cards */}
            <div className="flex h-72 flex-1 overflow-hidden space-x-6 px-4">
              {feedbacks
                .slice(currentIndex, currentIndex + 3)
                .map((feedback, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-green-100 p-6 rounded-lg shadow-md w-1/3"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <p className="text-gray-800 font-semibold">
                        {feedback.rating}
                      </p>
                    </div>
                    <p className="text-gray-600 h-20 mb-6">{feedback.text}</p>
                    <div className="border-t border-black pt-4">
                      <h4 className="text-gray-800 font-bold">
                        {feedback.name}
                      </h4>
                      <p className="text-gray-500 text-sm">{feedback.role}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Nút Next */}
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
      {/* end fB */}
    </div>
  );
};

export default AboutUs;
