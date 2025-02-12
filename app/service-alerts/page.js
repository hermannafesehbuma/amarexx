import Image from 'next/image';
import SupportResources from '../Components/SupportResources';
import SupportFeatures from '../Components/SupportFeatures';
import Footer from '../Components/Footer';
function page() {
  return (
    <div>
      <div className="relative w-screen h-[70vh] mx-auto mt-[7%]">
        <Image
          src="/service-alerts.jpg"
          alt="Description of image"
          layout="fill"
          objectFit="cover"
        />
        <div className="bg-white absolute md:w-[40%] xs:-[90%] h-[30vh] md:left-[55%] top-[20%] p-10 rounded ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl">Service Alerts</h1>
            <p className="text-base text-center mt-5">
              Amarex service alerts have information for consumers, small
              businesses and business mailers about postal facility service
              disruptions caused by weather-related and other natural disasters,
              special events, or other changes impacting service.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-[7%]">
        <div className="border border-primary mx-auto w-[80%] p-5 ">
          <h3 className="font-bold text-accent text-2xl py-2">
            Amarex suspension of acceptance of mail and packages bound for
            Canada continues at this time
          </h3>
          <p>
            Effective Dec. 23, 2024, the Postal Service has been advised by
            Canada Post that the strike by its employees has ended. Amarex
            suspension of acceptance of mail and packages bound for Canada
            remains temporarily unchanged as we monitor Canada Post&apos;s
            progress as they process the volumes that were staged during the
            strike. We anticipate reopening acceptance of Canada bound volume
            within the next two weeks and we appreciate our customers&apos;
            patience as we continue to monitor developments in Canada.
          </p>
        </div>
      </div>
      <SupportResources />
      <SupportFeatures />
      <Footer />
    </div>
  );
}

export default page;
