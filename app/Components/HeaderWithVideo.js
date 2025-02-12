'use client';

import Input from './Input';

import { HomeContextProvider } from '../Context/HomeContext';
import { useContext } from 'react';

function HeaderWithVideo() {
  // const { active } = useContext(HomeContext);
  return (
    <HomeContextProvider>
      <div className="relative w-full h-[100vh] overflow-hidden ">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* <source src="/videos/background-video.webm" type="video/webm" />
        <source src="/videos/background-video.ogv" type="video/ogg" /> */}
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}

        <div className="absolute top-0 left-0 w-full h-full flex flex-col  bg-black bg-opacity-50 text-white pt-20">
          <Input />
        </div>
      </div>
    </HomeContextProvider>
  );
}

export default HeaderWithVideo;
