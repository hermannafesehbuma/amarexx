'use client';
import { MdOutlinePets } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { FaBox } from 'react-icons/fa6';
import { CiBoxes } from 'react-icons/ci';
import { TiTick } from 'react-icons/ti';
import { MdIncompleteCircle } from 'react-icons/md';
import { useUserContext } from '../Context/UserContext';
import { fetchShipmentByEmail, fetchUser } from '../api/supabaseapi';
import { Suspense, useEffect, useState } from 'react';
import Table from './Components/Table';
import Loading from '../loading';
import { useRouter } from 'next/navigation';

function Page() {
  const [shipment, setShipment] = useState([]);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const { email } = useUserContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (email) {
      async function fetchUsers() {
        try {
          const { data } = await fetchUser(email);
          setUser(data);
          const { shipmentData, error } = await fetchShipmentByEmail(
            data.user_id
          );
          setShipment(shipmentData);
          setLoading(false); // Stop loading after fetching data
          setError(error);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }

      fetchUsers(); // Call the function inside useEffect
    }
  }, [email]); // Add dependency array to avoid infinite loops
  console.log(shipment);

  if (loading) {
    return <Loading />;
  }

  if (!shipment || shipment.length === 0) {
    return <p>No shipments found.</p>; // Handle case where there are no shipments
  }

  return (
    <div className="md:h-[100vh]">
      <div>
        <h1 className="text-4xl mb-10">Hello, {user.name}</h1>
      </div>
      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 ">
          <div className="bg-white rounded p-10 flex items-center mx-8 shadow-lg md:mb-0 xs:mb-5">
            <CiBoxes className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-blue-600" />
            <div className="px-2">
              <span>{[shipment].length}</span> <br />
              <span>Total Shipments</span>
            </div>
          </div>
          <div className="bg-white rounded p-10 flex items-center mx-8 shadow-lg md:mb-0 xs:mb-5">
            <MdIncompleteCircle className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-green-600" />
            <div className="px-2">
              <span>{[shipment].length}</span> <br />
              <span>Active Shipments</span>
            </div>
          </div>
          <div className="bg-white rounded p-10 flex items-center mx-8 shadow-lg md:mb-0 xs:mb-5 md:mt-10 lg:mt-0">
            <TiTick className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-green-800" />
            <div className="px-2">
              <span>{shipment.status_id.status === 'Completed' ? 1 : 0}</span>{' '}
              <br />
              <span>Completed Shipments</span>
            </div>
          </div>
          <div className="bg-white rounded p-10 flex items-center justify-center mx-8 shadow-lg md:mt-10 lg:mt-0">
            <div className="px-2 text-center">
              <span>Gross Transportation Charge</span> <br />$
              <span className="text-2xl text-green-800">0.00</span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 mt-5 mb-10">
          <div className="bg-white rounded p-10 flex items-center mx-8 shadow-lg md:mb-0 xs:mb-5">
            <MdOutlinePets className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-pink-600" />
            <div className="px-2">
              <span>
                {shipment?.shipment_pet_id?.petNumber
                  ? shipment?.shipment_pet_id?.petNumber
                  : 0}
              </span>{' '}
              <br />
              <span>Pets Shipped</span>
            </div>
          </div>
          <div className="bg-white rounded p-10 flex items-center mx-8 shadow-lg md:mb-0 xs:mb-5">
            <FaBox className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-amber-800" />
            <div className="px-2">
              <span>
                {shipment?.shipment_good_id?.Item_number
                  ? shipment.shipment_good_id.Item_number
                  : 0}
              </span>{' '}
              <br />
              <span>Goods Shipped</span>
            </div>
          </div>
          <div className="bg-white rounded p-10 flex items-center mx-8 shadow-lg md:mb-0 xs:mb-5 md:mt-10 lg:mt-0">
            <RxCross2 className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-red-700" />
            <div className="px-2">
              <span>{shipment.status_id.status === 'Canceled' ? 1 : 0}</span>{' '}
              <br />
              <span>Canceled Shipments</span>
            </div>
          </div>
        </div>
        <Suspense fallback={<p>Loading shipments...</p>}>
          <Table shipment={shipment} error={error} loading={loading} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
