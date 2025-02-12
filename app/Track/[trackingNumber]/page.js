import { format } from 'date-fns';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { MdOutlinePets } from 'react-icons/md';
import { RxActivityLog } from 'react-icons/rx';

import MapWrapper from '@/app/Components/Functions/MapWrapper';
import FullSeperator from '@/app/Components/FullSeperator';
import TimerStatusBar from '@/app/dashboard/Components/StatusBar';
import ErrorBox from '@/app/dashboard/Components/ErrorBox';
import { FaBoxesStacked } from 'react-icons/fa6';
import { getCoordinates } from '@/app/Components/FetchCoords';
import Activity from '@/app/Components/Activity';
import { FiUser } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { CiBoxes } from 'react-icons/ci';
import { PiDog } from 'react-icons/pi';
import { CgMenuHotdog } from 'react-icons/cg';
import { LiaBoxSolid } from 'react-icons/lia';
import { TbNumber } from 'react-icons/tb';
import { PiDogFill } from 'react-icons/pi';
import { CiRuler } from 'react-icons/ci';
import { CiCalendarDate } from 'react-icons/ci';
import { MdScale } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { CiClock1 } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';
import Link from 'next/link';
import Footer from '@/app/Components/Footer';
import {
  fetchActivity,
  fetchShipmentByTrackingNumber,
} from '@/app/api/supabaseapi';

