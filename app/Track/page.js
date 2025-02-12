'use client';
import TrackingForm from '../Components/TrackingForm';

function Page() {
  return (
    <>
      <div className="h-[50vh] bg-gray-100 flex flex-col justify-center [clip-path:ellipse(100%_100%_at_40%_0)] pt-20">
        <h1 className="text-5xl ml-10 mb-5">Track Package</h1>
        <p className="w-[50%] ml-10">
          Stay updated on your shipment&apos;s journey. Enter your tracking
          number to see the current status, transit route, and estimated
          delivery time for your goods or pets. Let me know if you&apos;d like
          variations or additional information included!
        </p>
        <span className="border-b-4 border-secondary w-[10%] my-3 mt-5 ml-10"></span>
      </div>
      <div className="flex justify-center mt-10">
        <TrackingForm />
      </div>
    </>
  );
}

export default Page;
