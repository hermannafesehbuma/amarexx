import { fetchRefunds } from '@/app/api/supabaseapi';
import { MdDelete } from 'react-icons/md';
import Delete from '../../Components/Delete';

async function Page() {
  const { refunds, error } = await fetchRefunds();
  const totalAmountPaid = refunds.reduce(
    (accumulator, refund) => accumulator + refund.amount_paid,
    0
  );
  const totalRefunds = refunds.reduce(
    (accumulator, refund) => accumulator + refund.refundable_amount,
    0
  );
  console.log(refunds);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-4 border-b">User Name</th>
            <th className="p-4 border-b">User Email</th>
            <th className="p-4 border-b">Purpose</th>
            <th className="p-4 border-b">Amount Paid ($)</th>
            <th className="p-4 border-b">Refundable Amount ($)</th>
            <th className="p-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {refunds.length > 0 ? (
            refunds.map((refund) => (
              <tr
                key={refund.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 border-b">{refund.user_id.name}</td>
                <td className="p-4 border-b">{refund.user_id.email}</td>
                <td className="p-4 border-b">{refund.purpose}</td>
                <td className="p-4 border-b text-green-600 font-semibold">
                  ${refund.amount_paid.toFixed(2)}
                </td>
                <td className="p-4 border-b text-red-500 font-semibold">
                  ${refund.refundable_amount.toFixed(2)}
                </td>
                <Delete id={refund.id} />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
