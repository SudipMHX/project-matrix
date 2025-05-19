"use client";

import { useState } from "react";

const ClientLargestNumber = () => {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [currentNum, setCurrentNum] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState(null);

  const handleCountSubmit = (e) => {
    e.preventDefault();
    setNumbers([]);
    setStep(1);
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    const updatedNumbers = [...numbers, parseInt(currentNum)];
    setNumbers(updatedNumbers);
    setCurrentNum("");
    if (updatedNumbers.length === count) {
      setStep(2);
    }
  };

  const handleNSubmit = (e) => {
    e.preventDefault();
    const sorted = [...numbers].sort((a, b) => b - a);
    const nthLargest = sorted[parseInt(n) - 1];
    setResult({ nthLargest, sorted });
    setStep(3);
  };
  return (
    <section>
      <div className='container mx-auto py-20 px-5'>
        <div className='py-20 bg-blue-50 flex justify-center p-4 rounded-2xl'>
          <div className='bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center'>
            <h1 className='text-2xl font-bold text-blue-700 mb-4'>
              Nth Largest Number Finder
            </h1>

            {step === 0 && (
              <form onSubmit={handleCountSubmit}>
                <input
                  type='number'
                  placeholder='How many numbers in the list?'
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className='w-full p-2 border rounded mb-4'
                  required
                  min='1'
                />
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded'>
                  Next
                </button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={handleNumberSubmit}>
                <input
                  type='number'
                  placeholder={`Enter number ${numbers.length + 1}`}
                  value={currentNum}
                  onChange={(e) => setCurrentNum(e.target.value)}
                  className='w-full p-2 border rounded mb-4'
                  required
                />
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded'>
                  Add Number
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNSubmit}>
                <input
                  type='number'
                  placeholder='Enter N, position of the largest'
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  className='w-full p-2 border rounded mb-4'
                  required
                  min='1'
                  max={count}
                />
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded'>
                  Find Nth Largest
                </button>
              </form>
            )}

            {step === 3 && result && (
              <div className='text-center mt-4'>
                <p className='text-lg text-blue-700'>
                  The {n}
                  <sup>th</sup> largest number is:{" "}
                  <strong>{result.nthLargest}</strong>
                </p>
                <p className='mt-2'>Inputs: {numbers.join(", ")}</p>
                <p>Sorted Order: {result.sorted.join(", ")}</p>
                <button
                  onClick={() => {
                    setStep(0);
                    setCount(0);
                    setNumbers([]);
                    setCurrentNum("");
                    setN("");
                    setResult(null);
                  }}
                  className='p-2 bg-red-500 text-white mt-5 rounded-lg px-4 cursor-pointer'>
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLargestNumber;
