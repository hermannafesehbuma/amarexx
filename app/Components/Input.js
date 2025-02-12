'use client';
import MainNav from './MainNav';
import Link from 'next/link';
import { CiBoxes } from 'react-icons/ci';
import { IoIosPin } from 'react-icons/io';
import { CiCalculator1 } from 'react-icons/ci';
import TrackingForm from './TrackingForm';
import RatesCalculator from './RatesCalculator';

import HomeContext from '../Context/HomeContext';
import { useContext } from 'react';

function Input() {
  const { active, setActive } = useContext(HomeContext);
  function handleActiveButton(activeButton) {
    setActive(activeButton);
    console.log(active);
  }
  return (
    <div className=" flex flex-col lg:w-[70%] md-[80%] xs:w-[90%] xs:mx-auto">
      <div className="flex mb-10 md:w-[85%] xs:w-[100%] mx-auto mt-10 justify-center">
        <MainNav
          onClick={() => handleActiveButton(1)}
          className={`${
            active === 1 ? ' border-b-2  border-secondary' : ' '
          } transition-all duration-100 ease-in-out `}
        >
          <CiCalculator1 className=" text-2xl" />
          <span className=" md:text-2xl xs:text-lg ">Transit Times</span>
        </MainNav>
        <MainNav
          onClick={() => handleActiveButton(2)}
          className={`${
            active === 2 ? ' border-b-2  border-secondary' : ' '
          } transition-all duration-100 ease-in-out  `}
        >
          <IoIosPin className=" text-2xl" />
          <span className=" md:text-2xl xs:text-lg ">Track</span>
        </MainNav>
        <MainNav>
          <CiBoxes className=" text-2xl" />
          <Link href="ship/sending-package ">
            <span className=" md:text-2xl xs:text-lg cursor-pointer">Ship</span>
          </Link>
        </MainNav>
      </div>
      {active === 2 ? <TrackingForm className="mt-20" /> : <RatesCalculator />}
    </div>
  );
}

export default Input;
