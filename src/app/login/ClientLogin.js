"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ClientLogin = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const formData = {
      email,
      password,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
      setUser(data.user); // 🔥 Immediate update to AuthContext
      router.push("/"); // Optional: Redirect to home
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <section>
      <div className=''>
        <div className='min-h-screen flex'>
          {/* Left side (visual/content area) */}
          <div className='w-1/2 bg-gradient-to-br from-indigo-200 to-indigo-700 hidden md:flex items-center justify-center p-10'>
            <div className='text-white text-center'>
              <h1 className='text-4xl font-bold mb-4'>Welcome Back 👋</h1>
              <p className='text-lg'>
                Please login to continue and manage your account.
              </p>
            </div>
          </div>

          {/* Right side (form area) */}
          <div className='w-full md:w-1/2 flex items-center justify-center p-8'>
            <div className='w-full max-w-md bg-white rounded-3xl shadow-lg p-10 border border-gray-200'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
                Login to Your Account
              </h2>

              <form className='space-y-5' onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-600 mb-1'>
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300'
                    placeholder='you@example.com'
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
                    className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300'
                    placeholder='••••••••'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-xl transition duration-200'>
                  Log In
                </button>
              </form>

              <p className='mt-6 text-sm text-center text-gray-500'>
                Don't have an account?{" "}
                <Link
                  href='/register'
                  className='text-indigo-600 hover:underline'>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogin;
