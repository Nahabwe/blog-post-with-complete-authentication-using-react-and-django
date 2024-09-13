import React, { useState } from 'react';
import { createBlogPost } from '../blogService';
import './CreateBlogPost.css'; // Import the CSS file
import { toast } from 'react-toastify';
const CreateBlogPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);

        createBlogPost(formData)
            .then(response => {
                console.log(response.data);
                window.location.href = '/list-posts';
                setError(null);
                toast.success('Successfully created a blog post')
            })
            .catch(error => {
                console.log('Error creating blog post', error);
                setError('Failed to create blog post. Please try again.');
                toast.error('Failed to create the blog post')
            });
    };

    return (
        <div className="container">
            <h1 className="heading">Create Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    Title
                </label>
                <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <label className="label">
                    Description
                </label>
                <textarea
                    type="text"
                    className="input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    cols='50'
                    rows='10'
                />
                <label className="label">
                    Image
                </label>
                <input
                    type="file"
                    className="file-input"
                    onChange={e => setImage(e.target.files[0])}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" className="button">Create</button>
            </form>
        </div>
    );
};

export default CreateBlogPost;
