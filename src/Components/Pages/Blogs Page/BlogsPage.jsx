import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loader from "../../Loader/Loader";


const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://blood-donating-website.onrender.com/blogs", {
        params: { status: "published" },
      })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader></Loader>;
  if (blogs.length === 0)
    return (
      <h1 className="text-center text-3xl font-medium py-[200px]">
        No published blogs found.
      </h1>
    );

  return (
    <div className="p-4 mb-10 w-[90%] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Blogs</h1>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-[22px] font-semibold mb-2">{blog.title}</h2>
              <p className="font-medium text-[18px] text-gray-700 mb-4">
                By {blog.author}
              </p>
              <p className="text-gray-600 font-medium text-[16px] line-clamp-3">
                {blog.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
