import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='grid place-content-center gap-10 justify-items-center h-screen'>
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p className='text-lg'>Sorry, an unexpected error has occurred.</p>
      <p className='text-gray-500'>
        <i>{error.statusText || error.message}</i>
        <i> ({error.status}) </i>
      </p>
      <Link to='/'>
        <button className='px-4 py-2 text-black italic bg-gray-200 rounded'>
          Go Home
        </button>
      </Link>
    </div>
  );
}