supabase;
async function Page({ params }) {
  const { trackingNumber } = await params; //
  const { data, error } = await fetchShipmentByTrackingNumber(trackingNumber);
  console.log(data);
  const now = new Date();
  const formattedDate = format(now, 'EEEE, MMMM dd, yyyy');
  const originAddress = `${data.origin_street_address}, ${data.origin_city}, ${data.origin_state}, ${data.origin_country}`;
  const destinationAddress = `${data.destination_street_address}, ${data.destination_city}, ${data.destination_state}, ${data.destination_country}`;
  const { lat: olat, lng: olng } = await getCoordinates(originAddress);
  const { lat: dlat, lng: dlng } = await getCoordinates(destinationAddress);
  const { lat: ilat1, lng: ilng1 } = await getCoordinates(
    data.intermediate_path1
  );
  const { lat: ilat2, lng: ilng2 } = await getCoordinates(
    data.intermediate_path2
  );
  const shipmentType = await data.shipping_type_id;
  const { activity } = await fetchActivity('AM1239201-LZ');
  console.log(activity);

  // destinationAddress = getCoordinates(
  //   `${data.destination_street_address}, ${data.destination_city}, ${data.destination_state}, ${data.destination_country}`
  // );

  return (
    <>
      <div className="grid md:grid-cols-3 xs:grid-cols-1 xs:mt-[25%] md:mt-[7%] w-[90%] mx-auto">
        <div className="bg-white rounded-md flex p-2  md:mx-2 xs:mx-0 shadow-lg col-span-2 flex-col">
          <div className="mb-5">
            <span className="bg-green-200 px-5 rounded text-xs text-green-700 py-1">
              {' '}
              {data.trackingNumber}
            </span>
          </div>
          <div className="flex items-center">
            <MdOutlineLocalShipping className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-blue-600" />
            <div className="px-2">
              {data.status_id.status === 'On Hold' ||
              data.status_id.status === 'Cancelled' ? (
                <span className="text-2xl text-orange-600">
                  {data.status_id.status}
                </span>
              ) : (
                <span className="text-2xl text-green-600 animate-blink">
                  {data.status_id.status}
                </span>
              )}
              <span className="text-2xl text-blue-600"></span> <br />
              <span className="text-sm">{formattedDate}</span>
              <br />
              <div className="flex  my-2">
                <CiLocationOn className=" text-blue-600 mr-2" />
                <p className="text-xs text-gray-500">Current Location</p>
              </div>
              <p>
                {' '}
                {data.percentage === 0 ? (
                  <span className="text-sm text-blue-600">
                    Your Shipment is currently at our Warehouse
                  </span>
                ) : (
                  <span className="text-sm text-blue-600">
                    {data.present_address}
                  </span>
                )}
              </p>
            </div>
          </div>
          <TimerStatusBar
            goodWeight={data.shipment_good_id?.weight}
            percentage={data.percentage}
          />

          <FullSeperator />
          <div className="flex items-center mt-10">
            {data.shipment_good_id?.weight ? (
              <>
                <FaBoxesStacked className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-secondary" />
              </>
            ) : (
              <>
                <MdOutlinePets className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-pink-600" />
              </>
            )}

            <div className="px-2">
              <span> Shipment Details</span>
            </div>
          </div>

          {error.message ? (
            <ErrorBox message={error.message} />
          ) : (
            <div>
              <div className="grid md:grid-cols-2 xs:grid-cols-2 mt-5 text-sm px-12">
                <div>
                  <div>
                    {data.shipment_good_id?.weight ? (
                      <>
                        <div className="flex">
                          <CiBoxes className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Item Name
                            </span>
                            {data.shipment_good_id.name}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <MdOutlinePets className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Pet Name
                            </span>
                            {data.shipment_pet_id.name}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    {data.shipment_good_id?.weight ? (
                      <>
                        <div className="flex">
                          <MdOutlinePets className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Items Name
                            </span>
                            {data.shipment_good_id.item_id.description}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <PiDog className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Pet Breed
                            </span>
                            {data.shipment_pet_id.breed}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid xs:grid-cols-2 mt-5 text-sm px-12">
                <div>
                  <div>
                    {data.shipment_good_id?.weight ? (
                      <>
                        <div className="flex">
                          <LiaBoxSolid className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Package Type
                            </span>
                            {data.shipment_good_id.item_id.type}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <CgMenuHotdog className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Package Type
                            </span>
                            Crate
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    {data.shipment_good_id?.weight ? (
                      <>
                        <div className="flex">
                          <TbNumber className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Item Number
                            </span>
                            {data.shipment_good_id.Item_number}
                          </div>
                        </div>
                        <span className="font-bold md:mr-2 xs:mr-3"></span>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <PiDogFill className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Pet Number
                            </span>
                            {data.shipment_pet_id.petNumber}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid  xs:grid-cols-2 mt-5 text-sm px-12">
                <div>
                  <div>
                    {data.shipment_good_id?.weight ? (
                      <>
                        <div className="flex">
                          <CiRuler className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Item Dimension
                            </span>
                            {data.shipment_good_id.dimensions}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <CiCalendarDate className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Pet Age
                            </span>
                            {data.shipment_pet_id.age} Weeks
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    {data.shipment_good_id?.weight ? (
                      <>
                        <div className="flex">
                          <MdScale className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Weight
                            </span>
                            {data.shipment_good_id.weight} lbs
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <MdScale className=" text-blue-600 mr-2" />
                          <div className=" flex flex-col">
                            <span className="text-xs text-gray-500">
                              Weight
                            </span>
                            {data.shipment_pet_id.weight} lbs
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid   xs:grid-cols-2 mt-5 text-sm px-12">
                <div>
                  <div className="flex">
                    <FaMoneyBillWave className=" text-blue-600 mr-2" />
                    <div className=" flex flex-col">
                      <span className="text-xs text-gray-500">
                        Total Freight
                      </span>
                      ${data.totalFreight}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <BsClockHistory className=" text-blue-600 mr-2" />
                    <div className=" flex flex-col">
                      <span className="text-xs text-gray-500">
                        Transit Times
                      </span>
                      {data.transit_times_id.transitTimes}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid xs:grid-cols-2 mt-5 text-sm px-12">
                <div className="flex">
                  <CiLocationOn className=" text-blue-600 mr-2 xs:text-4xl md:text-base" />
                  <div className=" flex flex-col">
                    <span className="text-xs text-gray-500">Origin</span>
                    {`${data.origin_street_address}, ${data.origin_city}, ${data.origin_state}, ${data.origin_country}, ${data.origin_postal_code} `}
                  </div>
                </div>
                <div className="flex">
                  <CiLocationOn className=" text-blue-600 mr-2 xs:text-4xl md:text-base" />
                  <div className=" flex flex-col">
                    <span className="text-xs text-gray-500">Destination</span>
                    {`${data.destination_street_address}, ${data.destination_city}, ${data.destination_state}, ${data.destination_country}, ${data.destination_postal_code} `}
                  </div>
                </div>
              </div>
              <div className="grid  xs:grid-cols-2 mt-5 text-sm px-12">
                <div className="flex">
                  <CiClock1 className=" text-blue-600 mr-2" />
                  <div className=" flex flex-col">
                    <span className="text-xs text-gray-500">Depature Time</span>
                    {data.depatureTime}
                  </div>
                </div>
                <div className="flex">
                  <CiClock1 className=" text-blue-600 mr-2" />
                  <div className=" flex flex-col">
                    <span className="text-xs text-gray-500">Pickup Time</span>
                    {data.pickupTime}
                  </div>
                </div>
              </div>
              <div className="grid xs:grid-cols-2 mt-5 text-sm px-12 mb-5">
                <div className="flex">
                  <SlCalender className=" text-blue-600 mr-2" />
                  <div className=" flex flex-col">
                    <span className="text-xs text-gray-500">
                      {' '}
                      Delivery Date
                    </span>
                    {data.depatureDate}
                  </div>
                </div>
                <div className="flex">
                  <SlCalender className=" text-blue-600 mr-2" />
                  <div className=" flex flex-col">
                    <span className="text-xs text-gray-500"> Pickup Date</span>
                    {data.pickupDate}
                  </div>
                </div>
              </div>
              <p className="pl-12 mt-4">
                For More Details about this Shipment,{' '}
                <Link href="/auth">
                  <span className="text-blue-500">Signup/Login</span>
                </Link>
              </p>
            </div>
          )}
        </div>
        <div className=" md:mx-2 xs:mx-0 col-span-1 text-sm xs:mt-5 md:mt-0">
          {error.message ? (
            <ErrorBox message={error.message} />
          ) : (
            <div>
              <div className="bg-white rounded-lg mb-5 p-2 shadow-lg">
                <div>
                  <span className="bg-green-200 px-5 py-1 rounded text-xs text-green-700">
                    {' '}
                    Shipper&apos;s Details
                  </span>
                </div>
                <div className="pt-5 px-5">
                  <div className="flex my-2">
                    <FiUser className=" text-green-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Names</p>
                      <p className="font-bold">{data.shipper.name}</p>
                    </div>
                  </div>
                  <div className="flex  my-2">
                    <MdEmail className=" text-green-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p>{data.shipper.email}</p>
                    </div>
                  </div>
                  <div className="flex  my-2">
                    <CiLocationOn className=" text-green-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p>{data.shipper.address}</p>
                    </div>
                  </div>
                  <div className="flex  my-2">
                    <FaPhoneAlt className=" text-green-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Phone number</p>
                      <p> {data.shipper.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg mb-5 p-2 shadow-lg">
                <div>
                  <span className="bg-orange-200 px-5 py-1 rounded text-xs text-orange-700">
                    {' '}
                    Receiver&apos;s Details
                  </span>
                </div>
                <div className="pt-5 px-5">
                  <div className="flex my-2">
                    <FiUser className=" text-orange-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Names</p>
                      <p className="font-bold">{data.receiver.name}</p>
                    </div>
                  </div>
                  <div className="flex  my-2">
                    <MdEmail className=" text-orange-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p>{data.receiver.email}</p>
                    </div>
                  </div>
                  <div className="flex  my-2">
                    <CiLocationOn className=" text-orange-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p>{data.receiver.address}</p>
                    </div>
                  </div>
                  <div className="flex  my-2">
                    <FaPhoneAlt className=" text-orange-300 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Phone number</p>
                      <p> {data.shipper.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded py-5 px-2 shadow-lg col-span-1 xs:mt-2 md:mt-0">
                <div className="flex items-center">
                  <RxActivityLog className="border-2 border-gray-900 text-4xl rounded-full px-2 bg-secondary" />
                  <div className="px-2">
                    {error.message ? (
                      <ErrorBox message={error.message} />
                    ) : (
                      <span> Shipment Activity</span>
                    )}
                  </div>
                </div>
                <div className="mt-5 h-64">
                  <div className="flex items-start"></div>
                  <Activity trackingNumber={trackingNumber} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:mt-2 xs:mt-5 w-[90%] mx-auto">
        {error.message ? (
          <ErrorBox message={error.message} />
        ) : (
          <div className="bg-white rounded flex  md:mx-2 xs:mx-0 shadow-lg col-span-2 flex-col">
            <MapWrapper
              status={data.status_id.status}
              duration={data.duration}
              olat={olat}
              olng={olng}
              dlat={dlat}
              dlng={dlng}
              ilat1={ilat1}
              ilng1={ilng1}
              ilat2={ilat2}
              ilng2={ilng2}
              inter1={data.intermediate_path1}
              inter2={data.intermediate_path2}
              shipmentId={data.shipment_id}
              percentage={data.percentage}
              shipmentType={shipmentType}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Page;
