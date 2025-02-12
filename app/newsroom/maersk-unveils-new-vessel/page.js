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
          <Link href="/newsroom/maersk-unveils-new-vessel">
            <span className="underline m-2"> maersk-unveils-new-vessel</span>{' '}
          </Link>
          /
        </div>
        <Seperator />
        <h1 className="text-4xl my-10">
          Shipping giant Maersk sees strong demand and &apos;another year of
          disruption&apos; for global trade in 2025
        </h1>
        <div className="w-[90%] mx-auto">
          <Image
            src="/maesrsk.webp"
            width={900}
            height={300}
            alt="Pet Updates"
          />
          <div className="my-20">
            <p>
              SINGAPORE — Denmark-based shipping and logistics giant Maersk
              unveiled its latest dual-fuel methanol vessel in the Southeast
              Asian country on Thursday as the industry ramps up decarbonization
              efforts.
              <br /> <br />
              The newly named A.P. Møller is a 350-meter-long ship that adds to
              a growing fleet of Maersk vessels that are able to run on methanol
              as well as traditional marine fuels. Speaking to CNBC&apos;s
              “Squawk Box Asia,” Maersk&apos;s Asia-Pacific president, Ditlev
              Blicher, said the vessels represent the latest technology that is
              ready to decarbonize shipping.
              <br /> <br />
              ″[This technology] allows the industry to shift from black fuels
              or fossil fuels into what we call e-methanol, or green methanol,
              significantly reducing the carbon outlets of normal shipping,” he
              said.
              <br /> <br />
              Maersk broadly defines green fuels as fuels with a minimum 65%
              reduction in greenhouse gas emissions on a lifecycle basis
              compared with fossil reference fuels.
            </p>
            <p>
              Although largely produced from fossil fuels, methanol can also be
              made from sustainable, renewable-based energy sources, according
              to the International Renewable Energy Agency. Maersk says ships
              running on green methanol can save up to about 280 tons of CO2 per
              day, making it a key step in the company&apos;s goal of reaching
              net-zero emissions by 2040.
              <br />
              <br /> Green methanol also has a lower sulfur content, reducing
              emissions of sulfur oxides, which contribute to air pollution and
              acid rain, according to the World Economic Forum. Blicher said the
              A.P. Møller is Maers&aapos;s ninth dual-fuel vessel out of an
              order of 25 planned to be completed by 2027.
              <br />
              <br />
              According to the company, replacing just 12 of its “normal”
              vessels with large dual-fuel methanol vessels like the A.P. Møller
              could save 1.5 million metric tons of CO2 — almost double the CO2
              emissions that the Municipality of Copenhagen produced in 2022.
              The future of shipping? As the largest maritime shipper in the
              world, Maersk is a significant trendsetter for global trade, with
              many other companies following suit on methanol adoption.
              <br />
              <br />
              According to Blicher, about 170 dual-fuel methanol vessels are on
              order from the entire industry, which is helping to build scale.
              “Maersk, the industry and our client base are pushing forward and
              investing in this technology,” Blicher said, noting that clients
              are increasingly trying to meet their own decarbonization goals.
              Still, while building economies of scale is vital, he believes
              more will be needed in order to shift the industry away from black
              fuels, with methanol presenting higher production costs. Blicher
              expects this tipping of the scales to come from regulations that
              disincentivize black fuels.
              <br />
              <br /> “We&apos;re talking about adding to the price of black fuel
              to make sure that the black fuel price is reflective of the impact
              that it has on the economy,” he said. Singapore, the world&apos;s
              largest bunkering port, has led various initiatives to promote
              sustainable shipping. In a statement released Thursday,
              Singapore&apos;s minister of state for law and transport, Murali
              Pillai, said the arrival of the A.P.
              <br /> <br />
              Møller reinforced the city-state&apos;s commitment to reducing
              greenhouse gas emissions. “We are glad to collaborate with Maersk
              and look forward to furthering our efforts to make Singapore a
              leading hub for new maritime fuels,” he added.
              <br />
              <br /> In October, Maersk raised its full-year forecasts after
              reporting strong third-quarter results, heavy demand and higher
              prices resulting from disruptions in the Red Sea. Revenue was
              $15.8 billion, up from $12.1 billion a year prior.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
