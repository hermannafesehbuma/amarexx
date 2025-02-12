'use client';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useEffect } from 'react';

export default function Success({ successMessage, setSuccessMessage }) {
  useEffect(() => {
    if (successMessage) {
      // Set a timer to clear the error message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage();
      }, 2000);

      // Clean up the timer on component unmount or if errorMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]);

  return (
    <>
      {successMessage ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
          <div className="p-10 bg-green-100 text-green-800 rounded-md flex flex-col items-center relative">
            <IoIosCheckmarkCircle className="text-5xl" />
            <h2 className="text-lg font-bold">Success</h2>

            <p>{successMessage}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
