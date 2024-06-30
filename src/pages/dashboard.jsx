import Sidebar from '../components/sidebar';

function Dashboard() {
  return (
    <main className="flex h-full">
      <Sidebar />
      <article className="flex-1"></article>
    </main>
  );
}

export default Dashboard;
