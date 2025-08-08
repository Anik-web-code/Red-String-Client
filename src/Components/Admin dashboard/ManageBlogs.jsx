import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/blogs");

      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePublishToggle = async (id, status) => {
    try {
      await axios.patch(`/blogs/${id}/status`, { status });
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog status", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    filter === "all" ? true : blog.status === filter
  );

  return (
    <div className="max-w-5xl mx-auto px-4 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Link
          to="/dashboard/admin/add-blog"
          className="bg-blue-600 text-white text-[18px] font-medium px-4 py-2 rounded"
        >
          Add Blog
        </Link>
      </div>

      <div className="mb-4 text-[18px] font-medium">
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center py-10">No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#FFFFFF] rounded shadow p-5 flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{blog.title}</h3>
              <p className="text-[18px] text-gray-600 mb-2">
                Status:{" "}
                <span
                  className={
                    blog.status === "published"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {blog.status}
                </span>
              </p>
              <div className="mt-auto flex justify-between text-[20px] font-medium">
                {blog.status === "draft" ? (
                  <button
                    onClick={() => handlePublishToggle(blog._id, "published")}
                    className="bg-green-600 text-white px-3 py-1 rounded "
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublishToggle(blog._id, "draft")}
                    className="bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
