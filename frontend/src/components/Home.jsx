import React, { useEffect, useState } from 'react';
import { getBlogPosts } from '../blogService';
import blog from '../assets/blog.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlogPosts()
      .then(response => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error fetching blog posts');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='home'>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && posts.length === 0 && (
        <div className='no-posts'>
          <p>You don't have any blog posts yet. Please create a blog post.</p>
          <Link to='/create'>Start creating your blog post here</Link>
        </div>
      )}
      {!isLoading && !error && posts.length > 0 && (
        <div className='content'>
          <h3>Welcome {posts[0].author_name}</h3>
          <p>Start creating blog posts for your best memories.</p>
          <Link to='/create'>Start creating your posts here</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
