'use client';
import {
  createNewShipment,
  fetchTrackingNumber,
  updateStatusShipment,
} from '@/app/api/supabaseapi';
import ButtonBig from '@/app/Components/ButtonBig';
import { useEffect, useState } from 'react';
import MessageLog from './MessageLog';
import { SlClose } from 'react-icons/sl';

function CreateShipmentForm({
  data: userData,
  transittimes,
  error,
  transitError,
  allPackageType,
  packageError,
}) {
  const [countries, setCountries] = useState([]);
  const [originSelectedCountry, setOriginSelectedCountry] = useState('');
  const [destinationSelectedCountry, setdestinationSelectedCountry] =
    useState('');
  const [packageStatus, setPackageStatus] = useState(6);
  const [shippingType, setShippingType] = useState(1);
  const [packageType, setPackageType] = useState(1);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [transitTimes, setTransitTimes] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [shipmentType, setShipmentType] = useState(1);
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(
          data.map((country) => ({
            name: country.name.common,
            code: country.cca2,
          }))
        );
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form data
    const formData = new FormData(event.target);
    console.log(formData);

    // Convert form data to an object
    const data = {
      trackingNumber: formData.get('trackingNumber'),
      shipmentType: formData.get('shipmentType'),
      originAddress: formData.get('originAddress'),
      origin_state_province_region: formData.get(
        'origin_state_province_region'
      ),
      originCity: formData.get('originCity'),
      originPostalCode: formData.get('originPostalCode'),
      originSelectedCountry: formData.get('originSelectedCountry'),
      destinationAddress: formData.get('destinationAddress'),
      destination_state_province_region: formData.get(
        'destination_state_province_region'
      ),
      destinationCity: formData.get('destinationCity'),
      destinationPostalCode: formData.get('destinationPostalCode'),
      destinationSelectedCountry: formData.get('destinationSelectedCountry'),
      packageStatus: formData.get('packageStatus'),
      shippingType: formData.get('shippingType'),
      packageType: formData.get('packageType'),
      petName: formData.get('petName') || null,
      petBreed: formData.get('petBreed') || null,
      petAge: formData.get('petAge') || null,
      petWeight: formData.get('petWeight') || null,
      petNumber: formData.get('petNumber') || null,
      itemName: formData.get('itemName') || null,
      itemDimension: formData.get('itemDimension') || null,
      itemWeight: formData.get('itemWeight') || null,
      itemNumber: formData.get('itemNumber') || null,
      depatureTime: formData.get('depatureTime'),
      pickupTime: formData.get('pickupTime'),
      deliveryDate: formData.get('deliveryDate'),
      pickupDate: formData.get('pickupDate'),
      depatureDate: formData.get('depatureDate'),
      sender: formData.get('sender'),
      receiver: formData.get('receiver'),
      totalFreight: formData.get('totalFreight'),
      transitTimes: formData.get('transitTimes'),
      percentage: formData.get('percentage'),
      intermediatePath1: formData.get('intermediatePath1') || null,
      intermediatePath2: formData.get('intermediatePath2') || null,
    };

    console.log(data);
    // Reset the error message and success message before validation
    setErrMessage('');
    setSuccessMessage('');

    try {
      // Step 1: Update the shipment status
      const { shipmentData } = await updateStatusShipment(data);

      if (formerror) {
        console.error('Failed to update shipment status:', formerror);
        return;
      }

      setSuccessMessage('Shipment was successfully Created');

      // Step 2: Fetch the tracking number based on the activeShipment.shipment_id
      const shipmentDetails = {
        trackingNumber: shipmentData.trackingNumber,
        shipperEmail: shipmentData.shipper?.email,
        receiverEmail: shipmentData.receiver?.email,
        status: shipmentData.status_id?.status,
      };

      console.log(shipmentDetails);

      // Step 3: Call the API to send email notifications
      const response = await fetch('/api/shipment-creation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipmentDetails),
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log('Notification emails sent successfully');
      } else {
        console.error(
          'Failed to send notification emails:',
          responseData.error
        );
      }
    } catch (error) {
      // Handle any unexpected errors that occur during the API call
      console.error(error);
      setErrMessage('An error occurred while adding the shipment');
    }
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
              Tracking Number{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              name="trackingNumber"
              id="trackingNumber"
              placeholder="Ex AM123456789-LZ"
              className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
            />
          </div>

          <div className="flex flex-col  md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Shipment type{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              name="shipmentType"
              className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
              value={shipmentType}
              onChange={(e) => setShipmentType(e.target.value)} // Update state on change
            >
              <option value="">Select Shipment Type</option>
              <option value={1}>Van Move</option>
              <option value={2}>Air Freight</option>
              <option value={3}>Ship Freight</option>
            </select>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-accent">Origin Address</p>
          <div className="w-[100%] flex md:flex-row xs:flex-col justify-between ">
            <div className="flex flex-col md:w-[30%] xs:w-[100%]">
              <label className="text-sm">
                Address{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="originAddress"
                id="originAddress"
                placeholder="Address"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[15%] xs:w-[100%]">
              <label className="text-sm">
                City <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="originCity"
                id="originCity"
                placeholder="City"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[15%] xs:w-[100%]">
              <label className="text-sm">
                State/Province{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="origin_state_province_region"
                id="region"
                placeholder="State/ City/ Province"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[10%] xs:w-[100%]">
              <label className="text-sm">
                Postal Code{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="originPostalCode"
                id="originPostalCode"
                placeholder="Postal Codes"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[20%] xs:w-[100%]">
              <label className="text-sm">
                Country{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                name="originSelectedCountry"
                value={originSelectedCountry}
                onChange={(e) => setOriginSelectedCountry(e.target.value)}
                required
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
              >
                <option value="" disabled>
                  -- Select a Country --
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-accent">Destination Address</p>
          <div className="w-[100%] flex md:flex-row xs:flex-col justify-between ">
            <div className="flex flex-col md:w-[30%] xs:w-[100%]">
              <label className="text-sm">
                Address{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="destinationAddress"
                id="destinationAddress"
                placeholder="Address"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[15%] xs:w-[100%]">
              <label className="text-sm">
                City <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="destinationCity"
                id="destinationCity"
                placeholder="City"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[15%] xs:w-[100%]">
              <label className="text-sm">
                State/Province{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="destination_state_province_region"
                id="destination_state_province_region"
                placeholder="State/ City/ Province"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[10%] xs:w-[100%]">
              <label className="text-sm">
                Postal Code{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="destinationPostalCode"
                id="destinationPostalCode"
                placeholder="Postal Codes"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
              />
            </div>
            <div className="flex flex-col md:w-[20%] xs:w-[100%]">
              <label className="text-sm">
                Country{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                name="destinationSelectedCountry"
                value={destinationSelectedCountry}
                onChange={(e) => setdestinationSelectedCountry(e.target.value)}
                required
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
              >
                <option value="" disabled>
                  -- Select a Country --
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Package Status{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
              value={packageStatus}
              onChange={(e) => setPackageStatus(e.target.value)}
              name="packageStatus"
            >
              <option value={6}>Processing</option>
              <option value={4}>Returned</option>
              <option value={2}>In Transit</option>
              <option value={1}>On Hold</option>
              <option value={3}>Canceled</option>
              <option value={5}>Completed</option>
            </select>
          </div>

          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Shipping type{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
              value={shippingType}
              onChange={(e) => setShippingType(e.target.value)}
              name="shippingType"
            >
              <option value={1}>Van Move</option>
              <option value={2}>Air Freight</option>
              <option value={3}>Ship Freight</option>
            </select>
          </div>
        </div>
        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">Intermediate Path 1 </label>
            <input
              name="intermediatePath1"
              id="intermediatePath1"
              placeholder="Intermediate Path For Air Freight"
              className=" rounded-sm p-2 focus:outline-none border border-primary"
            />
          </div>

          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">Intermediate Path 2 </label>
            <input
              name="intermediatePath2"
              id="intermediatePath2"
              placeholder="Intermediate Path For Air Freight"
              className=" rounded-sm p-2 focus:outline-none border border-primary"
            />
          </div>
        </div>
        <div className="w-[100%] flex justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Shipment Type{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
              onChange={(e) => setShipmentType(Number(e.target.value))}
            >
              <option value={1}>Pets</option>
              <option value={2}>Goods</option>
            </select>
          </div>
        </div>
        {shipmentType === 1 ? (
          <div>
            <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Package Type{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <select
                  className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  name="packageType"
                >
                  <option value={1}>Crate</option>
                </select>
              </div>
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Total Duration{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="totalDuration"
                  id="totalDuration"
                  placeholder="Total Duration"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
            </div>
            <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Pet Name{' '}
                  <span className="text-red-400 font-bold text-xs ">*</span>
                </label>
                <input
                  name="petName"
                  id="petName"
                  placeholder="Pet Name"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Pet Breed{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="petBreed"
                  id="petBreed"
                  placeholder="Pet Breed"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
            </div>
            <div className="w-[100%] flex justify-between mt-10">
              <div className="flex flex-col md:w-[48%] xs:w-[32%]">
                <label className="text-sm">
                  Pet Age{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="petAge"
                  id="petAge"
                  placeholder="Pet Age"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[30%] xs:w-[32%]">
                <label className="text-sm">
                  Pet Weight{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="petWeight"
                  id="petWeight"
                  placeholder="Pet Weight in lbs"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[30%] xs:w-[32%]">
                <label className="text-sm">
                  Pet Number{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="petNumber"
                  id="petNumber"
                  placeholder="Pet Number"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Package Type{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <select
                  className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  name="packageType"
                >
                  <option value={2}>Standard Packages</option>
                  <option value={3}>Specialized Options</option>
                  <option value={4}>Freight Packaging</option>
                  <option value={5}>Customized Packaging</option>
                </select>
              </div>
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Package Number{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="packageNumber"
                  id="packageNumber"
                  placeholder="Package Number"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
            </div>
            <div className="w-[100%] flex justify-between mt-10">
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Item Name{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="itemName"
                  id="itemName"
                  placeholder="Item Name"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Progress{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="percentage"
                  id="percenytage"
                  placeholder="progress"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
            </div>
            <div className="w-[100%] flex justify-between mt-10">
              <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                <label className="text-sm">
                  Item Dimension{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="itemDimension"
                  id="itemDimension"
                  placeholder="Item Dimension"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[30%] xs:w-[100%]">
                <label className="text-sm">
                  Item Weight{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="itemWeight"
                  id="itemWeight"
                  placeholder="Item Weight"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[15%] xs:w-[100%]">
                <label className="text-sm">
                  Item Number{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="itemNumber"
                  id="itemNumber"
                  placeholder="Item Number"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
            </div>
          </div>
        )}
        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Depature Time{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              type="time"
              id="depatureTime"
              name="depatureTime"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Pickup Time{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Depature Date{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              type="date"
              id="depatureDate"
              name="depatureDate"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col md:w-[20%] xs:w-[100%]">
            <label className="text-sm">
              Expected Delivery Date{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col md:w-[20%] xs:w-[100%]">
            <label className="text-sm">
              Pickup Date{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Sender <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              name="sender"
            >
              <option value="" disabled>
                Select User
              </option>
              {userData.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:w-[48%] xs:w-[100%]">
            <label className="text-sm">
              Receiver <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              name="receiver"
            >
              <option value="" disabled>
                Select User
              </option>
              {userData.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-[100%] flex justify-between mt-10">
          <div className="flex flex-col w-[48%]">
            <label className="text-sm">
              Total Freight{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <input
              name="totalFreight"
              id="totalFreight"
              placeholder="Total Freight"
              className=" rounded-sm p-2 focus:outline-none border border-primary"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label className="text-sm">
              Transit Times{' '}
              <span className="text-red-400 font-bold text-xs">*</span>
            </label>
            <select
              className="w-full p-2 border border-primary rounded-sm focus:outline-none"
              value={transitTimes}
              name="transitTimes"
              onChange={(e) => setTransitTimes(e.target.value)}
            >
              <option value="" disabled>
                Select Transit Time
              </option>
              {transittimes.map((time) => (
                <option key={time.transit_id} value={time.transit_id}>
                  {time.transitTimes}
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
            Create Shipment
          </ButtonBig>
        </div>
      </form>
    </div>
  );
}

export default CreateShipmentForm;
