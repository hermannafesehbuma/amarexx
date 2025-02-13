'use client';
import Image from 'next/image';
import UserDetails from './UserDetails';
import Link from 'next/link';
import useScrollPosition from '../Hooks/scrollPostionDetection';

import { usePathname } from 'next/navigation';

import MainMenu from './MainMenu';
import useWindowWidth from './Functions/getBrowserWidth';
import MobileHeader from './MobileHeader';
import { useUserContext } from '../Context/UserContext';
import GoogleSignIn from './GoogleSignIn';
import { useEffect } from 'react';

function Header() {
  const { user, setUser } = useUserContext();
  useEffect(() => {
    if (user) {
      GoogleSignIn();
    }
  }, [user]);
  const pathname = usePathname();

  const scrollPosition = useScrollPosition(100);

  const width = useWindowWidth();

  return (
    <>
      {pathname === '/' ? (
        ''
      ) : (
        <div className="xs:h-[10vh] bg-transparent md:h-0"></div>
      )}
      {width >= 1133 ? (
        <div
          className={`fixed top-0 w-full z-50 transition-all flex items-center  ${
            pathname === '/'
              ? scrollPosition
                ? 'bg-gray-900 text-white shadow-lg' // Home page after scroll
                : 'bg-transparent text-black' // Home page before scroll
              : scrollPosition
              ? 'bg-gray-900 text-white shadow-lg' // Other pages after scroll
              : 'bg-primary text-white'
          }`}
        >
          <div className="flex-1">
            <Link href="/">
              <Image
                src="/logo-white.png"
                width={100}
                height={50}
                sizes="(max-width: 600px) 100px, 200px"
                alt="Header-Logo"
              />
            </Link>
          </div>
          <MainMenu />
          <UserDetails />
        </div>
      ) : (
        <MobileHeader />
      )}
    </>
  );
}

export default Header;
