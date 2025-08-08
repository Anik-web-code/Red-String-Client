import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { user, districts, upozillas } = useContext(AuthContext);

  const defaultFormData = {
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "17:00",
    message: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      requesterEmail: user?.email,
      status: "pending",
      ...formData,
    };

    try {
      await axios.post("/donations", payload);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Donation request submitted successfully.",
        confirmButtonColor: "#d33",
      });
      setFormData(defaultFormData);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Error submitting request";

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: typeof message === "string" ? message : JSON.stringify(message),
        confirmButtonColor: "#d33",
      });
    }
  };

  const filteredUpozillas = upozillas?.filter(
    (u) => u.district_id === formData.recipientDistrict
  );

  console.log(user);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 font-medium">
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="p-2 border rounded"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="p-2 border rounded"
        />

        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          placeholder="Recipient Name"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <select
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select District</option>
          {districts?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Upazila</option>
          {filteredUpozillas?.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          placeholder="Hospital Name"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          placeholder="Full Address"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <p className="text-sm text-gray-500">
          Default is PM (17:00). You can change to AM.
        </p>

        <textarea
          name="message"
          value={formData.message}
          placeholder="Write your request message..."
          onChange={handleChange}
          required
          className="p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-[#ff0033] text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
