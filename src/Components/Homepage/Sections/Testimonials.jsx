import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Blood Recipient",
    text: "I can’t express my gratitude enough. Without this platform, I wouldn’t have found a donor so quickly. You saved my life.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Arif Hossain",
    role: "Regular Donor",
    text: "Donating blood was always something I wanted to do. This app made the process simple, safe, and rewarding.",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Emily Brown",
    role: "Volunteer",
    text: "I love being part of this community. Every story reminds me why we should give back and help others.",
    image: "https://i.pravatar.cc/150?img=56",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">What People Say</h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Our donors, recipients, and volunteers share their heartfelt
          experiences. Here’s why they trust us.
        </p>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="pb-10"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 border-4 border-red-200"
                />
                <p className="text-gray-700 italic mb-4">“{t.text}”</p>
                <h4 className="font-semibold text-lg">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
