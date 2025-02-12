'use client';

import Image from 'next/image';
import ButtonBig from './ButtonBig';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';

function Features() {
  return (
    <div className="h-[70vh] grid grid-cols-2 gap-4 mx-auto bg-gradient-to-b from-white to-gray-100 [clip-path:ellipse(100%_100%_at_40%_0)] xs:flex xs:flex-col md:flex-row xs:mt-20">
      {/* Image Animation */}
      <motion.div
        className="flex items-center mx-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/saturdayShipping.jpg"
          alt="Description of image"
          width={650}
          height={250}
          loading="lazy"
          className="rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Text + Button Animation */}
      <motion.div
        className="flex flex-col justify-center mx-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl">
          Gain an Extra Day <br /> With Saturday Delivery
        </h2>
        <span className="border-b-4 border-secondary w-[15%] my-3"></span>
        <p>
          With Amarex Standard® on Saturday you can provide faster delivery,
          when and how your customers want it.
        </p>

        {/* Button Animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/buisness/weekend-pickup-deliveries">
            <ButtonBig className="px-10 py-3 bg-accent rounded-full flex items-center mt-5">
              Find Out More <IoIosArrowForward className="text-1xl" />
            </ButtonBig>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Features;
