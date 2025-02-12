'use client';
import { MdError } from 'react-icons/md';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useUserContext } from '../Context/UserContext';
import { useEffect } from 'react';

export default function Error({ message, statusCode }) {
  const { setErrorMessage, errorMessage } = useUserContext();
  useEffect(() => {
    if (errorMessage) {
      // Set a timer to clear the error message after 3 seconds
      const timer = setTimeout(() => {
        setErrorMessage();
      }, 5000);

      // Clean up the timer on component unmount or if errorMessage changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage, setErrorMessage]);

  return (
    <>
      {errorMessage ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
          <div className="p-10 bg-red-100 text-red-800 rounded-md flex flex-col items-center relative">
            <MdError className="text-5xl" />
            <h2 className="text-lg font-bold">Error Occurred</h2>

            <p>
              {message ||
                'An unexpected error occurred. Please try again later.'}
            </p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
