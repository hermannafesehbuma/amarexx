'use client';
import ButtonBig from '@/app/Components/ButtonBig';
import MessageLog from './MessageLog';
import { useEffect, useState } from 'react';
import { SlClose } from 'react-icons/sl';
import {
  fetchForSMS,
  fetchTrackingNumber,
  updateStatusShipment,
} from '@/app/api/supabaseapi';
import { supabase } from '@/app/supabaseClient';

function EditStatusForm({
  editStatusOpen,
  setStatusMenuOpen,
  activeShipment,
  statuses,
}) {
  const [packageStatus, setPackageStatus] = useState(6);
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      percentage: activeShipment.percentage || '',
      status_id: activeShipment.status_id.status_id || 0,
    });
  }, [activeShipment]);

  const handleInputChange = (e) => {
    const { name, value, tagName } = e.target; // Get tagName to identify the type of element

    // Check if the field name contains dot notation for nested fields
    if (name.includes('.')) {
      const keys = name.split('.'); // Split the name into parts (e.g., ['shipment_pet_id', 'name'])

      setFormData((prev) => {
        // Create a deep copy of the previous state to prevent mutation
        const updatedFormData = { ...prev };
        let current = updatedFormData;

        // Iterate through all keys except the last one to navigate the nested object
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          current[key] = current[key] || {}; // Initialize the object if it doesn't exist
          current = current[key];
        }

        // Set the value of the final key, converting if it's a select
        current[keys[keys.length - 1]] =
          tagName === 'SELECT' ? Number(value) : value;

        return updatedFormData;
      });
    } else {
      // Handle flat fields
      setFormData((prev) => ({
        ...prev,
        [name]: tagName === 'SELECT' ? Number(value) : value, // Convert to number only for select
      }));
    }

    // Clear any previous error/success message when user types
    setSuccessMessage('');
    setErrMessage('');
  };

  const testUpdateShipment = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Update the shipment status
      const { formdata, formerror } = await updateStatusShipment(
        activeShipment.shipment_id,
        {
          percentage: formData.percentage,
          status_id: formData.status_id,
        }
      );

      if (formerror) {
        console.error('Failed to update shipment status:', formerror);
        return;
      }

      setSuccessMessage('Shipment was successfully updated');

      // Step 2: Fetch the tracking number based on the activeShipment.shipment_id
      const { shipmentData, shipmentError } = await fetchTrackingNumber(
        activeShipment.shipment_id
      );

      if (shipmentError) {
        console.error('Error fetching tracking number:', shipmentError);
        return;
      }

      const trackingNumber = shipmentData?.trackingNumber;

      // Step 3: Call the API to send email notifications
      const emailResponse = await fetch(
        '/api/send-status-change-notifications',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shipmentData),
        }
      );

      const emailResponseData = await emailResponse.json();

      if (emailResponseData.success) {
        console.log('Notification emails sent successfully');
      } else {
        console.error(
          'Failed to send notification emails:',
          emailResponseData.error
        );
      }

      // Step 4: Fetch SMS Data
      const { smsData, smsError } = await fetchForSMS(
        activeShipment.shipment_id
      );

      if (smsError) {
        console.error('Error fetching SMS data:', smsError);
        return;
      }
      const smsResponse = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smsData),
      });

      // Log the response status and body for debugging
      if (!smsResponse.ok) {
        console.error('Failed to send SMS. Status:', smsResponse.status);
        const errorText = await smsResponse.text();
        console.error('Error response body:', errorText);
        return;
      }

      // Parse and log the JSON response
      const smsResult = await smsResponse.json();
      console.log('SMS result:', smsResult);

      if (smsResult.success) {
        alert('SMS notification sent successfully!');
      } else {
        alert('Failed to send SMS.');
      }
    } catch (error) {
      console.error('Error during shipment update and notification:', error);
      alert('An error occurred during the shipment update.');
    }
  };
  // Separate handlers for select fields (updating the value as the user selects)

  const handlePackageStatusUpdate = (e) => {
    setPackageStatus(e.target.value);
    handleInputChange(e);
  };

  console.log(successMessage);

  // Fetch countries for the dropdown

  return editStatusOpen ? (
    <div className="h-full w-full overflow-y-auto absolute top-0 left-0 bg-white p-5 mt-20">
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
      <div className="">
        <form className="w-[90%] mx-auto">
          <SlClose
            className="ml-[97%] text-2xl cursor-pointer mt-10"
            onClick={() => setStatusMenuOpen(false)}
          />
          <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Progress in Percentage{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="percentage"
                id="percentage"
                placeholder="Total Progress"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
                value={formData.percentage}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Package Status{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                onChange={handlePackageStatusUpdate}
                value={formData.status_id}
                name="status_id"
              >
                {statuses.map((status) => (
                  <option key={status.status_id} value={status.status_id}>
                    {status.status}
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
              type="button"
              className="px-10 py-3 bg-accent rounded-full flex items-center"
              onClick={(e) => testUpdateShipment(e)}
            >
              Save Changes
            </ButtonBig>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ''
  );
}

export default EditStatusForm;
