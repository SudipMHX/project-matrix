"use client";

import Image from "next/image";

import CoverPhoto from "@/assets/codioful-formerly-gradienta-LeG68PrXA6Y-unsplash.jpg";
import ProfilePhoto from "@/assets/ben-sweet-2LowviVHZ-E-unsplash.jpg";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";

const ClientProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchUser() {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data?.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [user, user.id]);

  if (loading) return <Loading />;
  if (!userData) return (window.location.href = "/login");

  return (
    <section>
      <div className='container mx-auto py-20 px-5'>
        <div className='bg-white rounded-xl shadow-lg max-w-md mx-auto w-full overflow-hidden'>
          {/* Cover Image */}
          <div className='relative h-32 w-full'>
            <Image
              src={CoverPhoto}
              alt='Cover'
              width={500}
              height={500}
              className='object-cover w-full h-32 rounded-t-xl'
              priority
            />
          </div>

          {/* Profile Image */}
          <div className='flex justify-center relative -top-12'>
            <Image
              className='w-24 h-24 object-cover rounded-full shadow-md'
              src={ProfilePhoto}
              alt='Profile'
              width={196}
              height={196}
              priority
            />
          </div>

          {/* Info */}
          <div className='p-6 text-center relative -top-12'>
            <h2 className='text-xl font-semibold text-gray-900'>
              {userData?.name}
            </h2>

            <div className='mt-4 space-y-2 text-gray-700 text-sm text-left'>
              <div>
                <span className='font-semibold'>Email:</span> {userData?.email}
              </div>
              <div>
                <span className='font-semibold'>Phone:</span> {userData?.phone}
              </div>
              <div>
                <span className='font-semibold'>City:</span> {userData?.city}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientProfile;
