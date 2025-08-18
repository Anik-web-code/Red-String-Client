import { Heart, Users, Droplet } from "lucide-react";

const steps = [
  {
    icon: <Users className="h-10 w-10 text-red-500" />,
    title: "Register",
    description:
      "Sign up as a donor or requestor. Create your profile in less than 2 minutes and join our community.",
  },
  {
    icon: <Droplet className="h-10 w-10 text-blue-500" />,
    title: "Find a Match",
    description:
      "Our smart matching system quickly connects donors with patients based on location, blood type, and urgency.",
  },
  {
    icon: <Heart className="h-10 w-10 text-pink-500" />,
    title: "Donate & Save Lives",
    description:
      "Meet safely at the hospital or donation camp. Your contribution gives someone another chance at life.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-red-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Our platform makes blood donation simple, safe, and effective. Here’s
          how you can get started in just three easy steps.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
