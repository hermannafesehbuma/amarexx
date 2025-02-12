'use client';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi2';
import { CiBoxes } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
function NavBar() {
  return (
    <div className=" bg-gray-200 md:h-[100vh] w-full">
      <div className="flex flex-col items-center">
        <Image
          src="/logo-amarex.png"
          height={100}
          width={100}
          alt="Amarex Logo"
        />
      </div>
      <div className="flex flex-col items-center w-[90%] mx-auto">
        <ul className="w-[100%]">
          <Link href="/admin/dashboard">
            <li className="text-center md:p-5 xs:p-1 text-blue-500 cursor-pointer hover:bg-white flex items-center justify-center">
              <CiBoxes className="mr-2" />
              All Shipment
            </li>
          </Link>
          <Link href="/admin/dashboard/create-shipment">
            <li className="text-center md:p-5 xs:p-1 text-blue-500 cursor-pointer hover:bg-white flex items-center justify-center">
              <HiOutlinePlus className="mr-2" />
              Create Shipment
            </li>
          </Link>
          <Link href="/admin/dashboard/all-users">
            <li className="text-center md:p-5 xs:p-1 text-blue-500 cursor-pointer hover:bg-white flex items-center justify-center">
              <FaUsers className="mr-2" />
              All Users
            </li>
          </Link>
          <Link href="/admin/dashboard/add-new-user">
            <li className="text-center md:p-5 xs:p-1 text-blue-500 cursor-pointer hover:bg-white flex items-center justify-center">
              <FaUserAlt className="mr-2" />
              Add New User
            </li>
          </Link>
          <Link href="/admin/dashboard/refunds">
            <li className="text-center md:p-5 xs:p-1 text-blue-500 cursor-pointer hover:bg-white flex items-center justify-center">
              <HiOutlinePlus className="mr-2" />
              All Refunds
            </li>
          </Link>
          <Link href="/admin/dashboard/create-refunds">
            <li className="text-center md:p-5 xs:p-1 text-blue-500 cursor-pointer hover:bg-white flex items-center justify-center">
              <HiOutlinePlus className="mr-2" />
              Create Refunds
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
