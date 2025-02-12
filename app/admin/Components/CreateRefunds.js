'use client';

import { useEffect, useState } from 'react';
import MessageLog from './MessageLog';
import ButtonBig from '@/app/Components/ButtonBig';
import { createRefund } from '@/app/api/supabaseapi';

function CreateRefunds({ data, error }) {
  const [user, setUser] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form data
    const formData = new FormData(event.target);
    console.log(formData);

    // Convert form data to an object
    const data = {
      user: formData.get('user'),
      purpose: formData.get('purpose'),
      amount_paid: formData.get('amount_paid'),
      refundable_amount: formData.get('refundable_amount'),
    };

    console.log(data);
    // Reset the error message and success message before validation
    setErrMessage('');
    setSuccessMessage('');

    try {
      // Await the result of addNewUser to handle success or failure
      const result = await createRefund(data);

      if (result) {
        setSuccessMessage('Refunds was added successfully');
        event.target.reset();
      } else {
        setErrMessage('An error occurred while creating the shipment');
      }
    } catch (error) {
      // Handle any unexpected errors that occur during the API call
      console.error(error);
      setErrMessage('An error occurred while adding the shipment');
    }
    console.log(successMessage);

    // Clear form fields
  };

  return (
    <div classname="h-full w-full overflow-y-auto absolute top-0 left-0 bg-white p-5 mt-20">
      <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
        {errMessage ? (
          <MessageLog
            message={errMessage}
            setMessage={setErrMessage}
            value={false}
          />
        ) : (
          <MessageLog
            message={successMessage}
            setMessage={setSuccessMessage}
            value={true}
          />
        )}
        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Amount Paid{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              id="amount_paid"
              name="amount_paid"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Refundable Amount{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              id="refundable_amount"
              name="refundable_amount"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%] ">
            <div className="flex flex-col md:w-[100%] xs:w-[100%] ">
              <label className="text-sm">
                Purpose{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                id="purpose"
                name="purpose"
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              User <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              name="user"
            >
              <option value="" disabled>
                Select User
              </option>
              {data.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errMessage ? (
          <MessageLog
            message={errMessage}
            setMessage={setErrMessage}
            value={false}
          />
        ) : (
          <MessageLog
            message={successMessage}
            setMessage={setSuccessMessage}
            value={true}
          />
        )}

        <div className="mt-10">
          <ButtonBig
            type="submit"
            className="px-10 py-3 bg-accent rounded-full flex items-center"
          >
            Create Refunds
          </ButtonBig>
        </div>
      </form>
    </div>
  );
}

export default CreateRefunds;
