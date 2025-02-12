import { LuPackageSearch } from 'react-icons/lu';
import { TbTruckDelivery } from 'react-icons/tb';
import { LuPackageX } from 'react-icons/lu';
import { FaHouseChimneyUser } from 'react-icons/fa6';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import ButtonBig from '../Components/ButtonBig';
import Footer from '../Components/Footer';
import Link from 'next/link';
import FaqsSelector from '../Components/FaqsSelector';
function Faqs() {
  const data = {
    title: 'Contact us',
    description: 'Contact us page',
  };
  const faqsData = [
    {
      id: 1,
      title: 'What should I do if my package or pet delivery is delayed?',
      description:
        'In case of delays, our team will immediately notify you with updated delivery timelines. You can also contact our support team for assistance.',
    },
    {
      id: 2,
      title: ' How do I schedule a delivery for my pet or package?',
      description:
        'You can schedule a delivery by visiting our website, using our mobile app, or contacting our customer support team directly.',
    },
    {
      id: 3,
      title: 'Are there any restrictions on the types of packages you deliver?',
      description:
        'Yes, we cannot transport hazardous materials, illegal substances, or perishable goods that do not meet our packaging guidelines.',
    },
    {
      id: 4,
      title:
        ' What measures are in place to handle fragile or high-value packages?',
      description:
        'We use specialized packaging materials and trained staff to ensure that fragile or high-value packages are handled with the utmost care.',
    },
    {
      id: 5,
      title: 'What documents are required for pet transportation?',
      description:
        'You will need to provide vaccination records, a health certificate from a veterinarian, and any necessary permits depending on the destination.',
    },
    {
      id: 6,
      title: 'Do you offer same-day or expedited delivery services?',
      description:
        'Yes, we offer same-day and expedited delivery options for both pets and packages, subject to availability and location.',
    },
    {
      id: 7,
      title: 'What types of pets can you deliver?',
      description:
        'We can deliver a variety of pets, including dogs, cats, birds, and small animals. However, specific regulations may apply depending on the species and destination.',
    },
    {
      id: 8,
      title: 'Can I track my shipment in real-time?',
      description:
        'Yes, we provide real-time tracking for all shipments, allowing you to monitor the progress of your delivery online or via our mobile app.',
    },
    {
      id: 9,
      title:
        'How do you ensure the safety and comfort of pets during delivery?',
      description:
        'We prioritize the well-being of pets by using climate-controlled vehicles, providing adequate ventilation, and ensuring regular check-ins during transit.',
    },
    {
      id: 10,
      title: 'What services does your delivery agency provide?',
      description:
        'We specialize in delivering both pets and general packages, offering reliable and secure transportation solutions for your specific needs.',
    },
  ];
  return (
    <>
      <div className="h-[50vh] bg-gray-100  flex  flex-col justify-center [clip-path:ellipse(100%_100%_at_40%_0)]">
        <h1 className="text-5xl">Faqs</h1>
        <span className="border-b-4 border-secondary w-[10%] my-3 mt-5"></span>
      </div>
      <div>
        <h3 className="text-center font-bold text-3xl mt-20"> Quick Answers</h3>
        <p className="text-center">
          Find answers, tips, and troubleshooting instructions based on our most
          viewed topics.
        </p>
        <div className="grid grid-cols-5 w-[90%] mx-auto mt-20">
          <Link href="/Track">
            <div className="flex flex-col items-center">
              <LuPackageSearch className="text-5xl" />
              <p>Amarex Tracking®</p>
            </div>
          </Link>

          <Link href="/Faqs/informed-delivery">
            <div className="flex flex-col items-center">
              <TbTruckDelivery className="text-5xl" />
              <p>Informed Delivery®</p>
            </div>
          </Link>

          <Link href="/Faqs/package-intercept">
            <div className="flex flex-col items-center">
              <LuPackageX className="text-5xl" />
              <p>Package Intercept</p>
            </div>
          </Link>
          <Link href="/Faqs/change-of-address">
            <div className="flex flex-col items-center">
              <FaHouseChimneyUser className="text-5xl" />
              <p>Change Of Address</p>
            </div>
          </Link>
          <div className="flex flex-col items-center">
            <GiCardboardBoxClosed className="text-5xl" />
            <p>Mail & Ship</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-10 my-20">
        <div className="grid md:grid-cols-3 xs:grid-cols-1 w-[90%] mx-auto m-20">
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-2xl font-bold mb-5">File a Claim</h3>
            <p className="text-center mb-5">
              If an insured delivery doesn&apos;t go as planned, it&apos;s easy
              to file an insurance claim online.
            </p>
            <Link href="/ContactUs/FileClaim">
              <ButtonBig className="bg-primary px-10 py-3 rounded-sm">
                File A Claim
              </ButtonBig>
            </Link>
          </div>
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-2xl font-bold mb-5">Request a Refund</h3>
            <p className="text-center mb-5">
              Had trouble with a product or service? Find out if you&apos;re
              eligible for a refund.
            </p>
            <Link href="/ContactUs/RequestRefund">
              <ButtonBig className="bg-primary px-10 py-3 rounded-sm">
                Learn More
              </ButtonBig>
            </Link>
          </div>
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-2xl font-bold mb-5">Contact Us</h3>
            <p className="text-center mb-5">
              If you&apos;re having trouble resolving a problem, there are
              several ways to get help.
            </p>
            <Link href="/ContactUs">
              <ButtonBig className="bg-primary px-10 py-3 rounded-sm">
                File A Claim
              </ButtonBig>
            </Link>
          </div>
        </div>
      </div>

      <FaqsSelector data={faqsData} />
      <Footer />
    </>
  );
}

export default Faqs;
