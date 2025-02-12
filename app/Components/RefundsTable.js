'use client';

import { useEffect, useState } from 'react';
import { fetchRefundsById, fetchUser } from '../api/supabaseapi';
import { useUserContext } from '../Context/UserContext';
import Loading from '../loading';

export default function RefundsTable({ data }) {
  const [refunds, setRefunds] = useState([]);
  const [error, setError] = useState();
  const { email } = useUserContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (email) {
      async function fetchUsers() {
        try {
          const { data } = await fetchUser(email);
          console.log(data);
          const { refundsData, error } = await fetchRefundsById(data.user_id);
          setRefunds(refundsData);
          setError(error);
          setLoading(false); // Stop loading after fetching data
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }

      fetchUsers(); // Call the function inside useEffect
    }
  }, [email]); // Add dependency array to avoid infinite loops
  console.log(refunds);
  const totalAmountPaid = refunds.reduce(
    (accumulator, refund) => accumulator + refund.amount_paid,
    0
  );
  const totalRefunds = refunds.reduce(
    (accumulator, refund) => accumulator + refund.refundable_amount,
    0
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-4 border-b">Purpose</th>
            <th className="p-4 border-b">Amount Paid ($)</th>
            <th className="p-4 border-b">Refundable Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {refunds.length > 0 ? (
            refunds.map((refund) => (
              <tr
                key={refund.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 border-b">{refund.purpose}</td>
                <td className="p-4 border-b text-green-600 font-semibold">
                  ${refund.amount_paid.toFixed(2)}
                </td>
                <td className="p-4 border-b text-red-500 font-semibold">
                  ${refund.refundable_amount.toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No records found
              </td>
            </tr>
          )}
          <tr className="hover:bg-gray-50 transition duration-200">
            <td className="p-4 border-b">Total</td>
            <td className="p-4 border-b text-green-600 font-semibold">
              ${totalAmountPaid.toFixed(2)}
            </td>
            <td className="p-4 border-b text-red-500 font-semibold">
              ${totalRefunds.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
