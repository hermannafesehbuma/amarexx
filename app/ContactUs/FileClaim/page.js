import FileClaimForm from '@/app/Components/FileClaimForm';
import Footer from '@/app/Components/Footer';
import Image from 'next/image';
function page() {
  return (
    <>
      <div className="grid grid-cols-2 mt-[6%] bg-gray-100">
        <div className="w-[80%] mx-auto py-[5vh]">
          <h3 className="text-3xl mt-10">File a Amarex Claim: Domestic</h3>
          <span className="leading-relaxed">
            If you sent a package that was lost, damaged, or had broken or
            missing pieces and it was covered by insurance, learn how to file an
            &apos;indemnity claim.&apos; Your insurance may have been included
            with the Amarex® service or purchased separately. Eligible items
            include:
            <br />
          </span>
          <ul className="list-disc">
            <li> Priority Mail Express® items and other insured mail</li>
            <li>Collect on Delivery (COD)</li>
            <li> items Registered Mail® items with insurance</li>
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
      <FileClaimForm />
      <div className="bg-gray-100 p-20 mt-20">
        <div className="md:w-[80%] xs:w-[98%] mx-auto  ">
          <h3 className="text-3xl text-primary pt-10">
            After You File – Next Steps
          </h3>
          <div className="md:w-[80%] xs:w-[100%]">
            <h4 className="text-xl font-bold mt-10">Claims Decisions</h4>
            <br />
            Amarex usually sends claims decisions within 5-10 days. You can also
            check Claim History in your Amarex.com account for updates. Claim
            processing times depend on whether an item is damaged or lost.
            Claims for damaged items are usually processed more quickly than
            lost mail claims. Before processing lost mail claims, Amarex will
            first perform a Missing Mail Search.
            <h4 className="text-base font-bold mt-10"> Approved Claims</h4>
            <br />
            Your claim may be completely approved or approved in part. After
            your claim is approved, you should receive payment for the claim
            amount in 7-10 business days. Amarex does not pay a claim higher
            than an item&apos;s actual value.
            <h4 className="text-base font-bold mt-10"> Denied Claims</h4>
            Claims can be partially or fully denied. Your decision letter will
            list the reasons for the denial.
            <h4 className="text-xl font-bold mt-10">Making an Appeal</h4>
            If your refund was only partially paid or completely denied, you may
            file an appeal within 30 days of receiving the decision.
            <h4 className="text-base font-bold mt-10"> First Appeal</h4> Submit
            your appeal the same way you submitted the original claim, whether
            online or by mail. You can start an online claim from your Claim
            History. Focus your appeal on the reasons your claim was denied. You
            may submit new documentation to support your appeal.
            <h4 className="text-base font-bold mt-10"> Final Appeal</h4>
            If your appeal is denied, you can file a second appeal within 30
            days of the date you received the appeal denial. Follow the same
            process for final review as for your first appeal.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
