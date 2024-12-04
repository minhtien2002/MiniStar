import React from "react";

const BlogSection = () => {
  const articles = [
    {
      id: 1,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/blog-img-4.webp",
      title:
        "It’s official! The iPhone 14 Series is on its way! Rumors turned out",
      author: "Admin",
      comments: "Comments",
    },
    {
      id: 2,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/blog-img-5.webp",
      title: "Must-Have WordPress Plugins for Ecommerce Websites in 2022",
      author: "Admin",
      comments: "Comments",
    },
    {
      id: 3,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/blog-img-6.webp",
      title: "15 Best WordPress Newspaper Themes to Look Out for in 2022",
      author: "Admin",
      comments: "Comments",
    },
    {
      id: 4,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/blog-img-1.webp",
      title:
        "6 Best WordPress E-commerce Plugins for Online Stores in 2022",
      author: "Admin",
      comments: "Comments",
    },
    {
      id: 5,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/blog-img-3.webp",
      title: "Business-to-consumer Ecommerce that involves selling",
      author: "Admin",
      comments: "Comments",
    },
    {
      id: 6,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/about/blog-img-1.webp",
      title: "Must-Have WordPress Plugins for Ecommerce Websites in 2025",
      author: "Admin",
      comments: "Comments",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
         <a href=""><img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          /></a> 
          <div className="p-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="flex items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9 0v10.5a2.25 2.25 0 01-2.25 2.25H7.5A2.25 2.25 0 015.25 19.5V9m10.5 0H5.25m9 0H15.75"
                  />
                </svg>
                {article.author}
              </span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75c1.8 0 3.375.9 4.275 2.325A9.72 9.72 0 0012 5.25c-2.175 0-4.125.9-5.625 2.325A9.72 9.72 0 0012 6.75z"
                  />
                </svg>
                {article.comments}
              </span>
            </div>
          <a href="#"><h2 className="text-lg font-bold text-gray-800 mb-4">
              {article.title}
            </h2></a>  
            <a
              href="#"
              className="text-green-500 text-sm font-medium hover:underline flex items-center"
            >
              Learn More →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;
