import ContactForm from '../Components/ContactForm';
import Footer from '../Components/Footer';
import SupportFeatures from '../Components/SupportFeatures';
import SupportResources from '../Components/SupportResources';

function page() {
  const data = {
    title: 'Contact us',
    description: 'Contact us page',
  };

  return (
    <>
      <div className="h-[50vh] bg-gray-100  flex  flex-col justify-center [clip-path:ellipse(100%_100%_at_40%_0)] pt-[20vh] xs:pb-20 md:pb-0">
        <h1 className="md:text-5xl xs:text-4xl ml-10 mb-5">Contact Us</h1>
        <p className="w-[50%] ml-10 xs:text-sm md:text-base">
          Find the best way to get help and connect with Amarex®. Fill out a
          short form or get tips to fix some of the most common issues right
          from your computer. If you still need more help, see the contact
          information for technical support, Postal Store orders, and more.
        </p>
        <span className="border-b-4 border-secondary w-[10%] my-3 mt-5 ml-10"></span>
      </div>

      <div className="md:w-[90%] mx-auto xs:w-[95%] flex flex-col items-center justify-center mt-[5rem] bg-primary py-16">
        <h2 className="text-4xl text-white">Need Immediate help</h2>
        <span className="border-b-4 border-secondary w-[10%] my-3 mt-5"></span>
        <ContactForm />
      </div>
      <SupportResources />
      <SupportFeatures />
      <Footer />
    </>
  );
}

export default page;
