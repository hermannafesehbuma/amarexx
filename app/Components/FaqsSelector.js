'use client';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';

function FaqsSelector({ data }) {
  const [activeItem, setActiveItem] = useState(0);
  function handleActiveItem(id) {
    setActiveItem(activeItem === id ? null : id);
  }
  return (
    <div className="bg-gray-100 py-20">
      <h3 className="text-center text-3xl mb-10">More Questions</h3>
      <div className="w-[70%] mx-auto">
        <div className="p-4">
          <ul className="list-none space-y-2">
            {data.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer p-4 rounded-md bg-white ${
                  activeItem === item.id ? ' ' : 'shadow'
                }`}
                onClick={() => handleActiveItem(item.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{item.title}</span>
                  <span>
                    {activeItem === item.id ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowUp />
                    )}
                  </span>
                </div>
                {activeItem === item.id && (
                  <p className="mt-2 text-sm py-5">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FaqsSelector;
