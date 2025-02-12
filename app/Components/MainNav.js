'use client';

import Link from 'next/link';

function MainNav({ children, onClick, className }) {
  return (
    <button
      className={`text-center ${className} text-white flex items-center justify-center p-2 xs:text-sm md:text-xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MainNav;
