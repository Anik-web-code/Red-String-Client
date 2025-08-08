import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const ContentManagement = () => {
  const { role } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  const handleDelete = (id) => {
    if (role !== "admin") return;
    axios.delete(`/blogs/${id}`).then(() => {
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    });
  };

  const handleTogglePublish = (id, currentStatus) => {
    if (role !== "admin") return;
    axios.patch(`/blogs/${id}`, { published: !currentStatus }).then(() => {
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, published: !currentStatus } : b
        )
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center">Content Management</h2>
        <Link to="/dashboard/volunteer/add-blog" className="btn btn-primary btn-sm text-[16px] px-4 py-4">
          Add Blog
        </Link>
      </div>

      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-2 rounded">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-sm">Edit</button>
            {role === "admin" && (
              <>
                <button
                  className="btn btn-sm"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleTogglePublish(blog._id, blog.published)}
                >
                  {blog.published ? "Unpublish" : "Publish"}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentManagement;
