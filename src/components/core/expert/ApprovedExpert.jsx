import React, { useEffect, useState } from 'react';
import { getApprovedExpertList } from '../../../services/operations/expertAPI';
import { useSelector } from 'react-redux';

const ApprovedExpert = () => {
  const { token } = useSelector((state) => state.auth);
  const [approvedExperts, setApprovedExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedExpert = async () => {
    try {
      const result = await getApprovedExpertList(token);
      console.log("Approved Experts:", result);
      setApprovedExperts(result || []);
    } catch (err) {
      console.error("Failed to fetch experts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedExpert();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-10 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6">Approved Experts</h1>

      {loading ? (
        <p className="text-gray-300">Loading experts...</p>
      ) : approvedExperts.length === 0 ? (
        <p className="text-blue-300">No approved experts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {approvedExperts.map((expert) => (
            <div
              key={expert._id}
              className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-600"
            >
              <div className="flex items-center gap-4">
                <img
                  src={expert.image}
                  alt={`${expert.firstName} ${expert.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-500"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {expert.firstName} {expert.lastName}
                  </h3>
                  <p className="text-sm text-gray-300">{expert.email}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm"><span className="font-medium">Contact:</span> {expert.contactNumber}</p>
                <p className="text-sm"><span className="font-medium">Account Type:</span> {expert.accountType}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedExpert;
