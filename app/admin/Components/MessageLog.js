'use client';
import { MdError } from 'react-icons/md';
import { useEffect } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

export default function MessageLog({ message, setMessage, value }) {
  useEffect(() => {
    if (message) {
      // Set a timer to clear the message after 3 seconds
      const timer = setTimeout(() => {
        setMessage(''); // Clear message after 3 seconds
      }, 2000);

      // Clean up the timer on component unmount or if message changes
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) {
    return null; // Don't render anything if there's no message
  }

  return (
    <>
      {/* Conditionally render error message */}
      {!value ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
          <div className="p-10 bg-red-100 text-red-800 rounded-md flex flex-col items-center relative">
            <MdError className="text-5xl" />
            <h2 className="text-lg font-bold">Error Occurred</h2>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        // Conditionally render success message
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
          <div className="p-10 bg-green-100 text-green-800 rounded-md flex flex-col items-center relative">
            <IoIosCheckmarkCircle className="text-5xl" />
            <h2 className="text-lg font-bold">Success</h2>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}
