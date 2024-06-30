/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb';

const Error = () => {
  return (
    <div className="text-slate-50">
      <h1 className="font-semibold text-xl">
        <TbError404 className="inline text-3xl mb-1" /> - Page not found
      </h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="hover:text-violet-300">
        Return to Home
      </Link>
    </div>
  );
};

export default Error;
