const MissionVision = () => {
  return (
    <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-20">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-8">Our Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 bg-white/10 backdrop-blur rounded-2xl">
            <h3 className="text-2xl font-semibold mb-3">🌍 Our Mission</h3>
            <p className="text-lg">
              To build a global network where no life is lost due to lack of
              blood donors. We aim to simplify the donation process and
              encourage a culture of giving.
            </p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur rounded-2xl">
            <h3 className="text-2xl font-semibold mb-3">🚀 Our Vision</h3>
            <p className="text-lg">
              A future where technology bridges the gap between blood donors and
              recipients instantly, creating a healthier, stronger world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
