import Footer from '../Components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Seperator from '../Components/Seperator';

function page() {
  const data = {
    title: 'Newsroom',
    description: 'Newsroom',
  };

  return (
    <>
      <div className="h-[50vh] bg-gray-100  flex  flex-col justify-center [clip-path:ellipse(100%_100%_at_40%_0)]">
        <h1 className="text-5xl ml-10 mb-5">Newsroom</h1>
        <p className="w-[50%] ml-10">The latest news from AMAREX</p>
        <span className="border-b-4 border-secondary w-[10%] my-3 mt-5 ml-10"></span>
      </div>

      <div className=" mx-auto grid md:grid-cols-3 xs:grid-cols-1 items-center justify-center mt-[5rem] w-[80%] mb-[10%] ">
        <Link href="/newsroom/key-changes-in-hong-kong-pets">
          <div className=" rounded-lg shadow-lg border-b-2 m-2">
            <Image
              src="/pet-updates.jpg"
              height={300}
              width={600}
              alt="newsroom"
            />
            <div className="p-10">
              <p className="text-xs my-5">PET NEWS</p>
              <h3 className="text-2xl font-bold">
                Latest Pet Shipping Updates: Key Changes in Hong Kong and
                Singapore and Asia (2024-2025)
              </h3>
              <p>
                Starting December 1, 2024, Hong Kong has reduced the quarantine
                period for cats and dogs imported from Macau from 120 days to 30
                days.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/newsroom/international-pet-shipping-services-market-growth">
          <div className=" rounded-lg shadow-lg border-b-2 m-2">
            <Image
              src="/pet-growth.jpg"
              height={300}
              width={600}
              alt="newsroom"
            />
            <div className="p-10">
              <p className="text-xs my-5">PET NEWS</p>
              <h3 className="text-2xl font-bold">
                International Pet Shipping Services Market Growth Trends Report:
                Size and Latest News Highlights
              </h3>
              <p>
                The global International Pet Shipping Services market was valued
                at approximately USD 1.8 billion in 2022 and is projected to
                grow at a compound annual growth rate (CAGR) of 9.6% from 2023
                to 2030. This growth is attributed to the rising pet ownership
                worldwide and increasing international relocations, especially
                in developed regions.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/newsroom/maersk-unveils-new-vessel">
          <div className=" rounded-lg shadow-lg border-b-2 m-2">
            <Image
              src="/maesrsk.webp"
              height={300}
              width={600}
              alt="newsroom"
            />
            <div className="p-10">
              <p className="text-xs my-5">SEA FREIGHT NEWS</p>
              <h3 className="text-2xl font-bold">
                Shipping giant Maersk unveils latest &apos;dual-fuel methanol
                vessel&apos; in decarbonization shift
              </h3>
              <p>
                SINGAPORE — Denmark-based shipping and logistics giant Maersk
                unveiled its latest dual-fuel methanol vessel in the Southeast
                Asian country on Thursday as the industry ramps up
                decarbonization efforts.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default page;
