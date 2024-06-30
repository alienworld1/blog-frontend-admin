import { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import { validateToken } from '../tokenHandler';
import { useNavigate } from 'react-router-dom';

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
      <article className="flex-1"></article>
    </main>
  );
}

export default Dashboard;
