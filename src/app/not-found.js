import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const PageNotFound = () => {
  return (
    <section>
      <div className='container mx-auto py-20 px-5'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-gray-800 mb-4'>404</h1>
          <p className='text-xl text-gray-600 mb-8'>Page Not Found</p>
          <p className='text-gray-500 mb-6'>
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            href='/'
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
