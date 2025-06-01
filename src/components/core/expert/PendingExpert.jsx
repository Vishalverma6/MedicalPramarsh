import React, { useEffect, useState } from 'react'
import { getPendingExpert, approveExpert } from '../../../services/operations/expertAPI';
import { useSelector } from 'react-redux';

const PendingExpert = () => {
  const { token } = useSelector((state) => state.auth);
  const [experts, setExperts] = useState([]);

  const fetchPendingExperts = async () => {
    try {
      const result = await getPendingExpert(token);
      if (result?.length > 0) {
        setExperts(result);
      }
    } catch (error) {
      console.error("Error fetching pending experts", error);
    }
  };

  const handleApprove = async (expertId) => {
    try {
      const res = await approveExpert(expertId, token);
      if (res.success) {
        alert("Expert Approved!");
       
        // fetch the full list of pending expert 
      } 
      
      else {
        alert("Approval failed");
      }

      fetchPendingExperts();
    } catch (err) {
      console.error("Approval Error", err);
    }
  };

  useEffect(() => {
    fetchPendingExperts();
  }, []);

  return (
    <div className="p-5 bg-gradient-to-tr from-sky-200 shadow-2xl shadow-black">
      <h2 className="text-2xl font-bold mb-4">Pending Expert Requests</h2>
      {experts.length === 0 ? (
        <p>No pending experts found.</p>
      ) : (
        <div className="space-y-4">
          {experts.map((expert) => (
            <div key={expert._id} className="border-2 border-gray-400 p-4 gap-x-4 rounded-md shadow-sm flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {expert.firstName} {expert.lastName}</p>
                <p><strong>Email:</strong> {expert.email}</p>
                <p><strong>Contact:</strong> {expert.contactNumber}</p>
                <p><strong>Account Type:</strong> {expert.accountType}</p>
              </div>
              <button
                onClick={() => handleApprove(expert._id)}
                className="bg-green-600 mb-auto  text-white cursor-pointer px-4 py-2  rounded-md hover:bg-green-700 transition"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingExpert;
