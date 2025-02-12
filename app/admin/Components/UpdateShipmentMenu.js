'use client';
import ButtonBig from '@/app/Components/ButtonBig';
import MessageLog from './MessageLog';
import { useEffect, useState } from 'react';
import { SlClose } from 'react-icons/sl';
import { updateGoods, updatePet, updateShipment } from '@/app/api/supabaseapi';

function UpdateShipmentMenu({
  editMenuOpen,
  setEditMenuOpen,
  setActiveUser,
  activeShipment,
  users,
  transittimes,
  transitError,
  allPackageType,
  packageError,
  statuses,
  statusError,
  shippingError,
  shippingtype,
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
  const [shipmentType, setShipmentType] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      trackingNumber: activeShipment.trackingNumber || '',
      percentage: activeShipment.percentage || '',
      origin_street_address: activeShipment.origin_street_address || '',
      origin_city: activeShipment.origin_city || '',
      origin_state: activeShipment.origin_state || '',
      origin_postal_code: activeShipment.origin_postal_code || '',
      origin_country: activeShipment.origin_country || '',
      destination_street_address:
        activeShipment.destination_street_address || '',
      destination_city: activeShipment.destination_city || '',
      destination_state: activeShipment.destination_state || '',
      destination_postal_code: activeShipment.destination_postal_code || '',
      destination_country: activeShipment.destination_country || '',
      status_id: activeShipment.status_id.status_id || 0,
      shipping_type_id: activeShipment.shipping_type_id || '',
      packageType: activeShipment.package_type?.item_id || '',
      shipment_pet_id: {
        name: activeShipment.shipment_pet_id?.name || '',
        breed: activeShipment.shipment_pet_id?.breed || '',
        age: activeShipment.shipment_pet_id?.age,
        weight: activeShipment.shipment_pet_id?.weight || '',
        petNumber: activeShipment.shipment_pet_id?.petNumber || '',
      },
      shipment_good_id: {
        Item_number: activeShipment.shipment_good_id?.Item_number || '',
        item_name: activeShipment.shipment_good_id?.item_name || '',
        dimensions: activeShipment.shipment_good_id?.dimensions,
        weight: activeShipment.shipment_good_id?.weight || '',
      },
      depatureTime: activeShipment.depatureTime || '',
      pickupTime: activeShipment.pickupTime || '',
      pickupDate: activeShipment.pickupDate || '',
      depatureDate: activeShipment.depatureDate || '',
      expectedDeliveryDate: activeShipment.expectedDeliveryDate || '',
      shipper: activeShipment.shipper.user_id || '',
      receiver: activeShipment.receiver.user_id || '',
      totalFreight: activeShipment.totalFreight || '',
      transit_times_id: activeShipment.transit_times_id || '',
      intermediate_path1: activeShipment.intermediate_path1 || '',
      intermediate_path2: activeShipment.intermediate_path2 || '',
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

  console.log(activeShipment);

  // const handleSaveChanges = async (e) => {
  //   e.preventDefault();
  //   const { formdata, formerror } = await updateShipment(
  //     activeShipment.shipment_id,
  //     formData.duration
  //   );

  //   if (formerror) {
  //     console.error('Error updating shipment:', formerror);
  //     setErrMessage('Failed to save changes.');
  //   } else {
  //     console.log('Shipment updated successfully:', formdata);
  //     setSuccessMessage('Changes saved successfully!');
  //   }
  // };
  const testUpdateShipment = async (e) => {
    e.preventDefault();

    const { formdata, error } = await updateShipment(
      activeShipment.shipment_id,
      {
        percentage: formData.percentage,
        trackingNumber: formData.trackingNumber,
        origin_street_address: formData.origin_street_address,
        origin_city: formData.origin_city,
        origin_state: formData.origin_state,
        origin_postal_code: formData.origin_postal_code,
        origin_country: formData.origin_country,
        destination_street_address: formData.destination_street_address,
        destination_city: formData.destination_city,
        destination_state: formData.destination_state,
        destination_postal_code: formData.destination_postal_code,
        destination_country: formData.destination_country,
        status_id: formData.status_id,
        depatureTime: formData.depatureTime,
        pickupTime: formData.pickupTime,
        pickupDate: formData.pickupDate,
        depatureDate: formData.depatureDate,
        expectedDeliveryDate: formData.expectedDeliveryDate,
        shipper: formData.shipper,
        receiver: formData.receiver,
        totalFreight: formData.totalFreight,
        transit_times_id: formData.transit_times_id,
        package_type: formData.packageType,
        intermediate_path1: formData.intermediate_path1,
        intermediate_path2: formData.intermediate_path2,
      }
    );

    if (activeShipment.package_type.item_id === 1) {
      const { petdata, peterror } = await updatePet(
        activeShipment.shipment_pet_id.pet_id,
        {
          name: formData.shipment_pet_id.name,
          breed: formData.shipment_pet_id.breed,
          age: formData.shipment_pet_id.age,
          weight: formData.shipment_pet_id.weight,
          petNumber: formData.shipment_pet_id.petNumber,
        }
      );
    }
    if (activeShipment.package_type.item_id !== 1) {
      const { gooddata, gooderror } = await updateGoods(
        activeShipment.shipment_good_id.goods_id,
        {
          Item_number: formData.shipment_good_id.Item_number,
          item_name: formData.shipment_good_id.item_name,
          dimensions: formData.shipment_good_id.dimensions,
          weight: formData.shipment_good_id.weight,
        }
      );
    }

    if (error) {
      setErrMessage('Shipment update has failed');
    } else {
      setSuccessMessage('Shipment Has Updated Succesfully');
    }
  };
  console.log(formData);

  // Separate handlers for select fields (updating the value as the user selects)
  const handleCountrySelectUpate = (e) => {
    setOriginSelectedCountry(e.target.value);
    handleInputChange(e);
  };

  const handleCountryDestinationSelectUpate = (e) => {
    setdestinationSelectedCountry(e.target.value);
    handleInputChange(e);
  };

  const handlePackageStatusUpdate = (e) => {
    setPackageStatus(e.target.value);
    handleInputChange(e);
  };

  const handleShippingUpdate = (e) => {
    setShippingType(e.target.value);
    handleInputChange(e);
  };

  const handlePackageTypeUpdate = (e) => {
    setPackageType(e.target.value);
    handleInputChange(e);
  };

  const handleSenderUpdate = (e) => {
    setSender(e.target.value);
    handleInputChange(e);
  };

  const handleReceiverUpdate = (e) => {
    setReceiver(e.target.value);
    handleInputChange(e);
  };

  const handleTransitTimesUpdate = (e) => {
    setTransitTimes(e.target.value);
    handleInputChange(e);
  };
  console.log(successMessage);

  // Fetch countries for the dropdown
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
  return editMenuOpen ? (
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
            onClick={() => setEditMenuOpen(false)}
          />
          <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Tracking Number{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="trackingNumber"
                id="trackingNumber"
                value={formData.trackingNumber}
                placeholder="Ex AM123456789-LZ"
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Progress{' '}
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
                  name="origin_street_address"
                  id="originAddress"
                  value={formData.origin_street_address}
                  placeholder="Address"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:w-[15%] xs:w-[100%]">
                <label className="text-sm">
                  City <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="origin_city"
                  id="originCity"
                  value={formData.origin_city}
                  placeholder="City"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:w-[15%] xs:w-[100%]">
                <label className="text-sm">
                  State/Province{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="origin_state"
                  id="region"
                  value={formData.origin_state}
                  placeholder="State/ City/ Province"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:w-[10%] xs:w-[100%]">
                <label className="text-sm">
                  Postal Code{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="origin_postal_code"
                  id="originPostalCode"
                  value={formData.origin_postal_code}
                  placeholder="Postal Codes"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:w-[20%] xs:w-[100%]">
                <label className="text-sm">
                  Country{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <select
                  name="origin_country"
                  value={formData.origin_country}
                  onChange={handleCountrySelectUpate}
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
                  name="destination_street_address"
                  id="destinationAddress"
                  value={formData.destination_street_address}
                  placeholder="Address"
                  onChange={handleInputChange}
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                />
              </div>
              <div className="flex flex-col md:w-[15%] xs:w-[100%]">
                <label className="text-sm">
                  City <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="destination_city"
                  id="destinationCity"
                  value={formData.destination_city}
                  placeholder="City"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
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
                  value={formData.destination_state}
                  placeholder="State/ City/ Province"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:w-[10%] xs:w-[100%]">
                <label className="text-sm">
                  Postal Code{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <input
                  name="destination_postal_code"
                  id="destinationPostalCode"
                  value={formData.destination_postal_code}
                  placeholder="Postal Codes"
                  className=" rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:w-[20%] xs:w-[100%]">
                <label className="text-sm">
                  Country{' '}
                  <span className="text-red-400 font-bold text-xs">*</span>
                </label>
                <select
                  name="destination_country"
                  value={formData.destination_country}
                  required
                  className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                  onChange={handleCountryDestinationSelectUpate}
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

            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Shipping type{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                onChange={handleShippingUpdate}
                name="shipping_type_id"
                value={formData.shipping_type_id}
              >
                {shippingtype.map((shipping) => (
                  <option
                    key={shipping.shipping_type_id}
                    value={shipping.shipping_type_id}
                  >
                    {shipping.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Intermediate Path 1{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="intermediate_path1"
                id="intermediate_path1"
                value={formData.intermediate_path1}
                placeholder="Intermediate Path For Air Freight"
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Intermediate Path 2{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <input
                name="intermediate_path2"
                id="intermediate_path2"
                value={formData.intermediate_path2}
                placeholder="Intermediate Path For Air Freight"
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
            <div className="flex flex-col md:w-[48%] xs:w-[100%]">
              <label className="text-sm">
                Shipment Type{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                onChange={(e) => setShipmentType(Number(e.target.value))}
                value={activeShipment.package_type.item_id === 1 ? 1 : 2}
                name=""
              >
                <option value={1}>Pets</option>
                <option value={2}>Goods</option>
              </select>
            </div>
          </div>
          {activeShipment.package_type.item_id === 1 ? (
            <div>
              <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Package Type{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <select
                    className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                    onChange={handlePackageTypeUpdate}
                    name="packageType"
                  >
                    <option value={1}>Crate</option>
                  </select>
                </div>
              </div>
              <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Pet Name{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_pet_id.name"
                    id="shipment_pet_id.name"
                    placeholder="Pet Name"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    value={formData?.shipment_pet_id?.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Pet Breed{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_pet_id.breed"
                    id="petBreed"
                    placeholder="Pet Breed"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    value={formData?.shipment_pet_id?.breed}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Pet Age{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_pet_id.age"
                    id="petAge"
                    placeholder="Pet Age"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    value={formData?.shipment_pet_id?.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col md:w-[30%] xs:w-[100%]">
                  <label className="text-sm">
                    Pet Weight{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_pet_id.weight"
                    id="petWeight"
                    placeholder="Pet Weight in lbs"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    value={formData?.shipment_pet_id?.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col md:w-[15%] xs:w-[100%]">
                  <label className="text-sm">
                    Pet Number{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_pet_id.petNumber"
                    id="petNumber"
                    placeholder="Pet Number"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    value={formData?.shipment_pet_id?.petNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
                {/* <div className="flex flex-col w-[48%]">
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
              </div> */}
                <div className="flex md:flex-col xs:flex-col w-[48%]">
                  <label className="text-sm">
                    Package Type{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <select
                    className="w-[100%] rounded-sm p-2 focus:outline-none border border-primary"
                    onChange={handlePackageTypeUpdate}
                    name="packageType"
                    value={formData.packageType}
                  >
                    {allPackageType.map((packagetype) => (
                      <option
                        key={packagetype.item_id}
                        value={packagetype.item_id}
                      >
                        {packagetype.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-[100%] flex md:flex-row xs:flex-col justify-between mt-10">
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Item Name{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_good_id.item_name"
                    id="itemName"
                    value={formData?.shipment_good_id?.item_name}
                    placeholder="Item Name"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Item Number{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_good_id.Item_number"
                    id="itemNumber"
                    placeholder="Item Number"
                    value={formData?.shipment_good_id?.Item_number}
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-[100%] flex xs:flex-col md:flex-row justify-between mt-10">
                <div className="flex flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Item Dimension{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_good_id.dimensions"
                    id="itemDimension"
                    value={formData?.shipment_good_id?.dimensions}
                    placeholder="Item Dimension"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex xs:flex-col md:w-[48%] xs:w-[100%]">
                  <label className="text-sm">
                    Item Weight{' '}
                    <span className="text-red-400 font-bold text-xs">*</span>
                  </label>
                  <input
                    name="shipment_good_id.weight"
                    id="itemWeight"
                    value={formData?.shipment_good_id?.weight}
                    placeholder="Item Weight"
                    className=" rounded-sm p-2 focus:outline-none border border-primary"
                    onChange={handleInputChange}
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
                value={formData.depatureTime}
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                required
                onChange={handleInputChange}
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
                value={formData.pickupTime}
                name="pickupTime"
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                required
                onChange={handleInputChange}
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
                value={formData.depatureDate}
                name="depatureDate"
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                required
                onChange={handleInputChange}
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
                value={formData.expectedDeliveryDate}
                name="expectedDeliveryDate"
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                required
                onChange={handleInputChange}
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
                value={formData.pickupDate}
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="w-[100%] flex justify-between mt-10">
            <div className="flex flex-col w-[48%]">
              <label className="text-sm">
                Sender <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                onChange={handleSenderUpdate}
                name="shipper"
                value={formData.shipper}
              >
                <option value="" disabled>
                  Select User
                </option>
                {users.map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-[48%]">
              <label className="text-sm">
                Receiver{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                onChange={handleReceiverUpdate}
                name="receiver"
                value={formData.receiver}
              >
                <option value="" disabled>
                  Select User
                </option>
                {users.map((user) => (
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
                value={formData.totalFreight}
                placeholder="Total Freight"
                className=" rounded-sm p-2 focus:outline-none border border-primary"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <label className="text-sm">
                Transit Times{' '}
                <span className="text-red-400 font-bold text-xs">*</span>
              </label>
              <select
                className="w-full p-2 border border-primary rounded-sm focus:outline-none"
                name="transit_times_id"
                onChange={handleTransitTimesUpdate}
                value={formData.transit_times_id}
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

export default UpdateShipmentMenu;
