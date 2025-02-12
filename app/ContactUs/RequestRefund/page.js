import FileClaimForm from '@/app/Components/FileClaimForm';
import Footer from '@/app/Components/Footer';
import RequestRefundForm from '@/app/Components/RequestRefundForm';
import Image from 'next/image';

function page() {
  return (
    <>
      <div className="grid grid-cols-2 mt-[6%] bg-gray-100">
        <div className="w-[80%] mx-auto">
          <h3 className="md:text-3xl xs:text-2xl xs:mt-20 md:mt-10">
            Request an Amarex Refund
          </h3>
          <span className="leading-relaxed ">
            To submit a Amarex refund request (including fees or postage),
            you&apos;ll need proof of purchase. You may need atleast two of the
            following when you request a refund:
            <br />
          </span>
          <ul className="list-disc mt-5 leading-relaxed xs:mb-10">
            <li> Tracking number</li>
            <li>Purchase receipt</li>
            <li>Photo ID (if in person)</li>
          </ul>
        </div>
        <div className="relative md:p-40 xs:p-0 clip-path[polygon(0 0, 0 100%, 100% 0, 100% 100%)]">
          <Image
            src="/fileclaim.jpg"
            alt="File Domestic Claim"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <RequestRefundForm />
      <div className="bg-gray-100 p-20 mt-20">
        <div className="md:w-[80%] xs:w-[98%]mx-auto  ">
          <h3 className="text-3xl text-primary pt-10">
            After You File – Next Steps
          </h3>
          <p className="md:w-[80%] xs:w-[100%]">
            <span className="text-xl font-bold mt-10">Claims Decisions</span>
            <br />
            Amarex usually sends claims decisions within 5-10 days. You can also
            check Claim History in your Amarex.com account for updates. Claim
            processing times depend on whether an item is damaged or lost.
            Claims for damaged items are usually processed more quickly than
            lost mail claims. Before processing lost mail claims, Amarex will
            first perform a Missing Mail Search.
            <span className="text-base font-bold mt-10"> Approved Claims</span>
            <br />
            Your claim may be completely approved or approved in part. After
            your claim is approved, you should receive payment for the claim
            amount in 7-10 business days. Amarex does not pay a claim higher
            than an item&apos;s actual value.
            <span className="text-base font-bold mt-10"> Denied Claims</span>
            Claims can be partially or fully denied. Your decision letter will
            list the reasons for the denial.
            <span className="text-xl font-bold mt-10">Making an Appeal</span>
            If your refund was only partially paid or completely denied, you may
            file an appeal within 30 days of receiving the decision.
            <span className="text-base font-bold mt-10">
              {' '}
              First Appeal
            </span>{' '}
            Submit your appeal the same way you submitted the original claim,
            whether online or by mail. You can start an online claim from your
            Claim History. Focus your appeal on the reasons your claim was
            denied. You may submit new documentation to support your appeal.
            <span className="text-base font-bold mt-10"> Final Appeal</span>
            If your appeal is denied, you can file a second appeal within 30
            days of the date you received the appeal denial. Follow the same
            process for final review as for your first appeal.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
