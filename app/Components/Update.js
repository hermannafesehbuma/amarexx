import Link from 'next/link';
import Image from 'next/image';
import ButtonBig from './ButtonBig';
import ButtonBigTransparent from './ButtonBigTransparent';

function Update() {
  return (
    <div className="w-[90%] mx-auto mb-20">
      <h2 className="text-3xl text-primary text-center my-10 font-bold">
        Amarex Updates
      </h2>
      <div className="grid grid-cols-3 justify-center xs:flex xs:flex-col md:flex-row">
        <div className="w-[80%] mx-auto">
          <h3 className="text-primary text-xl mb-5 font-bold">
            Alert: Text & Email Scams
          </h3>
          <p>
            If you get a text or email claiming to be from Amarex about a
            package awaiting action or a delivery failure, don&apos;t click it:
            Delete it immediately. This is an attempt to steal your personal
            information. Find out how to protect yourself.
          </p>
          <div>
            <Link href="#" className="block my-5 underline text-primary">
              Text Scams{' '}
            </Link>
            <Link href="#" className="block underline text-primary">
              Email Scams
            </Link>
          </div>
        </div>
        <div className="w-[80%] mx-auto border-l-[1px] border-primary p-4">
          <h3 className="text-primary text-xl mb-5 font-bold">
            Upcoming Amarex Holidays
          </h3>
          <p>
            Amarex will be closed on Wednesday, December 25th in observance of
            Christmas Day.
          </p>
          <Link href="#" className="block my-5 underline text-primary">
            See All Holidays{' '}
          </Link>
        </div>
        <div className="w-[80%] mx-auto border-l-[1px] border-primary p-4">
          <h3 className="text-primary text-xl mb-5 font-bold">
            Mail Suspension: Canada
          </h3>
          <p>
            Effective November 29, 2024, international mail service to Canada is
            temporarily suspended, due to the strike of the Canadian Union of
            Postal Workers.
          </p>
          <Link href="#" className="block my-5 underline text-primary">
            Learn More{' '}
          </Link>
        </div>
      </div>

      <div className="flex md:w-[70%] xs:w-[90%] mx-auto mt-20 xs:flex-col md:flex-row">
        <div className="relative md:w-[45%] xs:w-[100%] h-[40vh]">
          <Image
            src="/cities.jpg"
            alt="Description of image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="relative md:w-[55%] xs:w-[100%] p-16 bg-gray-100">
          <h3 className="text-2xl">Latest News</h3>
          <p className="mt-5">
            Get the latest news, including articles on innovation, special
            announcements and more.
          </p>
          <Link href="/newsroom">
            <ButtonBigTransparent className="px-7 py-3  rounded-full flex items-center border-2 border-primary mt-5 text-primary hover:scale-110 transition-all ease-in-out">
              Go To NewsRoom
            </ButtonBigTransparent>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Update;
