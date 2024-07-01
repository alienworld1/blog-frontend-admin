import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Sidebar from '../components/sidebar';
import { getToken } from '../tokenHandler';

const BlogForm = ({ update }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    if (!update) {
      return;
    }

    fetch(`/api/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    })
      .then(post => post.json())
      .then(post => {
        setTitle(post.title);
        setBody(post.body);
        setIsPublic(post.isPublic);
      })
      .catch(() => setDone(true));
  }, [postId, update]);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch(`/api/posts${update ? '/' + postId : ''}`, {
      method: `${update ? 'PUT' : 'POST'}`,
      body: JSON.stringify({ title, body, isPublic }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      setError(responseData[0]?.msg);
      return;
    }

    setDone(true);
  };

  const handleDelete = async () => {
    if (!update) return;

    await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    setDone(true);
  };

  return (
    <main className="flex h-screen">
      {done && <Navigate to="/dashboard" replace={true} />}
      <Sidebar />
      <div className="min-h-screen flex flex-1 items-center justify-center text-gray-300 p-4">
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-lg border border-gray-700 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Create a Blog Post
          </h2>

          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#23233b] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body" className="block font-bold mb-2">
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={e => setBody(e.target.value)}
              className="w-full px-3 py-2 bg-[#23233b] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white h-96"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}
                className="mr-2 bg-[#23233b] border-gray-700 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <span className="font-bold">Make this blog public</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          {error && (
            <div className="bg-red-400 my-5 shadow sm:rounded-lg py-2 px-4 font-medium text-slate-950">
              {error}
            </div>
          )}
          {update && (
            <button
              type="button"
              className="bg-red-600 hover:bg-red-400 text-black rounded-md focus:outline-none py-2 px-4 font-bold mt-4 active:bg-red-700"
              onClick={handleDelete}
            >
              Delete Post
            </button>
          )}
        </form>
      </div>
    </main>
  );
};

BlogForm.propTypes = {
  update: PropTypes.bool,
};

export default BlogForm;
