import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogPost, updateBlogPost } from '../blogService';
import './EditBlogPost.css';
import { toast } from 'react-toastify';

const EditBlogPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBlogPost(id).then(response => {
            const post = response.data;
            console.log(response.data);
            setTitle(post.title);
            setDescription(post.description);
            setExistingImage(post.image);
        }).catch(error => {
            console.error('Error fetching blog post:', error);
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);

        updateBlogPost(id, formData).then(response => {
            navigate(`/posts/${id}`);
            toast.success('Successfully updated the blog');
        }).catch(error => {
            console.error('Error updating blog post:', error);
            toast.error('Failed to update the blog');
        });
    };

    return (
        <div className="edit-blog-post">
            <h1 className="edit-blog-post__heading">Edit Blog Post</h1>
            <form onSubmit={handleSubmit} className="edit-blog-post__form">
                <label className="edit-blog-post__label">
                    Title:
                    <input
                        type="text"
                        className="edit-blog-post__input"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className="edit-blog-post__label">
                    Description:
                    <textarea
                        className="edit-blog-post__textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label className="edit-blog-post__label">
                    Image:
                    <input
                        type="file"
                        className="edit-blog-post__file-input"
                        onChange={e => setImage(e.target.files[0])}
                    />
                </label>
                {existingImage && (
                    <img
                        src={existingImage}
                        alt="Existing"
                        className="edit-blog-post__image-preview"
                    />
                )}
                <button type="submit" className="edit-blog-post__button">Update</button>
            </form>
        </div>
    );
};

export default EditBlogPost;
