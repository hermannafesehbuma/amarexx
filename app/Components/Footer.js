import Link from 'next/link';
import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import NewsletterForm from './NewsLetter';

function Footer() {
  return (
    <div className="bg-gray-100  border-t-[1px] py-10">
      <Link href="/">
        <Image
          src="/logo-amarex.png"
          width={100}
          height={50}
          layout="intrinsic"
          sizes="(max-width: 600px) 100px, 200px"
          alt="Header-Logo"
          className="md:ml-[11.5%] xs:ml-[9%]"
        />
      </Link>
      <div className=" grid grid-cols-5 w-[80%] mx-auto pb-10 xs:flex xs:flex-col sm:flex-row">
        <div className="xs:ml-2 md:ml-10 text-xs xs:mb-10 md:mb-0 col-span-1">
          <p className="font-bold mb-2">HELPFUL LINKS</p>
          <ul className="text-xs">
            <li className="mb-2">
              <Link href="/ContactUs">Contact us</Link>
            </li>
            <li className="mb-2">
              <Link href="/">Site Index</Link>
            </li>
            <li className="mb-2">
              <Link href="/Faqs">FAQS</Link>
            </li>
            <li className="mb-2">
              <Link href="/ContactUs">Feedback</Link>
            </li>
          </ul>
        </div>

        <div className="xs:ml-2 md:ml-20 text-xs xs:mb-10 md:mb-0 col-span-1">
          <p className="font-bold mb-2 uppercase">On About.Amarex.com</p>
          <ul className="text-xs">
            <li className="mb-2">
              <Link href="/about-amarex">About Amarex Home</Link>
            </li>
            <li className="mb-2">
              <Link href="/newsroom">Newsroom</Link>
            </li>
            <li className="mb-2">
              <Link href="/service-alerts">Amarex Service Updates</Link>
            </li>
            <li className="mb-2">
              <Link href="/">Forms & Publication</Link>
            </li>
          </ul>
        </div>
        <div className="xs:ml-2 md:ml-20 text-xs col-span-1">
          <p className="font-bold mb-2 uppercase">Legal Information</p>
          <ul className="text-xs">
            <li className="mb-2">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="mb-2">
              <Link href="/terms-of-use">Terms Of use</Link>
            </li>
            <li className="mb-2">
              <Link href="/accessibility-statement">
                Accessibility Statement
              </Link>
            </li>
          </ul>
        </div>
        <div className="xs:ml-2 md:ml-20 text-xs col-span-2">
          <NewsletterForm />
        </div>
      </div>
      <p className="text-xs ml-[11.5%] pb-5 border-b-[1px] border-primary w-[75%]">
        Copyright © 2025 Amarex. All Rights Reserved.
      </p>
      <div className=" py-1 flex ml-[11.5%] mt-5">
        <div className="flex items-center mr-5">
          <div className="border border-solid  border-primary rounded-full p-1 mr-2">
            <FaPhoneAlt className="text-primary " />
          </div>
        </div>
        <div className="flex items-center mr-5">
          <div className="border border-solid border-primary rounded-full p-1 mr-2">
            <SiMinutemailer className="text-primary" />
          </div>
        </div>
        <div className="flex items-center mr-5">
          <div className="border border-solid border-primary rounded-full p-1 mr-2">
            <FaFacebook className="text-primary" />
          </div>
        </div>
        <div className="flex items-center mr-5">
          <div className="border border-solid border-primary rounded-full p-1 mr-2">
            <FaInstagram className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
