import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="flex flex-col h-screen bg-primary cursor-default">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
