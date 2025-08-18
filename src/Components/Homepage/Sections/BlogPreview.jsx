import { motion } from "framer-motion";
import { Link } from "react-router";

motion;

const blogs = [
  {
    id: 1,
    title: "5 Tips Before Donating Blood",
    description:
      "Learn how to prepare yourself for a safe and successful blood donation.",
    image: "https://i.postimg.cc/VN2W8Bwd/2171-blood-donation.jpg",
    link: "/blogs",
  },
  {
    id: 2,
    title: "The Impact of Your Donation",
    description:
      "Every drop counts! See how your contribution changes lives globally.",
    image: "https://i.postimg.cc/4dzVRDwS/shutterstock-264395594-1-768x768-1.webp",
    link: "/blogs",
  },
  {
    id: 3,
    title: "Healthy Diet for Donors",
    description:
      "What to eat before and after donating blood for optimal recovery.",
    image: "https://i.postimg.cc/L6yfSBB2/Blood-Donation-1.jpg",
    link: "/blogs",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Latest Blogs</h2>
        <p className="text-gray-600 mb-12">
          Stay updated with news, tips, and stories about blood donation and health.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={blog.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 flex-grow">{blog.description}</p>
                <Link
                  to={blog.link}
                  className="mt-4 inline-block text-red-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

