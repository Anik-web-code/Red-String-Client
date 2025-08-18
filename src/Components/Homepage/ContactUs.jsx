import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setLoading(false);
      return;
    }

    const SERVICE_ID = "service_74kmmfs";
    const TEMPLATE_ID = "template_qgo6n3n";
    const USER_ID = "b0wAz0nkwlBfCQpPX";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      attachment: "",
    };

    if (formData.file) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.file);
      reader.onloadend = async () => {
        templateParams.attachment = reader.result;
        try {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
          setSubmitStatus("success");
          setFormData({ name: "", email: "", message: "", file: null });
        } catch (error) {
          console.error(error);
          setSubmitStatus("error");
        } finally {
          setLoading(false);
          setTimeout(() => setSubmitStatus(null), 5000);
        }
      };
    } else {
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "", file: null });
      } catch (error) {
        console.error(error);
        setSubmitStatus("error");
      } finally {
        setLoading(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    }
  };

  return (
    <section id="contact" className="bg-[#ff003320] py-12 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#ff0033] mb-5">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center space-y-4 text-gray-700">
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="text-[18px] font-medium">
            Have questions about donating or receiving blood? Reach out directly
            or send us a message using the form.
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#ff0033]" /> +880 1998-739878
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#ff0033]" /> support@bloodstring.org
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-[#25D366]" /> +880 1998-739878
            </p>
          </div>
        </div>
        <form
          className="bg-white shadow-md rounded-xl p-6 space-y-4 text-[18px] font-medium"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3355]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3355]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your message"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3355]"
              required
            ></textarea>
          </div>

      
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff0033] hover:bg-[#ff3355] text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-600 font-semibold mt-2">
              Message sent successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-600 font-semibold mt-2">
              Something went wrong. Please check your fields.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
