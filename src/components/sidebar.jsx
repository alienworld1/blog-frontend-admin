import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="px-8 py-4 h-full bg-secondary flex flex-col gap-10">
      <h1 className="text-3xl text-slate-50 font-medium">Blog Dashboard</h1>

      <ul className="flex flex-col list-none text-xl text-slate-50 flex-1 gap-2">
        <li className="cursor-pointer hover:text-violet-300">New Post</li>
        <li className="cursor-pointer hover:text-violet-300">
          <Link to="/dashboard">All Posts</Link>
        </li>
        <li className="cursor-pointer hover:text-violet-300">
          <Link to="public">Public Posts</Link>
        </li>
        <li className="cursor-pointer hover:text-violet-300">
          <Link to="private">Private Posts</Link>
        </li>
      </ul>
      <Link
        to="/log-out"
        className="text-slate-50 text-lg hover:text-violet-300"
      >
        Log Out
      </Link>
    </div>
  );
}

export default Sidebar;
