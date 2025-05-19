"use client";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react";

import IMG1 from "@/assets/riku-lu-wvJuYrM5iuw-unsplash.jpg";
import IMG2 from "@/assets/eftakher-alam-i1VQZsU86ok-unsplash.jpg";
import IMG3 from "@/assets/christian-wiediger-WkfDrhxDMC8-unsplash.jpg";

export default function Home() {
  const { user } = useAuth();
  const images = [IMG1, IMG2, IMG3];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <>
      <section>
        <div className='flex flex-col items-center mt-10'>
          <div className='relative w-full max-w-3xl h-96 overflow-hidden rounded-xl shadow-lg'>
            {/* Render all images, show only active one with fade animation */}
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Slide ${i}`}
                width={1200}
                height={800}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none select-none ${
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                draggable={false}
                priority={i === index}
              />
            ))}

            <button
              onClick={prevSlide}
              className='cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 text-xl z-20'>
              ❮
            </button>
            <button
              onClick={nextSlide}
              className='cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 text-xl z-20'>
              ❯
            </button>
          </div>

          <div className='flex mt-4 space-x-2'>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === i ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className='container mx-auto py-20 px-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <Card
              title='🔢 Nth Largest Number'
              description='Generate a custom list of even numbers and find the N-th largest among them. A simple utility for exploring sequences and practicing algorithmic thinking.'
              route='/largest-number'
            />
            <Card
              title='2️⃣ N Even Numbers'
              description='Generates a specified quantity (N) of even numbers, which are integers perfectly divisible by two. This tool provides a sequence of these numbers based on the requested count.'
              route='/even-number'
            />
            <Card
              title='✖️ Matrix Multiplication'
              description='Performs the operation of multiplying two matrices together, resulting in a new matrix. This process follows specific rules of combining elements from the rows of the first matrix and the columns of the second.'
              route='/matrix-multiply'
            />
          </div>
        </div>
      </section>
    </>
  );
}
