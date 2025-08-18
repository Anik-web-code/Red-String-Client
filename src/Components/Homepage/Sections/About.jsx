import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src="https://i.postimg.cc/tRfG5Gxz/wp4323467.webp"
          alt="About Blood Donation"
          className="rounded-2xl shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">About Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We are a dedicated platform connecting donors with those in urgent
            need of blood. Our mission is to save lives through efficient,
            reliable, and transparent blood donation services.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Easy donor registration</li>
            <li>✅ Quick request system</li>
            <li>✅ Verified and safe donors</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
