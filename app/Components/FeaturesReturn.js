import Image from 'next/image';
import ButtonBig from './ButtonBig';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
function FeaturesReturn() {
  return (
    <div className="h-[70vh] grid grid-cols-2 gap-4 mx-auto bg-gradient-to-b from-white to-gray-100 [clip-path:ellipse(100%_100%_at_40%_0)] xs:flex xs:flex-col md:flex-row xs:mt-[20%] md:mt-0">
      <div className="flex items-center mx-10">
        <Image
          src="/returnitAmarex.jpg"
          alt="Description of image"
          width={650}
          height={250} // Specify the dimensions or use `layout="responsive"`
        />
      </div>
      <div className="flex  flex-col justify-center mx-10">
        <h2 className="text-4xl">
          Return It When and <br /> Where You Want
        </h2>
        <span className="border-b-4 border-secondary w-[15%] my-3"></span>
        <p>Find an Amarex Location</p>
        <div>
          <Link href="/ContactUs/FileClaim">
            <ButtonBig className="px-10 py-3 bg-accent rounded-full flex items-center mt-5">
              Find Out More <IoIosArrowForward className="text-1xl" />
            </ButtonBig>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturesReturn;
