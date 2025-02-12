'use client';
import MessageLog from '@/app/admin/Components/MessageLog';
import ButtonBig from '@/app/Components/ButtonBig';
import Image from 'next/image';
import { useState } from 'react';
function Page() {
  const [message, setMessage] = useState('');
  function handleInformedDelivery() {
    setMessage(
      'You Just Applied For Informed Delivery, We will Provide you with your informed Dashboard'
    );
  }

  return (
    <div>
      {message ? (
        <MessageLog message={message} setMessage={setMessage} value={true} />
      ) : (
        ''
      )}
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold my-2">
            Informed Delivery by Amarex
          </h1>
          <h2 className="text-2xl font-bold my-2">
            See Photos of Your Mail Before It Arrives, Free
          </h2>
          <p>
            Start your mornings with a preview of your day&apos;s Amarex® mail
            and packages with Informed Delivery® notifications:
          </p>
        </div>
        <div className="relative h-[40vh]">
          <Image
            src="/infom-delivery.jpg"
            alt="Informed Delivery"
            layout="fill"
            objectFit="cover"
            style={{ clipPath: 'polygon(5% 0, 0 100%, 95% 100%, 100% 0)' }}
          />
        </div>
      </div>
      <div className="mt-[5%]">
        <h2 className="text-2xl font-bold my-2">Do More with Your Packages</h2>
        <p>
          Now that you can automatically see the status of your packages in one
          place, it&apos;s easier to manage deliveries from your Informed
          Delivery dashboard. You can:
        </p>
        <ul className="list-disc pl-10">
          <li>See your package details and tracking history</li>
          <li>Leave Amarex Delivery Instructions® for your carrier</li>
          <li>Schedule a Redelivery for another day</li>
          <li>Remove a package you no longer wish to track</li>
          <li>
            Automatically track the status of Click-N-Ship® packages you send to
            other people
          </li>
          <li>
            Manually add other Amaraex Tracking® numbers that you want to track
          </li>
          <li>Request For Shipment Edit</li>
        </ul>
        <ButtonBig
          className="rounded-full bg-secondary px-10 py-3 mt-10 items-center flex hover:scale-110 transition-all ease-in-out"
          onClick={() => handleInformedDelivery()}
        >
          Request for Informed Delivery
        </ButtonBig>
      </div>
    </div>
  );
}

export default Page;
