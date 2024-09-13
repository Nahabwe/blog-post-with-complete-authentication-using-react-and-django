import React, { useEffect, useState } from 'react';
import { getBlogPosts } from '../blogService';
import BlogPost from './BlogPost';
import './ListBlogPost.css'; // Import the CSS file

const ListBlogPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getBlogPosts().then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.log('Failed to fetch data');
            setPosts([]);
        });
    }, []);

    return (
        <div className="list-blog-post">
            <h1 className="list-blog-post__heading">Blog Posts</h1>
            <div className="list-blog-post__posts-grid">
                {posts.map((post) => (
                    <div className="list-blog-post__post-card" key={post.id}>
                        <BlogPost post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListBlogPost;
