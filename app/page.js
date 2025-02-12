import HeaderWithVideo from './Components/HeaderWithVideo';
import Features from './Components/Features';
import Carousel from './Components/Carousel';
import FeaturedAmarex from './Components/FeaturedAmarex';
import Update from './Components/Update';
import Footer from './Components/Footer';
import GoogleSignIn from './Components/GoogleSignIn';
import FeaturesReturn from './Components/FeaturesReturn';
import { getCurrentUser } from './api/supabaseapi';

export default async function Home() {
  const session = await getCurrentUser();
  console.log(session);
  const items = [
    {
      name: 'Amarex Stamps',
      img: '/stamps.jpg',
      description: `Our stamps celebrate life, art, and culture. Find your favorites online.
Stamp Pricing:
Forever: $0.73 | Postcard: $0.56`,
      button: {
        button: 'Shop Now',
        link: '/homepage',
      },
    },
    {
      name: 'Holiday Cards',
      img: '/cards.jpg',
      description:
        'Send bold and colorful messages to friends and loved ones with this new holiday card set.',
      button: {
        button: 'Shop Now',
        link: '/homepage',
      },
    },
    {
      name: 'Holiday Puzzles',
      img: '/puzzles.jpg',
      description:
        'Piece together the perfect holiday gift with Amarex-themed jigsaw puzzles.',
      button: {
        button: 'Shop3 Now',
        link: '/homepage',
      },
    },
  ];
  return (
    <div>
      <HeaderWithVideo />
      <GoogleSignIn />
      <Features />
      <FeaturedAmarex />
      <FeaturesReturn />
      <Carousel items={items} />
      <Update />
      <Footer />
    </div>
  );
}
