'use client';

import { motion } from 'framer-motion';
import ButtonBig from './ButtonBig';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function FeaturedAmarex() {
  return (
    <div className="mt-20">
      <motion.h2
        className="text-center text-4xl mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Featured Amarex® Products & Services
      </motion.h2>

      {/* Informed Delivery Section */}
      <motion.div
        className="grid md:grid-cols-2 xs:grid-cols-1 items-center justify-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div>
          <div className="bg-primary md:py-10 xs:py-5 text-white text-3xl [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)]">
            <h2 className="text-center">
              Informed Delivery® <br /> Emails
            </h2>
          </div>
          <p className="w-[60%] mx-auto mt-10">
            Get in the holiday spirit. With free Daily Digest emails, you can
            see previews of letter-sized mail and track packages arriving soon.
          </p>
          <Link href="/dashboard/informed-delivery">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <ButtonBig className="px-10 py-3 bg-primary rounded-full flex items-center mt-5 xs:mb-10 md:mb-0">
                Sign Up for Free
              </ButtonBig>
            </motion.div>
          </Link>
        </div>
        <div className="flex xs:mx-10 md:mx-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <Image
              src="/informeds.jpg"
              alt="Informed Delivery Preview"
              width={650}
              height={250}
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Schedule a Free Pickup Section */}
      <motion.div
        className="grid md:grid-cols-2 xs:grid-cols-1 items-center justify-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="flex md:justify-end xs:mx-10 md:mx-0 xs:mb-10 md:mb-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <Image
              src="/pickupSchedule.jpg"
              alt="Schedule Pickup"
              width={650}
              height={250}
              loading="lazy"
            />
          </motion.div>
        </div>
        <div>
          <div className="bg-primary md:py-10 xs:py-5 text-white text-3xl [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)]">
            <h2 className="text-center">
              Schedule a Free <br />
              Package Pickup
            </h2>
          </div>
          <p className="w-[60%] mx-auto mt-10">
            Easily send holiday packages from home. Schedule a pickup online,
            place your Amarex® packages on your doorstep, and we&apos;ll come
            pick them up for free during regular delivery.
          </p>
          <Link href="/dashboard/schedule-package-delivery">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <ButtonBig className="px-10 py-3 bg-primary rounded-full flex items-center mt-5">
                Learn More
              </ButtonBig>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Every Door Direct Mail Section */}
      <motion.div
        className="grid md:grid-cols-2 xs:grid-cols-1 items-center justify-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div>
          <div className="bg-primary md:py-10 xs:py-5 text-white text-3xl [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)]">
            <h2 className="text-center">
              Every Door <br />
              Direct Mail® Service
            </h2>
          </div>
          <p className="w-[60%] mx-auto mt-10">
            Sending postcards or flyers? Take out the hassle of mailing lists
            and addressing. Just select the mail routes you want to target and
            let Amarex hand-deliver your mail to every door along the way.
          </p>
          <Link href="/dashboard/every-door-direct-mail">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <ButtonBig className="px-10 py-3 bg-primary rounded-full flex items-center mt-5 xs:mb-10 md:mb-0">
                Sign Up for Free
              </ButtonBig>
            </motion.div>
          </Link>
        </div>
        <div className="flex xs:mx-10 md:mx-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <Image
              src="/informedDelivery.jpg"
              alt="Every Door Direct Mail"
              width={650}
              height={250}
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default FeaturedAmarex;
