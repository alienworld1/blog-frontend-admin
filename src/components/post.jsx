import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

function Post({ post }) {
  const timestamp = DateTime.fromISO(post.timestamp).toLocaleString(
    DateTime.DATETIME_MED,
  );
  return (
    <div className="p-4 rounded-md bg-violet-200 text-zinc-950 hover:bg-violet-300 transition-color duration-300">
      <h2 className="font-medium">{post.title}</h2>
      <p>{timestamp}</p>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.string,
  }),
};

export default Post;
