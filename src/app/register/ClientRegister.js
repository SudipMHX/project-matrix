"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ClientRegister = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const city = form.city.value;
    if (!name) {
      setMessage("Name is required");
      return;
    } else if (!email) {
      setMessage("Email is required");
      return;
    } else if (!phone) {
      setMessage("Phone number is required");
      return;
    } else if (!city) {
      setMessage("City is required");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    } else if (!/[A-Za-z]/.test(password)) {
      setMessage("Password must include at least one letter");
      return;
    } else if (!/[0-9]/.test(password)) {
      setMessage("Password must include at least one number");
      return;
    }

    const formData = {
      name,
      email,
      password,
      phone,
      city,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user); // 🔥 Immediate update to AuthContext
        router.push("/"); // Optional: Redirect to home
      } else {
        // console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section>
      <div className=''>
        <div className='min-h-screen flex'>
          {/* Left visual side */}
          <div className='w-1/2 bg-gradient-to-br from-teal-200 to-teal-700 hidden md:flex items-center justify-center p-10'>
            <div className='text-black text-center'>
              <h1 className='text-4xl font-bold mb-4'>Join Us 🚀</h1>
              <p className='text-lg'>
                Create your account to get started and explore more.
              </p>
            </div>
          </div>

          {/* Right form side */}
          <div className='w-full md:w-1/2 flex items-center justify-center p-8 pt-20'>
            <div className='w-full max-w-md bg-white rounded-3xl shadow-lg p-10 border border-gray-200'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
                Create an Account
              </h2>

              {message && (
                <>
                  <p className='bg-red-500 text-white text-center mb-3 rounded-3xl'>
                    {message}
                  </p>
                </>
              )}

              <form className='space-y-5' onSubmit={handleRegister}>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-600 mb-1'>
                    Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    placeholder='John Doe'
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-600 mb-1'>
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300'
                  />
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-600 mb-1'>
                    Password
                  </label>
                  <input
                    id='password'
                    type='password'
                    placeholder='••••••••'
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300'
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-600 mb-1'>
                    Phone Number
                  </label>
                  <input
                    id='phone'
                    type='tel'
                    placeholder='+88 01XXXXXXXXX'
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300'
                  />
                </div>

                <div>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-600 mb-1'>
                    City
                  </label>
                  <input
                    id='city'
                    type='text'
                    placeholder='New York'
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-xl transition duration-200'>
                  Register
                </button>
              </form>

              <p className='mt-6 text-sm text-center text-gray-500'>
                Already have an account?{" "}
                <Link href='/login' className='text-teal-600 hover:underline'>
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientRegister;
