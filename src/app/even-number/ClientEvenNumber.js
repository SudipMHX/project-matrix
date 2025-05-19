"use client";

import { useState } from "react";

const ClientEvenNumber = () => {
  const [count, setCount] = useState("");
  const [numbers, setNumbers] = useState([]);

  const generateEvenNumbers = () => {
    const n = parseInt(count);
    if (isNaN(n) || n <= 0) return;

    const evens = Array.from({ length: n }, () => {
      const num = Math.floor(Math.random() * 1000);
      return num % 2 === 0 ? num : num + 1;
    });

    setNumbers(evens);
  };

  return (
    <section className='bg-fuchsia-50'>
      <div className='container mx-auto py-20 px-5'>
        <div className='max-w-xl mx-auto'>
          <div className='mb-5'>
            <h1 className='text-2xl font-bold text-blue-600 mb-4 text-center pt-6'>
              N Even Number Generator
            </h1>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input
              type='number'
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder='Enter how many even numbers to generate'
              className='border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <button
              onClick={generateEvenNumbers}
              className='cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition'>
              Generate
            </button>
          </div>
          <div className='mt-16'>
            <ul className='text-left space-y-2'>
              {numbers.map((num, index) => (
                <li
                  key={index}
                  className='text-gray-800 bg-fuchsia-600/10 px-3 py-1 rounded-lg'>
                  {index + 1}. <span className='font-semibold'>{num}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {numbers.length === 0 && <div className='min-h-60' />}
    </section>
  );
};

export default ClientEvenNumber;
