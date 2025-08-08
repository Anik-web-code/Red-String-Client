import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = "https://blood-donating-website.onrender.com";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/users?page=${page}&limit=${limit}`);
      setUsers(res.data.users || []);
      setCount(Number(res.data.total) || 0);
    } catch (err) {
      toast.error("Failed to load users");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleRoleChange = async (id, role) => {
    try {
      await axios.patch(`/users/${id}/role`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
      console.log(err);
    }
  };

  return (
    <div className="p-1md:p-4">
      <h2 className="text-3xl font-semibold text-center mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full font-medium text-gray-700">
            <thead className="text-[18px]">
              <tr className="bg-gray-100 text-left">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border px-2 py-1 rounded-[8px]"
                    >
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-center gap-2">
        {[...Array(Math.ceil(count / limit)).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1 ? "bg-red-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
