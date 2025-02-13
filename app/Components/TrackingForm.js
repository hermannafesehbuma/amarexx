'use client';
import { useRouter } from 'next/navigation';
import ButtonBig from './ButtonBig';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUserContext } from '../Context/UserContext';
import Loading from '../loading';
import LoadingSpinner from './LoadingSpinner';
export function TrackingForm({ className }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const handleTrackShipment = async () => {
    if (!trackingNumber) {
      setErrorMessage('Please enter a Valid Tracking Number.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      // Query Supabase for the shipment
      const { data, error } = await supabase
        .from('shipments') // Replace with your table name
        .select('*')
        .eq('trackingNumber', trackingNumber)
        .single(); // Use single() to fetch a single record

      if (error) {
        throw new Error(
          'Shipment not found. Please check the tracking number.'
        );
      }

      // Redirect to the dashboard with the tracking number in the URL
      if (user) {
        router.push(`/dashboard/${trackingNumber}`);
      }
      if (!user) {
        router.push(`/Track/${trackingNumber}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${className} flex flex-col items-center p-[10] rounded-md md:w-[100%]  sm:w-[100%] h-[40vh]`}
    >
      <div className="flex flex-row items-center justify-center w-[90%] xs:text-lg">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="p-3 border border-gray-300  w-[70%] text-black focus:outline-none rounded-none"
          placeholder="Enter Tracking Number"
        />
        <ButtonBig
          onClick={handleTrackShipment}
          disabled={loading}
          className={`  bg-accent ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span>
              Tracking
              <LoadingSpinner />
            </span>
          ) : (
            'Track Shipment'
          )}
        </ButtonBig>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
    </div>
  );
}

export default TrackingForm;
