import Pages from './pages';
import { redirect } from 'react-router-dom';
import { deleteToken, validateToken } from './tokenHandler';

const authLoader = async () => {
  const isValidToken = await validateToken();
  if (isValidToken) {
    return redirect('/dashboard');
  }
  return redirect('/log-in');
};

const routes = [
  {
    path: '/',
    loader: authLoader,
    errorElement: <Pages.Error />,
  },
  {
    path: '/log-in',
    element: <Pages.Login />,
    loader: async () => {
      const isValidToken = await validateToken();
      if (isValidToken) {
        return redirect('/dashboard');
      }
      return null;
    },
  },
  {
    path: '/dashboard',
    element: <Pages.Dashboard />,
    loader: async () => {
      const isValidToken = await validateToken();
      if (!isValidToken) {
        return redirect('/log-in');
      }
      return null;
    },
  },
  {
    path: '/log-out',
    loader: () => {
      deleteToken();
      return redirect('/log-in');
    },
  },
];

export default routes;
