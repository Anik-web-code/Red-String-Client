import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://blood-donating-website.onrender.com/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load blog");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center mt-10">Blog not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        to="/blogs"
        className="text-blue-600 text-[18px] font-medium hover:underline mb-4 block"
      >
        ← Back to Blogs
      </Link>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
      <p className="text-[20px] font-semibold text-gray-700 mb-4">
        By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none mb-6 text-[18px] font-medium text-gray-700">
        {blog.content.split("\n\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
      {blog.tags?.length > 0 && (
        <div>
          <h4 className="font-semibold text-[18px]">Tags:</h4>
          <div className="flex flex-wrap gap-2 mt-2 text-[18px] text-rose-600">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
