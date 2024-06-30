import Pages from './pages';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    index: true,
    element: <Navigate to="/log-in" />,
    errorElement: <Pages.Error />,
  },
  { path: '/log-in', element: <Pages.Login /> },
];

export default routes;
