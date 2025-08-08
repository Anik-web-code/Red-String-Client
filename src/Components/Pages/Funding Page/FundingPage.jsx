import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../../Context/AuthContext";
import StripeCheckoutModal from "./StripeCheckoutModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const FundingPage = () => {
  const { user } = useContext(AuthContext);
  const [fundings, setFundings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://blood-donating-website.onrender.com/fundings")
      .then((res) => setFundings(res.data))
      .catch((err) => console.error("Error fetching fundings:", err));
  }, []);

  const pageCount = Math.ceil(fundings.length / itemsPerPage);
  const displayed = fundings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleDonate = () => {
    const amount = prompt("Enter amount to donate (USD):");
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return alert("Enter a valid amount.");
    }
    setDonationAmount(Number(amount));
    setShowModal(true);
  };

  console.log(user);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Fundings</h2>
        <button
          onClick={handleDonate}
          className="bg-green-600 text-[#FFFFFF] px-4 py-2 rounded"
        >
          Give Fund
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 font-bold text-[20px] text-gray-700">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Amount (USD)</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((f, idx) => (
              <tr key={idx} className="border-b text-[18px]">
                <td className="p-2">{f.name}</td>
                <td className="p-2">${f.amount.toFixed(2)}</td>
                <td className="p-2">{new Date(f.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel="← Prev"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex gap-2 justify-center mt-4"
          pageClassName="px-3 py-1 border rounded"
          activeClassName="bg-green-600 text-white"
        />
      )}

      {/* Stripe Modal */}
      {showModal && (
        <Elements stripe={stripePromise}>
          <StripeCheckoutModal
            amount={donationAmount}
            onClose={() => setShowModal(false)}
          />
        </Elements>
      )}
    </div>
  );
};

export default FundingPage;
