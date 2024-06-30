import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { MdError } from 'react-icons/md';
import { TailSpin } from 'react-loading-icons';
import { Link } from 'react-router-dom';

import Post from './post';
import { getToken } from '../tokenHandler';

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PostList({ mode }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${mode === 'all' ? '' : mode}`, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then(response => response.json())
      .then(response => setPosts(response))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [mode]);

  return (
    <>
      <h1 className="text-2xl text-slate-50 font-medium">
        {capitalizeString(mode)} posts
      </h1>
      {loading ? (
        <TailSpin stroke="#f5f3ff" />
      ) : error ? (
        <div className="text-red-400 text-lg font-semibold">
          <MdError className="inline text-2xl mb-2" />
          <span className="mx-2">{error.message}</span>
        </div>
      ) : (
        posts.map(post => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <Post post={post} />
          </Link>
        ))
      )}
    </>
  );
}

PostList.propTypes = {
  mode: PropTypes.oneOf(['all', 'public', 'private']),
};

export default PostList;
