'use client';
import { useState } from 'react';
import ButtonBig from '@/app/Components/ButtonBig';
import MessageLog from './MessageLog';
import { addNewUser } from '@/app/api/supabaseapi';
import Success from './Success';

function AddUserForm() {
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form data
    const formData = new FormData(event.target);

    // Convert form data to an object
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    };

    // Reset the error message and success message before validation
    setErrMessage('');
    setSuccessMessage('');

    // Guard clauses to prevent form submission if any field is empty or has invalid format
    if (!data.name || !data.email || !data.phone || !data.address) {
      setErrMessage('All Fields are Required');
      return; // Stop form submission if any field is empty
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setErrMessage('Invalid email format');
      return; // Stop form submission if email is invalid
    }

    // Validate address format
    if (data.address.length < 5) {
      setErrMessage('Address must be at least 5 characters long');
      return; // Stop form submission if address is invalid
    }

    try {
      // Await the result of addNewUser to handle success or failure
      const result = await addNewUser(data);

      if (result) {
        setSuccessMessage('User was added successfully');
      } else {
        setErrMessage('An error occurred while adding the user');
      }
    } catch (error) {
      // Handle any unexpected errors that occur during the API call
      console.error(error);
      setErrMessage('An error occurred while adding the user');
    }
    console.log(successMessage);

    // Clear form fields
    event.target.reset();
  };

  return (
    <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
      <div className="w-[100%] md:flex xs:flex-col md:flex-row justify-between mt-10">
        <input
          name="name"
          id="name"
          placeholder="Full Names"
          className="md:w-[48%] xs:w-[96%] rounded-sm p-2 focus:outline-none border border-primary"
        />
        <input
          name="email"
          id="email"
          placeholder="Email"
          className="md:w-[48%] xs:w-[96%] rounded-sm xs:mt-10 md:mt-0 p-2 focus:outline-none border border-primary"
        />
      </div>
      <div className="w-[100%] md:flex xs:flex-col  md:flex-row justify-between mt-10">
        <input
          name="phone"
          id="phone"
          placeholder="Phone Number"
          className="md:w-[48%] xs:w-[96%] rounded-sm p-2 focus:outline-none border border-primary"
        />
        <input
          name="address"
          id="address"
          placeholder="Address"
          className="md:w-[48%] xs:w-[96%] rounded-sm xs:mt-10 md:mt-0 p-2 focus:outline-none border border-primary"
        />
      </div>

      {/* Conditionally render Error or Success messages */}
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
          Add User
        </ButtonBig>
      </div>
    </form>
  );
}

export default AddUserForm;
