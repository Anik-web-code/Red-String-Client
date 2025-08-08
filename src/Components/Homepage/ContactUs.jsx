import React from "react";

const ContactUs = () => {
  return (
    <section id="contact" className="bg-[#ff003320] py-12 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#ff0033] mb-5">
        Contact Us
      </h2>

      <div className="grid md:grid gap-10 lg:flex lg:flex-col">
        <form className="bg-white w-[96%] shadow-md rounded-xl p-6 space-y-4 lg:w-[50%] mx-auto text-[18px] font-medium">
          <div>
            <label className="block font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
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
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3355]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Message</label>
            <textarea
              placeholder="Your message"
              rows="5"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3355]"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff0033] hover:bg-[#ff3355] text-white font-semibold py-2 rounded-lg transition"
          >
            Send Message
          </button>
        </form>

        <div className="flex flex-col justify-center w-[96%] space-y-4 text-gray-700 lg:w-[50%] mx-auto">
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="text-[18px] font-medium">
            Have questions about donating or receiving blood? Feel free to send
            us a message using the form or reach out directly!
          </p>
          <div
            className="text-[18px] font-medium"
          >
            <p>
              <strong>Phone:</strong> +880 1998-739878
            </p>
            <p>
              <strong>Email:</strong> support@bloodstring.org
            </p>
            <p>
              <strong>Address:</strong> Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
