import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const SearchPage = () => {
  const { districts, upozillas } = useContext(AuthContext);

  const [bloodGroup, setBloodGroup] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const getDistrictName = (val) => {
    const d = districts.find((d) => d.id === val);
    if (d) return d.name;

    return val;
  };
  const getUpazilaName = (val) => {
    const u = upozillas.find((u) => u.id === val);
    if (u) return u.name;
    return val;
  };

  useEffect(() => {
    if (!districtId) {
      setFilteredUpazilas([]);
      setUpazilaId("");
    } else {
      setFilteredUpazilas(
        upozillas.filter((u) => u.district_id === districtId)
      );
      setUpazilaId("");
    }
  }, [districtId, upozillas]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const { data } = await axios.get(
        "https://blood-donating-website.onrender.com/donations",
        {
          params: { status: "pending" },
        }
      );
      const filtered = data.filter((d) => {
        const donationDistrictName = getDistrictName(d.recipientDistrict);
        const donationUpazilaName = getUpazilaName(d.recipientUpazila);

        return (
          (bloodGroup === "" || d.bloodGroup === bloodGroup) &&
          (districtId === "" ||
            donationDistrictName === getDistrictName(districtId)) &&
          (upazilaId === "" ||
            donationUpazilaName === getUpazilaName(upazilaId))
        );
      });

      setResults(filtered);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Find Blood Donations</h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div>
          <label className="block mb-1">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- any --</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">District</label>
          <select
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- any --</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Upazila</label>
          <select
            value={upazilaId}
            onChange={(e) => setUpazilaId(e.target.value)}
            disabled={!filteredUpazilas.length}
            className="w-full border rounded p-2 disabled:opacity-50"
          >
            <option value="">-- any --</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Search
          </button>
        </div>
      </form>

      {searched && (
        <>
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((r) => (
                <li key={r._id} className="border rounded p-4 shadow-sm">
                  <p>
                    <strong>Recipient:</strong> {r.recipientName}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {r.bloodGroup}
                  </p>
                  <p>
                    <strong>District:</strong>{" "}
                    {getDistrictName(r.recipientDistrict)}
                  </p>
                  <p>
                    <strong>Upazila:</strong>{" "}
                    {getUpazilaName(r.recipientUpazila)}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(r.donationDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {r.donationTime}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {r.hospitalName}
                  </p>
                  <p className="mt-2 italic">“{r.message}”</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
