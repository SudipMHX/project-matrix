import Link from "next/link";

export default function Card({ title, description, route }) {
  return (
    <article className='w-fit p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-end justify-between '>
      <div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>{title}</h2>
        <p className='text-gray-700 mb-4'>{description}</p>
      </div>

      <Link href={route} className='relative group'>
        <button className='relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
          <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

          <span className='relative z-10 block px-6 py-3 rounded-xl'>
            <div className='relative z-10 flex items-center space-x-2'>
              <span className='transition-all duration-500 group-hover:translate-x-1'>
                Try it
              </span>
            </div>
          </span>
        </button>
      </Link>
    </article>
  );
}
