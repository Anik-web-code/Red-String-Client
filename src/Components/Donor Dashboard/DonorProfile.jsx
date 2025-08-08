import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const DonorProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://blood-donating-website.onrender.com/users/email/${user.email}`
        )
        .then((res) => {
          const data = res.data;
          if (data) {
            setFormData({
              name: data.name || "",
              avatar: data.avatar || "",
              district: data.district || "",
              upazila: data.upazila || "",
              bloodGroup: data.bloodGroup || "",
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      console.log("Saving profile...", formData);
      await axios.patch(
        `https://blood-donating-website.onrender.com/users/email/${user.email}`,
        formData
      );
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-1 rounded ${
            isEditing ? "bg-gray-500" : "bg-[#ff0033]"
          } text-white`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form className="grid grid-cols-1 gap-4">
        <input
          type="text"
          disabled={!isEditing}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="border px-3 py-2 rounded"
        />

        <input
          type="email"
          disabled
          value={user?.email || ""}
          placeholder="Email"
          className="border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
        />

        <input
          type="text"
          disabled={!isEditing}
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          placeholder="Avatar URL"
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          disabled={!isEditing}
          value={formData.district}
          onChange={(e) =>
            setFormData({ ...formData, district: e.target.value })
          }
          placeholder="District"
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          disabled={!isEditing}
          value={formData.upazila}
          onChange={(e) =>
            setFormData({ ...formData, upazila: e.target.value })
          }
          placeholder="Upazila"
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          disabled={!isEditing}
          value={formData.bloodGroup}
          onChange={(e) =>
            setFormData({ ...formData, bloodGroup: e.target.value })
          }
          placeholder="Blood Group"
          className="border px-3 py-2 rounded"
        />

        {isEditing && (
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default DonorProfile;
