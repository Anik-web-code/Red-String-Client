import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "2021", donations: 1200 },
  { name: "2022", donations: 1800 },
  { name: "2023", donations: 2400 },
  { name: "2024", donations: 3200 },
];

const DonationImpact = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Our Impact</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Every drop counts! Thanks to our amazing donors, we have saved
          thousands of lives and continue to grow each year.
        </p>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#ef4444" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <h3 className="text-3xl font-bold text-red-500">15K+</h3>
            <p className="text-gray-600">Total Donations</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-500">10K+</h3>
            <p className="text-gray-600">Lives Saved</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-500">5K+</h3>
            <p className="text-gray-600">Active Donors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationImpact;
