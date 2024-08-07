import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <main className="flex h-full">
      <Sidebar />
      <article className="flex-1 flex flex-col py-4 px-8 gap-5">
        <Outlet />
      </article>
    </main>
  );
}

export default Dashboard;
