import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.css'; // Import the CSS file

const BlogPost = ({ post }) => {
    return (
        <div className="card">
            <Link to={`/posts/${post.id}`} className="card__title">
                {post.title}
            </Link>
            <p className="card__description">{post.description}</p>
        </div>
    );
}

export default BlogPost;
