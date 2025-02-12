'use client';
import ButtonBig from '@/app/Components/ButtonBig';
import ButtonBigTransparent from '@/app/Components/ButtonBigTransparent';
import { useEffect, useState } from 'react';
import { MdError } from 'react-icons/md'; // Ensure react-icons is installed
function handleReload() {
  window.location.reload();
}

export default function ErrorBox({ message }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
        <div className="p-10 bg-red-100 text-red-800 rounded-md flex flex-col items-center">
          <MdError className="text-5xl" />
          <h2 className="text-lg font-bold">Error Occurred</h2>
          <p>{message}</p>
          <ButtonBig
            className="rounded-full bg-red-800 px-10 py-3 mt-5 items-center flex hover:scale-110 transition-all ease-in-out"
            onClick={handleReload}
          >
            Try Again
          </ButtonBig>
        </div>
      </div>
    </>
  );
}
