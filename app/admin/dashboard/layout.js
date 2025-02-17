'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/NavBar';

export default function ShipmentLayout({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   console.log(user.email);

  //   if (!user || user.email !== 'eamarex@gmail.com') {
  //     router.replace('/admin'); // Redirect unauthorized users
  //   } else {
  //     setIsAuthorized(true);
  //   }
  // }, [router]);

  // if (!isAuthorized) return null; // Prevent layout rendering until check is complete

  return (
    <div className="grid md:grid-cols-4 xs:grid-cols-1 mt-[6.6%]">
      <NavBar className="col-span-1" />
      <main className="px-[5%] py-10 col-span-3 bg-gray-100">{children}</main>
      <p>© 2024 Your Company</p>
    </div>
  );
}
