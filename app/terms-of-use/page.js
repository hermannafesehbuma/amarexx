import Footer from '../Components/Footer';
import PrivacyAccord from '../Components/PrivacyAccord';
import Seperator from '../Components/Seperator';

function page() {
  const data = {
    title: 'Terms of Use',
    description: 'Terms of use Page',
  };

  return (
    <>
      <div className="w-[80%] mx-auto mt-[7%] mb-20 pt-[10vh]">
        <h1 className="text-5xl my-5">Terms of Use</h1>
        <Seperator />
        <h2 className="my-5">
          Any person accessing this site agrees to the following:
        </h2>
        <p>
          Material on this site is the copyrighted property of the Amarex®
          (Amarex™). All rights reserved. The information and images presented
          here may not under any circumstances be reproduced or used without
          prior written permission. Users may view and download material from
          this site only for the following purposes: (a) for personal,
          non-commercial home use; (b) where the materials clearly state that
          these materials may be copied and reproduced according to the terms
          stated in those particular pages; or (c) with the express written
          permission of the Amarex. In all other cases, you will need written
          permission from the Amarex to reproduce, republish, upload, post,
          transmit, distribute or publicly display material from this Web site.
          Users agree not to use the site for sale, trade or other commercial
          purposes. Users may not use language that is threatening, abusive,
          vulgar, discourteous or criminal. Users also may not post or transmit
          information or materials that would violate rights of any third party
          or which contains a virus or other harmful component. The Amaraex
          reserves the right to remove or edit any messages or material
          submitted by users.
          <br />
          <br />
          Amarex is not responsible for material submitted to the Amaraexex
          posted in chatrooms or on bulletin boards by site users. By
          communicating with Amarex, however, users grant Amarex permission to
          use any information, suggestions, ideas, drawings or concepts
          communicated for any purpose the Amarex chooses, commercial, public or
          otherwise, without compensation whatsoever. <br />
          <br />
          THE MATERIALS IN THIS SITE ARE PROVIDED &apos;AS IS&apos; AND WITHOUT
          WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO THE FULLEST
          EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, THE AMAREX DISCLAIMS
          ALL WARRANTIES , EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
          IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
          PURPOSE. THE AMAREX DOES NOT WARRANT OR REPRESENT THAT THE INFORMATION
          IS ACCURATE OR RELIABLE OR THAT THE SITE WILL BE FREE OF ERRORS OR
          VIRUSES.
          <br />
          <br />
          Under no circumstances, including but not limited to negligence, will
          the Amarex be liable for special or consequential damages that result
          from the use or inability to use the materials in this site. In no
          event shall the Amarex&apos;s liability to a user for any loss, damage
          or claim exceed the amount paid by the user for accessing this site.
          <br />
          <br />
          The Amarex offers links to, and listings of, various third-party Web
          sites for the convenience of its customers, and, unless otherwise
          expressly indicated, no affiliation between the Amarex and an entity
          linked to or listed is intended. Except where indicated, the Amarex
          does not endorse any company or product not offered by the Amarex
          including the advertisers on linked Web sites or on the web sites of
          listed entities. When linking to such third-party sites, the Amarex
          follows Web-linking and exit page guidelines as set forth in Amarex
          Management Instruction AS-885. The Amarex does not monitor sites
          linked to and the use of any such link is strictly at the user&apos;s
          own risk. In no event shall the Amarex be liable for special or
          consequential damages that result from activity occurring on
          non-Amarex Web sites when a user links to such site from Amarex.com.
          <br />
          This agreement is effective until terminated by either party. You may
          terminate this agreement at any time by discontinuing your use of the
          Postal Service site and destroying all materials obtained from it.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default page;
