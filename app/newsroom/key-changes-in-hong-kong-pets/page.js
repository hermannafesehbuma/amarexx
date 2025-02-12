import Link from 'next/link';
import Footer from '@/app/Components/Footer';
import Seperator from '@/app/Components/Seperator';
import Image from 'next/image';

function page() {
  return (
    <>
      <div className="mt-[10%] w-[80%] mx-auto">
        <div className="flex items-center">
          <Link href="/newsroom">
            {' '}
            <span className="underline m-2">newsroom</span>
          </Link>
          /
          <Link href="/newsroom/key-changes-in-hong-kong-pets">
            <span className="underline m-2">
              {' '}
              key-changes-in-hong-kong-and-singapore
            </span>{' '}
          </Link>
          /
        </div>
        <Seperator />
        <h1 className="text-4xl my-10">
          Latest Pet Shipping Updates: Key Changes in Hong Kong and Singapore
          and Asia (2024-2025)
        </h1>
        <div className="w-[90%] mx-auto">
          <Image
            src="/pet-updates.jpg"
            width={900}
            height={300}
            alt="Pet Updates"
          />
          <div className="my-20">
            <ul className="list-disc my-10">
              <li>
                <span className="font-bold">
                  {' '}
                  Hong Kong Reduces Quarantine Period for Pets from Macau
                </span>
                Starting December 1, 2024, Hong Kong has reduced the quarantine
                period for cats and dogs imported from Macau from 120 days to 30
                days. This change aims to facilitate easier pet relocation
                between the two regions. South China Morning Post.
              </li>
              <li>
                <span className="font-bold">
                  {' '}
                  Singapore Updates Pet Import Regulations
                </span>
                Effective July 1, 2024, Singapore&apos;s Animal & Veterinary
                Service (AVS) revised its rabies risk categorization system,
                transitioning from a four-category system to a three-schedule
                system. This update aligns with international standards and
                provides greater clarity for pet owners. Ferndale Kennels
              </li>
              <li>
                <span className="font-bold">
                  {' '}
                  Concerns Over Ineffective Rabies Vaccine in Singapore
                </span>
                In September 2024, Singapore&apos;s AVS advised against using
                the Canvac R (Dyntec) rabies vaccine due to potency concerns.
                Importers are now required to ensure that rabies serology test
                reports come from approved laboratories. National Parks Board
              </li>
              <li>
                <span className="font-bold">
                  {' '}
                  Hong Kong Pet Owners Advocate for Eased Quarantine Rules
                </span>
                A September 2024 survey revealed that 80% of Hong Kong pet
                owners consider existing quarantine rules too harsh, with over
                90% expressing concerns about lengthy waiting times for
                quarantine spots. This feedback has prompted discussions on
                potential policy adjustments.
              </li>
              <li>
                <span className="font-bold">
                  {' '}
                  Introduction of Pet-Friendly Public Transport in Hong Kong
                </span>
                A September 2024 survey revealed that 80% of Hong Kong pet
                owners consider existing quarantine rules too harsh, with over
                90% expressing concerns about lengthy waiting times for
                quarantine spots. This feedback has prompted discussions on
                potential policy adjustments.
              </li>
            </ul>
            Post These developments reflect ongoing efforts in Hong Kong and
            Singapore to balance public health concerns with the needs of pet
            owners, indicating a trend towards more accommodating pet relocation
            and transportation policies.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
