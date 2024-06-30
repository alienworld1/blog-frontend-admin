import { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import { validateToken } from '../tokenHandler';
import { useNavigate, Outlet } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    validateToken().then(isValid => {
      if (!isValid) {
        navigate('/log-in');
      }
    });
  }, [navigate]);

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
