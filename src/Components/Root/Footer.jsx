import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaArrowUp, FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitNewsletter = (e) => {
    e.preventDefault();
    const valid = /\S+@\S+\.\S+/.test(email);
    if (!valid) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }
    setStatus({ type: "loading", msg: "Subscribing..." });
    setTimeout(() => {
      setStatus({ type: "success", msg: "Subscribed! Check your inbox." });
      setEmail("");
      setTimeout(() => setStatus(null), 3500);
    }, 900);
  };

  return (
    <footer className="relative bg-gradient-to-tr  from-red-600 via-red-500 to-red-400 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Branding */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M3 12l2-2 4 4 8-8 4 4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">RedString</h3>
                <p className="text-sm text-white/80">
                  Building modern web experiences with passion.
                </p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Available for freelance or full-time opportunities. I build clean,
              accessible, and performant interfaces — happy to collaborate on
              meaningful projects.
            </p>

            <div className="flex items-center gap-4">
              <a href="https://github.com/Anik-web-code" target="_blank" rel="noreferrer" className="p-3 rounded-lg border-2 border-white bg-white/20 hover:bg-white/30 transition shadow">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-3 rounded-lg border-2 border-white bg-white/20 hover:bg-white/30 transition shadow">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/Anik.2201097" target="_blank" rel="noreferrer" className="p-3 rounded-lg border-2 border-white bg-white/20 hover:bg-white/30 transition shadow">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="hover:text-white/90 transition">Home</Link></li>
                <li><Link to="/" className="hover:text-white/90 transition">About</Link></li>
                <li><Link to="/" className="hover:text-white/90 transition">Skills</Link></li>
                <li><Link to="/" className="hover:text-white/90 transition">Projects</Link></li>
                <li><Link to="/" className="hover:text-white/90 transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5" />
                  <a href="mailto:alianik11star@gmail.com" className="hover:text-white/90 transition">alianik11star@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="w-5 h-5" />
                  <a href="tel:+8801998739878" className="hover:text-white/90 transition">+8801998-739878</a>
                </div>
                <div className="text-sm">Location: Rajshahi, Bangladesh</div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 bg-white/10 p-6 rounded-2xl shadow-inner border-2 border-white">
            <h4 className="text-lg font-semibold mb-3">Subscribe to newsletter</h4>
            <p className="text-sm mb-4">Monthly tips, project highlights and useful resources.</p>
            <form onSubmit={submitNewsletter} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md px-4 py-3 bg-transparent border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <button className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold shadow-lg hover:scale-[1.02] transition">
                {status?.type === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
              {status?.type === "error" && <p className="text-sm text-red-200">{status.msg}</p>}
              {status?.type === "success" && <p className="text-sm text-green-200">{status.msg}</p>}
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/80">
          <p className="text-sm">© {year} RedString. All rights reserved.</p>
          
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-6 bottom-6 z-50 p-5 rounded-full bg-gradient-to-tr from-red-500 to-red-600 text-white shadow-2xl transition-transform ${
          showTop ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};

export default Footer;
