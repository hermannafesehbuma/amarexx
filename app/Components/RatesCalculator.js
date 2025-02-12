'use client';
import { useState } from 'react';
import ButtonBig from './ButtonBig';
import { IoIosArrowForward } from 'react-icons/io';

function RatesCalculator() {
  const [shippingFrom, setShippingFrom] = useState('');
  const [shippingTo, setShippingTo] = useState('');
  const [packageType, setPackageType] = useState('standard');
  const [weight, setWeight] = useState('');
  const [transitTime, setTransitTime] = useState(1);
  const [calculatedRate, setCalculatedRate] = useState(null);

  // Shipping Rate Data
  const rates = {
    standard: {
      1: 7,
      10: 20,
      50: 30,
      150: 100,
    },
    specialized: {
      1: 9,
      10: 25,
      50: 40,
      150: 130,
    },
    customized: {
      1: 20,
      10: 40,
      50: 70,
      150: 250,
    },
    crate: {
      small: 100,
      medium: 200,
      large: 300,
    },
    freight: {
      500: 400,
      1000: 700,
      5000: 2000,
      10000: 5000,
    },
  };

  const transitTimes = {
    amarexGround: 1,
    amarex2ndDay: 1.5,
    amarex3Day: 1.2,
    amarexNextDay: 2,
    amarexWorldWide: 1.4,
    amarexWorldwideExpress: 3,
  };

  // Handle Form Calculation
  const calculateRate = () => {
    let basePrice = 0;

    if (packageType === 'crate') {
      // Handle Crate Pricing
      basePrice = rates.crate[weight] || 0;
    } else if (packageType === 'freight') {
      // Handle Freight Pricing
      basePrice = rates.freight[weight] || 0;
    } else {
      // Handle Standard, Specialized, and Customized Packaging
      const weightClass = Object.keys(rates[packageType])
        .map(Number)
        .sort((a, b) => a - b)
        .find((w) => weight <= w);

      basePrice = weightClass ? rates[packageType][weightClass] : 0;
    }

    const totalPrice = basePrice * transitTime;
    setCalculatedRate(totalPrice);
  };

  return (
    <div className="bg-white pb-15 rounded custom-light top-20 lg:ml-10 xs:ml-0">
      <form
        className="flex flex-col sm:w-[100%] md:w-[90%] mx-auto mt-10 pb-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex xs:flex-col md:flex-row my-5 w-[100%] justify-between">
          <input
            placeholder="From"
            type="text"
            name="shippingFrom"
            value={shippingFrom}
            onChange={(e) => setShippingFrom(e.target.value)}
            className="border border-gray-300 p-2 text-gray-800 focus:outline-none md:w-[46%] xs:w-[90%] xs:mx-auto"
          />
          <input
            placeholder="To"
            type="text"
            name="shippingTo"
            value={shippingTo}
            onChange={(e) => setShippingTo(e.target.value)}
            className="border border-gray-300 p-2 text-gray-800 focus:outline-none md:w-[46%] xs:w-[90%] xs:mt-5 lg:mt-0 xs:mx-auto"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-bold uppercase mb-1 text-xs text-gray-800 md:w-[95%] xs:w-[90%] xs:mx-auto">
            Package Type*
          </label>
          <select
            name="packageType"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="border border-gray-300 p-2 text-gray-800 md:w-[96%] xs:mx-auto xs:w-[90%]"
          >
            <option value="standard">Standard Packages</option>
            <option value="specialized">Specialized Options</option>
            <option value="freight">Freight Packaging</option>
            <option value="customized">Customized Packaging</option>
            <option value="crate">Crate</option>
          </select>
        </div>

        <div className="flex xs:flex-col md:flex-row my-5 w-[100%] justify-between">
          <input
            placeholder="Weight (lbs)"
            type="number"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="border border-gray-300 p-2 text-gray-800 focus:outline-none xs:w-[90%] md:w-[95%] xs:mx-auto"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-bold uppercase mb-1 text-xs text-gray-800 md:w-[95%] xs:w-[90%] xs:mx-auto">
            Transit Times*
          </label>
          <select
            name="transitTimes"
            value={transitTime}
            onChange={(e) => setTransitTime(Number(e.target.value))}
            className="border border-gray-300 p-2 text-gray-800 md:w-[96%] xs:w-[90%] xs:mx-auto"
          >
            <option value={transitTimes.amarexGround}>
              Amarex Ground (1-5 business days)
            </option>
            <option value={transitTimes.amarex2ndDay}>
              Amarex 2nd Day Air (2 business days)
            </option>
            <option value={transitTimes.amarex3Day}>
              Amarex 3 Day Select (3 business days)
            </option>
            <option value={transitTimes.amarexNextDay}>
              Amarex Next Day Air (Next business day)
            </option>
            <option value={transitTimes.amarexWorldWide}>
              Amarex Worldwide Expedited (2-5 business days for international)
            </option>
            <option value={transitTimes.amarexWorldwideExpress}>
              Amarex Worldwide Express (1-3 business days for international)
            </option>
          </select>
        </div>

        <div>
          <ButtonBig
            onClick={calculateRate}
            className="px-10 py-3 bg-accent rounded-full flex items-center md:w-[20%] xs:w-[90%] xs:mx-auto"
          >
            Get Quote <IoIosArrowForward className="text-1xl" />
          </ButtonBig>

          {calculatedRate !== null && (
            <p className="text-gray-800 mt-10 font-bold md:w-[47%] xs:w-[90%] xs:mx-auto">
              Your Approximate Rate for Your Package: $
              {calculatedRate.toFixed(2)}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default RatesCalculator;
