import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";


const AddBlogs = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.image || !formData.content) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        author: user?.name || "Admin",
        authorEmail: user?.email,
        date: new Date().toISOString(),
        published: false,
      };

      await axios.post("/blogs", payload);
      alert("Blog added successfully!");
      setFormData({ title: "", image: "", content: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <textarea
          name="content"
          placeholder="Blog Content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogs;
