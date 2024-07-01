import Pages from './pages';
import { redirect } from 'react-router-dom';
import { deleteToken, validateToken } from './tokenHandler';

import PostList from './components/postlist';

const authLoader = async () => {
  const isValidToken = await validateToken();
  if (!isValidToken) {
    return redirect('/log-in');
  }
  return null;
};

const routes = [
  {
    path: '/',
    loader: async () => {
      const isValidToken = await validateToken();
      if (!isValidToken) {
        return redirect('/log-in');
      }
      return redirect('/dashboard');
    },
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
    loader: authLoader,
    children: [
      { index: true, element: <PostList mode="all" /> },
      { path: 'public', element: <PostList mode="public" /> },
      { path: 'private', element: <PostList mode="private" /> },
    ],
  },
  {
    path: '/log-out',
    loader: () => {
      deleteToken();
      return redirect('/log-in');
    },
  },
  {
    path: '/posts',
    loader: authLoader,
    children: [
      { path: 'create', element: <Pages.BlogForm update={false} /> },
      {
        path: ':postId',
        element: <Pages.BlogForm update={true} />,
      },
    ],
  },
];

export default routes;
