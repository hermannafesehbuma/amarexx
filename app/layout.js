import localFont from 'next/font/local';
import './globals.css';
import Header from './Components/Header';
import { UserContextProvider } from './Context/UserContext';
import { TimerProvider } from './Context/TimerContext';

import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

// ✅ Use Next.js Best Practice for Metadata
export const generateMetadata = () => {
  return {
    title: 'Amarex Express - Fast & Secure Shipping',
    description:
      'SWelcome to Amarex Express - Find Services for shipping your packages, pets, shipment tracking, shipping rates, and tools to support shippers and small buisness.',
    keywords: ['shipping', 'logistics', 'courier', 'Amarex Express'],
    openGraph: {
      title: 'Amarex Express',
      description:
        'Welcome to Amarex Express - Find Services for shipping your packages, pets, shipment tracking, shipping rates, and tools to support shippers and small buisness. ',
      url: 'https://amarexx.com',
      siteName: 'Amarex Express',
      images: [
        {
          url: 'https://qmkoxktojvjqokgxzqxw.supabase.co/storage/v1/object/public/amarex//logo-amarex.png',
          width: 1200,
          height: 630,
          alt: 'Amarex Express Logo',
        },
      ],
      type: 'website',
    },
  };
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-amarex.png" sizes="32x32" />
        <link rel="icon" href="/logo-amarex.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* ✅ Organization Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Amarex Express',
              url: 'https://amarexx.com',
              logo: 'https://qmkoxktojvjqokgxzqxw.supabase.co/storage/v1/object/public/amarex//logo-amarex.png',
              sameAs: [
                'https://wwww.facebook.com/share/1E2yHUswVX/?mibextid=wwXIfr',
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+1 980-413-4975',
                  contactType: 'customer service',
                  areaServed: 'Worldwide',
                },
              ],
            }),
          }}
        />

        {/* ✅ WebSite Schema Markup (For Search Box & Sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Amarex Express',
              url: 'https://amarexx.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://amarexx.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="gLwR-ISOyVSDF9CIr6UA4OL3gWeao6kJZwPuwR2Fyqk"
        />
      </head>
      <body
        className={`${dmSans.className} antialiased bg-primary-950 min-h-screen flex flex-col relative text-zinc-900 font-medium`}
      >
        <TimerProvider>
          <UserContextProvider>
            <Header />
            <div>
              <main>{children}</main>
            </div>
          </UserContextProvider>
        </TimerProvider>
      </body>
    </html>
  );
}
