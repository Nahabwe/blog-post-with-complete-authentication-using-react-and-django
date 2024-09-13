import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteBlogPost, getBlogPost } from '../blogService';
import './BlogDetails.css'; // Import the CSS file
import { toast } from 'react-toastify';

const BlogDetails = () => {
    const [post, setPost] = useState(null);
    const { id: postId } = useParams();

    useEffect(() => {
        getBlogPost(postId).then(response => {
            setPost(response.data);
            console.log(response.data);
        });
    }, [postId]);

    const deleteBlog = async (id) => {
        try {
            await deleteBlogPost(id);
            window.location.href = '/list-posts';
            toast.success('Blog post deleted successfully');
        } catch (error) {
            console.error("Failed to delete blog post", error);
            toast.error("Error deleting blog post.");
        }
    }

    return (
        <div className="blog-details">
            {post ? (
                <div className="blog-details__content">
                    <h1 className="blog-details__heading">{post.title}</h1>
                    <p className="blog-details__description">{post.description}</p>
                    {post.image && <img className="blog-details__image" src={post.image} alt={post.title} />}
                    <p className="blog-details__author">By: {post.author_name}</p>
                    <p className="blog-details__date">Date: {new Date(post.created_at).toLocaleString()}</p>

                    <div className="blog-details__buttons">
                        <a className="blog-details__button blog-details__button--edit" href={`/posts/${post.id}/edit`}>Edit</a>
                        <button className="blog-details__button blog-details__button--delete" onClick={() => deleteBlog(post.id)}>Delete</button>
                    </div>
                </div>
            ) : (
                <p className="blog-details__loading">Loading...</p>
            )}
        </div>
    );
}

export default BlogDetails;
